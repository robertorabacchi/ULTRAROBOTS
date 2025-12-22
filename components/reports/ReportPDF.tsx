import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

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
