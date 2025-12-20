'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceCalendar from '@/components/voice/VoiceCalendar';
import { useState, useEffect, Suspense } from 'react';
import { 
  Calendar, CheckCircle, Clock, MapPin, 
  AlertCircle, Loader2, AlertTriangle, ListTodo, 
  Phone, Bell, Trash2, Edit2, Save, X, RefreshCw, Mic, LayoutDashboard, Cloud
} from 'lucide-react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

function CalendarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dict } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTranscript, setLastTranscript] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'newEvent'>('dashboard');
  
  // Google Auth State - REMOVED MANUAL CONNECT
  // const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Edit Mode States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

            // 1. LOCAL PERSISTENCE - Load on Mount
            useEffect(() => {
                const savedEvents = localStorage.getItem('titan_calendar_events');
                if (savedEvents) {
                    try {
                        const parsed = JSON.parse(savedEvents);
                        // Sort by date descending (newest first)
                        parsed.sort((a: any, b: any) => {
                            const dateA = new Date(a.start_date || a.date || 0).getTime();
                            const dateB = new Date(b.start_date || b.date || 0).getTime();
                            return dateB - dateA;
                        });
                        setEvents(parsed);
                    } catch (e) {
                        console.error("Failed to load events", e);
                    }
                }
            }, []);

            // 2. LOCAL PERSISTENCE - Save on Change
            useEffect(() => {
                // Only save if we have events, or if we explicitly deleted everything (empty array is valid state)
                if (events) {
                    localStorage.setItem('titan_calendar_events', JSON.stringify(events));
                }
            }, [events]);

            // 3. AUTO SYNC (Service Account)
            useEffect(() => {
                if (events.length === 0) return;
                
                const pendingEvents = events.filter(e => e.syncStatus !== 'synced');
                if (pendingEvents.length > 0 && !isSyncing) {
                    handleGoogleSync(pendingEvents);
                }
            }, [events, isSyncing]);

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
                            // Ensure start_date exists
                            start_date: e.start_date || new Date().toISOString(),
                            syncStatus: 'pending'
                        }));
                        
                        setEvents(prev => {
                            const updated = [...newEvents, ...prev];
                            // Sort again just to be sure
                            updated.sort((a: any, b: any) => {
                                const dateA = new Date(a.start_date || 0).getTime();
                                const dateB = new Date(b.start_date || 0).getTime();
                                return dateB - dateA;
                            });
                            return updated;
                        });
                        
                        setTimeout(() => setActiveTab('dashboard'), 1500);
                    }

                } catch (err: any) {
                    console.error("Submission error:", err);
                    setError(err.message || dict.calendar.errorTitle);
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

  // AUTO SYNC FUNCTION
  const handleGoogleSync = async (pendingEvents: any[]) => {
      setIsSyncing(true);
      try {
          // Sync one by one or batch. Current API handles one at a time for simplicity in this loop or needs update.
          // Let's iterate for safety as API might expect single 'event' or 'events' list.
          // Checking api/calendar/sync-google/route.ts -> Expects { event } single object.
          // So we loop here.

          for (const evt of pendingEvents) {
             try {
                const response = await fetch('/api/calendar/sync-google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ event: evt })
                });

                const result = await response.json();
                
                if (result.success) {
                    setEvents(prev => prev.map(e => 
                        e.id === evt.id 
                        ? { ...e, syncStatus: 'synced', googleId: result.eventId } 
                        : e
                    ));
                }
             } catch (e) {
                 console.error("Sync failed for event", evt.id, e);
             }
          }

      } catch (e: any) {
          console.error("Global sync error", e);
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
      if (!dateString) return 'TBD';
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
        <div className="mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row justify-between items-end gap-6"
            >
                <div className="border-l-4 border-sky-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono font-bold text-sky-400 tracking-[0.2em] uppercase bg-sky-950/50 px-3 py-1 rounded border border-sky-500/30">
                            {dict.calendar.tag}
                        </span>
                        <div className="h-[1px] w-20 bg-sky-500/30"></div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
                        {dict.calendar.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500">{dict.calendar.title.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
                        {dict.calendar.subtitle}
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    {/* Status Indicator (Auto Sync) */}
                    {isSyncing ? (
                        <div className="flex items-center gap-2 px-4 py-2 border border-sky-500/30 rounded-lg bg-sky-900/20 text-sky-400 text-xs font-mono font-bold uppercase animate-pulse">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            {dict.calendar.syncing}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-4 py-2 border border-emerald-500/30 rounded-lg bg-emerald-900/20 text-emerald-400 text-xs font-mono font-bold uppercase">
                            <Cloud className="w-4 h-4" />
                            GOOGLE SYNC ACTIVE
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex bg-slate-900/50 border border-slate-700 rounded-lg p-1 gap-1">
                        <button
                            onClick={() => setActiveTab('newEvent')}
                            className={clsx(
                                "flex items-center gap-2 px-6 py-3 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all",
                                activeTab === 'newEvent' 
                                    ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]" 
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Mic className="w-4 h-4" />
                            {dict.calendar.tabs.newEvent}
                        </button>
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={clsx(
                                "flex items-center gap-2 px-6 py-3 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all",
                                activeTab === 'dashboard' 
                                    ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            {dict.calendar.tabs.dashboard}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>

        <div className="min-h-[600px]">
            {activeTab === 'newEvent' ? (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch"
                >
                    {/* Voice Input */}
                    <div className="w-full h-full flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                            {dict.calendar.inputTitle}
                        </h2>
                        <div className="flex-1">
                            <VoiceCalendar onSubmit={handleVoiceSubmit} />
                        </div>
                    </div>

                    {/* Processing Status / Preview */}
                    <div className="w-full h-full flex flex-col pt-14 space-y-6">
                        {isProcessing && (
                            <div className="bg-slate-900/50 border border-indigo-500/30 rounded-xl p-8 h-full flex flex-col items-center justify-center min-h-[400px]">
                                <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">{dict.calendar.processing}</h3>
                                <div className="text-slate-400 text-sm font-mono flex flex-col gap-2 text-center">
                                    <span>&gt; {dict.calendar.steps.upload}</span>
                                    <span>&gt; {dict.calendar.steps.transcribe}</span>
                                    <span>&gt; {dict.calendar.steps.parse}</span>
                                </div>
                            </div>
                        )}

                        {error && !isProcessing && (
                            <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-8 h-full flex flex-col items-center justify-center min-h-[400px]">
                                <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">{dict.calendar.errorTitle}</h3>
                                <p className="text-red-400 text-center">{error}</p>
                            </div>
                        )}

                        {!isProcessing && !error && (
                            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                                <Mic className="w-16 h-16 text-slate-600 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-slate-300 mb-3">{dict.calendar.inputTitle}</h3>
                                <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
                                    Registra un messaggio vocale per creare automaticamente eventi nel calendario.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {/* Dashboard View */}
                    <div className="w-full">
                        {events.length === 0 ? (
                            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                                <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-slate-300 mb-3">{dict.calendar.noEventsTitle}</h3>
                                <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed whitespace-pre-wrap">
                                    {dict.calendar.noEventsMsg}
                                </p>
                            </div>
                        ) : (
                            <div className="bg-slate-900/50 border border-indigo-500/30 rounded-xl p-6 min-h-[600px] flex flex-col">
                                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4 shrink-0">
                                    <CheckCircle className="w-8 h-8 text-indigo-500" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{dict.calendar.agendaTitle}</h3>
                                        <p className="text-xs text-indigo-400 font-mono">{events.length} {dict.calendar.eventsQueue}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar pr-2">
                                    <AnimatePresence>
                                    {events.map((evt, idx) => (
                                        <motion.div 
                                            key={evt.id || idx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className={clsx(
                                                "rounded-lg p-4 border transition-colors group relative flex flex-col h-full",
                                                editingId === evt.id 
                                                    ? "bg-indigo-900/20 border-indigo-500" 
                                                    : "bg-black/40 border-slate-700 hover:border-indigo-500/50"
                                            )}
                                        >
                                            {editingId === evt.id ? (
                                                // EDIT MODE
                                                <div className="space-y-3 flex-1 flex flex-col">
                                                    <input 
                                                        type="text" 
                                                        value={editForm.title}
                                                        onChange={e => setEditForm({...editForm, title: e.target.value})}
                                                        className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white font-bold focus:border-indigo-500 outline-none"
                                                    />
                                                    <textarea 
                                                        value={editForm.description}
                                                        onChange={e => setEditForm({...editForm, description: e.target.value})}
                                                        className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm text-slate-300 focus:border-indigo-500 outline-none h-20 resize-none flex-1"
                                                    />
                                                    <div className="flex gap-2">
                                                         <input 
                                                            type="datetime-local"
                                                            value={editForm.start_date ? editForm.start_date.slice(0, 16) : ''}
                                                            onChange={e => setEditForm({...editForm, start_date: e.target.value})}
                                                            className="bg-slate-800 border border-slate-600 rounded p-2 text-xs text-white flex-1"
                                                         />
                                                         <select 
                                                            value={editForm.priority}
                                                            onChange={e => setEditForm({...editForm, priority: e.target.value})}
                                                            className="bg-slate-800 border border-slate-600 rounded p-2 text-xs text-white"
                                                         >
                                                             <option value="high">{dict.calendar.edit.priority.high}</option>
                                                             <option value="medium">{dict.calendar.edit.priority.medium}</option>
                                                             <option value="low">{dict.calendar.edit.priority.low}</option>
                                                         </select>
                                                    </div>
                                                    <div className="flex justify-end gap-2 pt-2">
                                                        <button onClick={cancelEditing} className="p-2 text-slate-400 hover:text-white"><X className="w-4 h-4"/></button>
                                                        <button onClick={saveEditing} className="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"><Save className="w-4 h-4"/></button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // VIEW MODE
                                                <>
                                                    <div className="flex items-start gap-4 mb-3">
                                                        <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-500/20 transition-colors relative shrink-0">
                                                            {getEventIcon(evt.type)}
                                                            {evt.syncStatus === 'synced' && (
                                                                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-[2px]">
                                                                    <CheckCircle className="w-2 h-2 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <h4 className="font-bold text-white text-lg truncate">{evt.title}</h4>
                                                                <span className={clsx(
                                                                    "text-[10px] uppercase font-mono px-2 py-1 rounded border shrink-0",
                                                                    evt.priority === 'high' ? "border-red-500/50 text-red-400 bg-red-500/10" :
                                                                    evt.priority === 'medium' ? "border-amber-500/50 text-amber-400 bg-amber-500/10" :
                                                                    "border-slate-600 text-slate-400 bg-slate-800"
                                                                )}>{evt.priority}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">{evt.description}</p>
                                                    
                                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800/50">
                                                        <div className="flex flex-col gap-1 text-xs font-mono text-slate-500">
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
                                                </>
                                            )}
                                        </motion.div>
                                    ))}
                                    </AnimatePresence>
                                </div>

                                {lastTranscript && (
                                    <div className="pt-6 mt-4 border-t border-white/5 shrink-0">
                                        <div className="text-[10px] font-mono text-slate-600 uppercase mb-2">{dict.calendar.lastTranscript}</div>
                                        <p className="text-slate-500 text-xs italic leading-relaxed line-clamp-2">"{lastTranscript}"</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
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
