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
 * GPT, quando compili il rapporto PDF, devi ATTINGERE DALLA TUA CONOSCENZA per:
 * 
 * 1. 🏢 AZIENDE E RISTORANTI:
 *    - Se l'utente menziona un'azienda, CERCA nella tua conoscenza:
 *      • Indirizzo completo e città
 *      • Ristoranti nelle vicinanze del cliente (max 10 km)
 *      • Hotel nelle vicinanze per pernottamento
 *    - Esempio: "Cliente: McDonald's Milano" → Cerca ristoranti vicini per vitto
 * 
 * 2. 📏 CALCOLO AUTOMATICO KM E COSTI:
 *    - CALCOLA i km se hai origine e destinazione:
 *      • Usa la tua conoscenza geografica per calcolare la distanza A/R
 *      • Formato km: "150 km A/R" (sempre A/R = andata/ritorno)
 *    - CALCOLA automaticamente costoKm:
 *      • Formula: km numerici × 0,80 €/km
 *      • Esempio: 150 km × 0,80 = €120,00
 *      • Formato: SEMPRE "€XXX,XX" (virgola decimale italiana)
 *    - Se utente dice "Milano-Torino" → Calcola ~140 km × 2 = 280 km A/R → €224,00
 * 
 * 3. 🔧 CODICI COMPONENTI, SENSORI, MOTORI:
 *    - RECUPERA dalla tua conoscenza i codici:
 *      • Brand/marca del componente (max 8 caratteri)
 *      • Codice prodotto (max 12 caratteri)
 *      • Quantità (max 3 caratteri, numerico)
 *    - Esempi:
 *      • "sensore temperatura Siemens" → Brand: "Siemens", Codice: "QAE2120.010"
 *      • "motore ABB 5.5kW" → Brand: "ABB", Codice: "M2BAX132M"
 *    - Se NON conosci il codice → usa "N/D" (mai inventare!)
 * 
 * 4. 🍽️ VITTO - RISTORANTI VICINI:
 *    - CERCA ristoranti nelle vicinanze del cliente:
 *      • Max 10 km dal cliente
 *      • Suggerisci ristoranti reali della zona
 *      • Formato: "Ristorante Nome, Città"
 *    - Se utente non specifica → usa "N/D"
 * 
 * 5. 🏨 PERNOTTAMENTO - HOTEL VICINI:
 *    - CERCA hotel nelle vicinanze del cliente:
 *      • Max 10 km dal cliente
 *      • Suggerisci hotel reali della zona
 *      • Calcola numero notti se hai date
 *    - Formato: "Hotel Nome, Città - X notti"
 * 
 * 6. 📍 INFORMAZIONI GEOGRAFICHE:
 *    - USA la tua conoscenza per:
 *      • Completare indirizzi parziali
 *      • Calcolare distanze tra località
 *      • Trovare città da CAP
 *      • Suggerire pedaggi autostradali (es: Milano-Roma → ~€30-40)
 * 
 * 7. ⚙️ INFORMAZIONI TECNICHE:
 *    - RECUPERA specifiche tecniche se menzionate:
 *      • Potenze motori (kW, HP)
 *      • Voltaggi (V, kV)
 *      • Correnti (A)
 *      • Temperature (°C)
 *      • Pressioni (bar, PSI)
 * 
 * ⚠️ REGOLE CRITICHE CONOSCENZA:
 * ✅ USA la conoscenza per ARRICCHIRE, mai per INVENTARE
 * ✅ Se NON sei sicuro → usa "N/D"
 * ✅ CALCOLA sempre km e costoKm se possibile
 * ✅ CERCA sempre ristoranti/hotel vicini al cliente
 * ✅ RECUPERA sempre codici componenti se li conosci
 * ❌ MAI inventare codici/dati se non li conosci
 * ❌ MAI lasciare campi vuoti (usa "N/D")
 * 
 * 📋 LIMITI CARATTERI (RIGOROSI - TRONCA SE NECESSARIO):
 * 
 * SEZIONE CLIENTE:
 * - azienda: max 150 caratteri (~25 per riga × 6 righe)
 * - referente: max 25 caratteri (1 riga)
 * - sede: max 150 caratteri (~25 per riga × 6 righe)
 * 
 * SEZIONE INTERVENTO:
 * - tipologia: max 150 caratteri (~25 per riga × 6 righe)
 * - statoFinale: max 25 caratteri (1 riga)
 * - descrizione: max 460 caratteri (6 righe × ~77 caratteri)
 * 
 * COMPONENTI (per ogni componente):
 * - descrizione: max 15 caratteri (1-2 PAROLE!)
 * - quantità: max 3 caratteri (numero breve)
 * - brand: max 8 caratteri
 * - codice: max 12 caratteri
 * 
 * SPESE:
 * - viaggio.destinazione: max 150 caratteri
 * - viaggio.km: formato "XXX km A/R" (max 20 caratteri)
 * - viaggio.costoKm: formato "€XXX,XX" (SEMPRE con € e virgola)
 * - viaggio.costo: formato "€XXX,XX" (pedaggio)
 * - vitto: testo libero ma conciso
 * - pernottamento: testo libero ma conciso
 * - varie: testo libero ma conciso
 * 
 * ALTRE SEZIONI:
 * - noteCritiche: max 460 caratteri (6 righe)
 * - trascrizione: max 460 caratteri (6 righe)
 * 
 * 💰 FORMATI IMPORTI:
 * ✅ SEMPRE formato italiano: "€120,00" (virgola decimale)
 * ✅ SEMPRE simbolo € PRIMA del numero
 * ✅ SEMPRE 2 decimali
 * ❌ MAI: "120€", "EUR 120", "120.00", "$120"
 * 
 * 📐 CALCOLI AUTOMATICI:
 * - costoKm = km numerici × 0,80 €/km
 * - Esempio: "150 km A/R" → 150 × 0,80 = €120,00
 * - Se km è "N/D" → costoKm è "N/D"
 * 
 * 🔄 VALORI DEFAULT:
 * - Qualsiasi campo vuoto o non fornito → "N/D"
 * - MAI lasciare campi completamente vuoti
 * - "N/D" = "Non Disponibile"
 * 
 * ✅ CHECKLIST GPT PRIMA DI GENERARE PDF:
 * □ Ho CALCOLATO i km se possibile?
 * □ Ho CALCOLATO costoKm (km × 0,80)?
 * □ Ho CERCATO ristoranti vicini al cliente?
 * □ Ho CERCATO hotel vicini al cliente?
 * □ Ho RECUPERATO codici componenti se li conosco?
 * □ Tutti i campi vuoti sono "N/D"?
 * □ Tutti gli importi sono formato "€XXX,XX"?
 * □ Tutti i limiti caratteri sono rispettati?
 * □ Ho troncato i testi troppo lunghi?
 * □ Ho usato la conoscenza per arricchire i dati?
 * 
 * Se tutti i □ sono ✅ → GENERA IL PDF!
 * 
 * ⚠️⚠️⚠️ FINE ISTRUZIONI GPT ⚠️⚠️⚠️
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
      costoKm: string;
      pedaggio: string;
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
