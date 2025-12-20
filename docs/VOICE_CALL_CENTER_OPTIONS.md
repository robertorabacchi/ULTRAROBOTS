# Opzioni per Centralino Vocale con Claudia

## Panoramica

Vuoi creare un centralino vocale dove **Claudia** (assistente AI) risponde alle chiamate telefoniche. **NON sei obbligato a usare vapi.ai**. Ci sono diverse opzioni.

---

## Opzioni Disponibili

### 1. **Twilio + Deepgram + OpenAI + TTS** (Consigliato)

**Stack:**
- **Twilio**: Gestione chiamate telefoniche (PSTN/SIP)
- **Deepgram**: Speech-to-Text (già lo usi!)
- **OpenAI GPT-4o**: AI per Claudia (già lo usi!)
- **ElevenLabs/Google TTS**: Text-to-Speech per la voce di Claudia

**Vantaggi:**
- ✅ Controllo completo
- ✅ Usi già Deepgram e OpenAI
- ✅ Twilio è molto affidabile e scalabile
- ✅ Costi trasparenti (pay-per-use)
- ✅ Puoi personalizzare tutto

**Costi Approximativi:**
- Twilio: ~$0.01/minuto chiamata in entrata
- Deepgram: ~$0.0043/minuto (già configurato)
- OpenAI: ~$0.01-0.03 per chiamata (dipende dalla durata)
- TTS: ~$0.18 per 1000 caratteri (ElevenLabs)

**Setup:**
```typescript
// Twilio Webhook → Next.js API Route
// API Route → Deepgram (transcription)
// API Route → OpenAI (Claudia response)
// API Route → TTS (voice)
// Twilio → Play audio al chiamante
```

---

### 2. **Retell AI** (Alternativa a Vapi)

**Vantaggi:**
- ✅ Più semplice di Twilio (meno codice)
- ✅ Gestisce tutto (chiamate + AI + TTS)
- ✅ API semplice
- ✅ Supporto italiano

**Svantaggi:**
- ❌ Meno controllo rispetto a Twilio
- ❌ Costi leggermente più alti
- ❌ Vendor lock-in

**Costi:** ~$0.10-0.15/minuto

---

### 3. **Bland AI** (Alternativa a Vapi)

**Vantaggi:**
- ✅ Simile a Retell
- ✅ API semplice
- ✅ Buona qualità

**Svantaggi:**
- ❌ Meno flessibile di Twilio
- ❌ Costi più alti

**Costi:** ~$0.12-0.18/minuto

---

### 4. **Custom WebRTC + Deepgram + OpenAI** (Solo Web)

**Stack:**
- **WebRTC**: Chiamate browser-to-browser
- **Deepgram**: Speech-to-Text
- **OpenAI**: AI
- **Web Speech API / TTS**: Text-to-Speech

**Vantaggi:**
- ✅ Gratis per chiamate web
- ✅ Nessun costo telefonico
- ✅ Controllo totale

**Svantaggi:**
- ❌ Solo chiamate web (non telefoniche)
- ❌ Richiede browser moderno
- ❌ Non funziona con numeri telefonici tradizionali

**Use Case:** Chat vocale sul sito web, non centralino telefonico

---

### 5. **Vapi.ai** (Quello che vuoi evitare)

**Vantaggi:**
- ✅ Molto semplice da usare
- ✅ Gestisce tutto automaticamente

**Svantaggi:**
- ❌ Vendor lock-in
- ❌ Meno controllo
- ❌ Costi più alti (~$0.15-0.20/minuto)

---

## Raccomandazione: Twilio + Stack Esistente

### Perché Twilio?

1. **Hai già tutto**: Deepgram + OpenAI già configurati
2. **Controllo totale**: Puoi personalizzare ogni aspetto
3. **Scalabile**: Gestisce migliaia di chiamate simultanee
4. **Affidabile**: Usato da milioni di aziende
5. **Costi**: Più economico di vapi/retell/bland
6. **Flessibilità**: Puoi cambiare TTS, AI, ecc. quando vuoi

