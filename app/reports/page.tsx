'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import VoiceReport from '@/components/voice/VoiceReport';
import ReportsDashboard from '@/components/reports/ReportsDashboard';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { FileText, Download, CheckCircle, Activity, Mic, Loader2, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function ReportsPage() {
  const { dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'create' | 'dashboard'>('dashboard');
  const [reportResult, setReportResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVoiceSubmit = async (transcript: string, audioBlob: Blob) => {
    setIsProcessing(true);
    setError(null);
    setReportResult(null);

    try {
        const formData = new FormData();
        formData.append('audio', audioBlob);

        const response = await fetch('/api/process-audio', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            setError(data.error);
        } else {
            setReportResult({
                id: 'REP-' + Math.floor(Math.random() * 10000),
                transcript: data.transcript,
                analysis: data.analysis,
                status: 'success'
            });
        }

    } catch (err: any) {
        console.error("Submission error:", err);
        setError(err.message || dict.reports.error.msg);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleDownloadPdf = async () => {
      if (!reportResult) return;
      
      try {
          const response = await fetch('/api/generate-pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  unitId: reportResult.analysis.summary || "INTERVENTO_VOCALE",
                  reportType: 'VOICE_REPORT',
                  reportData: {
                      ...reportResult.analysis,
                      transcript: reportResult.transcript
                  }
              })
          });
          
          if (!response.ok) {
             throw new Error("PDF generation failed on server");
          }

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          const dateStr = new Date().toISOString().slice(0, 10);
          const clienteRaw = reportResult.analysis.cliente?.azienda || "CLIENTE";
          const tipoRaw = reportResult.analysis.intervento?.tipo || "REPORT";
          const safeCliente = clienteRaw.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
          const safeTipo = tipoRaw.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
          const finalCliente = safeCliente.length > 20 ? safeCliente.substring(0, 20) : (safeCliente || "ND");
          const finalTipo = safeTipo.length > 15 ? safeTipo.substring(0, 15) : (safeTipo || "DOC");
          const filename = `${dateStr}_${finalCliente}_${finalTipo}.pdf`;

          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
      } catch (e) {
          console.error("PDF generation failed", e);
      }
  };

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden pt-24 pb-20">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Header & Tabs */}
        <div className="mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row justify-between items-end gap-6"
            >
                <div className="border-l-4 border-sky-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono font-bold text-sky-400 tracking-[0.2em] uppercase bg-sky-950/50 px-3 py-1 rounded border border-sky-500/30">
                            {dict.reports.tag}
                        </span>
                        <div className="h-[1px] w-20 bg-sky-500/30"></div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
                        {dict.reports.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500">{dict.reports.title.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
                        {dict.reports.subtitle}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-slate-900/50 border border-slate-700 rounded-lg p-1 gap-1">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-3 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all",
                            activeTab === 'create' 
                                ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <Mic className="w-4 h-4" />
                        {dict.reports.tabs.create}
                    </button>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-3 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all",
                            activeTab === 'dashboard' 
                                ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]" 
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <Activity className="w-4 h-4" />
                        {dict.reports.tabs.dashboard}
                    </button>
                </div>
            </motion.div>
        </div>

        {/* Content Area */}
        <div className="min-h-[600px]">
            {activeTab === 'create' ? (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                        {/* Voice Input Section */}
                        <div className="w-full h-full flex flex-col">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-red-500 rounded-full"></span>
                                {dict.reports.inputTitle}
                            </h2>
                            <div className="flex-1">
                                <VoiceReport onSubmit={handleVoiceSubmit} />
                            </div>
                        </div>

                        {/* Instructions / Preview Section */}
                        <div className="w-full space-y-6 h-full flex flex-col pt-14">
                             
                             {/* Loading State */}
                             {isProcessing && (
                                <div className="bg-slate-900/50 border border-sky-500/30 rounded-xl p-8 h-full flex flex-col items-center justify-center min-h-[400px]">
                                    <Loader2 className="w-16 h-16 text-sky-500 animate-spin mb-6" />
                                    <h3 className="text-xl font-bold text-white mb-2">{dict.reports.processing.title}</h3>
                                    <div className="text-slate-400 text-sm font-mono flex flex-col gap-2 text-center">
                                        <span>&gt; {dict.reports.processing.steps.upload}</span>
                                        <span>&gt; {dict.reports.processing.steps.transcribe}</span>
                                        <span>&gt; {dict.reports.processing.steps.analysis}</span>
                                    </div>
                                </div>
                             )}

                             {/* Error State */}
                             {error && !isProcessing && (
                                <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-8 h-full flex flex-col items-center justify-center min-h-[400px]">
                                    <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
                                    <h3 className="text-xl font-bold text-white mb-2">{dict.reports.error.title}</h3>
                                    <p className="text-red-400 text-center">{error}</p>
                                    <button 
                                        onClick={() => setError(null)}
                                        className="mt-6 px-6 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded uppercase font-mono text-xs"
                                    >
                                        {dict.reports.error.retry}
                                    </button>
                                </div>
                             )}

                             {/* Result Preview (Real Data) */}
                            {reportResult && !isProcessing && !error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6 h-full flex flex-col"
                                >
                                    <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4 shrink-0">
                                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white">{dict.reports.result.title}</h3>
                                            <p className="text-xs text-emerald-400 font-mono">ID: {reportResult.id}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-mono text-slate-500 uppercase">{dict.reports.result.status}</div>
                                            <div className="text-sm font-bold text-emerald-400">{reportResult.analysis.status}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
                                        {/* AI Analysis Summary */}
                                        <div className="bg-black/30 p-4 rounded border border-white/5">
                                            <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mb-2">{dict.reports.result.summary}</div>
                                            <p className="text-white text-sm font-medium">{reportResult.analysis.summary}</p>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                                <div className="text-[10px] font-mono text-slate-500 uppercase">{dict.reports.result.client}</div>
                                                <div className="text-slate-300 text-sm">{reportResult.analysis.cliente?.azienda || reportResult.analysis.client}</div>
                                            </div>
                                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                                <div className="text-[10px] font-mono text-slate-500 uppercase">{dict.reports.result.type}</div>
                                                <div className="text-slate-300 text-sm">{reportResult.analysis.intervento?.tipo || "N/D"}</div>
                                            </div>
                                        </div>

                                        {/* Actions List */}
                                        {reportResult.analysis.intervento?.descrizione && (
                                            <div>
                                                <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">{dict.reports.result.desc}</div>
                                                <p className="text-slate-300 text-sm">{reportResult.analysis.intervento.descrizione}</p>
                                            </div>
                                        )}

                                        {/* Components */}
                                        {reportResult.analysis.intervento?.componenti?.length > 0 && (
                                            <div>
                                                <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">{dict.reports.result.components}</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {reportResult.analysis.intervento.componenti.map((comp: string, i: number) => (
                                                        <span key={i} className="text-xs bg-slate-800 border border-slate-700 px-2 py-1 rounded text-slate-300">
                                                            {comp}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Transcript */}
                                        <div className="border-t border-white/5 pt-4">
                                            <div className="text-[10px] font-mono text-slate-600 uppercase mb-1">{dict.reports.result.transcript}</div>
                                            <p className="text-slate-500 text-xs italic leading-relaxed">
                                                "{reportResult.transcript}"
                                            </p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handleDownloadPdf}
                                        className="w-full py-3 mt-4 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-slate-600 shrink-0"
                                    >
                                        <Download className="w-4 h-4" />
                                        {dict.reports.result.download}
                                    </button>
                                </motion.div>
                            )}
                            
                            {/* Idle State */}
                            {!reportResult && !isProcessing && !error && (
                                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                                    <FileText className="w-16 h-16 text-slate-600 mx-auto mb-6" />
                                    <h3 className="text-xl font-bold text-slate-300 mb-3">{dict.reports.idle.title}</h3>
                                    <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
                                        {dict.reports.idle.msg}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <ReportsDashboard />
                </motion.div>
            )}
        </div>

      </div>
    </main>
  );
}
