'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ReportData } from '@/components/reports/ReportPDF';

// Dynamic import per evitare SSR (PDFViewer è solo client-side)
const ReportPDFExample = dynamic(
  () => import('@/components/reports/ReportPDFExample'),
  {
    ssr: false,
    loading: () => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Caricamento PDF...</div>
        </div>
      </div>
    ),
  }
);

/**
 * Pagina di test per il componente ReportPDF
 * Visita: http://localhost:3000/test-pdf
 * Updated: Dynamic import fix
 */

export default function TestPDFPage() {
  const [mode, setMode] = useState<'viewer' | 'download'>('viewer');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Dati vuoti per vedere il PDF senza dati
  const testData: ReportData = {
    id: 'N/D',
    date: 'N/D',
    cliente: {
      azienda: 'N/D',
      referente: 'N/D',
      sede: 'N/D',
    },
    intervento: {
      tipologia: 'N/D',
      statoFinale: 'N/D',
      descrizione: '',
    },
    componenti: [],
    noteCritiche: '',
    spese: {
      viaggio: { destinazione: 'N/D', km: 'N/D', costoKm: 'N/D', pedaggio: 'N/D' },
      vitto: 'N/D',
      pernottamento: 'N/D',
      varie: 'N/D',
    },
    trascrizione: '',
  };

  const handleAPIGenerate = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportData: testData }),
      });

      if (!response.ok) {
        throw new Error('Errore nella generazione del PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${testData.id}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nella generazione del PDF');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div
        style={{
          padding: '16px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          borderBottom: '1px solid #333',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
          📄 Test ReportPDF Component
        </h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setMode('viewer')}
            style={{
              padding: '8px 16px',
              backgroundColor: mode === 'viewer' ? '#0070F3' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: mode === 'viewer' ? 'bold' : 'normal',
            }}
          >
            👁️ Visualizza PDF
          </button>
          <button
            onClick={() => setMode('download')}
            style={{
              padding: '8px 16px',
              backgroundColor: mode === 'download' ? '#0070F3' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: mode === 'download' ? 'bold' : 'normal',
            }}
          >
            ⬇️ Download Link
          </button>
          <button
            onClick={handleAPIGenerate}
            style={{
              padding: '8px 16px',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🚀 API Generate
          </button>
        </div>
      </div>

      {/* Contenuto */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <ReportPDFExample mode={mode} data={testData} />
      </div>

      {/* Info */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #ddd',
          fontSize: '12px',
          color: '#666',
        }}
      >
        <strong>Modalità:</strong> {mode === 'viewer' ? 'Viewer (Anteprima)' : 'Download (Link)'} |{' '}
        <strong>API Endpoint:</strong> POST /api/generate-pdf
      </div>
    </div>
  );
}

