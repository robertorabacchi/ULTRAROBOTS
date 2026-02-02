'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { 
  Cpu, Box, Layers, Scan, Target, Zap, Database, 
  Shield, Wifi, Server, Eye, ArrowRight, CheckCircle2,
  AlertTriangle, Binary, Crosshair, Activity
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

// ===== ANIMAZIONE 1: Point Cloud vs Depth Map =====
function PointCloudAnimation() {
  const [points, setPoints] = useState<Array<{x: number, y: number, z: number, id: number}>>([]);
  
  useEffect(() => {
    const newPoints = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 50
    }));
    setPoints(newPoints);
  }, []);

  return (
    <div className="relative w-full h-full bg-black/40 rounded-xl border border-cyan-500/30 overflow-hidden">
      {/* Grid 3D */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center bottom'
        }}
      />
      
      {/* Point Cloud simulato */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-32" style={{ perspective: '200px' }}>
          {points.map((point, i) => (
            <motion.div
              key={point.id}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                boxShadow: '0 0 6px rgba(34,211,238,0.8)'
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                delay: i * 0.05,
                repeat: Infinity
              }}
            />
          ))}
        </div>
      </div>

      {/* Label */}
      <div className="absolute top-3 left-3 text-[9px] font-mono text-cyan-400 bg-black/60 px-2 py-1 rounded border border-cyan-500/30">
        PLY FLOAT32 // LIVE
      </div>
      <div className="absolute bottom-3 right-3 text-[9px] font-mono text-emerald-400">
        5.1M POINTS
      </div>
    </div>
  );
}

// ===== ANIMAZIONE 2: Pipeline Flow YOLO → SAM → 6D =====
function PipelineAnimation() {
  const stages = [
    { name: 'YOLO', color: 'sky', icon: Eye, desc: 'Detection' },
    { name: 'SAM 2', color: 'purple', icon: Crosshair, desc: 'Segmentation' },
    { name: '6D POSE', color: 'emerald', icon: Box, desc: 'Transform' }
  ];

  return (
    <div className="relative w-full h-full bg-black/40 rounded-xl border border-purple-500/30 p-6 overflow-hidden">
      {/* Scanline */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,1)]"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      <div className="flex items-center justify-between h-full gap-2">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.3, duration: 0.5 }}
              className={`
                flex flex-col items-center gap-2 p-3 rounded-lg border
                ${stage.color === 'sky' ? 'border-sky-500/40 bg-sky-950/30' : ''}
                ${stage.color === 'purple' ? 'border-purple-500/40 bg-purple-950/30' : ''}
                ${stage.color === 'emerald' ? 'border-emerald-500/40 bg-emerald-950/30' : ''}
              `}
            >
              <stage.icon className={`w-6 h-6 
                ${stage.color === 'sky' ? 'text-sky-400' : ''}
                ${stage.color === 'purple' ? 'text-purple-400' : ''}
                ${stage.color === 'emerald' ? 'text-emerald-400' : ''}
              `} />
              <span className="text-[10px] font-mono font-bold text-white">{stage.name}</span>
              <span className="text-[8px] text-slate-500">{stage.desc}</span>
            </motion.div>
            
            {i < stages.length - 1 && (
              <motion.div
                animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              >
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Matrix overlay */}
      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-purple-400/60">
        T = [R|t] ∈ SE(3)
      </div>
    </div>
  );
}

