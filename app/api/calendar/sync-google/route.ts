import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('titan_google_access_token')?.value;
    
    // Se non c'è access token, servirebbe logica per usare il refresh token
    // Per MVP assumiamo che l'utente si sia appena loggato o il token sia valido
    if (!accessToken) {
        return NextResponse.json({ error: 'Not authenticated with Google', code: 'AUTH_REQUIRED' }, { status: 401 });
    }

    const body = await req.json();
    const { events } = body;

    if (!events || !Array.isArray(events)) {
        return NextResponse.json({ error: 'Invalid events data' }, { status: 400 });
    }

    const results = [];

    for (const evt of events) {
        // Formatta evento per Google Calendar API
        const googleEvent = {
            summary: evt.title,
            description: `${evt.description || ''}\n\n[Created via ULTRAROBOTS Voice]`,
            location: evt.location,
            start: {
                dateTime: evt.start_date || new Date().toISOString(),
                timeZone: 'Europe/Rome' // Default
            },
            end: {
                dateTime: evt.end_date || new Date(new Date(evt.start_date).getTime() + 3600000).toISOString(), // +1h default
                timeZone: 'Europe/Rome'
            }
        };

        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(googleEvent)
        });

        const data = await response.json();
        
        if (response.ok) {
            results.push({ id: evt.id, status: 'synced', googleId: data.id });
        } else {
            console.error('Google API Error for event:', evt.title, data);
            results.push({ id: evt.id, status: 'error', error: data.error?.message });
        }
    }

    return NextResponse.json({ success: true, results });

  } catch (err: any) {
    console.error('Sync Error:', err);
    return NextResponse.json({ error: 'Sync failed', details: err.message }, { status: 500 });
  }
}
