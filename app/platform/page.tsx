'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Settings, Zap, AlertCircle, RefreshCw, Terminal, Lock, X, FileText } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

interface RobotStatus {
  id: string;
  name: string;
  model: string;
  status: 'operational' | 'maintenance' | 'idle' | 'error';
  battery: number;
  location: string;
  lastMaintenance: string;
  operatingHours: number;
  efficiency?: number;
  temperature?: number;
}

// Dati simulati realistici se l'API fallisce o per demo iniziale
const DEMO_ROBOTS: RobotStatus[] = [
    {
        id: 'KAWA-001',
        name: 'Unit Alpha',
        model: 'Kawasaki BX300L',
        status: 'operational',
        battery: 98,
        location: 'Assembly Line A',
        lastMaintenance: '2023-11-15',
        operatingHours: 12450,
        efficiency: 99.2,
        temperature: 42
    },
    {
        id: 'KAWA-002',
        name: 'Unit Beta',
        model: 'Kawasaki ZX165U',
        status: 'idle',
        battery: 85,
        location: 'Quality Check',
        lastMaintenance: '2023-12-01',
        operatingHours: 8500,
        efficiency: 96.5,
        temperature: 38
    },
    {
        id: 'SIEM-001',
        name: 'Gantry X1',
        model: 'Siemens Linear Axis',
        status: 'maintenance',
        battery: 0,
        location: 'Logistics Hall',
        lastMaintenance: '2023-12-20',
        operatingHours: 3200,
        efficiency: 0,
        temperature: 25
    },
     {
        id: 'ABB-001',
        name: 'Unit Delta',
        model: 'ABB IRB 7600-325/3.1',
        status: 'operational',
        battery: 95,
        location: 'Heavy Payload Sector',
        lastMaintenance: '2023-11-25',
        operatingHours: 14200,
        efficiency: 98.9,
        temperature: 44
    },
    {
        id: 'ABB-002',
        name: 'Unit Epsilon',
        model: 'ABB IRB 6600-175/2.8',
        status: 'operational',
        battery: 91,
        location: 'Weld Shop B',
        lastMaintenance: '2023-10-15',
        operatingHours: 18500,
        efficiency: 97.8,
        temperature: 46
    },
     {
        id: 'KAWA-003',
        name: 'Unit Gamma',
        model: 'Kawasaki CX210L',
        status: 'operational',
        battery: 92,
        location: 'Paint Shop',
        lastMaintenance: '2023-10-30',
        operatingHours: 15600,
        efficiency: 98.8,
        temperature: 45
    }
];

const MOCK_LOGS: Record<string, string[]> = {
    operational: [
        "[INFO] 2023-12-22 08:00:01 | SYSTEM_INIT: Initialization sequence started",
        "[INFO] 2023-12-22 08:00:05 | CONNECT: Profinet connection established with PLC_MASTER",
        "[INFO] 2023-12-22 08:00:10 | MOTOR_CHECK: All axis servos operational within tolerance",
        "[INFO] 2023-12-22 08:05:00 | TASK_START: Job 'WELD_BODY_A1' execution started",
        "[METRIC] 2023-12-22 09:15:00 | CYCLE_TIME: 45.2s (Target: 46.0s) - OPTIMAL",
        "[METRIC] 2023-12-22 10:00:00 | TEMP_CORE: 42°C | TEMP_JOINT_1: 45°C",
        "[INFO] 2023-12-22 11:30:00 | SAFETY: Light curtain breach check... CLEAR",
        "[INFO] 2023-12-22 12:00:00 | SYNC: Data uploaded to Cloud Edge Node"
    ],
    idle: [
        "[INFO] 2023-12-22 08:00:00 | SYSTEM: Powered ON",
        "[INFO] 2023-12-22 08:01:00 | STATE: Entering IDLE mode - Waiting for master command",
        "[INFO] 2023-12-22 09:00:00 | HEARTBEAT: Connection active - Keep-alive signal sent",
        "[WARN] 2023-12-22 10:30:00 | POWER_SAVE: Eco mode activated after 2h inactivity",
        "[INFO] 2023-12-22 12:00:00 | STATUS_CHECK: Ready for operation"
    ],
    maintenance: [
        "[WARN] 2023-12-20 14:00:00 | PREDICTIVE: Vibration anomaly detected on Axis 3 gearbox",
        "[WARN] 2023-12-20 14:05:00 | THRESHOLD: Harmonic drive wear index > 85%",
        "[CRITICAL] 2023-12-20 14:10:00 | AUTO_STOP: Maintenance required flag raised",
        "[INFO] 2023-12-20 14:15:00 | TICKET: Created maintenance ticket #M-9921",
        "[INFO] 2023-12-20 15:00:00 | LOCKOUT: Safety lockout engaged for service"
    ],
    error: [
        "[INFO] 2023-12-22 07:00:00 | SYSTEM_INIT: Booting...",
        "[ERROR] 2023-12-22 07:00:05 | E_STOP: Emergency Stop circuit open",
        "[ERROR] 2023-12-22 07:00:06 | SERVO_FAULT: Axis 2 overload protection triggered",
        "[CRITICAL] 2023-12-22 07:00:10 | HALT: Robot motion disabled immediately",
        "[INFO] 2023-12-22 07:05:00 | REPORT: Error dump saved to black box"
    ]
};

