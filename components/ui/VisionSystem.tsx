'use client';

import { motion } from 'framer-motion';
import { Scan, Target, Cpu } from 'lucide-react';

export default function VisionSystem() {
  return (
    <div className="w-full h-full flex flex-col justify-center p-6 bg-transparent">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
          <Scan className="w-4 h-4" />
          VISION CORE
        </h3>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          ACTIVE
        </span>
      </div>

      <div className="relative flex-1 bg-slate-900/60 rounded-lg border border-sky-500/30 mb-4 overflow-hidden flex items-center justify-center shadow-inner">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-30" 
             style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        {/* Scanning Animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,1)] z-10"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-0">
          <Target className="w-12 h-12 text-sky-600/50" />
        </div>

        {/* Floating Data Points */}
        <motion.div 
          className="absolute top-1/4 right-1/4 text-[10px] font-mono text-sky-300 font-bold"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          X: 12.004
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/4 text-[10px] font-mono text-sky-300 font-bold"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
        >
          Y: -4.331
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Neural Engine</span>
        <span className="font-mono text-emerald-400 flex items-center gap-1 font-bold shadow-emerald-500/50">
          <Cpu className="w-3 h-3" /> ONLINE
        </span>
      </div>
    </div>
  );
}










