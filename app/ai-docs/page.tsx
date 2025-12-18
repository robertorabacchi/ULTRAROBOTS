'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Send, Book, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

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
            AI MANUALS QUERY
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Interroga i manuali tecnici con linguaggio naturale. Powered by RAG.
          </p>
        </div>

        {/* Manuals Library */}
        <div className="mb-12">
          <h2 className="text-sm font-mono text-slate-400 mb-4 uppercase tracking-wider">
            Available Manuals
          </h2>
          {manualsLoading ? (
            <div className="text-center text-slate-400 py-8">
              <Loader2 className="inline-block animate-spin w-6 h-6" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {manuals.map((manual) => (
                <div 
                  key={manual.id}
                  className="bg-black border border-slate-800 rounded-sm p-4 hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <Book className="w-5 h-5 text-cyan-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-sm font-mono font-bold text-white mb-1">
                        {manual.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mb-2">
                        {manual.model} • v{manual.version}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                        <span>{manual.totalPages} pages</span>
                        <span>Updated {new Date(manual.lastUpdated).toLocaleDateString('it-IT')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Query Interface */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleQuery} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Es: Come calibrare i sensori del Titan X?"
                className="flex-1 bg-black border border-slate-800 rounded-sm px-4 py-3 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-800 disabled:text-slate-600 text-black font-mono text-xs uppercase px-6 py-3 rounded-sm transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? 'PROCESSING' : 'QUERY'}
              </button>
            </div>
          </form>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black border border-slate-800 rounded-sm p-6"
            >
              {/* Confidence */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase">AI Response</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">Confidence:</span>
                  <span className={`text-xs font-mono font-bold ${result.confidence > 0.7 ? 'text-emerald-500' : result.confidence > 0.4 ? 'text-amber-500' : 'text-red-500'}`}>
                    {Math.round(result.confidence * 100)}%
                  </span>
                </div>
              </div>

              {/* Answer */}
              <div className="mb-6">
                <p className="text-white leading-relaxed whitespace-pre-wrap">
                  {result.answer}
                </p>
              </div>

              {/* Sources */}
              {result.sources.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase mb-3">Sources</h4>
                  <div className="space-y-2">
                    {result.sources.map((source, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between text-xs font-mono bg-slate-900/50 border border-slate-800 rounded-sm px-3 py-2"
                      >
                        <span className="text-cyan-400">{source.title}</span>
                        <div className="flex items-center gap-4 text-slate-500">
                          <span>{source.manual}</span>
                          <span>Page {source.page}</span>
                          <span className="px-2 py-0.5 bg-slate-800 rounded-sm text-[10px] uppercase">
                            {source.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Example Queries */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-xs font-mono text-slate-400 uppercase mb-4">Example Queries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Come eseguire la calibrazione del Titan X?',
              'Cosa significa errore E-104?',
              'Come configurare le camere Atlas Vision?',
              'Procedura di Emergency Stop',
              'API REST endpoint disponibili',
              'Manutenzione preventiva Nexus'
            ].map((example, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(example)}
                className="text-left bg-black border border-slate-800 rounded-sm px-4 py-3 text-xs font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

