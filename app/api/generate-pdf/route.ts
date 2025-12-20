import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

// Force dynamic to prevent static optimization issues
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log("GENERATING PDF V4 - SINGLE PAGE ENFORCED");
    const data = await request.json();
    const rData = data.reportData || {}; 

    // Constants - SINGLE PAGE ONLY
    const MARGIN = 40;
    const PAGE_WIDTH = 595.28; // A4 width
    const PAGE_HEIGHT = 841.89; // A4 height
    const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
    const FOOTER_HEIGHT = 60;
    const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - MARGIN - FOOTER_HEIGHT; // Total usable height

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
    (doc.options as any).autoPageBreak = false; // NO PAGE BREAKS - SINGLE PAGE ONLY

    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));

    let cursorY = MARGIN;

    // --- HEADER (Compact: Logo left, ID/DATA right) ---
    const headerStartY = cursorY;
    
    // LEFT SIDE: Logo SVG (drawn manually for PDF)
    const logoHeight = 20;
    const logoY = headerStartY;
    
    // Draw logo text manually (ULTR A i ROBOTS) - FINAL SPACING (matches Logo.tsx)
    // ⚠️ SPACING VALUES ARE FINAL - DO NOT MODIFY ⚠️
    doc.save();
    doc.fontSize(16).font('Helvetica-Bold').fillColor(COLORS.primary);
    doc.text('ULTR', MARGIN, logoY);
    
    // A stylized (simple triangle) - Spacing: ULTR → A = 52px equivalent
    const ultrWidth = doc.widthOfString('ULTR');
    const aX = MARGIN + ultrWidth + 4; // ~52px equivalent spacing
    doc.strokeColor(COLORS.accent).lineWidth(2.5);
    doc.moveTo(aX + 2, logoY + 16).lineTo(aX + 8, logoY + 2).lineTo(aX + 14, logoY + 16).stroke();
    doc.circle(aX + 8, logoY + 12, 1.2).fill(COLORS.accent);
    
    // i - Spacing: A → i = 20px equivalent
    doc.fontSize(16).font('Helvetica-Bold').fillColor(COLORS.accent);
    doc.text('i', aX + 18, logoY); // ~20px spacing
    
    // ROBOTS - Spacing: i → ROBOTS = 85px equivalent
    doc.fontSize(16).font('Helvetica-Bold').fillColor(COLORS.primary);
    const iX = aX + 18 + doc.widthOfString('i') + 2; // ~85px equivalent spacing
    doc.text('ROBOTS', iX, logoY);
    doc.restore();
    
    // RIGHT SIDE: ID and DATA aligned right
    const rightX = PAGE_WIDTH - MARGIN;
    doc.fontSize(8).font('Helvetica-Bold').fillColor(COLORS.secondary);
    const idText = `ID REPORT: ${rData.id || rData.unitId || 'N/D'}`;
    const idWidth = doc.widthOfString(idText);
    doc.text(idText, rightX - idWidth, logoY);
    
    const dataText = `DATA: ${new Date().toLocaleString('it-IT')}`;
    const dataWidth = doc.widthOfString(dataText);
    doc.text(dataText, rightX - dataWidth, logoY + 12);
    
    cursorY = headerStartY + logoHeight + 8;
    
    // Title and subtitle below logo
    doc.fillColor(COLORS.secondary)
       .fontSize(11)
       .font('Helvetica-Bold')
       .text('RAPPORTO INTERVENTO', MARGIN, cursorY);
    cursorY += 12;

    doc.fillColor(COLORS.secondary)
       .fontSize(8)
       .font('Helvetica')
       .text('TITAN PROTOCOL v4.5', MARGIN, cursorY);
    cursorY += 15;

    // Calculate remaining space for content sections
    const headerHeight = cursorY - MARGIN;
    const availableHeight = MAX_CONTENT_HEIGHT - headerHeight;
    const sectionSpacing = 10;

    // --- Helper for drawing compact tables ---
    function drawCompactTable(headers: { label: string, width: number }[], rows: any[][], sectionTitle: string): number {
      const titleHeight = 15;
      const headerRowHeight = 18;
      const dataRowHeight = 14;
      const totalHeight = titleHeight + headerRowHeight + (rows.length * dataRowHeight) + sectionSpacing;
      
      if (cursorY + totalHeight > PAGE_HEIGHT - FOOTER_HEIGHT) {
        return 0; // Skip if doesn't fit
      }

      // Section Title
      doc.fillColor(COLORS.primary)
         .fontSize(11)
         .font('Helvetica-Bold')
         .text(sectionTitle, MARGIN, cursorY);
      cursorY += titleHeight;

      // Draw Header Row
      doc.rect(MARGIN, cursorY, CONTENT_WIDTH, headerRowHeight)
         .fill(COLORS.headerBg)
         .stroke(COLORS.border);
      
      doc.fillColor(COLORS.primary)
         .fontSize(7)
         .font('Helvetica-Bold');
      
      let headerX = MARGIN;
      headers.forEach(header => {
        doc.text(header.label, headerX + 4, cursorY + 5, { width: header.width - 8, align: 'left' });
        headerX += header.width;
      });
      cursorY += headerRowHeight;

      // Draw Data Rows
      doc.fontSize(7).font('Helvetica');
      rows.forEach((row, i) => {
        doc.rect(MARGIN, cursorY, CONTENT_WIDTH, dataRowHeight)
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
            
            doc.text(cellValue, cellX + 4, cursorY + 3, { width: headers[j].width - 8, align: 'left', ellipsis: true });
            cellX += headers[j].width;
        });
        cursorY += dataRowHeight;
      });
      cursorY += sectionSpacing;
      return totalHeight;
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
    drawCompactTable(clientHeaders, clientRows, '1. DATI CLIENTE');

    // --- 2. DETTAGLI INTERVENTO ---
    const interventionHeaders = [
      { label: 'TIPOLOGIA', width: CONTENT_WIDTH / 2 },
      { label: 'STATO FINALE', width: CONTENT_WIDTH / 2 },
    ];
    const interventionRows = [[
      rData.intervento?.tipo || rData.reportType || 'N/D',
      rData.intervento?.stato || rData.status || 'COMPLETATO'
    ]];
    drawCompactTable(interventionHeaders, interventionRows, '2. DETTAGLI INTERVENTO');

    // Description (compact, max 3 lines)
    const descText = rData.intervento?.descrizione || rData.summary || rData.description;
    if (descText && cursorY < PAGE_HEIGHT - FOOTER_HEIGHT - 50) {
      doc.fillColor(COLORS.primary)
         .fontSize(9)
         .font('Helvetica-Bold')
         .text('DESCRIZIONE ATTIVITÀ', MARGIN, cursorY);
      cursorY += 12;
      
      const maxDescHeight = 30;
      doc.fillColor(COLORS.secondary)
         .fontSize(8)
         .font('Helvetica')
         .text(descText, MARGIN, cursorY, { width: CONTENT_WIDTH, height: maxDescHeight, ellipsis: true });
      cursorY += maxDescHeight + sectionSpacing;
    }

    // --- 3. COMPONENTI (compact list) ---
    if (rData.intervento?.componenti && Array.isArray(rData.intervento.componenti) && rData.intervento.componenti.length > 0) {
      if (cursorY < PAGE_HEIGHT - FOOTER_HEIGHT - 40) {
        doc.fillColor(COLORS.primary)
           .fontSize(11)
           .font('Helvetica-Bold')
           .text('3. COMPONENTI', MARGIN, cursorY);
        cursorY += 12;
        
        const maxComponents = Math.min(3, rData.intervento.componenti.length); // Max 3 items
        rData.intervento.componenti.slice(0, maxComponents).forEach((comp: any) => {
          if (cursorY < PAGE_HEIGHT - FOOTER_HEIGHT - 30) {
            doc.fillColor(COLORS.secondary)
               .fontSize(8)
               .font('Helvetica')
               .text(`• ${String(comp)}`, MARGIN + 8, cursorY);
            cursorY += 12;
          }
        });
        cursorY += sectionSpacing;
      }
    }

    // --- 4. NOTE CRITICHE (compact) ---
    if (cursorY < PAGE_HEIGHT - FOOTER_HEIGHT - 40) {
      doc.fillColor(COLORS.primary)
         .fontSize(11)
         .font('Helvetica-Bold')
         .text('4. NOTE CRITICHE', MARGIN, cursorY);
      cursorY += 12;
      
      const noteText = rData.noteCritiche || 'Nessuna criticità rilevata.';
      const maxNoteHeight = 25;
      doc.fillColor(COLORS.secondary)
         .fontSize(8)
         .font('Helvetica')
         .text(noteText, MARGIN, cursorY, { width: CONTENT_WIDTH, height: maxNoteHeight, ellipsis: true });
      cursorY += maxNoteHeight + sectionSpacing;
    }

    // --- 5. SPESE DI TRASFERTA ---
    const expensesHeaders = [
      { label: 'VIAGGIO (KM)', width: CONTENT_WIDTH / 4 },
      { label: 'VITTO', width: CONTENT_WIDTH / 4 },
      { label: 'PERNOTTO', width: CONTENT_WIDTH / 4 },
      { label: 'SPESE VARIE', width: CONTENT_WIDTH / 4 },
    ];
    
    const viaggioInfo = rData.spese?.viaggio 
        ? `Dest: ${rData.spese.viaggio.destinazione || 'N/D'}\nKM: ${rData.spese.viaggio.km || '0'}\n€: ${rData.spese.viaggio.costo || '0'}`
        : 'N/D';
        
    const expensesRows = [[
      viaggioInfo,
      `€: ${rData.spese?.vitto || '0'}`,
      `€: ${rData.spese?.pernottamento || '0'}`,
      String(rData.spese?.varie || rData.spese?.totale || '0')
    ]];
    
    drawCompactTable(expensesHeaders, expensesRows, '5. SPESE DI TRASFERTA');

    // --- TRASCRIZIONE ORIGINALE (Fits remaining space, always truncated) ---
    const footerTop = PAGE_HEIGHT - FOOTER_HEIGHT;
    const remainingSpace = footerTop - cursorY - 20; // 20px margin before footer
    
    if (remainingSpace > 30) {
       doc.fillColor(COLORS.primary)
          .fontSize(11)
          .font('Helvetica-Bold')
          .text('TRASCRIZIONE ORIGINALE', MARGIN, cursorY);
       cursorY += 12;

       const transcriptText = rData.transcript || 'Nessuna trascrizione disponibile.';
       const transcriptHeight = Math.max(30, Math.min(remainingSpace - 12, 100)); // Min 30px, max 100px
       
       doc.fillColor(COLORS.secondary)
          .fontSize(8)
          .font('Courier-Oblique')
          .text(transcriptText, MARGIN, cursorY, {
            width: CONTENT_WIDTH,
            height: transcriptHeight,
            ellipsis: true,
          });
    }

    // --- FOOTER (ALWAYS DRAWN LAST, FIXED POSITION) ---
    function drawFooter(doc: PDFKit.PDFDocument) {
      const footerTop = PAGE_HEIGHT - FOOTER_HEIGHT;
      const footerY = footerTop + 15;

      // 1. White rectangle to cover footer area
      doc.save();
      doc.rect(0, footerTop, PAGE_WIDTH, FOOTER_HEIGHT)
         .fill('#FFFFFF');
      doc.restore();

      // 2. Separator Line
      doc.save();
      doc.moveTo(MARGIN, footerY)
         .lineTo(PAGE_WIDTH - MARGIN, footerY)
         .strokeColor(COLORS.border)
         .lineWidth(1)
         .stroke();
      doc.restore();

      // 3. Footer Text 1 - centered
      doc.save();
      doc.fillColor(COLORS.primary)
         .fontSize(8)
         .font('Helvetica-Bold');
      const text1Y = footerY + 12;
      const text1Width = doc.widthOfString('DIGITALENGINEERED.AI');
      doc.text('DIGITALENGINEERED.AI', (PAGE_WIDTH - text1Width) / 2, text1Y);
      doc.restore();

      // 4. Footer Text 2 - centered
      doc.save();
      doc.fillColor(COLORS.secondary)
         .fontSize(8)
         .font('Courier');
      const text2Y = footerY + 25;
      const text2Width = doc.widthOfString('[ ULTRAROBOTS :: NEURAL SYSTEM ]');
      doc.text('[ ULTRAROBOTS :: NEURAL SYSTEM ]', (PAGE_WIDTH - text2Width) / 2, text2Y);
      doc.restore();
    }

    // Draw footer LAST - always at bottom
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
        'Content-Disposition': `attachment; filename="report-V4-${rData.id || 'export'}-${Date.now()}.pdf"`,
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
