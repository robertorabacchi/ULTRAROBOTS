import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { getReports, getRobots, getReportStats, getReportById } from '@/lib/data/reports-data';

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

  // Header
  doc.fontSize(20).font('Helvetica-Bold').text('ULTRAROBOTS', { align: 'center' });
  doc.fontSize(10).font('Helvetica').fillColor('#666').text('AI-POWERED ROBOTICS SYSTEMS', { align: 'center' });
  doc.moveDown(2);
  
  // Report Info
  doc.fillColor('#000').fontSize(14).font('Helvetica-Bold').text('REPORT TECNICO', { underline: true });
  doc.moveDown();
  doc.fontSize(10).font('Helvetica');
  doc.text(`Unità: ${unitId}`);
  doc.text(`Tipo Analisi: ${reportType}`);
  doc.text(`Generato: ${new Date(meta.generatedAt).toLocaleString('it-IT')}`);
  doc.moveDown();

  // Stats globali
  const stats = getReportStats();
  doc.fontSize(12).font('Helvetica-Bold').text('STATISTICHE GLOBALI', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica');
  doc.text(`Total Reports: ${stats.totalReports}`);
  doc.text(`Avg Efficiency: ${stats.avgEfficiency}%`);
  doc.text(`Total Energy: ${stats.totalEnergy} kWh`);
  doc.text(`Total Duration: ${stats.totalDuration}h`);
  doc.text(`Success Rate: ${stats.successRate}%`);
  doc.moveDown();

  // Report specifico se esiste
  const report = getReportById(unitId);
  if (report) {
    doc.fontSize(12).font('Helvetica-Bold').text('DETTAGLI REPORT', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    doc.text(`ID: ${report.id}`);
    doc.text(`Robot: ${report.robotId}`);
    doc.text(`Location: ${report.location}`);
    doc.text(`Task Type: ${report.taskType}`);
    doc.text(`Duration: ${report.duration} min`);
    doc.text(`Energy Used: ${report.energyUsed} kWh`);
    doc.text(`Efficiency: ${report.efficiency}%`);
    doc.text(`Operator: ${report.operator}`);
    doc.moveDown();
    if (report.errors.length > 0) {
      doc.fillColor('#d32f2f').text('Errors:');
      report.errors.forEach(err => doc.text(`  • ${err}`));
      doc.fillColor('#000');
    }
    doc.moveDown();
    doc.text(`Notes: ${report.notes}`, { align: 'justify' });
  } else {
    // Robots overview
    const robots = getRobots();
    doc.fontSize(12).font('Helvetica-Bold').text('STATO ROBOT', { underline: true });
    doc.moveDown(0.5);
    robots.forEach(robot => {
      doc.fontSize(10).font('Helvetica-Bold').text(`${robot.name} (${robot.id})`);
      doc.fontSize(9).font('Helvetica');
      doc.text(`  Model: ${robot.model}`);
      doc.text(`  Status: ${robot.status.toUpperCase()}`);
      doc.text(`  Battery: ${robot.battery}%`);
      doc.text(`  Location: ${robot.location}`);
      doc.text(`  Operating Hours: ${robot.operatingHours}h`);
      doc.moveDown(0.5);
    });
  }

  // Footer
  doc.moveDown(2);
  doc.fontSize(8).fillColor('#666').text(
    'Questo documento è generato automaticamente dal sistema ULTRAROBOTS. Validare i dati prima della distribuzione.',
    { align: 'center' }
  );
  doc.text(`AI Analysis Score: ${meta.aiAnalysisScore}% | Maintenance Predict: ${meta.maintenancePredict}`, { align: 'center' });

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








