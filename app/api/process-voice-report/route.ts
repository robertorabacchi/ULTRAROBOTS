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
          
          ⚠️⚠️⚠️ REGOLA FERREA - STRUTTURA PDF NON SI TOCCA MAI ⚠️⚠️⚠️
          
          ❌ NON MODIFICARE MAI: fontSize, padding, larghezze colonne PDF
          ✅ SE TESTO TROPPO LUNGO: SI TRONCA AUTOMATICAMENTE
          ✅ NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!
          
          LIMITI TESTO (numberOfLines limitato):
          - Azienda/Tipologia: max 3 righe
          - Referente/Stato: max 1 riga
          - Descrizione intervento: max 4 righe (~200 char)
          - Note critiche: max 4 righe (~200 char)
          - Trascrizione: max 7 righe (~400 char)
          
          Quando estrai dati, mantieni testi CONCISI!
          
          ⚠️⚠️⚠️ REGOLA CRITICA - NOMI COMPONENTI ⚠️⚠️⚠️
          I nomi dei componenti devono essere BREVI (MAX 15 caratteri, 1-2 parole).
          
          ✅ ESEMPI CORRETTI:
          - "Motore" (NON "Motore elettrico trifase")
          - "Encoder" (NON "Encoder incrementale rotativo")
          - "Inverter" (NON "Inverter controllo velocità")
          - "Fotocellula" (NON "Sensore fotoelettrico retroriflettente")
          - "PLC" (NON "PLC programmabile CompactLogix")
          - "Relè sicurezza" (OK, 2 parole)
          - "Trasformatore" (OK, 1 parola)
          
          ❌ ESEMPI SBAGLIATI:
          - "Motore elettrico trifase asincrono da 5.5kW" ❌
          - "Encoder incrementale rotativo ad alta risoluzione" ❌
          
          Se l'utente dice "motore elettrico trifase", estrai solo "Motore".
          I dettagli tecnici vanno nel campo "codice" o nella descrizione intervento.
          
          ⚠️⚠️⚠️ REGOLA CRITICA - CALCOLO SPESE DI VIAGGIO ⚠️⚠️⚠️
          Quando l'utente menziona chilometri percorsi, CALCOLA automaticamente:
          - Importo Km = Km totali (andata + ritorno) × 0,8€/km
          - Esempio: se dice "150 km andata e ritorno" → Importo Km = 150 × 0,8 = 120€
          - Se menziona solo "andata", moltiplica per 2 per ottenere A/R
          - Il campo "km" deve contenere il totale A/R (es: "150 km A/R")
          - Il campo "costoKm" deve contenere l'importo calcolato (es: "€120,00")
          
          ⚠️⚠️⚠️ REGOLA CRITICA - SPESE DI VITTO ⚠️⚠️⚠️
          Quando l'utente menziona pranzo o cena, estrai:
          - pranzoPosto: nome del ristorante/locale (es: "Trattoria del Borgo", "Ristorante La Botte")
          - pranzoImporto: importo in formato "€XX,XX" (es: "€25,00", "€35,50")
          - cenaPosto: nome del ristorante/locale (es: "Hotel", "Trattoria del Corso")
          - cenaImporto: importo in formato "€XX,XX" (es: "€30,00", "€42,00")
          
          ✅ ESEMPI CORRETTI:
          - "pranzo alla Trattoria del Borgo 25 euro" → pranzoPosto: "Trattoria del Borgo", pranzoImporto: "€25,00"
          - "cena all'hotel 30 euro" → cenaPosto: "Hotel", cenaImporto: "€30,00"
          - "ho mangiato al ristorante La Botte, ho speso 35 euro" → pranzoPosto: "Ristorante La Botte", pranzoImporto: "€35,00"
          
          ⚠️⚠️⚠️ VALORI DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️
          Se il tecnico NON menziona l'importo MA ha fatto pranzo/cena (dedotto dal contesto):
          - pranzoImporto: "[€ 15,00]" (parentesi quadre = ipotizzato)
          - cenaImporto: "[€ 30,00]" (parentesi quadre = ipotizzato)
          
          REGOLE:
          - Senza parentesi "€XX,XX" = dichiarato dal tecnico
          - Con parentesi "[€XX,XX]" = ipotizzato da GPT quando non dichiarato
          - Se non ha pranzato/cenato: "N/D"
          - Dedurre pranzo/cena dal contesto (durata intervento, orari, menzioni indirette)
          
          ⚠️⚠️⚠️ REGOLA CRITICA - SPESE DI PERNOTTAMENTO ⚠️⚠️⚠️
          Quando l'utente menziona pernottamento, estrai:
          - nomeHotel: nome dell'hotel/albergo (es: "Hotel Centrale", "Hotel Parma Centro")
          - numeroNotti: numero di notti in formato stringa (es: "2", "1", "3")
          - importo: importo totale in formato "€XX,XX" (es: "€160,00", "€80,00")
          
          ✅ ESEMPI CORRETTI:
          - "2 notti all'Hotel Centrale, 160 euro" → nomeHotel: "Hotel Centrale", numeroNotti: "2", importo: "€160,00"
          - "ho dormito una notte all'hotel, ho pagato 80 euro" → nomeHotel: "Hotel", numeroNotti: "1", importo: "€80,00"
          - "pernottamento Hotel Parma Centro, 2 notti, 180 euro" → nomeHotel: "Hotel Parma Centro", numeroNotti: "2", importo: "€180,00"
          
          ⚠️⚠️⚠️ VALORE DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️
          Se il tecnico NON menziona l'importo MA ha pernottato (dedotto dal contesto):
          - Calcola "[€ 80,00]" per notte e moltiplica per il numero di notti
          - Esempio: 1 notte → importo: "[€ 80,00]"
          - Esempio: 2 notti → importo: "[€ 160,00]" (80 × 2)
          - Se dice prezzo a notte: calcola totale (es. "€80/notte x 2 = € 160,00")
          
          REGOLE:
          - Senza parentesi "€XX,XX" = dichiarato dal tecnico
          - Con parentesi "[€XX,XX]" = ipotizzato da GPT quando non dichiarato
          - Valore standard: €80/notte se non dichiarato
          - Se non ha pernottato: "N/D"
          - Dedurre pernottamento dal contesto (durata intervento, menzioni di "notte", "hotel", ecc.)
          
          ⚠️ FORMATO IMPORTI:
          - SEMPRE in formato "€XX,XX" con virgola come separatore decimale
          - Esempi: "€25,00", "€30,50", "€160,00", "€180,75"
          - Se l'utente dice solo "25 euro", converti in "€25,00"
          - Se l'utente dice "25 e 50", converti in "€25,50"
          
          ⚠️⚠️⚠️ REGOLA CRITICA - VISUALIZZAZIONE CONDIZIONALE CAMPI ⚠️⚠️⚠️
          Nel PDF, alcuni campi vengono mostrati SOLO SE la riga superiore non è "N/D":
          
          ✅ VITTO:
          - pranzoPosto e cenaPosto vengono SEMPRE mostrati (anche se "N/D")
          - Importo pranzo viene mostrato SOLO SE pranzoPosto !== 'N/D' (riga superiore)
          - Importo cena viene mostrato SOLO SE cenaPosto !== 'N/D' (riga superiore)
          - Se pranzoPosto o cenaPosto sono "N/D", gli importi NON vengono mostrati nel PDF
          
          ✅ PERNOTTAMENTO:
          - nomeHotel viene SEMPRE mostrato (anche se "N/D")
          - Notti e Importo vengono mostrati SOLO SE nomeHotel !== 'N/D' (riga superiore)
          - Se nomeHotel è "N/D", notti e importo NON vengono mostrati nel PDF
          
          ✅ VIAGGIO:
          - Km, Importo Km e Importo Pedaggio vengono mostrati SOLO SE i rispettivi campi !== 'N/D'
          - Se sono "N/D", i campi rimangono vuoti nel PDF
          
          ✅ VARIE:
          - Mostra solo se esistono (varie[0], varie[1], varie[2], varie[3])
          - Se non esistono, il campo rimane vuoto
          
          ⚠️⚠️⚠️ REGOLA CRITICA - CAMPO AZIENDA (6 RIGHE) ⚠️⚠️⚠️
          Il campo "azienda" deve contenere informazioni complete su 6 righe separate:
          
          FORMATO RICHIESTO (6 righe):
          1. Ragione sociale (es. "Barilla S.p.A.")
          2. Via e numero civico (es. "Via Mantova, 166")
          3. CAP + Città + Provincia (XX) (es. "43122 Parma (PR)")
          4. Partita IVA (es. "P.IVA: 01234567890")
          5. Telefono (es. "Tel: +39 0521 262626")
          6. Email (es. "info@barilla.com")
          
          ✅ COME COMPILARE:
          - Quando il tecnico menziona un'azienda (es. "sono stato da Barilla", "intervento alla Chiarini"), 
            CERCA le informazioni dalla tua conoscenza interna
          - Compila TUTTI i campi che conosci
          - Se NON trovi un campo specifico, SALTA quella riga (non inserire "N/D")
          - Separa ogni informazione con "\n" (newline)
          
          ✅ ESEMPIO COMPLETO:
          "azienda": "Barilla S.p.A.\nVia Mantova, 166\n43122 Parma (PR)\nP.IVA: 01234567890\nTel: +39 0521 262626\ninfo@barilla.com"
          
          ✅ ESEMPIO CON CAMPI MANCANTI (salta le righe):
          "azienda": "CM Officine Meccaniche S.r.l.\nVia Industriale, 45\n25030 Brescia (BS)\nTel: +39 030 1234567"
          (in questo esempio: mancano P.IVA ed email, quindi vengono saltate)
          
          ❌ NON FARE:
          - NON usare "N/D" per campi mancanti
          - NON inventare dati se non li conosci
          - NON usare placeholder generici
          
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
            "componenti": [ { 
              "nome": string (MAX 15 caratteri! Es: "Motore", "Encoder", "PLC"), 
              "codice": string, 
              "azione": "sostituito" | "riparato" | "controllato" 
            } ],
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

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API Error]', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: message },
      { status: 500 }
    );
  }
}

