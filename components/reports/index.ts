/**
 * Export centrale per tutti i componenti PDF
 * 
 * Uso:
 * import { ReportPDF, ReportData, sampleReportData } from '@/components/reports';
 */

// Componente principale PDF
export { default as ReportPDF } from './ReportPDF';
export type { ReportData } from './ReportPDF';
export { sampleReportData } from './ReportPDF';

// Componente esempio
export { default as ReportPDFExample } from './ReportPDFExample';

// Dashboard reports esistente
export { default as ReportsDashboard } from './ReportsDashboard';

// Integrazione Voice Report
export { default as VoiceReportPDFIntegration } from './VoiceReportPDFIntegration';












