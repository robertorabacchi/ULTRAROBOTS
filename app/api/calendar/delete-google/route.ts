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

    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json({ error: 'Missing event ID' }, { status: 400, headers: corsHeaders });
    }

    // Each company has its own Service Account (from session)
    const serviceAccountJson = session.serviceAccountJson;
    const calendarId = session.calendarId;

    if (!serviceAccountJson || !calendarId) {
      console.error('Missing Google Service Account credentials');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500, headers: corsHeaders });
    }

    // Parse service account credentials
    let credentials;
    try {
      credentials = JSON.parse(serviceAccountJson);
    } catch (e) {
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
        }, { status: 500, headers: corsHeaders });
      }
    }

    // Authenticate with JWT (Service Account)
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Delete event from Google Calendar
    await calendar.events.delete({
      calendarId: calendarId,
      eventId: eventId,
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Google Calendar Delete Error:', {
      message: error?.message,
      code: error?.code,
      errors: error?.errors,
      responseData: error?.response?.data,
    });
    return NextResponse.json(
      { error: 'Failed to delete event', details: error?.message, code: error?.code, apiError: error?.errors, responseData: error?.response?.data },
      { status: 500, headers: corsHeaders }
    );
  }
}

