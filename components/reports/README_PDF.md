# Componente ReportPDF - Documentazione

## 🚨 REGOLA FERREA - NON MODIFICARE MAI LA STRUTTURA PDF

**❌ NON TOCCARE MAI:**
- Larghezze colonne (compColQta: 10%, compColDesc: 36%, compColBrand: 25%, compColCode: 29%)
- fontSize (7, 7.5)
- padding (4, 5, 6)
- minHeight righe
- Layout generale

**✅ SE IL TESTO NON ENTRA: SI TRONCA (numberOfLines={1})**
**✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!**

---

## ⚠️ ISTRUZIONI CRITICHE PER GPT - DESCRIZIONI COMPONENTI

**REGOLA FERREA:** Le descrizioni dei componenti devono essere BREVI e CONCISE.

### ✅ DESCRIZIONI CORRETTE (esempi):
- Motore
- Encoder
- Inverter
- Fotocellula
- Cinghie
- PLC
- Relè sicurezza
- Trasformatore
- Sensore
- Azionamento
- Valvola
- Cilindro
- Filtro
- Interruttore
- Contattore

### ❌ DESCRIZIONI SBAGLIATE (troppo lunghe):
- ❌ Motore elettrico trifase asincrono
- ❌ Encoder incrementale rotativo ad alta risoluzione
- ❌ Inverter controllo velocità con comunicazione
- ❌ Sensore fotoelettrico retroriflettente con filtro
- ❌ PLC programmabile CompactLogix serie 1769

**PERCHÉ:** Le celle della tabella hanno dimensione FISSA. Il testo NON va a capo e viene troncato se troppo lungo (`numberOfLines={1}`).

**LIMITI TECNICI:**
- fontSize: 7
- padding: 4
- numberOfLines: 1 (NO wrap!)
- Larghezza colonna QTÀ: 10% (centrata)
- Larghezza colonna DESCRIZIONE: 36% della tabella
- Larghezza colonna BRAND: 25%
- Larghezza colonna CODICE: 29%

**QUANDO GENERI REPORT:** Usa SEMPRE descrizioni da 1-2 parole massimo!

---

## ⚠️ REGOLA CRITICA - CALCOLO SPESE DI VIAGGIO

**QUANDO CALCOLI LE SPESE DI VIAGGIO:**

✅ **CALCOLA AUTOMATICAMENTE:**
- Importo Km = Km totali (andata + ritorno) × **0,8€/km**
- Esempio: 150 km A/R → Importo Km = 150 × 0,8 = **€120,00**
- Se l'utente dice solo "andata", moltiplica per 2 per ottenere A/R
- Il campo `km` deve contenere il totale A/R (es: "150 km A/R")
- Il campo `costoKm` deve contenere l'importo calcolato (es: "€120,00")

**ESEMPIO CORRETTO:**
```typescript
spese: {
  viaggio: {
    km: '150 km A/R',           // ✅ Totale andata + ritorno
    costoKm: '€120,00',          // ✅ Calcolato: 150 × 0,8
    pedaggio: '€25,00'           // Se presente
  }
}
```

---

## ⚠️ REGOLA CRITICA - SPESE DI VITTO

**QUANDO ESTRAI SPESE DI PRANZO E CENA:**

✅ **FORMATO RICHIESTO:**
- `pranzoPosto`: nome ristorante/locale (es: "Trattoria del Borgo", "Ristorante La Botte")
- `pranzoImporto`: formato **"€XX,XX"** (es: "€25,00", "€35,50")
- `cenaPosto`: nome ristorante/locale (es: "Hotel", "Trattoria del Corso")
- `cenaImporto`: formato **"€XX,XX"** (es: "€30,00", "€42,00")

**ESEMPI CORRETTI:**
```typescript
vitto: {
  pranzoPosto: 'Trattoria del Borgo',    // ✅ Nome locale
  pranzoImporto: '€25,00',                // ✅ Formato €XX,XX
  cenaPosto: 'Hotel',                    // ✅ Nome locale
  cenaImporto: '€30,00'                  // ✅ Formato €XX,XX
}
```

**⚠️⚠️⚠️ VALORI DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️**

