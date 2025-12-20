import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export const runtime = 'nodejs';

// ... (Interface e costanti rimangono uguali, le ometto per brevità ma nel file ci saranno) ...
interface PdfRequest {
  unitId: string;
  reportType: string;
  reportData?: any;
}

const COLORS = {
    bg: '#ffffff',
    textMain: '#111111',
    textSec: '#444444',
    textLabel: '#666666',
    border: '#cccccc',
    fillLight: '#f5f5f5',
    fillDark: '#e5e5e5'
};

function generateReportId() {
  const now = new Date();
  const datePart = now.toISOString().slice(2, 10).replace(/-/g, '');
  const timePart = now.toTimeString().slice(0, 5).replace(/:/g, '');
  const randomPart = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `${datePart}-${timePart}-${randomPart}`;
}

// ... (drawFieldBox, drawTextAreaBox, drawSectionTitle, drawLogo rimangono uguali) ...
function drawFieldBox(doc: PDFKit.PDFDocument, label: string, value: string, x: number, y: number, w: number, h: number, fontSize: number = 10) {
    doc.fontSize(7).font('Helvetica-Bold').fillColor(COLORS.textLabel).text(label.toUpperCase(), x, y - 10);
    doc.rect(x, y, w, h).fillAndStroke(COLORS.fillLight, COLORS.border);
    doc.fillColor(COLORS.textMain);
    doc.fontSize(fontSize).font('Helvetica').text(value, x + 5, y + (h/2) - (fontSize/2) - 2, {
        width: w - 10,
        height: h - 10,
        ellipsis: true
    });
}

function drawTextAreaBox(doc: PDFKit.PDFDocument, label: string, value: string, x: number, y: number, w: number, h: number) {
    doc.fontSize(7).font('Helvetica-Bold').fillColor(COLORS.textLabel).text(label.toUpperCase(), x, y - 10);
    doc.rect(x, y, w, h).fillAndStroke('#ffffff', COLORS.border); 
    doc.fillColor(COLORS.textMain);
    doc.fontSize(9).font('Helvetica').text(value, x + 8, y + 8, {
        width: w - 16,
        align: 'justify'
    });
}

function drawSectionTitle(doc: PDFKit.PDFDocument, number: string, title: string, x: number, y: number) {
    doc.fontSize(12).font('Helvetica-Bold').fillColor(COLORS.textMain).text(`${number}. ${title.toUpperCase()}`, x, y);
    doc.moveTo(x, y + 15).lineTo(550, y + 15).lineWidth(0.5).stroke(COLORS.border);
}

function drawLogo(doc: PDFKit.PDFDocument, x: number, y: number) {
    doc.save();
    doc.translate(x, y);
    
    // 1. ULTR
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#000000').text('ULTR', 0, 0);
    
    // 2. AI (Grafica)
    const aiX = 45;
    // A (Lambda)
    doc.lineWidth(2.5).strokeColor('#000000').lineCap('round').lineJoin('round');
    doc.moveTo(aiX, 14).lineTo(aiX + 6, 0).lineTo(aiX + 12, 14).stroke();
    // Dot dentro la A
    doc.circle(aiX + 6, 10, 1).fill('#000000');
    
    // I (Barra ridotta e alzata)
    doc.rect(aiX + 16, 2, 2.5, 10).fill('#000000');
    
    // 3. ROBOTS (Avvicinato)
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#000000').text('ROBOTS', aiX + 20, 0);
    
    doc.restore();
}

// Funzione helper per il footer
function drawFooter(doc: PDFKit.PDFDocument, margin: number, width: number, height: number) {
    const bottomY = height - 40;
    doc.save();
    doc.moveTo(margin, bottomY).lineTo(width + margin, bottomY).lineWidth(0.5).stroke(COLORS.border);
    
    // Pulisco area footer (rettangolo bianco)
    doc.rect(margin, bottomY + 1, width, 30).fill('#ffffff');
    
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#000').text(
        'DIGITALENGINEERED.AI',
        margin,
        bottomY + 10
    );

    doc.fontSize(8).font('Courier').fillColor(COLORS.textLabel).text(
        '[ ULTRAROBOTS :: NEURAL SYSTEM ]',
        margin,
        bottomY + 10,
        { align: 'right', width: width }
    );
    doc.restore();
}