### Architettura Proposta

```
┌─────────────┐
│   Chiamante │
│  (Telefono) │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Twilio (PSTN)   │ ← Gestisce chiamata telefonica
└──────┬───────────┘
       │ Webhook
       ▼
┌─────────────────────────────┐
│  Next.js API Route          │
│  /api/call-center/handle    │
└──────┬──────────────────────┘
       │
       ├──► Deepgram (Speech-to-Text)
       │
       ├──► OpenAI GPT-4o (Claudia AI)
       │
       └──► ElevenLabs/Google TTS (Voice)
       │
       ▼
┌─────────────────┐
│  Twilio Play    │ ← Riproduce audio al chiamante
└─────────────────┘
```

### Implementazione Base

**1. Setup Twilio:**
```bash
npm install twilio
```

**2. API Route (`app/api/call-center/handle/route.ts`):**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@deepgram/sdk';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const twiml = new twilio.twiml.VoiceResponse();
  
  // Ricevi audio stream da Twilio
  const audioStream = formData.get('RecordingUrl');
  
  // 1. Trascrivi con Deepgram
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
  const transcript = await deepgram.listen.prerecorded.transcribeFile(audioStream);
  
  // 2. Genera risposta con OpenAI (Claudia)
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "Sei Claudia, assistente vocale professionale e cortese..."
      },
      {
        role: "user",
        content: transcript
      }
    ]
  });
  
  const claudiaResponse = completion.choices[0].message.content;
  
  // 3. Converti in audio (TTS)
  // Usa ElevenLabs o Google TTS
  
  // 4. Riproduci risposta
  twiml.say({ voice: 'alice', language: 'it-IT' }, claudiaResponse);
  
  return new NextResponse(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' }
  });
}
```

**3. Configura Twilio:**
- Compra numero telefonico su Twilio
- Configura Webhook URL → `https://tuosito.netlify.app/api/call-center/handle`
- Twilio chiamerà questa API quando arriva una chiamata

---

## Confronto Costi (per 1000 minuti/mese)

| Soluzione | Costo/Mese | Controllo | Complessità |
|-----------|------------|-----------|-------------|
| **Twilio + Stack** | ~$15-30 | ⭐⭐⭐⭐⭐ | Media |
| Retell AI | ~$100-150 | ⭐⭐⭐ | Bassa |
| Bland AI | ~$120-180 | ⭐⭐⭐ | Bassa |
| Vapi.ai | ~$150-200 | ⭐⭐ | Bassa |
| WebRTC | ~$0 | ⭐⭐⭐⭐⭐ | Alta |

---

## Prossimi Passi

1. **Scegli l'opzione** (consiglio Twilio)
2. **Setup account** Twilio
3. **Implementa API route** per gestire chiamate
4. **Configura TTS** (ElevenLabs o Google TTS)
5. **Test** con chiamata reale
6. **Deploy** su Netlify

---

## Domande Frequenti

### Q: Posso usare la voce di Claudia esistente?

**A**: Sì! Puoi:
- Usare ElevenLabs per clonare una voce
- Usare Google TTS con voce italiana
- Usare Azure TTS con voce personalizzata

### Q: Funziona con numeri italiani?

**A**: Sì, Twilio supporta numeri italiani. Devi verificare il numero e pagare ~€1/mese.

### Q: Quanto tempo per implementare?

**A**: 
- Twilio: 2-3 giorni (setup + test)
- Retell/Bland: 1 giorno (più semplice ma meno controllo)

### Q: Posso integrare con il calendario esistente?

**A**: Sì! Claudia può:
- Creare eventi nel calendario durante la chiamata
- Controllare disponibilità
- Confermare appuntamenti

---

**Raccomandazione Finale**: Usa **Twilio + Deepgram + OpenAI + TTS**. Hai già tutto tranne Twilio e TTS, e hai controllo totale.

