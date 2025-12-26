'use server';

import OpenAI from 'openai';
import { z } from 'zod';
import { CompanyDataSchema, type CompanyData } from '@/types/company';

const BASE_HQ_ADDRESS = 'Via delle Moie 10, 25062 Concesio (BS), Italia';
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_EMAIL = process.env.NOMINATIM_CONTACT_EMAIL ?? 'dev@ultrarobots.ai';
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';
const VALIDATION_USER_AGENT = 'Ultrarobots-Validation/1.0 (+https://ultrarobots.ai)';
const BASE_HQ_COORDS = { lat: 45.58824, lon: 10.24406 }; // Via delle Moie, Bovezzo (BS)

const geospatialPrompt = `
Sei "GeoIntel TITAN", un'API di data enrichment specializzata in aziende italiane.
Hai accesso concettuale a:
- OpenCorporates (ricerche ragione sociale/P.IVA/contatti);
- Nominatim (indirizzi normalizzati in via/civico/CAP/città/provincia);
- OSRM (distanza stradale in km tra la nostra sede "${BASE_HQ_ADDRESS}" e la destinazione);
- Overpass/OSM (email/telefono pubblici quando disponibili).

Linee guida ferree:
1. Il transcript è spesso colloquiale: usa fuzzy matching su brand e città per trovare l'azienda reale.
2. Completa SEMPRE ragione sociale, P.IVA, telefono, email. Se l'informazione è assente, usa "N/D" ma SOLO dopo aver tentato deduzioni plausibili.
3. Normalizza l'indirizzo in campi separati: via, civico, CAP, città, provincia (sigla da 2 lettere).
4. Distanza: calcola km A/R usando OSRM dalla sede "${BASE_HQ_ADDRESS}" al luogo dell'azienda, arrotondata a 1 decimale. Restituisci il valore singolo (non stringa).
5. Restituisci anche le coordinate geografiche (lat/lng) della sede del cliente.
6. Output esclusivamente JSON che rispetta lo schema fornito; nessun testo extra.
`;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TranscriptSchema = z.string().min(5, 'Transcript troppo breve per l’elaborazione');

type Coordinates = { lat: number; lon: number };

type NominatimEntry = {
  display_name?: string;
  lat?: string;
  lon?: string;
  address?: Record<string, string>;
};

const toFloat = (value?: string | number | null): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const extractProvinceFromISO = (value?: string): string | undefined => {
  if (!value) return undefined;
  const match = value.match(/IT-([A-Z]{2})$/i);
  return match ? match[1].toUpperCase() : undefined;
};

const buildStreetName = (address: Record<string, string>) => {
  const street =
    address.road ||
    address.pedestrian ||
    address.residential ||
    address.industrial ||
    address.path ||
    address.cycleway;
  return street?.trim();
};

const fetchVerifiedAddress = async (data: CompanyData): Promise<NominatimEntry | null> => {
  const queryParts = [data.ragione_sociale, data.indirizzo?.citta, data.indirizzo?.provincia]
    .filter(Boolean)
    .join(' ')
    .trim();

  if (!queryParts) return null;

  const params = new URLSearchParams({
    q: queryParts,
    format: 'json',
    limit: '1',
    addressdetails: '1',
    countrycodes: 'it',
    email: NOMINATIM_EMAIL,
  });

  try {
    const res = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': VALIDATION_USER_AGENT,
      },
    });
    if (!res.ok) {
      console.warn('[Validation] Nominatim HTTP', res.status);
      return null;
    }
    const payload = await res.json();
    if (!Array.isArray(payload) || !payload[0]) {
      return null;
    }
    return payload[0] as NominatimEntry;
  } catch (error) {
    console.warn('[Validation] Nominatim lookup failed:', error);
    return null;
  }
};

const computeRoundTripKm = async (target: Coordinates): Promise<number | null> => {
  try {
    const url = `${OSRM_URL}/${BASE_HQ_COORDS.lon},${BASE_HQ_COORDS.lat};${target.lon},${target.lat}?overview=false`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': VALIDATION_USER_AGENT,
      },
    });

    if (!res.ok) {
      console.warn('[Validation] OSRM HTTP', res.status);
      return null;
    }

    const data = await res.json();
    const meters = data?.routes?.[0]?.distance;
    if (typeof meters !== 'number') return null;

    const roundTrip = (meters / 1000) * 2;
    return Math.round(roundTrip * 10) / 10;
  } catch (error) {
    console.warn('[Validation] OSRM lookup failed:', error);
    return null;
  }
};

const applyDeterministicValidation = async (aiData: CompanyData): Promise<CompanyData> => {
  try {
    const verified = await fetchVerifiedAddress(aiData);
    if (!verified) return aiData;

    if (verified.display_name) {
      aiData.indirizzo_formattato = verified.display_name;
    }

    const address = verified.address ?? {};
    const street = buildStreetName(address);
    if (street) {
      aiData.indirizzo.via = street;
    }
    if (address.house_number) {
      aiData.indirizzo.civico = address.house_number;
    }
    if (address.postcode) {
      aiData.indirizzo.cap = address.postcode;
    }
    const city = address.city || address.town || address.village || address.municipality;
    if (city) {
      aiData.indirizzo.citta = city;
    }

    const provinceCode =
      extractProvinceFromISO(address['ISO3166-2-lvl6']) ||
      extractProvinceFromISO(address['ISO3166-2-lvl5']) ||
      extractProvinceFromISO(address['ISO3166-2-lvl4']) ||
      extractProvinceFromISO(address['ISO3166-2-lvl3']) ||
      aiData.indirizzo.provincia;
    if (provinceCode) {
      aiData.indirizzo.provincia = provinceCode;
    }

    const latNum = toFloat(verified.lat);
    const lonNum = toFloat(verified.lon);
    if (latNum !== null && lonNum !== null) {
      aiData.logistica.coordinate.lat = latNum;
      aiData.logistica.coordinate.lng = lonNum;
      const km = await computeRoundTripKm({ lat: latNum, lon: lonNum });
      if (km !== null) {
        aiData.logistica.km_distanza = km;
      }
    }
  } catch (error) {
    console.warn('[Validation] Deterministic layer failed:', error);
  }

  return aiData;
};

export async function enrichCompanyFromTranscript(transcript: string): Promise<CompanyData> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY non configurata');
  }

  const safeTranscript = TranscriptSchema.parse(transcript.trim());

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: geospatialPrompt },
      { role: 'user', content: safeTranscript },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('Risposta OpenAI vuota: impossibile estrarre i dati aziendali');
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(content);
  } catch (error) {
    console.error('[Enrichment] JSON invalid:', content);
    throw new Error('JSON restituito da GPT-4o non valido');
  }

  const result = CompanyDataSchema.safeParse(parsedJson);
  if (!result.success) {
    console.error('[Enrichment] Zod errors:', result.error.flatten());
    throw new Error('Data enrichment validation failed');
  }

  return applyDeterministicValidation(result.data);
}

