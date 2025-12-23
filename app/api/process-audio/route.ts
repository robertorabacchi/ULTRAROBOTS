import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@deepgram/sdk';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const MAX_AUDIO_BYTES = 10 * 1024 * 1024; // 10MB safeguard

export async function POST(req: NextRequest) {
  if (!process.env.DEEPGRAM_API_KEY || !process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Missing API configuration' },
      { status: 500 }
    );
  }

  // Lazy initialization to avoid build-time errors
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as Blob | null;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    if (typeof audioFile.size === 'number' && audioFile.size > MAX_AUDIO_BYTES) {
      return NextResponse.json({ error: 'Audio file too large (max 10MB)' }, { status: 413 });
    }

    console.log('[API] Processing audio...', audioFile.size, audioFile.type);

    // 1. TRANSCRIPTION (Deepgram)
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: 'nova-2',
        language: 'it',
        smart_format: true,
        punctuate: true,
        diarize: false, 
      }
    );

    if (error) {
      console.error('[API] Deepgram error:', error);
      throw new Error('Transcription failed');
    }

    const transcript = result.results.channels[0].alternatives[0].transcript;
    console.log('[API] Transcript:', transcript);

    if (!transcript || transcript.length < 5) {
        return NextResponse.json({ 
            transcript: transcript || "",
            analysis: null,
            error: "Audio troppo breve o non comprensibile."
        });
    }

    // 2. INTELLIGENT ANALYSIS (OpenAI GPT-4o) - TITAN PROTOCOL V2 (EXPENSES)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Sei un assistente AI per la gestione di interventi tecnici e note spese (TITAN Protocol).
          
          Analizza il testo trascritto ed estrai le informazioni in un JSON strutturato.
          
          Regole Estrazione SPESE:
          - VIAGGIO: Se viene menzionata una trasferta (es. "Sono andato a Milano"), identifica la destinazione. Se possibile stima i KM dalla sede (assumi sede: Bologna). Se menzionati pedaggi, estraili.
          - VITTO: Se menziona pranzi/cene (es. "Ho mangiato da Gigi"), estrai nome locale e luogo. Se dice importi ("pagato 20 euro"), estraili.
          - PERNOTTO: Se menziona hotel/alberghi.
          - VARIE: Acquisti ferramenta, parcheggi, ecc.
          
          Regole Estrazione TECNICA:
          - Identifica Cliente, Intervento, Componenti e Criticità come standard.
          
          Struttura JSON Output:
          {
            "cliente": {
              "nome": "Nome referente o N/D",
              "azienda": "Ragione sociale o N/D",
              "luogo": "Città/Indirizzo o N/D"
            },
            "intervento": {
              "tipo": "Tipo intervento",
              "descrizione": "Riassunto tecnico professionale (max 30 parole)",
              "componenti": ["lista", "componenti"],
              "durata_stimata": "Durata stimata o N/D"
            },
            "spese": {
               "viaggio": { 
                  "destinazione": "Città/Luogo", 
                  "km_stimati": "Numero KM (stima se sai la distanza da Bologna)", 
                  "pedaggio_stimato": "Importo o N/D"
               },
               "vitto": { 
                  "nome_locale": "Nome Ristorante o N/D", 
                  "indirizzo": "Via/Città stimata o N/D", 
                  "importo_stimato": "Importo o N/D" 
               },
               "pernotto": { 
                  "nome_hotel": "Nome Hotel o N/D", 
                  "indirizzo": "Luogo o N/D" 
               },
               "varie": ["Lista altre spese con importi"]
            },
            "criticita": ["Lista problemi"],
            "status": "COMPLETATO" | "IN_SOSPESO",
            "summary": "Titolo report"
          }`
        },
        {
          role: "user",
          content: transcript
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content || "{}");
    console.log('[API] Analysis:', analysis);

    return NextResponse.json({
      transcript,
      analysis
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API] Error processing audio:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: message },
      { status: 500 }
    );
  }
}
