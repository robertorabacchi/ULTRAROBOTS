import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET() {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ authenticated: false }, { headers: corsHeaders });
  }
  
  return NextResponse.json({
    authenticated: true,
    username: session.username,
    calendarId: session.calendarId
  }, { headers: corsHeaders });
}

