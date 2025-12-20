import { NextRequest, NextResponse } from 'next/server';
import { getReports, getRobots, getReportStats } from '@/lib/data/reports-data';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    if (type === 'stats') {
      return NextResponse.json(getReportStats());
    }

    if (type === 'robots') {
      return NextResponse.json(getRobots());
    }

    const reports = getReports(limit ? parseInt(limit) : undefined);
    return NextResponse.json(reports);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}








