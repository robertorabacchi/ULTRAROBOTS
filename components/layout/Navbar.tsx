'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Re-added this import
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2, Menu, X, LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { logout } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const { dict, locale, setLocale } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Simula un "processing" ad ogni cambio pagina o azione importante
  useEffect(() => {
    setIsProcessing(true);
    const timer = setTimeout(() => setIsProcessing(false), 1500); // 1.5s di "lavoro" finto
    return () => clearTimeout(timer);
  }, [pathname, locale]);

  // Chiudi menu mobile al cambio pagina
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Get current user
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setCurrentUser(data.username);
        }
      })
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  const navItems = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.technology, path: '/technology' },
    { name: dict.nav.platform, path: '/platform' },
    { name: dict.nav.reports, path: '/reports' },
    { name: dict.nav.calendar, path: '/calendar' },
    { name: dict.nav.aiDocs, path: '/ai-docs' },
    { name: dict.nav.contact, path: '/contact' },
  ];

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-0"
      style={{ zIndex: 9999, position: 'fixed' }}
    >
      <div className="w-full bg-slate-950/80 backdrop-blur-md border-b border-sky-900/30 h-16 flex items-center justify-center shadow-lg relative">
        {/* Processing Indicator Overlay (Subtle) */}
        <div
            className={clsx(
                "absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent transition-opacity duration-300",
                isProcessing ? "opacity-100 animate-pulse shadow-[0_0_10px_#0ea5e9]" : "opacity-0"
            )}
        ></div>

        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-full">
          {/* Brand: NEW LOGO */}
          <div className="flex items-center gap-3 shrink-0 w-auto">
              <Logo className="h-8" />
          </div>

          {/* Navigation: Desktop (Responsive spacing) */}
          <ul className="hidden xl:flex items-center gap-3 2xl:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path} className="shrink-0">
                  <Link 
                    href={item.path}
                    className={clsx(
                      "font-sans font-semibold uppercase tracking-[0.18em] transition-all duration-300 whitespace-nowrap",
                      // Slightly larger font
                      "text-[10px]",
                      isActive 
                        ? "text-sky-400 font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" 
                        : "text-slate-400 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                    )}
                    suppressHydrationWarning
                  >
                    <span className="text-sky-500 mr-1 opacity-0 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0 }}>{'>'}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            {/* Action: Desktop (Medium+ Screens) */}
            <div className="hidden md:flex items-center gap-4 justify-end w-auto">
                {/* Current User & Logout */}
                {currentUser && (
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-[10px] font-mono font-bold">
                    <User className="w-3 h-3 text-sky-400" />
                    <span className="text-slate-300">{currentUser}</span>
                    <button
                      onClick={() => logout()}
                      className="ml-2 p-1 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {/* Lang Switcher Badge */}
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-md px-2 py-1 gap-2 text-[10px] font-mono font-bold shadow-inner">
                    <button 
                    onClick={() => setLocale('it')}
                    className={clsx("transition-colors px-1 rounded", locale === 'it' ? "bg-sky-500/20 text-white" : "text-slate-500 hover:text-slate-300")}
                    >
                    IT
                    </button>
                    <span className="text-slate-700">|</span>
                    <button 
                    onClick={() => setLocale('en')}
                    className={clsx("transition-colors px-1 rounded", locale === 'en' ? "bg-sky-500/20 text-white" : "text-slate-500 hover:text-slate-300")}
                    >
                    EN
                    </button>
                </div>
            </div>

            {/* Mobile Hamburger Button (Visible below XL) */}
            <div className="xl:hidden flex items-center justify-end">
                <button 
                    onClick={() => setMobileMenuOpen(true)}
                    className="text-slate-300 hover:text-white p-2 border border-slate-800 rounded bg-slate-900/50"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
          </div>

        </div>
      </div>
    </nav>

    {/* Mobile Fullscreen Menu */}
    <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[10000] bg-slate-950 flex flex-col"
            >
                {/* Mobile Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-sky-900/30">
                    <div className="scale-90 origin-left">
                        <Logo />
                    </div>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-slate-400 hover:text-white p-2 border border-slate-800 rounded bg-slate-900/50"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Links */}
                <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                    {navItems.map((item) => (
                        <Link 
                            key={item.path}
                            href={item.path}
                            className={clsx(
                                "text-[26px] font-sans font-semibold uppercase tracking-widest py-2 border-b border-slate-900 transition-colors",
                                pathname === item.path ? "text-sky-400 font-bold border-sky-500/30" : "text-slate-400 border-transparent hover:text-white"
                            )}
                            suppressHydrationWarning
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Footer Actions */}
                <div className="p-8 border-t border-sky-900/30 bg-black/20 pb-12">
                     {/* Current User & Logout Mobile */}
                     {currentUser && (
                       <div className="flex items-center justify-between mb-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                         <div className="flex items-center gap-2">
                           <User className="w-4 h-4 text-sky-400" />
                           <span className="text-sm font-mono text-slate-300">{currentUser}</span>
                         </div>
                         <button
                           onClick={() => logout()}
                           className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm font-mono"
                         >
                           <LogOut className="w-4 h-4" />
                           Logout
                         </button>
                       </div>
                     )}
                     
                     <div className="flex items-center justify-between mb-8">
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">LANGUAGE</span>
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-md px-3 py-2 gap-4 text-xs font-mono font-bold">
                            <button 
                                onClick={() => setLocale('it')}
                                className={clsx(locale === 'it' ? "text-white" : "text-slate-500")}
                            >
                                ITALIANO
                            </button>
                            <span className="text-slate-700">|</span>
                            <button 
                                onClick={() => setLocale('en')}
                                className={clsx(locale === 'en' ? "text-white" : "text-slate-500")}
                            >
                                ENGLISH
                            </button>
                        </div>
                     </div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}
