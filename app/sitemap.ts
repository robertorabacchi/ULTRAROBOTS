import type { MetadataRoute } from 'next';

const baseUrl = process.env.SITE_URL || 'https://ultrarobots.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/',
    '/technology',
    '/platform',
    '/reports',
    '/calendar',
    '/contact',
    '/ai-docs',
  ];

  const now = new Date();

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}



