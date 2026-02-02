import { MetadataRoute } from 'next';

const baseUrl = process.env.SITE_URL || 'https://ultrarobots.ai';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*?*',
          '/*?ref=',
          '/*?utm_',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
