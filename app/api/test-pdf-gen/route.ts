import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import ReportPDF, { ReportData } from '@/components/reports/ReportPDF';
import { LOGOS } from '@/lib/pdf-logos-base64';
import fs from 'fs';
import path from 'path';
import React from 'react';

export const dynamic = 'force-dynamic';

const LONG_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ' + 
                  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.';

const stressData: ReportData = {
  id: 'STRESS-TEST-FULL-1234567890-ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  date: '31/12/2099, 23:59:59 (DATA ESTESA)',
  cliente: {
    azienda: 'AZIENDA SPA LUNGHISSIMA RAGIONE SOCIALE CON MOLTI CARATTERI PER TESTARE IL WRAPPING SU PIÙ RIGHE E VEDERE SE SI ROMPE IL LAYOUT O SE VIENE TRONCATO CORRETTAMENTE NELLA CELLA DEDICATA CHE HA UNO SPAZIO LIMITATO',
    referente: 'DOTT. ING. REFERENTE MOLTO LUNGO CON TITOLI NOBILIARI E ACCADEMICI CHE NON FINISCONO MAI',
    sede: 'SEDE LEGALE E OPERATIVA DI TEST IN UNA LOCALITÀ DAL NOME ESTREMAMENTE LUNGO E COMPLESSO',
    indirizzo: 'VIA DELLA PRODUZIONE INFINITA 12345, ZONA INDUSTRIALE NORD OVEST CAPANNONE 44, INTERNO 88, SCALA B, PIANO TERRA RIALZATO',
    citta: '20100 MILANO (MI) - LOMBARDIA - ITALIA - EUROPA - PIANETA TERRA - SISTEMA SOLARE',
    piva: 'IT12345678901234567890 (P.IVA LUNGA)',
    telefono: '+39 02 12345678 - CELL: +39 333 999888777 (DOPPIO NUMERO)',
    email: 'amministrazione.contabilita.lunga@aziendalitestmoltolungaedifficiledaimpaginare.com'
  },
  intervento: {
    tipologia: 'TIPOLOGIA INTERVENTO ESTREMAMENTE DETTAGLIATA E SPECIFICA CHE DESCRIVE OGNI SINGOLA AZIONE INTRAPRESA DURANTE LA MANUTENZIONE PREVENTIVA E CORRETTIVA DEL SISTEMA ROBOTICO AVANZATO',
    statoFinale: 'COMPLETATO CON RISERVA E NECESSITÀ DI ULTERIORI VERIFICHE POST-OPERATIVE IMMEDIATE',
    descrizione: 'DESCRIZIONE ESTESA DELL\'INTERVENTO: ' + LONG_TEXT + ' ' + LONG_TEXT, // Very long text to test truncation/overflow
  },
  componenti: Array(8).fill(null).map((_, i) => ({
      quantita: `99${i}`,
      descrizione: `COMPONENTE-${i} DESCRIZIONE MOLTO LUNGA E DETTAGLIATA`, // Should be truncated
      brand: `BRAND-${i}-LONG`, // Should be truncated
      codice: `CODICE-${i}-XYZ-1234567890-LUNGO` // Should be truncated
  })),
  noteCritiche: 'NOTE CRITICHE ESTESE E DETTAGLIATE RIGUARDANTI PROBLEMATICHE DI SICUREZZA, MANUTENZIONE E OPERATIVITÀ RISCONTRATE DURANTE L\'INTERVENTO CHE RICHIEDONO ATTENZIONE IMMEDIATA DA PARTE DEL SUPERVISORE. ' + LONG_TEXT,
  spese: {
      viaggio: {
          km: '999.999 km A/R (DISTANZA ESTREMA)',
          costoKm: '€999.999,99',
          pedaggio: '€88.888,88 (PEDAGGIO)'
      },
      vitto: {
          pranzoPosto: 'Ristorante "Da Mario il Lungo" Specialità Pesce e Carne con Nome Chilometrico',
          pranzoImporto: '€12.345,67',
          cenaPosto: 'Grand Hotel Ristorante Stellato "La Luna nel Pozzo" con Menu Degustazione Infinito',
          cenaImporto: '€23.456,78'
      },
      pernottamento: {
          nomeHotel: 'Grand Hotel Resort & Spa "La Dolce Vita" Luxury Collection 5 Stelle Superior Lusso',
          numeroNotti: '999 (NOTTI)',
          importo: '€345.678,90'
      },
      varie: Array(4).fill(null).map((_, i) => ({
          descrizione: `SPESA EXTRA ${i}: ACQUISTO MATERIALE DI CONSUMO URGENTE E COSTOSO CON DESCRIZIONE DETTAGLIATA`,
          importo: '€9.999,99'
      }))
  },
  trascrizione: 'TRASCRIZIONE VOCALE COMPLETA E NON EDITATA DEL REPORT: ' + LONG_TEXT + ' ' + LONG_TEXT
};

const emptyData: ReportData = {
  id: 'EMPTY-TEST-0000',
  date: '01/01/2000, 00:00:00',
  cliente: {
    azienda: '',
    referente: '',
    sede: '',
    indirizzo: '',
    citta: '',
    piva: '',
    telefono: '',
    email: ''
  },
  intervento: {
    tipologia: '',
    statoFinale: '',
    descrizione: '',
  },
  componenti: [],
  noteCritiche: '',
  spese: {
    viaggio: {
      km: '',
      costoKm: '',
      pedaggio: '',
    },
    vitto: {
      pranzoPosto: '',
      pranzoImporto: '',
      cenaPosto: '',
      cenaImporto: '',
    },
    pernottamento: {
      nomeHotel: '',
      numeroNotti: '',
      importo: '',
    },
    varie: [],
  },
  trascrizione: '',
};

export async function GET() {
  try {
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
    if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
    }

    // Generate Empty Report
    const emptyElement = React.createElement(ReportPDF, { 
      data: emptyData,
      logoUltrarobots: LOGOS.ultrarobots,
      logoDigitalEngineered: LOGOS.digitalengineered
    });
    const emptyBuffer = await renderToBuffer(emptyElement as React.ReactElement);
    fs.writeFileSync(path.join(downloadsDir, 'report-empty.pdf'), emptyBuffer);

    // Generate Stress Report
    console.log('Generating Stress Report...');
    console.log('Logo UR length:', LOGOS.ultrarobots?.length);
    console.log('Logo DE length:', LOGOS.digitalengineered?.length);
    
    const stressElement = React.createElement(ReportPDF, {  
      data: stressData,
      logoUltrarobots: LOGOS.ultrarobots,
      logoDigitalEngineered: LOGOS.digitalengineered
    });
    const stressBuffer = await renderToBuffer(stressElement as React.ReactElement);
    fs.writeFileSync(path.join(downloadsDir, 'report-stress.pdf'), stressBuffer);

    return NextResponse.json({
      success: true,
      message: 'PDFs generated successfully',
      files: [
        '/downloads/report-empty.pdf',
        '/downloads/report-stress.pdf'
      ]
    });

  } catch (error) {
    console.error('Test PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate test PDFs', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

