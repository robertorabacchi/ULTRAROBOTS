'use client';

import { motion } from 'framer-motion';
import { Scan, Target, Cpu } from 'lucide-react';

export default function VisionSystem() {
  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-2xl max-w-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          <Scan className="w-6 h-6" />
          VISION CORE
        </h3>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
          ACTIVE
        </span>
      </div>

      <div className="relative h-48 bg-slate-950 rounded-lg border border-slate-800 mb-6 overflow-hidden flex items-center justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        {/* Scanning Animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-0">
          <Target className="w-16 h-16 text-slate-700" />
        </div>

        {/* Floating Data Points */}
        <motion.div 
          className="absolute top-1/4 right-1/4 text-[10px] font-mono text-cyan-500"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          X: 12.004
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/4 text-[10px] font-mono text-cyan-500"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
        >
          Y: -4.331
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Precisione</span>
          <span className="font-mono text-white">±0.001mm</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">FPS Elaborazione</span>
          <span className="font-mono text-white">120Hz</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Neural Engine</span>
          <span className="font-mono text-emerald-400 flex items-center gap-1">
            <Cpu className="w-3 h-3" /> ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}








