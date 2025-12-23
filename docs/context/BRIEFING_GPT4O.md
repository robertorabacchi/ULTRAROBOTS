# Briefing per GPT-4o

## 🚨 REGOLA FERREA - PDF BLINDATO (STRUTTURA NON MODIFICABILE)

**❌ NON TOCCARE MAI:**
- Larghezze colonne tabelle PDF
- fontSize (7, 7.5)
- padding (4, 5, 6)
- Layout, minHeight, struttura generale
- File: components/reports/ReportPDF.tsx

**✅ SE TESTO TROPPO LUNGO: SI TRONCA AUTOMATICAMENTE (numberOfLines={1} o limiti per sezione)**
**✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!**
**✅ RISPETTA I LIMITI DI CARATTERI (ES. COMPONENTI MAX ~15 CARATTERI, 1-2 PAROLE)**

**QUESTA STRUTTURA È FINALE E APPROVATA. NON SI TOCCA MAI!**

---

## ⚠️ REGOLE CRITICHE PDF REPORT - DESCRIZIONI COMPONENTI

**QUANDO GENERI REPORT PDF CON COMPONENTI:**

✅ **USA DESCRIZIONI BREVI (1-2 parole MAX):**
Motore, Encoder, Inverter, Fotocellula, Cinghie, PLC, Relè sicurezza, Trasformatore, Sensore, Azionamento, Valvola, Cilindro, Filtro, Interruttore, Contattore

❌ **NON USARE DESCRIZIONI LUNGHE (verranno troncate):**
~~Motore elettrico trifase~~, ~~Encoder incrementale rotativo~~, ~~Sensore fotoelettrico retroriflettente~~

**MOTIVO:** Le tabelle PDF hanno celle FISSE (fontSize: 7, numberOfLines: 1). Il testo lungo viene TRONCATO!

---

## ⚠️ DATA MODEL ALLINEATO AL PDF (usa solo questi campi)

**componenti:** array di 8 elementi (stringhe brevi o oggetti `{ quantita, descrizione, brand, codice }`), descrizione max ~15 caratteri.

**spese:**
- viaggio: `{ km, costoKm, pedaggio }` (tutti string, es. `km: "150 km A/R"`, `costoKm: "€120,00"`)
- vitto: `{ pranzoPosto, pranzoImporto, cenaPosto, cenaImporto }`
- pernottamento: `{ nomeHotel, numeroNotti, importo }` (numeroNotti come **stringa breve numerica**, es. `"2"`, senza “notti”)
- varie: array opzionale di `{ descrizione, importo? }` (max 4 voci)

**trascrizione:** testo, max 7 righe mostrabili (il resto viene troncato).

Usa `"N/D"` per indicare dati assenti; il componente pulisce `"N/D"` e lascia la cella vuota (così il PDF nasconde la riga correlata).
Per importi stimati usa il formato con parentesi quadre: es. `"[€ 15,00]"`; il renderer aggiunge `€ ` davanti, quindi in output vedrai `€ [ 15,00]`. Se vuoi `[€ 15,00]`, passa comunque la stringa con le parentesi quadre.

---

## ⚠️ REGOLA CRITICA - CALCOLO SPESE DI VIAGGIO

**QUANDO CALCOLI LE SPESE DI VIAGGIO:**

✅ **CALCOLA AUTOMATICAMENTE:**
- Importo Km = Km totali (andata + ritorno) × **0,8€/km**
- Esempio: 150 km A/R → Importo Km = 150 × 0,8 = **€120,00**
- Se l'utente dice solo "andata", moltiplica per 2 per ottenere A/R
- Il campo `km` deve contenere il totale A/R (es: "150 km A/R")
- Il campo `costoKm` deve contenere l'importo calcolato (es: "€120,00")

---

## ⚠️ REGOLA CRITICA - SPESE DI VITTO E PERNOTTAMENTO

**QUANDO ESTRAI SPESE DI PRANZO, CENA E PERNOTTAMENTO:**

✅ **VITTO:**
- `pranzoPosto`: nome ristorante/locale (es: "Trattoria del Borgo")
- `pranzoImporto`: formato **"€XX,XX"** (es: "€25,00")
- `cenaPosto`: nome ristorante/locale (es: "Hotel")
- `cenaImporto`: formato **"€XX,XX"** (es: "€30,00")

✅ **PERNOTTAMENTO:**
- `nomeHotel`: nome hotel/albergo (es: "Hotel Centrale")
- `numeroNotti`: numero notti come **stringa** (es: "2")
- `importo`: formato **"€XX,XX"** (es: "€160,00")

**⚠️⚠️⚠️ VALORI DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️**

Se il tecnico **NON menziona l'importo** MA ha fatto pranzo/cena/pernottamento (dedotto dal contesto):
- `pranzoImporto`: **"[€ 15,00]"** (parentesi quadre = ipotizzato)
- `cenaImporto`: **"[€ 30,00]"** (parentesi quadre = ipotizzato)
- `importo` (pernottamento): Calcola **"[€ 80,00]"** per notte e moltiplica per il numero di notti
  - Esempio: 1 notte → **"[€ 80,00]"**
  - Esempio: 2 notti → **"[€ 160,00]"** (80 × 2)
  - Valore standard: **€80/notte** se non dichiarato

