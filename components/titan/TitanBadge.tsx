'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Shield, Cpu, X, Server, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export interface TitanStatus {
  security: {
    firewall: string;
    sslTls: string;
    ddos: string;
  };
  architecture: {
    framework: string;
    buildSystem: string;
    deployment: string;
    routing: string;
  };
  performance: {
    buildStatus: string;
    sitemapUrls: number;
    protocol: string;
    services?: {
        deepgram: string;
        openai: string;
    }
  };
}

interface TitanBadgeProps {
  version?: string;
  className?: string;
}

export default function TitanBadge({ version = 'v4.5', className = '' }: TitanBadgeProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState<TitanStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    setShowDialog(true);
  };

  useEffect(() => {
    if (showDialog && !data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      fetch('/api/titan-status')
        .then(res => res.json())
        .then(json => {
            setData(json);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [showDialog, data]);

  return (
    <>
      {/* BADGE BUTTON */}
      <div 
        className={`border-t border-sky-900/30 pt-6 mt-8 flex justify-center ${className}`}
        suppressHydrationWarning
      >
        <button
          onClick={handleOpen}
          className="group relative flex items-center gap-3 px-5 py-2.5 bg-black/80 border border-sky-500/30 rounded-lg overflow-hidden transition-all hover:border-sky-400 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]"
          suppressHydrationWarning
        >
          {/* Animated Borders */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
          
          {/* Status LED */}
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-slate-300">
            <span className="font-bold text-white">SYSTEM SECURE</span>
            <span className="w-px h-3 bg-sky-800"></span>
            <span>TITAN PROTOCOL</span>
            <span className="text-sky-400 font-bold">{version}</span>
          </div>
        </button>
      </div>

      {/* DIALOG MODAL - Rendered via Portal */}
      {mounted && showDialog && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[50000] flex justify-center items-center px-4 py-8">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowDialog(false)}
            />
            
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: -20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: -20 }}
                className="relative bg-[#0a0a0a] border border-sky-500/30 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[calc(100vh-160px)] flex flex-col z-[50001]"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-sky-900/30 bg-slate-900/20">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                        </div>
                        <h2 className="text-lg font-mono font-bold text-white tracking-wide">
                            SYSTEM STATUS <span className="text-sky-500">TITAN {version}</span>
                        </h2>
                    </div>
                    <button onClick={() => setShowDialog(false)} className="text-slate-500 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                    {loading || !data ? (
                        <div className="flex flex-col items-center justify-center py-12 text-sky-500 gap-4">
                            <Activity className="w-8 h-8 animate-pulse" />
                            <span className="font-mono text-xs tracking-widest">DIAGNOSTICS RUNNING...</span>
                        </div>
                    ) : (
                        <>
                            {/* Security Section */}
                            <div className="bg-slate-900/30 rounded-lg p-5 border border-sky-900/30">
                                <div className="flex items-center gap-2 mb-4 text-sky-400 font-mono text-xs font-bold tracking-widest uppercase">
                                    <Shield className="w-4 h-4" /> Security Matrix
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.entries(data.security).map(([key, val]) => (
                                        <div key={key} className="flex items-center justify-between bg-black/40 p-3 rounded border border-white/5">
                                            <span className="text-slate-400 text-xs capitalize">{key}</span>
                                            <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3" /> {val}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Architecture Section */}
                            <div className="bg-slate-900/30 rounded-lg p-5 border border-sky-900/30">
                                <div className="flex items-center gap-2 mb-4 text-sky-400 font-mono text-xs font-bold tracking-widest uppercase">
                                    <Cpu className="w-4 h-4" /> Core Architecture
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(data.architecture).map(([key, val]) => (
                                        <div key={key} className="bg-black/40 p-3 rounded border border-white/5">
                                            <div className="text-slate-500 text-[10px] uppercase mb-1">{key}</div>
                                            <div className="text-slate-200 text-xs font-mono truncate" title={val}>{val}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Services Status */}
                            <div className="bg-slate-900/30 rounded-lg p-5 border border-sky-900/30">
                                <div className="flex items-center gap-2 mb-4 text-sky-400 font-mono text-xs font-bold tracking-widest uppercase">
                                    <Server className="w-4 h-4" /> External Services
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-black/40 p-3 rounded border border-white/5 flex justify-between items-center">
                                        <span className="text-slate-400 text-xs">Deepgram API</span>
                                        <span className={clsx("text-xs font-mono font-bold px-2 py-1 rounded", data.performance.services?.deepgram === 'CONNECTED' ? "bg-emerald-950 text-emerald-400" : "bg-red-950 text-red-400")}>
                                            {data.performance.services?.deepgram}
                                        </span>
                                    </div>
                                    <div className="bg-black/40 p-3 rounded border border-white/5 flex justify-between items-center">
                                        <span className="text-slate-400 text-xs">OpenAI API</span>
                                        <span className={clsx("text-xs font-mono font-bold px-2 py-1 rounded", data.performance.services?.openai === 'CONNECTED' ? "bg-emerald-950 text-emerald-400" : "bg-red-950 text-red-400")}>
                                            {data.performance.services?.openai}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-sky-900/30 bg-slate-900/50 text-center">
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest">
                        DIGITAL ASSET ARCHITECTURE - REAL-TIME DIAGNOSTICS
                    </p>
                </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
