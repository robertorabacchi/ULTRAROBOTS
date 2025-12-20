'use client';

import { motion } from 'framer-motion';
import { Radio, Activity, Disc, Wifi, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SystemMonitor({ active }: { active: boolean }) {
  const [time, setTime] = useState<string>('');
  const [glitch, setGlitch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('it-IT', { hour12: false, fractionalSecondDigits: 2 }));
      // Random glitch effect
      if (active && Math.random() > 0.9) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [active]);

  if (!mounted) return null; // Avoid hydration mismatch by rendering only on client

  return (
    <div className="relative w-full h-full min-h-[300px] bg-transparent rounded-xl overflow-hidden group">
      {/* CRT Scanline Effect - Softer, Blue-tinted */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
      
      {/* Vignette - Blue tinted */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(2,6,23,0.6)_100%)] z-20 pointer-events-none"></div>

      {/* Glitch Overlay */}
      {glitch && (
        <div className="absolute inset-0 bg-sky-500/10 z-30 pointer-events-none translate-x-1 mix-blend-overlay"></div>
      )}

      {/* Simulation Content */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-100 ${glitch ? 'scale-105 skew-x-3' : 'scale-100'}`}>
        {active ? (
          <div className="relative w-full h-full p-8 flex items-center justify-center">
             {/* Data Streams */}
             <div className="absolute inset-0 opacity-10 overflow-hidden font-mono text-[10px] text-sky-500 leading-none p-2 whitespace-pre-wrap break-all">
                {Array.from({ length: 400 }).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
             </div>

             {/* Core Visualization */}
             <div className="relative z-10 w-32 h-32 border-2 border-sky-500/30 rounded-full flex items-center justify-center animate-spin-slow shadow-[0_0_30px_rgba(14,165,233,0.2)]">
                <div className="absolute inset-0 border-t-2 border-sky-400 w-full h-full rounded-full animate-spin"></div>
                <div className="w-20 h-20 bg-sky-900/20 rounded-full backdrop-blur-md flex items-center justify-center border border-sky-500/20">
                    <Activity className="w-8 h-8 text-sky-400 animate-pulse drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="text-slate-400 font-mono text-sm tracking-widest uppercase">System Standby</div>
          </div>
        )}
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 z-30 p-4 flex flex-col justify-between font-mono text-[10px] tracking-wider text-sky-300/80">
        <div className="flex justify-between items-start border-b border-sky-900/30 pb-2">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${active ? 'text-red-400' : 'text-slate-600'}`}>
                <div className={`w-2 h-2 rounded-full ${active ? 'bg-red-500 animate-pulse shadow-[0_0_10px_red]' : 'bg-slate-600'}`}></div>
                <span className="font-bold">REC</span>
            </div>
            <span className="text-sky-100">{time}</span>
          </div>
          <div className="text-right">
            <span className="text-sky-400 block font-bold">CAM_04 [CORE_LOGIC]</span>
            <span className="opacity-50">1920x1080 // 60HZ</span>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-sky-900/30 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>CPU_LOAD: {active ? (Math.random() * 30 + 60).toFixed(1) : '04.2'}%</span>
            </div>
            <div className="flex items-center gap-3">
                <Disc className="w-3 h-3 text-sky-400" />
                <span>MEM_ALLOC: {active ? '32.4' : '01.2'} GB</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             {active ? (
                <>
                    <Wifi className="w-3 h-3 text-sky-400 animate-pulse" />
                    <span className="text-sky-400 font-bold shadow-sky-500/50">UPLINK ESTABLISHED</span>
                </>
             ) : (
                <span className="text-slate-600">OFFLINE</span>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
