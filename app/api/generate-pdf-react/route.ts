import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import ReportPDF, { ReportData } from '@/components/reports/ReportPDF';
import React from 'react';

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
 * UTILIZZO:
 * 
 * POST /api/generate-pdf-react
 * Body: {
 *   reportData: {
 *     id: "251220-0310-87A8",
 *     date: "20/12/2025, 03:10:14",
 *     cliente: {
 *       azienda: "Barilla",
 *       referente: "N/D",
 *       sede: "N/D"
 *     },
 *     intervento: {
 *       tipologia: "Sostituzione componenti",
 *       statoFinale: "COMPLETATO",
 *       descrizione: "Descrizione dettagliata..."
 *     },
 *     componenti: ["motori", "encoder", "inverter"],
 *     noteCritiche: "Nessuna",
 *     spese: {
 *       viaggio: { destinazione: "Milano", km: "150", costo: "50" },
 *       vitto: "30",
 *       pernottamento: "80",
 *       varie: "4 viti"
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
    const completeData: ReportData = {
      id: reportData.id || 'N/D',
      date: reportData.date || new Date().toLocaleString('it-IT'),
      cliente: {
        azienda: reportData.cliente?.azienda || 'N/D',
        referente: reportData.cliente?.referente || 'N/D',
        sede: reportData.cliente?.sede || 'N/D',
      },
      intervento: {
        tipologia: reportData.intervento?.tipologia || 'N/D',
        statoFinale: reportData.intervento?.statoFinale || 'IN CORSO',
        descrizione: reportData.intervento?.descrizione || 'Nessuna descrizione disponibile',
      },
      componenti: reportData.componenti || [],
      noteCritiche: reportData.noteCritiche || 'Nessuna',
      spese: {
        viaggio: {
          destinazione: reportData.spese?.viaggio?.destinazione || 'N/D',
          km: reportData.spese?.viaggio?.km || 'N/D',
          costo: reportData.spese?.viaggio?.costo || 'N/D',
        },
        vitto: reportData.spese?.vitto || 'N/D',
        pernottamento: reportData.spese?.pernottamento || 'N/D',
        varie: reportData.spese?.varie || 'N/D',
      },
      trascrizione: reportData.trascrizione || 'Nessuna trascrizione disponibile',
    };

    // Genera il PDF usando @react-pdf/renderer
    const pdfBuffer = await renderToBuffer(
      React.createElement(ReportPDF, { data: completeData })
    );

    // Restituisce il PDF come response
    return new NextResponse(pdfBuffer, {
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












