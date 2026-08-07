import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/company';

/** robots.txt — allow everything except the API surface. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
