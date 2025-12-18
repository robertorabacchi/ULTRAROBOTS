'use client';

import { motion } from 'framer-motion';
import { Radio, Activity, Disc, Wifi, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SystemMonitor({ active }: { active: boolean }) {
  const [time, setTime] = useState<string>('');
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
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

  return (
    <div className="relative w-full h-full min-h-[300px] bg-black rounded-none border border-[#334155] overflow-hidden shadow-inner group">
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] z-20 pointer-events-none"></div>

      {/* Glitch Overlay */}
      {glitch && (
        <div className="absolute inset-0 bg-cyan-500/20 z-30 pointer-events-none translate-x-1 mix-blend-screen"></div>
      )}

      {/* Simulation Content */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-100 ${glitch ? 'scale-105 skew-x-3' : 'scale-100'}`}>
        {active ? (
          <div className="relative w-full h-full p-8 flex items-center justify-center">
             {/* Data Streams */}
             <div className="absolute inset-0 opacity-20 overflow-hidden font-mono text-[10px] text-cyan-500 leading-none p-2 whitespace-pre-wrap break-all">
                {Array.from({ length: 400 }).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
             </div>

             {/* Core Visualization */}
             <div className="relative z-10 w-32 h-32 border-2 border-cyan-500/50 rounded-full flex items-center justify-center animate-spin-slow">
                <div className="absolute inset-0 border-t-2 border-cyan-400 w-full h-full rounded-full animate-spin"></div>
                <div className="w-20 h-20 bg-cyan-900/30 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="text-[#475569] font-mono text-sm tracking-widest uppercase">System Standby</div>
          </div>
        )}
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 z-30 p-4 flex flex-col justify-between font-mono text-[10px] tracking-wider text-slate-400">
        <div className="flex justify-between items-start border-b border-slate-800 pb-2">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${active ? 'text-red-500' : 'text-slate-600'}`}>
                <div className={`w-2 h-2 rounded-full ${active ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></div>
                <span className="font-bold">REC</span>
            </div>
            <span className="text-slate-300">{time}</span>
          </div>
          <div className="text-right">
            <span className="text-cyan-500 block">CAM_04 [CORE_LOGIC]</span>
            <span className="opacity-50">1920x1080 // 60HZ</span>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-slate-800 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span>CPU_LOAD: {active ? (Math.random() * 30 + 60).toFixed(1) : '04.2'}%</span>
            </div>
            <div className="flex items-center gap-3">
                <Disc className="w-3 h-3 text-blue-500" />
                <span>MEM_ALLOC: {active ? '32.4' : '01.2'} GB</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             {active ? (
                <>
                    <Wifi className="w-3 h-3 text-cyan-500 animate-pulse" />
                    <span className="text-cyan-500">UPLINK ESTABLISHED</span>
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
