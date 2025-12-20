'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Book, Loader2, Sparkles, Search, ChevronRight, FileText, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import clsx from 'clsx';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

interface Manual {
  id: string;
  title: string;
  version: string;
  model: string;
  lastUpdated: string;
  totalPages: number;
  language: string;
}

interface QueryResult {
  answer: string;
  sources: Array<{
    title: string;
    manual: string;
    page: number;
    category: string;
  }>;
  confidence: number;
}

export default function AiDocsPage() {
  const { dict } = useLanguage();
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [manualsLoading, setManualsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ai-docs/query')
      .then(res => res.json())
      .then(data => {
        setManuals(data);
        setManualsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching manuals:', err);
        setManualsLoading(false);
      });
  }, []);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai-docs/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error querying AI:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden pt-24 pb-20">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-12">
        {/* Header */}
        <div className="mb-16 border-l-4 border-sky-500 pl-6">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
              <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono font-bold text-sky-400 tracking-[0.2em] uppercase bg-sky-950/50 px-3 py-1 rounded border border-sky-500/30">
                      {dict.aiDocs.tag}
                  </span>
                  <div className="h-[1px] w-20 bg-sky-500/30"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
                {dict.aiDocs.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500">{dict.aiDocs.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-slate-400 max-w-2xl font-light leading-relaxed text-lg font-sans">
                  {dict.aiDocs.subtitle}
              </p>
          </motion.div>
        </div>

        {/* Search & Query Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
        >
            <div className="bg-slate-900/60 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-sky-500/10 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                            <Sparkles className="w-5 h-5 text-sky-400" />
                            {dict.aiDocs.placeholder.split('...')[0]}
                        </h2>
                        <p className="text-slate-400 text-sm">{dict.aiDocs.subtitle}</p>
                    </div>

                    <form onSubmit={handleQuery} className="mb-10 relative">
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-slate-500 group-focus-within/input:text-sky-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={dict.aiDocs.placeholder}
                                className="w-full bg-black/50 border border-slate-700 rounded-xl py-5 pl-12 pr-32 text-white font-sans text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-slate-600 shadow-inner"
                                disabled={loading}
                            />
                            <div className="absolute inset-y-2 right-2">
                                <button
                                    type="submit"
                                    disabled={loading || !query.trim()}
                                    className="h-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold font-mono text-xs uppercase tracking-wider px-6 rounded-lg transition-all flex items-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    <span className="hidden sm:inline">{dict.aiDocs.button}</span>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Result Panel */}
                    <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-black/40 border border-slate-800 rounded-xl overflow-hidden"
                        >
                            <div className="bg-slate-900/50 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
                                    <Bot className="w-4 h-4" /> {dict.aiDocs.responseTitle}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-slate-500">{dict.aiDocs.confidence}</span>
                                    <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                        <div className={clsx("w-1.5 h-1.5 rounded-full", result.confidence > 0.7 ? "bg-emerald-500" : "bg-amber-500")}></div>
                                        <span className={clsx("text-xs font-bold font-mono", result.confidence > 0.7 ? "text-emerald-400" : "text-amber-400")}>
                                            {Math.round(result.confidence * 100)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-200 leading-relaxed text-lg font-light whitespace-pre-wrap mb-8">
                                    {result.answer}
                                </p>

                                {result.sources.length > 0 && (
                                    <div>
                                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <FileText className="w-3 h-3" /> {dict.aiDocs.sources}
                                        </h4>
                                        <div className="grid grid-cols-1 gap-3">
                                            {result.sources.map((source, idx) => (
                                                <div 
                                                    key={idx}
                                                    className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors group/source cursor-default"
                                                >
                                                    <div className="mt-1 p-1.5 bg-slate-800 rounded text-slate-400 group-hover/source:text-sky-400 transition-colors">
                                                        <Book className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-bold text-slate-200 group-hover/source:text-sky-400 transition-colors">
                                                            {source.title}
                                                        </h5>
                                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-slate-500 font-mono">
                                                            <span className="flex items-center gap-1">
                                                                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                                                {source.manual}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                                                {dict.aiDocs.page} {source.page}
                                                            </span>
                                                            <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] uppercase tracking-wide">
                                                                {source.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {/* Example Chips */}
                    {!result && (
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {dict.aiDocs.examples.map((example, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setQuery(example)}
                                    className="text-xs text-slate-400 bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 hover:text-sky-400 hover:bg-sky-950/20 px-4 py-2 rounded-full transition-all duration-300 font-mono"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>

        {/* Manuals Library Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-sky-500 rounded-full"></span>
                {dict.aiDocs.availableManuals}
            </h2>
            <div className="text-xs font-mono text-slate-500">
                {dict.aiDocs.indexing}
            </div>
          </div>

          {manualsLoading ? (
            <div className="text-center text-slate-500 py-20 bg-slate-900/20 rounded-xl border border-dashed border-slate-800">
              <Loader2 className="inline-block animate-spin w-8 h-8 mb-4 text-sky-500" />
              <p className="font-mono text-sm tracking-widest">{dict.aiDocs.loadingManuals}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manuals.map((manual, i) => (
                <motion.div 
                  key={manual.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-sky-500/30 hover:bg-slate-900/60 transition-all group relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-5 h-5 text-sky-500" />
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 group-hover:text-sky-400 group-hover:border-sky-500/30 transition-colors">
                        <Book className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">
                        {manual.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mb-3">
                        {manual.model} <span className="mx-1 text-slate-700">|</span> v{manual.version}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono uppercase tracking-wide">
                        <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">{manual.totalPages} {dict.aiDocs.pages}</span>
                        <span suppressHydrationWarning>{new Date(manual.lastUpdated).toLocaleDateString('it-IT')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