Se il tecnico **NON menziona l'importo** MA ha fatto pranzo/cena (dedotto dal contesto):
- `pranzoImporto`: **"[€ 15,00]"** (parentesi quadre = ipotizzato)
- `cenaImporto`: **"[€ 30,00]"** (parentesi quadre = ipotizzato)

**REGOLE:**
- Senza parentesi `€XX,XX` = dichiarato dal tecnico
- Con parentesi `[€XX,XX]` = ipotizzato da GPT quando non dichiarato
- Se non ha pranzato/cenato: `"N/D"`
- Dedurre pranzo/cena dal contesto (durata intervento, orari, menzioni indirette)

---

## ⚠️ REGOLA CRITICA - SPESE DI PERNOTTAMENTO

**QUANDO ESTRAI SPESE DI PERNOTTAMENTO:**

✅ **FORMATO RICHIESTO:**
- `nomeHotel`: nome hotel/albergo (es: "Hotel Centrale", "Hotel Parma Centro")
- `numeroNotti`: numero notti come **stringa** (es: "2", "1", "3")
- `importo`: formato **"€XX,XX"** (es: "€160,00", "€80,00")

**ESEMPI CORRETTI:**
```typescript
pernottamento: {
  nomeHotel: 'Hotel Centrale',           // ✅ Nome hotel
  numeroNotti: '2',                     // ✅ Stringa, non numero
  importo: '€160,00'                    // ✅ Formato €XX,XX
}
```

**⚠️⚠️⚠️ VALORE DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️**

Se il tecnico **NON menziona l'importo** MA ha pernottato (dedotto dal contesto):
- Calcola **"[€ 80,00]"** per notte e moltiplica per il numero di notti
- Esempio: 1 notte → `importo`: **"[€ 80,00]"**
- Esempio: 2 notti → `importo`: **"[€ 160,00]"** (80 × 2)
- Se dice prezzo a notte: calcola totale (es. "€80/notte x 2 = € 160,00")
- Valore standard: **€80/notte** se non dichiarato

**REGOLE:**
- Senza parentesi `€XX,XX` = dichiarato dal tecnico
- Con parentesi `[€XX,XX]` = ipotizzato da GPT quando non dichiarato
- Se non ha pernottato: `"N/D"`
- Dedurre pernottamento dal contesto (durata intervento, menzioni di "notte", "hotel", ecc.)

**⚠️ FORMATO IMPORTI:**
- SEMPRE formato **"€XX,XX"** con virgola come separatore decimale
- Esempi: "€25,00", "€30,50", "€160,00", "€180,75"
- Se l'utente dice "25 euro", converti in "€25,00"
- Se l'utente dice "25 e 50", converti in "€25,50"

---

## ⚠️ REGOLA CRITICA - VISUALIZZAZIONE CONDIZIONALE CAMPI

**Nel PDF, alcuni campi vengono mostrati SOLO SE la riga superiore non è "N/D":**

### ✅ VITTO:
- `pranzoPosto` e `cenaPosto` vengono **SEMPRE mostrati** (anche se "N/D")
- Importo pranzo viene mostrato **SOLO SE** `pranzoPosto !== 'N/D'` (riga superiore)
- Importo cena viene mostrato **SOLO SE** `cenaPosto !== 'N/D'` (riga superiore)
- Se `pranzoPosto` o `cenaPosto` sono "N/D", gli importi **NON vengono mostrati** nel PDF

### ✅ PERNOTTAMENTO:
- `nomeHotel` viene **SEMPRE mostrato** (anche se "N/D")
- Notti e Importo vengono mostrati **SOLO SE** `nomeHotel !== 'N/D'` (riga superiore)
- Se `nomeHotel` è "N/D", notti e importo **NON vengono mostrati** nel PDF

### ✅ VIAGGIO:
- Km, Importo Km e Importo Pedaggio vengono mostrati **SOLO SE** i rispettivi campi `!== 'N/D'`
- Se sono "N/D", i campi rimangono **vuoti** nel PDF

