import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

/**
 * ⚠️⚠️⚠️ ISTRUZIONI DEFINITIVE PER GPT - COMPILAZIONE PDF RAPPORTO INTERVENTO ⚠️⚠️⚠️
 * 
 * Vedi istruzioni complete in: components/reports/ReportPDF.tsx
 * 
 * 📋 RIEPILOGO RAPIDO LIMITI:
 * 
 * - AZIENDA: max 150 caratteri (~25 per riga, 6 righe)
 * - TIPOLOGIA: max 150 caratteri (~25 per riga, 6 righe)
 * - REFERENTE: max 25 caratteri (1 riga)
 * - STATO FINALE: max 25 caratteri (1 riga)
 * - DESCRIZIONE ATTIVITÀ: max 460 caratteri (6 righe)
 * - COMPONENTI descrizione: max 15 caratteri (1-2 PAROLE!)
 * - COMPONENTI quantità: max 3 caratteri
 * - COMPONENTI brand: max 8 caratteri
 * - COMPONENTI codice: max 12 caratteri
 * - COMPONENTI max 8 totali (4 SX + 4 DX)
 * - NOTE CRITICHE: max 460 caratteri (6 righe)
 * - TRASCRIZIONE: max 460 caratteri (6 righe)
 * 
 * SPESE:
 * - Formato importi: xxxx,xx € (virgola, € DOPO)
 * - Km: calcolo automatico A/R × 0,8€/km
 * - Default pranzo: [15,00 €] se non dichiarato
 * - Default cena: [35,00 €] se non dichiarato
 * - Default pernotto: [80,00 €] per notte se non dichiarato
 * - Parentesi quadre [] SOLO per valori ipotizzati
 * - "N/D" SOLO se spesa non fatta
 */

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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const rData = data.reportData || {}; 

    // Costanti pagina
    const MARGIN = 40;
    const PAGE_WIDTH = 595.28;
    const PAGE_HEIGHT = 841.89;
    const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
    const HEADER_HEIGHT = 100;
    const FOOTER_HEIGHT = 60;
    const CONTENT_START = MARGIN + HEADER_HEIGHT;
    const CONTENT_END = PAGE_HEIGHT - FOOTER_HEIGHT;

    const doc = new PDFDocument({
      size: 'A4',
      margin: 0,
      autoFirstPage: false
    });
    
    doc.addPage();
    const docOptions = doc.options as PDFKit.PDFDocumentOptions & { autoPageBreak?: boolean };
    docOptions.autoPageBreak = false;

    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));

    // --- HEADER FISSO ---
    doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT)
       .fill('#FFFFFF')
       .stroke('#CCCCCC');
    
    // Logo ULTRAROBOTS (sinistra)
    try {
      const logoPath = path.join(process.cwd(), 'public', 'assets', 'SVG_PNG', 'logo-wordmark-black-cyan.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, MARGIN, 20, { width: 120 });
      }
    } catch (e) {
      console.error('Logo non caricato:', e);
    }
    
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#333333');
    doc.text('RAPPORTO INTERVENTO', MARGIN, 55);
    
    doc.fontSize(10).font('Helvetica').fillColor('#666666');
    doc.text('TITAN PROTOCOL v4.5', MARGIN, 75);
    
    // ID e DATA a destra
    const rightX = PAGE_WIDTH - MARGIN;
    doc.fontSize(9).font('Helvetica-Bold').fillColor('#333333');
    const idText = `ID: ${rData.id || rData.unitId || ''}`;
    doc.text(idText, rightX - doc.widthOfString(idText), 55);
    const dataText = `DATA: ${new Date().toLocaleDateString('it-IT')}`;
    doc.text(dataText, rightX - doc.widthOfString(dataText), 75);

    // --- CONTENUTO ---
    let y = CONTENT_START + 10;

    // 1. DATI CLIENTE
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
    doc.text('1. DATI CLIENTE', MARGIN, y);
    y += 20;
    
    doc.fontSize(9).font('Helvetica').fillColor('#333333');
    doc.text(`Azienda: ${rData.cliente?.azienda || rData.client || ''}`, MARGIN + 10, y);
    y += 15;
    doc.text(`Referente: ${rData.cliente?.referente || ''}`, MARGIN + 10, y);
    y += 15;
    doc.text(`Sede: ${rData.location || rData.cliente?.sede || ''}`, MARGIN + 10, y);
    y += 25;

    // 2. DETTAGLI INTERVENTO
    if (y < CONTENT_END - 100) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('2. DETTAGLI INTERVENTO', MARGIN, y);
      y += 20;
      
      doc.fontSize(9).font('Helvetica').fillColor('#333333');
      doc.text(`Tipologia: ${rData.intervento?.tipo || rData.reportType || ''}`, MARGIN + 10, y);
      y += 15;
      doc.text(`Stato: ${rData.intervento?.stato || rData.status || 'COMPLETATO'}`, MARGIN + 10, y);
      y += 20;
      
      const desc = rData.intervento?.descrizione || rData.summary || rData.description || '';
      if (desc && y < CONTENT_END - 50) {
        doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000');
        doc.text('Descrizione:', MARGIN + 10, y);
        y += 15;
        doc.fontSize(8).font('Helvetica').fillColor('#333333');
        const descHeight = Math.min(60, CONTENT_END - y - 20);
        doc.text(desc, MARGIN + 10, y, { width: CONTENT_WIDTH - 20, height: descHeight, ellipsis: true });
        y += descHeight + 15;
      }
      y += 10;
    }

    // 3. COMPONENTI
    if (rData.intervento?.componenti && Array.isArray(rData.intervento.componenti) && rData.intervento.componenti.length > 0 && y < CONTENT_END - 50) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('3. COMPONENTI', MARGIN, y);
      y += 20;
      
      doc.fontSize(9).font('Helvetica').fillColor('#333333');
      rData.intervento.componenti.slice(0, 5).forEach((comp: unknown) => {
        if (y < CONTENT_END - 30) {
          doc.text(`• ${String(comp)}`, MARGIN + 10, y);
          y += 15;
        }
      });
      y += 10;
    }

    // 4. NOTE CRITICHE
    if (y < CONTENT_END - 50) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('4. NOTE CRITICHE', MARGIN, y);
      y += 20;
      
      doc.fontSize(9).font('Helvetica').fillColor('#333333');
      const noteText = rData.noteCritiche || 'Nessuna criticità rilevata.';
      const noteHeight = Math.min(40, CONTENT_END - y - 20);
      doc.text(noteText, MARGIN + 10, y, { width: CONTENT_WIDTH - 20, height: noteHeight, ellipsis: true });
      y += noteHeight + 15;
    }

    // 5. SPESE
    if (y < CONTENT_END - 50) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('5. SPESE DI TRASFERTA', MARGIN, y);
      y += 20;
      
      doc.fontSize(9).font('Helvetica').fillColor('#333333');
      doc.text(`Viaggio: ${rData.spese?.viaggio?.costo || '0'}€`, MARGIN + 10, y);
      y += 15;
      doc.text(`Vitto: ${rData.spese?.vitto || '0'}€`, MARGIN + 10, y);
      y += 15;
      doc.text(`Pernottamento: ${rData.spese?.pernottamento || '0'}€`, MARGIN + 10, y);
      y += 15;
      doc.text(`Varie: ${rData.spese?.varie || '0'}€`, MARGIN + 10, y);
      y += 15;
    }

    // TRASCRIZIONE (se c'è spazio)
    if (y < CONTENT_END - 40) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000');
      doc.text('TRASCRIZIONE ORIGINALE', MARGIN, y);
      y += 20;
      
      const transcript = rData.transcript || 'Nessuna trascrizione disponibile.';
      const transcriptHeight = Math.max(30, CONTENT_END - y - 20);
      doc.fontSize(8).font('Courier').fillColor('#333333');
      doc.text(transcript, MARGIN + 10, y, { width: CONTENT_WIDTH - 20, height: transcriptHeight, ellipsis: true });
    }

    // --- FOOTER FISSO ---
    const footerY = PAGE_HEIGHT - FOOTER_HEIGHT;
    doc.rect(0, footerY, PAGE_WIDTH, FOOTER_HEIGHT)
       .fill('#FFFFFF')
       .stroke('#CCCCCC');
    
    doc.moveTo(MARGIN, footerY + 15)
       .lineTo(PAGE_WIDTH - MARGIN, footerY + 15)
       .strokeColor('#CCCCCC')
       .lineWidth(1)
       .stroke();
    
    // Logo DigitalEngineered nel footer
    try {
      const deLogoPath = path.join(process.cwd(), 'public', 'assets', 'SVG_PNG', 'digitalengineered.wordmark-black.png');
      if (fs.existsSync(deLogoPath)) {
        const logoWidth = 100;
        doc.image(deLogoPath, (PAGE_WIDTH - logoWidth) / 2, footerY + 22, { width: logoWidth });
      }
    } catch (e) {
      console.error('Logo footer non caricato:', e);
      doc.fontSize(8).font('Helvetica-Bold').fillColor('#000000');
      const footerText1 = 'DIGITALENGINEERED.AI';
      doc.text(footerText1, (PAGE_WIDTH - doc.widthOfString(footerText1)) / 2, footerY + 25);
    }
    
    doc.fontSize(7).font('Courier').fillColor('#666666');
    const footerText2 = '[ ULTRAROBOTS :: NEURAL SYSTEM ]';
    doc.text(footerText2, (PAGE_WIDTH - doc.widthOfString(footerText2)) / 2, footerY + 45);

    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${rData.id || 'export'}-${Date.now()}.pdf"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
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
