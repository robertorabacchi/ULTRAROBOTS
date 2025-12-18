'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function ContactPage() {
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

    // Netlify Forms handling
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setError('Errore durante l\'invio. Riprova.');
      }
    } catch (err) {
      setError('Errore di rete. Verifica la connessione.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden">
      <Scene />
      
      {/* Hidden Netlify Form for detection */}
      <form name="contact" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <textarea name="message"></textarea>
      </form>
      
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500 mb-6"
          >
            CONTACT
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Richiedi una consulenza tecnica o un preventivo personalizzato
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-black border border-slate-800 rounded-sm p-6">
              <h2 className="text-xl font-mono font-bold text-white mb-6">
                INFO DI CONTATTO
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-cyan-500 mt-1" />
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-1">EMAIL</p>
                    <a href="mailto:info@ecservicesrl.com" className="text-white font-mono text-sm hover:text-cyan-400 transition-colors">
                      info@ecservicesrl.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-1">PHONE</p>
                    <a href="tel:+390123456789" className="text-white font-mono text-sm hover:text-emerald-400 transition-colors">
                      +39 012 345 6789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-amber-500 mt-1" />
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-1">ADDRESS</p>
                    <p className="text-white font-mono text-sm">
                      Via dell'Innovazione, 42<br />
                      40100 Bologna, Italia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-black border border-slate-800 rounded-sm p-6">
              <h3 className="text-sm font-mono text-slate-400 mb-4 uppercase">
                DOCUMENTAZIONE
              </h3>
              <div className="space-y-3">
                <a href="/technology" className="block text-xs font-mono text-white hover:text-cyan-400 transition-colors">
                  → Stack Tecnologico
                </a>
                <a href="/products" className="block text-xs font-mono text-white hover:text-cyan-400 transition-colors">
                  → Fleet Status
                </a>
                <a href="/ai-docs" className="block text-xs font-mono text-white hover:text-cyan-400 transition-colors">
                  → Manuali AI
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black border border-slate-800 rounded-sm p-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-mono font-bold text-white mb-2">
                  MESSAGGIO INVIATO
                </h3>
                <p className="text-sm text-slate-400 font-mono mb-6">
                  Ti risponderemo entro 24 ore
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs font-mono uppercase text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Invia un altro messaggio →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="mario.rossi@azienda.it"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Azienda
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Nome Azienda Srl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Messaggio *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Descriviti la tua esigenza..."
                  />
                </div>

                {error && (
                  <div className="text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/30 rounded-sm px-4 py-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-800 disabled:text-slate-600 text-black font-mono text-xs uppercase px-6 py-4 rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      INVIO IN CORSO
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      INVIA RICHIESTA
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

