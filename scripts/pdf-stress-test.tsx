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
    'Comp01XYZ (1234x BrandLONG1 CODICE-1234567890)',
    'Comp02XYZ (5678x BrandLONG2 CODICE-ABCDEFGHJK)',
    'Comp03XYZ (9999x BrandLONG3 CODICE-ABCDEFGHIJ)',
    'Comp04XYZ (0000x BrandLONG4 CODICE-XYZ1234567)',
    'Comp05XYZ (3210x BrandLONG5 CODICE-LUNGHISSIMO)',
    'Comp06XYZ (8888x BrandLONG6 CODICE-EXTRA-LONG)',
    'Comp07XYZ (7777x BrandLONG7 CODICE-EXTRA1234)',
    'Comp08XYZ (6666x BrandLONG8 CODICE-EXTRA5678)',
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
      destinazione: 'Destinazione molto lunga per test',
      km: '12345678901234567890 km', // lasciato lungo per verificare troncamento ma escluso dai 24
      costoKm: '€99999,99',
      pedaggio: '€88888,88',
    },
    vitto: 'Pranzo: PRANZO-POSTO-LUNGHISSIMO (€12345,67) | Cena: CENA-POSTO-LUNGHISSIMO (€23456,78)',
    pernottamento: 'HOTEL-LUNGHISSIMO-1234567890-ABCD - 12345678901234567890 notti (€34567,89)',
    varie: 'VARIA-UNO: €45678,90 | VARIA-DUE: €56789,01 | VARIA-TRE: €67890,12 | VARIA-QUATTRO: €78901,23',
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

