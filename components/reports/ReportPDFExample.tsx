'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ReportPDF, { sampleReportData, ReportData } from './ReportPDF';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full text-slate-400">Caricamento PDF Viewer...</div>,
});

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
  ssr: false,
  loading: () => <span className="text-slate-400">Caricamento...</span>,
});

/**
 * Componente esempio per visualizzare e scaricare il PDF
 * 
 * UTILIZZO:
 * 
 * 1. Per visualizzare il PDF in una pagina:
 * <ReportPDFExample mode="viewer" />
 * 
 * 2. Per generare un link di download:
 * <ReportPDFExample mode="download" />
 * 
 * 3. Con dati personalizzati:
 * <ReportPDFExample mode="viewer" data={myCustomData} />
 */

interface ReportPDFExampleProps {
  mode?: 'viewer' | 'download';
  data?: ReportData;
}

const ReportPDFExample: React.FC<ReportPDFExampleProps> = ({
  mode = 'viewer',
  data = sampleReportData,
}) => {
  if (mode === 'viewer') {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <PDFViewer width="100%" height="100%">
          <ReportPDF data={data} />
        </PDFViewer>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <PDFDownloadLink
        document={<ReportPDF data={data} />}
        fileName={`report-${data.id}-${Date.now()}.pdf`}
      >
        {({ blob, url, loading, error }) => (
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#CCCCCC' : '#0070F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            disabled={loading}
          >
            {loading ? 'Generazione PDF...' : 'Scarica Report PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default ReportPDFExample;











