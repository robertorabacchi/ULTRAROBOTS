import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');
  
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing Google credentials' }, { status: 500 });
  }

  try {
    // Scambio code per tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (tokens.error) {
      throw new Error(tokens.error_description || tokens.error);
    }

    // Salva i token in un cookie sicuro HTTP-only
    // In produzione reale dovresti criptarli o salvarli in un DB associati all'utente
    // Qui usiamo cookie per semplicità e portabilità (no DB richiesto)
    const cookieStore = await cookies();
    
    // Access Token (dura 1h)
    cookieStore.set('titan_google_access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        path: '/',
    });

    // Refresh Token (dura per sempre finché non revocato)
    if (tokens.refresh_token) {
        cookieStore.set('titan_google_refresh_token', tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 giorni
            path: '/',
        });
    }

    // Redirect al calendario con successo
    return NextResponse.redirect(new URL('/calendar?connected=true', req.url));

  } catch (err: any) {
    console.error('OAuth Error:', err);
    return NextResponse.json({ error: 'Authentication failed', details: err.message }, { status: 500 });
  }
}
