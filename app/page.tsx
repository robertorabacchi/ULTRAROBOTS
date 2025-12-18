'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-6 titan-title tracking-tighter uppercase">
            FUSIONE MECCATRONICA <br /> <span className="text-white titan-text-white">E INTELLIGENZA SINTETICA</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Sistemi di visione evoluti e precisione <strong className="text-white font-bold">Kawasaki</strong> guidati da architetture <strong className="text-white font-bold">Siemens</strong>.
            <br />
            Trasformiamo l'hardware in pura intelligenza operativa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-[#0066FF] hover:bg-blue-600 text-white font-bold rounded-none border border-white/20 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,102,255,0.5)] uppercase tracking-widest text-sm">
            ESPLORA LE SOLUZIONI
          </button>
          <button className="px-8 py-4 border border-slate-500 hover:border-[#0066FF] text-slate-300 hover:text-white font-medium rounded-none transition-all hover:scale-105 backdrop-blur-sm uppercase tracking-widest text-sm bg-slate-900/50">
            STACK TECNOLOGICO
          </button>
        </motion.div>
      </div>
    </main>
  );
}
