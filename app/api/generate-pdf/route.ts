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
    let vitto: VittoObj;

    if (typeof vittoRaw === 'object' && vittoRaw !== null && !Array.isArray(vittoRaw)) {
        // È già un oggetto strutturato (nuovo formato)
        vitto = {
            pranzoPosto: (vittoRaw as any).pranzoPosto || '',
            pranzoImporto: (vittoRaw as any).pranzoImporto || '',
            cenaPosto: (vittoRaw as any).cenaPosto || '',
            cenaImporto: (vittoRaw as any).cenaImporto || ''
        };
    } else {
        // Fallback per vecchi dati o stringhe
        vitto = {
            pranzoPosto: '',
            pranzoImporto: '',
            cenaPosto: '',
            cenaImporto: ''
        };
    }

    const pernoRaw = reportData.spese?.pernottamento;
    let pernottamento: PernottamentoObj;

    if (typeof pernoRaw === 'object' && pernoRaw !== null && !Array.isArray(pernoRaw)) {
         // È già un oggetto strutturato
        pernottamento = {
            nomeHotel: (pernoRaw as any).nomeHotel || '',
            numeroNotti: (pernoRaw as any).numeroNotti || '',
            importo: (pernoRaw as any).importo || ''
        };
    } else {
        pernottamento = {
            nomeHotel: '',
            numeroNotti: '',
            importo: ''
        };
    }

    const varieRaw = reportData.spese?.varie;
    // Gestione Varie: assicuriamoci che sia un array di oggetti {descrizione, importo}
    let varie: { descrizione: string; importo: string }[] = [];
    
    if (Array.isArray(varieRaw)) {
        varie = varieRaw.map(v => ({
            descrizione: v.descrizione || '',
            importo: v.importo || ''
        }));
    } else if (typeof varieRaw === 'string' && varieRaw) {
        // Se arriva come stringa, prova a metterla nel primo elemento
        varie = [{ descrizione: varieRaw, importo: '' }];
    }

    const completeData: ReportData = {
      id: reportData.id || '',
      date: reportData.date || new Date().toLocaleString('it-IT'),
      cliente: {
        azienda: reportData.cliente?.azienda || '',
        referente: reportData.cliente?.referente || '',
        sede: reportData.cliente?.sede || '',
        indirizzo: (reportData.cliente as any)?.indirizzo || '',
        citta: (reportData.cliente as any)?.citta || '',
        piva: (reportData.cliente as any)?.piva || '',
        telefono: (reportData.cliente as any)?.telefono || '',
        email: (reportData.cliente as any)?.email || '',
      },
      intervento: {
        tipologia: reportData.intervento?.tipologia || '',
        statoFinale: reportData.intervento?.statoFinale || '',
        descrizione: reportData.intervento?.descrizione || '',
      },
      componenti: (reportData.componenti || []).map((c: any) => ({
        quantita: c.quantita || '',
        descrizione: c.descrizione || '',
        brand: c.brand || '',
        codice: c.codice || ''
      })),
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

