### ✅ VARIE:
- Mostra solo se esistono (`varie[0]`, `varie[1]`, `varie[2]`, `varie[3]`)
- Se non esistono, il campo rimane **vuoto**

**IMPORTANTE:** Usa `"N/D"` quando il dato non è disponibile, così il PDF nasconde automaticamente i campi correlati!

---

Componente React per generare PDF professionali usando `@react-pdf/renderer`, che replica esattamente il layout del documento ULTRAROBOTS RAPPORTO INTERVENTO.

## 📦 Installazione

La libreria è già installata nel progetto:

```bash
npm install @react-pdf/renderer
```

## 🎯 File Creati

1. **`ReportPDF.tsx`** - Componente principale per il rendering del PDF
2. **`ReportPDFExample.tsx`** - Componente esempio per visualizzare/scaricare il PDF
3. **`/app/api/generate-pdf-react/route.ts`** - API route per generare PDF lato server

## 🔧 Utilizzo

### 1. Lato Client - Visualizzazione PDF

**IMPORTANTE:** Usa `dynamic import` con `ssr: false` per Next.js:

```tsx
'use client';
import dynamic from 'next/dynamic';

const ReportPDFExample = dynamic(
  () => import('@/components/reports/ReportPDFExample'),
  { ssr: false }
);

export default function ReportPage() {
  return <ReportPDFExample mode="viewer" />;
}
```

### 2. Lato Client - Download PDF

```tsx
'use client';
import ReportPDFExample from '@/components/reports/ReportPDFExample';

export default function ReportPage() {
  return <ReportPDFExample mode="download" />;
}
```

### 3. Con Dati Personalizzati

```tsx
'use client';
import ReportPDFExample from '@/components/reports/ReportPDFExample';
import { ReportData } from '@/components/reports/ReportPDF';

export default function ReportPage() {
  const myData: ReportData = {
    id: '251220-0310-87A8',
    date: '20/12/2025, 03:10:14',
    cliente: {
      azienda: 'Barilla',
      referente: 'Mario Rossi',
      sede: 'Parma, Via Roma 123',
    },
    intervento: {
      tipologia: 'Manutenzione straordinaria',
      statoFinale: 'COMPLETATO',
      descrizione: 'Sostituzione componenti critici del sistema.',
    },
    componenti: ['motori', 'encoder', 'inverter', 'cinghie'],
    noteCritiche: 'Nessuna criticità rilevata',
    spese: {
      viaggio: {
        km: '150 km A/R',
        costoKm: '€120,00',
        pedaggio: '€25,00',
      },
      vitto: {
        pranzoPosto: 'Trattoria del Borgo',
        pranzoImporto: '€25,00',
        cenaPosto: 'Hotel',
        cenaImporto: '[€ 30,00]',
      },
      pernottamento: {
        nomeHotel: 'Hotel Centrale',
        numeroNotti: '2',
        importo: '[€ 160,00]',
      },
      varie: [{ descrizione: 'Materiali vari', importo: '€30,00' }],
    },
    trascrizione: 'Testo della trascrizione originale...',
  };

  return <ReportPDFExample mode="viewer" data={myData} />;
}
```

### 4. Chiamata API per Generazione Server-Side

