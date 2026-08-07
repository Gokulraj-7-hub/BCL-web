import type { Metadata } from 'next';
import { COMPANY, SITE_URL } from '@/constants/company';

export const SITE_TITLE = `${COMPANY.name} | Cyber Security, Software Development & IT Training in Erode`;

export const SITE_DESCRIPTION =
  'BugCap Labs Pvt. Ltd. delivers software development, cyber security, cloud solutions, digital forensics, hardware & networking, professional training, internships and placement assistance from Erode, Tamil Nadu.';

export const SITE_KEYWORDS = [
  'BugCap Labs',
  'cyber security company Erode',
  'software development company Tamil Nadu',
  'ethical hacking training Erode',
  'penetration testing services India',
  'digital forensics services',
  'cloud solutions AWS Azure',
  'web development company Erode',
  'mobile app development Tamil Nadu',
  'internship programs Erode',
  'placement assistance training institute',
  'python java training Erode',
  'hardware and networking services',
  'IT training institute Bhavani',
];

/** Base metadata shared by every route; individual pages override as needed. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${COMPANY.shortName}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name, url: SITE_URL }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: COMPANY.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} — ${COMPANY.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.svg'],
    creator: '@bugcaplabs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icon-192.svg', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
