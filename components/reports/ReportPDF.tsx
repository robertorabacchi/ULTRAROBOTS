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
const ReportPDF: React.FC<{ data: ReportData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.reportTitle}>RAPPORTO DI</Text>
          <Text style={[styles.reportTitle, { marginTop: -2 }]}>INTERVENTO</Text>
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
              <Text numberOfLines={3}>{data.cliente.azienda} - {data.cliente.sede}</Text>
            </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>TIPOLOGIA</Text></View>
            <View style={[styles.tableCell, styles.colValue, { minHeight: 65 }]}><Text numberOfLines={3}>{data.intervento.tipologia}</Text></View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>REFERENTE</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder]}><Text numberOfLines={1}>{data.cliente.referente}</Text></View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>STATO FINALE</Text></View>
            <View style={[styles.tableCell, styles.colValue]}><Text numberOfLines={1}>{data.intervento.statoFinale}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESCRIZIONE ATTIVITÀ</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text style={styles.descriptionText} numberOfLines={4}>{data.intervento.descrizione}</Text>
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
              const comp = data.componenti[idx];
              return (
                <View key={`comp-left-${idx}`} style={idx === 3 ? styles.tableRowLast : styles.tableRow}>
                  <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof comp === 'object' && comp ? comp.quantita : (comp || '')}</Text></View>
                  <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof comp === 'object' && comp ? comp.descrizione : (comp || '')}</Text></View>
                  <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof comp === 'object' && comp ? comp.brand : ''}</Text></View>
                  <View style={[styles.componentCell, styles.compColCode]}><Text numberOfLines={1}>{typeof comp === 'object' && comp ? comp.codice : ''}</Text></View>
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
              const comp = data.componenti[idx + 4];
              return (
                <View key={`comp-right-${idx}`} style={idx === 3 ? styles.tableRowLast : styles.tableRow}>
                  <View style={[styles.componentCell, styles.compColQta, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof comp === 'object' && comp ? comp.quantita : (comp || '')}</Text></View>
                  <View style={[styles.componentCell, styles.compColDesc, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof comp === 'object' && comp ? comp.descrizione : (comp || '')}</Text></View>
                  <View style={[styles.componentCell, styles.compColBrand, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof comp === 'object' && comp ? comp.brand : ''}</Text></View>
                  <View style={[styles.componentCell, styles.compColCode]}><Text numberOfLines={1}>{typeof comp === 'object' && comp ? comp.codice : ''}</Text></View>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTE CRITICHE</Text>
        <View style={[styles.descriptionBox, { minHeight: 75 }]}>
          <Text style={styles.descriptionText} numberOfLines={4}>{data.noteCritiche}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SPESE DI TRASFERTA</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>VIAGGIO</Text></View>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>VITTO</Text></View>
            <View style={[styles.spesaHeader, styles.col4, styles.tableCellBorder]}><Text>PERNOTTO</Text></View>
            <View style={[styles.spesaHeader, styles.col4]}><Text>VARIE</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{data.spese.viaggio.km !== 'N/D' ? `Km (A/R): ${data.spese.viaggio.km}` : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof data.spese.vitto === 'object' && data.spese.vitto ? data.spese.vitto.pranzoPosto : (typeof data.spese.vitto === 'string' ? data.spese.vitto : '')}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento ? data.spese.pernottamento.nomeHotel : (typeof data.spese.pernottamento === 'string' ? data.spese.pernottamento : '')}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text numberOfLines={1}>{Array.isArray(data.spese.varie) && data.spese.varie[0] ? `${data.spese.varie[0].descrizione}: ${data.spese.varie[0].importo}` : ''}</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{data.spese.viaggio.costoKm !== 'N/D' ? `Importo Km: ${data.spese.viaggio.costoKm}` : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof data.spese.vitto === 'object' && data.spese.vitto && data.spese.vitto.pranzoPosto !== 'N/D' ? `Importo: ${data.spese.vitto.pranzoImporto}` : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento && data.spese.pernottamento.nomeHotel !== 'N/D' ? `Notti: ${data.spese.pernottamento.numeroNotti}` : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text numberOfLines={1}>{Array.isArray(data.spese.varie) && data.spese.varie[1] ? `${data.spese.varie[1].descrizione}: ${data.spese.varie[1].importo}` : ''}</Text></View>
          </View>
          <View style={[styles.tableRow, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{data.spese.viaggio.pedaggio !== 'N/D' ? `Importo Pedaggio: ${data.spese.viaggio.pedaggio}` : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof data.spese.vitto === 'object' && data.spese.vitto ? data.spese.vitto.cenaPosto : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof data.spese.pernottamento === 'object' && data.spese.pernottamento && data.spese.pernottamento.nomeHotel !== 'N/D' ? `Importo: ${data.spese.pernottamento.importo}` : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text numberOfLines={1}>{Array.isArray(data.spese.varie) && data.spese.varie[2] ? `${data.spese.varie[2].descrizione}: ${data.spese.varie[2].importo}` : ''}</Text></View>
          </View>
          <View style={[styles.tableRowLast, { minHeight: 18 }]}>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}></Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}>{typeof data.spese.vitto === 'object' && data.spese.vitto && data.spese.vitto.cenaPosto !== 'N/D' ? `Importo: ${data.spese.vitto.cenaImporto}` : ''}</Text></View>
            <View style={[styles.spesaCell, styles.col4, styles.tableCellBorder]}><Text numberOfLines={1}></Text></View>
            <View style={[styles.spesaCell, styles.col4]}><Text numberOfLines={1}>{Array.isArray(data.spese.varie) && data.spese.varie[3] ? `${data.spese.varie[3].descrizione}: ${data.spese.varie[3].importo}` : ''}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRASCRIZIONE ORIGINALE</Text>
        <View style={styles.transcriptionBox}>
          <Text style={styles.transcriptionText} numberOfLines={7}>{data.trascrizione}</Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Image style={styles.footerLogo} src="/assets/SVG_PNG/logo-wordmark-black.png" />
        <Text style={styles.footerText}>TITAN 4.5 PROTOCOL EMBEDED      CORE  DESIGNED  BY</Text>
        <Image style={styles.footerLogoDigitalEngineered} src="/assets/SVG_PNG/digitalengineered.wordmark-black.png" />
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
  cliente: { azienda: 'Barilla', referente: 'N/D', sede: 'N/D' },
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