```typescript
// Client-side fetch
const generatePDF = async (reportData: ReportData) => {
  const response = await fetch('/api/generate-pdf-react', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reportData }),
  });

  if (!response.ok) {
    throw new Error('Errore nella generazione del PDF');
  }

  // Scarica il PDF
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `report-${reportData.id}-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
```

### 5. Utilizzo Diretto del Componente ReportPDF

**IMPORTANTE:** PDFViewer richiede dynamic import:

```tsx
'use client';
import dynamic from 'next/dynamic';
import ReportPDF, { ReportData } from '@/components/reports/ReportPDF';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function CustomReportPage() {
  const data: ReportData = {
    // ... i tuoi dati
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PDFViewer width="100%" height="100%">
        <ReportPDF data={data} />
      </PDFViewer>
    </div>
  );
}
```

## 📋 Struttura Dati (TypeScript Interface)

```typescript
export interface ReportData {
  id: string;
  date: string;
  cliente: {
    azienda: string;
    referente: string;
    sede: string;
  };
  intervento: {
    tipologia: string;
    statoFinale: string;
    descrizione: string;
  };
  componenti: string[] | Componente[]; // descrizioni brevi, max ~15 caratteri
  noteCritiche: string;
  spese: {
    viaggio: {
      km?: string;
      costoKm?: string;
      pedaggio?: string;
      destinazione?: string; // backward compat
      costo?: string; // backward compat
    };
    vitto?: {
      pranzoPosto: string;
      pranzoImporto: string;
      cenaPosto: string;
      cenaImporto: string;
    } | string;
    pernottamento?: {
      nomeHotel: string;
      numeroNotti: string; // es. "2" (solo numero come stringa)
      importo: string;
    } | string;
    varie?: Array<{ descrizione: string; importo?: string }> | string;
  };
  trascrizione: string;
}
```

### Regole spese e visibilità
- Usa la struttura: viaggio { km, costoKm, pedaggio }, vitto { pranzoPosto, pranzoImporto, cenaPosto, cenaImporto }, pernottamento { nomeHotel, numeroNotti (stringa numerica breve, es. "2"), importo }, varie come array di { descrizione, importo? }.
- Per nascondere un campo, assegna `"N/D"`: il PDF lo pulisce e la cella resta vuota; le righe legate a quel campo non vengono mostrate.
- Importi stimati: usa parentesi quadre (es. `"[€ 15,00]"`). Il renderer aggiunge `€ ` davanti, quindi vedrai `€ [ 15,00]`; passa il valore con le parentesi se vuoi mantenerle.
- Le descrizioni componenti devono essere brevissime (1-2 parole, ~15 caratteri), tutto viene troncato, non va a capo.
- Non usare fonti esterne (es. Google Places); deduci solo dal contesto fornito.

### Limiti caratteri / righe per ogni campo (troncamento automatico)
- Azienda + Sede: ~150 caratteri, maxLines 6.
- Tipologia: ~150 caratteri, maxLines 6.
- Referente: ~25 caratteri, maxLines 1.
- Stato finale: ~25 caratteri, maxLines 1.
- Descrizione attività: ~460 caratteri, maxLines 6.
- Note critiche: ~460 caratteri, maxLines 6.
- Componenti (8 righe):
  - Quantità: max 3 caratteri (tieni su 1 riga).
  - Descrizione: max 15 caratteri, maxLines 1.
  - Brand: max 8 caratteri, maxLines 1.
  - Codice: max 12 caratteri, maxLines 1.
- Spese viaggio:
  - Km: ~18 caratteri (es. `Km: 150`), maxLines 1.
  - Importo Km: ~20 caratteri (es. `Importo Km: €120,00`), maxLines 1.
  - Pedaggio: ~20 caratteri, maxLines 1.
- Spese vitto:
  - PranzoPosto: max 24 caratteri, maxLines 1.
  - PranzoImporto: ~20 caratteri, maxLines 1.
  - CenaPosto: max 24 caratteri, maxLines 1.
  - CenaImporto: ~22 caratteri (mantieni 1 riga).
- Spese pernottamento:
  - NomeHotel: max 24 caratteri, maxLines 1.
  - NumeroNotti: max 12 caratteri, maxLines 1 (solo numero come stringa, es. "2").
  - Importo: ~20 caratteri, maxLines 1.
- Spese varie (fino a 4 voci): ciascuna ~24 caratteri su 1 riga (descrizione + eventuale importo).
- Trascrizione originale: ~460 caratteri, maxLines 6.

## 🎨 Personalizzazione Stili

Gli stili sono definiti in `StyleSheet.create()` nel file `ReportPDF.tsx`. Puoi modificarli facilmente:

```typescript
const styles = StyleSheet.create({
  // Cambia il colore del logo
  logo: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#0070F3', // <-- Cambia qui
    letterSpacing: 2,
  },
  // ... altri stili
});
```

## 🔍 Sezioni del PDF

Il documento è composto da:

1. **Header** - Logo, titolo, ID report, data
2. **Dati Cliente** - Tabella con azienda, referente, sede
3. **Dettagli Intervento** - Tipologia, stato, descrizione
4. **Componenti** - Lista bullettata
5. **Note Critiche** - Campo testo in tabella
6. **Spese di Trasferta** - Tabella dettagliata con viaggio, vitto, pernottamento
7. **Trascrizione Originale** - Box con testo in font monospace
8. **Footer** - Branding DIGITALENGINEERED.AI

## ⚙️ Opzioni Avanzate

### Aggiungere Font Personalizzati

```typescript
import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'CustomFont',
  src: '/fonts/custom-font.ttf',
});

