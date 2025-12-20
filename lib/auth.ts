'use client';

export function isAuthenticated(): boolean {
  if (typeof document === 'undefined') return false;
  
  // Check if auth_token cookie exists
  const cookies = document.cookie.split(';');
  return cookies.some(cookie => cookie.trim().startsWith('auth_token='));
}

export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/check');
    const data = await response.json();
    return data.authenticated === true;
  } catch {
    return false;
  }
}

export async function login(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  } catch {
    // Force reload even if API fails
    window.location.href = '/login';
  }
}

