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
      credentials = JSON.parse(serviceAccountJson);
    } catch (e) {
      console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON');
      return NextResponse.json({ error: 'Invalid credentials format' }, { status: 500 });
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
    console.error('Google Calendar Sync Error:', error);
    return NextResponse.json(
      { error: 'Failed to sync event', details: error.message },
      { status: 500 }
    );
  }
}