async function buildPdfBase64(unitId: string, reportType: string, data: any) {
  const MARGIN = 40;
  // A4 size points: 595.28 x 841.89
  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;
  const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
  const FOOTER_HEIGHT = 50; // Spazio riservato
  
  const doc = new PDFDocument({ 
      size: 'A4', 
      margin: MARGIN,
      autoFirstPage: false // CONTROLLO MANUALE TOTALE
  });
  
  doc.addPage({
      margin: MARGIN,
      size: 'A4'
  });
  
  // DISABILITA AUTOPAGEBREAK DIRETTAMENTE SULL'ISTANZA
  (doc as any)._forceAutoPageBreak = false; // Hack interno se serve
  (doc.options as any).autoPageBreak = false; // Casting per evitare errore TS

  
  const chunks: Buffer[] = [];
  doc.on('data', (chunk) => chunks.push(chunk));

  const REPORT_ID = generateReportId();
  const aiData = data.reportData || {};
  const cliente = aiData.cliente || {};
  const intervento = aiData.intervento || {};
  const spese = aiData.spese || {};

  // --- 1. HEADER ---
  drawLogo(doc, MARGIN, 45);

  doc.fontSize(16).font('Helvetica-Bold').fillColor(COLORS.textMain).text('RAPPORTO INTERVENTO', 0, 45, { align: 'right', width: PAGE_WIDTH - MARGIN });
  doc.fontSize(8).font('Courier').fillColor(COLORS.textLabel).text('TITAN PROTOCOL v4.5', 0, 65, { align: 'right', width: PAGE_WIDTH - MARGIN });

  // --- 2. BARRA INFO ---
  const infoY = 85;
  doc.rect(MARGIN, infoY, CONTENT_WIDTH, 20).fill(COLORS.fillDark);
  
  doc.fillColor(COLORS.textSec).fontSize(8).font('Helvetica-Bold');
  doc.text('ID REPORT:', MARGIN + 10, infoY + 6);
  doc.font('Courier-Bold').text(REPORT_ID, MARGIN + 60, infoY + 6);
  
  doc.font('Helvetica-Bold').text('DATA:', MARGIN + 250, infoY + 6);
  doc.font('Courier').text(new Date().toLocaleString('it-IT'), MARGIN + 280, infoY + 6);

  // --- 3. SEZIONE CLIENTE ---
  let cursorY = infoY + 40;
  drawSectionTitle(doc, '1', 'DATI CLIENTE', MARGIN, cursorY);
  
  cursorY += 30;
  const colWidth = (CONTENT_WIDTH - 20) / 3;
  drawFieldBox(doc, 'Azienda', cliente.azienda || 'N/D', MARGIN, cursorY, colWidth, 25);
  drawFieldBox(doc, 'Referente', cliente.nome || 'N/D', MARGIN + colWidth + 10, cursorY, colWidth, 25);
  drawFieldBox(doc, 'Sede / Luogo', cliente.luogo || 'N/D', MARGIN + (colWidth + 10) * 2, cursorY, colWidth, 25);

  // --- 4. SEZIONE INTERVENTO ---
  cursorY += 50;
  drawSectionTitle(doc, '2', 'DETTAGLI INTERVENTO', MARGIN, cursorY);
  
  cursorY += 30;
  drawFieldBox(doc, 'Tipologia', intervento.tipo || 'Generico', MARGIN, cursorY, colWidth, 25);
  drawFieldBox(doc, 'Stato Finale', aiData.status || 'COMPLETATO', MARGIN + colWidth + 10, cursorY, colWidth, 25);
  
  cursorY += 40;
  drawTextAreaBox(doc, 'Descrizione Attività', intervento.descrizione || "Nessuna descrizione fornita.", MARGIN, cursorY, CONTENT_WIDTH, 50);

  // --- 5. COMPONENTI E CRITICITÀ ---
  cursorY += 70;
  const halfWidth = (CONTENT_WIDTH - 10) / 2;
  
  doc.fontSize(10).font('Helvetica-Bold').fillColor(COLORS.textMain).text('3. COMPONENTI', MARGIN, cursorY);
  doc.rect(MARGIN, cursorY + 15, halfWidth, 80).stroke(COLORS.border);
  if (intervento.componenti && intervento.componenti.length > 0) {
      let cy = cursorY + 25;
      intervento.componenti.forEach((comp: string) => {
          doc.rect(MARGIN + 10, cy + 2, 4, 4).fill(COLORS.textSec);
          doc.fillColor(COLORS.textMain).text(comp, MARGIN + 20, cy);
          cy += 12;
      });
  } else {
      doc.fillColor(COLORS.textLabel).text('Nessuno', MARGIN + 10, cursorY + 25);
  }

  doc.fontSize(10).font('Helvetica-Bold').fillColor(COLORS.textMain).text('4. NOTE CRITICHE', MARGIN + halfWidth + 10, cursorY);
  doc.rect(MARGIN + halfWidth + 10, cursorY + 15, halfWidth, 80).stroke(COLORS.textMain);
  if (aiData.criticita && aiData.criticita.length > 0) {
      let cy = cursorY + 25;
      aiData.criticita.forEach((nota: string) => {
          doc.font('Helvetica-Bold').text('!', MARGIN + halfWidth + 20, cy);
          doc.font('Helvetica-Oblique').text(nota, MARGIN + halfWidth + 30, cy, { width: halfWidth - 40 });
          cy += 15;
      });
  } else {
      doc.font('Helvetica').fillColor(COLORS.textLabel).text('Nessuna', MARGIN + halfWidth + 20, cursorY + 25);
  }

  // --- 6. SPESE ---
  cursorY += 110;
  
  // FORZATURA PAGINA SINGOLA: Rimosso check page break
  // if (PAGE_HEIGHT - cursorY - FOOTER_HEIGHT < 100) {
  //    doc.addPage();
  //    cursorY = MARGIN + 20; // Reset cursore su nuova pagina
  // }

  drawSectionTitle(doc, '5', 'SPESE DI TRASFERTA', MARGIN, cursorY);
  cursorY += 30;

  const expenseColWidth = (CONTENT_WIDTH - 30) / 4;
  const viaggio = spese.viaggio || {};
  drawTextAreaBox(doc, 'Viaggio (KM/Pedaggio)', 
      `Dest: ${viaggio.destinazione || 'N/D'}\nKM: ${viaggio.km_stimati || '-'}\n€: ${viaggio.pedaggio_stimato || '-'}`, 
      MARGIN, cursorY, expenseColWidth, 50);

  const vitto = spese.vitto || {};
  drawTextAreaBox(doc, 'Vitto (Ristorante)', 
      `${vitto.nome_locale || 'N/D'}\n${vitto.indirizzo || ''}\n€: ${vitto.importo_stimato || '-'}`, 
      MARGIN + expenseColWidth + 10, cursorY, expenseColWidth, 50);

  const pernotto = spese.pernotto || {};
  drawTextAreaBox(doc, 'Pernotto (Hotel)', 
      `${pernotto.nome_hotel || 'N/D'}\n${pernotto.indirizzo || ''}`, 
      MARGIN + (expenseColWidth + 10) * 2, cursorY, expenseColWidth, 50);

  const varie = spese.varie || [];
  drawTextAreaBox(doc, 'Spese Varie', 
      varie.join(', ') || 'Nessuna', 
      MARGIN + (expenseColWidth + 10) * 3, cursorY, expenseColWidth, 50);


  // --- 7. TRASCRIZIONE ---
  cursorY += 70;
  
  doc.fontSize(8).font('Helvetica-Bold').fillColor(COLORS.textLabel).text('TRASCRIZIONE ORIGINALE', MARGIN, cursorY);
  
  // Calcolo altezza disponibile con margine di sicurezza ENORME (50px extra)
  const availableH = PAGE_HEIGHT - cursorY - FOOTER_HEIGHT - 50;
  
  // Assicuriamoci che availableH sia positivo
  const safeH = Math.max(20, availableH);

  // Box di sfondo
  doc.rect(MARGIN, cursorY + 10, CONTENT_WIDTH, safeH).fill(COLORS.fillLight);
  
  doc.fillColor(COLORS.textLabel).font('Courier-Oblique').text(
      data.reportData?.transcript || data.transcript || "N/A", 
      MARGIN + 10, 
      cursorY + 15, 
      { 
          width: CONTENT_WIDTH - 20, 
          height: safeH - 10, // Height fisso per troncare
          ellipsis: true,
          lineBreak: true
      }
  );

  // --- FOOTER SINGOLO ---
  // Disegna footer assicurandoci di essere sulla pagina corrente (dovrebbe essere l'unica)
  drawFooter(doc, MARGIN, CONTENT_WIDTH, PAGE_HEIGHT);

  doc.end();

  await new Promise<void>((resolve) => doc.on('end', () => resolve()));
  const pdfBuffer = Buffer.concat(chunks);
  return pdfBuffer.toString('base64');
}

export async function POST(req: NextRequest) {
  try {
    const body: PdfRequest = await req.json();
    console.log(`[API] PDF TITAN 4.5 Gen per: ${body.unitId}`);
    const pdfBase64 = await buildPdfBase64(body.unitId, body.reportType, body);
    return NextResponse.json({ success: true, pdfDataUrl: `data:application/pdf;base64,${pdfBase64}` });
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
