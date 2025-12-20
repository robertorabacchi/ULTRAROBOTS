'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface TechCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'cyan' | 'blue' | 'emerald' | 'rose';
  partner?: string;
  delay?: number;
}

export default function TechCard({ title, description, icon: Icon, color, partner, delay = 0 }: TechCardProps) {
  const colors = {
    cyan: 'border-[#1a1a1a]',
    blue: 'border-[#1a1a1a]',
    emerald: 'border-[#1a1a1a]',
    rose: 'border-[#1a1a1a]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={clsx(
        'relative overflow-hidden rounded-xl border p-8 group transition-all duration-300',
        'bg-slate-900/40 backdrop-blur-md',
        color === 'cyan' && 'border-sky-500/30 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]',
        color === 'blue' && 'border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
        color === 'emerald' && 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
        color === 'rose' && 'border-rose-500/30 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]'
      )}
    >
      {/* Gradient Overlay on Hover */}
      <div className={clsx(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none",
        color === 'cyan' && 'bg-gradient-to-br from-sky-500/10 to-transparent',
        color === 'blue' && 'bg-gradient-to-br from-blue-500/10 to-transparent',
        color === 'emerald' && 'bg-gradient-to-br from-emerald-500/10 to-transparent',
        color === 'rose' && 'bg-gradient-to-br from-rose-500/10 to-transparent'
      )} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex justify-between items-start">
            <span className={clsx(
              "text-[9px] font-mono uppercase tracking-[0.2em] border px-2 py-1 rounded",
              color === 'cyan' && 'text-sky-400 border-sky-500/30',
              color === 'blue' && 'text-blue-400 border-blue-500/30',
              color === 'emerald' && 'text-emerald-400 border-emerald-500/30',
              color === 'rose' && 'text-rose-400 border-rose-500/30'
            )}>
                SYS_0{delay * 10 || 1} // {partner || 'NATIVE'}
            </span>
            <Icon className={clsx(
              "w-8 h-8 stroke-1",
              color === 'cyan' && 'text-sky-400',
              color === 'blue' && 'text-blue-400',
              color === 'emerald' && 'text-emerald-400',
              color === 'rose' && 'text-rose-400'
            )} />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed font-light mt-auto">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

