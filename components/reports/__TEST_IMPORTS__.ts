/**
 * File di test per verificare che tutti gli import funzionino correttamente
 * Questo file può essere eliminato dopo la verifica
 */

// Test import componenti
import ReportPDF from './ReportPDF';
import type { ReportData } from './ReportPDF';
import { sampleReportData } from './ReportPDF';
import ReportPDFExample from './ReportPDFExample';
import VoiceReportPDFIntegration from './VoiceReportPDFIntegration';

// Test import centralizzato
import {
  ReportPDF as ReportPDF2,
  ReportData as ReportData2,
  sampleReportData as sampleData2,
  ReportPDFExample as Example2,
  VoiceReportPDFIntegration as Integration2,
} from './index';

// Test utility
import {
  convertOldToNewFormat,
  generateReportId,
  validateReportData,
  formatReportData,
} from '@/lib/pdf-data-converter';

// Verifica che tutto sia definito
console.log('✅ Tutti gli import funzionano correttamente!');

export const testData: ReportData = sampleReportData;
export const testComponent = ReportPDF;
export const testExample = ReportPDFExample;
export const testIntegration = VoiceReportPDFIntegration;
export const testUtils = {
  convertOldToNewFormat,
  generateReportId,
  validateReportData,
  formatReportData,
};

/**
 * Se questo file compila senza errori, il sistema è pronto!
 */












