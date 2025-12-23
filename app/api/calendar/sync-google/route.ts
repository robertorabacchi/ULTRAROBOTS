import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getSession } from '@/lib/auth-server';

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

export async function POST(request: NextRequest) {
  try {
    // Get user session to determine which calendar to use
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }

    const { event } = await request.json();

    if (!event) {
      return NextResponse.json({ error: 'Missing event data' }, { status: 400, headers: corsHeaders });
    }

    // Each company has its own Service Account (from session)
    const serviceAccountJson = session.serviceAccountJson;
    // Use calendar ID from user session (multi-tenant)
    const calendarId = session.calendarId;

    if (!serviceAccountJson || !calendarId) {
      console.error('Missing Google Service Account credentials');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500, headers: corsHeaders });
    }

    type ServiceCredentials = {
      client_email?: string;
      private_key?: string;
    };

    // Parse service account credentials
    let credentials: ServiceCredentials;
    try {
      // Try parsing as-is first
      credentials = JSON.parse(serviceAccountJson);
    } catch {
      // If parsing fails, try removing any extra quotes or escaping
      try {
        const cleaned = serviceAccountJson.replace(/^["']|["']$/g, '').replace(/\\"/g, '"').replace(/\\n/g, '\n');
        credentials = JSON.parse(cleaned);
      } catch (e2) {
        console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON', {
          originalLength: serviceAccountJson?.length,
          firstChars: serviceAccountJson?.substring(0, 50),
          parseError: e2 instanceof Error ? e2.message : String(e2)
        });
        return NextResponse.json({ 
          error: 'Invalid credentials format', 
          details: e2 instanceof Error ? e2.message : 'JSON parse failed',
          hint: 'Check GOOGLE_SERVICE_ACCOUNT_JSON format in Netlify env vars'
        }, { status: 500, headers: corsHeaders });
      }
    }

    // Authenticate with JWT (Service Account) - use options object for latest google-auth-library
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Format event for Google Calendar
    const googleEvent = {
      summary: event.title,
      description: event.description || '',
      location: event.location,
      start: {
        dateTime: new Date(event.start_date || event.date).toISOString(), 
        timeZone: 'Europe/Rome'
      },
      end: {
        dateTime: event.end_date 
            ? new Date(event.end_date).toISOString() 
            : new Date(new Date(event.start_date || event.date).getTime() + 60 * 60 * 1000).toISOString(), // Default 1 hour
        timeZone: 'Europe/Rome'
      },
    };

    // Insert event
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: googleEvent,
    });

    return NextResponse.json({ success: true, eventId: response.data.id }, { headers: corsHeaders });

  } catch (error: unknown) {
    const err = error as { message?: string; code?: string; errors?: unknown; response?: { data?: unknown } } | null;
    console.error('Google Calendar Sync Error:', {
      message: err?.message,
      code: err?.code,
      errors: err?.errors,
      responseData: err?.response?.data,
    });
    return NextResponse.json(
      {
        error: 'Failed to sync event',
        details: err?.message,
        code: err?.code,
        apiError: err?.errors,
        responseData: err?.response?.data,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
