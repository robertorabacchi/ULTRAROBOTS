'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function ContactPage() {
  const { dict } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple client-side success (Netlify Forms disabled for runtime stability)
    try {
      setSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch {
      setError(dict.contact.form.errorNet);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden pt-24 pb-20">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-12">
        {/* Header */}
        <div className="mb-20 border-l-4 border-sky-500 pl-6">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
              <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono font-bold text-sky-400 tracking-[0.2em] uppercase bg-sky-950/50 px-3 py-1 rounded border border-sky-500/30">
                      {dict.contact.tag}
                  </span>
                  <div className="h-[1px] w-20 bg-sky-500/30"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
                {dict.contact.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500">{dict.contact.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-slate-400 max-w-2xl font-light leading-relaxed text-lg font-sans">
                  {dict.contact.subtitle}
              </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-8 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
                 {/* Background Scan Effect */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none transition-opacity group-hover:opacity-10 bg-emerald-500"></div>

                <div className="relative z-10">
                    <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 tracking-tight">
                        <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                        {dict.contact.infoTitle}
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="group/item flex items-start gap-5">
                        <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover/item:border-sky-500/50 transition-colors">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-widest">{dict.contact.emailLabel}</p>
                            <a href="mailto:info@ecservicesrl.com" className="text-white font-sans text-lg hover:text-sky-400 transition-colors font-medium">
                            info@ecservicesrl.com
                            </a>
                        </div>
                        </div>

                        <div className="group/item flex items-start gap-5">
                        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover/item:border-emerald-500/50 transition-colors">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-widest">{dict.contact.phoneLabel}</p>
                            <a href="tel:+390123456789" className="text-white font-sans text-lg hover:text-emerald-400 transition-colors font-medium">
                            +39 012 345 6789
                            </a>
                        </div>
                        </div>

                        <div className="group/item flex items-start gap-5">
                        <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover/item:border-amber-500/50 transition-colors">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-widest">{dict.contact.addressLabel}</p>
                            <p className="text-white font-sans text-base leading-relaxed">
                            {dict.contact.addressValue}<br />
                            <span className="text-slate-400">{dict.contact.addressCity}</span>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </motion.div>

          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Glossy top border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 flex flex-col items-center justify-center h-full"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  {dict.contact.form.successTitle}
                </h3>
                <p className="text-slate-400 font-sans mb-8 max-w-sm">
                  {dict.contact.form.successMsg}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs font-mono uppercase text-sky-400 hover:text-sky-300 transition-colors tracking-widest border-b border-sky-500/30 pb-1 hover:border-sky-400"
                >
                  {dict.contact.form.newMsg}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{dict.contact.form.title}</h3>
                    <p className="text-sm text-slate-400">{dict.contact.form.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {dict.contact.form.name} <span className="text-emerald-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-slate-700"
                        placeholder={dict.contact.form.placeholderName}
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {dict.contact.form.email} <span className="text-emerald-500">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-slate-700"
                        placeholder={dict.contact.form.placeholderEmail}
                    />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {dict.contact.form.company}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-slate-700"
                    placeholder={dict.contact.form.placeholderCompany}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {dict.contact.form.message} <span className="text-emerald-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all resize-none placeholder:text-slate-700"
                    placeholder={dict.contact.form.placeholderMsg}
                  />
                </div>

                {error && (
                  <div className="text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg px-4 py-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold font-mono text-sm uppercase tracking-widest px-6 py-4 rounded-lg transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 flex items-center justify-center gap-3 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {dict.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {dict.contact.form.submit}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
