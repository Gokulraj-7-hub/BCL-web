import type { MetadataRoute } from 'next';
import { COMPANY } from '@/constants/company';
import { SITE_DESCRIPTION } from '@/lib/seo';

/** PWA manifest — enables install prompts and a branded splash screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: COMPANY.shortName,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#04070f',
    theme_color: '#04070f',
    orientation: 'portrait-primary',
    categories: ['business', 'education', 'technology'],
    icons: [
      { src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
