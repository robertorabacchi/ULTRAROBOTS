'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  Mic, StopCircle, Play, Pause, Send, 
  Calendar, Check, Loader2, Trash2, CalendarDays
} from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

interface VoiceCalendarProps {
  onSubmit?: (transcript: string, audioBlob: Blob) => void;
}

export default function VoiceCalendar({ onSubmit }: VoiceCalendarProps) {
  const { dict } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'recording' | 'paused' | 'completed' | 'error'>('idle');
  const [recognitionAvailable, setRecognitionAvailable] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Speech Recognition (One time setup)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setRecognitionAvailable(true);
        const recognition = new SpeechRecognition();
        recognition.lang = 'it-IT';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' ';
            }
          }
          setTranscript(prev => prev + finalTranscript);
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'no-speech') {
             // Ignora
          } else if (event.error === 'service-not-allowed' || event.error === 'not-allowed') {
             console.warn('Speech recognition not available:', event.error);
             setRecognitionAvailable(false);
          } else {
             console.warn('Speech recognition error:', event.error);
          }
        };

        recognition.onend = () => {
          if (isRecording && !isPaused && recognitionAvailable) {
            try { recognition.start(); } catch(e) {}
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, []); // Run once

  // Timer logic
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start(1000);
      mediaRecorderRef.current = mediaRecorder;
      
      if (recognitionRef.current && recognitionAvailable) {
        try { recognitionRef.current.start(); } catch(e) {}
      }
      
      setIsRecording(true);
      setIsPaused(false);
      setStatus('recording');
      setRecordingTime(0);
      setTranscript('');
    } catch (error) {
      console.error('Mic access error:', error);
      setStatus('error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
    }
    setIsRecording(false);
    setIsPaused(false);
    setStatus('completed');
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        setStatus('paused');
        if (recognitionRef.current) try { recognitionRef.current.stop(); } catch(e) {}
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        setStatus('recording');
        if (recognitionRef.current && recognitionAvailable) try { recognitionRef.current.start(); } catch(e) {}
    }
  };

  const resetRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setTranscript('');
    setRecordingTime(0);
    setAudioBlob(null);
    setStatus('idle');
    chunksRef.current = [];
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    if (onSubmit) {
      const finalTranscript = transcript || "[Audio only recording - Transcription not available]";
      await onSubmit(finalTranscript, audioBlob || new Blob());
    }
    setIsProcessing(false);
    setTimeout(() => resetRecording(), 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black/40 backdrop-blur-md border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>

      <div className="mb-8">
          <div className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-full border text-xs font-mono uppercase tracking-widest transition-all",
              status === 'recording' ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400 animate-pulse" :
              status === 'paused' ? "border-amber-500/50 bg-amber-500/10 text-amber-400" :
              status === 'completed' ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" :
              "border-slate-700 bg-slate-900/50 text-slate-500"
          )}>
              <div className={clsx(
                  "w-2 h-2 rounded-full",
                  status === 'recording' ? "bg-indigo-500" :
                  status === 'paused' ? "bg-amber-500" :
                  status === 'completed' ? "bg-emerald-500" :
                  "bg-slate-600"
              )}></div>
              {status === 'recording' ? dict.voice.listening :
               status === 'paused' ? dict.voice.paused :
               status === 'completed' ? dict.voice.ready :
               dict.voice.calendarMode}
          </div>
      </div>

      <div className="text-7xl font-mono font-bold text-white tabular-nums mb-8 tracking-tighter drop-shadow-2xl">
        {formatTime(recordingTime)}
      </div>

      <div className="flex items-center gap-8 mb-8 relative z-10">
        {!isRecording && status !== 'completed' ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.4)] border-4 border-indigo-400/20 group transition-all"
          >
            <Mic className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        ) : status === 'completed' ? (
           <div className="flex gap-4">
               <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isProcessing}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-mono font-bold tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CalendarDays className="w-5 h-5" />}
                {isProcessing ? dict.voice.processing : dict.voice.planEvents}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetRecording}
                className="px-6 py-4 border border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-indigo-500 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
           </div>
        ) : (
          <>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={isPaused ? resumeRecording : pauseRecording}
              className="w-16 h-16 rounded-full border border-slate-600 hover:border-sky-400 bg-slate-900/50 flex items-center justify-center transition-colors"
            >
              {isPaused ? <Play className="w-6 h-6 text-white" /> : <Pause className="w-6 h-6 text-white" />}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={stopRecording}
              className="w-24 h-24 rounded-full bg-slate-800 hover:bg-slate-700 border-4 border-slate-700 flex items-center justify-center shadow-2xl transition-colors"
            >
              <StopCircle className="w-10 h-10 text-indigo-500" />
            </motion.button>
          </>
        )}
      </div>

      <AnimatePresence>
        {(transcript || isRecording) && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-black/50 border border-slate-800 rounded-lg p-4 h-32 overflow-y-auto custom-scrollbar shadow-inner text-sm font-mono leading-relaxed text-slate-300">
                    {transcript || <span className="text-slate-600 italic">
                        {recognitionAvailable ? "Listening for events..." : "Recording audio..."}
                    </span>}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
