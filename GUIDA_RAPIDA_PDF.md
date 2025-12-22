# 🚀 Guida Rapida - Sistema PDF con @react-pdf/renderer

Sistema completo per generare PDF professionali in React/Next.js usando `@react-pdf/renderer`.

## 📦 Cosa è stato creato

### 1. **Componente PDF Principale**
- `components/reports/ReportPDF.tsx`
  - Componente React che replica il layout ULTRAROBOTS
  - Usa solo primitive @react-pdf/renderer (Document, Page, View, Text)
  - Stili definiti con StyleSheet.create
  - Props tipizzata con TypeScript

### 2. **Componente di Esempio**
- `components/reports/ReportPDFExample.tsx`
  - Viewer per visualizzare PDF nel browser
  - Download link per scaricare PDF
  - Esempi di utilizzo

### 3. **API Route Next.js**
- `app/api/generate-pdf-react/route.ts`
  - Endpoint POST per generare PDF lato server
  - Supporta CORS
  - Restituisce PDF come file scaricabile

### 4. **Utilità di Conversione**
- `lib/pdf-data-converter.ts`
  - Converte dati dal vecchio formato (pdfkit) al nuovo
  - Funzioni di validazione
  - Generatore ID report

### 5. **Integrazione Voice Report**
- `components/reports/VoiceReportPDFIntegration.tsx`
  - Esempio completo: voce → trascrizione → PDF
  - Workflow automatizzato

### 6. **Pagina di Test**
- `app/test-pdf/page.tsx`
  - Interfaccia per testare il componente
  - Modalità viewer e download
  - Test API endpoint

### 7. **Documentazione**
- `components/reports/README_PDF.md`
  - Guida completa e dettagliata
  - Esempi di codice
  - Troubleshooting

---

## ⚡ Quick Start

### Test Immediato

1. **Avvia il server di sviluppo:**
```bash
npm run dev
```

2. **Visita la pagina di test:**
```
http://localhost:3000/test-pdf
```

3. **Vedi il PDF generato** con i dati di esempio!

---

## 🎯 Utilizzo Rapido

### Opzione 1: Visualizza PDF (Client-Side)

**⚠️ IMPORTANTE:** Usa `dynamic import` con `ssr: false` per Next.js:

```tsx
'use client';
import dynamic from 'next/dynamic';
import ReportPDF, { sampleReportData } from '@/components/reports/ReportPDF';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function MyPage() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PDFViewer width="100%" height="100%">
        <ReportPDF data={sampleReportData} />
      </PDFViewer>
    </div>
  );
}
```

### Opzione 2: Download PDF (Client-Side)

```tsx
'use client';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF, { sampleReportData } from '@/components/reports/ReportPDF';

export default function MyPage() {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={sampleReportData} />}
      fileName="report.pdf"
    >
      {({ loading }) => (loading ? 'Caricamento...' : 'Scarica PDF')}
    </PDFDownloadLink>
  );
}
```

### Opzione 3: API Server-Side

```typescript
// Chiamata fetch
const response = await fetch('/api/generate-pdf-react', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    reportData: {
      id: '251220-0310-87A8',
      date: '20/12/2025, 03:10:14',
      cliente: {
        azienda: 'Barilla',
        referente: 'Mario Rossi',
        sede: 'Parma'
      },
      intervento: {
        tipologia: 'Manutenzione',
        statoFinale: 'COMPLETATO',
        descrizione: 'Intervento completato con successo'
      },
      componenti: ['motori', 'encoder'],
      noteCritiche: 'Nessuna',
      spese: {
        viaggio: { destinazione: 'Parma', km: '150', costo: '50' },
        vitto: '30',
        pernottamento: '80',
        varie: 'N/D'
      },
      trascrizione: 'Testo della trascrizione...'
    }
  })
});

const blob = await response.blob();
// Scarica il blob...
```

---

## 🔄 Migrazione dal vecchio sistema (pdfkit)

```typescript
import { convertOldToNewFormat } from '@/lib/pdf-data-converter';

// I tuoi vecchi dati
const oldData = {
  id: 'TEST-001',
  client: 'Barilla',
  reportType: 'Manutenzione',
  // ... altri campi vecchi
};

// Converti al nuovo formato
const newData = convertOldToNewFormat(oldData);

// Usa con il nuovo componente
<ReportPDF data={newData} />
```

---

## 📋 Struttura Dati Required

