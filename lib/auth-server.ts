import { cookies } from 'next/headers';

export interface UserSession {
  username: string;
  calendarId: string;
  serviceAccountJson: string; // Each company has its own Service Account
  timestamp: number;
}

export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    
    if (!token) return null;
    
    const sessionData = JSON.parse(Buffer.from(token.value, 'base64').toString());
    
    // Check if session is expired (7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    if (sessionData.timestamp < sevenDaysAgo) {
      return null;
    }
    
    return sessionData as UserSession;
  } catch {
    return null;
  }
}

