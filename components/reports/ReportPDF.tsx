/*
 * 🔒🔒🔒 REPORT PDF - VERSIONE FINALE BLOCCATA 🔒🔒🔒
 * 
 * ATTENZIONE: NON MODIFICARE QUESTO FILE!
 * Questa è la versione definitiva testata e funzionante (Stress Test superato).
 * Ogni modifica potrebbe rompere il layout, il troncamento o la visualizzazione dei loghi.
 * 
 * SE QUESTO FILE VIENE MODIFICATO ACCIDENTALMENTE:
 * Esegui il comando: ./restore_pdf_report.sh per ripristinare la versione sicura.
 * 
 * BACKUP SALVATO IN: backups/pdf_report_final/ReportPDF.tsx.LOCKED_FINAL
 */

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
 * ⚠️⚠️⚠️ ISTRUZIONI CRITICHE E MILLIMETRICHE PER GPT - COMPILAZIONE PDF ⚠️⚠️⚠️
 * 
 * ⏱️ TEMPO MASSIMO RICERCA DATI ESTERNI: 30 SECONDI TOTALI.
 * Se non trovi info su Azienda/Hotel/Ristoranti in 30s → USA "N/D" o dati generici plausibili.
 * NON BLOCCARE IL PROCESSO PER CERCARE DATI. VELOCITÀ > PERFEZIONE.
 * 
 * 📏 REGOLE DI FORMATTAZIONE E LIMITI (RISPETTARE TASSATIVAMENTE):
 * 
 * 1. 🏢 SEZIONE AZIENDA (6 Righe FISSE - Altezza 13pt l'una):
 *    - Riga 1 (Azienda): Max 150 char.
 *    - Riga 2 (Indirizzo): Max 150 char.
 *    - Riga 3 (Città): Max 150 char.
 *    - Riga 4 (P.IVA): Formato "P.IVA: XXXXX".
 *    - Riga 5 (Telefono): SOLO IL NUMERO. ❌ NO prefissi "Tel:", "Cell:". Max 1 riga.
 *    - Riga 6 (Email): SOLO EMAIL. ❌ NO prefissi "Email:", "PEC:". Max 1 riga.
 * 
 * 2. 🔧 COMPONENTI (Tabella Rigida - Altezza riga 18.25pt):
 *    - Q.TÀ: Max 3 char (es: "10", "5"). CENTRATO.
 *    - DESCRIZIONE: Max 15 char (1-2 parole chiave). ES: "Motore", "Sensore", "Cinghia".
 *      ❌ NO: "Motore elettrico trifase asincrono..." (VERRÀ TRONCATO!)
 *    - BRAND: Max 8 char. Es: "Siemens", "Omron".
 *    - CODICE: Max 12 char. Es: "1LA7096...".
 * 
 * 3. 💸 SPESE (Formatta SEMPRE come valuta):
 *    - Formato: "€120,00" (Virgola per decimali, € davanti).
 *    - Km: "150 km A/R" (Totale andata/ritorno).
 *    - Costo Km: Km totali * 0.80.
 * 
 * 4. 🧠 USO DELLA CONOSCENZA (TIMEBOX 30s):
 *    - Se l'utente dice "Barilla Parma":
 *      → Cerca RAPIDAMENTE indirizzo Barilla Parma.
 *      → Cerca RAPIDAMENTE 1 hotel e 1 ristorante in zona.
 *      → Se trovi in <30s: INSERISCI.
 *      → Se NON trovi: "N/D" o "Hotel in zona Parma".
 * 
 * 5. 🚫 DIVIETI ASSOLUTI:
 *    - MAI inventare codici tecnici se non specificati.
 *    - MAI scrivere testi lunghi nelle celle piccole (Componenti).
 *    - MAI usare formati data americani.
 * 
 * ✅ CHECKLIST FINALE RAPIDA:
 * □ Ho rispettato i 30s?
 * □ Telefono e Email sono "puliti" (senza prefissi)?
 * □ Descrizioni componenti sono < 15 caratteri?
 * □ Importi hanno la virgola?
 * 
 * SE SÌ → GENERA JSON.
 */

export interface Componente {
  quantita: string;
  descrizione: string;
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
    indirizzo?: string; // Via e civico
    citta?: string;     // CAP + Città + Provincia
    piva?: string;
    telefono?: string;
    email?: string;
  };
  intervento: {
    tipologia: string;
    statoFinale: string;
    descrizione: string;
  };
  componenti: Componente[];
  noteCritiche: string;
  vitto_nome?: string;
  pernotto_nome?: string;
  spese: {
    viaggio: {
      km: string;
      costoKm: string;
      pedaggio: string;
    };
    vitto: {
      pranzoPosto: string;
      pranzoImporto: string;
      cenaPosto: string;
      cenaImporto: string;
    };
    pernottamento: {
      nomeHotel: string;
      numeroNotti: string;
      importo: string;
    };
    varie: { descrizione: string; importo: string }[];
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
    lineHeight: 1,
  },
  titleContainer: {
    marginTop: 10,
    marginBottom: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
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

const hasValue = (val: string | undefined | null) => val && val !== 'N/D' && val.trim() !== '';

// Helper per mostrare testo vuoto se arriva 'N/D'
const clean = (val: string | undefined | null) => {
  if (!val || val === 'N/D') return '';
  return val;
};

// Helper per troncare il testo se supera il limite di caratteri
const truncate = (val: string | undefined | null, limit: number) => {
  const text = clean(val);
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit); // Nessun puntino per ID o codici se richiesto taglio netto
};

const LinedBackground = ({ rows, totalHeight }: { rows: number, totalHeight: number }) => {
  const rowHeight = totalHeight / rows;
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
       {Array.from({ length: rows - 1 }).map((_, i) => (
         <View 
           key={i}
           style={{
             position: 'absolute', 
             left: 0, 
             right: 0, 
             top: (i + 1) * rowHeight, 
             borderBottomWidth: 1, 
             borderBottomColor: '#CCCCCC' 
           }} 
         />
       ))}
    </View>
  );
};

