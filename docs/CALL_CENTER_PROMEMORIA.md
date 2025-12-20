# Promemoria: Centralino Vocale con Claudia - SIP Trunk + WebSocket

## Contesto

- **Progetto**: Centralino vocale con Claudia (assistente AI)
- **Partito con**: vapi.ai (ma vuoi alternativa)
- **Infrastruttura**: SIP Trunk già configurato
- **Requisito**: WebSocket obbligatorio (per centralinista in tempo reale)
- **Area di lavoro**: Netlify (separata da questa)

---

## Stack Tecnologico Necessario

### Già Disponibile (da questo progetto)
- ✅ **Deepgram**: Speech-to-Text (già configurato)
- ✅ **OpenAI GPT-4o**: AI per Claudia (già configurato)
- ✅ **Next.js**: Framework (già usato)

### Da Configurare
- ⚠️ **SIP Trunk**: Già hai il numero, serve configurazione
- ⚠️ **Asterisk/FreeSWITCH**: Software PBX per gestire chiamate SIP
- ⚠️ **WebSocket Server**: Per audio streaming in tempo reale
- ⚠️ **Deepgram Streaming**: API streaming (non prerecorded)
- ⚠️ **OpenAI Streaming**: Per risposte in tempo reale
- ⚠️ **TTS Streaming**: Text-to-Speech in tempo reale (ElevenLabs/Google TTS)

---

## Architettura Proposta

```
┌─────────────┐
│  Chiamante  │
│  (SIP)      │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Asterisk/       │ ← Gestisce chiamata SIP
│ FreeSWITCH      │
└──────┬──────────┘
       │ WebSocket (audio stream)
       ▼
┌─────────────────────────────┐
│  Next.js WebSocket Server   │ ← Netlify Functions/Edge
│  /api/call-center/ws        │
└──────┬──────────────────────┘
       │
       ├──► Deepgram Streaming API (STT in tempo reale)
       │
       ├──► OpenAI Streaming (Claudia risponde in tempo reale)
       │
       └──► TTS Streaming (genera audio in tempo reale)
       │
       ▼
┌─────────────────┐
│ WebSocket →     │ ← Invia audio al chiamante
│ Asterisk        │
└─────────────────┘
```

---

## Componenti da Implementare

### 1. WebSocket Server (Next.js)

**File**: `app/api/call-center/ws/route.ts`

```typescript
// Gestisce connessione WebSocket
// Riceve audio stream da Asterisk
// Invia a Deepgram Streaming
// Riceve trascrizione → OpenAI → TTS
// Invia audio stream a Asterisk
```

**Librerie necessarie:**
- `ws` o `socket.io` per WebSocket
- Deepgram Streaming SDK
- OpenAI Streaming API
- TTS streaming (ElevenLabs o Google)

### 2. Deepgram Streaming

**Cambio necessario:**
- Attualmente usi `prerecorded.transcribeFile` (file completo)
- Serve `streaming.transcribe` (audio in tempo reale)

**Esempio:**
```typescript
const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
const connection = deepgram.listen.live.transcription({
  model: 'nova-2',
  language: 'it',
  smart_format: true,
  interim_results: true, // Risultati parziali in tempo reale
});
```

### 3. OpenAI Streaming per Claudia

**Sistema prompt:**
```typescript
{
  role: "system",
  content: "Sei Claudia, assistente vocale professionale per centralino aziendale. Rispondi in modo cortese, professionale e conciso. Usa frasi brevi adatte alla conversazione telefonica."
}
```

**Streaming response:**
```typescript
const stream = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [...],
  stream: true // Abilita streaming
});
```

### 4. TTS Streaming

**Opzioni:**
- **ElevenLabs**: Migliore qualità, streaming supportato
- **Google TTS**: Più economico, streaming supportato
- **Azure TTS**: Buona qualità, streaming supportato

**Esempio ElevenLabs:**
```typescript
const audioStream = await elevenlabs.textToSpeech({
  voice_id: "claudia-voice-id",
  text: claudiaResponse,
  stream: true
});
```

