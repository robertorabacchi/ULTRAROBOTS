import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('google_access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated with Google' }, { status: 401 });
  }

  try {
    const { events } = await req.json();

    if (!events || !Array.isArray(events)) {
        return NextResponse.json({ error: 'Invalid events data' }, { status: 400 });
    }

    const results = [];

    for (const evt of events) {
        // Converti formato evento nostro -> formato Google Calendar
        const googleEvent = {
            summary: evt.title,
            description: evt.description,
            location: evt.location,
            start: {
                dateTime: evt.start_date || new Date().toISOString(),
                timeZone: 'Europe/Rome', // Hardcoded per ora
            },
            end: {
                dateTime: evt.end_date || new Date(new Date(evt.start_date || Date.now()).getTime() + 60*60*1000).toISOString(),
                timeZone: 'Europe/Rome',
            }
        };

        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(googleEvent)
        });

        if (response.ok) {
            const data = await response.json();
            results.push({ id: evt.id, status: 'synced', googleId: data.id });
        } else {
            const err = await response.text();
            results.push({ id: evt.id, status: 'error', error: err });
        }
    }

    return NextResponse.json({ success: true, results });

  } catch (err: any) {
    console.error('Sync Error:', err);
    return NextResponse.json({ error: 'Sync failed', details: err.message }, { status: 500 });
  }
}

