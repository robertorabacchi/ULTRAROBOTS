'use client';

import React, { useState } from 'react';
import VoiceReport from '@/components/voice/VoiceReport';
import { ReportData } from '@/components/reports/ReportPDF';
import { convertOldToNewFormat } from '@/lib/pdf-data-converter';

/**
 * Esempio di integrazione tra VoiceReport e il nuovo sistema PDF
 * 
 * Questo componente mostra come:
 * 1. Catturare la registrazione vocale
 * 2. Processare il transcript
 * 3. Generare il PDF con il nuovo componente @react-pdf/renderer
 */

export default function VoiceReportPDFIntegration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVoiceSubmit = async (transcript: string, audioBlob: Blob) => {
    setIsGenerating(true);
    setError(null);
    setPdfGenerated(false);

    try {
      // 1. Prepara il FormData con l'audio
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      
      // 2. Invia l'audio all'API per la trascrizione e l'analisi
      const processResponse = await fetch('/api/process-voice-report', {
        method: 'POST',
        body: formData,
      });

      if (!processResponse.ok) {
        throw new Error('Errore nel processamento della registrazione');
      }

      const processedData = await processResponse.json();
      console.log('Dati processati:', processedData);

      // 3. Converti i dati al nuovo formato
      const reportData: ReportData = convertOldToNewFormat({
        id: processedData.reportData?.id,
        cliente: processedData.reportData?.cliente,
        intervento: processedData.reportData?.intervento,
        spese: processedData.reportData?.spese,
        noteCritiche: processedData.reportData?.noteCritiche,
        transcript: processedData.transcript || transcript,
      });

      // 4. Genera il PDF con il nuovo sistema
      const pdfResponse = await fetch('/api/generate-pdf-react', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportData }),
      });

      if (!pdfResponse.ok) {
        throw new Error('Errore nella generazione del PDF');
      }

      // 5. Scarica il PDF
      const blob = await pdfResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${reportData.id}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setPdfGenerated(true);
    } catch (err) {
      console.error('Errore:', err);
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🎙️ Voice Report → PDF Generation
          </h1>
          <p className="text-slate-400">
            Registra il tuo report vocale e genera automaticamente il PDF
          </p>
        </div>

        {/* Status */}
        {isGenerating && (
          <div className="mb-4 p-4 bg-sky-500/10 border border-sky-500/30 rounded-lg flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sky-400 font-mono">Generazione PDF in corso...</span>
          </div>
        )}

        {pdfGenerated && (
          <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span className="text-emerald-400 font-mono">PDF generato con successo!</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✗</span>
            <span className="text-red-400 font-mono">{error}</span>
          </div>
        )}

        {/* Voice Report Component */}
        <div className="flex-1 overflow-hidden">
          <VoiceReport onSubmit={handleVoiceSubmit} />
        </div>

        {/* Footer Info */}
        <div className="mt-4 p-4 bg-black/30 border border-slate-800 rounded-lg">
          <h3 className="text-sm font-bold text-white mb-2">📝 Come funziona:</h3>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li>1. Registra il tuo report vocale</li>
            <li>2. Il sistema trascrive e analizza il contenuto</li>
            <li>3. I dati vengono strutturati automaticamente</li>
            <li>4. Viene generato un PDF professionale con @react-pdf/renderer</li>
            <li>5. Il PDF viene scaricato automaticamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}












