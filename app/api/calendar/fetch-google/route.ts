import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
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

export async function GET(request: NextRequest) {
  try {
    // Get user session to determine which calendar and Service Account to use
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }

    // Each company has its own Service Account (from session)
    const serviceAccountJson = session.serviceAccountJson;
    // Use calendar ID from user session (multi-tenant)
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
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Get events from Google Calendar (last 30 days and future)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: thirtyDaysAgo.toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const googleEvents = response.data.items || [];

    // Transform Google Calendar events to our format
    const events = googleEvents.map((ge: any) => {
      const startDate = ge.start?.dateTime || ge.start?.date;
      const endDate = ge.end?.dateTime || ge.end?.date;

      return {
        id: ge.id,
        googleId: ge.id,
        title: ge.summary || 'Senza titolo',
        description: ge.description || '',
        location: ge.location || null,
        start_date: startDate ? new Date(startDate).toISOString() : null,
        end_date: endDate ? new Date(endDate).toISOString() : null,
        type: 'appointment', // Default type
        priority: 'medium', // Default priority
        syncStatus: 'synced',
        createdAt: ge.created || new Date().toISOString(),
        updatedAt: ge.updated || new Date().toISOString(),
      };
    });

    return NextResponse.json({ success: true, events }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Google Calendar Fetch Error:', {
      message: error?.message,
      code: error?.code,
      errors: error?.errors,
      responseData: error?.response?.data,
    });
    return NextResponse.json(
      { error: 'Failed to fetch events', details: error?.message, code: error?.code, apiError: error?.errors, responseData: error?.response?.data },
      { status: 500, headers: corsHeaders }
    );
  }
}

