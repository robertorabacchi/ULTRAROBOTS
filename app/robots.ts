import type { MetadataRoute } from 'next';

const baseUrl = process.env.SITE_URL || 'https://ultrarobots.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}



