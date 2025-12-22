# Componente ReportPDF - Documentazione

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
        destinazione: 'Parma',
        km: '150',
        costo: '75',
      },
      vitto: '45',
      pernottamento: '90',
      varie: 'Materiali vari',
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
  componenti: string[];
  noteCritiche: string;
  spese: {
    viaggio: {
      destinazione: string;
      km: string;
      costo: string;
    };
    vitto: string;
    pernottamento: string;
    varie: string;
  };
  trascrizione: string;
}
```

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
        "destinazione": "Milano",
        "km": "150",
        "costo": "50"
      },
      "vitto": "30",
      "pernottamento": "80",
      "varie": "Materiali"
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

