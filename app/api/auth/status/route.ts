import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function GET() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has('titan_google_access_token') || cookieStore.has('titan_google_refresh_token');
  
  return NextResponse.json({ isConnected: hasToken });
}
