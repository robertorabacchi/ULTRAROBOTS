import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const { event } = await request.json();

    if (!event) {
      return NextResponse.json({ error: 'Missing event data' }, { status: 400 });
    }

    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!serviceAccountJson || !calendarId) {
      console.error('Missing Google Service Account credentials');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Parse service account credentials
    let credentials;
    try {
      // Try parsing as-is first
      credentials = JSON.parse(serviceAccountJson);
    } catch (e) {
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
        }, { status: 500 });
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

    return NextResponse.json({ success: true, eventId: response.data.id });

  } catch (error: any) {
    console.error('Google Calendar Sync Error:', {
      message: error?.message,
      code: error?.code,
      errors: error?.errors,
      responseData: error?.response?.data,
    });
    return NextResponse.json(
      { error: 'Failed to sync event', details: error?.message, code: error?.code, apiError: error?.errors, responseData: error?.response?.data },
      { status: 500 }
    );
  }
}
