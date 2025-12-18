'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'TECNOLOGIA', path: '/technology' },
  { name: 'FLEET', path: '/products' },
  { name: 'RAPPORTINI', path: '/reports' },
  { name: 'MANUALI AI', path: '/ai-docs' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-0"
    >
      <div className="w-full bg-black/80 backdrop-blur-md border-b border-[#1a1a1a] px-8 py-4 flex items-center justify-between">
        {/* Brand: Minimal Text */}
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#0066FF]"></div>
            <div className="text-sm font-medium tracking-tight text-white font-sans">
              DIGITAL<span className="text-[#444]">ENGINEERED</span>
            </div>
        </div>
        
        {/* Navigation: Mono Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={clsx(
                    "text-[10px] font-mono uppercase tracking-[0.2em] transition-colors",
                    isActive 
                      ? "text-white" 
                      : "text-[#444] hover:text-white"
                  )}
                >
                  <span className="text-[#0066FF] mr-1">{isActive ? '>' : ''}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action: Border Button */}
        <button className="text-[10px] font-mono uppercase tracking-[0.2em] text-white border border-[#333] px-6 py-2 hover:border-[#0066FF] hover:text-[#0066FF] transition-colors">
          INITIALIZE
        </button>
      </div>
    </motion.nav>
  );
}

