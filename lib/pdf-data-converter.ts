/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReportData } from '@/components/reports/ReportPDF';

/**
 * Utility per convertire i dati dal vecchio formato
 * al nuovo formato per @react-pdf/renderer
 */

// Formato vecchio (dalla route esistente /api/generate-pdf)
interface OldReportFormat {
  id?: string;
  unitId?: string;
  client?: string;
  location?: string;
  reportType?: string;
  status?: string;
  summary?: string;
  description?: string;
  transcript?: string;
  noteCritiche?: string;
  cliente?: {
    azienda?: string;
    referente?: string;
    sede?: string;
  };
  intervento?: {
    tipo?: string;
    stato?: string;
    descrizione?: string;
    componenti?: string[];
  };
  spese?: {
    viaggio?: {
      costo?: string;
    };
    vitto?: string;
    pernottamento?: string;
    varie?: string;
  };
}

/**
 * Converte i dati dal vecchio formato al nuovo formato ReportData
 */
export function convertOldToNewFormat(oldData: OldReportFormat): ReportData {
  return {
    id: oldData.id || oldData.unitId || generateReportId(),
    date: new Date().toLocaleString('it-IT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    cliente: {
      azienda: oldData.cliente?.azienda || oldData.client || 'N/D',
      referente: oldData.cliente?.referente || 'N/D',
      sede: oldData.cliente?.sede || oldData.location || 'N/D',
    },
    intervento: {
      tipologia: oldData.intervento?.tipo || oldData.reportType || 'N/D',
      statoFinale: oldData.intervento?.stato || oldData.status || 'COMPLETATO',
      descrizione:
        oldData.intervento?.descrizione ||
        oldData.summary ||
        oldData.description ||
        'Nessuna descrizione disponibile',
    },
    componenti: oldData.intervento?.componenti?.map((comp: any) => 
      typeof comp === 'string' 
        ? { quantita: '-', descrizione: comp, brand: 'N/D', codice: 'N/D' }
        : comp
    ) || [],
    noteCritiche: oldData.noteCritiche || 'Nessuna',
    spese: {
      viaggio: {
        destinazione: 'N/D',
        km: 'N/D',
        costoKm: 'N/D',
        pedaggio: 'N/D',
      },
      vitto: 'N/D',
      pernottamento: 'N/D',
      varie: 'N/D',
    },
    trascrizione: oldData.transcript || 'Nessuna trascrizione disponibile',
  };
}

/**
 * Genera un ID report univoco nel formato: YYMMDD-HHMM-XXXX
 */
export function generateReportId(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${year}${month}${day}-${hour}${minute}-${random}`;
}

/**
 * Valida i dati del report e restituisce eventuali errori
 */
export function validateReportData(data: Partial<ReportData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.id) {
    errors.push('ID report mancante');
  }

  if (!data.cliente?.azienda) {
    errors.push('Nome azienda mancante');
  }

  if (!data.intervento?.tipologia) {
    errors.push('Tipologia intervento mancante');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Formatta i dati del report con valori di default
 */
export function formatReportData(data: Partial<ReportData>): ReportData {
  return {
    id: data.id || generateReportId(),
    date:
      data.date ||
      new Date().toLocaleString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    cliente: {
      azienda: data.cliente?.azienda || 'N/D',
      referente: data.cliente?.referente || 'N/D',
      sede: data.cliente?.sede || 'N/D',
    },
    intervento: {
      tipologia: data.intervento?.tipologia || 'N/D',
      statoFinale: data.intervento?.statoFinale || 'COMPLETATO',
      descrizione: data.intervento?.descrizione || 'Nessuna descrizione disponibile',
    },
    componenti: data.componenti?.map((comp: any) => 
      typeof comp === 'string' 
        ? { quantita: '-', descrizione: comp, brand: 'N/D', codice: 'N/D' }
        : comp
    ) || [],
    noteCritiche: data.noteCritiche || 'Nessuna',
    spese: {
      viaggio: {
        destinazione: data.spese?.viaggio?.destinazione || 'N/D',
        km: data.spese?.viaggio?.km || 'N/D',
        costoKm: data.spese?.viaggio?.costoKm || 'N/D',
        pedaggio: data.spese?.viaggio?.pedaggio || 'N/D',
      },
      vitto: typeof data.spese?.vitto === 'object' && data.spese?.vitto && !Array.isArray(data.spese.vitto)
        ? `Pranzo: ${(data.spese.vitto as any).pranzoPosto || 'N/D'} (${(data.spese.vitto as any).pranzoImporto || 'N/D'}) | Cena: ${(data.spese.vitto as any).cenaPosto || 'N/D'} (${(data.spese.vitto as any).cenaImporto || 'N/D'})`
        : typeof data.spese?.vitto === 'string'
        ? data.spese.vitto
        : 'N/D',
      pernottamento: typeof data.spese?.pernottamento === 'object' && data.spese?.pernottamento && !Array.isArray(data.spese.pernottamento)
        ? `${(data.spese.pernottamento as any).nomeHotel || 'N/D'} - ${(data.spese.pernottamento as any).numeroNotti || 'N/D'} notti (${(data.spese.pernottamento as any).importo || 'N/D'})`
        : typeof data.spese?.pernottamento === 'string'
        ? data.spese.pernottamento
        : 'N/D',
      varie: Array.isArray(data.spese?.varie) 
        ? data.spese.varie.map((v: any) => typeof v === 'object' ? `${v.descrizione || 'N/D'}: ${v.importo || 'N/D'}` : v).join(' | ')
        : typeof data.spese?.varie === 'string'
        ? data.spese.varie
        : 'N/D',
    },
    trascrizione: data.trascrizione || 'Nessuna trascrizione disponibile',
  };
}

/**
 * Esempio di utilizzo nelle API routes:
 * 
 * ```typescript
 * import { convertOldToNewFormat } from '@/lib/pdf-data-converter';
 * 
 * // Nella tua API route
 * const oldFormatData = await request.json();
 * const newFormatData = convertOldToNewFormat(oldFormatData);
 * 
 * // Ora puoi usare newFormatData con ReportPDF
 * const pdfBuffer = await renderToBuffer(
 *   React.createElement(ReportPDF, { data: newFormatData })
 * );
 * ```
 */