const ReportPDF: React.FC<{ data: ReportData; logoUltrarobots?: string; logoDigitalEngineered?: string }> = ({ data, logoUltrarobots, logoDigitalEngineered }) => {
  const vittoDisplayName = hasValue(data.vitto_nome) ? truncate(data.vitto_nome, 25) : '';
  const pernottoDisplayName = hasValue(data.pernotto_nome)
    ? truncate(data.pernotto_nome, 25)
    : hasValue(data.spese.pernottamento.nomeHotel)
    ? truncate(data.spese.pernottamento.nomeHotel, 25)
    : '';

  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>RAPPORTO DI{'\n'}INTERVENTO</Text>
          </View>
        </View>
        <View style={styles.headerCenter}>
          {logoUltrarobots ? (
            <Image
              style={styles.logoImage}
              src={logoUltrarobots}
            />
          ) : (
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>ULTRAROBOTS</Text>
          )}
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.reportId}>ID REPORT: {truncate(data.id, 15)}</Text>
          <Text style={styles.reportDate}>DATA: {data.date}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>AZIENDA</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { height: 78, position: 'relative', padding: 0 }]}>
              {/* Riga 1: Ragione Sociale (Azienda) */}
              <View style={{ height: 13, justifyContent: 'center', paddingLeft: 4, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                 <Text wrap={false} style={{ fontSize: 9 }}>{truncate(clean(data.cliente.azienda), 25)}</Text>
              </View>
              {/* Riga 2: Via e Numero Civico */}
              <View style={{ height: 13, justifyContent: 'center', paddingLeft: 4, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                 <Text wrap={false} style={{ fontSize: 9 }}>
                   {truncate(clean(data.cliente.indirizzo) || clean(data.cliente.sede), 25)}
                 </Text>
              </View>
              {/* Riga 3: CAP + Città + Provincia */}
              <View style={{ height: 13, justifyContent: 'center', paddingLeft: 4, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                 <Text wrap={false} style={{ fontSize: 9 }}>{truncate(clean(data.cliente.citta), 25)}</Text>
              </View>
              {/* Riga 4: Partita IVA */}
              <View style={{ height: 13, justifyContent: 'center', paddingLeft: 4, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                 <Text wrap={false} style={{ fontSize: 9 }}>
                   {truncate(clean(data.cliente.piva) ? `P.IVA: ${clean(data.cliente.piva)}` : '', 25)}
                 </Text>
              </View>
              {/* Riga 5: Telefono */}
              <View style={{ height: 13, justifyContent: 'center', paddingLeft: 4, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                 <Text wrap={false} style={{ fontSize: 9 }}>{truncate(clean(data.cliente.telefono), 25)}</Text>
              </View>
               {/* Riga 6: Email */}
              <View style={{ height: 13, justifyContent: 'center', paddingLeft: 4 }}>
                 <Text wrap={false} style={{ fontSize: 9 }}>{truncate(clean(data.cliente.email), 25)}</Text>
              </View>
            </View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>TIPOLOGIA</Text></View>
            <View style={[styles.tableCell, styles.colValue, { height: 78 }]}><Text>{clean(data.intervento.tipologia)}</Text></View>
          </View>
          <View style={[styles.tableRowLast, { height: 25 }]}>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>REFERENTE</Text></View>
            <View style={[styles.tableCell, styles.colValue, styles.tableCellBorder, { overflow: 'hidden' }]}><Text wrap={false}>{truncate(data.cliente.referente, 25)}</Text></View>
            <View style={[styles.tableHeader, styles.colHeader, styles.tableCellBorder]}><Text>STATO FINALE</Text></View>
            <View style={[styles.tableCell, styles.colValue, { overflow: 'hidden' }]}><Text wrap={false}>{truncate(data.intervento.statoFinale, 25)}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESCRIZIONE ATTIVITÀ</Text>
        <View style={[styles.descriptionBox, { height: 75, overflow: 'hidden' }]}>
          <Text style={styles.descriptionText}>{truncate(data.intervento.descrizione, 460)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPONENTI</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* Colonna SX (Primi 4) */}
          <View style={{ width: '50%' }}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableHeader, { width: '13%' }, styles.tableCellBorder]}><Text>Q.TÀ</Text></View>
                <View style={[styles.tableHeader, { width: '33%' }, styles.tableCellBorder]}><Text>DESCRIZIONE</Text></View>
                <View style={[styles.tableHeader, { width: '25%' }, styles.tableCellBorder]}><Text>BRAND</Text></View>
                <View style={[styles.tableHeader, { width: '29%' }]}><Text>CODICE</Text></View>
              </View>
              {[0, 1, 2, 3].map(i => (
                <View key={i} style={[styles.tableRow, { height: 18.25 }]}>
                  <View style={[styles.tableCell, { width: '13%' }, styles.tableCellBorder, { overflow: 'hidden', padding: 2, justifyContent: 'center', alignItems: 'center' }]}><Text style={{ fontSize: 8, textAlign: 'center' }}>{truncate(data.componenti?.[i]?.quantita, 3)}</Text></View>
                  <View style={[styles.tableCell, { width: '33%' }, styles.tableCellBorder, { overflow: 'hidden', padding: 2, justifyContent: 'center' }]}><Text style={{ fontSize: 8 }}>{truncate(data.componenti?.[i]?.descrizione, 15)}</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }, styles.tableCellBorder, { overflow: 'hidden', padding: 2, justifyContent: 'center' }]}><Text style={{ fontSize: 8 }}>{truncate(data.componenti?.[i]?.brand, 8)}</Text></View>
                  <View style={[styles.tableCell, { width: '29%' }, { overflow: 'hidden', padding: 2, justifyContent: 'center' }]}><Text style={{ fontSize: 8 }}>{truncate(data.componenti?.[i]?.codice, 12)}</Text></View>
                </View>
              ))}
            </View>
          </View>

          {/* Colonna DX (Successivi 4) */}
          <View style={{ width: '50%' }}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableHeader, { width: '13%' }, styles.tableCellBorder]}><Text>Q.TÀ</Text></View>
                <View style={[styles.tableHeader, { width: '33%' }, styles.tableCellBorder]}><Text>DESCRIZIONE</Text></View>
                <View style={[styles.tableHeader, { width: '25%' }, styles.tableCellBorder]}><Text>BRAND</Text></View>
                <View style={[styles.tableHeader, { width: '29%' }]}><Text>CODICE</Text></View>
              </View>
              {[4, 5, 6, 7].map(i => (
                <View key={i} style={[styles.tableRow, { height: 18.25 }]}>
                  <View style={[styles.tableCell, { width: '13%' }, styles.tableCellBorder, { overflow: 'hidden', padding: 2, justifyContent: 'center', alignItems: 'center' }]}><Text style={{ fontSize: 8, textAlign: 'center' }}>{truncate(data.componenti?.[i]?.quantita, 3)}</Text></View>
                  <View style={[styles.tableCell, { width: '33%' }, styles.tableCellBorder, { overflow: 'hidden', padding: 2, justifyContent: 'center' }]}><Text style={{ fontSize: 8 }}>{truncate(data.componenti?.[i]?.descrizione, 15)}</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }, styles.tableCellBorder, { overflow: 'hidden', padding: 2, justifyContent: 'center' }]}><Text style={{ fontSize: 8 }}>{truncate(data.componenti?.[i]?.brand, 8)}</Text></View>
                  <View style={[styles.tableCell, { width: '29%' }, { overflow: 'hidden', padding: 2, justifyContent: 'center' }]}><Text style={{ fontSize: 8 }}>{truncate(data.componenti?.[i]?.codice, 12)}</Text></View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTE CRITICHE</Text>
        <View style={[styles.descriptionBox, { height: 75, overflow: 'hidden' }]}>
          <Text style={styles.descriptionText}>{truncate(data.noteCritiche, 460)}</Text>
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
            {/* VIAGGIO */}
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { height: 60 }]}>
              <Text style={{ height: 12, fontSize: 8 }}>
                {hasValue(data.spese.viaggio.km) ? `Km: ${truncate(data.spese.viaggio.km, 18)}` : ''}
              </Text>
              <Text style={{ height: 12, fontSize: 8 }}>
                {hasValue(data.spese.viaggio.costoKm) ? `Importo Km: ${truncate(data.spese.viaggio.costoKm, 20)}` : ''}
              </Text>
              <Text style={{ height: 12, fontSize: 8 }}>
                {hasValue(data.spese.viaggio.pedaggio) ? `Pedaggio: ${truncate(data.spese.viaggio.pedaggio, 20)}` : ''}
              </Text>
              <Text style={{ height: 12 }}></Text>
            </View>

            {/* VITTO */}
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { height: 60 }]}>
              {/* Riga 0: Locale rilevato */}
              <Text style={{ height: 12, fontSize: 8 }}>
                {vittoDisplayName ? `Locale: ${vittoDisplayName}` : ''}
              </Text>
              {/* Riga 1: Posto Pranzo */}
              <Text style={{ height: 12, fontSize: 8, fontWeight: 'bold' }}>
                {hasValue(data.spese.vitto.pranzoPosto) ? truncate(data.spese.vitto.pranzoPosto, 24) : ''}
              </Text>
              {/* Riga 2: Importo Pranzo */}
              <Text style={{ height: 12, fontSize: 8 }}>
                {hasValue(data.spese.vitto.pranzoPosto) ? `Importo: ${truncate(data.spese.vitto.pranzoImporto, 20)}` : ''}
              </Text>
              {/* Riga 3: Posto Cena */}
              <Text style={{ height: 12, fontSize: 8, fontWeight: 'bold' }}>
                {hasValue(data.spese.vitto.cenaPosto) ? truncate(data.spese.vitto.cenaPosto, 24) : ''}
              </Text>
              {/* Riga 4: Importo Cena */}
              <Text style={{ height: 12, fontSize: 8 }}>
                {hasValue(data.spese.vitto.cenaPosto) ? `Importo: ${truncate(data.spese.vitto.cenaImporto, 20)}` : ''}
              </Text>
            </View>

            {/* PERNOTTAMENTO */}
            <View style={[styles.tableCell, styles.col4, styles.tableCellBorder, { height: 60 }]}>
              {/* Riga 1: Nome Hotel */}
              <Text style={{ height: 12, fontSize: 8, fontWeight: 'bold' }}>
                {pernottoDisplayName}
              </Text>
              {/* Riga 2: Notti */}
              <Text style={{ height: 12, fontSize: 8 }}>
                {hasValue(data.spese.pernottamento.nomeHotel) ? `Notti: ${truncate(data.spese.pernottamento.numeroNotti, 12)}` : ''}
              </Text>
              {/* Riga 3: Importo */}
              <Text style={{ height: 12, fontSize: 8 }}>
                {hasValue(data.spese.pernottamento.nomeHotel) ? `Importo: ${truncate(data.spese.pernottamento.importo, 20)}` : ''}
              </Text>
              <Text style={{ height: 12 }}></Text>
            </View>

            {/* VARIE */}
            <View style={[styles.tableCell, styles.col4, { height: 60, borderRightWidth: 0 }]}>
              {data.spese.varie.slice(0, 4).map((item, index) => (
                <Text key={index} style={{ height: 12, fontSize: 8 }}>
                  {item.descrizione ? truncate(`${item.descrizione}: ${item.importo}`, 24) : ''}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRASCRIZIONE ORIGINALE</Text>
        <View style={[styles.descriptionBox, { height: 75, overflow: 'hidden' }]}>
          <Text style={styles.transcriptionText}>{truncate(data.trascrizione, 460)}</Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {logoUltrarobots ? (
            <Image src={logoUltrarobots} style={{ height: 15, width: 'auto', marginRight: 8 }} />
          ) : (
            <Text style={styles.footerText}>ULTRAROBOTS.AI        </Text>
          )}
          
          <Text style={styles.footerText}>TITAN 4.5 PROTOCOL EMBEDED      CORE  DESIGNED  BY</Text>
          
          {logoDigitalEngineered ? (
            <Image src={logoDigitalEngineered} style={{ height: 25, width: 'auto', marginLeft: 10, marginRight: 10 }} />
          ) : (
            <Text style={styles.footerText}>     DIGITALENGINEERED.AI     </Text>
          )}
          
          <Text style={styles.footerText}>ALL RIGHT RESERVED</Text>
        </View>
      </View>
    </Page>
  </Document>
  );
};

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
    viaggio: { destinazione: 'N/D', km: 'N/D', costoKm: 'N/D', pedaggio: 'N/D' },
    vitto: 'N/D',
    pernottamento: 'N/D',
    varie: '4 viti',
  },
  trascrizione: 'Fatto in Barilla abbiamo sostituito 10 motori, 2 encoder, 4 inverter, tutte le cinghie dei trascinatori, eccetera eccetera. Siamo stati li 2 giorni e bisogna fargli pagare 2 pernottamenti 4 viti e I chilometri andata e ritorno. Ciao',
};

export default ReportPDF;
