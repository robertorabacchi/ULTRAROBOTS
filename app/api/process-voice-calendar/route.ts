import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@deepgram/sdk';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const MAX_AUDIO_BYTES = 10 * 1024 * 1024; // 10MB safeguard

export async function POST(req: NextRequest) {
  // Require real keys; no mock fallback
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

    console.log('[API Calendar] Processing audio...', audioFile.size, audioFile.type);

    // 1. TRASCRIZIONE CON DEEPGRAM
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
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
    console.log('[API Calendar] Transcript:', transcript);

    if (!transcript || transcript.length < 5) {
       return NextResponse.json({ 
         transcript: transcript || "", 
         events: [],
         message: "Audio troppo breve o non chiaro."
       });
    }

    // 2. ANALISI CON OPENAI (GPT-4o)
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const today = new Date().toISOString();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Sei un assistente personale intelligente e preciso. Analizza l'input vocale e identifica eventi, appuntamenti, task e promemoria con massima accuratezza.
          
          OGGI È: ${today}
          
          REGOLE DI ESTRAZIONE:
          - DATE: "domani" = +1 giorno, "dopodomani" = +2 giorni, "lunedì prossimo" = prossimo lunedì, "tra 3 giorni" = +3 giorni
          - ORARI: Estrai orari precisi (es. "alle 15:30", "alle 3 del pomeriggio" = 15:00, "alle 9 di mattina" = 09:00)
          - LUOGHI E INDIRIZZI: 
            * Se viene menzionato un nome di attività/azienda/negozio/ristorante, cerca di dedurre l'indirizzo completo se conosciuto
            * Se viene dato solo un nome (es. "Bar Centrale", "Farmacia Rossi"), metti il nome nel campo "location"
            * Se viene dato un indirizzo completo o parziale, includilo nel campo "location" (es. "Via Roma 10, Milano")
            * Se viene menzionato solo un quartiere/città, includilo
          - CONTATTI: Se vengono menzionati numeri di telefono, email, o nomi di persone, includili nella "description"
          - PRIORITÀ: Assegna "high" per appuntamenti importanti/urgenti, "medium" per eventi normali, "low" per promemoria/task
          - TIPOLOGIA:
            * "appointment" = appuntamento con orario e luogo specifico
            * "task" = cosa da fare senza orario preciso
            * "reminder" = promemoria rapido
            * "call" = telefonata da fare
          
          OUTPUT JSON EXPECTED:
          {
            "events": [
              {
                "type": "appointment" | "task" | "reminder" | "call",
                "title": "Titolo breve e descrittivo",
                "description": "Dettagli completi inclusi contatti, note aggiuntive, informazioni contestuali",
                "start_date": "YYYY-MM-DDTHH:mm:ss" (o null se non specificato),
                "end_date": "YYYY-MM-DDTHH:mm:ss" (o null se non specificato),
                "location": "Indirizzo completo o nome luogo quando disponibile (es. 'Via Roma 10, Milano' o 'Bar Centrale' o 'Farmacia Rossi, Via Verdi 5')",
                "priority": "high" | "medium" | "low"
              }
            ]
          }
          
          IMPORTANTE: 
          - Cerca sempre di estrarre il massimo di informazioni contestuali
          - Se viene menzionato un nome di attività commerciale nota (es. "McDonald's", "IKEA", "Farmacia Comunale", "Bar Centrale"), usa la tua conoscenza per dedurre la città/area se menzionata nel contesto
          - Se l'utente dice solo il nome senza indirizzo, mantieni il nome nel campo "location" (es. "Bar Centrale") - NON inventare indirizzi se non sei sicuro
          - Se l'utente fornisce indirizzi parziali o completi, includili esattamente come detti
          - Per attività molto comuni e note, puoi aggiungere la città nella description se menzionata nel contesto generale della conversazione`
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

    console.log('[API Calendar] Analysis:', analysisData);

    return NextResponse.json({
      success: true,
      transcript,
      events: analysisData.events || []
    });

  } catch (err: any) {
    console.error('[API Calendar Error]', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}


