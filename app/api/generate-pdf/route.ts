import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Configurazione documento PDF
    const MARGIN = 50;
    const PAGE_WIDTH = 595.28; // A4 width in points
    const PAGE_HEIGHT = 841.89; // A4 height in points
    const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
    const FOOTER_HEIGHT = 60;

    const COLORS = {
      primary: '#0066cc',
      secondary: '#333333',
      accent: '#00aaff',
      textLabel: '#555555',
      textValue: '#000000',
      border: '#dddddd',
      background: '#f9f9f9'
    };

    // Creazione documento PDF con controllo manuale della pagina
    const doc = new PDFDocument({ 
        size: 'A4', 
        margin: MARGIN,
        autoFirstPage: false // Manual page control
    });
    doc.addPage(); // Ensure one page is always added
    (doc.options as any).autoPageBreak = false; // Absolute enforcement

    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));

    // Header
    doc.fillColor(COLORS.primary)
       .fontSize(24)
       .font('Helvetica-Bold')
       .text('ULTRAROBOTS', MARGIN, MARGIN);

    doc.fillColor(COLORS.secondary)
       .fontSize(10)
       .font('Helvetica')
       .text('Advanced Robotics Report System', MARGIN, MARGIN + 30);

    doc.moveTo(MARGIN, MARGIN + 45)
       .lineTo(PAGE_WIDTH - MARGIN, MARGIN + 45)
       .strokeColor(COLORS.accent)
       .lineWidth(2)
       .stroke();

    let cursorY = MARGIN + 60;

    // Funzione per disegnare un campo
    function drawFieldBox(label: string, value: string, y: number, width: number = CONTENT_WIDTH) {
      doc.rect(MARGIN, y, width, 35)
         .fillAndStroke(COLORS.background, COLORS.border);
      
      doc.fillColor(COLORS.textLabel)
         .fontSize(8)
         .font('Helvetica-Bold')
         .text(label, MARGIN + 10, y + 5);
      
      doc.fillColor(COLORS.textValue)
         .fontSize(10)
         .font('Helvetica')
         .text(value, MARGIN + 10, y + 18, { width: width - 20, ellipsis: true });
      
      return y + 40;
    }

    // Funzione per disegnare textarea
    function drawTextAreaBox(label: string, value: string, y: number, height: number = 80) {
      doc.rect(MARGIN, y, CONTENT_WIDTH, height)
         .fillAndStroke(COLORS.background, COLORS.border);
      
      doc.fillColor(COLORS.textLabel)
         .fontSize(8)
         .font('Helvetica-Bold')
         .text(label, MARGIN + 10, y + 5);
      
      doc.fillColor(COLORS.textValue)
         .fontSize(9)
         .font('Courier')
         .text(value, MARGIN + 10, y + 20, { 
           width: CONTENT_WIDTH - 20, 
           height: height - 30,
           ellipsis: true 
         });
      
      return y + height + 5;
    }

    // Report Info Section
    doc.fillColor(COLORS.primary)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text('Report Information', MARGIN, cursorY);
    cursorY += 25;

    // Row 1: Unit ID e Timestamp
    const halfWidth = (CONTENT_WIDTH - 10) / 2;
    cursorY = drawFieldBox('Unit ID', data.reportData?.unitId || data.unitId || "N/A", cursorY, halfWidth);
    drawFieldBox('Timestamp', data.reportData?.timestamp || data.timestamp || new Date().toISOString(), cursorY - 40, halfWidth);

    // Row 2: Operator e Report Type
    cursorY = drawFieldBox('Operator', data.reportData?.operator || data.operator || "N/A", cursorY, halfWidth);
    drawFieldBox('Report Type', data.reportData?.reportType || data.reportType || "Voice Report", cursorY - 40, halfWidth);

    cursorY += 10;

    // Transcription Section
    doc.fillColor(COLORS.primary)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text('Voice Transcription', MARGIN, cursorY);
    cursorY += 25;

    // Calcolo altezza disponibile
    const availableH = PAGE_HEIGHT - cursorY - FOOTER_HEIGHT - 50; // Increased safety margin

    doc.rect(MARGIN, cursorY, CONTENT_WIDTH, availableH)
       .fillAndStroke(COLORS.background, COLORS.border);

    doc.fillColor(COLORS.textLabel)
       .fontSize(8)
       .font('Helvetica-Bold')
       .text('Transcript', MARGIN + 10, cursorY + 5);

    doc.fillColor(COLORS.textLabel).font('Courier-Oblique').text(
        data.reportData?.transcript || data.transcript || "N/A", 
        MARGIN + 10, 
        cursorY + 15, 
        { 
            width: CONTENT_WIDTH - 20, 
            height: Math.max(0, availableH - 20), // Ensure height is not negative
            ellipsis: true
        }
    );

    // Footer function
    function drawFooter(doc: PDFKit.PDFDocument, margin: number, contentWidth: number, pageHeight: number) {
      const footerY = pageHeight - FOOTER_HEIGHT + 10;
      
      doc.moveTo(margin, footerY)
         .lineTo(pageHeight - margin, footerY)
         .strokeColor(COLORS.border)
         .lineWidth(1)
         .stroke();

      doc.fillColor(COLORS.textLabel)
         .fontSize(8)
         .font('Helvetica')
         .text('ULTRAROBOTS - Advanced Robotics Report System', margin, footerY + 10);

      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, footerY + 25);
      doc.text('Page 1 of 1', pageHeight - margin - 60, footerY + 25);
    }

    drawFooter(doc, MARGIN, CONTENT_WIDTH, PAGE_HEIGHT); // Single footer

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
        'Content-Disposition': `attachment; filename="report-${data.reportData?.unitId || data.unitId || 'unknown'}-${Date.now()}.pdf"`,
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