---

## Configurazione Asterisk/FreeSWITCH

### Asterisk (esempio)

**extensions.conf:**
```
[incoming]
exten => _X.,1,Answer()
exten => _X.,n,WebSocket(ws://tuosito.netlify.app/api/call-center/ws)
exten => _X.,n,Hangup()
```

### FreeSWITCH (esempio)

**dialplan:**
```xml
<action application="socket" data="ws://tuosito.netlify.app/api/call-center/ws"/>
```

---

## Netlify Considerations

### WebSocket su Netlify

⚠️ **IMPORTANTE**: Netlify Functions non supporta WebSocket nativamente!

**Soluzioni:**

1. **Netlify Edge Functions** (consigliato)
   - Supporta WebSocket
   - Edge network (bassa latenza)
   - File: `netlify/edge-functions/call-center-ws.ts`

2. **Server separato** (alternativa)
   - Hosta WebSocket server su VPS/Cloud
   - Asterisk si connette a server esterno
   - Next.js API chiama server WebSocket

3. **Upgrade Netlify** (se disponibile)
   - Alcuni piani Netlify supportano WebSocket
   - Verifica il tuo piano

---

## Variabili d'Ambiente Necessarie

```env
# Già configurate (da questo progetto)
DEEPGRAM_API_KEY=...
OPENAI_API_KEY=...

# Nuove da aggiungere
ELEVENLABS_API_KEY=... # o GOOGLE_TTS_API_KEY
SIP_TRUNK_PROVIDER=...
ASTERISK_WS_URL=...
```

---

## Funzionalità da Implementare

### Fase 1: Setup Base
- [ ] WebSocket server su Netlify Edge Functions
- [ ] Connessione Asterisk → WebSocket
- [ ] Test audio stream bidirezionale

### Fase 2: Speech-to-Text
- [ ] Deepgram Streaming integration
- [ ] Trascrizione in tempo reale
- [ ] Gestione interruzioni (barge-in)

### Fase 3: AI Response
- [ ] OpenAI Streaming per Claudia
- [ ] Prompt engineering per conversazione telefonica
- [ ] Gestione contesto conversazione

### Fase 4: Text-to-Speech
- [ ] TTS Streaming (ElevenLabs/Google)
- [ ] Voce personalizzata Claudia
- [ ] Gestione pause e intonazione

### Fase 5: Integrazioni
- [ ] Integrazione con calendario Google (già fatto)
- [ ] Creazione eventi durante chiamata
- [ ] Accesso a database/CRM se necessario

---

## Note Importanti

1. **WebSocket su Netlify**: Verifica supporto nel tuo piano Netlify
2. **Latenza**: WebSocket + streaming deve essere < 200ms per buona UX
3. **Barge-in**: Gestisci interruzioni del chiamante durante risposta
4. **Error Handling**: Gestisci disconnessioni, timeout, errori API
5. **Scaling**: WebSocket richiede più risorse, monitora costi

---

## Risorse Utili

- **Deepgram Streaming Docs**: https://developers.deepgram.com/docs/streaming
- **OpenAI Streaming**: https://platform.openai.com/docs/api-reference/streaming
- **ElevenLabs API**: https://elevenlabs.io/docs/api-reference
- **Asterisk WebSocket**: https://wiki.asterisk.org/wiki/display/AST/WebSocket
- **Netlify Edge Functions**: https://docs.netlify.com/edge-functions/overview/

---

## Quando Apri l'Area di Lavoro Netlify

1. Verifica supporto WebSocket nel piano Netlify
2. Setup Asterisk/FreeSWITCH con WebSocket
3. Crea WebSocket server (Edge Function o server separato)
4. Integra Deepgram Streaming
5. Integra OpenAI Streaming
6. Integra TTS Streaming
7. Test end-to-end

---

**Ultimo Aggiornamento**: Dicembre 2025  
**Stato**: Promemoria per implementazione futura

