import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Cache in-memory (demo). In prod usare Redis.
const REPORT_CACHE = new Map<
  string,
  { timestamp: number; data: any }
>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minuti

type ReportMeta = {
  generatedAt: string;
  pages: number;
  size: string;
  aiAnalysisScore: string;
  maintenancePredict: string;
  cached: boolean;
  fileUrl?: string;
};

interface PdfRequest {
  unitId: string;
  reportType: 'OEE' | 'PREDICTIVE' | 'LOGS';
}

async function buildPdfBase64(unitId: string, reportType: string, meta: ReportMeta) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const chunks: Buffer[] = [];

  doc.on('data', (chunk) => chunks.push(chunk));

  doc.fontSize(16).font('Helvetica-Bold').text('ULTRAROBOTS // REPORT TECNICO', {
    align: 'left',
  });
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').text(`UNITÀ: ${unitId}`);
  doc.text(`TIPO ANALISI: ${reportType}`);
  doc.text(`GENERATED AT: ${meta.generatedAt}`);
  doc.moveDown();
  doc.text('SINTESI KPI', { underline: true });
  doc.moveDown(0.5);
  doc.text(`- Pagine: ${meta.pages}`);
  doc.text(`- Dimensione stimata: ${meta.size}`);
  doc.text(`- AI Score: ${meta.aiAnalysisScore}%`);
  doc.text(`- Maintenance: ${meta.maintenancePredict}`);
  doc.moveDown();
  doc.text(
    'Nota: Questo report è generato automaticamente. Validare i dati prima di distribuzione.',
    { align: 'justify' }
  );

  doc.end();

  await new Promise<void>((resolve) => doc.on('end', () => resolve()));
  const pdfBuffer = Buffer.concat(chunks);
  return pdfBuffer.toString('base64');
}

export async function POST(req: NextRequest) {
  try {
    const body: PdfRequest = await req.json();
    const cacheKey = `${body.unitId}-${body.reportType}`;

    console.log(`[API] Richiesta PDF: ${cacheKey}`);

    // Cache
    if (REPORT_CACHE.has(cacheKey)) {
      const cached = REPORT_CACHE.get(cacheKey)!;
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        console.log('[API] Cache Hit ⚡');
        return NextResponse.json({
          ...cached.data,
          meta: { ...cached.data.meta, cached: true },
        });
      }
    }

    // Simulazione di compute (per realismo)
    const processingTime = Math.random() * 1000 + 800;
    await new Promise((resolve) => setTimeout(resolve, processingTime));

    const meta: ReportMeta = {
      generatedAt: new Date().toISOString(),
      pages: Math.floor(Math.random() * 6) + 5,
      size: `${(Math.random() * 2 + 0.8).toFixed(2)}MB`,
      aiAnalysisScore: (Math.random() * 5 + 93).toFixed(1),
      maintenancePredict: 'OPTIMAL',
      cached: false,
    };

    const pdfBase64 = await buildPdfBase64(body.unitId, body.reportType, meta);
    const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;

    // Salvataggio file in /public/downloads per preview locale
    try {
      const fileName = `report-${body.unitId.replace(/\s+/g, '_')}-${Date.now()}.pdf`;
      const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
      }
      const filePath = path.join(downloadsDir, fileName);
      fs.writeFileSync(filePath, Buffer.from(pdfBase64, 'base64'));
      meta.fileUrl = `/downloads/${fileName}`;
    } catch (err) {
      console.warn('[API] Impossibile salvare il PDF in /public/downloads', err);
    }

    const responsePayload = {
      success: true,
      meta,
      pdfDataUrl,
    };

    REPORT_CACHE.set(cacheKey, {
      timestamp: Date.now(),
      data: responsePayload,
    });

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}








