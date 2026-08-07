import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/company';

/**
 * Generated sitemap. The site is a single page, so section anchors are listed
 * as separate entries to help search engines surface deep links.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const sections = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '#about', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '#services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '#training', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '#internships', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '#technologies', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '#process', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '#gallery', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '#faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '#contact', priority: 0.9, changeFrequency: 'yearly' as const },
  ];

  return [
    ...sections.map((section) => ({
      url: `${SITE_URL}/${section.path}`,
      lastModified,
      changeFrequency: section.changeFrequency,
      priority: section.priority,
    })),
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}
