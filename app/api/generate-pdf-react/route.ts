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
 * ⚠️⚠️⚠️ REGOLA FERREA - NON MODIFICARE MAI LA STRUTTURA PDF ⚠️⚠️⚠️
 * 
 * ❌ NON MODIFICARE MAI:
 * - Larghezze colonne tabelle
 * - fontSize (7, 7.5)
 * - padding (4, 5, 6)
 * - Layout generale
 * - Struttura ReportPDF.tsx
 * 
 * ✅ SE TESTO TROPPO LUNGO: SI TRONCA (numberOfLines limitato per OGNI sezione)
 * ✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!
 * 
 * LIMITI TESTO PER SEZIONE:
 * - AZIENDA/TIPOLOGIA: max 3 righe
 * - REFERENTE/STATO FINALE: max 1 riga
 * - DESCRIZIONE ATTIVITÀ: max 4 righe (circa 200 caratteri)
 * - COMPONENTI descrizioni: max 1 riga, MAX 15 caratteri (1-2 parole)
 * - NOTE CRITICHE: max 4 righe (circa 200 caratteri)
 * - SPESE: max 1 riga per cella
 * - TRASCRIZIONE: max 7 righe (circa 400 caratteri)
 * 
 * COMPONENTI - DESCRIZIONI DEVONO ESSERE BREVI (MAX 15 caratteri, 1-2 parole)
 * 
 * ✅ CORRETTO:
 * componenti: [
 *   { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' },
 *   { quantita: '2', descrizione: 'Encoder', brand: 'Heidenhain', codice: 'ERN420-1024' },
 *   { quantita: '8', descrizione: 'Fotocellula', brand: 'Sick', codice: 'WTB4-3P3161' },
 * ]
 * 
 * ❌ SBAGLIATO (verranno TRONCATE nel PDF):
 * componenti: [
 *   { descrizione: 'Motore elettrico trifase asincrono' },  // ❌ TROPPO LUNGO!
 *   { descrizione: 'Encoder incrementale rotativo' },       // ❌ TROPPO LUNGO!
 * ]
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - CALCOLO SPESE DI VIAGGIO ⚠️⚠️⚠️
 * Quando ricevi dati con chilometri, VERIFICA che il calcolo sia corretto:
 * - Importo Km = Km totali (andata + ritorno) × 0,8€/km
 * - Esempio: km: "150 km A/R" → costoKm deve essere "€120,00" (150 × 0,8)
 * - Se km contiene solo andata, moltiplica per 2 prima di calcolare
 * - Il campo "km" deve contenere il totale A/R (es: "150 km A/R")
 * - Il campo "costoKm" deve contenere l'importo calcolato (es: "€120,00")
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - SPESE DI VITTO ⚠️⚠️⚠️
 * Formato richiesto per vitto:
 * - pranzoPosto: nome ristorante/locale (es: "Trattoria del Borgo")
 * - pranzoImporto: formato "€XX,XX" (es: "€25,00")
 * - cenaPosto: nome ristorante/locale (es: "Hotel")
 * - cenaImporto: formato "€XX,XX" (es: "€30,00")
 * 
 * ⚠️⚠️⚠️ VALORI DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️
 * Se il tecnico NON menziona l'importo MA ha fatto pranzo/cena (dedotto dal contesto):
 * - pranzoImporto: "[€ 15,00]" (parentesi quadre = ipotizzato)
 * - cenaImporto: "[€ 30,00]" (parentesi quadre = ipotizzato)
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - SPESE DI PERNOTTAMENTO ⚠️⚠️⚠️
 * Formato richiesto per pernottamento:
 * - nomeHotel: nome hotel/albergo (es: "Hotel Centrale")
 * - numeroNotti: numero notti come stringa (es: "2", "1")
 * - importo: formato "€XX,XX" (es: "€160,00")
 * 
 * ⚠️⚠️⚠️ VALORE DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️
 * Se il tecnico NON menziona l'importo MA ha pernottato (dedotto dal contesto):
 * - Calcola "[€ 80,00]" per notte e moltiplica per il numero di notti
 * - Esempio: 1 notte → importo: "[€ 80,00]"
 * - Esempio: 2 notti → importo: "[€ 160,00]" (80 × 2)
 * - Se dice prezzo a notte: calcola totale (es. "€80/notte x 2 = € 160,00")
 * - Valore standard: €80/notte se non dichiarato
 * 
 * ⚠️ FORMATO IMPORTI:
 * - SEMPRE formato "€XX,XX" con virgola come separatore decimale
 * - Esempi: "€25,00", "€30,50", "€160,00"
 * - Senza parentesi "€XX,XX" = dichiarato dal tecnico
 * - Con parentesi "[€XX,XX]" = ipotizzato da GPT quando non dichiarato
 * 
 * ⚠️⚠️⚠️ REGOLA CRITICA - VISUALIZZAZIONE CONDIZIONALE CAMPI ⚠️⚠️⚠️
 * Nel PDF, alcuni campi vengono mostrati SOLO SE la riga superiore non è "N/D":
 * 
 * ✅ VITTO:
 * - pranzoPosto e cenaPosto vengono SEMPRE mostrati (anche se "N/D")
 * - Importo pranzo viene mostrato SOLO SE pranzoPosto !== 'N/D' (riga superiore)
 * - Importo cena viene mostrato SOLO SE cenaPosto !== 'N/D' (riga superiore)
 * - Se pranzoPosto o cenaPosto sono "N/D", gli importi NON vengono mostrati nel PDF
 * 
 * ✅ PERNOTTAMENTO:
 * - nomeHotel viene SEMPRE mostrato (anche se "N/D")
 * - Notti e Importo vengono mostrati SOLO SE nomeHotel !== 'N/D' (riga superiore)
 * - Se nomeHotel è "N/D", notti e importo NON vengono mostrati nel PDF
 * 
 * ✅ VIAGGIO:
 * - Km, Importo Km e Importo Pedaggio vengono mostrati SOLO SE i rispettivi campi !== 'N/D'
 * - Se sono "N/D", i campi rimangono vuoti nel PDF
 * 
 * ✅ VARIE:
 * - Mostra solo se esistono (varie[0], varie[1], varie[2], varie[3])
 * - Se non esistono, il campo rimane vuoto
 * 
 * UTILIZZO:
 * 
 * POST /api/generate-pdf-react
 * Body: {
 *   reportData: {
 *     id: "251220-0310-87A8",
 *     date: "20/12/2025, 03:10:14",
 *     cliente: { azienda: "Barilla", referente: "N/D", sede: "N/D" },
 *     intervento: {
 *       tipologia: "Sostituzione componenti",
 *       statoFinale: "COMPLETATO",
 *       descrizione: "Descrizione dettagliata..."
 *     },
 *     componenti: [
 *       { quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' }
 *     ],
 *     noteCritiche: "Nessuna",
 *     spese: {
 *       viaggio: { km: "150", costoKm: "€0.50", pedaggio: "€10.00" },
 *       vitto: { pranzoPosto: "Trattoria", pranzoImporto: "€25.00", cenaPosto: "Hotel", cenaImporto: "€30.00" },
 *       pernottamento: { nomeHotel: "Hotel Centrale", numeroNotti: "2", importo: "€160.00" },
 *       varie: [{ descrizione: "Materiale", importo: "€45.00" }]
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
          km: reportData.spese?.viaggio?.km || 'N/D',
          costoKm: reportData.spese?.viaggio?.costoKm || 'N/D',
          pedaggio: reportData.spese?.viaggio?.pedaggio || 'N/D',
        },
        // Gestisce sia oggetto che stringa (backward compatibility)
        vitto: typeof reportData.spese?.vitto === 'string' 
          ? reportData.spese.vitto 
          : {
              pranzoPosto: (reportData.spese?.vitto as any)?.pranzoPosto || 'N/D',
              pranzoImporto: (reportData.spese?.vitto as any)?.pranzoImporto || 'N/D',
              cenaPosto: (reportData.spese?.vitto as any)?.cenaPosto || 'N/D',
              cenaImporto: (reportData.spese?.vitto as any)?.cenaImporto || 'N/D',
            },
        // Gestisce sia oggetto che stringa (backward compatibility)
        pernottamento: typeof reportData.spese?.pernottamento === 'string'
          ? reportData.spese.pernottamento
          : {
              nomeHotel: (reportData.spese?.pernottamento as any)?.nomeHotel || 'N/D',
              numeroNotti: (reportData.spese?.pernottamento as any)?.numeroNotti || 'N/D',
              importo: (reportData.spese?.pernottamento as any)?.importo || 'N/D',
            },
        // Gestisce sia array che stringa (backward compatibility)
        varie: Array.isArray(reportData.spese?.varie) 
          ? reportData.spese.varie 
          : (typeof reportData.spese?.varie === 'string' ? reportData.spese.varie : []),
      },
      trascrizione: reportData.trascrizione || 'Nessuna trascrizione disponibile',
    };

    // Genera il PDF usando @react-pdf/renderer
    const pdfBuffer = await renderToBuffer(
      React.createElement(ReportPDF, { data: completeData }) as any
    );

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

















