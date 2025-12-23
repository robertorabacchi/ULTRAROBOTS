# ⚡ Quick Start - Genera il tuo primo PDF in 2 minuti

## 🎯 Step 1: Testa subito il sistema

```bash
npm run dev
```

Poi apri: **http://localhost:3000/test-pdf**

✅ Vedrai il PDF già funzionante!

---

## 🚀 Step 2: Usa nel tuo codice

### Copia e incolla questo codice:

```tsx
'use client';
import { PDFViewer } from '@react-pdf/renderer';
import ReportPDF, { ReportData } from '@/components/reports/ReportPDF';

export default function MioPDF() {
  // I tuoi dati
  const data: ReportData = {
    id: '251220-0310-87A8',
    date: new Date().toLocaleString('it-IT'),
    cliente: {
      azienda: 'La Mia Azienda',
      referente: 'Mario Rossi',
      sede: 'Milano, Via Roma 1'
    },
    intervento: {
      tipologia: 'Manutenzione',
      statoFinale: 'COMPLETATO',
      descrizione: 'Tutto ok!'
    },
    componenti: ['motori', 'encoder'],
    noteCritiche: 'Nessuna',
    spese: {
      viaggio: { destinazione: 'Milano', km: '100', costo: '50' },
      vitto: '30',
      pernottamento: '80',
      varie: 'N/D'
    },
    trascrizione: 'Il mio testo...'
  };

  // Visualizza il PDF
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PDFViewer width="100%" height="100%">
        <ReportPDF data={data} />
      </PDFViewer>
    </div>
  );
}
```

---

## 📥 Step 3: Scarica PDF invece di visualizzarlo

Cambia solo l'import:

```tsx
'use client';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF, { ReportData } from '@/components/reports/ReportPDF';

export default function ScaricaPDF() {
  const data: ReportData = { /* ... i tuoi dati ... */ };

  return (
    <PDFDownloadLink
      document={<ReportPDF data={data} />}
      fileName="report.pdf"
    >
      {({ loading }) => (
        <button>
          {loading ? 'Generazione...' : 'Scarica PDF'}
        </button>
      )}
    </PDFDownloadLink>
  );
}
```

---

## 🎨 Step 4: Personalizza gli stili

Apri: `components/reports/ReportPDF.tsx`

Cerca: `const styles = StyleSheet.create({`

Modifica i colori, font, dimensioni!

```typescript
logo: {
  fontSize: 18,
  color: '#FF0000', // ← Cambia qui!
}
```

---

## 🔄 Step 5: Integra con i tuoi dati esistenti

Hai già dati in un altro formato? Usa il converter:

```typescript
import { convertOldToNewFormat } from '@/lib/pdf-data-converter';

const vecchiDati = { /* formato vecchio */ };
const nuoviDati = convertOldToNewFormat(vecchiDati);
```

---

## ✅ Fatto!

Hai generato il tuo primo PDF professionale con React! 🎉

### 📚 Prossimi passi:

- Leggi `GUIDA_RAPIDA_PDF.md` per funzioni avanzate
- Leggi `components/reports/README_PDF.md` per documentazione completa
- Testa `/test-pdf` per vedere tutte le modalità

---

## 🆘 Problemi?

**PDF non si vede?**
→ Verifica di avere `'use client'` all'inizio del file

**Errore di import?**
→ Riavvia il server: `npm run dev`

**Stili non funzionano?**
→ Usa solo proprietà CSS di @react-pdf/renderer

---

**🎯 Tutto qui! Semplice, no?**

*Documentazione completa: `GUIDA_RAPIDA_PDF.md`*

