// ===== ANIMAZIONE 3: Hardware Monitor =====
function HardwareMonitor() {
  const [gpuTemp, setGpuTemp] = useState(42);
  const [vram, setVram] = useState(78);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGpuTemp(prev => Math.min(65, Math.max(38, prev + (Math.random() - 0.5) * 4)));
      setVram(prev => Math.min(95, Math.max(60, prev + (Math.random() - 0.5) * 8)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-black/40 rounded-xl border border-emerald-500/30 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono font-bold text-emerald-400">EDGE NODE</span>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded animate-pulse">
          ONLINE
        </span>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-1">
            <span>GPU TEMP</span>
            <span className={gpuTemp > 55 ? 'text-amber-400' : 'text-emerald-400'}>{gpuTemp.toFixed(0)}°C</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${gpuTemp > 55 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              animate={{ width: `${(gpuTemp / 80) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-1">
            <span>VRAM 8GB</span>
            <span className="text-sky-400">{vram.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-sky-500"
              animate={{ width: `${vram}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-between text-[9px] font-mono">
          <span className="text-slate-500">RTX 3050</span>
          <span className="text-cyan-400 flex items-center gap-1">
            <Wifi className="w-3 h-3" /> WireGuard
          </span>
        </div>
      </div>
    </div>
  );
}

// ===== ANIMAZIONE 4: Precision Comparison =====
function PrecisionAnimation() {
  return (
    <div className="relative w-full h-full bg-black/40 rounded-xl border border-amber-500/30 p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-amber-400" />
        <span className="text-[10px] font-mono font-bold text-amber-400">PRECISION TEST</span>
      </div>

      <div className="grid grid-cols-2 gap-3 h-[calc(100%-2rem)]">
        {/* TIFF - Legacy */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-3 flex flex-col">
          <span className="text-[9px] font-mono text-red-400 mb-2">TIFF (Legacy)</span>
          <div className="flex-1 flex items-center justify-center relative">
            <motion.div
              className="w-8 h-8 border-2 border-red-500/50 rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-2 h-2 bg-red-400 rounded-full"
              animate={{ 
                x: [0, 3, -2, 4, 0],
                y: [0, -2, 3, -1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <span className="text-[10px] font-mono text-red-400 text-center">±0.5mm</span>
        </div>

        {/* PLY - Native */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3 flex flex-col">
          <span className="text-[9px] font-mono text-emerald-400 mb-2">PLY (Native)</span>
          <div className="flex-1 flex items-center justify-center relative">
            <motion.div
              className="w-8 h-8 border-2 border-emerald-500/50 rounded-full"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </div>
          <span className="text-[10px] font-mono text-emerald-400 text-center">±0.001mm</span>
        </div>
      </div>
    </div>
  );
}

// ===== ANIMAZIONE 5: KPI Dashboard =====
function KPIDashboard() {
  const kpis = [
    { label: 'ZERO FERMI', value: '0', unit: 'downtime', color: 'emerald' },
    { label: 'PRECISIONE', value: '0.001', unit: 'mm', color: 'cyan' },
    { label: 'PUNTI 3D', value: '5.1M', unit: 'float32', color: 'purple' }
  ];

  return (
    <div className="relative w-full h-full bg-black/40 rounded-xl border border-cyan-500/30 p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-cyan-400" />
        <span className="text-[10px] font-mono font-bold text-cyan-400">PERFORMANCE KPI</span>
      </div>

      <div className="space-y-3">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center justify-between"
          >
            <span className="text-[9px] font-mono text-slate-500">{kpi.label}</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-bold font-mono
                ${kpi.color === 'emerald' ? 'text-emerald-400' : ''}
                ${kpi.color === 'cyan' ? 'text-cyan-400' : ''}
                ${kpi.color === 'purple' ? 'text-purple-400' : ''}
              `}>{kpi.value}</span>
              <span className="text-[8px] text-slate-600">{kpi.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-2 right-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-500/50" />
      </div>
    </div>
  );
}

// ===== SEZIONE CONTENUTO =====
interface ContentSectionProps {
  tag: string;
  tagColor: 'cyan' | 'purple' | 'emerald' | 'amber' | 'rose';
  title: string;
  children: React.ReactNode;
  animation: React.ReactNode;
  reverse?: boolean;
  delay?: number;
}

function ContentSection({ tag, tagColor, title, children, animation, reverse = false, delay = 0 }: ContentSectionProps) {
  const colorClasses = {
    cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/50',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-950/50',
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/50',
    amber: 'text-amber-400 border-amber-500/30 bg-amber-950/50',
    rose: 'text-rose-400 border-rose-500/30 bg-rose-950/50'
  };

  const borderColors = {
    cyan: 'border-cyan-500',
    purple: 'border-purple-500',
    emerald: 'border-emerald-500',
    amber: 'border-amber-500',
    rose: 'border-rose-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className={`order-2 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="h-[280px] md:h-[320px]">
          {animation}
        </div>
      </div>

      <div className={`order-1 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className={`border-l-4 ${borderColors[tagColor]} pl-6`}>
          <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded border ${colorClasses[tagColor]} inline-block mb-4`}>
            {tag}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-6 uppercase">
            {title}
          </h2>
          <div className="text-slate-400 leading-relaxed space-y-4 text-sm md:text-base">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ===== TABELLA CONFRONTO =====
function ComparisonTable() {
  const rows = [
    { feature: 'Precisione XYZ', legacy: '±0.1−0.5 mm', native: '±0.001 mm', impact: 'TIFF perde dettaglio filetto' },
    { feature: 'Riflessi Ottone', legacy: 'Generano "buchi" 2D', native: 'Filtrati via AI spaziale', impact: 'PLY ricostruisce geometria' },
    { feature: 'Velocità', legacy: 'Lenta (conversione)', native: 'Real-time (diretto)', impact: 'Ciclo più veloce' },
    { feature: 'Affidabilità', legacy: 'Bassa (calibrazione)', native: 'Alta (dato assoluto)', impact: 'Meno fermi macchina' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-x-auto"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-3 px-4 text-slate-400 font-mono text-xs uppercase tracking-wider">Caratteristica</th>
            <th className="text-left py-3 px-4 text-red-400 font-mono text-xs uppercase tracking-wider">TIFF (Legacy)</th>
            <th className="text-left py-3 px-4 text-emerald-400 font-mono text-xs uppercase tracking-wider">PLY (Vero 3D)</th>
            <th className="text-left py-3 px-4 text-amber-400 font-mono text-xs uppercase tracking-wider">Impatto Ottone</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors"
            >
              <td className="py-3 px-4 text-white font-medium">{row.feature}</td>
              <td className="py-3 px-4 text-red-300/80 font-mono text-xs">{row.legacy}</td>
              <td className="py-3 px-4 text-emerald-300 font-mono text-xs">{row.native}</td>
              <td className="py-3 px-4 text-slate-400 text-xs">{row.impact}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

// ===== MAIN PAGE =====
export default function BinPickingPage() {
  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden pt-24 pb-20">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* ===== HERO HEADER ===== */}
        <div className="mb-24 border-l-4 border-sky-500 pl-6 ml-4 md:ml-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-[10px] font-mono font-bold text-sky-400 tracking-[0.2em] uppercase bg-sky-950/50 px-3 py-1 rounded border border-sky-500/30">
                AI-NATIVE VISION
              </span>
              <div className="h-[1px] w-20 bg-sky-500/30 hidden md:block"></div>
              <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                Formati Dati · Precisione · Integrità 3D
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 uppercase leading-[0.95]">
              SISTEMA DI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 filter drop-shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                BIN PICKING
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-light leading-relaxed">
              <span className="text-white font-semibold">Evoluzione del Bin Picking Robotico.</span>{' '}
              Analisi dell&apos;integrità del dato e architettura di controllo per{' '}
              <span className="text-amber-400 font-bold">componenti in ottone</span>.
            </p>
          </motion.div>
        </div>

        {/* ===== SEZIONE 1: IL CAMBIO DI PARADIGMA ===== */}
        <div className="mb-32">
          <ContentSection
            tag="SYS_01 — PARADIGM SHIFT"
            tagColor="cyan"
            title="Il Cambio di Paradigma"
            animation={<PointCloudAnimation />}
            delay={0.1}
          >
            <p>
              Nel <strong className="text-white">2026</strong>, la distinzione tra un sistema di visione 
              &quot;funzionante&quot; e uno &quot;performante&quot; risiede nella{' '}
              <strong className="text-cyan-400">gestione nativa del dato spaziale</strong>.
            </p>
            <p>
              Il passaggio dai sistemi <span className="text-red-400 font-mono text-sm">Legacy</span> (basati su mappe di profondità 2D) 
              ai sistemi <span className="text-emerald-400 font-mono text-sm">AI-Native</span> (basati su Point Cloud float32) 
              non è solo una questione di file, ma di{' '}
              <strong className="text-white">integrità della catena di comando del robot</strong>.
            </p>
            <p className="text-slate-500 italic border-l-2 border-slate-700 pl-4 mt-4">
              Nella mia esperienza in officina, ho identificato una criticità fondamentale: 
              molti sistemi vengono spacciati per &quot;Intelligenza Artificiale avanzata&quot; quando 
              utilizzano scorciatoie tecniche che ne limitano la precisione su materiali riflettenti come l&apos;ottone.
            </p>
          </ContentSection>
        </div>

        {/* ===== SEZIONE 2: TIFF VS PLY ===== */}
        <div className="mb-32">
          <ContentSection
            tag="SYS_02 — DATA INTEGRITY"
            tagColor="amber"
            title="TIFF vs PLY: La Verità sui Formati"
            animation={<PrecisionAnimation />}
            reverse={true}
            delay={0.2}
          >
            <p>
              Esiste una tendenza commerciale a &quot;spacciare&quot; per Bin Picking 3D avanzato 
              sistemi che operano in realtà in <span className="text-red-400 font-bold">2.5D</span>.
            </p>
            
            <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4 my-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-mono text-xs uppercase tracking-wider">La Truffa del TIFF Multilayer</span>
              </div>
              <p className="text-sm text-slate-400">
                Il TIFF contiene una Depth Map dove il robot non &quot;vede&quot; lo spazio, 
                vede un&apos;illusione ottica che deve essere convertita tramite back-projection.
                Questo introduce errori fino a <strong className="text-red-400">±0.5 mm</strong>.
              </p>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4 my-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider">La Mia Scelta: PLY + PNG</span>
              </div>
              <p className="text-sm text-slate-400">
                Opero esclusivamente con formato <strong className="text-emerald-400">PLY (Point Cloud Nativo)</strong>{' '}
                accoppiato a PNG. Il sistema non &quot;indovina&quot; la profondità, 
                la legge in coordinate X,Y,Z Float32 con precisione <strong className="text-emerald-400">0.001 mm</strong>.
              </p>
            </div>
          </ContentSection>

          {/* Formula matematica */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-xl p-6 text-center"
          >
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Back-Projection Formula (TIFF Legacy)</span>
            <div className="text-xl md:text-2xl font-mono text-slate-300 mt-3">
              x<sub>3d</sub> = f<sub>x</sub>(x<sub>px</sub> - c<sub>x</sub>) · z
            </div>
            <p className="text-xs text-slate-500 mt-2">Conversione forzata che introduce errori sistematici</p>
          </motion.div>
        </div>

        {/* ===== SEZIONE 3: PIPELINE AI ===== */}
        <div className="mb-32">
          <ContentSection
            tag="SYS_03 — AI PIPELINE"
            tagColor="purple"
            title="YOLO + SAM 2 + 6D Pose"
            animation={<PipelineAnimation />}
            delay={0.3}
          >
            <p>
              Per garantire un picking fluido dei corpi valvola, ho implementato una pipeline 
              che separa il <strong className="text-white">riconoscimento visivo</strong> dalla{' '}
              <strong className="text-purple-400">logica spaziale</strong>.
            </p>
            
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-sky-400">YOLO (Detection):</strong> Scansiona l&apos;intero cassone in millisecondi, identificando le valvole e filtrando il rumore.</span>
              </li>
              <li className="flex items-start gap-3">
                <Crosshair className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-purple-400">SAM 2 (Segmentation):</strong> Isola chirurgicamente ogni valvola, distinguendo il pezzo reale dai riflessi &quot;fantasma&quot;.</span>
              </li>
              <li className="flex items-start gap-3">
                <Box className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-emerald-400">6D Pose Estimation:</strong> Calcola la matrice di trasformazione per il robot Kawasaki.</span>
              </li>
            </ul>
          </ContentSection>

          {/* Matrice di trasformazione */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-purple-950/20 border border-purple-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Binary className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">Transformation Matrix SE(3)</span>
            </div>
            <div className="font-mono text-sm md:text-base text-slate-300 text-center leading-loose bg-black/30 rounded-lg p-4 overflow-x-auto">
              <pre className="inline-block text-left">
{`T = ┌                              ┐
    │  r₁₁  r₁₂  r₁₃  │  x  │
    │  r₂₁  r₂₂  r₂₃  │  y  │
    │  r₃₁  r₃₂  r₃₃  │  z  │
    │   0    0    0   │  1  │
    └                              ┘`}
              </pre>
            </div>
            <p className="text-xs text-slate-500 text-center mt-3">
              Orientamento perfetto del robot, eliminando collisioni e scivolamenti
            </p>
          </motion.div>
        </div>

        {/* ===== TABELLA CONFRONTO ===== */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-l-4 border-amber-500 pl-6 mb-8"
          >
            <span className="text-[10px] font-mono font-bold text-amber-400 tracking-[0.2em] uppercase bg-amber-950/50 px-3 py-1 rounded border border-amber-500/30">
              BENCHMARK
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-4 uppercase">
              Confronto Prestazionale: Picking di Ottone
            </h2>
          </motion.div>
          
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden">
            <ComparisonTable />
          </div>
        </div>

        {/* ===== SEZIONE 4: ARCHITETTURA ===== */}
        <div className="mb-32">
          <ContentSection
            tag="SYS_04 — FIELD ARCHITECTURE"
            tagColor="emerald"
            title="Architettura di Campo e Monitoraggio"
            animation={<HardwareMonitor />}
            reverse={true}
            delay={0.4}
          >
            <p>
              La soluzione è progettata per l&apos;<strong className="text-white">officina reale</strong>, 
              non per un laboratorio asettico. Sistema resiliente e trasparente con{' '}
              <strong className="text-emerald-400">Single Source of Truth (SSOT)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-black/40 border border-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mb-2">
                  <Cpu className="w-3 h-3" /> COMPUTE
                </div>
                <p className="text-sm text-white">Dell 3020 + RTX 3050</p>
                <p className="text-xs text-slate-500">NVME 500GB + SSD 1TB</p>
              </div>
              <div className="bg-black/40 border border-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mb-2">
                  <Wifi className="w-3 h-3" /> NETWORK
                </div>
                <p className="text-sm text-white">5 porte dedicate</p>
                <p className="text-xs text-slate-500">WireGuard → AWS</p>
              </div>
            </div>

            <p className="mt-4 text-sm">
              Tramite <span className="text-cyan-400 font-mono">RustDesk</span> e VPN, 
              posso intervenire in tempo reale sulla macchina. 
              La dashboard avvisa preventivamente se il sistema scalda oltre la soglia di sicurezza.
            </p>
          </ContentSection>
        </div>

        {/* ===== SEZIONE 5: CONCLUSIONI ===== */}
        <div className="mb-20">
          <ContentSection
            tag="SYS_05 — CONCLUSION"
            tagColor="cyan"
            title="Il Valore della Trasparenza"
            animation={<KPIDashboard />}
            delay={0.5}
          >
            <p className="text-lg">
              <strong className="text-white">IRCC TITAN</strong> visione non è un &quot;trucco&quot; bidimensionale, 
              ma una <strong className="text-cyan-400">realtà matematica</strong>.
            </p>

            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-emerald-400">Zero fermi macchina</strong> dovuti a riflessi dell&apos;ottone</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-cyan-400">Precisione chirurgica</strong> nel prelievo di pezzi incastrati</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-purple-400">Monitoraggio totale</strong> dei KPI tramite dashboard dedicata</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-amber-400">Predisposto Gen 3</strong> per scalare a 5.1 MP</span>
              </div>
            </div>
          </ContentSection>
        </div>

        {/* ===== QUOTE FINALE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-purple-950/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-12 text-center"
        >
          <blockquote className="text-lg md:text-xl lg:text-2xl text-white font-light leading-relaxed max-w-4xl mx-auto">
            &ldquo;Presento ai miei clienti un sistema dove la visione non è un&apos;approssimazione 
            bidimensionale, ma una <strong className="text-cyan-400">certezza matematica</strong>. 
            La combinazione di hardware solido e pipeline AI d&apos;avanguardia permette di ottenere{' '}
            <strong className="text-emerald-400">zero fermi macchina</strong>, 
            precisione millimetrica nel prelievo e un controllo totale del processo.&rdquo;
          </blockquote>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
            <Shield className="w-6 h-6 text-cyan-400" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
          </div>
          
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-4">
            E.C. Service S.r.L. · Guiglia · Modena · Italy
          </p>
        </motion.div>

        {/* ===== FOOTER ===== */}
        <div className="border-t border-slate-800/50 mt-20 pt-6 flex justify-between items-center">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            IRCC TITAN // BIN PICKING AI-NATIVE
          </p>
          <p className="text-[10px] font-mono text-slate-600">
            PLY + YOLO + SAM 2 + 6D POSE
          </p>
        </div>
      </div>
    </main>
  );
}
