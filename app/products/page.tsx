'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Battery, MapPin, Clock, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

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
}

export default function ProductsPage() {
  const [robots, setRobots] = useState<RobotStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports?type=robots')
      .then(res => res.json())
      .then(data => {
        setRobots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching robots:', err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-emerald-400 border-emerald-500/30';
      case 'maintenance': return 'text-amber-400 border-amber-500/30';
      case 'idle': return 'text-slate-400 border-slate-500/30';
      case 'error': return 'text-red-400 border-red-500/30';
      default: return 'text-slate-400 border-slate-500/30';
    }
  };

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500 mb-6"
          >
            FLEET STATUS
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Monitoraggio in tempo reale della flotta robotica ULTRAROBOTS
          </p>
        </div>

        {/* Robots Grid */}
        {loading ? (
          <div className="text-center text-slate-400">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            <p className="mt-4">Caricamento dati...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {robots.map((robot, index) => (
              <motion.div
                key={robot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-black border ${getStatusColor(robot.status)} rounded-sm p-6 hover:border-cyan-500/50 transition-all duration-300`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-mono font-bold text-white mb-1">
                      {robot.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-mono">{robot.model}</p>
                  </div>
                  <div className={`px-3 py-1 border ${getStatusColor(robot.status)} text-xs font-mono uppercase rounded-sm`}>
                    {robot.status}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Battery className="w-4 h-4" />
                      <span className="text-sm font-mono">Battery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${robot.battery > 70 ? 'bg-emerald-500' : robot.battery > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${robot.battery}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-white w-12 text-right">{robot.battery}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-mono">Location</span>
                    </div>
                    <span className="text-xs font-mono text-white">{robot.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-mono">Op. Hours</span>
                    </div>
                    <span className="text-xs font-mono text-white">{robot.operatingHours}h</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-mono">Last Maint.</span>
                    </div>
                    <span className="text-xs font-mono text-white">
                      {new Date(robot.lastMaintenance).toLocaleDateString('it-IT')}
                    </span>
                  </div>
                </div>

                {/* ID Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <p className="text-xs font-mono text-slate-500">
                    ID: {robot.id}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tech Specs */}
        <div className="mt-20 bg-black border border-slate-800 rounded-sm p-8">
          <h2 className="text-2xl font-mono font-bold text-white mb-6">TECH SPECIFICATIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-2 border-cyan-500 pl-4">
              <p className="text-xs font-mono text-slate-400 mb-1">PRECISION</p>
              <p className="text-xl font-mono font-bold text-white">±0.05mm</p>
            </div>
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="text-xs font-mono text-slate-400 mb-1">MAX PAYLOAD</p>
              <p className="text-xl font-mono font-bold text-white">150kg</p>
            </div>
            <div className="border-l-2 border-amber-500 pl-4">
              <p className="text-xs font-mono text-slate-400 mb-1">REACH</p>
              <p className="text-xl font-mono font-bold text-white">2.5m</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

