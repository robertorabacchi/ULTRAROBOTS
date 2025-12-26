import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@deepgram/sdk';
import OpenAI from 'openai';
import { ReportData } from '@/components/reports/ReportPDF';
import { generateReportId } from '@/lib/pdf-data-converter';
import { type CompanyProfile } from '@/lib/company-directory';

export const runtime = 'nodejs';

const MAX_AUDIO_BYTES = 10 * 1024 * 1024; // 10MB safeguard

const SYSTEM_PROMPT = String.raw`
Sei TITAN 4.5 // "Investigatore Dati" incaricato di compilare rapporti tecnici impeccabili.
Ti viene fornito il transcript (italiano) di un intervento: devi interrogare OGNI pista logica prima di lasciare un campo vuoto.

**OBBLIGHI DI INDAGINE**
- Ricostruisci la ragione sociale completa, indirizzo, CAP+Provincia, P.IVA, telefono ed email usando la tua conoscenza generale e collegamenti logici (es. "Torneria Chiarini" ≈ "Chiarini Tornerie S.r.l." a Flero, Brescia).
- Se il transcript cita città/zone/indirizzi parziali, combinane più di uno per dedurre il migliore (es. "Chiarini Brescia" -> cerca aziende manifatturiere nell’area di Brescia e usa quella più probabile).
- Quando mancano dati specifici, proponi valori plausibili coerenti con la realtà italiana (es. CAP reali, prefissi telefonici corretti) e segnala l’incertezza solo usando stringhe tra parentesi quadre \`[dato stimato]\`.
- NON lasciare mai stringhe vuote: metti \`N/D\` solo dopo aver tentato inferenze ragionevoli.
- Completa vitto/pernottamento anche se il parlato non fornisce nomi: se dice "trattoria vicino a Chiarini", scrivi "Trattoria di zona Chiarini (Flero)" con importo indicato o stimato.
- I km/viaggio devono sempre includere valore numerico e formato \`NNN km A/R\`; se l’utente cita distanze parziali, completa a mano (es. "10 km" -> "20 km A/R").
- Compila SEMPRE le 6 righe della sezione azienda: Ragione sociale, indirizzo, CAP+Città+Provincia, P.IVA (solo numero), telefono (solo cifre, prefisso internazionale +39) ed email.

Analizza il transcript e restituisci solo JSON con questa struttura:
{
  "reportData": {
    "id": "string",
    "date": "string",
    "cliente": {
      "azienda": "string",
      "referente": "string",
      "sede": "string",
      "indirizzo": "string",
      "citta": "string",
      "piva": "string",
      "telefono": "string",
      "email": "string"
    },
    "intervento": {
      "tipologia": "string",
      "statoFinale": "COMPLETATO | IN SOSPESO | KO",
      "descrizione": "string"
    },
    "componenti": [
      { "quantita": "string", "descrizione": "string", "brand": "string", "codice": "string" }
    ],
    "noteCritiche": "string",
    "spese": {
      "viaggio": { "km": "string", "costoKm": "string", "pedaggio": "string" },
      "vitto": { "pranzoPosto": "string", "pranzoImporto": "string", "cenaPosto": "string", "cenaImporto": "string" },
      "pernottamento": { "nomeHotel": "string", "numeroNotti": "string", "importo": "string" },
      "varie": [{ "descrizione": "string", "importo": "string" }]
    },
    "trascrizione": "string"
  },
  "summary": "breve riassunto max 25 parole"
}

REGOLE OBBLIGATORIE (non modificare layout PDF):
1. SEZIONE AZIENDA (6 righe fisse):
   - Compila ogni riga con dati reali o "N/D" se dopo 30s di ricerca non trovi nulla.
   - R1 Azienda (max 150 char), R2 Indirizzo, R3 CAP + Città + Provincia, R4 solo numero P.IVA (senza prefissi), R5 SOLO numero telefonico (niente "Tel:"), R6 SOLO email (niente "Email:").
2. COMPONENTI (max 8 righe):
   - Quantità max 3 caratteri (es "4", "10").
   - Descrizione max 15 caratteri, 1-2 parole (es "Motore", "Sensore ABB").
   - Brand max 8 caratteri (es "ABB", "Omron").
   - Codice max 12 caratteri (metti modello/codice citato).
3. SPESE:
   - Km deve essere totale A/R: formato "150 km A/R".
   - Costo Km = km totali × 0,80€ (formato "€120,00").
   - Tutti gli importi in "€XX,XX" (virgola decimi). Se stimati, racchiudi tra [] come "[€30,00]".
   - Vitto/pernottamento: indicare luogo e importo. Se luogo noto ma importo assente, usa valore stimato tra [].
   - Varie: massimo 4 voci, descrizione breve + importo "€XX,XX".
4. NOTE/TESTI LUNGHI:
   - Descrizione intervento, note critiche, trascrizione max 460 caratteri ciascuno.
   - Mantieni stile tecnico conciso.
5. Fallback:
   - Se un dato manca e non puoi ricavarlo in 30s, usa "N/D".
   - Non inventare codici tecnici; usa solo quanto detto o conoscenza consolidata.

Rispetta sempre il formato JSON indicato (nessun testo extra).`;

