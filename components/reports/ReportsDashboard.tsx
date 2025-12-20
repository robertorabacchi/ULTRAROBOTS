'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, FileText, CheckCircle, OctagonX, PauseCircle, Download, AlertTriangle, Activity } from 'lucide-react';
import clsx from 'clsx';
import SystemMonitor from '@/components/ui/SystemMonitor';
import { useLanguage } from '@/context/LanguageContext';

export default function ReportsDashboard() {
  const { dict } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'aborted'>('idle');
  const [pdfMeta, setPdfMeta] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [unit, setUnit] = useState('Kawasaki R Series - Unit 01');
  const [type, setType] = useState('PREDICTIVE');

  const generateReport = async () => {
    setIsGenerating(true);
    setStatus('idle');
    setPdfMeta(null);
    
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId: unit, reportType: type }),
        signal: controller.signal
      });

      if (!response.ok) {
        console.error('API Error Response:', response.status, response.statusText);
        throw new Error('API Error');
      }
      
      const data = await response.json();
      console.log('API Response Data:', data); // DEBUG

      await new Promise(resolve => setTimeout(resolve, 3000));

      setPdfMeta(data.meta);
      setPdfUrl(data.pdfDataUrl || null);
      setIsGenerating(false);
      setStatus('success');
      setAbortController(null);
    } catch (e: any) {
      console.error('Fetch Error:', e); // DEBUG
      setIsGenerating(false);
      if (e.name === 'AbortError') {
        setStatus('aborted');
      } else {
        setStatus('error');
      }
      setAbortController(null);
    }
  };

  const handleAbort = () => {
    if (abortController) abortController.abort();
  };

  const [command, setCommand] = useState('');
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.toUpperCase() === 'OVERRIDE' || command.toUpperCase() === 'STOP') {
        handleAbort();
        setCommand('');
        alert('PRIORITY OVERRIDE EXECUTED');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* --- COLONNA CONTROLLI KERNEL --- */}
      <div className="border border-sky-500/20 bg-slate-900/40 backdrop-blur-xl p-8 relative rounded-xl shadow-lg">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
        
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <span className="text-[9px] font-mono text-sky-400 uppercase tracking-[0.2em] block mb-2">{dict.reports.interface}</span>
                    <h2 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
                        {dict.reports.title}
                    </h2>
                </div>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-sky-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-sky-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
            </div>
            
            {/* Canale Prioritario Minimal */}
            <form onSubmit={handleCommand} className="mb-12">
                <div className="flex gap-0 border border-sky-500/20 rounded-md overflow-hidden">
                    <input 
                        type="text" 
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        placeholder={dict.reports.placeholder}
                        className="flex-1 bg-slate-950/50 text-[10px] text-white placeholder-slate-500 px-4 py-3 focus:outline-none font-mono tracking-widest uppercase"
                    />
                    <button type="submit" className="bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white text-[9px] px-6 py-3 font-mono border-l border-sky-500/20 transition-all tracking-widest">
                        {dict.reports.exec}
                    </button>
                </div>
            </form>

            <div className="space-y-8 mb-12">
                <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em]">{dict.reports.target}</label>
                    <select 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full bg-slate-900 border border-sky-500/30 rounded-md px-4 py-3 text-white text-xs focus:outline-none focus:border-sky-500 appearance-none font-mono"
                    >
                        <option value="Kawasaki R Series - Unit 01">KAWASAKI_R_SERIES_01</option>
                        <option value="Siemens S7-1500 - Main Line">SIEMENS_S7_1500_MAIN</option>
                    </select>
                </div>
                
                <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em]">{dict.reports.type}</label>
                    <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-slate-900 border border-sky-500/30 rounded-md px-4 py-3 text-white text-xs focus:outline-none focus:border-sky-500 appearance-none font-mono"
                    >
                        <option value="PREDICTIVE">{dict.reports.types.predictive}</option>
                        <option value="OEE">{dict.reports.types.oee}</option>
                        <option value="LOGS">{dict.reports.types.logs}</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {!isGenerating ? (
                    <button
                        onClick={generateReport}
                        className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white py-4 text-[10px] uppercase tracking-[0.2em] rounded-md shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all font-mono font-bold"
                    >
                        {dict.reports.initiate}
                    </button>
                ) : (
                    <button
                        onClick={handleAbort}
                        className="w-full border border-red-500/50 text-red-400 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/10 transition-colors font-mono animate-pulse rounded-md"
                    >
                        {dict.reports.abort}
                    </button>
                )}

                {/* Status Messages */}
                <AnimatePresence mode='wait'>
                {status === 'success' && pdfMeta && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-sky-500/20 pt-4 mt-4"
                        >
                            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-4">
                                <span className="text-emerald-400 font-bold">{dict.reports.status_complete}</span>
                                <span>SCORE: {pdfMeta.aiAnalysisScore}%</span>
                            </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            disabled={!pdfUrl}
                            onClick={() => {
                              if (!pdfUrl) return;
                              const link = document.createElement('a');
                              link.href = pdfUrl;
                              link.download = `report-${unit.replace(/\s+/g, '_')}.pdf`;
                              link.click();
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 text-[10px] uppercase tracking-[0.2em] rounded-md shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {dict.reports.download_base64}
                          </button>
                          {pdfMeta.fileUrl && (
                            <a
                              href={pdfMeta.fileUrl}
                              download
                              className="w-full text-center border border-sky-500/30 text-sky-400 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-sky-500/10 transition-colors font-mono rounded-md"
                            >
                              {dict.reports.download_file}
                            </a>
                          )}
                        </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>

      {/* --- COLONNA MONITOR KERNEL --- */}
      <div className="space-y-4">
        <div className="border border-sky-500/20 bg-slate-900/40 backdrop-blur-xl p-0 h-[350px] relative rounded-xl overflow-hidden shadow-lg">
            <SystemMonitor active={isGenerating} />
        </div>
        
        {/* Terminal Log */}
        <div className="border border-sky-500/20 bg-black/80 backdrop-blur-md p-6 font-mono text-[10px] h-64 overflow-hidden relative rounded-xl shadow-inner">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="text-slate-400 font-bold">/var/logs/sys_output</span>
                <div className="w-1 h-1 bg-emerald-500 animate-pulse rounded-full"></div>
            </div>
            
            <div className="space-y-1 text-slate-400 h-full overflow-y-auto pb-4 custom-scrollbar">
                <p className="text-slate-500">{'>'} {dict.reports.terminal.ready}</p>
                {isGenerating && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <p className="text-sky-300">{'>'} {dict.reports.terminal.handshake} :: {unit}</p>
                        <p className="text-sky-300">{'>'} {dict.reports.terminal.decrypt}</p>
                        <motion.p 
                            animate={{ opacity: [0.5, 1, 0.5] }} 
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-yellow-400"
                        >
                            {'>'} {dict.reports.terminal.warning}
                        </motion.p>
                        <p className="text-sky-300">{'>'} {dict.reports.terminal.rerouting}</p>
                        <p className="text-purple-400">{'>'} {dict.reports.terminal.weights}</p>
                        <p className="text-emerald-400 font-bold">{'>'} {dict.reports.terminal.generating}</p>
                    </motion.div>
                )}
                {status === 'success' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-emerald-400 font-bold">{'>'} {dict.reports.terminal.complete}</p>
                        <p className="text-slate-500">{'>'} {dict.reports.terminal.closed}</p>
                    </motion.div>
                )}
                {status === 'aborted' && (
                    <p className="text-red-500 font-bold">{'>'} {dict.reports.terminal.abort}</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
