import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import ReportPDF, { ReportData } from '../components/reports/ReportPDF';

// Stress test data: tutti i campi pieni/lunghi per verificare troncamenti e layout
const stressData: ReportData = {
  id: 'STRESS-TEST-1234567890',
  date: '31/12/2099, 23:59:59',
  cliente: {
    // 160+ caratteri (10 in più di 150)
    azienda:
      'AZIENDA-1234567890-ABCDEFGHIJ-AZIONE-LUNGHISSIMA-RAGIONE-SOCIALE-INDIRIZZO-999-PIANO-8-PRESSO-XYZ-COMPLESSO-INDUSTRIALE-GIGANTE-AAA',
    referente: 'REFERENTE-LUNGHISSIMO-1234567890', // 35+ caratteri
    sede: 'SEDE-99999-MEGA-DISTRETTO-AREA-OPERATIVA', // aggiunge lunghezza alla stringa azienda+sede
  },
  intervento: {
    // 160+ caratteri (10 in più di 150)
    tipologia:
      'TIPOLOGIA-1234567890-ABCDEFGH-INTERVENTO-MOLTO-LUNGO-COMPLETO-CON-DETTAGLI-ESTESI-E-REQUISITI-OPERATIVI-E-VALIDAZIONI-MULTIPLE-EXTRA',
    statoFinale: 'STATO-FINALE-VALIDATO-12345', // 25+ caratteri
    descrizione:
      // 470+ caratteri (10 in più di 460)
      'DESCRIZIONE-START-' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.-END',
  },
  componenti: [
    { quantita: '1234', descrizione: 'DescrizioneComp01XYZ', brand: 'BrandLONG1', codice: 'CODICE-1234567890' },
    { quantita: '5678', descrizione: 'DescrizioneComp02XYZ', brand: 'BrandLONG2', codice: 'CODICE-ABCDEFGHJK' },
    { quantita: '9999', descrizione: 'DescrizioneComp03XYZ', brand: 'BrandLONG3', codice: 'CODICE-ABCDEFGHIJ' },
    { quantita: '0000', descrizione: 'DescrizioneComp04XYZ', brand: 'BrandLONG4', codice: 'CODICE-XYZ1234567' },
    { quantita: '3210', descrizione: 'DescrizioneComp05XYZ', brand: 'BrandLONG5', codice: 'CODICE-LUNGHISSIMO' },
    { quantita: '8888', descrizione: 'DescrizioneComp06XYZ', brand: 'BrandLONG6', codice: 'CODICE-EXTRA-LONG' },
    { quantita: '7777', descrizione: 'DescrizioneComp07XYZ', brand: 'BrandLONG7', codice: 'CODICE-EXTRA1234' },
    { quantita: '6666', descrizione: 'DescrizioneComp08XYZ', brand: 'BrandLONG8', codice: 'CODICE-EXTRA5678' },
  ],
  noteCritiche:
    // 470+ caratteri
    'NOTE-START-' +
    'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. ' +
    'Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. ' +
    'Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. ' +
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis.-END',
  spese: {
    viaggio: {
      km: '12345678901234567890 km', // lasciato lungo per verificare troncamento ma escluso dai 24
      costoKm: '€99999,99',
      pedaggio: '€88888,88',
    },
    vitto: {
      pranzoPosto: 'PRANZO-POSTO-LUNGHISSIMO-1234567890', // 34+ caratteri
      pranzoImporto: '€12345,67',
      cenaPosto: 'CENA-POSTO-LUNGHISSIMO-1234567890', // 34+ caratteri
      cenaImporto: '€23456,78',
    },
    pernottamento: {
      nomeHotel: 'HOTEL-LUNGHISSIMO-1234567890-ABCD', // >24
      numeroNotti: '12345678901234567890', // lungo
      importo: '€34567,89',
    },
    varie: [
      { descrizione: 'VARIA-UNO-LUNGHISSIMA-1234567890', importo: '€45678,90' },
      { descrizione: 'VARIA-DUE-LUNGHISSIMA-1234567890', importo: '€56789,01' },
      { descrizione: 'VARIA-TRE-LUNGHISSIMA-1234567890', importo: '€67890,12' },
      { descrizione: 'VARIA-QUATTRO-LUNGHISSIMA-1234567890', importo: '€78901,23' },
    ],
  },
  trascrizione:
    // 470+ caratteri
    'TRASC-START-' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.-END',
};

async function main() {
  const buffer = await renderToBuffer(<ReportPDF data={stressData} />);
  const outPath = path.join(process.cwd(), 'public', 'downloads', 'report-stress-test.pdf');
  fs.writeFileSync(outPath, buffer);
  console.log('PDF generato:', outPath);
}

main().catch((err) => {
  console.error('Errore generazione PDF di stress:', err);
  process.exit(1);
});

