import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// User credentials mapping: username -> { password, calendarId }
// Format: JSON string like: {"user1": {"password": "pass1", "calendarId": "cal1@email.com"}, "user2": {...}}
function getUserCredentials() {
  const mappingJson = process.env.USER_CALENDAR_MAPPING;
  if (mappingJson) {
    try {
      return JSON.parse(mappingJson);
    } catch (e) {
      console.error('Failed to parse USER_CALENDAR_MAPPING', e);
    }
  }
  
  // Fallback: single user from old env vars (backward compatibility)
  const defaultUser = process.env.SITE_USERNAME || 'admin';
  const defaultPass = process.env.SITE_PASSWORD || 'ultrarobots2025';
  const defaultCalendar = process.env.GOOGLE_CALENDAR_ID || '';
  const defaultServiceAccount = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '';
  
  return {
    [defaultUser]: {
      password: defaultPass,
      calendarId: defaultCalendar,
      serviceAccountJson: defaultServiceAccount // Use existing env var for backward compatibility
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const userMapping = getUserCredentials();

    const userCreds = userMapping[username];
    
    if (userCreds && userCreds.password === password) {
      // Create session token with username, calendar ID, and service account
      const sessionData = {
        username,
        calendarId: userCreds.calendarId,
        serviceAccountJson: userCreds.serviceAccountJson, // Each company has its own Service Account
        timestamp: Date.now()
      };
      const token = Buffer.from(JSON.stringify(sessionData)).toString('base64');
      
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

      const cookieStore = await cookies();
      cookieStore.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires,
        path: '/',
      });

      return NextResponse.json({ success: true, username, calendarId: userCreds.calendarId }, { headers: corsHeaders });
    } else {
      return NextResponse.json(
        { error: 'Credenziali non valide' },
        { status: 401, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500, headers: corsHeaders }
    );
  }
}

