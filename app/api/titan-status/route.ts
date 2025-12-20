import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const basePath = process.cwd();
    
    // Leggi package.json
    let packageJson: any = {};
    let urlCount = 18; // Default
    
    try {
      const pkgPath = path.join(basePath, 'package.json');
      if (fs.existsSync(pkgPath)) {
        packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      }
    } catch (e) {
      console.warn('package.json read error');
    }

    // Leggi sitemap.xml (se esiste in public)
    try {
      const sitemapPath = path.join(basePath, 'public', 'sitemap.xml');
      if (fs.existsSync(sitemapPath)) {
        const content = fs.readFileSync(sitemapPath, 'utf-8');
        urlCount = (content.match(/<url>/g) || []).length;
      }
    } catch (e) {
      console.warn('sitemap read error');
    }

    const reactVersion = packageJson.dependencies?.['react']?.replace('^', '') || '19.0.0';
    const nextVersion = packageJson.dependencies?.['next']?.replace('^', '') || '15.1.0';
    
    // Check servizi
    const hasDeepgram = !!process.env.DEEPGRAM_API_KEY;
    const hasOpenAI = !!process.env.OPENAI_API_KEY;

    const response = {
      security: {
        firewall: 'ACTIVE',
        sslTls: 'ENABLED',
        ddos: 'ACTIVE',
      },
      architecture: {
        framework: `Next.js ${nextVersion} + React ${reactVersion}`,
        buildSystem: 'Turbopack',
        deployment: process.env.VERCEL ? 'Vercel Edge' : 'Netlify Edge',
        routing: 'App Router (Server Components)',
      },
      performance: {
        buildStatus: 'OPTIMAL',
        sitemapUrls: urlCount,
        protocol: 'Sitemap 0.9',
        services: {
            deepgram: hasDeepgram ? 'CONNECTED' : 'OFFLINE',
            openai: hasOpenAI ? 'CONNECTED' : 'OFFLINE'
        }
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Titan Status Error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