// Poi usa nel StyleSheet
const styles = StyleSheet.create({
  text: {
    fontFamily: 'CustomFont',
  },
});
```

### Modificare il Logo

Il logo attuale usa `/assets/SVG_PNG/Ai-mark.black.png`:

```tsx
<Image
  src="/assets/SVG_PNG/Ai-mark.black.png"
  style={styles.logoImage}
/>
```

Per cambiare:
1. Sostituisci il file PNG in `/public/assets/SVG_PNG/`
2. Oppure cambia il path in `ReportPDF.tsx`

**Stile logo:**
```typescript
logoImage: {
  width: 35,        // ← Modifica dimensione
  height: 35,       // ← Modifica dimensione
  objectFit: 'contain',
},
```

### Multi-pagina Automatica

Il componente gestisce automaticamente il flusso delle pagine quando il contenuto è troppo lungo.

## 🚀 API Endpoint

**POST** `/api/generate-pdf-react`

**Body:**
```json
{
  "reportData": {
    "id": "251220-0310-87A8",
    "date": "20/12/2025, 03:10:14",
    "cliente": {
      "azienda": "Barilla",
      "referente": "N/D",
      "sede": "N/D"
    },
    "intervento": {
      "tipologia": "Sostituzione componenti",
      "statoFinale": "COMPLETATO",
      "descrizione": "..."
    },
    "componenti": ["motori", "encoder"],
    "noteCritiche": "Nessuna",
    "spese": {
      "viaggio": {
        "km": "150 km A/R",
        "costoKm": "€120,00",
        "pedaggio": "€25,00"
      },
      "vitto": {
        "pranzoPosto": "Trattoria del Borgo",
        "pranzoImporto": "€25,00",
        "cenaPosto": "Hotel",
        "cenaImporto": "[€ 30,00]"
      },
      "pernottamento": {
        "nomeHotel": "Hotel Centrale",
        "numeroNotti": "2",
        "importo": "[€ 160,00]"
      },
      "varie": [
        { "descrizione": "Materiali", "importo": "€30,00" }
      ]
    },
    "trascrizione": "..."
  }
}
```

**Response:**
- Success: PDF file (application/pdf)
- Error: JSON con dettagli errore

## 📝 Note Importanti

1. **'use client'**: I componenti che usano `PDFViewer` o `PDFDownloadLink` devono avere la direttiva `'use client'`
2. **Server-Side**: Per generare PDF lato server, usa `renderToBuffer()` (vedi API route)
3. **Performance**: La generazione lato server è più performante per PDF complessi
4. **Primitive**: Usa SOLO le primitive di @react-pdf/renderer (Document, Page, View, Text, Image)
5. **Non usare**: HTML standard (div, span, h1, etc.) non funziona!

## 🐛 Troubleshooting

### "PDFViewer is a web specific API" o "bundler not loading from web build"
**Soluzione:** Usa `dynamic import` con `ssr: false`:
```tsx
import dynamic from 'next/dynamic';
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false }
);
```

### "Cannot use JSX element without 'use client'"
Aggiungi `'use client'` all'inizio del file.

### "Font not found"
Assicurati di registrare i font personalizzati prima di usarli.

### Il PDF non si genera
Controlla la console per errori e verifica che tutti i campi obbligatori siano presenti nei dati.

## 📚 Risorse

- [Documentazione @react-pdf/renderer](https://react-pdf.org/)
- [Esempi di stili](https://react-pdf.org/styling)
- [API Reference](https://react-pdf.org/components)

---

**Creato per ULTRAROBOTS - TITAN PROTOCOL v4.5**

