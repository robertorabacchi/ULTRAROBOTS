import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('google_access_token');
  return NextResponse.json({ 
    isConnected: !!token 
  });
}

