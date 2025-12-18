'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, FileText, CheckCircle, OctagonX, PauseCircle, Download, AlertTriangle, Activity } from 'lucide-react';
import clsx from 'clsx';
import SystemMonitor from '@/components/ui/SystemMonitor';

export default function ReportsDashboard() {
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

      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      await new Promise(resolve => setTimeout(resolve, 3000));

      setPdfMeta(data.meta);
      setPdfUrl(data.pdfDataUrl || null);
      setIsGenerating(false);
      setStatus('success');
      setAbortController(null);
    } catch (e: any) {
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
      <div className="border border-[#1a1a1a] bg-black p-8 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#222] to-transparent"></div>
        
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <span className="text-[9px] font-mono text-[#444] uppercase tracking-[0.2em] block mb-2">INTERFACE // V.2.0.4</span>
                    <h2 className="text-xl font-light text-white flex items-center gap-3 tracking-tight">
                        SYSTEM REPORTS
                    </h2>
                </div>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-[#333]"></div>
                    <div className="w-1 h-1 bg-[#333]"></div>
                    <div className="w-1 h-1 bg-[#0066FF]"></div>
                </div>
            </div>
            
            {/* Canale Prioritario Minimal */}
            <form onSubmit={handleCommand} className="mb-12">
                <div className="flex gap-0 border border-[#1a1a1a]">
                    <input 
                        type="text" 
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        placeholder="ENTER_OVERRIDE_CODE"
                        className="flex-1 bg-black text-[10px] text-white placeholder-[#333] px-4 py-3 focus:outline-none font-mono tracking-widest uppercase"
                    />
                    <button type="submit" className="bg-[#111] hover:bg-[#0066FF] hover:text-white text-[#444] text-[9px] px-6 py-3 font-mono border-l border-[#1a1a1a] transition-colors tracking-widest">
                        EXEC
                    </button>
                </div>
            </form>

            <div className="space-y-8 mb-12">
                <div className="space-y-2">
                    <label className="text-[9px] font-mono text-[#444] uppercase tracking-[0.2em]">TARGET_UNIT</label>
                    <select 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full bg-black border border-[#1a1a1a] rounded-none px-4 py-3 text-white text-xs focus:outline-none focus:border-[#333] appearance-none"
                    >
                        <option value="Kawasaki R Series - Unit 01">KAWASAKI_R_SERIES_01</option>
                        <option value="Siemens S7-1500 - Main Line">SIEMENS_S7_1500_MAIN</option>
                    </select>
                </div>
                
                <div className="space-y-2">
                    <label className="text-[9px] font-mono text-[#444] uppercase tracking-[0.2em]">ANALYSIS_TYPE</label>
                    <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-black border border-[#1a1a1a] rounded-none px-4 py-3 text-white text-xs focus:outline-none focus:border-[#333] appearance-none"
                    >
                        <option value="PREDICTIVE">PREDICTIVE_MAINTENANCE</option>
                        <option value="OEE">OPERATIONAL_EFFICIENCY</option>
                        <option value="LOGS">ERROR_LOGS_DUMP</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {!isGenerating ? (
                    <button
                        onClick={generateReport}
                        className="w-full border border-[#333] text-white py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-mono"
                    >
                        INITIATE_SEQUENCE
                    </button>
                ) : (
                    <button
                        onClick={handleAbort}
                        className="w-full border border-red-900/50 text-red-500 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-red-500 hover:text-black transition-colors font-mono animate-pulse"
                    >
                        ABORT_PROCESS
                    </button>
                )}

                {/* Status Messages */}
                <AnimatePresence mode='wait'>
                {status === 'success' && pdfMeta && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-[#1a1a1a] pt-4 mt-4"
                        >
                            <div className="flex justify-between items-center text-[10px] font-mono text-[#444] mb-4">
                                <span>STATUS: COMPLETE</span>
                                <span>SCORE: {pdfMeta.aiAnalysisScore}%</span>
                            </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            disabled={!pdfUrl}
                            onClick={() => {
                              if (!pdfUrl) return;
                              const link = document.createElement('a');
                              link.href = pdfUrl;
                              link.download = `report-${unit.replace(/\\s+/g, '_')}.pdf`;
                              link.click();
                            }}
                            className="w-full bg-[#0066FF] text-white py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#0052cc] transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            DOWNLOAD_BASE64
                          </button>
                          {pdfMeta.fileUrl && (
                            <a
                              href={pdfMeta.fileUrl}
                              download
                              className="w-full text-center border border-[#333] text-white py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-mono"
                            >
                              DOWNLOAD_FILE
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
      <div className="space-y-0">
        <div className="border border-[#1a1a1a] bg-black p-0 h-[350px] relative">
            <SystemMonitor active={isGenerating} />
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }}>
            </div>
        </div>
        
        {/* Terminal Log */}
        <div className="border-x border-b border-[#1a1a1a] bg-[#050505] p-6 font-mono text-[10px] h-64 overflow-hidden relative">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[#333]">/var/logs/sys_output</span>
                <div className="w-1 h-1 bg-[#0066FF] animate-pulse"></div>
            </div>
            
            <div className="space-y-1 text-[#666] h-full overflow-y-auto pb-4 custom-scrollbar">
                <p className="text-[#444]">{'>'} kernel_ready</p>
                {isGenerating && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <p>{'>'} handshake_init :: {unit}</p>
                        <p>{'>'} decrypting_shards...</p>
                        <motion.p 
                            animate={{ opacity: [0.5, 1, 0.5] }} 
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-white"
                        >
                            {'>'} warning: high_latency_node_04
                        </motion.p>
                        <p>{'>'} rerouting...</p>
                        <p>{'>'} neural_weights_compiling...</p>
                        <p className="text-[#0066FF]">{'>'} generating_structure...</p>
                    </motion.div>
                )}
                {status === 'success' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-white">{'>'} process_complete</p>
                        <p className="text-[#333]">{'>'} connection_closed</p>
                    </motion.div>
                )}
                {status === 'aborted' && (
                    <p className="text-red-500">{'>'} SIGINT_RECEIVED_USER_ABORT</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
