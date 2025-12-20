'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceCalendar from '@/components/voice/VoiceCalendar';
import { useState, useEffect, Suspense } from 'react';
import { 
  Calendar, CheckCircle, Clock, MapPin, 
  AlertCircle, Loader2, AlertTriangle, ListTodo, 
  Phone, Bell, Trash2, Edit2, Save, X, RefreshCw
} from 'lucide-react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

function CalendarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTranscript, setLastTranscript] = useState('');
  
  // Google Auth State
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Edit Mode States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  // Check connection status
  useEffect(() => {
      fetch('/api/auth/status')
        .then(res => res.json())
        .then(data => setIsGoogleConnected(data.isConnected))
        .catch(console.error);
        
      if (searchParams.get('connected') === 'true') {
          // Rimuovi parametro URL pulito
          router.replace('/calendar');
      }
  }, [searchParams, router]);

  // 1. LOCAL PERSISTENCE - Load on Mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('titan_calendar_events');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (e) {
        console.error("Failed to load events", e);
      }
    }
  }, []);

  // 2. LOCAL PERSISTENCE - Save on Change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('titan_calendar_events', JSON.stringify(events));
    }
  }, [events]);

  const handleVoiceSubmit = async (transcript: string, audioBlob: Blob) => {
    setIsProcessing(true);
    setError(null);
    setLastTranscript(transcript);

    try {
        const formData = new FormData();
        formData.append('audio', audioBlob);

        const response = await fetch('/api/process-voice-calendar', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            setError(data.error);
        } else {
            const newEvents = (data.events || []).map((e: any) => ({
                ...e,
                id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                createdAt: new Date().toISOString(),
                syncStatus: 'pending' // pending, synced, error
            }));
            
            setEvents(prev => [...newEvents, ...prev]);
        }

    } catch (err: any) {
        console.error("Submission error:", err);
        setError(err.message || "Errore durante l'elaborazione del calendario.");
    } finally {
        setIsProcessing(false);
    }
  };

  const handleDelete = (id: string) => {
      setEvents(prev => {
          const updated = prev.filter(e => e.id !== id);
          if (updated.length === 0) localStorage.removeItem('titan_calendar_events');
          return updated;
      });
  };

  const startEditing = (evt: any) => {
      setEditingId(evt.id);
      setEditForm({ ...evt });
  };

  const cancelEditing = () => {
      setEditingId(null);
      setEditForm(null);
  };

  const saveEditing = () => {
      if (!editForm || !editingId) return;
      setEvents(prev => prev.map(e => e.id === editingId ? { ...editForm, syncStatus: 'pending' } : e));
      setEditingId(null);
      setEditForm(null);
  };

  const handleGoogleSync = async () => {
      if (!isGoogleConnected) {
          window.location.href = '/api/auth/google';
          return;
      }

      setIsSyncing(true);
      try {
          const pendingEvents = events.filter(e => e.syncStatus !== 'synced');
          if (pendingEvents.length === 0) {
              alert("Tutti gli eventi sono già sincronizzati!");
              setIsSyncing(false);
              return;
          }

          const response = await fetch('/api/calendar/sync-google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ events: pendingEvents })
          });

          const result = await response.json();
          if (result.success) {
              // Aggiorna stato locale
              setEvents(prev => prev.map(e => {
                  const syncResult = result.results.find((r: any) => r.id === e.id);
                  return syncResult && syncResult.status === 'synced' 
                      ? { ...e, syncStatus: 'synced', googleId: syncResult.googleId } 
                      : e;
              }));
          } else {
              throw new Error(result.error);
          }
      } catch (e: any) {
          alert("Errore sync: " + e.message);
      } finally {
          setIsSyncing(false);
      }
  };

  const getEventIcon = (type: string) => {
      switch(type) {
          case 'appointment': return <Calendar className="w-5 h-5 text-indigo-400" />;
          case 'task': return <ListTodo className="w-5 h-5 text-emerald-400" />;
          case 'call': return <Phone className="w-5 h-5 text-sky-400" />;
          case 'reminder': return <Bell className="w-5 h-5 text-amber-400" />;
          default: return <Calendar className="w-5 h-5 text-slate-400" />;
      }
  };

  const formatDate = (dateString: string) => {
      if (!dateString) return 'Data da definire';
      try {
          const d = new Date(dateString);
          return d.toLocaleString('it-IT', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      } catch (e) {
          return dateString;
      }
  };

  return (
    <main className="relative min-h-screen text-slate-200 overflow-hidden pt-24 pb-20">
      <Scene />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                    VOICE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">CALENDAR</span>
                </h1>
                <p className="text-slate-400 text-sm font-mono tracking-wide">
                    PIANIFICAZIONE INTELLIGENTE VOCALE
                </p>
            </div>
            
            {/* Sync Button */}
            {events.length > 0 && (
                <button 
                    onClick={handleGoogleSync}
                    disabled={isSyncing}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all",
                        isGoogleConnected 
                            ? "bg-emerald-900/30 border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/50" 
                            : "bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                    )}
                >
                    {isSyncing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isGoogleConnected ? (
                        <RefreshCw className="w-4 h-4" />
                    ) : (
                        <Calendar className="w-4 h-4" />
                    )}
                    {isSyncing ? 'SYNCING...' : isGoogleConnected ? 'SYNC NOW' : 'CONNECT GOOGLE'}
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch min-h-[600px]">
            {/* Voice Input */}
            <div className="w-full h-full flex flex-col">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                    INPUT VOCALE
                </h2>
                <div className="flex-1">
                    <VoiceCalendar onSubmit={handleVoiceSubmit} />
                </div>
            </div>

            {/* Results */}
            <div className="w-full h-full flex flex-col pt-14 space-y-6">
                
                {isProcessing && (
                    <div className="bg-slate-900/50 border border-indigo-500/30 rounded-xl p-8 h-full flex flex-col items-center justify-center min-h-[400px]">
                        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
                        <h3 className="text-xl font-bold text-white mb-2">ANALISI EVENTI IN CORSO</h3>
                        <div className="text-slate-400 text-sm font-mono flex flex-col gap-2 text-center">
                            <span>&gt; UPLOADING AUDIO STREAM... OK</span>
                            <span>&gt; DEEPGRAM TRANSCRIPTION... RUNNING</span>
                            <span>&gt; GPT-4O PARSING... PENDING</span>
                        </div>
                    </div>
                )}

                {error && !isProcessing && (
                    <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-8 h-full flex flex-col items-center justify-center min-h-[400px]">
                        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-2">ERRORE ELABORAZIONE</h3>
                        <p className="text-red-400 text-center">{error}</p>
                    </div>
                )}

                {!isProcessing && !error && events.length === 0 && (
                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                        <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-slate-300 mb-3">NESSUN EVENTO</h3>
                        <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
                            I tuoi eventi salvati appariranno qui.<br/>
                            Registra un messaggio vocale per iniziare.
                        </p>
                    </div>
                )}

                {!isProcessing && !error && events.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/50 border border-indigo-500/30 rounded-xl p-6 h-full flex flex-col max-h-[800px]"
                    >
                        <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4 shrink-0">
                            <CheckCircle className="w-8 h-8 text-indigo-500" />
                            <div>
                                <h3 className="text-xl font-bold text-white">AGENDA INTELLIGENTE</h3>
                                <p className="text-xs text-indigo-400 font-mono">{events.length} EVENTI IN CODA</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                            <AnimatePresence>
                            {events.map((evt, idx) => (
                                <motion.div 
                                    key={evt.id || idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className={clsx(
                                        "rounded-lg p-4 border transition-colors group relative",
                                        editingId === evt.id 
                                            ? "bg-indigo-900/20 border-indigo-500" 
                                            : "bg-black/40 border-slate-700 hover:border-indigo-500/50"
                                    )}
                                >
                                    {editingId === evt.id ? (
                                        // EDIT MODE
                                        <div className="space-y-3">
                                            <input 
                                                type="text" 
                                                value={editForm.title}
                                                onChange={e => setEditForm({...editForm, title: e.target.value})}
                                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white font-bold focus:border-indigo-500 outline-none"
                                            />
                                            <textarea 
                                                value={editForm.description}
                                                onChange={e => setEditForm({...editForm, description: e.target.value})}
                                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm text-slate-300 focus:border-indigo-500 outline-none h-20 resize-none"
                                            />
                                            <div className="flex gap-2">
                                                 <input 
                                                    type="datetime-local"
                                                    value={editForm.start_date ? editForm.start_date.slice(0, 16) : ''}
                                                    onChange={e => setEditForm({...editForm, start_date: e.target.value})}
                                                    className="bg-slate-800 border border-slate-600 rounded p-2 text-xs text-white"
                                                 />
                                                 <select 
                                                    value={editForm.priority}
                                                    onChange={e => setEditForm({...editForm, priority: e.target.value})}
                                                    className="bg-slate-800 border border-slate-600 rounded p-2 text-xs text-white"
                                                 >
                                                     <option value="high">Alta</option>
                                                     <option value="medium">Media</option>
                                                     <option value="low">Bassa</option>
                                                 </select>
                                            </div>
                                            <div className="flex justify-end gap-2 pt-2">
                                                <button onClick={cancelEditing} className="p-2 text-slate-400 hover:text-white"><X className="w-4 h-4"/></button>
                                                <button onClick={saveEditing} className="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"><Save className="w-4 h-4"/></button>
                                            </div>
                                        </div>
                                    ) : (
                                        // VIEW MODE
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-500/20 transition-colors relative">
                                                {getEventIcon(evt.type)}
                                                {evt.syncStatus === 'synced' && (
                                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-[2px]">
                                                        <CheckCircle className="w-2 h-2 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-white text-lg">{evt.title}</h4>
                                                    <div className="flex gap-2 items-center">
                                                        <span className={clsx(
                                                            "text-[10px] uppercase font-mono px-2 py-1 rounded border",
                                                            evt.priority === 'high' ? "border-red-500/50 text-red-400 bg-red-500/10" :
                                                            evt.priority === 'medium' ? "border-amber-500/50 text-amber-400 bg-amber-500/10" :
                                                            "border-slate-600 text-slate-400 bg-slate-800"
                                                        )}>{evt.priority}</span>
                                                        
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => startEditing(evt)}
                                                                className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-indigo-400"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(evt.id)}
                                                                className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-red-400"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-slate-400 text-sm mt-1">{evt.description}</p>
                                                
                                                <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-slate-500">
                                                    {evt.start_date && (
                                                        <div className="flex items-center gap-1.5 text-indigo-300">
                                                            <Clock className="w-3 h-3" />
                                                            {formatDate(evt.start_date)}
                                                        </div>
                                                    )}
                                                    {evt.location && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-3 h-3" />
                                                            {evt.location}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            </AnimatePresence>
                        </div>

                        {lastTranscript && (
                            <div className="pt-6 mt-4 border-t border-white/5 shrink-0">
                                <div className="text-[10px] font-mono text-slate-600 uppercase mb-2">ULTIMA TRASCRIZIONE</div>
                                <p className="text-slate-500 text-xs italic leading-relaxed line-clamp-2">"{lastTranscript}"</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>}>
      <CalendarContent />
    </Suspense>
  );
}