export default function PlatformPage() {
  const [robots] = useState<RobotStatus[]>(DEMO_ROBOTS);
  const { dict } = useLanguage();
  const [selectedRobotLog, setSelectedRobotLog] = useState<RobotStatus | null>(null);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-emerald-400 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]';
      case 'maintenance': return 'text-amber-400 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]';
      case 'idle': return 'text-sky-400 border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.1)]';
      case 'error': return 'text-red-400 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]';
      default: return 'text-slate-400 border-slate-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
      switch (status) {
        case 'operational': return <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{dict.platform.status.online}</span>;
        case 'maintenance': return <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>{dict.platform.status.maint}</span>;
        case 'idle': return <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500"></span>{dict.platform.status.standby}</span>;
        case 'error': return <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>{dict.platform.status.error}</span>;
        default: return 'UNKNOWN';
      }
  };

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden pt-24 pb-20">
      <Scene />
      
      {/* Simulation Banner */}
      <div className="absolute top-20 left-0 w-full bg-amber-500/10 border-y border-amber-500/20 py-1 overflow-hidden z-20">
          <div className="flex justify-center items-center gap-4 text-[10px] font-mono font-bold text-amber-500 tracking-[0.3em] uppercase animate-pulse">
             <AlertCircle className="w-3 h-3" />
             {dict.platform.banner}
             <AlertCircle className="w-3 h-3" />
          </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-12">
        {/* Header */}
        <div className="mb-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="flex flex-col md:flex-row justify-between items-end gap-6"
          >
              <div className="border-l-4 border-sky-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono font-bold text-sky-400 tracking-[0.2em] uppercase bg-sky-950/50 px-3 py-1 rounded border border-sky-500/30">
                        {dict.platform.tag}
                    </span>
                    <div className="h-[1px] w-20 bg-sky-500/30"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
                {dict.platform.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500">{dict.platform.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-slate-400 max-w-2xl font-light leading-relaxed text-lg" suppressHydrationWarning>
                    {dict.platform.subtitlePart1a} <br className="hidden md:block"/> {dict.platform.subtitlePart1b} <strong className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] tracking-wide text-xl">{dict.platform.subtitlePart2}</strong> {dict.platform.subtitlePart3}
                </p>
              </div>

              {/* Demo Mode Badge */}
              <div className="flex gap-4">
                  <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 p-4 rounded-lg min-w-[160px]">
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1 flex items-center gap-2">
                          <Lock className="w-3 h-3" /> SECURITY
                      </div>
                      <div className="text-sm font-bold text-white">
                          {dict.platform.security}
                      </div>
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 p-4 rounded-lg min-w-[160px]">
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1 flex items-center gap-2">
                           <Terminal className="w-3 h-3" /> MODE
                      </div>
                      <div className="text-sm font-bold text-sky-400">
                          {dict.platform.mode}
                      </div>
                  </div>
              </div>
          </motion.div>
        </div>

        {/* Robots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-24">
            {robots.map((robot, index) => (
                <motion.div
                key={robot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={clsx(
                    "bg-slate-900/40 backdrop-blur-md border rounded-xl p-6 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden",
                    getStatusColor(robot.status)
                )}
                >
                {/* Background Scan Effect */}
                <div className={clsx(
                    "absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none transition-opacity group-hover:opacity-10",
                    robot.status === 'operational' ? 'bg-emerald-500' : 'bg-slate-500'
                )}></div>

                {/* Header Card */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-slate-700 px-1.5 rounded bg-black/40">
                                {robot.id}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                            {robot.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1">
                             {robot.model}
                        </p>
                    </div>
                    <div className={clsx(
                        "text-[10px] font-bold font-mono uppercase px-3 py-1.5 rounded-full border bg-black/40",
                        getStatusColor(robot.status)
                    )}>
                        {getStatusBadge(robot.status)}
                    </div>
                </div>

                {/* Core Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                    <div className="bg-black/40 p-3 rounded border border-slate-800">
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase mb-1">
                            <Zap className="w-3 h-3" /> {dict.platform.metrics.efficiency}
                        </div>
                        <div className="text-lg font-bold text-white">
                            {robot.efficiency ? `${robot.efficiency}%` : 'N/A'}
                        </div>
                    </div>
                    <div className="bg-black/40 p-3 rounded border border-slate-800">
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase mb-1">
                            <Clock className="w-3 h-3" /> {dict.platform.metrics.runtime}
                        </div>
                        <div className="text-lg font-bold text-white">
                            {(robot.operatingHours / 1000).toFixed(1)}k <span className="text-xs font-normal text-slate-500">hrs</span>
                        </div>
                    </div>
                </div>

                {/* Detailed List */}
                <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                            <MapPin className="w-3 h-3" />
                            <span>{dict.platform.metrics.zone}</span>
                        </div>
                        <span className="text-xs text-white font-mono">{robot.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                            <Settings className="w-3 h-3" />
                            <span>{dict.platform.metrics.temp}</span>
                        </div>
                        <span className={clsx(
                            "text-xs font-mono",
                            (robot.temperature || 0) > 40 ? 'text-amber-400' : 'text-emerald-400'
                        )}>
                            {robot.temperature}°C
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                            <RefreshCw className="w-3 h-3" />
                            <span>{dict.platform.metrics.lastMaint}</span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono" suppressHydrationWarning>
                             {new Date(robot.lastMaintenance).toLocaleDateString('it-IT')}
                        </span>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-2">
                         <div className="w-full bg-slate-800 h-1.5 w-24 rounded-full overflow-hidden">
                             <div className={clsx("h-full", 
                                robot.battery > 50 ? 'bg-emerald-500' : 'bg-red-500'
                             )} style={{ width: `${robot.battery}%` }}></div>
                         </div>
                         <span className="text-[10px] text-slate-400">{robot.battery}%</span>
                    </div>
                    <button 
                        onClick={() => setSelectedRobotLog(robot)}
                        className="text-[10px] text-sky-400 hover:text-white uppercase font-bold tracking-wider hover:underline transition-all"
                    >
                        {dict.platform.actions.viewLogs} &rarr;
                    </button>
                </div>

                </motion.div>
            ))}
        </div>

        {/* Disclaimer Footer Position */}
        <div className="border-t border-slate-800/50 mt-10 pt-6 flex justify-end">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                {dict.platform.disclaimer}
            </p>
        </div>

      </div>

      {/* Logs Modal */}
      <AnimatePresence>
        {selectedRobotLog && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedRobotLog(null)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#0a0a0a] border border-slate-700 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
                        <div className="flex items-center gap-3">
                            <Terminal className="w-5 h-5 text-sky-400" />
                            <div>
                                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                                    {`${dict.platform.logsModal.title} // ${selectedRobotLog.id}`}
                                </h3>
                                <p className="text-[10px] text-slate-500 font-mono">
                                    {selectedRobotLog.model} • {selectedRobotLog.location}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setSelectedRobotLog(null)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Log Content */}
                    <div className="p-4 h-[400px] overflow-y-auto bg-black font-mono text-xs custom-scrollbar">
                        {MOCK_LOGS[selectedRobotLog.status]?.map((log, i) => {
                            // Color coding logs based on content
                            const isError = log.includes('ERROR') || log.includes('CRITICAL');
                            const isWarn = log.includes('WARN');
                            const isMetric = log.includes('METRIC');
                            
                            return (
                                <div key={i} className={clsx(
                                    "mb-2 border-l-2 pl-3 py-1",
                                    isError ? "border-red-500 text-red-400 bg-red-950/10" :
                                    isWarn ? "border-amber-500 text-amber-400 bg-amber-950/10" :
                                    isMetric ? "border-sky-500 text-sky-300" :
                                    "border-slate-700 text-slate-400"
                                )}>
                                    {log}
                                </div>
                            );
                        })}
                        <div className="animate-pulse text-emerald-500 mt-4">_cursor_active</div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-3 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
                        <button 
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors font-mono"
                            onClick={() => {
                                const logText = MOCK_LOGS[selectedRobotLog.status].join('\n');
                                const blob = new Blob([logText], { type: 'text/plain' });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${selectedRobotLog.id}_logs.txt`;
                                a.click();
                            }}
                        >
                            <FileText className="w-3 h-3" /> {dict.platform.logsModal.export}
                        </button>
                        <button 
                            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs rounded transition-colors font-mono font-bold tracking-wider"
                            onClick={() => setSelectedRobotLog(null)}
                        >
                            {dict.platform.logsModal.close}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