```typescript
interface ReportData {
  id: string;                    // ID report
  date: string;                  // Data formato italiano
  cliente: {
    azienda: string;             // Nome azienda
    referente: string;           // Nome referente
    sede: string;                // Indirizzo sede
  };
  intervento: {
    tipologia: string;           // Tipo intervento
    statoFinale: string;         // Stato (COMPLETATO, IN CORSO, etc.)
    descrizione: string;         // Descrizione dettagliata
  };
  componenti: string[];          // Lista componenti
  noteCritiche: string;          // Note critiche
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
  trascrizione: string;          // Testo trascrizione
}
```

---

## 🎨 Personalizzazione Layout

Gli stili sono in `ReportPDF.tsx`, sezione `StyleSheet.create()`.

**Esempio - Cambia colore logo:**

```typescript
const styles = StyleSheet.create({
  // Dimensione logo
  logoImage: {
    width: 35,     // ← Cambia qui
    height: 35,    // ← Cambia qui
  },
  // Stile testo logo
  logoText: {
    fontSize: 22,  // ← Cambia qui
    color: '#000000',
  },
  // ...
});
```

**Logo:** Usa `/assets/SVG_PNG/Ai-mark.black.png` (total black)

**Esempio - Aggiungi campo custom:**

```tsx
// Nel componente ReportPDF
<View style={styles.section}>
  <Text style={styles.sectionTitle}>6. IL MIO CAMPO CUSTOM</Text>
  <Text style={styles.descriptionText}>{data.mioCampo}</Text>
</View>
```

---

## 🔧 Comandi Utili

```bash
# Installa dipendenze
npm install

# Avvia dev server
npm run dev

# Testa il PDF
# Vai su: http://localhost:3000/test-pdf

# Build production
npm run build
```

---

## ⚠️ Note Importanti

1. ✅ **Usa solo primitive @react-pdf/renderer:**
   - ✓ Document, Page, View, Text, Image, StyleSheet
   - ✗ NON usare div, span, h1, etc.

2. ✅ **'use client' per componenti interattivi:**
   - PDFViewer richiede 'use client'
   - PDFDownloadLink richiede 'use client'
   - Le API route NON devono avere 'use client'

3. ✅ **Server-side è più performante:**
   - Per PDF complessi, usa `/api/generate-pdf-react`
   - Evita di generare PDF molto pesanti nel browser

4. ✅ **Dati sempre completi:**
   - Usa valori di default (es: 'N/D')
   - Valida i dati prima di generare il PDF

---

## 🎯 File da Consultare

| File | Scopo |
|------|-------|
| `components/reports/README_PDF.md` | Documentazione completa |
| `app/test-pdf/page.tsx` | Esempio interattivo |
| `components/reports/ReportPDF.tsx` | Componente principale |
| `lib/pdf-data-converter.ts` | Utility conversione dati |

---

## 🆘 Problemi Comuni

### "PDFViewer is a web specific API"
→ Usa `dynamic import` con `ssr: false` (vedi esempi sopra)

### "Cannot use JSX without 'use client'"
→ Aggiungi `'use client'` all'inizio del file

### "Font not registered"
→ Usa solo font built-in: Helvetica, Courier, Times

### PDF non si scarica
→ Controlla console browser per errori
→ Verifica che tutti i campi required siano presenti

### Stili non applicati
→ Usa solo proprietà CSS supportate da @react-pdf/renderer
→ Vedi: https://react-pdf.org/styling

---

## 📚 Risorse

- [Documentazione @react-pdf/renderer](https://react-pdf.org/)
- [Styling Guide](https://react-pdf.org/styling)
- [Esempi Ufficiali](https://react-pdf.org/examples)

---

## ✅ Checklist Integrazione

- [ ] Installato `@react-pdf/renderer`
- [ ] Testato componente su `/test-pdf`
- [ ] Creato i dati del tuo progetto
- [ ] Testato API endpoint
- [ ] Personalizzato stili (opzionale)
- [ ] Integrato con il tuo workflow
- [ ] Testato su production build

---

**🎉 Tutto pronto! Il sistema PDF è completamente funzionante.**

Per assistenza, consulta:
- `components/reports/README_PDF.md` (documentazione estesa)
- Pagina test: `http://localhost:3000/test-pdf`

---

*Creato per ULTRAROBOTS - TITAN PROTOCOL v4.5*  
*Powered by @react-pdf/renderer*

