'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { 
  Mic, Brain, Zap, Shield, Network, Database, 
  Cpu, Radio, Lock, MessageSquare, Activity, 
  Code, Server, Cloud, ArrowRight, CheckCircle2,
  Workflow, Terminal, Eye, Layers
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

interface ArchitectureNode {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  delay: number;
}

interface TechStackItem {
  category: string;
  items: { name: string; role: string; color: string }[];
}

export default function AIRobotBridgePage() {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const architectureNodes: ArchitectureNode[] = [
    {
      id: 'voice',
      title: 'Voice Interface',
      description: 'Deepgram STT con latenza <200ms per comandi real-time',
      icon: Mic,
      color: 'from-purple-500 to-pink-500',
      delay: 0.1
    },
    {
      id: 'ai',
      title: 'AI Translation Layer',
      description: 'GPT-4o converte linguaggio naturale in comandi AS Kawasaki',
      icon: Brain,
      color: 'from-cyan-500 to-blue-500',
      delay: 0.2
    },
    {
      id: 'cloud',
      title: 'Cloud Gateway',
      description: 'Netlify + Ably per messaggistica real-time bidirezionale',
      icon: Cloud,
      color: 'from-emerald-500 to-teal-500',
      delay: 0.3
    },
    {
      id: 'bridge',
      title: 'Local Bridge',
      description: 'Node.js TCP bridge tra cloud e controller F01',
      icon: Network,
      color: 'from-amber-500 to-orange-500',
      delay: 0.4
    },
    {
      id: 'robot',
      title: 'Robot Controller',
      description: 'Kawasaki F01 con CCS safety e linguaggio AS',
      icon: Cpu,
      color: 'from-rose-500 to-red-500',
      delay: 0.5
    }
  ];

  const techStack: TechStackItem[] = [
    {
      category: 'Frontend',
      items: [
        { name: 'Next.js 16', role: 'React Framework', color: 'text-white' },
        { name: 'Tailwind CSS', role: 'UI Styling', color: 'text-cyan-400' },
        { name: 'Framer Motion', role: 'Animations', color: 'text-pink-400' }
      ]
    },
    {
      category: 'AI & Voice',
      items: [
        { name: 'OpenAI GPT-4o', role: 'Natural Language', color: 'text-emerald-400' },
        { name: 'Deepgram', role: 'Speech-to-Text', color: 'text-purple-400' },
        { name: 'Whisper API', role: 'Voice Recognition', color: 'text-blue-400' }
      ]
    },
    {
      category: 'Infrastructure',
      items: [
        { name: 'Netlify', role: 'Serverless Hosting', color: 'text-teal-400' },
        { name: 'Ably Realtime', role: 'Message Bus', color: 'text-orange-400' },
        { name: 'Node.js', role: 'Local Bridge', color: 'text-green-400' }
      ]
    },
    {
      category: 'Robotics',
      items: [
        { name: 'Kawasaki F01', role: 'Controller', color: 'text-red-400' },
        { name: 'AS Language', role: 'Robot Programming', color: 'text-yellow-400' },
        { name: 'CCS Safety', role: 'Cubic Command Space', color: 'text-rose-400' }
      ]
    }
  ];

  const safetyFeatures = [
    {
      title: 'AI Command Validation',
      description: 'Filtro software che blocca comandi pericolosi prima dell\'esecuzione',
      icon: Shield,
      color: 'emerald'
    },
    {
      title: 'CCS Hardware Protection',
      description: 'Geofencing hardware del controller F01 per limiti spaziali',
      icon: Lock,
      color: 'blue'
    },
    {
      title: 'Bidirectional Feedback',
      description: 'Il robot comunica errori e collisioni alla dashboard in real-time',
      icon: Activity,
      color: 'amber'
    }
  ];

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden pt-24 pb-20">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <div className="mb-32 border-l-4 border-cyan-500 pl-6 ml-4 md:ml-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase bg-cyan-950/50 px-3 py-1 rounded border border-cyan-500/30">
                AI-POWERED ROBOTICS
              </span>
              <div className="h-[1px] w-20 bg-cyan-500/30"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
              AI-ROBOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">BRIDGE</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-light leading-relaxed">
              L'evoluzione della robotica <span className="text-white font-bold">Kawasaki</span> verso l'<span className="text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">intelligenza artificiale</span>. 
              Controllo vocale, interazione naturale e sicurezza industriale in un'unica piattaforma.
            </p>
            
            {/* Key Benefits Pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-500/30 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-mono text-emerald-400">Latenza &lt;200ms</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-950/30 border border-purple-500/30 px-4 py-2 rounded-full">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-mono text-purple-400">Comandi Vocali</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-950/30 border border-blue-500/30 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-mono text-blue-400">CCS Safety</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Architecture Flow */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Layers className="text-cyan-400" />
              Architettura Ibrida Cloud-Local
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent rounded-full mb-4"></div>
            <p className="text-slate-400 text-lg max-w-3xl">
              Un modello distribuito che separa l'intelligenza artificiale (cloud) dall'esecuzione fisica (locale), 
              garantendo sicurezza, scalabilità e risposte in tempo reale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {architectureNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: node.delay }}
                className="relative group"
              >
                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 h-full">
                  {/* Icon with Gradient */}
                  <div className={clsx(
                    "w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4",
                    `bg-gradient-to-br ${node.color}`
                  )}>
                    <node.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {node.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {node.description}
                  </p>

                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-slate-700 flex items-center justify-center">
                    <span className="text-xs font-bold text-cyan-400">{index + 1}</span>
                  </div>
                </div>

                {/* Arrow Connector (not on last item) */}
                {index < architectureNodes.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-cyan-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-32 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Code className="text-purple-400" />
              Stack Tecnologico
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full mb-4"></div>
            <p className="text-slate-400 text-lg">
              Tecnologie moderne e affidabili per un sistema di controllo robotico di nuova generazione
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="space-y-4"
              >
                <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-700 pb-2">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <div key={i} className="group">
                      <div className={clsx("font-bold text-base", item.color)}>
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {item.role}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Safety Features */}
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="text-emerald-400" />
              Sicurezza e Validazione
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mb-4"></div>
            <p className="text-slate-400 text-lg max-w-3xl">
              <span className="text-white font-bold">Safety First:</span> Doppio livello di protezione hardware e software 
              per garantire operazioni sicure in ambiente industriale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safetyFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={clsx(
                  "bg-slate-900/60 backdrop-blur-md border rounded-xl p-6 hover:shadow-2xl transition-all duration-300",
                  feature.color === 'emerald' && 'border-emerald-500/30 hover:border-emerald-500',
                  feature.color === 'blue' && 'border-blue-500/30 hover:border-blue-500',
                  feature.color === 'amber' && 'border-amber-500/30 hover:border-amber-500'
                )}
              >
                <div className={clsx(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  feature.color === 'emerald' && 'bg-emerald-500/10',
                  feature.color === 'blue' && 'bg-blue-500/10',
                  feature.color === 'amber' && 'bg-amber-500/10'
                )}>
                  <feature.icon className={clsx(
                    "w-6 h-6",
                    feature.color === 'emerald' && 'text-emerald-400',
                    feature.color === 'blue' && 'text-blue-400',
                    feature.color === 'amber' && 'text-amber-400'
                  )} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-World Application */}
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 md:p-12 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal className="text-cyan-400" />
                Caso d'Uso: Kawasaki BX300L
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Depallettizzazione Intelligente</h4>
                    <p className="text-slate-400 text-sm">
                      Visione AI + comandi vocali per gestire pile di scatole miste senza programmazione fissa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Manutenzione Predittiva</h4>
                    <p className="text-slate-400 text-sm">
                      L'AI analizza vibrazioni e correnti, prevedendo guasti prima che accadano
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Interfaccia Naturale</h4>
                    <p className="text-slate-400 text-sm">
                      Operatori possono comandare il robot parlando, senza conoscere il linguaggio AS
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="space-y-4">
              <div className="bg-black/40 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Response Time</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">&lt;200ms</div>
                <div className="text-sm text-slate-400">Dal comando vocale all'esecuzione</div>
              </div>

              <div className="bg-black/40 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Setup Time</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">-70%</div>
                <div className="text-sm text-slate-400">Riduzione tempi di programmazione</div>
              </div>

              <div className="bg-black/40 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Accuracy</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">99.2%</div>
                <div className="text-sm text-slate-400">Precisione riconoscimento comandi</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto per il Futuro della Robotica?
            </h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Trasforma i tuoi robot industriali in sistemi intelligenti con controllo vocale e AI. 
              Contattaci per una demo personalizzata.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              Richiedi Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

