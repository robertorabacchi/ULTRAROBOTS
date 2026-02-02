import type { MetadataRoute } from 'next';

const baseUrl = process.env.SITE_URL || 'https://ultrarobots.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/',
    '/technology',
    '/platform',
    '/ai-robot-bridge',
    '/reports',
    '/calendar',
    '/contact',
    '/ai-docs',
    '/bin-picking',
  ];

  const now = new Date();

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
