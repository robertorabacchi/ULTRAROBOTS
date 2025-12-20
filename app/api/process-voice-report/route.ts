import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@deepgram/sdk';
import OpenAI from 'openai';

// Configurazione Runtime Node.js per supportare le librerie
export const runtime = 'nodejs';

const MAX_AUDIO_BYTES = 10 * 1024 * 1024; // 10MB safeguard

export async function POST(req: NextRequest) {
  if (!process.env.DEEPGRAM_API_KEY || !process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Missing API configuration' },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    if (typeof audioFile.size === 'number' && audioFile.size > MAX_AUDIO_BYTES) {
      return NextResponse.json({ error: 'Audio file too large (max 10MB)' }, { status: 413 });
    }

    console.log('[API] Processing audio...', audioFile.size, audioFile.type);

    // 1. TRASCRIZIONE CON DEEPGRAM
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
    
    // Converti File a Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: 'nova-2',
        smart_format: true,
        language: 'it',
      }
    );

    if (error) {
      console.error('[Deepgram Error]', error);
      throw new Error('Deepgram transcription failed');
    }

    const transcript = result.results.channels[0].alternatives[0].transcript;
    console.log('[API] Transcript:', transcript);

    if (!transcript || transcript.length < 5) {
       return NextResponse.json({ 
         transcript: transcript || "", 
         analysis: null,
         message: "Audio troppo breve o non chiaro."
       });
    }

    // 2. ANALISI CON OPENAI (GPT-4o)
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Sei un assistente tecnico esperto in robotica industriale. 
          Analizza il testo trascritto di un rapporto vocale tecnico.
          Estrai i dati in formato JSON strutturato rigoroso.
          
          Se mancano dati, cerca di dedurli dal contesto o lasciali null.
          
          OUTPUT JSON EXPECTED:
          {
            "cliente": { "nome": string, "azienda": string, "luogo": string },
            "intervento": { 
                "tipo": string (es. "Manutenzione", "Riparazione", "Installazione"), 
                "descrizione": string,
                "data": string (YYYY-MM-DD),
                "durata_stimata": string
            },
            "componenti": [ { "nome": string, "codice": string, "azione": "sostituito" | "riparato" | "controllato" } ],
            "note_tecniche": string[],
            "stato_finale": "completato" | "in_corso" | "bloccato"
          }`
        },
        {
          role: "user",
          content: transcript
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysisJson = completion.choices[0].message.content;
    const analysisData = JSON.parse(analysisJson || '{}');

    console.log('[API] Analysis:', analysisData);

    return NextResponse.json({
      success: true,
      transcript,
      analysis: analysisData
    });

  } catch (err: any) {
    console.error('[API Error]', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}

