import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@deepgram/sdk';
import OpenAI from 'openai';

export const runtime = 'nodejs';

    const MAX_AUDIO_BYTES = 10 * 1024 * 1024; // 10MB safeguard

    export async function POST(req: NextRequest) {
      // --- MOCK FALLBACK FOR TESTING WITHOUT KEYS ---
      if (!process.env.DEEPGRAM_API_KEY || !process.env.OPENAI_API_KEY) {
        console.warn("[API Calendar] Missing API Keys. Using MOCK mode.");
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Return mock data
        return NextResponse.json({
          success: true,
          transcript: "Pianifica una riunione con il team domani alle 15:00 per revisione progetto.",
          events: [
            {
              type: "appointment",
              title: "Riunione Team",
              description: "Revisione progetto (Generato da Mock)",
              start_date: new Date(Date.now() + 86400000).toISOString(), // Domani
              end_date: new Date(Date.now() + 90000000).toISOString(), // +1 ora
              location: "Sala Riunioni",
              priority: "high"
            }
          ]
        });
      }

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
          content: `Sei un assistente personale intelligente. Analizza l'input vocale e identifica eventi, appuntamenti, task e promemoria.
          
          OGGI È: ${today}
          
          REGOLE:
          - "domani" = +1 giorno
          - "dopodomani" = +2 giorni
          - "lunedì prossimo" = prossimo lunedì
          - Estrai orari precisi se presenti.
          - Assegna una priorità (alta, media, bassa).
          - Distingui tra 'appointment' (con orario e luogo), 'task' (cose da fare), 'reminder' (promemoria rapido), 'call' (telefonate).
          
          OUTPUT JSON EXPECTED:
          {
            "events": [
              {
                "type": "appointment" | "task" | "reminder" | "call",
                "title": "Titolo breve",
                "description": "Dettagli completi",
                "start_date": "YYYY-MM-DDTHH:mm:ss" (o null se non specificato),
                "end_date": "YYYY-MM-DDTHH:mm:ss" (o null se non specificato),
                "location": "Luogo o null",
                "priority": "high" | "medium" | "low"
              }
            ]
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


