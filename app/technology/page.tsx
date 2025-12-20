'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Bot, Cpu, Eye, Server, Zap, Workflow, Database, Network, ShieldCheck } from 'lucide-react';
import TechCard from '@/components/ui/TechCard';
import VisionSystem from '@/components/ui/VisionSystem';
import { useLanguage } from '@/context/LanguageContext';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function TechnologyPage() {
  const { dict } = useLanguage();

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden pt-24 pb-20">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-20 border-l-4 border-sky-500 pl-8 ml-4 md:ml-0">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
               <span className="text-[10px] font-mono font-bold text-sky-400 tracking-[0.2em] uppercase bg-sky-950/50 px-3 py-1 rounded border border-sky-500/30">
                 {dict.tech.tag}
               </span>
               <div className="h-[1px] w-20 bg-sky-500/30"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
              NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">STACK</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
              {dict.tech.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Main Grid: Core Systems */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <TechCard
            title={dict.tech.cards.kawasaki.title}
            description={dict.tech.cards.kawasaki.desc}
            icon={Bot}
            color="cyan"
            partner="KAWASAKI ROBOTICS"
            delay={0.1}
          />
          <TechCard
            title={dict.tech.cards.siemens.title}
            description={dict.tech.cards.siemens.desc}
            icon={Cpu}
            color="blue"
            partner="SIEMENS AUTOMATION"
            delay={0.2}
          />
          <TechCard
            title={dict.tech.cards.nvidia.title}
            description={dict.tech.cards.nvidia.desc}
            icon={Eye}
            color="emerald"
            partner="NVIDIA EMBEDDED"
            delay={0.3}
          />
        </div>

        {/* Secondary Grid: Infrastructure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
           <TechCard
            title={dict.tech.cards.edge.title}
            description={dict.tech.cards.edge.desc}
            icon={Server}
            color="blue"
            partner="SIEMENS EDGE"
            delay={0.4}
          />
           <TechCard
            title={dict.tech.cards.security.title}
            description={dict.tech.cards.security.desc}
            icon={ShieldCheck}
            color="rose"
            partner="SIEMENS SECURITY"
            delay={0.5}
          />
           <TechCard
            title={dict.tech.cards.db.title}
            description={dict.tech.cards.db.desc}
            icon={Database}
            color="emerald"
            partner="TIME SERIES DB"
            delay={0.6}
          />
        </div>

        {/* Deep Dive Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Workflow className="text-sky-400" />
                    {dict.tech.deepDive.title}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-transparent rounded-full mb-6"></div>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {dict.tech.deepDive.desc}
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/40 border border-slate-800 p-4 rounded-lg flex items-center gap-4">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <div>
                        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">CYCLE TIME</div>
                        <div className="text-xl font-bold text-white">12ms (Isochronous)</div>
                    </div>
                </div>
                <div className="bg-black/40 border border-slate-800 p-4 rounded-lg flex items-center gap-4">
                    <Network className="w-8 h-8 text-purple-400" />
                    <div>
                        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">PROTOCOL</div>
                        <div className="text-xl font-bold text-white">PROFINET IRT</div>
                    </div>
                </div>
            </div>
          </div>
          
          <div className="relative h-[300px] lg:h-[400px] bg-black/20 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
             {/* Decorazioni UI per il visore - SPOSTATE FUORI DAL FLUSSO CENTRALE MA DENTRO IL CONTENITORE RELATIVO */}
             <div className="absolute top-4 left-4 z-20 text-[10px] font-mono text-emerald-500/80 bg-black/40 px-2 py-1 rounded border border-emerald-500/20 backdrop-blur-sm">
                CAM_FEED_01 // LIVE
             </div>
             <div className="absolute bottom-4 right-4 z-20 text-[10px] font-mono text-emerald-500/80 bg-black/40 px-2 py-1 rounded border border-emerald-500/20 backdrop-blur-sm">
                720p // 120FPS
             </div>
             
             <div className="flex-1 flex items-center justify-center relative z-10 p-8">
                 <VisionSystem />
             </div>
             
             {/* Scanlines */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
