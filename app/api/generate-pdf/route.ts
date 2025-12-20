import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

// Force dynamic to prevent static optimization issues
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log("GENERATING PDF V3 - FULL REWRITE");
    const data = await request.json();
    const rData = data.reportData || {}; 

    // Constants
    const MARGIN = 40;
    const PAGE_WIDTH = 595.28; // A4 width
    const PAGE_HEIGHT = 841.89; // A4 height
    const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
    const FOOTER_HEIGHT = 60;

    const COLORS = {
      primary: '#000000',
      secondary: '#333333',
      accent: '#00aaff',
      headerBg: '#F0F0F0',
      border: '#CCCCCC',
      background: '#FFFFFF',
    };

    const doc = new PDFDocument({
      size: 'A4',
      margin: MARGIN,
      autoFirstPage: false
    });
    
    doc.addPage();
    // Disable auto page break to manage layout manually
    (doc.options as any).autoPageBreak = false;

    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));

    let cursorY = MARGIN;

    // --- HEADER ---
    doc.fillColor(COLORS.primary)
       .fontSize(18)
       .font('Helvetica-Bold')
       .text('ULTR A IROBOTS', MARGIN, cursorY);
    cursorY += 25;

    doc.fillColor(COLORS.secondary)
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('RAPPORTO INTERVENTO', MARGIN, cursorY);
    cursorY += 20;

    doc.fillColor(COLORS.secondary)
       .fontSize(9)
       .font('Helvetica')
       .text('TITAN PROTOCOL v4.5', MARGIN, cursorY);
    cursorY += 30;

    doc.fillColor(COLORS.secondary)
       .fontSize(9)
       .font('Helvetica-Bold')
       .text(`ID REPORT: ${rData.id || rData.unitId || 'N/D'}`, MARGIN, cursorY);
    cursorY += 15;

    doc.fillColor(COLORS.secondary)
       .fontSize(9)
       .font('Helvetica-Bold')
       .text(`DATA: ${new Date().toLocaleString('it-IT')}`, MARGIN, cursorY);
    cursorY += 30;

    // --- Helper for drawing tables ---
    function drawTable(headers: { label: string, width: number }[], rows: any[][], startY: number, sectionTitle: string) {
      // Check for overflow
      if (cursorY > PAGE_HEIGHT - FOOTER_HEIGHT - 100) return startY; 

      // Section Title
      doc.fillColor(COLORS.primary)
         .fontSize(12)
         .font('Helvetica-Bold')
         .text(sectionTitle, MARGIN, startY);
      let currentY = startY + 20;

      // Draw Header Row
      doc.rect(MARGIN, currentY, CONTENT_WIDTH, 20)
         .fill(COLORS.headerBg)
         .stroke(COLORS.border);
      
      doc.fillColor(COLORS.primary)
         .fontSize(8)
         .font('Helvetica-Bold');
      
      let headerX = MARGIN;
      headers.forEach(header => {
        doc.text(header.label, headerX + 5, currentY + 7, { width: header.width - 10, align: 'left' });
        headerX += header.width;
      });
      currentY += 20;

      // Draw Data Rows
      doc.fontSize(8).font('Helvetica');
      rows.forEach((row, i) => {
        doc.rect(MARGIN, currentY, CONTENT_WIDTH, 15)
           .fill(i % 2 === 0 ? COLORS.background : '#FAFAFA')
           .stroke(COLORS.border);
        
        doc.fillColor(COLORS.primary);
        let cellX = MARGIN;
        row.forEach((cell, j) => {
            let cellValue = 'N/D';
            if (cell !== null && cell !== undefined) {
                if (typeof cell === 'object') cellValue = JSON.stringify(cell);
                else cellValue = String(cell);
            }
            
            doc.text(cellValue, cellX + 5, currentY + 4, { width: headers[j].width - 10, align: 'left', ellipsis: true });
            cellX += headers[j].width;
        });
        currentY += 15;
      });
      return currentY + 15; // Return new cursorY
    }

    // --- 1. DATI CLIENTE ---
    const clientHeaders = [
      { label: 'AZIENDA', width: CONTENT_WIDTH / 3 },
      { label: 'REFERENTE', width: CONTENT_WIDTH / 3 },
      { label: 'SEDE / LUOGO', width: CONTENT_WIDTH / 3 },
    ];
    const clientRows = [[
      rData.cliente?.azienda || rData.client || 'N/D',
      rData.cliente?.referente || 'N/D',
      rData.location || rData.cliente?.sede || 'N/D'
    ]];
    cursorY = drawTable(clientHeaders, clientRows, cursorY, '1. DATI CLIENTE');

    // --- 2. DETTAGLI INTERVENTO ---
    const interventionHeaders = [
      { label: 'TIPOLOGIA', width: CONTENT_WIDTH / 2 },
      { label: 'STATO FINALE', width: CONTENT_WIDTH / 2 },
    ];
    const interventionRows = [[
      rData.intervento?.tipo || rData.reportType || 'N/D',
      rData.intervento?.stato || rData.status || 'COMPLETATO'
    ]];
    cursorY = drawTable(interventionHeaders, interventionRows, cursorY, '2. DETTAGLI INTERVENTO');

    // Description
    const descText = rData.intervento?.descrizione || rData.summary || rData.description;
    if (descText) {
      if (cursorY < PAGE_HEIGHT - FOOTER_HEIGHT - 80) {
        doc.fillColor(COLORS.primary)
           .fontSize(10)
           .font('Helvetica-Bold')
           .text('DESCRIZIONE ATTIVITÀ', MARGIN, cursorY);
        cursorY += 15;
        
        doc.fillColor(COLORS.secondary)
           .fontSize(9)
           .font('Helvetica')
           .text(descText, MARGIN, cursorY, { width: CONTENT_WIDTH });
           
        cursorY += doc.heightOfString(descText, { width: CONTENT_WIDTH }) + 15;
      }
    }

    // --- 3. COMPONENTI ---
    if (rData.intervento?.componenti && Array.isArray(rData.intervento.componenti) && rData.intervento.componenti.length > 0) {
      if (cursorY < PAGE_HEIGHT - FOOTER_HEIGHT - 80) {
        doc.fillColor(COLORS.primary)
           .fontSize(12)
           .font('Helvetica-Bold')
           .text('3. COMPONENTI', MARGIN, cursorY);
        cursorY += 15;
        
        rData.intervento.componenti.forEach((comp: any) => {
          doc.fillColor(COLORS.secondary)
             .fontSize(9)
             .font('Helvetica')
             .text(`• ${String(comp)}`, MARGIN + 10, cursorY);
          cursorY += 15;
        });
        cursorY += 10;
      }
    }

    // --- 4. NOTE CRITICHE ---
    if (cursorY < PAGE_HEIGHT - FOOTER_HEIGHT - 80) {
      doc.fillColor(COLORS.primary)
         .fontSize(12)
         .font('Helvetica-Bold')
         .text('4. NOTE CRITICHE', MARGIN, cursorY);
      cursorY += 15;
      
      const noteText = rData.noteCritiche || 'Nessuna criticità rilevata.';
      doc.fillColor(COLORS.secondary)
         .fontSize(9)
         .font('Helvetica')
         .text(noteText, MARGIN, cursorY, { width: CONTENT_WIDTH });
      cursorY += doc.heightOfString(noteText, { width: CONTENT_WIDTH }) + 15;
    }

    // --- 5. SPESE DI TRASFERTA ---
    const expensesHeaders = [
      { label: 'VIAGGIO (KM)', width: CONTENT_WIDTH / 4 },
      { label: 'VITTO', width: CONTENT_WIDTH / 4 },
      { label: 'PERNOTTO', width: CONTENT_WIDTH / 4 },
      { label: 'SPESE VARIE', width: CONTENT_WIDTH / 4 },
    ];
    
    // Extract nested expense data safely
    const viaggioInfo = rData.spese?.viaggio 
        ? `Dest: ${rData.spese.viaggio.destinazione || 'N/D'}\nKM: ${rData.spese.viaggio.km || '0'}\n€: ${rData.spese.viaggio.costo || '0'}`
        : 'N/D';
        
    const expensesRows = [[
      viaggioInfo,
      `€: ${rData.spese?.vitto || '0'}`,
      `€: ${rData.spese?.pernottamento || '0'}`,
      String(rData.spese?.varie || rData.spese?.totale || '0')
    ]];
    
    cursorY = drawTable(expensesHeaders, expensesRows, cursorY, '5. SPESE DI TRASFERTA');

    // --- TRASCRIZIONE ORIGINALE ---
    if (cursorY < PAGE_HEIGHT - FOOTER_HEIGHT - 80) {
       doc.fillColor(COLORS.primary)
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('TRASCRIZIONE ORIGINALE', MARGIN, cursorY);
       cursorY += 15;

       // Calculate available height
       const footerTop = PAGE_HEIGHT - FOOTER_HEIGHT;
       const availableH = footerTop - cursorY - 10;

       if (availableH > 30) {
           doc.fillColor(COLORS.secondary)
              .fontSize(9)
              .font('Courier-Oblique')
              .text(rData.transcript || 'Nessuna trascrizione disponibile.', MARGIN, cursorY, {
                width: CONTENT_WIDTH,
                height: availableH,
                ellipsis: true,
              });
       }
    }

    // --- FOOTER ---
    function drawFooter(doc: PDFKit.PDFDocument) {
      const footerY = PAGE_HEIGHT - FOOTER_HEIGHT + 15;

      // 1. White rectangle to "erase" any overflow text in the footer area
      doc.rect(0, PAGE_HEIGHT - FOOTER_HEIGHT, PAGE_WIDTH, FOOTER_HEIGHT)
         .fill('#FFFFFF');

      // 2. Separator Line
      doc.moveTo(MARGIN, footerY)
         .lineTo(PAGE_WIDTH - MARGIN, footerY)
         .strokeColor(COLORS.border)
         .lineWidth(1)
         .stroke();

      // 3. Footer Text 1 (Bold, Black)
      doc.fillColor(COLORS.primary)
         .fontSize(8)
         .font('Helvetica-Bold')
         .text('DIGITALENGINEERED.AI', MARGIN, footerY + 12, { width: CONTENT_WIDTH, align: 'center' });

      // 4. Footer Text 2 (Monospace, Gray)
      doc.fillColor(COLORS.secondary)
         .fontSize(8)
         .font('Courier')
         .text('[ ULTRAROBOTS :: NEURAL SYSTEM ]', MARGIN, footerY + 25, { width: CONTENT_WIDTH, align: 'center' });
    }

    drawFooter(doc);
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
        'Content-Disposition': `attachment; filename="report-V3-${rData.id || 'export'}-${Date.now()}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
