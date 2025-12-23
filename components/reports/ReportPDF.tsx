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