const formatDateTime = () =>
  new Date().toLocaleString('it-IT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const KM_RATE_EURO = 0.8;
const PEDAGGIO_RATE_EURO = 0.12;
const BASE_COORDS = { lat: 44.494887, lon: 11.342616 }; // Bologna HQ
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';
const OPENCORPORATES_URL = 'https://api.opencorporates.com/v0.4/companies/search';
const USER_AGENT = 'Ultrarobots-PDF/1.0 (+https://ultrarobots.ai)';
const NOMINATIM_CONTACT_EMAIL = process.env.NOMINATIM_CONTACT_EMAIL ?? 'dev@ultrarobots.ai';

const cleanValue = (val?: string | null) => (typeof val === 'string' ? val.trim() : '');

const stripND = (val?: string | null) => {
  const cleaned = cleanValue(val);
  if (!cleaned) return '';
  return cleaned.toUpperCase() === 'N/D' ? '' : cleaned;
};

const isMissing = (val?: string | null) => {
  if (!val) return true;
  const trimmed = val.trim();
  return !trimmed || trimmed.toUpperCase() === 'N/D';
};

const GENERIC_PLACE_PATTERNS = [
  /vicin[oa]/i,
  /nei pressi/i,
  /dintorni/i,
  /di zona/i,
  /zona industriale/i,
  /zona artigianale/i,
  /area /i,
  /generico/i,
  /generica/i,
  /locale/i,
  /stimato/i,
];

const isGenericPlaceName = (val?: string | null) => {
  const cleaned = stripND(val);
  if (!cleaned) return true;
  const normalized = cleaned.trim();
  const lower = normalized.toLowerCase();

  if (normalized.startsWith('[') && normalized.endsWith(']')) {
    return true;
  }

  if ((lower.startsWith('ristorante') || lower.startsWith('trattoria')) && lower.split(/\s+/).length <= 2) {
    return true;
  }

  if (lower.startsWith('hotel') && lower.split(/\s+/).length <= 2) {
    return true;
  }

  return GENERIC_PLACE_PATTERNS.some(pattern => pattern.test(lower));
};

const limitText = (val: string | undefined | null, limit: number) => {
  const text = stripND(val);
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.slice(0, limit);
};

const stripPrefix = (val?: string | null) => {
  const text = stripND(val);
  if (!text) return '';
  return text.replace(/^(tel|cell|telefono|email|pec)\s*:?\s*/i, '').trim();
};

const sanitizePhone = (val?: string | null) => {
  const text = stripPrefix(val);
  if (!text) return '';
  const digits = text.replace(/[^0-9+]/g, '');
  return digits;
};

const sanitizeEmail = (val?: string | null) => stripPrefix(val);

const formatEuro = (value: number, estimated = false) => {
  if (!Number.isFinite(value)) return '';
  const formatted = `€${value.toFixed(2).replace('.', ',')}`;
  return estimated ? `[${formatted}]` : formatted;
};

const normalizeCurrency = (val?: string | null) => {
  const text = stripND(val);
  if (!text) return '';
  const collapsed = text.replace(/\s+/g, ' ').trim();
  const compact = collapsed.replace(/\s/g, '');
  if (/^\[?€\d+(?:\.\d{3})*,\d{2}\]?$/.test(compact)) {
    return collapsed;
  }
  const isEstimated = collapsed.startsWith('[') && collapsed.endsWith(']');
  const numericPart = collapsed.replace(/[^0-9,.\-]/g, '');
  if (!numericPart) return '';
  const parsed = Number(numericPart.replace(/\./g, '').replace(',', '.'));
  if (!Number.isFinite(parsed)) return '';
  const formatted = `€${parsed.toFixed(2).replace('.', ',')}`;
  return isEstimated ? `[${formatted}]` : formatted;
};

const normalizeKm = (val?: string | null) => {
  const text = stripND(val);
  if (!text) return '';
  if (/km/i.test(text)) {
    return text.replace(/\s+/g, ' ').trim();
  }
  const match = text.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return text;
  const num = Number(match[1].replace(',', '.'));
  if (!Number.isFinite(num)) return text;
  const normalized = num.toString().includes('.') ? num.toFixed(2).replace('.', ',') : num.toString();
  return `${normalized} km A/R`;
};

const normalizeVarieItem = (item: any) => {
  const descrizione = limitText(item?.descrizione || item?.nome, 24);
  const importo = normalizeCurrency(item?.importo);
  if (!descrizione && !importo) return null;
  return { descrizione, importo };
};

const parseFirstNumber = (val?: string | null) => {
  if (!val) return null;
  const sanitized = val.replace(/\./g, '').replace(',', '.');
  const match = sanitized.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
};

const ensureTravelCosts = (viaggio: any, profile?: CompanyProfile) => {
  if (!viaggio) return;
  let kmValue = parseFirstNumber(viaggio.km);

  if ((!kmValue || kmValue <= 0) && profile?.defaultKm) {
    kmValue = profile.defaultKm;
    viaggio.km = `${profile.defaultKm} km A/R`;
  }

  if (kmValue && (!viaggio.costoKm || isMissing(viaggio.costoKm))) {
    viaggio.costoKm = formatEuro(kmValue * KM_RATE_EURO);
  }

  if (kmValue && (!viaggio.pedaggio || isMissing(viaggio.pedaggio))) {
    const pedValue = profile?.defaultPedaggio ?? kmValue * PEDAGGIO_RATE_EURO;
    if (pedValue > 0) {
      viaggio.pedaggio = formatEuro(pedValue, profile?.defaultPedaggio === undefined);
    }
  }
};

const guessCompanyNameFromTranscript = (transcript: string) => {
  if (!transcript) return undefined;
  const lowered = transcript.toLowerCase();
  const markers = ['alla ', 'dal ', 'da ', 'presso ', 'su ', 'nel ', 'alla torneria ', 'torneria '];
  for (const marker of markers) {
    const idx = lowered.indexOf(marker);
    if (idx >= 0) {
      const start = idx + marker.length;
      const fragment = transcript.slice(start).split(/[.,]/)[0];
      const cleaned = fragment.replace(/[^A-Za-z0-9&'().\-\s]/g, '').trim();
      if (cleaned.length > 2 && cleaned.length < 120) {
        return cleaned;
      }
    }
  }
  return undefined;
};

const buildCompanyQuery = (name?: string, city?: string) => {
  if (!name) return undefined;
  if (city && !name.toLowerCase().includes(city.toLowerCase())) {
    return `${name} ${city}`;
  }
  return name;
};

const guessCityFromTranscript = (transcript: string) => {
  if (!transcript) return undefined;
  const lowered = transcript.toLowerCase();
  const markers = [' di ', ' a ', ' in ', ' nel ', ' nella ', ' vicino ', ' presso '];
  for (const marker of markers) {
    const idx = lowered.indexOf(marker);
    if (idx >= 0) {
      const fragment = transcript.slice(idx + marker.length).split(/[.,]/)[0];
      const cleaned = fragment.replace(/[^A-Za-zÀ-ÿ\s']/g, '').trim();
      if (cleaned.length > 2 && cleaned.length < 80) {
        return cleaned;
      }
    }
  }
  return undefined;
};

const fetchCompanyFromOpenCorporates = async (
  query?: string
): Promise<CompanyProfile | null> => {
  if (!query) return null;
  try {
    const url = `${OPENCORPORATES_URL}?q=${encodeURIComponent(
      query
    )}&jurisdiction_code=it&page=1&per_page=1`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    if (!res.ok) {
      console.warn('[Company] OpenCorporates HTTP', res.status);
      return null;
    }
    const data = await res.json();
    const candidate = data?.results?.companies?.[0]?.company;
    if (!candidate?.name) return null;
    const addressFull =
      candidate.registered_address_in_full ||
      candidate.registered_address ||
      candidate.registered_address_locality ||
      '';
    const addressLines = addressFull
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean);
    const address = addressLines[0];
    const cityLine =
      candidate.registered_address_locality ||
      addressLines.slice(1).join(' ') ||
      candidate.registered_address_country ||
      candidate.jurisdiction_code?.toUpperCase();

    return {
      name: candidate.name,
      aliases: [candidate.name.toLowerCase()],
      address,
      cityLine,
      sede: cityLine || addressFull,
      piva: candidate.company_number,
      defaultKm: undefined,
      defaultPedaggio: undefined,
    };
  } catch (error) {
    console.warn('[Company] OpenCorporates lookup failed:', error);
    return null;
  }
};

const applyProfileToDraft = (draft: any, profile: CompanyProfile) => {
  if (!profile) return;
  if (isMissing(draft.cliente.azienda)) draft.cliente.azienda = profile.name;
  if (isMissing(draft.cliente.indirizzo)) draft.cliente.indirizzo = profile.address || profile.sede;
  if (isMissing(draft.cliente.sede)) draft.cliente.sede = profile.sede || profile.address || profile.cityLine;
  if (isMissing(draft.cliente.citta)) draft.cliente.citta = profile.cityLine;
  if (isMissing(draft.cliente.piva)) draft.cliente.piva = profile.piva;
  if (isMissing(draft.cliente.telefono)) draft.cliente.telefono = profile.phone;
  if (isMissing(draft.cliente.email)) draft.cliente.email = profile.email;

  if (profile.vitto?.pranzo?.name && isMissing(draft.spese.vitto.pranzoPosto)) {
    draft.spese.vitto.pranzoPosto = profile.vitto.pranzo.name;
  }
  if (profile.vitto?.pranzo?.importo && isMissing(draft.spese.vitto.pranzoImporto)) {
    draft.spese.vitto.pranzoImporto = formatEuro(
      profile.vitto.pranzo.importo,
      !!profile.vitto.pranzo.estimated
    );
  }
  if (profile.vitto?.cena?.name && isMissing(draft.spese.vitto.cenaPosto)) {
    draft.spese.vitto.cenaPosto = profile.vitto.cena.name;
  }
  if (profile.vitto?.cena?.importo && isMissing(draft.spese.vitto.cenaImporto)) {
    draft.spese.vitto.cenaImporto = formatEuro(
      profile.vitto.cena.importo,
      !!profile.vitto.cena.estimated
    );
  }

  if (profile.hotel?.name && isMissing(draft.spese.pernottamento.nomeHotel)) {
    draft.spese.pernottamento.nomeHotel = profile.hotel.name;
  }
  if (profile.hotel?.nights && isMissing(draft.spese.pernottamento.numeroNotti)) {
    draft.spese.pernottamento.numeroNotti = String(profile.hotel.nights);
  }
  if (profile.hotel?.importo && isMissing(draft.spese.pernottamento.importo)) {
    draft.spese.pernottamento.importo = formatEuro(
      profile.hotel.importo,
      !!profile.hotel.estimated
    );
  }
};

const enrichReportDraft = async (
  draft: any,
  transcript: string
): Promise<{ draft: any; profile?: CompanyProfile }> => {
  const next = draft ? JSON.parse(JSON.stringify(draft)) : {};
  next.cliente = next.cliente || {};
  next.spese = next.spese || {};
  next.spese.viaggio = next.spese.viaggio || {};
  next.spese.vitto = next.spese.vitto || {};
  next.spese.pernottamento = next.spese.pernottamento || {};
  if (!Array.isArray(next.spese.varie)) next.spese.varie = [];

  const cityHint = next.cliente.citta || guessCityFromTranscript(transcript);
  const nameHint = next.cliente.azienda || guessCompanyNameFromTranscript(transcript);
  const query = buildCompanyQuery(nameHint, cityHint);
  const profileResult = await fetchCompanyFromOpenCorporates(query);
  const profile = profileResult ?? undefined;

  if (profile) {
    applyProfileToDraft(next, profile);
  }

  ensureTravelCosts(next.spese.viaggio, profile);

  return { draft: next, profile };
};

type Coordinates = { lat: number; lon: number };

const geocodeLocation = async (query: string): Promise<Coordinates | null> => {
  if (!query) return null;
  try {
    const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || !data[0]) return null;
    return {
      lat: Number(data[0].lat),
      lon: Number(data[0].lon),
    };
  } catch (error) {
    console.warn('[Geo] Nominatim lookup failed:', error);
    return null;
  }
};

const getDrivingDistanceKm = async (
  from: Coordinates,
  to: Coordinates
): Promise<number | null> => {
  try {
    const url = `${OSRM_URL}/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const meters = data?.routes?.[0]?.distance;
    if (typeof meters !== 'number') return null;
    return meters / 1000;
  } catch (error) {
    console.warn('[Geo] OSRM route failed:', error);
    return null;
  }
};

const enrichWithGeoData = async (
  draft: any,
  profile?: CompanyProfile
): Promise<{ draft: any; coords?: Coordinates }> => {
  if (!draft) return { draft };

  const queryParts = [
    draft.cliente?.indirizzo,
    draft.cliente?.citta,
    draft.cliente?.sede,
    draft.cliente?.azienda,
    profile?.address,
    profile?.cityLine,
    profile?.name,
  ].filter(Boolean);

  const query = queryParts.join(', ');
  if (!query) return { draft };

  const targetCoords = await geocodeLocation(query);
  if (!targetCoords) return { draft };

  const viaggio = draft.spese?.viaggio;
  const alreadyKm = parseFirstNumber(viaggio?.km);
  if (!alreadyKm || alreadyKm <= 0) {
    const oneWayKm = await getDrivingDistanceKm(BASE_COORDS, targetCoords);
    if (!oneWayKm) return { draft, coords: targetCoords };

    const totalKm = oneWayKm * 2;
    draft.spese = draft.spese || {};
    draft.spese.viaggio = draft.spese.viaggio || {};

    draft.spese.viaggio.km = `${Math.round(totalKm)} km A/R`;
    draft.spese.viaggio.costoKm =
      draft.spese.viaggio.costoKm && !isMissing(draft.spese.viaggio.costoKm)
        ? draft.spese.viaggio.costoKm
        : formatEuro(totalKm * KM_RATE_EURO, !profile?.defaultKm);
    draft.spese.viaggio.pedaggio =
      draft.spese.viaggio.pedaggio && !isMissing(draft.spese.viaggio.pedaggio)
        ? draft.spese.viaggio.pedaggio
        : formatEuro(totalKm * PEDAGGIO_RATE_EURO, !profile?.defaultPedaggio);
  }

  return { draft, coords: targetCoords };
};

const fetchNearestPoi = async (
  coords: Coordinates,
  amenity: 'restaurant' | 'hotel',
  fallback: string
): Promise<string> => {
  const params = new URLSearchParams({
    q: amenity === 'restaurant' ? 'ristorante' : 'albergo',
    format: 'json',
    limit: '1',
    lat: coords.lat.toString(),
    lon: coords.lon.toString(),
    email: NOMINATIM_CONTACT_EMAIL,
  });

  try {
    const res = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    if (!res.ok) {
      console.warn('[POI] Nominatim HTTP', res.status);
      return fallback;
    }
    const data = await res.json();
    const display = Array.isArray(data) && data[0]?.display_name
      ? data[0].display_name.split(',')[0]?.trim()
      : undefined;
    return display && display.length ? display : fallback;
  } catch (error) {
    console.warn('[POI] Nominatim fetch failed:', error);
    return fallback;
  }
};

const enrichHospitalityWithRealPois = async (
  draft: any,
  coords?: Coordinates,
  options?: { restaurant?: boolean; hotel?: boolean }
) => {
  if (!coords || !options) return draft;
  draft.spese = draft.spese || {};
  draft.spese.vitto = draft.spese.vitto || {};
  draft.spese.pernottamento = draft.spese.pernottamento || {};

  if (options.restaurant && (isGenericPlaceName(draft.spese.vitto.pranzoPosto) || isGenericPlaceName(draft.spese.vitto.cenaPosto))) {
    const poiName = limitText(
      await fetchNearestPoi(coords, 'restaurant', 'Ristorante Verificato'),
      25
    );
    draft.spese.vitto_nome = poiName;
    if (isGenericPlaceName(draft.spese.vitto.pranzoPosto)) {
      draft.spese.vitto.pranzoPosto = poiName;
    }
    if (isGenericPlaceName(draft.spese.vitto.cenaPosto)) {
      draft.spese.vitto.cenaPosto = poiName;
    }
  }

  if (options.hotel && isGenericPlaceName(draft.spese.pernottamento.nomeHotel)) {
    const hotelName = limitText(
      await fetchNearestPoi(coords, 'hotel', 'Hotel Verificato'),
      25
    );
    draft.spese.pernotto_nome = hotelName;
    draft.spese.pernottamento.nomeHotel = hotelName;
  }

  return draft;
};

const enforceCompanyLimit = (val?: string | null) => limitText(val, 25);

const sanitizeReportData = (draft: any, transcript: string): ReportData => {
  const clienteInput = draft?.cliente ?? {};
  const interventoInput = draft?.intervento ?? {};
  const speseInput = draft?.spese ?? {};
  const vittoInput = speseInput.vitto ?? {};
  const viaggioInput = speseInput.viaggio ?? {};
  const pernoInput = speseInput.pernottamento ?? {};
  const vittoNomeInput =
    typeof speseInput.vitto_nome === 'string' ? speseInput.vitto_nome : undefined;
  const pernottoNomeInput =
    typeof speseInput.pernotto_nome === 'string' ? speseInput.pernotto_nome : undefined;

  const base: ReportData = {
    id: typeof draft?.id === 'string' && draft.id ? draft.id : generateReportId(),
    date:
      typeof draft?.date === 'string' && draft.date
        ? draft.date
        : formatDateTime(),
    cliente: {
      azienda: enforceCompanyLimit(clienteInput.azienda ?? clienteInput.nome),
      referente: enforceCompanyLimit(clienteInput.referente ?? clienteInput.contatto),
      sede: enforceCompanyLimit(clienteInput.sede ?? clienteInput.luogo),
      indirizzo: enforceCompanyLimit(clienteInput.indirizzo),
      citta: enforceCompanyLimit(clienteInput.citta ?? clienteInput.localita),
      piva: enforceCompanyLimit(
        stripND(clienteInput.piva)?.replace(/[^0-9A-Za-z]/g, '').slice(0, 20) || ''
      ),
      telefono: enforceCompanyLimit(sanitizePhone(clienteInput.telefono)),
      email: enforceCompanyLimit(sanitizeEmail(clienteInput.email)),
    },
    intervento: {
      tipologia: limitText(interventoInput.tipologia ?? interventoInput.tipo, 60),
      statoFinale: limitText(
        interventoInput.statoFinale ?? interventoInput.stato ?? draft?.status ?? 'COMPLETATO',
        25
      ),
      descrizione: limitText(interventoInput.descrizione ?? draft?.descrizione, 460),
    },
    componenti: Array.isArray(draft?.componenti)
      ? (draft.componenti as any[])
          .slice(0, 8)
          .map(component => ({
            quantita: limitText(component?.quantita ?? component?.qty ?? component?.quantità, 3),
            descrizione: limitText(component?.descrizione ?? component?.nome, 15),
            brand: limitText(component?.brand ?? component?.marca, 8),
            codice: limitText(component?.codice ?? component?.code, 12),
          }))
      : [],
    noteCritiche: limitText(draft?.noteCritiche ?? draft?.note, 460),
    spese: {
      viaggio: {
        km: limitText(normalizeKm(viaggioInput.km), 25),
        costoKm: normalizeCurrency(viaggioInput.costoKm),
        pedaggio: normalizeCurrency(viaggioInput.pedaggio),
      },
      vitto: {
        pranzoPosto: limitText(vittoInput.pranzoPosto, 40),
        pranzoImporto: normalizeCurrency(vittoInput.pranzoImporto),
        cenaPosto: limitText(vittoInput.cenaPosto, 40),
        cenaImporto: normalizeCurrency(vittoInput.cenaImporto),
      },
      pernottamento: {
        nomeHotel: limitText(pernoInput.nomeHotel, 40),
        numeroNotti: limitText(pernoInput.numeroNotti, 12),
        importo: normalizeCurrency(pernoInput.importo),
      },
      varie: Array.isArray(speseInput.varie)
        ? (speseInput.varie as any[])
            .map(normalizeVarieItem)
            .filter(Boolean)
            .slice(0, 4) as { descrizione: string; importo: string }[]
        : [],
    },
    trascrizione: limitText(draft?.trascrizione ?? transcript, 460),
    vitto_nome: limitText(vittoNomeInput, 25),
    pernotto_nome: limitText(pernottoNomeInput, 25),
  };

  if (!base.cliente.indirizzo) {
    base.cliente.indirizzo = base.cliente.sede;
  }

  if (!base.cliente.sede && base.cliente.citta) {
    base.cliente.sede = base.cliente.citta;
  }

  const transcriptLower = transcript.toLowerCase();
  if (transcriptLower.includes('pranzo')) {
    base.spese.vitto.pranzoImporto = '€15,00';
  }
  if (transcriptLower.includes('cena')) {
    base.spese.vitto.cenaImporto = '€35,00';
  }
  if (!base.spese.pernottamento.importo || isMissing(base.spese.pernottamento.importo)) {
    base.spese.pernottamento.importo = '€80,00';
  }

  return base;
};

const needsRestaurant = (draft: any) => {
  const vitto = draft?.spese?.vitto ?? {};
  return (
    isGenericPlaceName(vitto.pranzoPosto) ||
    isGenericPlaceName(vitto.cenaPosto)
  );
};

const needsHotel = (draft: any) =>
  isGenericPlaceName(draft?.spese?.pernottamento?.nomeHotel);

const buildAnalysis = (summary: string | undefined, reportData: ReportData) => ({
  summary: summary && summary.length ? summary : reportData.intervento.descrizione,
  status: reportData.intervento.statoFinale || 'N/D',
  cliente: {
    azienda: reportData.cliente.azienda,
    referente: reportData.cliente.referente,
    sede: reportData.cliente.citta || reportData.cliente.sede,
  },
  client: reportData.cliente.azienda,
  intervento: {
    tipo: reportData.intervento.tipologia,
    descrizione: reportData.intervento.descrizione,
    statoFinale: reportData.intervento.statoFinale,
    componenti: reportData.componenti,
  },
  noteCritiche: reportData.noteCritiche,
  spese: reportData.spese,
  transcript: reportData.trascrizione,
});

export async function POST(req: NextRequest) {
  if (!process.env.DEEPGRAM_API_KEY || !process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Missing API configuration' },
      { status: 500 }
    );
  }

  // Lazy initialization to avoid build-time errors
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as Blob | null;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    if (typeof audioFile.size === 'number' && audioFile.size > MAX_AUDIO_BYTES) {
      return NextResponse.json({ error: 'Audio file too large (max 10MB)' }, { status: 413 });
    }

    console.log('[API] Processing audio...', audioFile.size, audioFile.type);

    // 1. TRANSCRIPTION (Deepgram)
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: 'nova-3',
        language: 'it',
        smart_format: true,
        punctuate: true,
        diarize: false, 
      }
    );

    if (error) {
      console.error('[API] Deepgram error:', error);
      throw new Error('Transcription failed');
    }

    const transcript = result.results.channels[0].alternatives[0].transcript;
    console.log('[API] Transcript:', transcript);

    if (!transcript || transcript.length < 5) {
        return NextResponse.json({ 
            transcript: transcript || "",
            analysis: null,
            error: "Audio troppo breve o non comprensibile."
        });
    }

    // 2. DATA STRUCTURING WITH GPT-4o (strict JSON)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: transcript,
        },
      ],
      response_format: { type: 'json_object' },
    });

    let llmPayload: any = {};
    try {
      llmPayload = JSON.parse(completion.choices[0].message.content || '{}');
    } catch (parseError) {
      console.error('[API] GPT JSON parse error:', parseError, completion.choices[0].message.content);
    }

    const reportDraft = llmPayload.reportData ?? llmPayload;
    const { draft: companyDraft, profile } = await enrichReportDraft(reportDraft, transcript);

    const restaurantNeeded = needsRestaurant(companyDraft);
    const hotelNeeded = needsHotel(companyDraft);
    const travelMissing = !parseFirstNumber(companyDraft?.spese?.viaggio?.km);

    let geoDraft = companyDraft;
    let coords: Coordinates | undefined;

    if (travelMissing || restaurantNeeded || hotelNeeded) {
      const geoResult = await enrichWithGeoData(geoDraft, profile);
      geoDraft = geoResult.draft;
      coords = geoResult.coords;
    }

    if ((restaurantNeeded || hotelNeeded) && coords) {
      geoDraft = await enrichHospitalityWithRealPois(geoDraft, coords, {
        restaurant: restaurantNeeded,
        hotel: hotelNeeded,
      });
    }

    const reportData = sanitizeReportData(geoDraft, transcript);
    const analysis = buildAnalysis(llmPayload.summary, reportData);

    console.log('[API] ReportData:', reportData);

    return NextResponse.json({
      transcript,
      analysis,
      reportData,
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API] Error processing audio:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: message },
      { status: 500 }
    );
  }
}
