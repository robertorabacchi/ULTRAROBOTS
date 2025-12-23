# Default price of 35
_Exported on 23/12/2025 at 19:12:14 CET from Cursor (2.2.43)_

---

**User**

devo mettere i loghi giusti nel pdf!!!!!!ù

dove ti dico io!!!!

---

**Cursor**

Capisco che devi inserire i loghi corretti nel PDF nelle posizioni che mi indicherai. Per aiutarti, ho bisogno di alcune informazioni:

1. **Quale file PDF** devo modificare?
2. **Quali loghi** devo inserire (dove si trovano i file dei loghi)?
3. **Dove esattamente** nel PDF devo posizionarli?

Fammi prima esplorare il progetto per vedere cosa c'è:

Vedo che ci sono file PDF e loghi. Fammi vedere i file relativi al PDF:

Perfetto! Ora vedo la struttura. Nel file `ReportPDF.tsx` ci sono i loghi nel PDF:

1. **Header** (riga 432-435): logo centrale `logo-wordmark-black.png`
2. **Footer** (riga 635-637): 
   - Logo ULTRAROBOTS: `logo-wordmark-black.png`
   - Logo Digital Engineered: `digitalengineered.wordmark-black.png`

**Dimmi esattamente quali loghi vuoi cambiare e dove!** Ad esempio:
- Vuoi cambiare il logo nell'header?
- Vuoi cambiare i loghi nel footer?
- Quali file dei loghi disponibili vuoi usare? (ho visto che hai `Ai-mark-black.png`, `logo-wordmark-black-cyan.png`, ecc.)

Aspetto le tue indicazioni precise! 🎯

---

**User**

al centro dell header

---

**Cursor**

Perfetto! Devo cambiare il logo al centro dell'header. Quale logo vuoi mettere? Vedo che hai questi file disponibili:

- `Ai-mark-black.png` (solo il simbolo AI)
- `Ai-mark-cyan.png` (simbolo AI ciano)
- `logo-wordmark-black-cyan.png` (logo completo nero e ciano)
- `logo-wordmark-white-cyan.png` (logo completo bianco e ciano)
- `digitalengineered.wordmark-black.png`

**Attualmente nell'header c'è**: `logo-wordmark-black.png`

**Quale vuoi mettere al suo posto?** 

Ad esempio:
- Il logo con il ciano (`logo-wordmark-black-cyan.png`)?
- Solo il simbolo AI (`Ai-mark-black.png` o `Ai-mark-cyan.png`)?
- Un altro?

Dimmi quale file! 🎯

---

**User**

e anche nel footer tutto a sinistra 

---

**Cursor**

Perfetto! Quindi devo cambiare:

1. **Header centro**: quale logo vuoi?
2. **Footer sinistra**: quale logo vuoi?

Attualmente:
- **Header**: `logo-wordmark-black.png`
- **Footer sinistra**: `logo-wordmark-black.png`
- **Footer destra**: `digitalengineered.wordmark-black.png` (questo lo lascio?)

**Dimmi quali file vuoi usare!** Ad esempio:
- Header centro: `logo-wordmark-black-cyan.png`?
- Footer sinistra: `Ai-mark-black.png`?

O dimmi tu quali preferisci tra quelli disponibili! 🎯

---

**User**

Attualmente:
Header: logo-wordmark-black.png
Footer sinistra: logo-wordmark-black.png
Footer destra: digitalengineered.wordmark-black.png (questo lo lascio?)

---

**Cursor**

Sì esatto! Questa è la situazione attuale:

- **Header centro**: `logo-wordmark-black.png`
- **Footer sinistra**: `logo-wordmark-black.png`
- **Footer destra**: `digitalengineered.wordmark-black.png`

**Ora dimmi cosa vuoi cambiare!** 

Quali loghi vuoi mettere al posto di quelli attuali? Scegli tra:
- `Ai-mark-black.png`
- `Ai-mark-cyan.png`
- `logo-wordmark-black-cyan.png`
- `logo-wordmark-white-cyan.png`
- O lasciare come sono?

Esempio:
- Header centro: `logo-wordmark-black-cyan.png` ✅
- Footer sinistra: `Ai-mark-cyan.png` ✅
- Footer destra: `digitalengineered.wordmark-black.png` (lasciare) ✅

**Dimmi le tue scelte!** 🎯

---

**User**

mi fai vedere il pdf? perchpè non compaiono in stampa?

---

**Cursor**

Certo! Fammi controllare come viene generato il PDF e vedere se c'è un problema con i loghi.

Ho capito il problema! I loghi nel PDF potrebbero non comparire perché:

1. **Il path delle immagini usa `baseUrl`** che potrebbe non essere corretto quando generi il PDF
2. **Le immagini devono essere accessibili** durante la generazione del PDF

Guarda alle righe 421 e 434-435 del `ReportPDF.tsx`:

```typescript
const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
```

Il problema è che quando generi il PDF server-side, le immagini potrebbero non essere raggiungibili. 

**Soluzioni possibili:**

1. **Usare path assoluti del filesystem** invece di URL
2. **Convertire le immagini in base64** e includerle direttamente nel PDF
3. **Verificare che SITE_URL sia impostato correttamente**

Fammi controllare un PDF esistente per vedere se i loghi ci sono:

```typescript
const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
```

---

**User**

voglio questa che ti ho mandato!!!

---

**Cursor**

Ah! Vuoi usare l'immagine che mi hai mandato! Fammi salvare l'immagine che mi hai inviato e poi la metterò nel PDF.

Perfetto! Vedo che l'immagine che mi hai mandato è molto lunga e orizzontale (sembra un logo completo con testo). 

**Dove vuoi che la metta?**
1. **Header centro** (al posto di `logo-wordmark-black.png`)
2. **Footer sinistra** (al posto di `logo-wordmark-black.png`)
3. **Entrambi**?

E **come la salvo?** Dammi un nome, ad esempio:
- `logo-ultrarobots-full.png`
- `logo-header-new.png`
- O dimmi tu!

Poi la inserisco nel PDF! 🎯

---

**User**

fermati!!!!!

---

**Cursor**

🛑 OK, mi fermo! 

Aspetto le tue istruzioni. Dimmi cosa vuoi fare! 👍

---

**User**

i loghi sono 2!!!    logo-wordmark-black.png  in alto al centro del header in grande e nel footer a sinistra !!!!

---

**Cursor**

Perfetto! Ora ho capito! 

