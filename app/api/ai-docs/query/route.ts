import { NextRequest, NextResponse } from 'next/server';
import { generateAnswer, getManuals } from '@/lib/data/manuals-data';

export async function GET() {
  try {
    const manuals = getManuals();
    return NextResponse.json(manuals);
  } catch (error) {
    console.error('[AI Docs Error]', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query mancante o non valida' }, { status: 400 });
    }

    console.log('[AI Docs] Query:', query);

    // RAG System: Retrieve + Generate Answer
    const result = await generateAnswer(query.trim());

    return NextResponse.json({
      answer: result.answer,
      sources: result.sources.map(chunk => ({
        title: chunk.title,
        manual: chunk.manualId,
        page: chunk.page,
        category: chunk.category
      })),
      confidence: result.confidence / 100
    });

  } catch (error) {
    console.error('[AI Docs Error]', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}








