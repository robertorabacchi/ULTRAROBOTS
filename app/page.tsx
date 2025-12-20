'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SystemMonitor from '@/components/ui/SystemMonitor';
import VisionSystem from '@/components/ui/VisionSystem';
import { useLanguage } from '@/context/LanguageContext';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function Home() {
  const { dict } = useLanguage();

  return (
   <main className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-10">
     <Scene />
     
     <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 items-start justify-between max-w-7xl">
       
       {/* LEFT COLUMN: HUGE TITLE & CONTENT */}
       <motion.div
         initial={{ opacity: 0, x: -30 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.8 }}
         className="text-left flex-1 pt-12"
         suppressHydrationWarning
       >
         <div className="border-l-4 border-sky-500 pl-6 md:pl-8 -ml-6 md:ml-0">
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9] text-white drop-shadow-2xl uppercase" suppressHydrationWarning>
            {dict.home.title1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 filter drop-shadow-[0_0_20px_rgba(14,165,233,0.6)]">
                {dict.home.title2}
            </span>
            <br />
            <span className="text-2xl md:text-4xl text-slate-200 font-bold tracking-tighter block leading-tight whitespace-pre-wrap">
                {dict.home.title3}
            </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-xl mb-10 leading-relaxed font-light" suppressHydrationWarning>
            {dict.home.subtitle}
            </p>
         </div>

         <div className="flex flex-col sm:flex-row gap-5 pl-2 md:pl-8">
            <Link href="/technology" className="px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(14,165,233,0.4)] uppercase tracking-widest text-sm flex items-center justify-center gap-2 group">
              {dict.home.explore}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link href="/platform" className="px-8 py-4 border border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-white font-medium rounded-lg transition-all hover:scale-105 backdrop-blur-md uppercase tracking-widest text-sm bg-slate-900/60 flex items-center justify-center hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              {dict.home.stack}
            </Link>
         </div>
       </motion.div>

       {/* RIGHT COLUMN: ACTIVE DASHBOARDS (GRAFICO & ANIMATO) */}
       <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex flex-col gap-6 w-full max-w-[450px] pt-12"
       >
          {/* Primary Monitor Card */}
          <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-sky-500/30 rounded-2xl overflow-hidden shadow-2xl relative group hover:border-sky-500/60 transition-all duration-500">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-500 opacity-50"></div>
             <div className="p-4 border-b border-sky-500/20 flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-sky-400 tracking-widest">{dict.home.monitor}</span>
                <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
             </div>
             <div className="h-[280px] relative">
                <SystemMonitor active={true} />
             </div>
          </div>

          {/* Secondary Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
             {/* Vision Core Card */}
             <div className="bg-slate-900/40 backdrop-blur-xl border border-emerald-500/30 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/60 transition-all duration-300 flex flex-col h-[220px]">
                 <div className="p-3 border-b border-emerald-500/20">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest">{dict.home.vision}</span>
                 </div>
                 <div className="flex-1 relative">
                    <VisionSystem />
                 </div>
             </div>
             
             {/* Data Stream Card */}
             <div className="bg-slate-900/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-5 shadow-xl hover:border-purple-500/60 transition-all duration-300 h-[220px] flex flex-col relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 opacity-20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-500"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                 </div>
                 <span className="text-[10px] font-mono font-bold text-purple-400 tracking-widest mb-4">{dict.home.stream}</span>
                 <div className="font-mono text-[10px] text-purple-300 space-y-2 opacity-80 overflow-hidden">
                   <div className="animate-pulse">{'>>'} {dict.home.logs.connecting}</div>
                   <div className="animate-pulse delay-75">{'>>'} {dict.home.logs.protocol}</div>
                   <div className="animate-pulse delay-100">{'>>'} {dict.home.logs.optimizing}</div>
                   <div className="animate-pulse delay-150">{'>>'} {dict.home.logs.bridge}</div>
                   <div className="mt-4 pt-4 border-t border-purple-500/20 text-xs font-bold text-white">
                      {dict.home.throughput}:
                      <span className="block text-2xl text-purple-400 mt-1">10.4 TB/s</span>
                   </div>
                 </div>
             </div>
          </div>
       </motion.div>
     </div>
   </main>
  );
}