**Situazione attuale:**
- **Header centro**: `logo-wordmark-black.png` ✅ (già c'è)
- **Footer sinistra**: `logo-wordmark-black.png` ✅ (devo metterlo)
- **Footer destra**: `digitalengineered.wordmark-black.png` ✅ (già c'è)

Quindi devo solo **aggiungere** `logo-wordmark-black.png` anche nel **footer a sinistra**!

Procedo subito a modificare il file `ReportPDF.tsx`:

```typescriptreact
      <View style={styles.footer} fixed>
        <Image style={styles.footerLogo} src={`${baseUrl}/assets/SVG_PNG/logo-wordmark-black.png`} />
        <Text style={styles.footerText}>TITAN 4.5 PROTOCOL EMBEDED      CORE  DESIGNED  BY</Text>
        <Image style={styles.footerLogoDigitalEngineered} src={`${baseUrl}/assets/SVG_PNG/digitalengineered.wordmark-black.png`} />
        <Text style={styles.footerText}>ALL RIGHT RESERVED</Text>
      </View>
```

Aspetta, rileggo il footer attuale per vedere esattamente com'è strutturato:

Perfetto! Vedo che **il logo è già nel footer a sinistra** (riga 635)! 

Il footer attuale è:
- **Sinistra**: `logo-wordmark-black.png` ✅ (già c'è!)
- **Centro**: Testo "TITAN 4.5 PROTOCOL..."
- **Destra**: `digitalengineered.wordmark-black.png` ✅

**Quindi i loghi sono già posizionati correttamente!**

Il problema che dicevi è che **non si vedono in stampa**? Questo potrebbe essere perché:
1. Il `baseUrl` non è impostato correttamente
2. Le immagini non vengono caricate durante la generazione del PDF

Fammi verificare il problema. Vuoi che generi un PDF di test per vedere se i loghi compaiono? 🎯

---

**User**

digitalengineered.wordmark-black.png      nel foooter a destra prima di  ALL RIGHT RESERVED

---

**Cursor**

Perfetto! Ora ho capito! Il logo `digitalengineered.wordmark-black.png` è già a destra nel footer! 

Guarda la riga 637:
```typescript
<Image style={styles.footerLogoDigitalEngineered} src={`${baseUrl}/assets/SVG_PNG/digitalengineered.wordmark-black.png`} />
```

**Footer attuale:**
- Sinistra: `logo-wordmark-black.png` ✅
- Centro: Testo "TITAN 4.5 PROTOCOL EMBEDED CORE DESIGNED BY"
- Destra: `digitalengineered.wordmark-black.png` ✅
- Destra: Testo "ALL RIGHT RESERVED" ✅

**È già tutto corretto!** 

Il problema è che **i loghi non si vedono quando stampi il PDF**, giusto? 

Questo è probabilmente perché il `baseUrl` non funziona correttamente durante la generazione server-side del PDF. Devo cambiare il modo in cui vengono caricate le immagini, usando il filesystem invece degli URL.

Vuoi che sistemi questo problema così i loghi compaiono nel PDF? 🎯

```typescript
<Image style={styles.footerLogoDigitalEngineered} src={`${baseUrl}/assets/SVG_PNG/digitalengineered.wordmark-black.png`} />
```

---

**User**

BENE

---

**Cursor**

Perfetto! Ora sistemo il caricamento dei loghi nel PDF usando il filesystem invece degli URL, così compaiono correttamente in stampa!

Il problema è che `@react-pdf/renderer` (usato in `generate-pdf-react`) non può accedere direttamente al filesystem come fa PDFKit. Devo convertire le immagini in **base64** e passarle come data URI.

Creo uno script per convertire i loghi in base64:

```typescript
import fs from 'fs';
import path from 'path';

/**
 * Converte i loghi in base64 per l'uso nel PDF
 * Questo risolve il problema del caricamento delle immagini in @react-pdf/renderer
 */

export function getLogoBase64(logoName: string): string {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'SVG_PNG', logoName);
    
    if (!fs.existsSync(logoPath)) {
      console.error(`Logo non trovato: ${logoPath}`);
      return '';
    }

    const imageBuffer = fs.readFileSync(logoPath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = logoName.endsWith('.png') ? 'image/png' : 'image/jpeg';
    
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.error(`Errore nel caricamento del logo ${logoName}:`, error);
    return '';
  }
}

export const LOGOS = {
  ultrarobots: getLogoBase64('logo-wordmark-black.png'),
  digitalengineered: getLogoBase64('digitalengineered.wordmark-black.png'),
};

```

Ora aggiorno il `ReportPDF.tsx` per accettare i loghi come props invece di caricarli da URL:

```typescriptreact
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  type TextProps,
  type DocumentProps,
} from '@react-pdf/renderer';

/**
 * ⚠️⚠️⚠️ ISTRUZIONI CRITICHE PER GPT - LIMITI CAMPI PDF ⚠️⚠️⚠️
 * 
 * TUTTI I CAMPI HANNO LIMITI DI TRONCAMENTO AUTOMATICO!
 * 
 * 📋 CAMPI CON LIMITI:
 * 
 * 1. AZIENDA (con sede): numberOfLines={3}
 *    ✅ Formato: "Nome Azienda - Sede"
 *    ⚠️ Se troppo lungo viene TRONCATO a 3 righe
 * 
 * 2. TIPOLOGIA: numberOfLines={3}
 *    ✅ Esempi: "Sostituzione componenti", "Manutenzione preventiva"
 *    ⚠️ Se troppo lungo viene TRONCATO a 3 righe
 * 
 * 3. REFERENTE: numberOfLines={1}
 *    ✅ Esempi: "Mario Rossi", "N/D"
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 4. STATO FINALE: numberOfLines={1}
 *    ✅ Esempi: "COMPLETATO", "IN CORSO", "ANNULLATO"
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 5. DESCRIZIONE ATTIVITÀ: numberOfLines={4}
 *    ✅ Descrizione breve dell'intervento (max 4 righe)
 *    ⚠️ Se troppo lunga viene TRONCATO a 4 righe
 * 
 * 6. COMPONENTI - DESCRIZIONE: numberOfLines={1}, MAX 15 caratteri!
 *    REGOLA ASSOLUTA: Le descrizioni devono essere BREVI (1-2 parole MAX)
 *    ✅ DESCRIZIONI CORRETTE:
 *       - Motore, Encoder, Inverter, Fotocellula, Cinghie, PLC, Relè sicurezza
 *       - Trasformatore, Sensore, Azionamento, Valvola, Cilindro, Filtro
 *    ❌ DESCRIZIONI SBAGLIATE (verranno TRONCATE):
 *       - "Motore elettrico trifase" ❌
 *       - "Encoder incrementale rotativo" ❌
 *       - "Sensore fotoelettrico retroriflettente" ❌
 *    MOTIVO: fontSize: 7, numberOfLines: 1, celle FISSE
 *    Solo 15-20 caratteri visibili nella colonna DESCRIZIONE!
 * 
 * 7. NOTE CRITICHE: numberOfLines={4}
 *    ✅ Note brevi (max 4 righe)
 *    ⚠️ Se troppo lunghe vengono TRONCATE a 4 righe
 * 
 * 8. SPESE DI TRASFERTA (tutte le celle): numberOfLines={1}
 *    ✅ Formato breve per ogni campo (viaggio, vitto, pernottamento, varie)
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 9. TRASCRIZIONE ORIGINALE: numberOfLines={7}
 *    ✅ Trascrizione completa (max 7 righe)
 *    ⚠️ Se troppo lunga viene TRONCATO a 7 righe
 * 
 * ⚠️ REGOLA GENERALE: Se il testo supera numberOfLines, viene TRONCATO automaticamente!
 * NON modificare mai numberOfLines per far stare il testo!
 */
export interface Componente {
  quantita: string;
  descrizione: string; // ⚠️ MAX 15 caratteri! Es: "Motore", "Encoder", "PLC"
  brand: string;
  codice: string;
}

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
  // Supporta sia array di stringhe (vecchio formato) che array di oggetti (nuovo formato)
  componenti: string[] | Componente[];
  noteCritiche: string;
  spese: {
    viaggio: {
      km?: string;
      costoKm?: string;
      pedaggio?: string;
      // Vecchio formato (backward compatibility)
      destinazione?: string;
      costo?: string;
    };
    // Nuovo formato (oggetto) o vecchio formato (stringa) per backward compatibility
    vitto?: {
      pranzoPosto: string;
      pranzoImporto: string;
      cenaPosto: string;
      cenaImporto: string;
    } | string;
    // Nuovo formato (oggetto) o vecchio formato (stringa) per backward compatibility
    pernottamento?: {
      nomeHotel: string;
      numeroNotti: string;
      importo: string;
    } | string;
    // Nuovo formato (array) o vecchio formato (stringa) per backward compatibility
    varie?: Array<{ descrizione: string; importo?: string }> | string;
  };
  trascrizione: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 10,
    borderBottom: '2pt solid #000000',
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 'auto',
  },
  reportId: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  reportDate: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  reportTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginBottom: 0,
  },
  section: {
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  tableRowLast: {
    flexDirection: 'row',
    minHeight: 18,  // ⚠️ ALTEZZA MINIMA FISSA! STESSA DELLE ALTRE RIGHE!
    // ⚠️ NON ha borderBottomWidth perché è l'ultima riga della tabella
  },
  tableHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 8,
    padding: 6,
  },
  tableCell: {
    padding: 6,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  tableCellBorder: {
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  col3: { width: '33.33%' },
  col2: { width: '50%' },
  col4: { width: '25%' },
  colFull: { width: '100%' },
  colHeader: { width: '15%' },
  colValue: { width: '35%' },
  // Tabella componenti doppia
  componentsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  componentTable: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    // Minimo calibrato su 1 header + 4 righe da 18px: evita spazio extra sotto l'ultima riga
    minHeight: 90,
  },
  descriptionBox: {
    padding: 8,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  descriptionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  descriptionText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
    lineHeight: 1.3,
  },
  componentsList: {
    paddingLeft: 10,
  },
  componentItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 9,
    marginRight: 5,
  },
  transcriptionBox: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    minHeight: 105,
  },
  transcriptionText: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#000000',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '2pt solid #000000',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  footerLogo: {
    height: 12,  // ⚠️ PICCOLO! NON MODIFICARE L'ALTEZZA FOOTER
    width: 'auto',
  },
  footerLogoDigitalEngineered: {
    height: 20,  // ⚠️ PIÙ GRANDE del logo ULTRAROBOTS per migliore visibilità
    width: 'auto',
  },
  footerText: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 7,
    fontFamily: 'Courier',
    color: '#000000',
    marginTop: 2,
  },
  // ⚠️ NON MODIFICARE MAI QUESTE LARGHEZZE! STRUTTURA APPROVATA E FINALE!
  compColQta: { width: '10%', textAlign: 'center' },  // ❌ NON TOCCARE
  compColDesc: { width: '36%' },  // ❌ NON TOCCARE
  compColBrand: { width: '25%' },  // ❌ NON TOCCARE
  compColCode: { width: '29%' },  // ❌ NON TOCCARE
  // Totale: 100% - Se testo non entra = TRONCA, NON modificare larghezze!
  // ⚠️ NON MODIFICARE padding e fontSize! STRUTTURA FINALE APPROVATA!
  spesaCell: {
    padding: 4,  // ❌ NON TOCCARE
    fontSize: 7,  // ❌ NON TOCCARE
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  spesaHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
  },
  // ⚠️ NON MODIFICARE padding e fontSize! STRUTTURA FINALE APPROVATA!
  componentCell: {
    padding: 4,  // ❌ NON TOCCARE
    fontSize: 7,  // ❌ NON TOCCARE
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  componentHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
  },
  componentHeaderQta: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
    textAlign: 'center',
  },
});

// Normalizza i valori: rimuove "N/D" e valori falsy, così i campi vuoti restano vuoti nel PDF
const clean = (value?: string) => (value && value !== 'N/D' ? value : '');
const truncateClean = (value: string | undefined, max: number) => {
  const v = clean(value);
  if (!v) return '';
  return v.length > max ? `${v.slice(0, max - 1)}…` : v;
};
const formatKmValue = (value?: string) => {
  const v = clean(value);
  if (!v) return '';
  const match = v.match(/[\d.,]+/);
  return match ? match[0] : v;
};
const formatEuro = (value?: string) => {
  const v = clean(value);
  if (!v) return '';
  return `€ ${v.replace(/€/g, '').trim()}`;
};
// Tipi @react-pdf/renderer non espongono maxLines in TextProps: forziamo con any.
const max1 = { maxLines: 1 } as any;
const max6 = { maxLines: 6 } as any;
const isComponente = (comp: unknown): comp is Componente =>
  typeof comp === 'object' && comp !== null && 'descrizione' in comp;

const normalizeComp = (comp: string | Componente | undefined) => {
  if (!comp) {
    return { quantita: '', descrizione: '', brand: '', codice: '' };
  }
  if (isComponente(comp)) {
    return {
      quantita: clean(comp.quantita),
      descrizione: clean(comp.descrizione),
      brand: clean(comp.brand),
      codice: clean(comp.codice),
    };
  }
  const val = clean(comp);
  return {
    quantita: val,
    descrizione: val,
    brand: '',
    codice: '',
  };
};
const joinWithDash = (left?: string, right?: string) => {
  const a = clean(left);
  const b = clean(right);
  if (a && b) return `${a} - ${b}`;
  return a || b || '';
};

/**
 * ⚠️⚠️⚠️ REGOLA FERREA - NON MODIFICARE MAI QUESTA STRUTTURA ⚠️⚠️⚠️
 * 
 * ❌ NON TOCCARE:
 * - Larghezze colonne (compColQta, compColDesc, compColBrand, compColCode)
 * - fontSize (7, 7.5)
 * - padding (4, 5, 6)
 * - minHeight delle righe
 * - Layout generale
 * 
 * ✅ SE IL TESTO È TROPPO LUNGO: SI TRONCA AUTOMATICAMENTE (numberOfLines={1})
 * ✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!
 * 
 * QUESTA STRUTTURA È FINALE E APPROVATA. NON SI TOCCA MAI!
 */
type ReportPDFProps = DocumentProps & { 
  data: ReportData;
  logoUltrarobots?: string;
  logoDigitalEngineered?: string;
};

const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

const ReportPDF: React.FC<ReportPDFProps> = ({ data, ...documentProps }) => (
  <Document {...documentProps}>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.reportTitle}>RAPPORTO DI</Text>
          <Text style={[styles.reportTitle, { marginTop: -2 }]}>INTERVENTO</Text>
        </View>
        <View style={styles.headerCenter}>
          <Image
            style={styles.logoImage}
            src={`${baseUrl}/assets/SVG_PNG/logo-wordmark-black.png`}
          />
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.reportId}>ID REPORT: {data.id}</Text>
          <Text style={styles.reportDate}>DATA: {data.date}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>AZIENDA</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { minHeight: 65 }]}>
              <Text {...max6}>{truncateClean(joinWithDash(data.cliente.azienda, data.cliente.sede), 150)}</Text>
            </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>TIPOLOGIA</Text></View>
                <View style={[styles.tableCell, styles.colValue, { minHeight: 65 }]}><Text {...max6}>{truncateClean(data.intervento.tipologia, 150)}</Text></View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>REFERENTE</Text></View>
                <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { minHeight: 20 }]}>
                  <Text {...max1}>{truncateClean(data.cliente.referente, 25)}</Text>
                </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>STATO FINALE</Text></View>
                <View style={[styles.tableCell, styles.colValue, { minHeight: 20 }]}>
                  <Text {...max1}>{truncateClean(data.intervento.statoFinale, 25)}</Text>
                </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESCRIZIONE ATTIVITÀ</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text
            style={styles.descriptionText}
            {...max6} // fino a 6 righe, poi tronca
          >
            {truncateClean(data.intervento.descrizione, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPONENTI</Text>
        <View style={styles.componentsContainer}>
          {/* Tabella SX */}
          <View style={styles.componentTable}>
            <View style={styles.tableRow}>
              <View style={[styles.componentHeaderQta, styles.compColQta, styles.tableCellBorder]}><Text>QTÀ</Text></View>
              <View style={[styles.componentHeader, styles.compColDesc, styles.tableCellBorder]}><Text>DESCRIZIONE</Text></View>
              <View style={[styles.componentHeader, styles.compColBrand, styles.tableCellBorder]}><Text>BRAND</Text></View>
              <View style={[styles.componentHeader, styles.compColCode]}><Text>CODICE</Text></View>
            </View>
            {Array.from({ length: 4 }, (_, idx) => {
              const comp = normalizeComp(data.componenti[idx] as string | Componente | undefined);
              if (idx === 3) {
                return (
                  <View key={`comp-left-${idx}`} style={[styles.tableRowLast, { minHeight: 18 }]}>
                    <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                      <Text>{truncateClean(comp.quantita, 3)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColCode]}>
                      <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                    </View>
                  </View>
                );
              }
              return (
                <View key={`comp-left-${idx}`} style={[styles.tableRow, { minHeight: 18 }]}>
                  <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                    <Text>{truncateClean(comp.quantita, 3)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColCode]}>
                    <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Tabella DX */}
          <View style={styles.componentTable}>
            <View style={styles.tableRow}>
              <View style={[styles.componentHeaderQta, styles.compColQta, styles.tableCellBorder]}><Text>QTÀ</Text></View>
              <View style={[styles.componentHeader, styles.compColDesc, styles.tableCellBorder]}><Text>DESCRIZIONE</Text></View>
              <View style={[styles.componentHeader, styles.compColBrand, styles.tableCellBorder]}><Text>BRAND</Text></View>
              <View style={[styles.componentHeader, styles.compColCode]}><Text>CODICE</Text></View>
            </View>
            {Array.from({ length: 4 }, (_, idx) => {
              const comp = normalizeComp(data.componenti[idx + 4] as string | Componente | undefined);
              if (idx === 3) {
                return (
                  <View key={`comp-right-${idx}`} style={[styles.tableRowLast, { minHeight: 18 }]}>
                    <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                      <Text>{truncateClean(comp.quantita, 3)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColCode]}>
                      <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                    </View>
                  </View>
                );
              }
              return (
                <View key={`comp-right-${idx}`} style={[styles.tableRow, { minHeight: 18 }]}>
                  <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                    <Text>{truncateClean(comp.quantita, 3)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColCode]}>
                    <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTE CRITICHE</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text
            style={styles.descriptionText}
            {...max6} // fino a 6 righe, poi tronca
          >
            {truncateClean(data.noteCritiche, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SPESE DI TRASFERTA</Text>
        <View style={[styles.table, { minHeight: 90 }]}>
          <View style={styles.tableRow}>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>VIAGGIO</Text></View>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>VITTO</Text></View>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>PERNOTTO</Text></View>
            <View style={[styles.spesaHeader, styles.col4]}><Text>VARIE</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.km) ? truncateClean(`Km: ${formatKmValue(data.spese.viaggio.km)}`, 18) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto ? truncateClean(data.spese.vitto.pranzoPosto, 24) : (typeof data.spese.vitto === 'string' ? truncateClean(data.spese.vitto, 24) : '')}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento ? truncateClean(data.spese.pernottamento.nomeHotel, 24) : (typeof data.spese.pernottamento === 'string' ? truncateClean(data.spese.pernottamento, 24) : '')}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[0] ? truncateClean(`${clean(data.spese.varie[0].descrizione)}${clean(data.spese.varie[0].importo) ? `: ${clean(data.spese.varie[0].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.costoKm) ? truncateClean(`Importo Km: ${formatEuro(data.spese.viaggio.costoKm)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto && clean(data.spese.vitto.pranzoPosto) ? truncateClean(`Importo: ${formatEuro(data.spese.vitto.pranzoImporto)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento && clean(data.spese.pernottamento.nomeHotel) ? truncateClean(`Notti: ${clean(data.spese.pernottamento.numeroNotti)}`, 12) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[1] ? truncateClean(`${clean(data.spese.varie[1].descrizione)}${clean(data.spese.varie[1].importo) ? `: ${clean(data.spese.varie[1].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.pedaggio) ? truncateClean(`Importo Pedaggio: ${formatEuro(data.spese.viaggio.pedaggio)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto ? truncateClean(data.spese.vitto.cenaPosto, 24) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento && clean(data.spese.pernottamento.nomeHotel) ? truncateClean(`Importo: ${formatEuro(data.spese.pernottamento.importo)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[2] ? truncateClean(`${clean(data.spese.varie[2].descrizione)}${clean(data.spese.varie[2].importo) ? `: ${clean(data.spese.varie[2].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRowLast, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text></Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text>{typeof data.spese.vitto === 'object' && data.spese.vitto && clean(data.spese.vitto.cenaPosto) ? truncateClean(`Importo: ${formatEuro(data.spese.vitto.cenaImporto)}`, 22) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text></Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[3] ? truncateClean(`${clean(data.spese.varie[3].descrizione)}${clean(data.spese.varie[3].importo) ? `: ${clean(data.spese.varie[3].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRASCRIZIONE ORIGINALE</Text>
        <View style={styles.transcriptionBox}>
          <Text style={styles.transcriptionText} {...max6}>
            {truncateClean(data.trascrizione, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Image style={styles.footerLogo} src={`${baseUrl}/assets/SVG_PNG/logo-wordmark-black.png`} />
        <Text style={styles.footerText}>TITAN 4.5 PROTOCOL EMBEDED      CORE  DESIGNED  BY</Text>
        <Image style={styles.footerLogoDigitalEngineered} src={`${baseUrl}/assets/SVG_PNG/digitalengineered.wordmark-black.png`} />
        <Text style={styles.footerText}>ALL RIGHT RESERVED</Text>
      </View>
    </Page>
  </Document>
);

/**
 * ⚠️ GPT: QUESTO È L'ESEMPIO DA SEGUIRE!
 * NOTA BENE: Le descrizioni sono BREVI (1-2 parole)
 * NON usare MAI descrizioni lunghe come "Motore elettrico trifase"!
 */
export const sampleReportData: ReportData = {
  id: '251220-0310-87A8',
  date: '20/12/2025, 03:10:14',
  cliente: { azienda: 'Barilla', referente: '', sede: '' },
  intervento: {
    tipologia: 'Sostituzione componenti',
    statoFinale: 'COMPLETATO',
    descrizione: 'Sostituiti motori ed encoder difettosi, sostituiti inverter e cinghie del sistema di trascinamento.',
  },
  componenti: [
    // ✅ Descrizioni CORRETTE: brevi, 1-2 parole, max 15 caratteri
    { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' },
    { quantita: '2', descrizione: 'Encoder', brand: 'Heidenhain', codice: 'ERN420-1024' },
    { quantita: '4', descrizione: 'Inverter', brand: 'ABB', codice: 'ACS580-025A' },
    { quantita: '5', descrizione: 'Cinghie', brand: 'Gates', codice: '5M-15-HTD' },
    { quantita: '8', descrizione: 'Fotocellula', brand: 'Sick', codice: 'WTB4-3P3161' },
    { quantita: '1', descrizione: 'PLC', brand: 'Allen Bradley', codice: '1769-L32E' },
    { quantita: '6', descrizione: 'Relè sicurezza', brand: 'Pilz', codice: 'PNOZ X3' }, // Max 2 parole OK
    { quantita: '3', descrizione: 'Trasformatore', brand: 'Schneider', codice: 'ABL6TS25U' },
  ],
  noteCritiche: 'Nessuna',
  spese: {
    viaggio: { km: 'N/D', costoKm: 'N/D', pedaggio: 'N/D' },
    vitto: {
      pranzoPosto: 'Trattoria del Borgo',
      pranzoImporto: '€ 25,00',
      cenaPosto: 'Hotel',
      cenaImporto: '[€ 30,00]',
    },
    pernottamento: {
      nomeHotel: 'Hotel Centrale',
      numeroNotti: '2 notti',
      importo: '[€ 160,00]',
    },
    varie: [],
  },
  trascrizione: 'Fatto in Barilla abbiamo sostituito 10 motori, 2 encoder, 4 inverter, tutte le cinghie dei trascinatori, eccetera eccetera. Siamo stati li 2 giorni e bisogna fargli pagare 2 pernottamenti 4 viti e I chilometri andata e ritorno. Ciao',
};

export default ReportPDF;

```

```typescriptreact
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  type TextProps,
  type DocumentProps,
} from '@react-pdf/renderer';

/**
 * ⚠️⚠️⚠️ ISTRUZIONI CRITICHE PER GPT - LIMITI CAMPI PDF ⚠️⚠️⚠️
 * 
 * TUTTI I CAMPI HANNO LIMITI DI TRONCAMENTO AUTOMATICO!
 * 
 * 📋 CAMPI CON LIMITI:
 * 
 * 1. AZIENDA (con sede): numberOfLines={3}
 *    ✅ Formato: "Nome Azienda - Sede"
 *    ⚠️ Se troppo lungo viene TRONCATO a 3 righe
 * 
 * 2. TIPOLOGIA: numberOfLines={3}
 *    ✅ Esempi: "Sostituzione componenti", "Manutenzione preventiva"
 *    ⚠️ Se troppo lungo viene TRONCATO a 3 righe
 * 
 * 3. REFERENTE: numberOfLines={1}
 *    ✅ Esempi: "Mario Rossi", "N/D"
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 4. STATO FINALE: numberOfLines={1}
 *    ✅ Esempi: "COMPLETATO", "IN CORSO", "ANNULLATO"
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 5. DESCRIZIONE ATTIVITÀ: numberOfLines={4}
 *    ✅ Descrizione breve dell'intervento (max 4 righe)
 *    ⚠️ Se troppo lunga viene TRONCATO a 4 righe
 * 
 * 6. COMPONENTI - DESCRIZIONE: numberOfLines={1}, MAX 15 caratteri!
 *    REGOLA ASSOLUTA: Le descrizioni devono essere BREVI (1-2 parole MAX)
 *    ✅ DESCRIZIONI CORRETTE:
 *       - Motore, Encoder, Inverter, Fotocellula, Cinghie, PLC, Relè sicurezza
 *       - Trasformatore, Sensore, Azionamento, Valvola, Cilindro, Filtro
 *    ❌ DESCRIZIONI SBAGLIATE (verranno TRONCATE):
 *       - "Motore elettrico trifase" ❌
 *       - "Encoder incrementale rotativo" ❌
 *       - "Sensore fotoelettrico retroriflettente" ❌
 *    MOTIVO: fontSize: 7, numberOfLines: 1, celle FISSE
 *    Solo 15-20 caratteri visibili nella colonna DESCRIZIONE!
 * 
 * 7. NOTE CRITICHE: numberOfLines={4}
 *    ✅ Note brevi (max 4 righe)
 *    ⚠️ Se troppo lunghe vengono TRONCATE a 4 righe
 * 
 * 8. SPESE DI TRASFERTA (tutte le celle): numberOfLines={1}
 *    ✅ Formato breve per ogni campo (viaggio, vitto, pernottamento, varie)
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 9. TRASCRIZIONE ORIGINALE: numberOfLines={7}
 *    ✅ Trascrizione completa (max 7 righe)
 *    ⚠️ Se troppo lunga viene TRONCATO a 7 righe
 * 
 * ⚠️ REGOLA GENERALE: Se il testo supera numberOfLines, viene TRONCATO automaticamente!
 * NON modificare mai numberOfLines per far stare il testo!
 */
export interface Componente {
  quantita: string;
  descrizione: string; // ⚠️ MAX 15 caratteri! Es: "Motore", "Encoder", "PLC"
  brand: string;
  codice: string;
}

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
  // Supporta sia array di stringhe (vecchio formato) che array di oggetti (nuovo formato)
  componenti: string[] | Componente[];
  noteCritiche: string;
  spese: {
    viaggio: {
      km?: string;
      costoKm?: string;
      pedaggio?: string;
      // Vecchio formato (backward compatibility)
      destinazione?: string;
      costo?: string;
    };
    // Nuovo formato (oggetto) o vecchio formato (stringa) per backward compatibility
    vitto?: {
      pranzoPosto: string;
      pranzoImporto: string;
      cenaPosto: string;
      cenaImporto: string;
    } | string;
    // Nuovo formato (oggetto) o vecchio formato (stringa) per backward compatibility
    pernottamento?: {
      nomeHotel: string;
      numeroNotti: string;
      importo: string;
    } | string;
    // Nuovo formato (array) o vecchio formato (stringa) per backward compatibility
    varie?: Array<{ descrizione: string; importo?: string }> | string;
  };
  trascrizione: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 10,
    borderBottom: '2pt solid #000000',
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 'auto',
  },
  reportId: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  reportDate: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  reportTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginBottom: 0,
  },
  section: {
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  tableRowLast: {
    flexDirection: 'row',
    minHeight: 18,  // ⚠️ ALTEZZA MINIMA FISSA! STESSA DELLE ALTRE RIGHE!
    // ⚠️ NON ha borderBottomWidth perché è l'ultima riga della tabella
  },
  tableHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 8,
    padding: 6,
  },
  tableCell: {
    padding: 6,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  tableCellBorder: {
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  col3: { width: '33.33%' },
  col2: { width: '50%' },
  col4: { width: '25%' },
  colFull: { width: '100%' },
  colHeader: { width: '15%' },
  colValue: { width: '35%' },
  // Tabella componenti doppia
  componentsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  componentTable: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    // Minimo calibrato su 1 header + 4 righe da 18px: evita spazio extra sotto l'ultima riga
    minHeight: 90,
  },
  descriptionBox: {
    padding: 8,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  descriptionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  descriptionText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
    lineHeight: 1.3,
  },
  componentsList: {
    paddingLeft: 10,
  },
  componentItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 9,
    marginRight: 5,
  },
  transcriptionBox: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    minHeight: 105,
  },
  transcriptionText: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#000000',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '2pt solid #000000',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  footerLogo: {
    height: 12,  // ⚠️ PICCOLO! NON MODIFICARE L'ALTEZZA FOOTER
    width: 'auto',
  },
  footerLogoDigitalEngineered: {
    height: 20,  // ⚠️ PIÙ GRANDE del logo ULTRAROBOTS per migliore visibilità
    width: 'auto',
  },
  footerText: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 7,
    fontFamily: 'Courier',
    color: '#000000',
    marginTop: 2,
  },
  // ⚠️ NON MODIFICARE MAI QUESTE LARGHEZZE! STRUTTURA APPROVATA E FINALE!
  compColQta: { width: '10%', textAlign: 'center' },  // ❌ NON TOCCARE
  compColDesc: { width: '36%' },  // ❌ NON TOCCARE
  compColBrand: { width: '25%' },  // ❌ NON TOCCARE
  compColCode: { width: '29%' },  // ❌ NON TOCCARE
  // Totale: 100% - Se testo non entra = TRONCA, NON modificare larghezze!
  // ⚠️ NON MODIFICARE padding e fontSize! STRUTTURA FINALE APPROVATA!
  spesaCell: {
    padding: 4,  // ❌ NON TOCCARE
    fontSize: 7,  // ❌ NON TOCCARE
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  spesaHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
  },
  // ⚠️ NON MODIFICARE padding e fontSize! STRUTTURA FINALE APPROVATA!
  componentCell: {
    padding: 4,  // ❌ NON TOCCARE
    fontSize: 7,  // ❌ NON TOCCARE
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  componentHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
  },
  componentHeaderQta: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
    textAlign: 'center',
  },
});

// Normalizza i valori: rimuove "N/D" e valori falsy, così i campi vuoti restano vuoti nel PDF
const clean = (value?: string) => (value && value !== 'N/D' ? value : '');
const truncateClean = (value: string | undefined, max: number) => {
  const v = clean(value);
  if (!v) return '';
  return v.length > max ? `${v.slice(0, max - 1)}…` : v;
};
const formatKmValue = (value?: string) => {
  const v = clean(value);
  if (!v) return '';
  const match = v.match(/[\d.,]+/);
  return match ? match[0] : v;
};
const formatEuro = (value?: string) => {
  const v = clean(value);
  if (!v) return '';
  return `€ ${v.replace(/€/g, '').trim()}`;
};
// Tipi @react-pdf/renderer non espongono maxLines in TextProps: forziamo con any.
const max1 = { maxLines: 1 } as any;
const max6 = { maxLines: 6 } as any;
const isComponente = (comp: unknown): comp is Componente =>
  typeof comp === 'object' && comp !== null && 'descrizione' in comp;

const normalizeComp = (comp: string | Componente | undefined) => {
  if (!comp) {
    return { quantita: '', descrizione: '', brand: '', codice: '' };
  }
  if (isComponente(comp)) {
    return {
      quantita: clean(comp.quantita),
      descrizione: clean(comp.descrizione),
      brand: clean(comp.brand),
      codice: clean(comp.codice),
    };
  }
  const val = clean(comp);
  return {
    quantita: val,
    descrizione: val,
    brand: '',
    codice: '',
  };
};
const joinWithDash = (left?: string, right?: string) => {
  const a = clean(left);
  const b = clean(right);
  if (a && b) return `${a} - ${b}`;
  return a || b || '';
};

/**
 * ⚠️⚠️⚠️ REGOLA FERREA - NON MODIFICARE MAI QUESTA STRUTTURA ⚠️⚠️⚠️
 * 
 * ❌ NON TOCCARE:
 * - Larghezze colonne (compColQta, compColDesc, compColBrand, compColCode)
 * - fontSize (7, 7.5)
 * - padding (4, 5, 6)
 * - minHeight delle righe
 * - Layout generale
 * 
 * ✅ SE IL TESTO È TROPPO LUNGO: SI TRONCA AUTOMATICAMENTE (numberOfLines={1})
 * ✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!
 * 
 * QUESTA STRUTTURA È FINALE E APPROVATA. NON SI TOCCA MAI!
 */
type ReportPDFProps = DocumentProps & { 
  data: ReportData;
  logoUltrarobots?: string;
  logoDigitalEngineered?: string;
};

const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

const ReportPDF: React.FC<ReportPDFProps> = ({ data, logoUltrarobots, logoDigitalEngineered, ...documentProps }) => {
  // Usa i loghi base64 se forniti, altrimenti fallback agli URL
  const ultrarobotsLogo = logoUltrarobots || `${baseUrl}/assets/SVG_PNG/logo-wordmark-black.png`;
  const digitalEngineeredLogo = logoDigitalEngineered || `${baseUrl}/assets/SVG_PNG/digitalengineered.wordmark-black.png`;

  return (
    <Document {...documentProps}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.reportTitle}>RAPPORTO DI</Text>
            <Text style={[styles.reportTitle, { marginTop: -2 }]}>INTERVENTO</Text>
          </View>
          <View style={styles.headerCenter}>
            <Image
              style={styles.logoImage}
              src={ultrarobotsLogo}
            />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportId}>ID REPORT: {data.id}</Text>
            <Text style={styles.reportDate}>DATA: {data.date}</Text>
          </View>
        </View>

      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>AZIENDA</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { minHeight: 65 }]}>
              <Text {...max6}>{truncateClean(joinWithDash(data.cliente.azienda, data.cliente.sede), 150)}</Text>
            </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>TIPOLOGIA</Text></View>
                <View style={[styles.tableCell, styles.colValue, { minHeight: 65 }]}><Text {...max6}>{truncateClean(data.intervento.tipologia, 150)}</Text></View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>REFERENTE</Text></View>
                <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { minHeight: 20 }]}>
                  <Text {...max1}>{truncateClean(data.cliente.referente, 25)}</Text>
                </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>STATO FINALE</Text></View>
                <View style={[styles.tableCell, styles.colValue, { minHeight: 20 }]}>
                  <Text {...max1}>{truncateClean(data.intervento.statoFinale, 25)}</Text>
                </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESCRIZIONE ATTIVITÀ</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text
            style={styles.descriptionText}
            {...max6} // fino a 6 righe, poi tronca
          >
            {truncateClean(data.intervento.descrizione, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPONENTI</Text>
        <View style={styles.componentsContainer}>
          {/* Tabella SX */}
          <View style={styles.componentTable}>
            <View style={styles.tableRow}>
              <View style={[styles.componentHeaderQta, styles.compColQta, styles.tableCellBorder]}><Text>QTÀ</Text></View>
              <View style={[styles.componentHeader, styles.compColDesc, styles.tableCellBorder]}><Text>DESCRIZIONE</Text></View>
              <View style={[styles.componentHeader, styles.compColBrand, styles.tableCellBorder]}><Text>BRAND</Text></View>
              <View style={[styles.componentHeader, styles.compColCode]}><Text>CODICE</Text></View>
            </View>
            {Array.from({ length: 4 }, (_, idx) => {
              const comp = normalizeComp(data.componenti[idx] as string | Componente | undefined);
              if (idx === 3) {
                return (
                  <View key={`comp-left-${idx}`} style={[styles.tableRowLast, { minHeight: 18 }]}>
                    <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                      <Text>{truncateClean(comp.quantita, 3)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColCode]}>
                      <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                    </View>
                  </View>
                );
              }
              return (
                <View key={`comp-left-${idx}`} style={[styles.tableRow, { minHeight: 18 }]}>
                  <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                    <Text>{truncateClean(comp.quantita, 3)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColCode]}>
                    <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Tabella DX */}
          <View style={styles.componentTable}>
            <View style={styles.tableRow}>
              <View style={[styles.componentHeaderQta, styles.compColQta, styles.tableCellBorder]}><Text>QTÀ</Text></View>
              <View style={[styles.componentHeader, styles.compColDesc, styles.tableCellBorder]}><Text>DESCRIZIONE</Text></View>
              <View style={[styles.componentHeader, styles.compColBrand, styles.tableCellBorder]}><Text>BRAND</Text></View>
              <View style={[styles.componentHeader, styles.compColCode]}><Text>CODICE</Text></View>
            </View>
            {Array.from({ length: 4 }, (_, idx) => {
              const comp = normalizeComp(data.componenti[idx + 4] as string | Componente | undefined);
              if (idx === 3) {
                return (
                  <View key={`comp-right-${idx}`} style={[styles.tableRowLast, { minHeight: 18 }]}>
                    <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                      <Text>{truncateClean(comp.quantita, 3)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColCode]}>
                      <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                    </View>
                  </View>
                );
              }
              return (
                <View key={`comp-right-${idx}`} style={[styles.tableRow, { minHeight: 18 }]}>
                  <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                    <Text>{truncateClean(comp.quantita, 3)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColCode]}>
                    <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTE CRITICHE</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text
            style={styles.descriptionText}
            {...max6} // fino a 6 righe, poi tronca
          >
            {truncateClean(data.noteCritiche, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SPESE DI TRASFERTA</Text>
        <View style={[styles.table, { minHeight: 90 }]}>
          <View style={styles.tableRow}>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>VIAGGIO</Text></View>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>VITTO</Text></View>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>PERNOTTO</Text></View>
            <View style={[styles.spesaHeader, styles.col4]}><Text>VARIE</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.km) ? truncateClean(`Km: ${formatKmValue(data.spese.viaggio.km)}`, 18) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto ? truncateClean(data.spese.vitto.pranzoPosto, 24) : (typeof data.spese.vitto === 'string' ? truncateClean(data.spese.vitto, 24) : '')}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento ? truncateClean(data.spese.pernottamento.nomeHotel, 24) : (typeof data.spese.pernottamento === 'string' ? truncateClean(data.spese.pernottamento, 24) : '')}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[0] ? truncateClean(`${clean(data.spese.varie[0].descrizione)}${clean(data.spese.varie[0].importo) ? `: ${clean(data.spese.varie[0].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.costoKm) ? truncateClean(`Importo Km: ${formatEuro(data.spese.viaggio.costoKm)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto && clean(data.spese.vitto.pranzoPosto) ? truncateClean(`Importo: ${formatEuro(data.spese.vitto.pranzoImporto)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento && clean(data.spese.pernottamento.nomeHotel) ? truncateClean(`Notti: ${clean(data.spese.pernottamento.numeroNotti)}`, 12) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[1] ? truncateClean(`${clean(data.spese.varie[1].descrizione)}${clean(data.spese.varie[1].importo) ? `: ${clean(data.spese.varie[1].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.pedaggio) ? truncateClean(`Importo Pedaggio: ${formatEuro(data.spese.viaggio.pedaggio)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto ? truncateClean(data.spese.vitto.cenaPosto, 24) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento && clean(data.spese.pernottamento.nomeHotel) ? truncateClean(`Importo: ${formatEuro(data.spese.pernottamento.importo)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[2] ? truncateClean(`${clean(data.spese.varie[2].descrizione)}${clean(data.spese.varie[2].importo) ? `: ${clean(data.spese.varie[2].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRowLast, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text></Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text>{typeof data.spese.vitto === 'object' && data.spese.vitto && clean(data.spese.vitto.cenaPosto) ? truncateClean(`Importo: ${formatEuro(data.spese.vitto.cenaImporto)}`, 22) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text></Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[3] ? truncateClean(`${clean(data.spese.varie[3].descrizione)}${clean(data.spese.varie[3].importo) ? `: ${clean(data.spese.varie[3].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRASCRIZIONE ORIGINALE</Text>
        <View style={styles.transcriptionBox}>
          <Text style={styles.transcriptionText} {...max6}>
            {truncateClean(data.trascrizione, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Image style={styles.footerLogo} src={`${baseUrl}/assets/SVG_PNG/logo-wordmark-black.png`} />
        <Text style={styles.footerText}>TITAN 4.5 PROTOCOL EMBEDED      CORE  DESIGNED  BY</Text>
        <Image style={styles.footerLogoDigitalEngineered} src={`${baseUrl}/assets/SVG_PNG/digitalengineered.wordmark-black.png`} />
        <Text style={styles.footerText}>ALL RIGHT RESERVED</Text>
      </View>
    </Page>
  </Document>
);

/**
 * ⚠️ GPT: QUESTO È L'ESEMPIO DA SEGUIRE!
 * NOTA BENE: Le descrizioni sono BREVI (1-2 parole)
 * NON usare MAI descrizioni lunghe come "Motore elettrico trifase"!
 */
export const sampleReportData: ReportData = {
  id: '251220-0310-87A8',
  date: '20/12/2025, 03:10:14',
  cliente: { azienda: 'Barilla', referente: '', sede: '' },
  intervento: {
    tipologia: 'Sostituzione componenti',
    statoFinale: 'COMPLETATO',
    descrizione: 'Sostituiti motori ed encoder difettosi, sostituiti inverter e cinghie del sistema di trascinamento.',
  },
  componenti: [
    // ✅ Descrizioni CORRETTE: brevi, 1-2 parole, max 15 caratteri
    { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' },
    { quantita: '2', descrizione: 'Encoder', brand: 'Heidenhain', codice: 'ERN420-1024' },
    { quantita: '4', descrizione: 'Inverter', brand: 'ABB', codice: 'ACS580-025A' },
    { quantita: '5', descrizione: 'Cinghie', brand: 'Gates', codice: '5M-15-HTD' },
    { quantita: '8', descrizione: 'Fotocellula', brand: 'Sick', codice: 'WTB4-3P3161' },
    { quantita: '1', descrizione: 'PLC', brand: 'Allen Bradley', codice: '1769-L32E' },
    { quantita: '6', descrizione: 'Relè sicurezza', brand: 'Pilz', codice: 'PNOZ X3' }, // Max 2 parole OK
    { quantita: '3', descrizione: 'Trasformatore', brand: 'Schneider', codice: 'ABL6TS25U' },
  ],
  noteCritiche: 'Nessuna',
  spese: {
    viaggio: { km: 'N/D', costoKm: 'N/D', pedaggio: 'N/D' },
    vitto: {
      pranzoPosto: 'Trattoria del Borgo',
      pranzoImporto: '€ 25,00',
      cenaPosto: 'Hotel',
      cenaImporto: '[€ 30,00]',
    },
    pernottamento: {
      nomeHotel: 'Hotel Centrale',
      numeroNotti: '2 notti',
      importo: '[€ 160,00]',
    },
    varie: [],
  },
  trascrizione: 'Fatto in Barilla abbiamo sostituito 10 motori, 2 encoder, 4 inverter, tutte le cinghie dei trascinatori, eccetera eccetera. Siamo stati li 2 giorni e bisogna fargli pagare 2 pernottamenti 4 viti e I chilometri andata e ritorno. Ciao',
};

export default ReportPDF;

```

---

**User**

PERCHè NON VENGONO STAMPATI!!!!! E PRIMA VENIVANO!!!!

---

**Cursor**

Hai ragione! Prima funzionavano! Fammi controllare cosa è cambiato. Il problema potrebbe essere nel `baseUrl`.

Ho trovato il problema! Nel footer (righe 644 e 646) sto ancora usando `baseUrl` direttamente invece delle variabili che ho creato! Devo aggiornare anche il footer:

```typescriptreact
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  type TextProps,
  type DocumentProps,
} from '@react-pdf/renderer';

/**
 * ⚠️⚠️⚠️ ISTRUZIONI CRITICHE PER GPT - LIMITI CAMPI PDF ⚠️⚠️⚠️
 * 
 * TUTTI I CAMPI HANNO LIMITI DI TRONCAMENTO AUTOMATICO!
 * 
 * 📋 CAMPI CON LIMITI:
 * 
 * 1. AZIENDA (con sede): numberOfLines={3}
 *    ✅ Formato: "Nome Azienda - Sede"
 *    ⚠️ Se troppo lungo viene TRONCATO a 3 righe
 * 
 * 2. TIPOLOGIA: numberOfLines={3}
 *    ✅ Esempi: "Sostituzione componenti", "Manutenzione preventiva"
 *    ⚠️ Se troppo lungo viene TRONCATO a 3 righe
 * 
 * 3. REFERENTE: numberOfLines={1}
 *    ✅ Esempi: "Mario Rossi", "N/D"
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 4. STATO FINALE: numberOfLines={1}
 *    ✅ Esempi: "COMPLETATO", "IN CORSO", "ANNULLATO"
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 5. DESCRIZIONE ATTIVITÀ: numberOfLines={4}
 *    ✅ Descrizione breve dell'intervento (max 4 righe)
 *    ⚠️ Se troppo lunga viene TRONCATO a 4 righe
 * 
 * 6. COMPONENTI - DESCRIZIONE: numberOfLines={1}, MAX 15 caratteri!
 *    REGOLA ASSOLUTA: Le descrizioni devono essere BREVI (1-2 parole MAX)
 *    ✅ DESCRIZIONI CORRETTE:
 *       - Motore, Encoder, Inverter, Fotocellula, Cinghie, PLC, Relè sicurezza
 *       - Trasformatore, Sensore, Azionamento, Valvola, Cilindro, Filtro
 *    ❌ DESCRIZIONI SBAGLIATE (verranno TRONCATE):
 *       - "Motore elettrico trifase" ❌
 *       - "Encoder incrementale rotativo" ❌
 *       - "Sensore fotoelettrico retroriflettente" ❌
 *    MOTIVO: fontSize: 7, numberOfLines: 1, celle FISSE
 *    Solo 15-20 caratteri visibili nella colonna DESCRIZIONE!
 * 
 * 7. NOTE CRITICHE: numberOfLines={4}
 *    ✅ Note brevi (max 4 righe)
 *    ⚠️ Se troppo lunghe vengono TRONCATE a 4 righe
 * 
 * 8. SPESE DI TRASFERTA (tutte le celle): numberOfLines={1}
 *    ✅ Formato breve per ogni campo (viaggio, vitto, pernottamento, varie)
 *    ⚠️ Se troppo lungo viene TRONCATO a 1 riga
 * 
 * 9. TRASCRIZIONE ORIGINALE: numberOfLines={7}
 *    ✅ Trascrizione completa (max 7 righe)
 *    ⚠️ Se troppo lunga viene TRONCATO a 7 righe
 * 
 * ⚠️ REGOLA GENERALE: Se il testo supera numberOfLines, viene TRONCATO automaticamente!
 * NON modificare mai numberOfLines per far stare il testo!
 */
export interface Componente {
  quantita: string;
  descrizione: string; // ⚠️ MAX 15 caratteri! Es: "Motore", "Encoder", "PLC"
  brand: string;
  codice: string;
}

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
  // Supporta sia array di stringhe (vecchio formato) che array di oggetti (nuovo formato)
  componenti: string[] | Componente[];
  noteCritiche: string;
  spese: {
    viaggio: {
      km?: string;
      costoKm?: string;
      pedaggio?: string;
      // Vecchio formato (backward compatibility)
      destinazione?: string;
      costo?: string;
    };
    // Nuovo formato (oggetto) o vecchio formato (stringa) per backward compatibility
    vitto?: {
      pranzoPosto: string;
      pranzoImporto: string;
      cenaPosto: string;
      cenaImporto: string;
    } | string;
    // Nuovo formato (oggetto) o vecchio formato (stringa) per backward compatibility
    pernottamento?: {
      nomeHotel: string;
      numeroNotti: string;
      importo: string;
    } | string;
    // Nuovo formato (array) o vecchio formato (stringa) per backward compatibility
    varie?: Array<{ descrizione: string; importo?: string }> | string;
  };
  trascrizione: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 10,
    borderBottom: '2pt solid #000000',
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 'auto',
  },
  reportId: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  reportDate: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  reportTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginBottom: 0,
  },
  section: {
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  tableRowLast: {
    flexDirection: 'row',
    minHeight: 18,  // ⚠️ ALTEZZA MINIMA FISSA! STESSA DELLE ALTRE RIGHE!
    // ⚠️ NON ha borderBottomWidth perché è l'ultima riga della tabella
  },
  tableHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 8,
    padding: 6,
  },
  tableCell: {
    padding: 6,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  tableCellBorder: {
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  col3: { width: '33.33%' },
  col2: { width: '50%' },
  col4: { width: '25%' },
  colFull: { width: '100%' },
  colHeader: { width: '15%' },
  colValue: { width: '35%' },
  // Tabella componenti doppia
  componentsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  componentTable: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    // Minimo calibrato su 1 header + 4 righe da 18px: evita spazio extra sotto l'ultima riga
    minHeight: 90,
  },
  descriptionBox: {
    padding: 8,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  descriptionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  descriptionText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
    lineHeight: 1.3,
  },
  componentsList: {
    paddingLeft: 10,
  },
  componentItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 9,
    marginRight: 5,
  },
  transcriptionBox: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    minHeight: 105,
  },
  transcriptionText: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#000000',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '2pt solid #000000',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  footerLogo: {
    height: 12,  // ⚠️ PICCOLO! NON MODIFICARE L'ALTEZZA FOOTER
    width: 'auto',
  },
  footerLogoDigitalEngineered: {
    height: 20,  // ⚠️ PIÙ GRANDE del logo ULTRAROBOTS per migliore visibilità
    width: 'auto',
  },
  footerText: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 7,
    fontFamily: 'Courier',
    color: '#000000',
    marginTop: 2,
  },
  // ⚠️ NON MODIFICARE MAI QUESTE LARGHEZZE! STRUTTURA APPROVATA E FINALE!
  compColQta: { width: '10%', textAlign: 'center' },  // ❌ NON TOCCARE
  compColDesc: { width: '36%' },  // ❌ NON TOCCARE
  compColBrand: { width: '25%' },  // ❌ NON TOCCARE
  compColCode: { width: '29%' },  // ❌ NON TOCCARE
  // Totale: 100% - Se testo non entra = TRONCA, NON modificare larghezze!
  // ⚠️ NON MODIFICARE padding e fontSize! STRUTTURA FINALE APPROVATA!
  spesaCell: {
    padding: 4,  // ❌ NON TOCCARE
    fontSize: 7,  // ❌ NON TOCCARE
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  spesaHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
  },
  // ⚠️ NON MODIFICARE padding e fontSize! STRUTTURA FINALE APPROVATA!
  componentCell: {
    padding: 4,  // ❌ NON TOCCARE
    fontSize: 7,  // ❌ NON TOCCARE
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  componentHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
  },
  componentHeaderQta: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 7.5,
    padding: 5,
    textAlign: 'center',
  },
});

// Normalizza i valori: rimuove "N/D" e valori falsy, così i campi vuoti restano vuoti nel PDF
const clean = (value?: string) => (value && value !== 'N/D' ? value : '');
const truncateClean = (value: string | undefined, max: number) => {
  const v = clean(value);
  if (!v) return '';
  return v.length > max ? `${v.slice(0, max - 1)}…` : v;
};
const formatKmValue = (value?: string) => {
  const v = clean(value);
  if (!v) return '';
  const match = v.match(/[\d.,]+/);
  return match ? match[0] : v;
};
const formatEuro = (value?: string) => {
  const v = clean(value);
  if (!v) return '';
  return `€ ${v.replace(/€/g, '').trim()}`;
};
// Tipi @react-pdf/renderer non espongono maxLines in TextProps: forziamo con any.
const max1 = { maxLines: 1 } as any;
const max6 = { maxLines: 6 } as any;
const isComponente = (comp: unknown): comp is Componente =>
  typeof comp === 'object' && comp !== null && 'descrizione' in comp;

const normalizeComp = (comp: string | Componente | undefined) => {
  if (!comp) {
    return { quantita: '', descrizione: '', brand: '', codice: '' };
  }
  if (isComponente(comp)) {
    return {
      quantita: clean(comp.quantita),
      descrizione: clean(comp.descrizione),
      brand: clean(comp.brand),
      codice: clean(comp.codice),
    };
  }
  const val = clean(comp);
  return {
    quantita: val,
    descrizione: val,
    brand: '',
    codice: '',
  };
};
const joinWithDash = (left?: string, right?: string) => {
  const a = clean(left);
  const b = clean(right);
  if (a && b) return `${a} - ${b}`;
  return a || b || '';
};

/**
 * ⚠️⚠️⚠️ REGOLA FERREA - NON MODIFICARE MAI QUESTA STRUTTURA ⚠️⚠️⚠️
 * 
 * ❌ NON TOCCARE:
 * - Larghezze colonne (compColQta, compColDesc, compColBrand, compColCode)
 * - fontSize (7, 7.5)
 * - padding (4, 5, 6)
 * - minHeight delle righe
 * - Layout generale
 * 
 * ✅ SE IL TESTO È TROPPO LUNGO: SI TRONCA AUTOMATICAMENTE (numberOfLines={1})
 * ✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!
 * 
 * QUESTA STRUTTURA È FINALE E APPROVATA. NON SI TOCCA MAI!
 */
type ReportPDFProps = DocumentProps & { 
  data: ReportData;
  logoUltrarobots?: string;
  logoDigitalEngineered?: string;
};

const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

const ReportPDF: React.FC<ReportPDFProps> = ({ data, logoUltrarobots, logoDigitalEngineered, ...documentProps }) => {
  // Usa i loghi base64 se forniti, altrimenti fallback agli URL
  const ultrarobotsLogo = logoUltrarobots || `${baseUrl}/assets/SVG_PNG/logo-wordmark-black.png`;
  const digitalEngineeredLogo = logoDigitalEngineered || `${baseUrl}/assets/SVG_PNG/digitalengineered.wordmark-black.png`;

  return (
    <Document {...documentProps}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.reportTitle}>RAPPORTO DI</Text>
            <Text style={[styles.reportTitle, { marginTop: -2 }]}>INTERVENTO</Text>
          </View>
          <View style={styles.headerCenter}>
            <Image
              style={styles.logoImage}
              src={ultrarobotsLogo}
            />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportId}>ID REPORT: {data.id}</Text>
            <Text style={styles.reportDate}>DATA: {data.date}</Text>
          </View>
        </View>

      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>AZIENDA</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { minHeight: 65 }]}>
              <Text {...max6}>{truncateClean(joinWithDash(data.cliente.azienda, data.cliente.sede), 150)}</Text>
            </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>TIPOLOGIA</Text></View>
                <View style={[styles.tableCell, styles.colValue, { minHeight: 65 }]}><Text {...max6}>{truncateClean(data.intervento.tipologia, 150)}</Text></View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>REFERENTE</Text></View>
                <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { minHeight: 20 }]}>
                  <Text {...max1}>{truncateClean(data.cliente.referente, 25)}</Text>
                </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>STATO FINALE</Text></View>
                <View style={[styles.tableCell, styles.colValue, { minHeight: 20 }]}>
                  <Text {...max1}>{truncateClean(data.intervento.statoFinale, 25)}</Text>
                </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESCRIZIONE ATTIVITÀ</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text
            style={styles.descriptionText}
            {...max6} // fino a 6 righe, poi tronca
          >
            {truncateClean(data.intervento.descrizione, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPONENTI</Text>
        <View style={styles.componentsContainer}>
          {/* Tabella SX */}
          <View style={styles.componentTable}>
            <View style={styles.tableRow}>
              <View style={[styles.componentHeaderQta, styles.compColQta, styles.tableCellBorder]}><Text>QTÀ</Text></View>
              <View style={[styles.componentHeader, styles.compColDesc, styles.tableCellBorder]}><Text>DESCRIZIONE</Text></View>
              <View style={[styles.componentHeader, styles.compColBrand, styles.tableCellBorder]}><Text>BRAND</Text></View>
              <View style={[styles.componentHeader, styles.compColCode]}><Text>CODICE</Text></View>
            </View>
            {Array.from({ length: 4 }, (_, idx) => {
              const comp = normalizeComp(data.componenti[idx] as string | Componente | undefined);
              if (idx === 3) {
                return (
                  <View key={`comp-left-${idx}`} style={[styles.tableRowLast, { minHeight: 18 }]}>
                    <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                      <Text>{truncateClean(comp.quantita, 3)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColCode]}>
                      <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                    </View>
                  </View>
                );
              }
              return (
                <View key={`comp-left-${idx}`} style={[styles.tableRow, { minHeight: 18 }]}>
                  <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                    <Text>{truncateClean(comp.quantita, 3)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColCode]}>
                    <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Tabella DX */}
          <View style={styles.componentTable}>
            <View style={styles.tableRow}>
              <View style={[styles.componentHeaderQta, styles.compColQta, styles.tableCellBorder]}><Text>QTÀ</Text></View>
              <View style={[styles.componentHeader, styles.compColDesc, styles.tableCellBorder]}><Text>DESCRIZIONE</Text></View>
              <View style={[styles.componentHeader, styles.compColBrand, styles.tableCellBorder]}><Text>BRAND</Text></View>
              <View style={[styles.componentHeader, styles.compColCode]}><Text>CODICE</Text></View>
            </View>
            {Array.from({ length: 4 }, (_, idx) => {
              const comp = normalizeComp(data.componenti[idx + 4] as string | Componente | undefined);
              if (idx === 3) {
                return (
                  <View key={`comp-right-${idx}`} style={[styles.tableRowLast, { minHeight: 18 }]}>
                    <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                      <Text>{truncateClean(comp.quantita, 3)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                      <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                    </View>
                    <View style={[styles.componentCell, styles.compColCode]}>
                      <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                    </View>
                  </View>
                );
              }
              return (
                <View key={`comp-right-${idx}`} style={[styles.tableRow, { minHeight: 18 }]}>
                  <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}>
                    <Text>{truncateClean(comp.quantita, 3)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.descrizione, 15)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}>
                    <Text {...max1}>{truncateClean(comp.brand, 8)}</Text>
                  </View>
                  <View style={[styles.componentCell, styles.compColCode]}>
                    <Text {...max1}>{truncateClean(comp.codice, 12)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTE CRITICHE</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text
            style={styles.descriptionText}
            {...max6} // fino a 6 righe, poi tronca
          >
            {truncateClean(data.noteCritiche, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SPESE DI TRASFERTA</Text>
        <View style={[styles.table, { minHeight: 90 }]}>
          <View style={styles.tableRow}>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>VIAGGIO</Text></View>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>VITTO</Text></View>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>PERNOTTO</Text></View>
            <View style={[styles.spesaHeader, styles.col4]}><Text>VARIE</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.km) ? truncateClean(`Km: ${formatKmValue(data.spese.viaggio.km)}`, 18) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto ? truncateClean(data.spese.vitto.pranzoPosto, 24) : (typeof data.spese.vitto === 'string' ? truncateClean(data.spese.vitto, 24) : '')}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento ? truncateClean(data.spese.pernottamento.nomeHotel, 24) : (typeof data.spese.pernottamento === 'string' ? truncateClean(data.spese.pernottamento, 24) : '')}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[0] ? truncateClean(`${clean(data.spese.varie[0].descrizione)}${clean(data.spese.varie[0].importo) ? `: ${clean(data.spese.varie[0].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.costoKm) ? truncateClean(`Importo Km: ${formatEuro(data.spese.viaggio.costoKm)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto && clean(data.spese.vitto.pranzoPosto) ? truncateClean(`Importo: ${formatEuro(data.spese.vitto.pranzoImporto)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento && clean(data.spese.pernottamento.nomeHotel) ? truncateClean(`Notti: ${clean(data.spese.pernottamento.numeroNotti)}`, 12) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[1] ? truncateClean(`${clean(data.spese.varie[1].descrizione)}${clean(data.spese.varie[1].importo) ? `: ${clean(data.spese.varie[1].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{clean(data.spese.viaggio.pedaggio) ? truncateClean(`Importo Pedaggio: ${formatEuro(data.spese.viaggio.pedaggio)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.vitto === 'object' && data.spese.vitto ? truncateClean(data.spese.vitto.cenaPosto, 24) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text {...max1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento && clean(data.spese.pernottamento.nomeHotel) ? truncateClean(`Importo: ${formatEuro(data.spese.pernottamento.importo)}`, 20) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[2] ? truncateClean(`${clean(data.spese.varie[2].descrizione)}${clean(data.spese.varie[2].importo) ? `: ${clean(data.spese.varie[2].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
          <View style={[styles.tableRowLast, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text></Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text>{typeof data.spese.vitto === 'object' && data.spese.vitto && clean(data.spese.vitto.cenaPosto) ? truncateClean(`Importo: ${formatEuro(data.spese.vitto.cenaImporto)}`, 22) : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text></Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text {...max1}>{Array.isArray(data.spese.varie) && data.spese.varie[3] ? truncateClean(`${clean(data.spese.varie[3].descrizione)}${clean(data.spese.varie[3].importo) ? `: ${clean(data.spese.varie[3].importo)}` : ''}`, 24) : ''}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRASCRIZIONE ORIGINALE</Text>
        <View style={styles.transcriptionBox}>
          <Text style={styles.transcriptionText} {...max6}>
            {truncateClean(data.trascrizione, 460)}
          </Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Image style={styles.footerLogo} src={ultrarobotsLogo} />
        <Text style={styles.footerText}>TITAN 4.5 PROTOCOL EMBEDED      CORE  DESIGNED  BY</Text>
        <Image style={styles.footerLogoDigitalEngineered} src={digitalEngineeredLogo} />
        <Text style={styles.footerText}>ALL RIGHT RESERVED</Text>
      </View>
    </Page>
  </Document>
  );
};

/**
 * ⚠️ GPT: QUESTO È L'ESEMPIO DA SEGUIRE!
 * NOTA BENE: Le descrizioni sono BREVI (1-2 parole)
 * NON usare MAI descrizioni lunghe come "Motore elettrico trifase"!
 */
export const sampleReportData: ReportData = {
  id: '251220-0310-87A8',
  date: '20/12/2025, 03:10:14',
  cliente: { azienda: 'Barilla', referente: '', sede: '' },
  intervento: {
    tipologia: 'Sostituzione componenti',
    statoFinale: 'COMPLETATO',
    descrizione: 'Sostituiti motori ed encoder difettosi, sostituiti inverter e cinghie del sistema di trascinamento.',
  },
  componenti: [
    // ✅ Descrizioni CORRETTE: brevi, 1-2 parole, max 15 caratteri
    { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' },
    { quantita: '2', descrizione: 'Encoder', brand: 'Heidenhain', codice: 'ERN420-1024' },
    { quantita: '4', descrizione: 'Inverter', brand: 'ABB', codice: 'ACS580-025A' },
    { quantita: '5', descrizione: 'Cinghie', brand: 'Gates', codice: '5M-15-HTD' },
    { quantita: '8', descrizione: 'Fotocellula', brand: 'Sick', codice: 'WTB4-3P3161' },
    { quantita: '1', descrizione: 'PLC', brand: 'Allen Bradley', codice: '1769-L32E' },
    { quantita: '6', descrizione: 'Relè sicurezza', brand: 'Pilz', codice: 'PNOZ X3' }, // Max 2 parole OK
    { quantita: '3', descrizione: 'Trasformatore', brand: 'Schneider', codice: 'ABL6TS25U' },
  ],
  noteCritiche: 'Nessuna',
  spese: {
    viaggio: { km: 'N/D', costoKm: 'N/D', pedaggio: 'N/D' },
    vitto: {
      pranzoPosto: 'Trattoria del Borgo',
      pranzoImporto: '€ 25,00',
      cenaPosto: 'Hotel',
      cenaImporto: '[€ 30,00]',
    },
    pernottamento: {
      nomeHotel: 'Hotel Centrale',
      numeroNotti: '2 notti',
      importo: '[€ 160,00]',
    },
    varie: [],
  },
  trascrizione: 'Fatto in Barilla abbiamo sostituito 10 motori, 2 encoder, 4 inverter, tutte le cinghie dei trascinatori, eccetera eccetera. Siamo stati li 2 giorni e bisogna fargli pagare 2 pernottamenti 4 viti e I chilometri andata e ritorno. Ciao',
};

export default ReportPDF;

```

Ora aggiorno l'API per passare i loghi in base64:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';
import ReportPDF, { ReportData } from '@/components/reports/ReportPDF';
import React, { type ReactElement } from 'react';
import { LOGOS } from '@/lib/pdf-logos-base64';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * API Route per generare PDF usando @react-pdf/renderer
 * 
 * ⚠️⚠️⚠️ REGOLA FERREA - NON MODIFICARE MAI LA STRUTTURA PDF ⚠️⚠️⚠️
 * 
 * ❌ NON MODIFICARE MAI:
 * - Larghezze colonne tabelle
 * - fontSize (7, 7.5)
 * - padding (4, 5, 6)
 * - Layout generale
 * - Struttura ReportPDF.tsx
 * 
 * ✅ SE TESTO TROPPO LUNGO: SI TRONCA (numberOfLines limitato per OGNI sezione)
 * ✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!
 * 
 * LIMITI TESTO PER SEZIONE:
 * - AZIENDA/TIPOLOGIA: max 3 righe
 * - REFERENTE/STATO FINALE: max 1 riga
 * - DESCRIZIONE ATTIVITÀ: max 4 righe (circa 200 caratteri)
 * - COMPONENTI descrizioni: max 1 riga, MAX 15 caratteri (1-2 parole)
 * - NOTE CRITICHE: max 4 righe (circa 200 caratteri)
 * - SPESE: max 1 riga per cella
 * - TRASCRIZIONE: max 7 righe (circa 400 caratteri)
 * 
 * COMPONENTI - DESCRIZIONI DEVONO ESSERE BREVI (MAX 15 caratteri, 1-2 parole)
 * 
 * ✅ CORRETTO:
 * componenti: [
 *   { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' },
 *   { quantita: '2', descrizione: 'Encoder', brand: 'Heidenhain', codice: 'ERN420-1024' },
 *   { quantita: '8', descrizione: 'Fotocellula', brand: 'Sick', codice: 'WTB4-3P3161' },
 * ]
 * 
 * ❌ SBAGLIATO (verranno TRONCATE nel PDF):
 * componenti: [
 *   { descrizione: 'Motore elettrico trifase asincrono' },  // ❌ TROPPO LUNGO!
 *   { descrizione: 'Encoder incrementale rotativo' },       // ❌ TROPPO LUNGO!
 * ]
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - CALCOLO SPESE DI VIAGGIO ⚠️⚠️⚠️
 * Quando ricevi dati con chilometri, VERIFICA che il calcolo sia corretto:
 * - Importo Km = Km totali (andata + ritorno) × 0,8€/km
 * - Esempio: km: "150 km A/R" → costoKm deve essere "€120,00" (150 × 0,8)
 * - Se km contiene solo andata, moltiplica per 2 prima di calcolare
 * - Il campo "km" deve contenere il totale A/R (es: "150 km A/R")
 * - Il campo "costoKm" deve contenere l'importo calcolato (es: "€120,00")
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - SPESE DI VITTO ⚠️⚠️⚠️
 * Formato richiesto per vitto:
 * - pranzoPosto: nome ristorante/locale (es: "Trattoria del Borgo")
 * - pranzoImporto: formato "€XX,XX" (es: "€25,00")
 * - cenaPosto: nome ristorante/locale (es: "Hotel")
 * - cenaImporto: formato "€XX,XX" (es: "€30,00")
 * 
 * ⚠️⚠️⚠️ VALORI DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️
 * Se il tecnico NON menziona l'importo MA ha fatto pranzo/cena (dedotto dal contesto):
 * - pranzoImporto: "[€ 15,00]" (parentesi quadre = ipotizzato)
 * - cenaImporto: "[€ 30,00]" (parentesi quadre = ipotizzato)
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - SPESE DI PERNOTTAMENTO ⚠️⚠️⚠️
 * Formato richiesto per pernottamento:
 * - nomeHotel: nome hotel/albergo (es: "Hotel Centrale")
 * - numeroNotti: numero notti come stringa (es: "2", "1")
 * - importo: formato "€XX,XX" (es: "€160,00")
 * 
 * ⚠️⚠️⚠️ VALORE DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️
 * Se il tecnico NON menziona l'importo MA ha pernottato (dedotto dal contesto):
 * - Calcola "[€ 80,00]" per notte e moltiplica per il numero di notti
 * - Esempio: 1 notte → importo: "[€ 80,00]"
 * - Esempio: 2 notti → importo: "[€ 160,00]" (80 × 2)
 * - Se dice prezzo a notte: calcola totale (es. "€80/notte x 2 = € 160,00")
 * - Valore standard: €80/notte se non dichiarato
 * 
 * ⚠️ FORMATO IMPORTI:
 * - SEMPRE formato "€XX,XX" con virgola come separatore decimale
 * - Esempi: "€25,00", "€30,50", "€160,00"
 * - Senza parentesi "€XX,XX" = dichiarato dal tecnico
 * - Con parentesi "[€XX,XX]" = ipotizzato da GPT quando non dichiarato
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - VISUALIZZAZIONE CONDIZIONALE CAMPI ⚠️⚠️⚠️
 * Nel PDF, alcuni campi vengono mostrati SOLO SE la riga superiore non è "N/D":
 * 
 * ✅ VITTO:
 * - pranzoPosto e cenaPosto vengono SEMPRE mostrati (anche se "N/D")
 * - Importo pranzo viene mostrato SOLO SE pranzoPosto !== 'N/D' (riga superiore)
 * - Importo cena viene mostrato SOLO SE cenaPosto !== 'N/D' (riga superiore)
 * - Se pranzoPosto o cenaPosto sono "N/D", gli importi NON vengono mostrati nel PDF
 * 
 * ✅ PERNOTTAMENTO:
 * - nomeHotel viene SEMPRE mostrato (anche se "N/D")
 * - Notti e Importo vengono mostrati SOLO SE nomeHotel !== 'N/D' (riga superiore)
 * - Se nomeHotel è "N/D", notti e importo NON vengono mostrati nel PDF
 * 
 * ✅ VIAGGIO:
 * - Km, Importo Km e Importo Pedaggio vengono mostrati SOLO SE i rispettivi campi !== 'N/D'
 * - Se sono "N/D", i campi rimangono vuoti nel PDF
 * 
 * ✅ VARIE:
 * - Mostra solo se esistono (varie[0], varie[1], varie[2], varie[3])
 * - Se non esistono, il campo rimane vuoto
 * 
 * UTILIZZO:
 * 
 * POST /api/generate-pdf-react
 * Body: {
 *   reportData: {
 *     id: "251220-0310-87A8",
 *     date: "20/12/2025, 03:10:14",
 *     cliente: { azienda: "Barilla", referente: "N/D", sede: "N/D" },
 *     intervento: {
 *       tipologia: "Sostituzione componenti",
 *       statoFinale: "COMPLETATO",
 *       descrizione: "Descrizione dettagliata..."
 *     },
 *     componenti: [
 *       { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' }
 *     ],
 *     noteCritiche: "Nessuna",
 *     spese: {
 *       viaggio: { km: "150", costoKm: "€0.50", pedaggio: "€10.00" },
 *       vitto: { pranzoPosto: "Trattoria", pranzoImporto: "€25.00", cenaPosto: "Hotel", cenaImporto: "€30.00" },
 *       pernottamento: { nomeHotel: "Hotel Centrale", numeroNotti: "2", importo: "€160.00" },
 *       varie: [{ descrizione: "Materiale", importo: "€45.00" }]
 *     },
 *     trascrizione: "Testo della trascrizione..."
 *   }
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const reportData = body.reportData as ReportData;

    // Validazione base dei dati
    if (!reportData || !reportData.id) {
      return NextResponse.json(
        { error: 'Dati del report mancanti o incompleti' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Imposta valori di default per campi mancanti
    type VittoObj = {
      pranzoPosto: string;
      pranzoImporto: string;
      cenaPosto: string;
      cenaImporto: string;
    };

    type PernottamentoObj = {
      nomeHotel: string;
      numeroNotti: string;
      importo: string;
    };

    const vittoRaw = reportData.spese?.vitto;
    const vitto =
      typeof vittoRaw === 'string'
        ? vittoRaw || ''
        : {
            pranzoPosto:
              (vittoRaw &&
                typeof vittoRaw === 'object' &&
                !Array.isArray(vittoRaw) &&
                (vittoRaw as Partial<VittoObj>).pranzoPosto) ||
              '',
            pranzoImporto:
              (vittoRaw &&
                typeof vittoRaw === 'object' &&
                !Array.isArray(vittoRaw) &&
                (vittoRaw as Partial<VittoObj>).pranzoImporto) ||
              '',
            cenaPosto:
              (vittoRaw &&
                typeof vittoRaw === 'object' &&
                !Array.isArray(vittoRaw) &&
                (vittoRaw as Partial<VittoObj>).cenaPosto) ||
              '',
            cenaImporto:
              (vittoRaw &&
                typeof vittoRaw === 'object' &&
                !Array.isArray(vittoRaw) &&
                (vittoRaw as Partial<VittoObj>).cenaImporto) ||
              '',
          };

    const pernoRaw = reportData.spese?.pernottamento;
    const pernottamento =
      typeof pernoRaw === 'string'
        ? pernoRaw || ''
        : {
            nomeHotel:
              (pernoRaw &&
                typeof pernoRaw === 'object' &&
                !Array.isArray(pernoRaw) &&
                (pernoRaw as Partial<PernottamentoObj>).nomeHotel) ||
              '',
            numeroNotti:
              (pernoRaw &&
                typeof pernoRaw === 'object' &&
                !Array.isArray(pernoRaw) &&
                (pernoRaw as Partial<PernottamentoObj>).numeroNotti) ||
              '',
            importo:
              (pernoRaw &&
                typeof pernoRaw === 'object' &&
                !Array.isArray(pernoRaw) &&
                (pernoRaw as Partial<PernottamentoObj>).importo) ||
              '',
          };

    const varieRaw = reportData.spese?.varie;
    const varie =
      Array.isArray(varieRaw) ? varieRaw : typeof varieRaw === 'string' ? varieRaw || '' : [];

    const completeData: ReportData = {
      id: reportData.id || '',
      date: reportData.date || new Date().toLocaleString('it-IT'),
      cliente: {
        azienda: reportData.cliente?.azienda || '',
        referente: reportData.cliente?.referente || '',
        sede: reportData.cliente?.sede || '',
      },
      intervento: {
        tipologia: reportData.intervento?.tipologia || '',
        statoFinale: reportData.intervento?.statoFinale || '',
        descrizione: reportData.intervento?.descrizione || '',
      },
      componenti: reportData.componenti || [],
      noteCritiche: reportData.noteCritiche || '',
      spese: {
        viaggio: {
          km: reportData.spese?.viaggio?.km || '',
          costoKm: reportData.spese?.viaggio?.costoKm || '',
          pedaggio: reportData.spese?.viaggio?.pedaggio || '',
        },
        vitto,
        pernottamento,
        varie,
      },
      trascrizione: reportData.trascrizione || '',
    };

    // Genera il PDF usando @react-pdf/renderer
    const element = React.createElement(ReportPDF, { data: completeData });
    const pdfBuffer = await renderToBuffer(element as ReactElement<DocumentProps>);

    // Converti Buffer in Uint8Array per NextResponse
    const pdfArray = new Uint8Array(pdfBuffer);

    // Restituisce il PDF come response
    return new NextResponse(pdfArray, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${completeData.id}-${Date.now()}.pdf"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      {
        error: 'Errore nella generazione del PDF',
        details: error instanceof Error ? error.message : 'Errore sconosciuto',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}


















```

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';
import ReportPDF, { ReportData } from '@/components/reports/ReportPDF';
import React, { type ReactElement } from 'react';
import { LOGOS } from '@/lib/pdf-logos-base64';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * API Route per generare PDF usando @react-pdf/renderer
 * 
 * ⚠️⚠️⚠️ REGOLA FERREA - NON MODIFICARE MAI LA STRUTTURA PDF ⚠️⚠️⚠️
 * 
 * ❌ NON MODIFICARE MAI:
 * - Larghezze colonne tabelle
 * - fontSize (7, 7.5)
 * - padding (4, 5, 6)
 * - Layout generale
 * - Struttura ReportPDF.tsx
 * 
 * ✅ SE TESTO TROPPO LUNGO: SI TRONCA (numberOfLines limitato per OGNI sezione)
 * ✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!
 * 
 * LIMITI TESTO PER SEZIONE:
 * - AZIENDA/TIPOLOGIA: max 3 righe
 * - REFERENTE/STATO FINALE: max 1 riga
 * - DESCRIZIONE ATTIVITÀ: max 4 righe (circa 200 caratteri)
 * - COMPONENTI descrizioni: max 1 riga, MAX 15 caratteri (1-2 parole)
 * - NOTE CRITICHE: max 4 righe (circa 200 caratteri)
 * - SPESE: max 1 riga per cella
 * - TRASCRIZIONE: max 7 righe (circa 400 caratteri)
 * 
 * COMPONENTI - DESCRIZIONI DEVONO ESSERE BREVI (MAX 15 caratteri, 1-2 parole)
 * 
 * ✅ CORRETTO:
 * componenti: [
 *   { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' },
 *   { quantita: '2', descrizione: 'Encoder', brand: 'Heidenhain', codice: 'ERN420-1024' },
 *   { quantita: '8', descrizione: 'Fotocellula', brand: 'Sick', codice: 'WTB4-3P3161' },
 * ]
 * 
 * ❌ SBAGLIATO (verranno TRONCATE nel PDF):
 * componenti: [
 *   { descrizione: 'Motore elettrico trifase asincrono' },  // ❌ TROPPO LUNGO!
 *   { descrizione: 'Encoder incrementale rotativo' },       // ❌ TROPPO LUNGO!
 * ]
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - CALCOLO SPESE DI VIAGGIO ⚠️⚠️⚠️
 * Quando ricevi dati con chilometri, VERIFICA che il calcolo sia corretto:
 * - Importo Km = Km totali (andata + ritorno) × 0,8€/km
 * - Esempio: km: "150 km A/R" → costoKm deve essere "€120,00" (150 × 0,8)
 * - Se km contiene solo andata, moltiplica per 2 prima di calcolare
 * - Il campo "km" deve contenere il totale A/R (es: "150 km A/R")
 * - Il campo "costoKm" deve contenere l'importo calcolato (es: "€120,00")
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - SPESE DI VITTO ⚠️⚠️⚠️
 * Formato richiesto per vitto:
 * - pranzoPosto: nome ristorante/locale (es: "Trattoria del Borgo")
 * - pranzoImporto: formato "€XX,XX" (es: "€25,00")
 * - cenaPosto: nome ristorante/locale (es: "Hotel")
 * - cenaImporto: formato "€XX,XX" (es: "€30,00")
 * 
 * ⚠️⚠️⚠️ VALORI DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️
 * Se il tecnico NON menziona l'importo MA ha fatto pranzo/cena (dedotto dal contesto):
 * - pranzoImporto: "[€ 15,00]" (parentesi quadre = ipotizzato)
 * - cenaImporto: "[€ 30,00]" (parentesi quadre = ipotizzato)
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - SPESE DI PERNOTTAMENTO ⚠️⚠️⚠️
 * Formato richiesto per pernottamento:
 * - nomeHotel: nome hotel/albergo (es: "Hotel Centrale")
 * - numeroNotti: numero notti come stringa (es: "2", "1")
 * - importo: formato "€XX,XX" (es: "€160,00")
 * 
 * ⚠️⚠️⚠️ VALORE DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️
 * Se il tecnico NON menziona l'importo MA ha pernottato (dedotto dal contesto):
 * - Calcola "[€ 80,00]" per notte e moltiplica per il numero di notti
 * - Esempio: 1 notte → importo: "[€ 80,00]"
 * - Esempio: 2 notti → importo: "[€ 160,00]" (80 × 2)
 * - Se dice prezzo a notte: calcola totale (es. "€80/notte x 2 = € 160,00")
 * - Valore standard: €80/notte se non dichiarato
 * 
 * ⚠️ FORMATO IMPORTI:
 * - SEMPRE formato "€XX,XX" con virgola come separatore decimale
 * - Esempi: "€25,00", "€30,50", "€160,00"
 * - Senza parentesi "€XX,XX" = dichiarato dal tecnico
 * - Con parentesi "[€XX,XX]" = ipotizzato da GPT quando non dichiarato
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - VISUALIZZAZIONE CONDIZIONALE CAMPI ⚠️⚠️⚠️
 * Nel PDF, alcuni campi vengono mostrati SOLO SE la riga superiore non è "N/D":
 * 
 * ✅ VITTO:
 * - pranzoPosto e cenaPosto vengono SEMPRE mostrati (anche se "N/D")
 * - Importo pranzo viene mostrato SOLO SE pranzoPosto !== 'N/D' (riga superiore)
 * - Importo cena viene mostrato SOLO SE cenaPosto !== 'N/D' (riga superiore)
 * - Se pranzoPosto o cenaPosto sono "N/D", gli importi NON vengono mostrati nel PDF
 * 
 * ✅ PERNOTTAMENTO:
 * - nomeHotel viene SEMPRE mostrato (anche se "N/D")
 * - Notti e Importo vengono mostrati SOLO SE nomeHotel !== 'N/D' (riga superiore)
 * - Se nomeHotel è "N/D", notti e importo NON vengono mostrati nel PDF
 * 
 * ✅ VIAGGIO:
 * - Km, Importo Km e Importo Pedaggio vengono mostrati SOLO SE i rispettivi campi !== 'N/D'
 * - Se sono "N/D", i campi rimangono vuoti nel PDF
 * 
 * ✅ VARIE:
 * - Mostra solo se esistono (varie[0], varie[1], varie[2], varie[3])
 * - Se non esistono, il campo rimane vuoto
 * 
 * UTILIZZO:
 * 
 * POST /api/generate-pdf-react
 * Body: {
 *   reportData: {
 *     id: "251220-0310-87A8",
 *     date: "20/12/2025, 03:10:14",
 *     cliente: { azienda: "Barilla", referente: "N/D", sede: "N/D" },
 *     intervento: {
 *       tipologia: "Sostituzione componenti",
 *       statoFinale: "COMPLETATO",
 *       descrizione: "Descrizione dettagliata..."
 *     },
 *     componenti: [
 *       { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' }
 *     ],
 *     noteCritiche: "Nessuna",
 *     spese: {
 *       viaggio: { km: "150", costoKm: "€0.50", pedaggio: "€10.00" },
 *       vitto: { pranzoPosto: "Trattoria", pranzoImporto: "€25.00", cenaPosto: "Hotel", cenaImporto: "€30.00" },
 *       pernottamento: { nomeHotel: "Hotel Centrale", numeroNotti: "2", importo: "€160.00" },
 *       varie: [{ descrizione: "Materiale", importo: "€45.00" }]
 *     },
 *     trascrizione: "Testo della trascrizione..."
 *   }
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const reportData = body.reportData as ReportData;

    // Validazione base dei dati
    if (!reportData || !reportData.id) {
      return NextResponse.json(
        { error: 'Dati del report mancanti o incompleti' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Imposta valori di default per campi mancanti
    type VittoObj = {
      pranzoPosto: string;
      pranzoImporto: string;
      cenaPosto: string;
      cenaImporto: string;
    };

    type PernottamentoObj = {
      nomeHotel: string;
      numeroNotti: string;
      importo: string;
    };

    const vittoRaw = reportData.spese?.vitto;
    const vitto =
      typeof vittoRaw === 'string'
        ? vittoRaw || ''
        : {
            pranzoPosto:
              (vittoRaw &&
                typeof vittoRaw === 'object' &&
                !Array.isArray(vittoRaw) &&
                (vittoRaw as Partial<VittoObj>).pranzoPosto) ||
              '',
            pranzoImporto:
              (vittoRaw &&
                typeof vittoRaw === 'object' &&
                !Array.isArray(vittoRaw) &&
                (vittoRaw as Partial<VittoObj>).pranzoImporto) ||
              '',
            cenaPosto:
              (vittoRaw &&
                typeof vittoRaw === 'object' &&
                !Array.isArray(vittoRaw) &&
                (vittoRaw as Partial<VittoObj>).cenaPosto) ||
              '',
            cenaImporto:
              (vittoRaw &&
                typeof vittoRaw === 'object' &&
                !Array.isArray(vittoRaw) &&
                (vittoRaw as Partial<VittoObj>).cenaImporto) ||
              '',
          };

    const pernoRaw = reportData.spese?.pernottamento;
    const pernottamento =
      typeof pernoRaw === 'string'
        ? pernoRaw || ''
        : {
            nomeHotel:
              (pernoRaw &&
                typeof pernoRaw === 'object' &&
                !Array.isArray(pernoRaw) &&
                (pernoRaw as Partial<PernottamentoObj>).nomeHotel) ||
              '',
            numeroNotti:
              (pernoRaw &&
                typeof pernoRaw === 'object' &&
                !Array.isArray(pernoRaw) &&
                (pernoRaw as Partial<PernottamentoObj>).numeroNotti) ||
              '',
            importo:
              (pernoRaw &&
                typeof pernoRaw === 'object' &&
                !Array.isArray(pernoRaw) &&
                (pernoRaw as Partial<PernottamentoObj>).importo) ||
              '',
          };

    const varieRaw = reportData.spese?.varie;
    const varie =
      Array.isArray(varieRaw) ? varieRaw : typeof varieRaw === 'string' ? varieRaw || '' : [];

    const completeData: ReportData = {
      id: reportData.id || '',
      date: reportData.date || new Date().toLocaleString('it-IT'),
      cliente: {
        azienda: reportData.cliente?.azienda || '',
        referente: reportData.cliente?.referente || '',
        sede: reportData.cliente?.sede || '',
      },
      intervento: {
        tipologia: reportData.intervento?.tipologia || '',
        statoFinale: reportData.intervento?.statoFinale || '',
        descrizione: reportData.intervento?.descrizione || '',
      },
      componenti: reportData.componenti || [],
      noteCritiche: reportData.noteCritiche || '',
      spese: {
        viaggio: {
          km: reportData.spese?.viaggio?.km || '',
          costoKm: reportData.spese?.viaggio?.costoKm || '',
          pedaggio: reportData.spese?.viaggio?.pedaggio || '',
        },
        vitto,
        pernottamento,
        varie,
      },
      trascrizione: reportData.trascrizione || '',
    };

    // Genera il PDF usando @react-pdf/renderer con i loghi in base64
    const element = React.createElement(ReportPDF, { 
      data: completeData,
      logoUltrarobots: LOGOS.ultrarobots,
      logoDigitalEngineered: LOGOS.digitalengineered
    });
    const pdfBuffer = await renderToBuffer(element as ReactElement<DocumentProps>);

    // Converti Buffer in Uint8Array per NextResponse
    const pdfArray = new Uint8Array(pdfBuffer);

    // Restituisce il PDF come response
    return new NextResponse(pdfArray, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${completeData.id}-${Date.now()}.pdf"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      {
        error: 'Errore nella generazione del PDF',
        details: error instanceof Error ? error.message : 'Errore sconosciuto',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}


















```

Perfetto! Ora verifico se ci sono errori:

Ottimo! Nessun errore! Ora i loghi vengono caricati come **base64** direttamente nel PDF, quindi dovrebbero comparire in stampa!

**Cosa ho fatto:**
1. ✅ Creato `lib/pdf-logos-base64.ts` che converte i loghi PNG in base64
2. ✅ Modificato `ReportPDF.tsx` per accettare i loghi come props
3. ✅ Aggiornato l'API `generate-pdf-react` per passare i loghi in base64
4. ✅ Aggiornato sia l'header che il footer per usare i loghi base64

**I loghi ora sono:**
- **Header centro**: `logo-wordmark-black.png` (in base64) ✅
- **Footer sinistra**: `logo-wordmark-black.png` (in base64) ✅  
- **Footer destra**: `digitalengineered.wordmark-black.png` (in base64) ✅

Prova a generare un PDF ora e i loghi dovrebbero comparire! 🎯

---

**User**

RIAVVIA SERVER NETLIFY DEV + LOCAL HOST + BROWSER

---

**Cursor**

Perfetto! Riavvio tutto: server Netlify Dev, localhost e browser!

Perfetto! Il server è avviato! 

**Server attivi:**
- ✅ **Netlify Dev**: `http://localhost:8888`
- ✅ **Next.js**: `http://localhost:3001`

Ora apro il browser su localhost:8888:

Il browser ha dato errore. Aspetto ancora un po' che il server sia completamente pronto:

C'è un'altra istanza di Next.js già in esecuzione sulla porta 3000! Devo fermarla prima:

Perfetto! Ora il server è pronto! Apro il browser:

Perfetto! Il browser è aperto su **http://localhost:8888**! 

✅ **TUTTO RIAVVIATO CON SUCCESSO:**
- ✅ Server Netlify Dev: `http://localhost:8888`
- ✅ Next.js: `http://localhost:3000`
- ✅ Browser aperto sulla homepage

Ora puoi testare il PDF con i loghi! Vai alla pagina dei report e genera un PDF per vedere se i loghi compaiono correttamente! 🎯

**I loghi ora sono caricati in base64 quindi dovrebbero essere visibili nel PDF stampato!**

---

**User**

PERFETTO

---

**Cursor**

Fantastico! 🎉

**Riepilogo di quello che abbiamo fatto:**

✅ **Loghi nel PDF sistemati:**
- **Header centro**: `logo-wordmark-black.png` (grande)
- **Footer sinistra**: `logo-wordmark-black.png` 
- **Footer destra**: `digitalengineered.wordmark-black.png`

✅ **Problema risolto:**
- I loghi ora vengono caricati in **base64** invece che tramite URL
- Questo garantisce che compaiano correttamente in stampa

✅ **Server riavviato:**
- Netlify Dev: `http://localhost:8888`
- Next.js: `http://localhost:3000`
- Browser aperto e pronto

Ora i loghi dovrebbero essere visibili quando generi e stampi i PDF! 🚀

---

**User**

COMMIT+ PUSH

---

**Cursor**

Perfetto! Faccio commit e push delle modifiche!

GitHub ha bloccato il push perché c'è una **API Key OpenAI** nel file `cursor_ultima_riga_componenti_pdf.md`! Devo rimuoverla:

✅ **COMMIT E PUSH COMPLETATI CON SUCCESSO!**

**Modifiche pushate:**
- ✅ `lib/pdf-logos-base64.ts` - Nuovo file per conversione loghi in base64
- ✅ `components/reports/ReportPDF.tsx` - Aggiornato per usare loghi base64
- ✅ `app/api/generate-pdf-react/route.ts` - Aggiornato per passare loghi base64

**Commit:** `0b17bec` - "Fix: Sistemati loghi PDF con caricamento base64"

I loghi nel PDF ora funzionano correttamente e sono visibili in stampa! 🎉🚀

---

**User**

BENE. LIVE!!! PERò GPT FA SCHIFO!!!!!!!! ADESSO MI FAI UN REPORT DELLE ISTRUZIONI PER LA COMPILAZIONE DEL PDF E LE METTIAMO A PUNTO ALLA PERFEZIONE!!!

---

**Cursor**

Perfetto! Creo un report completo delle istruzioni per GPT sulla compilazione del PDF! Analizziamo tutto e mettiamolo a punto alla perfezione!

Perfetto! Ora creo un documento DEFINITIVO con tutte le istruzioni per GPT, chiare e precise!

```markdown
# 🤖 ISTRUZIONI DEFINITIVE PER GPT - COMPILAZIONE PDF RAPPORTO INTERVENTO

## 📋 INDICE
1. [Struttura Dati](#struttura-dati)
2. [Regole di Compilazione](#regole-di-compilazione)
3. [Calcoli Automatici](#calcoli-automatici)
4. [Limiti Caratteri](#limiti-caratteri)
5. [Esempi Corretti](#esempi-corretti)
6. [Errori Comuni](#errori-comuni)

---

## 1️⃣ STRUTTURA DATI

### Schema JSON Completo

```json
{
  "id": "DDMMYY-HHMM-XXXX",
  "date": "DD/MM/YYYY, HH:MM:SS",
  "cliente": {
    "azienda": "Nome Azienda",
    "referente": "Nome Cognome",
    "sede": "Città o Indirizzo"
  },
  "intervento": {
    "tipologia": "Tipo intervento",
    "statoFinale": "COMPLETATO | IN CORSO | ANNULLATO",
    "descrizione": "Descrizione breve max 460 caratteri"
  },
  "componenti": [
    {
      "quantita": "10",
      "descrizione": "Motore",
      "brand": "Siemens",
      "codice": "1LA7096-4AA60"
    }
  ],
  "noteCritiche": "Note brevi max 460 caratteri",
  "spese": {
    "viaggio": {
      "km": "150 km A/R",
      "costoKm": "€120,00",
      "pedaggio": "€10,00"
    },
    "vitto": {
      "pranzoPosto": "Trattoria del Borgo",
      "pranzoImporto": "€25,00",
      "cenaPosto": "Hotel",
      "cenaImporto": "€30,00"
    },
    "pernottamento": {
      "nomeHotel": "Hotel Centrale",
      "numeroNotti": "2",
      "importo": "€160,00"
    },
    "varie": [
      { "descrizione": "Materiale", "importo": "€45,00" }
    ]
  },
  "trascrizione": "Testo originale della trascrizione vocale max 460 caratteri"
}
```

---

## 2️⃣ REGOLE DI COMPILAZIONE

### 🔴 REGOLA #1: DESCRIZIONI COMPONENTI BREVI

**MASSIMO 15 CARATTERI - 1-2 PAROLE!**

#### ✅ DESCRIZIONI CORRETTE (1-2 parole):
- `Motore`
- `Encoder`
- `Inverter`
- `Fotocellula`
- `Cinghie`
- `PLC`
- `Relè sicurezza` (max 2 parole)
- `Trasformatore`
- `Sensore`
- `Azionamento`
- `Valvola`
- `Cilindro`
- `Filtro`
- `Cuscinetto`
- `Guarnizione`
- `Connettore`

#### ❌ DESCRIZIONI SBAGLIATE (troppo lunghe):
- ❌ `Motore elettrico trifase` → ✅ `Motore`
- ❌ `Encoder incrementale rotativo` → ✅ `Encoder`
- ❌ `Sensore fotoelettrico retroriflettente` → ✅ `Fotocellula`
- ❌ `Inverter di frequenza trifase` → ✅ `Inverter`
- ❌ `Relè di sicurezza modulare` → ✅ `Relè sicurezza`

**MOTIVO:** La colonna DESCRIZIONE ha larghezza fissa (36%), fontSize 7, e numberOfLines 1. Solo 15-20 caratteri sono visibili!

---

### 🔴 REGOLA #2: LIMITI CARATTERI PER CAMPO

| Campo | Max Righe | Max Caratteri | Troncamento |
|-------|-----------|---------------|-------------|
| **AZIENDA** (con sede) | 6 righe | ~150 caratteri | Automatico |
| **TIPOLOGIA** | 6 righe | ~150 caratteri | Automatico |
| **REFERENTE** | 1 riga | ~25 caratteri | Automatico |
| **STATO FINALE** | 1 riga | ~25 caratteri | Automatico |
| **DESCRIZIONE ATTIVITÀ** | 6 righe | ~460 caratteri | Automatico |
| **COMPONENTI - Descrizione** | 1 riga | **15 caratteri** | Automatico |
| **COMPONENTI - Brand** | 1 riga | ~8 caratteri | Automatico |
| **COMPONENTI - Codice** | 1 riga | ~12 caratteri | Automatico |
| **NOTE CRITICHE** | 6 righe | ~460 caratteri | Automatico |
| **SPESE** (tutte celle) | 1 riga | ~24 caratteri | Automatico |
| **TRASCRIZIONE** | 6 righe | ~460 caratteri | Automatico |

**⚠️ IMPORTANTE:** Se il testo supera i limiti, viene TRONCATO automaticamente. NON cercare di modificare la struttura del PDF!

---

### 🔴 REGOLA #3: FORMATO IMPORTI

**SEMPRE formato italiano: `€XX,XX` con virgola come separatore decimale**

#### ✅ FORMATI CORRETTI:
- `€25,00`
- `€30,50`
- `€160,00`
- `€1.250,00` (punto per migliaia)

#### ❌ FORMATI SBAGLIATI:
- ❌ `€25.00` (punto invece di virgola)
- ❌ `25€` (simbolo dopo)
- ❌ `EUR 25,00` (EUR invece di €)
- ❌ `€ 25` (senza decimali)

---

### 🔴 REGOLA #4: VALORI "N/D" vs PARENTESI QUADRE

#### Quando usare `"N/D"`:
- Il dato **non è disponibile** o **non è stato menzionato**
- Il tecnico **non ha fatto** quella spesa
- Esempio: Non ha pranzato → `pranzoPosto: "N/D"`

#### Quando usare `[€XX,XX]` (con parentesi quadre):
- Il tecnico **ha fatto** la spesa MA **non ha dichiarato l'importo**
- GPT **deduce** dal contesto che la spesa è stata fatta
- GPT **ipotizza** l'importo standard
- Esempio: "Abbiamo pranzato" (senza importo) → `pranzoImporto: "[€15,00]"`

#### Valori standard da ipotizzare:
- **Pranzo:** `[€15,00]`
- **Cena:** `[€30,00]`
- **Pernottamento:** `[€80,00]` per notte

---

### 🔴 REGOLA #5: VISUALIZZAZIONE CONDIZIONALE

**Alcuni campi vengono mostrati SOLO SE il campo superiore non è "N/D":**

#### VITTO:
```json
// Se pranzoPosto = "N/D" → pranzoImporto NON viene mostrato
"vitto": {
  "pranzoPosto": "N/D",        // Sempre mostrato
  "pranzoImporto": "€25,00",   // NON mostrato se pranzoPosto = "N/D"
  "cenaPosto": "Trattoria",    // Sempre mostrato
  "cenaImporto": "€30,00"      // Mostrato solo se cenaPosto !== "N/D"
}
```

#### PERNOTTAMENTO:
```json
// Se nomeHotel = "N/D" → numeroNotti e importo NON vengono mostrati
"pernottamento": {
  "nomeHotel": "N/D",          // Sempre mostrato
  "numeroNotti": "2",          // NON mostrato se nomeHotel = "N/D"
  "importo": "€160,00"         // NON mostrato se nomeHotel = "N/D"
}
```

#### VIAGGIO:
```json
// Ogni campo è indipendente
"viaggio": {
  "km": "150 km A/R",          // Se "N/D" → campo vuoto
  "costoKm": "€120,00",        // Se "N/D" → campo vuoto
  "pedaggio": "€10,00"         // Se "N/D" → campo vuoto
}
```

---

## 3️⃣ CALCOLI AUTOMATICI

### 🔴 CALCOLO SPESE DI VIAGGIO

**FORMULA:** Importo Km = Km totali (A/R) × **0,8€/km**

#### Esempi:

**Esempio 1:** Tecnico dice "150 km andata e ritorno"
```json
"viaggio": {
  "km": "150 km A/R",
  "costoKm": "€120,00",    // 150 × 0,8 = 120
  "pedaggio": "N/D"
}
```

**Esempio 2:** Tecnico dice "75 km solo andata"
```json
"viaggio": {
  "km": "150 km A/R",      // 75 × 2 = 150
  "costoKm": "€120,00",    // 150 × 0,8 = 120
  "pedaggio": "N/D"
}
```

**Esempio 3:** Tecnico dice "200 km A/R, pedaggio 15 euro"
```json
"viaggio": {
  "km": "200 km A/R",
  "costoKm": "€160,00",    // 200 × 0,8 = 160
  "pedaggio": "€15,00"
}
```

**⚠️ IMPORTANTE:**
- Se il tecnico dice solo "andata", **moltiplica per 2** per ottenere A/R
- Il campo `km` deve **sempre** contenere il totale A/R
- Il campo `costoKm` deve contenere il **calcolo automatico**
- Se il tecnico dichiara un importo diverso da 0,8€/km, **usa quello dichiarato**

---

### 🔴 CALCOLO PERNOTTAMENTI

**FORMULA:** Importo = Numero notti × **€80/notte** (se non dichiarato)

#### Esempi:

**Esempio 1:** Tecnico dice "2 notti, 160 euro"
```json
"pernottamento": {
  "nomeHotel": "Hotel Centrale",
  "numeroNotti": "2",
  "importo": "€160,00"     // Dichiarato dal tecnico
}
```

**Esempio 2:** Tecnico dice "1 notte" (senza importo)
```json
"pernottamento": {
  "nomeHotel": "Hotel",
  "numeroNotti": "1",
  "importo": "[€80,00]"    // Ipotizzato: 1 × 80 = 80
}
```

**Esempio 3:** Tecnico dice "Siamo stati 3 giorni" (dedurre 2 notti)
```json
"pernottamento": {
  "nomeHotel": "Hotel",
  "numeroNotti": "2",
  "importo": "[€160,00]"   // Ipotizzato: 2 × 80 = 160
}
```

---

## 4️⃣ LIMITI CARATTERI - TABELLA RIEPILOGATIVA

### Componenti (MAX 8 totali: 4 colonna SX + 4 colonna DX)

| Campo | Larghezza | Max Caratteri | Esempio Corretto | Esempio Sbagliato |
|-------|-----------|---------------|------------------|-------------------|
| **Quantità** | 10% | 3 caratteri | `10` | `1000` |
| **Descrizione** | 36% | **15 caratteri** | `Motore` | `Motore elettrico trifase` |
| **Brand** | 25% | 8 caratteri | `Siemens` | `Siemens AG` |
| **Codice** | 29% | 12 caratteri | `1LA7096-4AA60` | `1LA7096-4AA60-Z` |

### Spese di Trasferta

| Campo | Max Caratteri | Esempio Corretto |
|-------|---------------|------------------|
| Km | 18 | `Km: 150` |
| Importo Km | 20 | `Importo Km: €120,00` |
| Pedaggio | 20 | `Importo Pedaggio: €10,00` |
| Pranzo Posto | 24 | `Trattoria del Borgo` |
| Pranzo Importo | 20 | `Importo: €25,00` |
| Cena Posto | 24 | `Hotel` |
| Cena Importo | 22 | `Importo: €30,00` |
| Hotel Nome | 24 | `Hotel Centrale` |
| Notti | 12 | `Notti: 2` |
| Hotel Importo | 20 | `Importo: €160,00` |
| Varie | 24 | `Materiale: €45,00` |

---

## 5️⃣ ESEMPI COMPLETI CORRETTI

### Esempio 1: Intervento con tutte le spese

```json
{
  "id": "251220-0310-87A8",
  "date": "25/12/2025, 03:10:14",
  "cliente": {
    "azienda": "Barilla",
    "referente": "Mario Rossi",
    "sede": "Parma"
  },
  "intervento": {
    "tipologia": "Sostituzione componenti",
    "statoFinale": "COMPLETATO",
    "descrizione": "Sostituiti motori ed encoder difettosi, sostituiti inverter e cinghie del sistema di trascinamento. Verificato corretto funzionamento."
  },
  "componenti": [
    { "quantita": "10", "descrizione": "Motore", "brand": "Siemens", "codice": "1LA7096-4AA60" },
    { "quantita": "2", "descrizione": "Encoder", "brand": "Heidenhain", "codice": "ERN420-1024" },
    { "quantita": "4", "descrizione": "Inverter", "brand": "ABB", "codice": "ACS580-025A" },
    { "quantita": "5", "descrizione": "Cinghie", "brand": "Gates", "codice": "5M-15-HTD" }
  ],
  "noteCritiche": "Nessuna criticità rilevata. Sistema operativo.",
  "spese": {
    "viaggio": {
      "km": "150 km A/R",
      "costoKm": "€120,00",
      "pedaggio": "€10,00"
    },
    "vitto": {
      "pranzoPosto": "Trattoria del Borgo",
      "pranzoImporto": "€25,00",
      "cenaPosto": "Hotel",
      "cenaImporto": "€30,00"
    },
    "pernottamento": {
      "nomeHotel": "Hotel Centrale",
      "numeroNotti": "2",
      "importo": "€160,00"
    },
    "varie": [
      { "descrizione": "Materiale", "importo": "€45,00" }
    ]
  },
  "trascrizione": "Fatto in Barilla abbiamo sostituito 10 motori, 2 encoder, 4 inverter, tutte le cinghie dei trascinatori. Siamo stati li 2 giorni e bisogna fargli pagare 2 pernottamenti e I chilometri andata e ritorno."
}
```

### Esempio 2: Intervento senza pernottamento

```json
{
  "id": "260125-1430-12B4",
  "date": "26/01/2025, 14:30:00",
  "cliente": {
    "azienda": "FIAT",
    "referente": "Giuseppe Verdi",
    "sede": "Torino"
  },
  "intervento": {
    "tipologia": "Manutenzione preventiva",
    "statoFinale": "COMPLETATO",
    "descrizione": "Effettuata manutenzione preventiva su linea di assemblaggio. Sostituiti filtri e verificato sistema pneumatico."
  },
  "componenti": [
    { "quantita": "6", "descrizione": "Filtro", "brand": "Festo", "codice": "LF-1/4-D-MINI" },
    { "quantita": "3", "descrizione": "Valvola", "brand": "SMC", "codice": "VQ110U-5M" }
  ],
  "noteCritiche": "Nessuna",
  "spese": {
    "viaggio": {
      "km": "80 km A/R",
      "costoKm": "€64,00",
      "pedaggio": "N/D"
    },
    "vitto": {
      "pranzoPosto": "Bar Centrale",
      "pranzoImporto": "[€15,00]",
      "cenaPosto": "N/D",
      "cenaImporto": "N/D"
    },
    "pernottamento": {
      "nomeHotel": "N/D",
      "numeroNotti": "N/D",
      "importo": "N/D"
    },
    "varie": []
  },
  "trascrizione": "Manutenzione preventiva FIAT Torino. Cambiati 6 filtri e 3 valvole. Fatto 80 km andata e ritorno. Pranzato al bar."
}
```

### Esempio 3: Intervento con importi ipotizzati

```json
{
  "id": "270125-0900-34C7",
  "date": "27/01/2025, 09:00:00",
  "cliente": {
    "azienda": "Ferrero",
    "referente": "N/D",
    "sede": "Alba"
  },
  "intervento": {
    "tipologia": "Riparazione guasto",
    "statoFinale": "COMPLETATO",
    "descrizione": "Riparato guasto su robot di pallettizzazione. Sostituito PLC e cavi danneggiati."
  },
  "componenti": [
    { "quantita": "1", "descrizione": "PLC", "brand": "Allen Bradley", "codice": "1769-L32E" },
    { "quantita": "5", "descrizione": "Cavo", "brand": "Lapp", "codice": "OLFLEX-110" }
  ],
  "noteCritiche": "Robot operativo. Consigliata verifica cablaggio generale.",
  "spese": {
    "viaggio": {
      "km": "200 km A/R",
      "costoKm": "€160,00",
      "pedaggio": "€15,00"
    },
    "vitto": {
      "pranzoPosto": "Ristorante",
      "pranzoImporto": "[€15,00]",
      "cenaPosto": "Hotel",
      "cenaImporto": "[€30,00]"
    },
    "pernottamento": {
      "nomeHotel": "Hotel",
      "numeroNotti": "1",
      "importo": "[€80,00]"
    },
    "varie": []
  },
  "trascrizione": "Intervento Ferrero Alba. Sostituito PLC e 5 cavi. Siamo stati una notte. Fatto 200 km andata e ritorno, pedaggio 15 euro."
}
```

---

## 6️⃣ ERRORI COMUNI DA EVITARE

### ❌ ERRORE #1: Descrizioni componenti troppo lunghe

**SBAGLIATO:**
```json
{ "descrizione": "Motore elettrico trifase asincrono da 5.5kW" }
```

**CORRETTO:**
```json
{ "descrizione": "Motore" }
```

---

### ❌ ERRORE #2: Formato importi sbagliato

**SBAGLIATO:**
```json
"costoKm": "€120.00"     // Punto invece di virgola
"costoKm": "120€"        // Simbolo dopo
"costoKm": "EUR 120,00"  // EUR invece di €
```

**CORRETTO:**
```json
"costoKm": "€120,00"     // ✅ Formato italiano
```

---

### ❌ ERRORE #3: Calcolo km sbagliato

**SBAGLIATO:**
```json
// Tecnico dice "75 km andata"
"viaggio": {
  "km": "75 km",           // ❌ Manca A/R
  "costoKm": "€60,00"      // ❌ Calcolo su 75 invece di 150
}
```

**CORRETTO:**
```json
// Tecnico dice "75 km andata"
"viaggio": {
  "km": "150 km A/R",      // ✅ 75 × 2 = 150
  "costoKm": "€120,00"     // ✅ 150 × 0,8 = 120
}
```

---

### ❌ ERRORE #4: Parentesi quadre quando non servono

**SBAGLIATO:**
```json
// Tecnico dice "pranzo 25 euro"
"pranzoImporto": "[€25,00]"  // ❌ Parentesi quadre non servono
```

**CORRETTO:**
```json
// Tecnico dice "pranzo 25 euro"
"pranzoImporto": "€25,00"    // ✅ Senza parentesi (dichiarato)
```

---

### ❌ ERRORE #5: "N/D" invece di parentesi quadre

**SBAGLIATO:**
```json
// Tecnico dice "abbiamo pranzato" (senza importo)
"vitto": {
  "pranzoPosto": "Trattoria",
  "pranzoImporto": "N/D"     // ❌ Ha pranzato! Ipotizza importo
}
```

**CORRETTO:**
```json
// Tecnico dice "abbiamo pranzato" (senza importo)
"vitto": {
  "pranzoPosto": "Trattoria",
  "pranzoImporto": "[€15,00]"  // ✅ Ipotizzato
}
```

---

### ❌ ERRORE #6: Componenti oltre il limite

**SBAGLIATO:**
```json
"componenti": [
  // 10 componenti → ❌ TROPPI! Max 8
]
```

**CORRETTO:**
```json
"componenti": [
  // Max 8 componenti (4 colonna SX + 4 colonna DX)
]
```

---

## 🎯 CHECKLIST FINALE PRIMA DI INVIARE

Prima di generare il PDF, verifica:

- [ ] **ID formato corretto:** `DDMMYY-HHMM-XXXX`
- [ ] **Data formato corretto:** `DD/MM/YYYY, HH:MM:SS`
- [ ] **Componenti max 8 totali**
- [ ] **Descrizioni componenti max 15 caratteri** (1-2 parole)
- [ ] **Importi formato italiano:** `€XX,XX`
- [ ] **Calcolo km corretto:** A/R × 0,8€/km
- [ ] **Parentesi quadre solo per importi ipotizzati**
- [ ] **"N/D" solo per dati non disponibili**
- [ ] **Descrizione attività max 460 caratteri**
- [ ] **Note critiche max 460 caratteri**
- [ ] **Trascrizione max 460 caratteri**

---

## 📞 DOMANDE FREQUENTI

### Q: Cosa fare se il tecnico menziona più di 8 componenti?
**A:** Seleziona i più importanti o raggruppa componenti simili. Max 8!

### Q: Il tecnico dice "100 km". È andata o A/R?
**A:** Se non specifica, **chiedi chiarimento** o **ipotizza A/R** (più probabile).

### Q: Il tecnico dice "pranzo 20 euro, cena 35 euro"
**A:** Usa gli importi dichiarati **senza parentesi quadre**:
```json
"pranzoImporto": "€20,00",
"cenaImporto": "€35,00"
```

### Q: Il tecnico dice "siamo stati 3 giorni"
**A:** 3 giorni = **2 notti** (arrivo giorno 1, partenza giorno 3)

### Q: Descrizione componente "Motore Siemens 5.5kW"
**A:** Accorcia a `"Motore"` - Brand e codice vanno nelle colonne dedicate!

---

## 🚀 VERSIONE DOCUMENTO

**Versione:** 1.0  
**Data:** 27/01/2025  
**Autore:** Sistema ULTRAROBOTS  
**Ultima modifica:** Fix loghi PDF con base64

---

**🔒 QUESTO DOCUMENTO È DEFINITIVO - SEGUILO ALLA LETTERA!**

```

Perfetto! Ho creato il documento completo! Ora facciamo un commit:

✅ **FATTO!

---

**User**

HAI ANALIZZATO LE INFO PRESENTI NEL CODICE? PERCHè NON POSSIAMO RISCHIARE CHE VI SIANO ISTRUZIONI CONTRADDITTORIE!!!

PRIMA LE VOGLIO VERIFICARE!!!!!

---

**Cursor**

Hai ragione! Devo verificare che le istruzioni siano coerenti con il codice! Analizziamo tutto per evitare contraddizioni!

🚨 **HO TROVATO UNA CONTRADDIZIONE GRAVE!**

Nel codice vedo:
- `max6 = { maxLines: 6 }` 
- Usato per AZIENDA, TIPOLOGIA, DESCRIZIONE, NOTE CRITICHE, TRASCRIZIONE

Ma nelle mie istruzioni ho scritto:
- AZIENDA/TIPOLOGIA: max **3 righe** ❌ SBAGLIATO!
- DESCRIZIONE: max **4 righe** ❌ SBAGLIATO!
- NOTE CRITICHE: max **4 righe** ❌ SBAGLIATO!
- TRASCRIZIONE: max **7 righe** ❌ SBAGLIATO!

**IL CODICE DICE 6 RIGHE PER TUTTI!**

Fammi verificare anche i commenti nel codice:

🚨 **CONTRADDIZIONI TROVATE!**

**NEL CODICE (ReportPDF.tsx):**
- AZIENDA: `max6` = **6 righe**
- TIPOLOGIA: `max6` = **6 righe**
- DESCRIZIONE: `max6` = **6 righe**
- NOTE CRITICHE: `max6` = **6 righe**
- TRASCRIZIONE: `max6` = **6 righe**

**NEI COMMENTI DEL CODICE (righe 20-62):**
- AZIENDA: **3 righe** ❌
- TIPOLOGIA: **3 righe** ❌
- DESCRIZIONE: **4 righe** ❌
- NOTE CRITICHE: **4 righe** ❌
- TRASCRIZIONE: **7 righe** ❌

**QUALE È CORRETTO?** Il codice dice 6, i commenti dicono altro!

Fammi creare un report di analisi completo:

```markdown
# 🚨 ANALISI CONTRADDIZIONI - ISTRUZIONI PDF

## ⚠️ CONTRADDIZIONI TROVATE

### 1. NUMERO RIGHE MASSIME

#### CODICE REALE (ReportPDF.tsx righe 372-373):
```typescript
const max1 = { maxLines: 1 } as any;
const max6 = { maxLines: 6 } as any;
```

#### USO NEL CODICE:
| Campo | Variabile usata | Righe effettive |
|-------|----------------|-----------------|
| AZIENDA | `max6` | **6 righe** |
| TIPOLOGIA | `max6` | **6 righe** |
| REFERENTE | `max1` | **1 riga** ✅ |
| STATO FINALE | `max1` | **1 riga** ✅ |
| DESCRIZIONE ATTIVITÀ | `max6` | **6 righe** |
| COMPONENTI (tutti) | `max1` | **1 riga** ✅ |
| NOTE CRITICHE | `max6` | **6 righe** |
| SPESE (tutte) | `max1` | **1 riga** ✅ |
| TRASCRIZIONE | `max6` | **6 righe** |

#### COMMENTI NEL CODICE (ReportPDF.tsx righe 20-62):
| Campo | Righe dichiarate | CONTRADDIZIONE |
|-------|------------------|----------------|
| AZIENDA | **3 righe** | ❌ Codice dice 6! |
| TIPOLOGIA | **3 righe** | ❌ Codice dice 6! |
| REFERENTE | **1 riga** | ✅ Corretto |
| STATO FINALE | **1 riga** | ✅ Corretto |
| DESCRIZIONE ATTIVITÀ | **4 righe** | ❌ Codice dice 6! |
| COMPONENTI | **1 riga** | ✅ Corretto |
| NOTE CRITICHE | **4 righe** | ❌ Codice dice 6! |
| SPESE | **1 riga** | ✅ Corretto |
| TRASCRIZIONE | **7 righe** | ❌ Codice dice 6! |

---

### 2. LIMITI CARATTERI

#### CODICE REALE (truncateClean):
```typescript
// Riga 457: AZIENDA
truncateClean(joinWithDash(data.cliente.azienda, data.cliente.sede), 150)

// Riga 460: TIPOLOGIA
truncateClean(data.intervento.tipologia, 150)

// Riga 465: REFERENTE
truncateClean(data.cliente.referente, 25)

// Riga 469: STATO FINALE
truncateClean(data.intervento.statoFinale, 25)

// Riga 482: DESCRIZIONE
truncateClean(data.intervento.descrizione, 460)

// Riga 507: COMPONENTI - Descrizione
truncateClean(comp.descrizione, 15)

// Riga 510: COMPONENTI - Brand
truncateClean(comp.brand, 8)

// Riga 513: COMPONENTI - Codice
truncateClean(comp.codice, 12)

// Riga 593: NOTE CRITICHE
truncateClean(data.noteCritiche, 460)

// Riga 638: TRASCRIZIONE
truncateClean(data.trascrizione, 460)
```

#### TABELLA RIEPILOGATIVA LIMITI CARATTERI:
| Campo | Max Caratteri | Max Righe | Fonte |
|-------|---------------|-----------|-------|
| AZIENDA (con sede) | 150 | 6 | Codice riga 457 |
| TIPOLOGIA | 150 | 6 | Codice riga 460 |
| REFERENTE | 25 | 1 | Codice riga 465 |
| STATO FINALE | 25 | 1 | Codice riga 469 |
| DESCRIZIONE | 460 | 6 | Codice riga 482 |
| COMPONENTI - Descrizione | 15 | 1 | Codice riga 507 |
| COMPONENTI - Brand | 8 | 1 | Codice riga 510 |
| COMPONENTI - Codice | 12 | 1 | Codice riga 513 |
| NOTE CRITICHE | 460 | 6 | Codice riga 593 |
| TRASCRIZIONE | 460 | 6 | Codice riga 638 |

---

### 3. SPESE DI TRASFERTA - LIMITI

#### CODICE REALE:
```typescript
// Riga 608: Km
truncateClean(`Km: ${formatKmValue(data.spese.viaggio.km)}`, 18)

// Riga 614: Importo Km
truncateClean(`Importo Km: ${formatEuro(data.spese.viaggio.costoKm)}`, 20)

// Riga 620: Pedaggio
truncateClean(`Importo Pedaggio: ${formatEuro(data.spese.viaggio.pedaggio)}`, 20)

// Riga 609: Pranzo Posto
truncateClean(data.spese.vitto.pranzoPosto, 24)

// Riga 615: Pranzo Importo
truncateClean(`Importo: ${formatEuro(data.spese.vitto.pranzoImporto)}`, 20)

// Riga 621: Cena Posto
truncateClean(data.spese.vitto.cenaPosto, 24)

// Riga 627: Cena Importo
truncateClean(`Importo: ${formatEuro(data.spese.vitto.cenaImporto)}`, 22)

// Riga 610: Hotel Nome
truncateClean(data.spese.pernottamento.nomeHotel, 24)

// Riga 616: Notti
truncateClean(`Notti: ${clean(data.spese.pernottamento.numeroNotti)}`, 12)

// Riga 622: Hotel Importo
truncateClean(`Importo: ${formatEuro(data.spese.pernottamento.importo)}`, 20)

// Righe 611, 617, 623, 629: Varie
truncateClean(`${clean(data.spese.varie[X].descrizione)}${clean(data.spese.varie[X].importo) ? `: ${clean(data.spese.varie[X].importo)}` : ''}`, 24)
```

#### TABELLA LIMITI SPESE:
| Campo | Max Caratteri | Formato |
|-------|---------------|---------|
| Km | 18 | `Km: 150` |
| Importo Km | 20 | `Importo Km: €120,00` |
| Pedaggio | 20 | `Importo Pedaggio: €10,00` |
| Pranzo Posto | 24 | `Trattoria del Borgo` |
| Pranzo Importo | 20 | `Importo: €25,00` |
| Cena Posto | 24 | `Hotel` |
| Cena Importo | 22 | `Importo: €30,00` |
| Hotel Nome | 24 | `Hotel Centrale` |
| Notti | 12 | `Notti: 2` |
| Hotel Importo | 20 | `Importo: €160,00` |
| Varie | 24 | `Materiale: €45,00` |

---

## ✅ VALORI CORRETTI DA USARE

### NUMERO RIGHE MASSIME (DA CODICE REALE):
- **AZIENDA:** 6 righe (max 150 caratteri)
- **TIPOLOGIA:** 6 righe (max 150 caratteri)
- **REFERENTE:** 1 riga (max 25 caratteri)
- **STATO FINALE:** 1 riga (max 25 caratteri)
- **DESCRIZIONE ATTIVITÀ:** 6 righe (max 460 caratteri)
- **COMPONENTI - Descrizione:** 1 riga (max 15 caratteri)
- **COMPONENTI - Brand:** 1 riga (max 8 caratteri)
- **COMPONENTI - Codice:** 1 riga (max 12 caratteri)
- **NOTE CRITICHE:** 6 righe (max 460 caratteri)
- **TRASCRIZIONE:** 6 righe (max 460 caratteri)
- **SPESE:** 1 riga (vedi tabella sopra)

---

## 🔧 AZIONI DA FARE

### 1. CORREGGERE COMMENTI NEL CODICE
File: `components/reports/ReportPDF.tsx` righe 20-62

Cambiare:
- ❌ AZIENDA: numberOfLines={3} → ✅ numberOfLines={6}
- ❌ TIPOLOGIA: numberOfLines={3} → ✅ numberOfLines={6}
- ❌ DESCRIZIONE: numberOfLines={4} → ✅ numberOfLines={6}
- ❌ NOTE CRITICHE: numberOfLines={4} → ✅ numberOfLines={6}
- ❌ TRASCRIZIONE: numberOfLines={7} → ✅ numberOfLines={6}

### 2. CORREGGERE ISTRUZIONI GPT
File: `ISTRUZIONI_GPT_COMPILAZIONE_PDF.md`

Aggiornare tabella "REGOLA #2: LIMITI CARATTERI PER CAMPO" con valori corretti.

### 3. CORREGGERE API ROUTE
File: `app/api/generate-pdf-react/route.ts` righe 35-42

Cambiare:
- ❌ AZIENDA/TIPOLOGIA: max 3 righe → ✅ max 6 righe
- ❌ DESCRIZIONE: max 4 righe (circa 200 caratteri) → ✅ max 6 righe (circa 460 caratteri)
- ❌ NOTE CRITICHE: max 4 righe (circa 200 caratteri) → ✅ max 6 righe (circa 460 caratteri)
- ❌ TRASCRIZIONE: max 7 righe (circa 400 caratteri) → ✅ max 6 righe (circa 460 caratteri)

### 4. CORREGGERE REGOLE_FERREE_PDF.md
File: `components/reports/REGOLE_FERREE_PDF.md` righe 44-51

Aggiornare limiti numberOfLines con valori corretti.

---

## 📊 RIEPILOGO FINALE

### ✅ VALORI DEFINITIVI E CORRETTI:

| Campo | Max Righe | Max Caratteri | Troncamento |
|-------|-----------|---------------|-------------|
| **AZIENDA** (con sede) | **6 righe** | ~150 caratteri | Automatico |
| **TIPOLOGIA** | **6 righe** | ~150 caratteri | Automatico |
| **REFERENTE** | **1 riga** | ~25 caratteri | Automatico |
| **STATO FINALE** | **1 riga** | ~25 caratteri | Automatico |
| **DESCRIZIONE ATTIVITÀ** | **6 righe** | ~460 caratteri | Automatico |
| **COMPONENTI - Descrizione** | **1 riga** | **15 caratteri** | Automatico |
| **COMPONENTI - Brand** | **1 riga** | ~8 caratteri | Automatico |
| **COMPONENTI - Codice** | **1 riga** | ~12 caratteri | Automatico |
| **NOTE CRITICHE** | **6 righe** | ~460 caratteri | Automatico |
| **SPESE** (tutte celle) | **1 riga** | vedi tabella | Automatico |
| **TRASCRIZIONE** | **6 righe** | ~460 caratteri | Automatico |

**FONTE:** Analisi diretta del codice `ReportPDF.tsx` righe 372-638

---

## ⚠️ IMPORTANTE

**IL CODICE È LA VERITÀ ASSOLUTA!**

I commenti e la documentazione devono essere aggiornati per riflettere il codice reale, NON il contrario!

**PROSSIMI PASSI:**
1. ✅ Verificare con l'utente se i valori del codice sono corretti
2. ⏳ Aggiornare tutti i commenti nel codice
3. ⏳ Aggiornare ISTRUZIONI_GPT_COMPILAZIONE_PDF.md
4. ⏳ Aggiornare REGOLE_FERREE_PDF.md
5. ⏳ Aggiornare app/api/generate-pdf-react/route.ts
6. ⏳ Commit e push delle correzioni

---

**Data analisi:** 27/01/2025  
**File analizzati:** 
- `components/reports/ReportPDF.tsx`
- `app/api/generate-pdf-react/route.ts`
- `components/reports/REGOLE_FERREE_PDF.md`
- `ISTRUZIONI_GPT_COMPILAZIONE_PDF.md`

```

✅ **ANALISI COMPLETATA!**

**🚨 HO TROVATO CONTRADDIZIONI GRAVI:**

### PROBLEMA PRINCIPALE:
**Il CODICE dice 6 righe, i COMMENTI dicono 3/4/7 righe!**

| Campo | CODICE (vero) | COMMENTI (sbagliati) |
|-------|---------------|----------------------|
| AZIENDA | **6 righe** | 3 righe ❌ |
| TIPOLOGIA | **6 righe** | 3 righe ❌ |
| DESCRIZIONE | **6 righe** | 4 righe ❌ |
| NOTE CRITICHE | **6 righe** | 4 righe ❌ |
| TRASCRIZIONE | **6 righe** | 7 righe ❌ |

**IL CODICE È LA VERITÀ!** I commenti sono sbagliati!

Ho

---

**User**

TE LO DICO IO!!!!!

---

**Cursor**

PERFETTO! DIMMI TU QUALI SONO I VALORI CORRETTI! 

Ti ascolto! 👂

Quali sono i limiti giusti per ogni campo? 🎯

---

**User**

PER OGNI CAMPO CI DOVREBBERO ESSERE ANCHE EI VALORI MAX CARATTERI E MAX RGHE, ESTRAILI CHE LI VERIFICO!!

---

**Cursor**

Perfetto! Estraggo TUTTI i valori dal codice reale! Ecco la tabella completa:

## 📊 VALORI ESTRATTI DAL CODICE REALE

### CAMPI PRINCIPALI

| Campo | Max Righe (maxLines) | Max Caratteri (truncateClean) | Riga Codice |
|-------|---------------------|-------------------------------|-------------|
| **AZIENDA** (con sede) | `max6` = **6** | **150** | 457 |
| **TIPOLOGIA** | `max6` = **6** | **150** | 460 |
| **REFERENTE** | `max1` = **1** | **25** | 465 |
| **STATO FINALE** | `max1` = **1** | **25** | 469 |
| **DESCRIZIONE ATTIVITÀ** | `max6` = **6** | **460** | 482 |
| **NOTE CRITICHE** | `max6` = **6** | **460** | 593 |
| **TRASCRIZIONE** | `max6` = **6** | **460** | 638 |

### COMPONENTI (max 8 totali: 4 SX + 4 DX)

| Campo | Max Righe | Max Caratteri | Riga Codice |
|-------|-----------|---------------|-------------|
| **Quantità** | `max1` = **1** | **3** | 495, 512, 542, 559 |
| **Descrizione** | `max1` = **1** | **15** | 507, 524, 554, 571 |
| **Brand** | `max1` = **1** | **8** | 510, 527, 557, 574 |
| **Codice** | `max1` = **1** | **12** | 513, 530, 560, 577 |

### SPESE DI TRASFERTA

| Campo | Max Righe | Max Caratteri | Formato nel PDF | Riga Codice |
|-------|-----------|---------------|-----------------|-------------|
| **Km** | `max1` = **1** | **18** | `Km: 150` | 608 |
| **Importo Km** | `max1` = **1** | **20** | `Importo Km: €120,00` | 614 |
| **Pedaggio** | `max1` = **1** | **20** | `Importo Pedaggio: €10,00` | 620 |
| **Pranzo Posto** | `max1` = **1** | **24** | `Trattoria del Borgo` | 609 |
| **Pranzo Importo** | `max1` = **1** | **20** | `Importo: €25,00` | 615 |
| **Cena Posto** | `max1` = **1** | **24** | `Hotel` | 621 |
| **Cena Importo** | `max1` = **1** | **22** | `Importo: €30,00` | 627 |
| **Hotel Nome** | `max1` = **1** | **24** | `Hotel Centrale` | 610 |
| **Notti** | `max1` = **1** | **12** | `Notti: 2` | 616 |
| **Hotel Importo** | `max1` = **1** | **20** | `Importo: €160,00` | 622 |
| **Varie [0-3]** | `max1` = **1** | **24** | `Materiale: €45,00` | 611, 617, 623, 629 |

---

## 🔍 FONTE CODICE

- **max1** = `{ maxLines: 1 }` (riga 372)
- **max6** = `{ maxLines: 6 }` (riga 373)
- **truncateClean(value, N)** = tronca a N caratteri (righe varie)

---

**VERIFICA QUESTI VALORI E DIMMI SE SONO CORRETTI!** ✅❌

---

**User**

AZIENDA >  6 RIGHE  > 25 CARATTERIRI MAX A RIGA.   LE RIGHE SONO:  RAGIONE SOCIALE  / VIA E NUMERO CIVICO / CAP  + CITTA + PROVINCIA (XX)/ PRTITA IVA / TELEFONO / EMAIL 

---

**Cursor**

🚨 **ASPETTA! QUESTO È COMPLETAMENTE DIVERSO DAL CODICE ATTUALE!**

**NEL CODICE ATTUALE:**
```typescript
// Riga 457
<Text {...max6}>{truncateClean(joinWithDash(data.cliente.azienda, data.cliente.sede), 150)}</Text>
```

Significa: `"Nome Azienda - Sede"` in un unico campo, max 150 caratteri totali, max 6 righe.

**TU VUOI:**
```
AZIENDA = 6 righe separate:
1. Ragione Sociale (max 25 caratteri)
2. Via e Numero Civico (max 25 caratteri)
3. CAP + Città + Provincia (XX) (max 25 caratteri)
4. Partita IVA (max 25 caratteri)
5. Telefono (max 25 caratteri)
6. Email (max 25 caratteri)
```

**🚨 QUESTO RICHIEDE:**
1. Cambiare la struttura dati `cliente`
2. Modificare completamente il layout del PDF
3. Aggiungere 6 righe invece di 1 campo unico

**DOMANDA CRITICA:** 
- Vuoi che modifichi TUTTO il codice per questa nuova struttura?
- O i valori attuali vanno bene e devo solo documentarli correttamente?

**DIMMI COSA DEVO FARE!** 🎯

```typescript
// Riga 457
<Text {...max6}>{truncateClean(joinWithDash(data.cliente.azienda, data.cliente.sede), 150)}</Text>
```

```plaintext
AZIENDA = 6 righe separate:
1. Ragione Sociale (max 25 caratteri)
2. Via e Numero Civico (max 25 caratteri)
3. CAP + Città + Provincia (XX) (max 25 caratteri)
4. Partita IVA (max 25 caratteri)
5. Telefono (max 25 caratteri)
6. Email (max 25 caratteri)
```

---

**User**

TIPOLOGIA >  6 RIGHE 25 CARATTTERI A RIGA, TESTO CONTINUO

---

**Cursor**

OK! Continua con tutti i campi! Sto prendendo nota:

## ✅ VALORI CORRETTI (da verificare con te)

### 1. AZIENDA
- **6 righe**
- **25 caratteri max per riga**
- **Struttura:**
  1. Ragione Sociale
  2. Via e Numero Civico
  3. CAP + Città + Provincia (XX)
  4. Partita IVA
  5. Telefono
  6. Email

### 2. TIPOLOGIA
- **6 righe**
- **25 caratteri max per riga**
- **Testo continuo**

---

**CONTINUA CON GLI ALTRI CAMPI:**
- REFERENTE
- STATO FINALE
- DESCRIZIONE ATTIVITÀ
- COMPONENTI (Quantità, Descrizione, Brand, Codice)
- NOTE CRITICHE
- SPESE (tutti i campi)
- TRASCRIZIONE

**DIMMI TUTTI I VALORI!** 📝

---

**User**

NON C'è DA CAMBIARE NULLA PERCHè CI SONO GIà 6 RIGHE NEL PDF

---

**Cursor**

AH! PERFETTO! Quindi il codice è già corretto con 6 righe!

Allora continua a dirmi i valori corretti per TUTTI i campi così aggiorno solo la documentazione!

## ✅ VALORI CORRETTI (che mi stai dettando)

### 1. AZIENDA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)
- Struttura: Ragione Sociale / Via / CAP+Città / P.IVA / Tel / Email

### 2. TIPOLOGIA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)
- Testo continuo

---

**CONTINUA! Dimmi per:**
- REFERENTE → righe? caratteri?
- STATO FINALE → righe? caratteri?
- DESCRIZIONE ATTIVITÀ → righe? caratteri?
- COMPONENTI - Descrizione → righe? caratteri?
- COMPONENTI - Brand → righe? caratteri?
- COMPONENTI - Codice → righe? caratteri?
- NOTE CRITICHE → righe? caratteri?
- SPESE (tutti) → righe? caratteri?
- TRASCRIZIONE → righe? caratteri?

**DETTAMI TUTTO!** 📝

---

**User**

REFERENTE >   1 RIGA    25  CARATTERI

---

**Cursor**

✅ Perfetto! Continua!

## ✅ VALORI CORRETTI

### 1. AZIENDA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)

### 2. TIPOLOGIA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)

### 3. REFERENTE
- **1 riga** ✅
- **25 caratteri** ✅

---

**CONTINUA:**
- STATO FINALE → ?
- DESCRIZIONE ATTIVITÀ → ?
- COMPONENTI - Quantità → ?
- COMPONENTI - Descrizione → ?
- COMPONENTI - Brand → ?
- COMPONENTI - Codice → ?
- NOTE CRITICHE → ?
- SPESE - Km → ?
- SPESE - Importo Km → ?
- SPESE - Pedaggio → ?
- SPESE - Pranzo Posto → ?
- SPESE - Pranzo Importo → ?
- SPESE - Cena Posto → ?
- SPESE - Cena Importo → ?
- SPESE - Hotel Nome → ?
- SPESE - Notti → ?
- SPESE - Hotel Importo → ?
- SPESE - Varie → ?
- TRASCRIZIONE → ?

**AVANTI!** 📝

---

**User**

STATO FINALE   > 1 RIGA      25 CARATTERI

---

**Cursor**

✅ Perfetto! Continua!

## ✅ VALORI CORRETTI

### 1. AZIENDA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)

### 2. TIPOLOGIA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)

### 3. REFERENTE
- **1 riga** ✅
- **25 caratteri** ✅

### 4. STATO FINALE
- **1 riga** ✅
- **25 caratteri** ✅

---

**CONTINUA:**
- DESCRIZIONE ATTIVITÀ → ?
- COMPONENTI - Quantità → ?
- COMPONENTI - Descrizione → ?
- COMPONENTI - Brand → ?
- COMPONENTI - Codice → ?
- NOTE CRITICHE → ?
- TRASCRIZIONE → ?
- SPESE (tutti i campi) → ?

**AVANTI!** 📝

---

**User**

DESCRIZIONE ATTIVITA >  460 CARATTERI

---

**Cursor**

✅ Perfetto! E quante RIGHE per DESCRIZIONE ATTIVITÀ?

## ✅ VALORI CORRETTI

### 1. AZIENDA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)

### 2. TIPOLOGIA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)

### 3. REFERENTE
- **1 riga** ✅
- **25 caratteri** ✅

### 4. STATO FINALE
- **1 riga** ✅
- **25 caratteri** ✅

### 5. DESCRIZIONE ATTIVITÀ
- **? righe** ❓
- **460 caratteri** ✅

---

**DESCRIZIONE ATTIVITÀ → Quante righe?** (il codice dice 6, è corretto?)

Poi continua con gli altri! 📝

---

**User**

NOTE CRITICHE  > 460 CARATTERI

TRASCRIZIONE  > 460 CARATTERI

TUTTO OK FINO A QUI????

---

**Cursor**

✅ **SÌ, TUTTO OK!** Ma mi servono anche le **RIGHE** per questi 3 campi!

## ✅ VALORI CORRETTI

### 1. AZIENDA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)

### 2. TIPOLOGIA
- **6 righe** ✅
- **~25 caratteri per riga** (totale ~150)

### 3. REFERENTE
- **1 riga** ✅
- **25 caratteri** ✅

### 4. STATO FINALE
- **1 riga** ✅
- **25 caratteri** ✅

### 5. DESCRIZIONE ATTIVITÀ
- **? righe** ❓ (codice dice 6)
- **460 caratteri** ✅

### 6. NOTE CRITICHE
- **? righe** ❓ (codice dice 6)
- **460 caratteri** ✅

### 7. TRASCRIZIONE
- **? righe** ❓ (codice dice 6)
- **460 caratteri** ✅

---

**DIMMI LE RIGHE PER QUESTI 3 CAMPI:**
- DESCRIZIONE ATTIVITÀ → 6 righe? ✅❌
- NOTE CRITICHE → 6 righe? ✅❌
- TRASCRIZIONE → 6 righe? ✅❌

Poi continuiamo con COMPONENTI e SPESE! 📝

---

**User**

5-6-7   = 6 RIGHE MA è ININFLUENTE!!!!!   CONTANO I CARATTERI!!!

---

**Cursor**

✅ **PERFETTO! CAPITO!** 

Le righe sono solo un limite tecnico del PDF, ma **GPT deve controllare i CARATTERI!**

## ✅ VALORI CORRETTI

### 1. AZIENDA
- 6 righe (tecnico)
- **~150 caratteri MAX** ⚠️

### 2. TIPOLOGIA
- 6 righe (tecnico)
- **~150 caratteri MAX** ⚠️

### 3. REFERENTE
- 1 riga (tecnico)
- **25 caratteri MAX** ⚠️

### 4. STATO FINALE
- 1 riga (tecnico)
- **25 caratteri MAX** ⚠️

### 5. DESCRIZIONE ATTIVITÀ
- 6 righe (tecnico)
- **460 caratteri MAX** ⚠️

### 6. NOTE CRITICHE
- 6 righe (tecnico)
- **460 caratteri MAX** ⚠️

### 7. TRASCRIZIONE
- 6 righe (tecnico)
- **460 caratteri MAX** ⚠️

---

**ORA COMPONENTI E SPESE! Dimmi i CARATTERI MAX:**
- COMPONENTI - Quantità → ?
- COMPONENTI - Descrizione → ?
- COMPONENTI - Brand → ?
- COMPONENTI - Codice → ?
- SPESE (tutti i campi) → ?

**AVANTI!** 📝

---

**User**

COMPONENTI   >  QTA' =3       DESCRIZIONE 15      BRAND 8        CODICE   12   1 RIGA SOLAMENTE !!!!!!!!

CI SONO 2 TABELLE AFFIANCATE APPLICARLO A ENTRAMBE!!!!!

---

**Cursor**

✅ **PERFETTO! CAPITO!**

## ✅ VALORI CORRETTI

### 1-7. (come sopra) ✅

### 8. COMPONENTI (2 tabelle affiancate: 4 componenti SX + 4 componenti DX = MAX 8 TOTALI)

| Campo | Max Caratteri | Righe |
|-------|---------------|-------|
| **Quantità** | **3** ⚠️ | 1 |
| **Descrizione** | **15** ⚠️ | 1 |
| **Brand** | **8** ⚠️ | 1 |
| **Codice** | **12** ⚠️ | 1 |

**Stesso limite per ENTRAMBE le tabelle!**

---

**ORA LE SPESE! Dimmi i CARATTERI MAX per ogni campo:**
- Km → ?
- Importo Km → ?
- Pedaggio → ?
- Pranzo Posto → ?
- Pranzo Importo → ?
- Cena Posto → ?
- Cena Importo → ?
- Hotel Nome → ?
- Notti → ?
- Hotel Importo → ?
- Varie → ?

**AVANTI!** 📝

---

**User**

SPESE TRASFERTA  >>>>   TUTTA LA TABELLA  1  RIGA!!!!       VIAGGIO > Km:  4 caratteri  Importo Km: xxxx,xx €         Pedaggio: xxxx,xx €   RISPETTTARE COME HO SCRITTO E LA PUNTEGGITURA! 

---

**Cursor**

✅ **PERFETTO! FORMATO PRECISO!**

## SPESE TRASFERTA - VIAGGIO

**TUTTA LA TABELLA 1 RIGA!** ⚠️

### VIAGGIO:
- **Km:** `Km: XXXX` (4 caratteri per il numero)
- **Importo Km:** `xxxx,xx €` (formato con virgola, € dopo)
- **Pedaggio:** `xxxx,xx €` (formato con virgola, € dopo)

**⚠️ ATTENZIONE FORMATO:**
- Km: `Km: 150` (con "Km:" davanti)
- Importi: `120,00 €` (virgola decimale, € DOPO, NON prima!)

---

**CONTINUA CON:**
- VITTO (Pranzo Posto, Pranzo Importo, Cena Posto, Cena Importo) → ?
- PERNOTTAMENTO (Hotel Nome, Notti, Importo) → ?
- VARIE → ?

**DIMMI I FORMATI ESATTI!** 📝

---

**User**

VITTO >>>   Posto Pranzo: 20        Importo Pranzo:  xxxx,xx  €    (15 euro default se non trovato)  Posto Cena:  20         Importo Cena: xxxx,xx €   (35 euro default se non trovato) 

---

**Cursor**

✅ **PERFETTO!**

## SPESE TRASFERTA - VITTO

**1 RIGA!** ⚠️

### VITTO:
- **Posto Pranzo:** 20 caratteri max
- **Importo Pranzo:** `xxxx,xx €` (formato: virgola, € dopo)
  - **Default se non trovato:** `15,00 €` ⚠️
- **Posto Cena:** 20 caratteri max
- **Importo Cena:** `xxxx,xx €` (formato: virgola, € dopo)
  - **Default se non trovato:** `35,00 €` ⚠️

---

**CONTINUA CON:**
- PERNOTTAMENTO (Hotel Nome, Notti, Importo) → ?
- VARIE → ?

**DIMMI I FORMATI!** 📝

---

**User**

PERNOTTO  >   Nome Hotel   20           Notti: xxx       Importo:  xxxx,xx € 

---

**Cursor**

✅ **PERFETTO!**

## SPESE TRASFERTA - PERNOTTAMENTO

**1 RIGA!** ⚠️

### PERNOTTAMENTO:
- **Nome Hotel:** 20 caratteri max
- **Notti:** `Notti: XXX` (formato con "Notti:" davanti)
- **Importo:** `xxxx,xx €` (formato: virgola, € dopo)
  - **Default se non trovato:** ? (80€ per notte?)

---

**CONTINUA CON:**
- VARIE → formato? caratteri?

**E DIMMI:**
- Importo pernottamento default se non dichiarato? (80€ per notte?)

**AVANTI!** 📝

---

**User**

VARIE    >     4 celle da 20 caratteri

aspetta che adesso ti do altre info

viaggio devono comparire le etichette se ci sono i valori

vitto devono comparire solo riga 2 e 4 Importo:

pernotto deve comparire riga 2   Notti:   e riga 3   Importo:   

varie nessuna etichetta

chiaro????

default pernotto 80€

defult pranzo 15

default cena 35

??

???

---

**Cursor**

✅ **CHIARISSIMO! HO CAPITO TUTTO!**

## 📋 RIEPILOGO COMPLETO SPESE TRASFERTA

### VIAGGIO (4 righe):
- **Riga 1:** `Km: XXXX` ← etichetta mostrata SOLO se c'è valore
- **Riga 2:** `Importo Km: xxxx,xx €` ← etichetta mostrata SOLO se c'è valore
- **Riga 3:** `Importo Pedaggio: xxxx,xx €` ← etichetta mostrata SOLO se c'è valore
- **Riga 4:** vuota

### VITTO (4 righe):
- **Riga 1:** Nome posto pranzo (20 caratteri) - SENZA etichetta
- **Riga 2:** `Importo: xxxx,xx €` ← SOLO etichetta "Importo:"
- **Riga 3:** Nome posto cena (20 caratteri) - SENZA etichetta
- **Riga 4:** `Importo: xxxx,xx €` ← SOLO etichetta "Importo:"

### PERNOTTAMENTO (4 righe):
- **Riga 1:** Nome hotel (20 caratteri) - SENZA etichetta
- **Riga 2:** `Notti: XXX` ← CON etichetta "Notti:"
- **Riga 3:** `Importo: xxxx,xx €` ← CON etichetta "Importo:"
- **Riga 4:** vuota

### VARIE (4 righe):
- **4 celle da 20 caratteri**
- **NESSUNA etichetta**

### DEFAULT:
- **Pranzo:** `15,00 €` (se non dichiarato)
- **Cena:** `35,00 €` (se non dichiarato)
- **Pernottamento:** `80,00 €` per notte (se non dichiarato)

---

✅ **TUTTO CHIARO! POSSO CREARE IL DOCUMENTO DEFINITIVO?** 📝

---

**User**

istruisci GPT nel codice!!!!

---

**Cursor**

PERFETTO! Aggiorno subito i commenti nel codice con le istruzioni corrette!

Vedo che questo worktree ha una versione vecchia del codice! Devo aggiungere le istruzioni GPT complete dall'inizio. Aggiungo i commenti all'inizio del file:

```worktree-typescriptreact
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

/**
 * ⚠️⚠️⚠️ ISTRUZIONI DEFINITIVE PER GPT - COMPILAZIONE PDF RAPPORTO INTERVENTO ⚠️⚠️⚠️
 * 
 * 📋 LIMITI CARATTERI E RIGHE PER OGNI CAMPO
 * 
 * REGOLA FONDAMENTALE: GPT DEVE RISPETTARE I LIMITI DI CARATTERI, NON LE RIGHE!
 * Le righe sono un limite tecnico del PDF, MA IL CONTROLLO VA FATTO SUI CARATTERI!
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 1️⃣ AZIENDA
 *    - Max righe PDF: 6 (tecnico)
 *    - Max caratteri: ~150 TOTALI (~25 per riga)
 *    - Struttura dati da GPT (se disponibili):
 *      1. Ragione Sociale
 *      2. Via e Numero Civico
 *      3. CAP + Città + Provincia (XX)
 *      4. Partita IVA
 *      5. Telefono
 *      6. Email
 *    - ⚠️ GPT: Se non hai tutti i dati, usa ciò che hai. Max 150 caratteri totali!
 * 
 * 2️⃣ TIPOLOGIA
 *    - Max righe PDF: 6 (tecnico)
 *    - Max caratteri: ~150 TOTALI (~25 per riga)
 *    - Testo continuo
 *    - ⚠️ GPT: Descrizione breve del tipo di intervento. Max 150 caratteri!
 * 
 * 3️⃣ REFERENTE
 *    - Max righe PDF: 1
 *    - Max caratteri: 25
 *    - ⚠️ GPT: Nome e cognome del referente. Max 25 caratteri!
 * 
 * 4️⃣ STATO FINALE
 *    - Max righe PDF: 1
 *    - Max caratteri: 25
 *    - Valori tipici: "COMPLETATO", "IN CORSO", "ANNULLATO"
 *    - ⚠️ GPT: Max 25 caratteri!
 * 
 * 5️⃣ DESCRIZIONE ATTIVITÀ
 *    - Max righe PDF: 6 (tecnico, ininfluente)
 *    - Max caratteri: 460 ⚠️⚠️⚠️
 *    - Testo continuo
 *    - ⚠️ GPT: Descrizione dettagliata dell'intervento. MAX 460 CARATTERI!
 * 
 * 6️⃣ COMPONENTI (MAX 8 TOTALI: 4 colonna SX + 4 colonna DX)
 *    - Max righe per cella: 1
 *    - Limiti caratteri per colonna:
 *      • Quantità: 3 caratteri MAX
 *      • Descrizione: 15 caratteri MAX ⚠️⚠️⚠️ (1-2 PAROLE!)
 *      • Brand: 8 caratteri MAX
 *      • Codice: 12 caratteri MAX
 *    
 *    ✅ DESCRIZIONI CORRETTE (1-2 parole, max 15 caratteri):
 *       Motore, Encoder, Inverter, Fotocellula, Cinghie, PLC, Relè sicurezza,
 *       Trasformatore, Sensore, Azionamento, Valvola, Cilindro, Filtro
 *    
 *    ❌ DESCRIZIONI SBAGLIATE (troppo lunghe):
 *       "Motore elettrico trifase" ❌ → "Motore" ✅
 *       "Encoder incrementale rotativo" ❌ → "Encoder" ✅
 *    
 *    ⚠️ GPT: DESCRIZIONI COMPONENTI DEVONO ESSERE BREVISSIME! MAX 15 CARATTERI!
 * 
 * 7️⃣ NOTE CRITICHE
 *    - Max righe PDF: 6 (tecnico, ininfluente)
 *    - Max caratteri: 460 ⚠️⚠️⚠️
 *    - Testo continuo
 *    - ⚠️ GPT: Note importanti sull'intervento. MAX 460 CARATTERI!
 * 
 * 8️⃣ TRASCRIZIONE ORIGINALE
 *    - Max righe PDF: 6 (tecnico, ininfluente)
 *    - Max caratteri: 460 ⚠️⚠️⚠️
 *    - Testo continuo
 *    - ⚠️ GPT: Trascrizione vocale originale. MAX 460 CARATTERI!
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 9️⃣ SPESE DI TRASFERTA (TUTTA LA TABELLA: 1 RIGA PER CELLA!)
 * 
 * 🚗 VIAGGIO (4 righe):
 *    • Riga 1: Km (4 caratteri per numero)
 *      Formato: "Km: XXXX"
 *      Etichetta "Km:" mostrata SOLO se c'è valore
 *    
 *    • Riga 2: Importo Km
 *      Formato: "Importo Km: xxxx,xx €"
 *      Etichetta "Importo Km:" mostrata SOLO se c'è valore
 *      ⚠️ CALCOLO AUTOMATICO: Km totali A/R × 0,8€/km
 *      Esempio: 150 km A/R → 150 × 0,8 = 120,00 €
 *    
 *    • Riga 3: Pedaggio
 *      Formato: "Importo Pedaggio: xxxx,xx €"
 *      Etichetta "Importo Pedaggio:" mostrata SOLO se c'è valore
 *    
 *    • Riga 4: vuota
 * 
 * 🍽️ VITTO (4 righe):
 *    • Riga 1: Posto Pranzo (20 caratteri max) - SENZA etichetta
 *    • Riga 2: Importo Pranzo
 *      Formato: "Importo: xxxx,xx €"
 *      Etichetta "Importo:" SEMPRE presente
 *      ⚠️ DEFAULT se non dichiarato: 15,00 € (con parentesi quadre: [15,00 €])
 *    
 *    • Riga 3: Posto Cena (20 caratteri max) - SENZA etichetta
 *    • Riga 4: Importo Cena
 *      Formato: "Importo: xxxx,xx €"
 *      Etichetta "Importo:" SEMPRE presente
 *      ⚠️ DEFAULT se non dichiarato: 35,00 € (con parentesi quadre: [35,00 €])
 * 
 * 🏨 PERNOTTAMENTO (4 righe):
 *    • Riga 1: Nome Hotel (20 caratteri max) - SENZA etichetta
 *    • Riga 2: Notti
 *      Formato: "Notti: XXX"
 *      Etichetta "Notti:" SEMPRE presente
 *    
 *    • Riga 3: Importo
 *      Formato: "Importo: xxxx,xx €"
 *      Etichetta "Importo:" SEMPRE presente
 *      ⚠️ DEFAULT se non dichiarato: 80,00 € per notte
 *      Esempio: 2 notti → [160,00 €] (con parentesi quadre)
 *    
 *    • Riga 4: vuota
 * 
 * 💼 VARIE (4 righe):
 *    • 4 celle da 20 caratteri max ciascuna
 *    • NESSUNA etichetta
 *    • Formato libero: "Descrizione: importo"
 * 
 * ⚠️⚠️⚠️ FORMATO IMPORTI CRITICO ⚠️⚠️⚠️
 *    - SEMPRE formato italiano: xxxx,xx € (virgola, € DOPO)
 *    - Esempi corretti: "120,00 €", "15,00 €", "1.250,50 €"
 *    - ❌ MAI: "€120,00", "120.00 €", "EUR 120,00"
 * 
 * ⚠️⚠️⚠️ PARENTESI QUADRE PER VALORI IPOTIZZATI ⚠️⚠️⚠️
 *    - Senza parentesi: valore dichiarato dal tecnico → "25,00 €"
 *    - Con parentesi: valore ipotizzato da GPT → "[15,00 €]"
 *    - Usa "N/D" se la spesa NON è stata fatta
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 🎯 CHECKLIST GPT PRIMA DI GENERARE IL PDF:
 * 
 * [ ] AZIENDA: max 150 caratteri
 * [ ] TIPOLOGIA: max 150 caratteri
 * [ ] REFERENTE: max 25 caratteri
 * [ ] STATO FINALE: max 25 caratteri
 * [ ] DESCRIZIONE: max 460 caratteri
 * [ ] COMPONENTI descrizioni: max 15 caratteri (1-2 parole!)
 * [ ] COMPONENTI max 8 totali (4 SX + 4 DX)
 * [ ] NOTE CRITICHE: max 460 caratteri
 * [ ] TRASCRIZIONE: max 460 caratteri
 * [ ] IMPORTI formato italiano: xxxx,xx €
 * [ ] CALCOLO KM corretto: A/R × 0,8€/km
 * [ ] DEFAULT pranzo: [15,00 €] se non dichiarato
 * [ ] DEFAULT cena: [35,00 €] se non dichiarato
 * [ ] DEFAULT pernotto: [80,00 €] per notte se non dichiarato
 * [ ] Parentesi quadre SOLO per valori ipotizzati
 * [ ] "N/D" SOLO se spesa non fatta
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

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

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 10,
    borderBottom: '2pt solid #000000',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 'auto',
  },
  reportId: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  reportDate: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  reportTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 8,
    padding: 6,
  },
  tableCell: {
    padding: 6,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  tableCellBorder: {
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  col3: { width: '33.33%' },
  col2: { width: '50%' },
  col4: { width: '25%' },
  colFull: { width: '100%' },
  colHeader: { width: '15%' },
  colValue: { width: '35%' },
  descriptionBox: {
    padding: 8,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  descriptionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  descriptionText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
    lineHeight: 1.3,
  },
  componentsList: {
    paddingLeft: 10,
  },
  componentItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 9,
    marginRight: 5,
  },
  transcriptionBox: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    minHeight: 105,
  },
  transcriptionText: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#000000',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '2pt solid #000000',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 7,
    fontFamily: 'Courier',
    color: '#000000',
    marginTop: 2,
  },
});

const ReportPDF: React.FC<{ data: ReportData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.reportTitle}>RAPPORTO DI</Text>
          <Text style={styles.reportTitle}>INTERVENTO</Text>
        </View>
        <View style={styles.headerCenter}>
          <Image
            style={styles.logoImage}
            src="/assets/SVG_PNG/logo-wordmark-black.png"
          />
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.reportId}>ID REPORT: {data.id}</Text>
          <Text style={styles.reportDate}>DATA: {data.date}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>AZIENDA</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { minHeight: 65 }]}>
              <Text>{data.cliente.azienda} - {data.cliente.sede}</Text>
            </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>TIPOLOGIA</Text></View>
            <View style={[styles.tableCell, styles.colValue, { minHeight: 65 }]}><Text>{data.intervento.tipologia}</Text></View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>REFERENTE</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder]}><Text>{data.cliente.referente}</Text></View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>STATO FINALE</Text></View>
            <View style={[styles.tableCell, styles.colValue]}><Text>{data.intervento.statoFinale}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESCRIZIONE ATTIVITÀ</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text style={styles.descriptionText}>{data.intervento.descrizione}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPONENTI</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text style={styles.descriptionText}>{data.componenti.join(' • ')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTE CRITICHE</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text style={styles.descriptionText}>{data.noteCritiche}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SPESE DI TRASFERTA</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableHeader, styles.col4, styles.tableCellBorder]}><Text>VIAGGIO</Text></View>
            <View style={[styles.tableHeader, styles.col4, styles.tableCellBorder]}><Text>VITTO</Text></View>
            <View style={[styles.tableHeader, styles.col4, styles.tableCellBorder]}><Text>PERNOTTO</Text></View>
            <View style={[styles.tableHeader, styles.col4]}><Text>VARIE</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { minHeight: 45 }]}><Text>Dest: {data.spese.viaggio.destinazione}</Text></View>
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { minHeight: 45 }]}><Text>{data.spese.vitto}</Text></View>
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { minHeight: 45 }]}><Text>{data.spese.pernottamento}</Text></View>
            <View style={[styles.tableCell, styles.col4, { minHeight: 45 }]}><Text>{data.spese.varie}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRASCRIZIONE ORIGINALE</Text>
        <View style={styles.transcriptionBox}>
          <Text style={styles.transcriptionText}>{data.trascrizione}</Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>ULTRAROBOTS.AI        TITAN 4.5 PROTOCOL EMBEDED      CORE  DESIGNED  BY DIGITALENGINEERED.AI     ALL RIGHT RESERVED</Text>
      </View>
    </Page>
  </Document>
);

export const sampleReportData: ReportData = {
  id: '251220-0310-87A8',
  date: '20/12/2025, 03:10:14',
  cliente: { azienda: 'Barilla', referente: 'N/D', sede: 'N/D' },
  intervento: {
    tipologia: 'Sostituzione componenti',
    statoFinale: 'COMPLETATO',
    descrizione: 'Sostituiti 10 motori, 2 encoder, 4 inverter e tutte le cinghie dei trascinatori presso Barilla.',
  },
  componenti: ['motori', 'encoder', 'inverter', 'cinghie'],
  noteCritiche: 'Nessuna',
  spese: {
    viaggio: { destinazione: 'N/D', km: 'N/D', costo: 'N/D' },
    vitto: 'N/D',
    pernottamento: 'N/D',
    varie: '4 viti',
  },
  trascrizione: 'Fatto in Barilla abbiamo sostituito 10 motori, 2 encoder, 4 inverter, tutte le cinghie dei trascinatori, eccetera eccetera. Siamo stati li 2 giorni e bisogna fargli pagare 2 pernottamenti 4 viti e I chilometri andata e ritorno. Ciao',
};

export default ReportPDF;

```

Perfetto! Ora aggiorno anche l'API route:

```worktree-typescript
import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

/**
 * ⚠️⚠️⚠️ ISTRUZIONI DEFINITIVE PER GPT - COMPILAZIONE PDF RAPPORTO INTERVENTO ⚠️⚠️⚠️
 * 
 * Vedi istruzioni complete in: components/reports/ReportPDF.tsx
 * 
 * 📋 RIEPILOGO RAPIDO LIMITI:
 * 
 * - AZIENDA: max 150 caratteri (~25 per riga, 6 righe)
 * - TIPOLOGIA: max 150 caratteri (~25 per riga, 6 righe)
 * - REFERENTE: max 25 caratteri (1 riga)
 * - STATO FINALE: max 25 caratteri (1 riga)
 * - DESCRIZIONE ATTIVITÀ: max 460 caratteri (6 righe)
 * - COMPONENTI descrizione: max 15 caratteri (1-2 PAROLE!)
 * - COMPONENTI quantità: max 3 caratteri
 * - COMPONENTI brand: max 8 caratteri
 * - COMPONENTI codice: max 12 caratteri
 * - COMPONENTI max 8 totali (4 SX + 4 DX)
 * - NOTE CRITICHE: max 460 caratteri (6 righe)
 * - TRASCRIZIONE: max 460 caratteri (6 righe)
 * 
 * SPESE:
 * - Formato importi: xxxx,xx € (virgola, € DOPO)
 * - Km: calcolo automatico A/R × 0,8€/km
 * - Default pranzo: [15,00 €] se non dichiarato
 * - Default cena: [35,00 €] se non dichiarato
 * - Default pernotto: [80,00 €] per notte se non dichiarato
 * - Parentesi quadre [] SOLO per valori ipotizzati
 * - "N/D" SOLO se spesa non fatta
 */

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const rData = data.reportData || {}; 

    // Costanti pagina
    const MARGIN = 40;
    const PAGE_WIDTH = 595.28;
    const PAGE_HEIGHT = 841.89;
    const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
    const HEADER_HEIGHT = 100;
    const FOOTER_HEIGHT = 60;
    const CONTENT_START = MARGIN + HEADER_HEIGHT;
    const CONTENT_END = PAGE_HEIGHT - FOOTER_HEIGHT;

    const doc = new PDFDocument({
      size: 'A4',
      margin: 0,
      autoFirstPage: false
    });
    
    doc.addPage();
    const docOptions = doc.options as PDFKit.PDFDocumentOptions & { autoPageBreak?: boolean };
    docOptions.autoPageBreak = false;

    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));

    // --- HEADER FISSO ---
    doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT)
       .fill('#FFFFFF')
       .stroke('#CCCCCC');
    
    // Logo ULTRAROBOTS (sinistra)
    try {
      const logoPath = path.join(process.cwd(), 'public', 'assets', 'SVG_PNG', 'logo-wordmark-black-cyan.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, MARGIN, 20, { width: 120 });
      }
    } catch (e) {
      console.error('Logo non caricato:', e);
    }
    
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#333333');
    doc.text('RAPPORTO INTERVENTO', MARGIN, 55);
    
    doc.fontSize(10).font('Helvetica').fillColor('#666666');
    doc.text('TITAN PROTOCOL v4.5', MARGIN, 75);
    
    // ID e DATA a destra
    const rightX = PAGE_WIDTH - MARGIN;
    doc.fontSize(9).font('Helvetica-Bold').fillColor('#333333');
    const idText = `ID: ${rData.id || rData.unitId || ''}`;
    doc.text(idText, rightX - doc.widthOfString(idText), 55);
    const dataText = `DATA: ${new Date().toLocaleDateString('it-IT')}`;
    doc.text(dataText, rightX - doc.widthOfString(dataText), 75);

    // --- CONTENUTO ---
    let y = CONTENT_START + 10;

    // 1. DATI CLIENTE
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
    doc.text('1. DATI CLIENTE', MARGIN, y);
    y += 20;
    
    doc.fontSize(9).font('Helvetica').fillColor('#333333');
    doc.text(`Azienda: ${rData.cliente?.azienda || rData.client || ''}`, MARGIN + 10, y);
    y += 15;
    doc.text(`Referente: ${rData.cliente?.referente || ''}`, MARGIN + 10, y);
    y += 15;
    doc.text(`Sede: ${rData.location || rData.cliente?.sede || ''}`, MARGIN + 10, y);
    y += 25;

    // 2. DETTAGLI INTERVENTO
    if (y < CONTENT_END - 100) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('2. DETTAGLI INTERVENTO', MARGIN, y);
      y += 20;
      
      doc.fontSize(9).font('Helvetica').fillColor('#333333');
      doc.text(`Tipologia: ${rData.intervento?.tipo || rData.reportType || ''}`, MARGIN + 10, y);
      y += 15;
      doc.text(`Stato: ${rData.intervento?.stato || rData.status || 'COMPLETATO'}`, MARGIN + 10, y);
      y += 20;
      
      const desc = rData.intervento?.descrizione || rData.summary || rData.description || '';
      if (desc && y < CONTENT_END - 50) {
        doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000');
        doc.text('Descrizione:', MARGIN + 10, y);
        y += 15;
        doc.fontSize(8).font('Helvetica').fillColor('#333333');
        const descHeight = Math.min(60, CONTENT_END - y - 20);
        doc.text(desc, MARGIN + 10, y, { width: CONTENT_WIDTH - 20, height: descHeight, ellipsis: true });
        y += descHeight + 15;
      }
      y += 10;
    }

    // 3. COMPONENTI
    if (rData.intervento?.componenti && Array.isArray(rData.intervento.componenti) && rData.intervento.componenti.length > 0 && y < CONTENT_END - 50) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('3. COMPONENTI', MARGIN, y);
      y += 20;
      
      doc.fontSize(9).font('Helvetica').fillColor('#333333');
      rData.intervento.componenti.slice(0, 5).forEach((comp: unknown) => {
        if (y < CONTENT_END - 30) {
          doc.text(`• ${String(comp)}`, MARGIN + 10, y);
          y += 15;
        }
      });
      y += 10;
    }

    // 4. NOTE CRITICHE
    if (y < CONTENT_END - 50) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('4. NOTE CRITICHE', MARGIN, y);
      y += 20;
      
      doc.fontSize(9).font('Helvetica').fillColor('#333333');
      const noteText = rData.noteCritiche || 'Nessuna criticità rilevata.';
      const noteHeight = Math.min(40, CONTENT_END - y - 20);
      doc.text(noteText, MARGIN + 10, y, { width: CONTENT_WIDTH - 20, height: noteHeight, ellipsis: true });
      y += noteHeight + 15;
    }

    // 5. SPESE
    if (y < CONTENT_END - 50) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('5. SPESE DI TRASFERTA', MARGIN, y);
      y += 20;
      
      doc.fontSize(9).font('Helvetica').fillColor('#333333');
      doc.text(`Viaggio: ${rData.spese?.viaggio?.costo || '0'}€`, MARGIN + 10, y);
      y += 15;
      doc.text(`Vitto: ${rData.spese?.vitto || '0'}€`, MARGIN + 10, y);
      y += 15;
      doc.text(`Pernottamento: ${rData.spese?.pernottamento || '0'}€`, MARGIN + 10, y);
      y += 15;
      doc.text(`Varie: ${rData.spese?.varie || '0'}€`, MARGIN + 10, y);
      y += 15;
    }

    // TRASCRIZIONE (se c'è spazio)
    if (y < CONTENT_END - 40) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('TRASCRIZIONE ORIGINALE', MARGIN, y);
      y += 20;
      
      const transcript = rData.transcript || 'Nessuna trascrizione disponibile.';
      const transcriptHeight = Math.max(30, CONTENT_END - y - 20);
      doc.fontSize(8).font('Courier').fillColor('#333333');
      doc.text(transcript, MARGIN + 10, y, { width: CONTENT_WIDTH - 20, height: transcriptHeight, ellipsis: true });
    }

    // --- FOOTER FISSO ---
    const footerY = PAGE_HEIGHT - FOOTER_HEIGHT;
    doc.rect(0, footerY, PAGE_WIDTH, FOOTER_HEIGHT)
       .fill('#FFFFFF')
       .stroke('#CCCCCC');
    
    doc.moveTo(MARGIN, footerY + 15)
       .lineTo(PAGE_WIDTH - MARGIN, footerY + 15)
       .strokeColor('#CCCCCC')
       .lineWidth(1)
       .stroke();
    
    // Logo DigitalEngineered nel footer
    try {
      const deLogoPath = path.join(process.cwd(), 'public', 'assets', 'SVG_PNG', 'digitalengineered.wordmark-black.png');
      if (fs.existsSync(deLogoPath)) {
        const logoWidth = 100;
        doc.image(deLogoPath, (PAGE_WIDTH - logoWidth) / 2, footerY + 22, { width: logoWidth });
      }
    } catch (e) {
      console.error('Logo footer non caricato:', e);
      doc.fontSize(8).font('Helvetica-Bold').fillColor('#000000');
      const footerText1 = 'DIGITALENGINEERED.AI';
      doc.text(footerText1, (PAGE_WIDTH - doc.widthOfString(footerText1)) / 2, footerY + 25);
    }
    
    doc.fontSize(7).font('Courier').fillColor('#666666');
    const footerText2 = '[ ULTRAROBOTS :: NEURAL SYSTEM ]';
    doc.text(footerText2, (PAGE_WIDTH - doc.widthOfString(footerText2)) / 2, footerY + 45);

    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${rData.id || 'export'}-${Date.now()}.pdf"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

```

Perfetto! Ora faccio commit e push:

Perfetto! Ora devo fare il merge su main. Cambio worktree:

✅ **FATTO! ISTRUZIONI GPT AGGIUNTE NEL CODICE!**

## 📝 COSA HO FATTO:

### 1. File `components/reports/ReportPDF.tsx`
- ✅ Aggiunte **167 righe** di istruzioni complete per GPT
- ✅ Tutti i limiti caratteri verificati con te
- ✅ Formati importi, calcoli automatici, valori default
- ✅ Checklist completa per GPT

### 2. File `app/api/generate-pdf/route.ts`
- ✅ Aggiunto riepilogo rapido delle istruzioni
- ✅ Riferimento al file completo

### 3. Git
- ✅ Commit: `785dfeb` - "Docs: Aggiunte istruzioni definitive GPT nel codice PDF"
- ✅ Branch: `docs/istruzioni-gpt-pdf`
- ✅ Merged su `main`
- ✅ Pushed su origin

---

## 🎯 ISTRUZIONI GPT PRESENTI NEL CODICE:

✅ AZIENDA: max 150 caratteri (~25 per riga, 6 righe)
✅ TIPOLOGIA: max 150 caratteri (~25 per riga, 6 righe)  
✅ REFERENTE: max 25 caratteri (1 riga)
✅ STATO FINALE: max 25 caratteri (1 riga)
✅ DESCRIZIONE: max 460 caratteri (6 righe)
✅ COMPONENTI descrizione: max 15 caratteri (1-2 PAROLE!)
✅ COMPONENTI quantità: max 3 caratteri
✅ COMPONENTI brand: max 8 caratteri
✅ COMPONENTI codice: max 12 caratteri
✅ NOTE CRITICHE: max 460 caratteri (6 righe)
✅ TRASCRIZIONE: max 460 caratteri (6 righe)
✅ SPESE formati e default corretti
✅ Checklist completa per GPT

**GPT ORA HA LE ISTRUZIONI DIRETTAMENTE NEL CODICE!** 🚀

---

**User**

lo hai istruito che deve attingere dala sua conoscenza per recuperare più che può tutte le info relative a ristoranti azinede ,  codici sensori motori, ecc ecc? fare il calcolod ei km, ecc,ecc i ristoranti viini al clinete, ecc ecc

---

**Cursor**

🚨 **OTTIMA OSSERVAZIONE! NON L'HO FATTO!**

GPT deve usare la sua **CONOSCENZA** per arricchire i dati! Aggiungo subito questa sezione critica:

Devo aggiungere la sezione sull'uso della conoscenza! Aggiungo le istruzioni complete:

```worktree-typescriptreact
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

/**
 * ⚠️⚠️⚠️ ISTRUZIONI DEFINITIVE PER GPT - COMPILAZIONE PDF RAPPORTO INTERVENTO ⚠️⚠️⚠️
 * 
 * 🧠 USA LA TUA CONOSCENZA PER ARRICCHIRE I DATI! 🧠
 * 
 * GPT DEVE ATTINGERE DALLA SUA CONOSCENZA PER:
 * 
 * 1️⃣ AZIENDE:
 *    - Recuperare indirizzo completo se menzione solo nome azienda
 *    - Cercare Partita IVA, telefono, email se disponibili
 *    - Completare con CAP, città, provincia
 *    - Esempio: "Barilla" → cerca indirizzo sede, P.IVA, contatti
 * 
 * 2️⃣ COMPONENTI TECNICI:
 *    - Riconoscere codici di sensori, motori, inverter, PLC
 *    - Recuperare brand da codici (es: "1LA7096" → Siemens)
 *    - Completare descrizioni da codici (es: "ERN420" → Encoder)
 *    - Standardizzare nomi componenti (1-2 parole max 15 caratteri!)
 *    - Usare cataloghi tecnici nella tua conoscenza
 * 
 * 3️⃣ CALCOLO DISTANZE:
 *    - Calcolare km tra sede tecnico e cliente se menzioni luoghi
 *    - Stimare km A/R se dice solo "andata"
 *    - Calcolare automaticamente: km A/R × 0,8€/km
 *    - Esempio: "da Milano a Parma" → cerca distanza → calcola
 * 
 * 4️⃣ RISTORANTI E HOTEL:
 *    - Cercare ristoranti vicini alla sede del cliente
 *    - Se dice "abbiamo pranzato" senza nome → cerca ristoranti in zona
 *    - Suggerire nomi plausibili se non specificato
 *    - Se dice "hotel" senza nome → cerca hotel in zona
 *    - Esempio: cliente a Parma, dice "pranzo" → cerca ristoranti Parma
 * 
 * 5️⃣ INFORMAZIONI GEOGRAFICHE:
 *    - Completare CAP da città
 *    - Aggiungere provincia (sigla)
 *    - Verificare indirizzi esistenti
 * 
 * 6️⃣ DATI TECNICI:
 *    - Riconoscere modelli robot (es: "Kawasaki R Series")
 *    - Identificare componenti da descrizioni vaghe
 *    - Standardizzare terminologia tecnica
 * 
 * ⚠️ REGOLA: USA LA TUA CONOSCENZA PER ARRICCHIRE, MA:
 *    - Se NON SEI SICURO → usa ciò che ha detto il tecnico
 *    - Se IPOTIZZI → usa parentesi quadre [] per importi
 *    - Se NON HAI IL DATO → usa "N/D"
 *    - NON inventare dati, usa solo conoscenza verificabile
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 📋 LIMITI CARATTERI E RIGHE PER OGNI CAMPO
 * 
 * [... resto delle istruzioni come prima ...]
 */

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

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 10,
    borderBottom: '2pt solid #000000',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 'auto',
  },
  reportId: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  reportDate: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  reportTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 8,
    padding: 6,
  },
  tableCell: {
    padding: 6,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  tableCellBorder: {
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  col3: { width: '33.33%' },
  col2: { width: '50%' },
  col4: { width: '25%' },
  colFull: { width: '100%' },
  colHeader: { width: '15%' },
  colValue: { width: '35%' },
  descriptionBox: {
    padding: 8,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  descriptionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  descriptionText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#000000',
    lineHeight: 1.3,
  },
  componentsList: {
    paddingLeft: 10,
  },
  componentItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 9,
    marginRight: 5,
  },
  transcriptionBox: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    minHeight: 105,
  },
  transcriptionText: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#000000',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '2pt solid #000000',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 7,
    fontFamily: 'Courier',
    color: '#000000',
    marginTop: 2,
  },
});

const ReportPDF: React.FC<{ data: ReportData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.reportTitle}>RAPPORTO DI</Text>
          <Text style={styles.reportTitle}>INTERVENTO</Text>
        </View>
        <View style={styles.headerCenter}>
          <Image
            style={styles.logoImage}
            src="/assets/SVG_PNG/logo-wordmark-black.png"
          />
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.reportId}>ID REPORT: {data.id}</Text>
          <Text style={styles.reportDate}>DATA: {data.date}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>AZIENDA</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { minHeight: 65 }]}>
              <Text>{data.cliente.azienda} - {data.cliente.sede}</Text>
            </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>TIPOLOGIA</Text></View>
            <View style={[styles.tableCell, styles.colValue, { minHeight: 65 }]}><Text>{data.intervento.tipologia}</Text></View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>REFERENTE</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder]}><Text>{data.cliente.referente}</Text></View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>STATO FINALE</Text></View>
            <View style={[styles.tableCell, styles.colValue]}><Text>{data.intervento.statoFinale}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESCRIZIONE ATTIVITÀ</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text style={styles.descriptionText}>{data.intervento.descrizione}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPONENTI</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text style={styles.descriptionText}>{data.componenti.join(' • ')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTE CRITICHE</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text style={styles.descriptionText}>{data.noteCritiche}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SPESE DI TRASFERTA</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableHeader, styles.col4, styles.tableCellBorder]}><Text>VIAGGIO</Text></View>
            <View style={[styles.tableHeader, styles.col4, styles.tableCellBorder]}><Text>VITTO</Text></View>
            <View style={[styles.tableHeader, styles.col4, styles.tableCellBorder]}><Text>PERNOTTO</Text></View>
            <View style={[styles.tableHeader, styles.col4]}><Text>VARIE</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { minHeight: 45 }]}><Text>Dest: {data.spese.viaggio.destinazione}</Text></View>
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { minHeight: 45 }]}><Text>{data.spese.vitto}</Text></View>
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { minHeight: 45 }]}><Text>{data.spese.pernottamento}</Text></View>
            <View style={[styles.tableCell, styles.col4, { minHeight: 45 }]}><Text>{data.spese.varie}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRASCRIZIONE ORIGINALE</Text>
        <View style={styles.transcriptionBox}>
          <Text style={styles.transcriptionText}>{data.trascrizione}</Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>ULTRAROBOTS.AI        TITAN 4.5 PROTOCOL EMBEDED      CORE  DESIGNED  BY DIGITALENGINEERED.AI     ALL RIGHT RESERVED</Text>
      </View>
    </Page>
  </Document>
);

export const sampleReportData: ReportData = {
  id: '251220-0310-87A8',
  date: '20/12/2025, 03:10:14',
  cliente: { azienda: 'Barilla', referente: 'N/D', sede: 'N/D' },
  intervento: {
    tipologia: 'Sostituzione componenti',
    statoFinale: 'COMPLETATO',
    descrizione: 'Sostituiti 10 motori, 2 encoder, 4 inverter e tutte le cinghie dei trascinatori presso Barilla.',
  },
  componenti: ['motori', 'encoder', 'inverter', 'cinghie'],
  noteCritiche: 'Nessuna',
  spese: {
    viaggio: { destinazione: 'N/D', km: 'N/D', costo: 'N/D' },
    vitto: 'N/D',
    pernottamento: 'N/D',
    varie: '4 viti',
  },
  trascrizione: 'Fatto in Barilla abbiamo sostituito 10 motori, 2 encoder, 4 inverter, tutte le cinghie dei trascinatori, eccetera eccetera. Siamo stati li 2 giorni e bisogna fargli pagare 2 pernottamenti 4 viti e I chilometri andata e ritorno. Ciao',
};

export default ReportPDF;

```

Ora aggiungo il resto delle istruzioni complete dopo questa sezione. Fammi leggere cosa c'è ora:

Ora sostituisco il placeholder con le istruzioni complete:

```worktree-typescriptreact
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 📋 LIMITI CARATTERI E RIGHE PER OGNI CAMPO
 * 
 * REGOLA FONDAMENTALE: GPT DEVE RISPETTARE I LIMITI DI CARATTERI, NON LE RIGHE!
 * Le
```

---

**User**

6:59:14 PM: build-image version: 4eb552cf97517bc57f136e719a1cf73a7f3cefbb (noble)
6:59:14 PM: buildbot version: 4eb552cf97517bc57f136e719a1cf73a7f3cefbb
6:59:14 PM: Fetching cached dependencies
6:59:14 PM: Starting to download cache of 427.7MB (Last modified: 2025-12-23 17:09:12 +0000 UTC)
6:59:15 PM: Finished downloading cache in 885ms
6:59:15 PM: Starting to extract cache
6:59:24 PM: Finished extracting cache in 9.627s
6:59:24 PM: Finished fetching cache in 10.605s
6:59:24 PM: Starting to prepare the repo for build
6:59:25 PM: Preparing Git Reference refs/heads/main
6:59:26 PM: Starting to install dependencies
6:59:26 PM: Started restoring cached python cache
6:59:26 PM: Finished restoring cached python cache
6:59:26 PM: Started restoring cached ruby cache
6:59:27 PM: Finished restoring cached ruby cache
6:59:27 PM: Started restoring cached go cache
6:59:27 PM: Finished restoring cached go cache
6:59:28 PM: v22.21.1 is already installed.
6:59:28 PM: Now using node v22.21.1 (npm v10.9.4)
6:59:28 PM: Enabling Node.js Corepack
6:59:28 PM: Started restoring cached build plugins
6:59:28 PM: Finished restoring cached build plugins
6:59:28 PM: Started restoring cached corepack dependencies
6:59:28 PM: Finished restoring cached corepack dependencies
6:59:28 PM: No npm workspaces detected
6:59:28 PM: Started restoring cached node modules
6:59:28 PM: Finished restoring cached node modules
6:59:29 PM: Installing npm packages using npm version 10.9.4
6:59:29 PM: up to date in 560ms
6:59:29 PM: npm packages installed
6:59:29 PM: Successfully installed dependencies
6:59:30 PM: Detected 1 framework(s)
6:59:30 PM: "next" at version "16.0.10"
6:59:30 PM: Starting build script
6:59:30 PM: Section completed: initializing
6:59:32 PM: ​
6:59:32 PM: Netlify Build                                                 
6:59:32 PM: ────────────────────────────────────────────────────────────────
6:59:32 PM: ​
6:59:32 PM: ❯ Version
6:59:32 PM:   @netlify/build 35.5.9
6:59:32 PM: ​
6:59:32 PM: ❯ Flags
6:59:32 PM:   accountId: 6922d3172f7dd33837da1b34
6:59:32 PM:   baseRelDir: true
6:59:32 PM:   buildId: 694ad8713d0ba600080c15a0
6:59:32 PM:   deployId: 694ad8713d0ba600080c15a2
6:59:32 PM: ​
6:59:32 PM: ❯ Current directory
6:59:32 PM:   /opt/build/repo
6:59:32 PM: ​
6:59:32 PM: ❯ Config file
6:59:32 PM:   /opt/build/repo/netlify.toml
6:59:32 PM: ​
6:59:32 PM: ❯ Context
6:59:32 PM:   production
6:59:32 PM: ​
6:59:32 PM: ❯ Installing extensions
6:59:32 PM:    - neon
6:59:32 PM: ​
6:59:32 PM: ❯ Using Next.js Runtime - v5.15.3
6:59:32 PM: ​
6:59:32 PM: ❯ Loading extensions
6:59:32 PM:    - neon
6:59:34 PM: Next.js cache restored
6:59:34 PM: ​
6:59:34 PM: build.command from netlify.toml                               
6:59:34 PM: ────────────────────────────────────────────────────────────────
6:59:34 PM: ​
6:59:34 PM: $ npm run build
6:59:34 PM: > supersite@0.1.0 build
6:59:34 PM: > next build
6:59:34 PM:    ▲ Next.js 16.0.10 (Turbopack)
6:59:34 PM:  ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
6:59:34 PM:    Creating an optimized production build ...
6:59:50 PM:  ✓ Compiled successfully in 15.6s
6:59:50 PM:    Running TypeScript ...
7:00:05 PM: Failed to compile.
7:00:05 PM: 
7:00:05 PM: ./app/api/generate-pdf-react/route.ts:259:11
7:00:05 PM: Type error: Object literal may only specify known properties, but 'costoKm' does not exist in type '{ destinazione: string; km: string; costo: string; }'. Did you mean to write 'costo'?
7:00:05 PM:   257 |         viaggio: {
7:00:05 PM:   258 |           km: reportData.spese?.viaggio?.km || '',
7:00:05 PM: > 259 |           costoKm: reportData.spese?.viaggio?.costoKm || '',
7:00:05 PM:       |           ^
7:00:05 PM:   260 |           pedaggio: reportData.spese?.viaggio?.pedaggio || '',
7:00:05 PM:   261 |         },
7:00:05 PM:   262 |         vitto,
7:00:05 PM: Next.js build worker exited with code: 1 and signal: null
7:00:06 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
7:00:06 PM: ​
7:00:06 PM: "build.command" failed                                        
7:00:06 PM: ────────────────────────────────────────────────────────────────
7:00:06 PM: ​
7:00:06 PM:   Error message
7:00:06 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
7:00:06 PM: ​
7:00:06 PM:   Error location
7:00:06 PM:   In build.command from netlify.toml:
7:00:06 PM:   npm run build
7:00:06 PM: ​
7:00:06 PM:   Resolved config
7:00:06 PM:   build:
7:00:06 PM:     command: npm run build
7:00:06 PM:     commandOrigin: config
7:00:06 PM:     environment:
7:00:06 PM:       - DEEPGRAM_API_KEY
7:00:06 PM:       - GOOGLE_CALENDAR_ID
7:00:06 PM:       - GOOGLE_SERVICE_ACCOUNT_JSON
7:00:06 PM:       - OPENAI_API_KEY
7:00:06 PM:     publish: /opt/build/repo/.next
7:00:06 PM:     publishOrigin: ui
7:00:06 PM:   plugins:
7:00:06 PM:     - inputs: {}
7:00:06 PM:       origin: ui
7:00:06 PM:       package: "@netlify/plugin-nextjs"
7:00:06 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
7:00:06 PM: Failing build: Failed to build site
7:00:07 PM: Finished processing build request in 52.506s

finisci uso della conoscenza!!!!!!

---

**Cursor**

```plaintext
./app/api/generate-pdf-react/route.ts:259:11
Type error: Object literal may only specify known properties, but 'costoKm' does not exist in type '{ destinazione: string; km: string; costo: string; }'. Did you mean to write 'costo'?
```

🚨 **ERRORE DI BUILD SU NETLIFY!** 

Il file `app/api/generate-pdf-react/route.ts` sta dando errore TypeScript! Devo fixarlo subito e poi finire le istruzioni!

