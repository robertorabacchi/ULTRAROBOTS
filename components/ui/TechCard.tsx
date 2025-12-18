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
        'border border-[#1a1a1a] p-8 group relative bg-black hover:border-[#333] transition-colors',
        colors[color]
      )}
    >
      {/* Hairline Grid Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex flex-col h-full">
        <div className="mb-8">
            <span className="text-[9px] font-mono text-[#444] uppercase tracking-[0.2em] block mb-4">
                MODULE_0{delay * 10 || 1} // {partner || 'SYSTEM'}
            </span>
            <Icon className="w-6 h-6 text-white stroke-[1.5]" />
        </div>
        
        <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
          {title}
        </h3>
        
        <p className="text-[#666] text-sm leading-relaxed font-light mt-auto">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