**REGOLE:**
- Senza parentesi `€XX,XX` = dichiarato dal tecnico
- Con parentesi `[€XX,XX]` = ipotizzato da GPT quando non dichiarato
- Se non ha pranzato/cenato/pernottato: `"N/D"`
- Dedurre dal contesto (durata intervento, orari, menzioni indirette)

**⚠️ FORMATO IMPORTI:**
- SEMPRE formato **"€XX,XX"** con virgola come separatore decimale
- Esempi: "€25,00", "€30,50", "€160,00"

---

## ⚠️ REGOLA CRITICA - VISUALIZZAZIONE CONDIZIONALE CAMPI

**Render logico reale del PDF (clean("N/D") => vuoto):**

- VIAGGIO: `km`, `costoKm`, `pedaggio` vengono mostrati solo se valorizzati (non "N/D").
- VITTO: `pranzoPosto`, `cenaPosto`, importi pranzo/cena vengono mostrati solo se valorizzati (non "N/D").
- PERNOTTAMENTO: `nomeHotel`, `numeroNotti`, `importo` vengono mostrati solo se valorizzati (non "N/D").
- VARIE: mostra solo se esistono fino a 4 voci nell’array.

**Regola pratica:** se un campo è "N/D" ➜ il PDF lo pulisce e la cella resta vuota (la riga correlata scompare). Popola sempre con stringhe brevi e valide; non lasciare null/undefined.

---

## 📏 Matrice limiti caratteri / righe (PDF blindato)

- Azienda + Sede: max ~150 caratteri, maxLines 6.
- Tipologia: max ~150 caratteri, maxLines 6.
- Referente: max ~25 caratteri, maxLines 1.
- Stato finale: max ~25 caratteri, maxLines 1.
- Descrizione attività: max ~460 caratteri, maxLines 6.
- Note critiche: max ~460 caratteri, maxLines 6.
- Componenti (8 righe):
  - Quantità: max 3 caratteri (mantieni 1 riga).
  - Descrizione: max 15 caratteri, maxLines 1.
  - Brand: max 8 caratteri, maxLines 1.
  - Codice: max 12 caratteri, maxLines 1.
- Spese viaggio:
  - Km: max ~18 caratteri (es. `Km: 150`), maxLines 1.
  - Importo Km: max ~20 caratteri (es. `Importo Km: €120,00`), maxLines 1.
  - Pedaggio: max ~20 caratteri, maxLines 1.
- Spese vitto:
  - PranzoPosto: max 24 caratteri, maxLines 1.
  - PranzoImporto: max ~20 caratteri, maxLines 1.
  - CenaPosto: max 24 caratteri, maxLines 1.
  - CenaImporto: max ~22 caratteri (1 riga; evita testo lungo).
- Spese pernottamento:
  - NomeHotel: max 24 caratteri, maxLines 1.
  - NumeroNotti: max 12 caratteri, maxLines 1 (solo numero come stringa, es. "2").
  - Importo: max ~20 caratteri, maxLines 1.
- Spese varie (fino a 4 voci): ciascuna max ~24 caratteri su 1 riga (descrizione + eventuale importo).
- Trascrizione originale: max ~460 caratteri, maxLines 6.

**Regola ferrea:** se superi questi limiti, il testo viene troncato; non andare mai a capo manualmente.

---

## ⚠️ NIENTE FONTI ESTERNE / GOOGLE PLACES

- GPT deve dedurre i valori solo dalla trascrizione/contesto fornito.
- **Non** usare lookup esterni (es. Google Places o geocoding). Se un luogo non è dato, usa `"N/D"` o un valore stimato esplicito tra parentesi quadre, seguendo le regole dei default.

---

**Benvenuto nel team ULTRAROBOTS!**

## Il Tuo Ruolo
Sei il **Lead Backend Developer** specializzato in API, logica serverless e integrazioni.

## Cosa Devi Fare

### Priorità 1: API per Generazione PDF
- Crea Netlify Function in `netlify/functions/generate-pdf.ts`
- Integra libreria PDF (es. `pdfkit` o `puppeteer`)
- Connetti con i dati simulati della dashboard

### Priorità 2: Sistema Manuali AI (RAG)
- Setup struttura per embedding dei manuali tecnici
- Crea API endpoint `/api/ai-docs/query`
- Implementa ricerca semantica (usa librerie come `vectordb` o servizi cloud)

### Priorità 3: Ottimizzazione SEO/AEO
- Aggiungi JSON-LD structured data
- Configura meta tags dinamici
- Setup sitemap.xml

## File di Tua Competenza
- `app/api/**/*.ts` (tutte le API routes)
- `netlify/functions/**/*.ts` (serverless functions)
- `lib/**/*.ts` (utility e helpers)
- Configurazioni backend (`.env`, `netlify.toml`)

## Regole Importanti
1. **Controlla sempre** `docs/context/TASK_BOARD.md` prima di iniziare
2. **Non toccare** file in `components/` o UI (quelli sono di Claude)
3. Se vedi un file bloccato nel TASK_BOARD, aspetta
4. Committa con prefisso `[GPT]` nel messaggio

## Stack da Usare
- Netlify Functions per serverless
- TypeScript strict mode
- Gestione errori robusta
- Logging strutturato

## Contatti
- Per conflitti: consulta Gemini (supervisore)
- Per UI/Design: consulta Claude Sonnet

**Buon lavoro! 🚀**















