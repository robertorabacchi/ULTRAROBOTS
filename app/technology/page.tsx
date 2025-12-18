'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Bot, Cpu, Eye, Server, Zap, Workflow } from 'lucide-react';
import TechCard from '@/components/ui/TechCard';
import VisionSystem from '@/components/ui/VisionSystem';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function TechnologyPage() {
  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 mb-6"
          >
            STACK TECNOLOGICO
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            L'eccellenza dell'hardware industriale potenziata da algoritmi generativi.
          </p>
        </div>

        {/* Partners & Core Tech */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <TechCard
            title="Meccatronica Avanzata"
            description="Bracci antropomorfi ad alta velocità per saldatura e verniciatura. Precisione assoluta e ripetibilità garantita."
            icon={Bot}
            color="cyan"
            partner="KAWASAKI"
            delay={0.1}
          />
          <TechCard
            title="Architettura PLC"
            description="Sistemi di controllo logico programmabile per la gestione sincronizzata di intere linee produttive."
            icon={Cpu}
            color="blue"
            partner="SIEMENS"
            delay={0.2}
          />
          <TechCard
            title="Computer Vision"
            description="Sistemi ottici per il picking da cassone e controllo qualità ultra-decimale con apprendimento profondo."
            icon={Eye}
            color="emerald"
            partner="PROPRIETARY AI"
            delay={0.3}
          />
        </div>

        {/* Interactive / Demo Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Il Cervello Digitale
            </h2>
            <p className="text-slate-400 leading-relaxed">
              La nostra infrastruttura non si limita a muovere macchine. Ascolta, impara e ottimizza.
              Utilizziamo reti neurali per analizzare i dati dei sensori in tempo reale, prevedendo anomalie
              e ottimizzando i percorsi dei robot <strong>Kawasaki</strong> millisecondo per millisecondo.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-cyan-400">
                <Zap className="w-5 h-5" />
                <span>Latenza &lt; 5ms su bus Siemens Profinet</span>
              </li>
              <li className="flex items-center gap-3 text-cyan-400">
                <Server className="w-5 h-5" />
                <span>Cloud ibrido per storicizzazione rapportini</span>
              </li>
              <li className="flex items-center gap-3 text-cyan-400">
                <Workflow className="w-5 h-5" />
                <span>Orchestratore AI autonomo</span>
              </li>
            </ul>
          </div>
          
          <div className="flex-1 flex justify-center">
            <VisionSystem />
          </div>
        </div>
      </div>
    </main>
  );
}








