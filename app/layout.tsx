import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { baseMetadata } from '@/lib/seo';
import { homePageSchemas } from '@/lib/schema';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { CursorGlow } from '@/components/background/CursorGlow';
import { RevealObserver } from '@/components/background/RevealObserver';
import { CardPointerEffects } from '@/components/background/CardPointerEffects';

/**
 * Fonts are self-hosted by `next/font`, which removes the render-blocking
 * request to Google Fonts and eliminates layout shift via `font-display: swap`
 * plus an automatic size-adjusted fallback.
 */
/**
 * Inter is a variable font, so it is a single ~48 kB file — the largest asset
 * on the page. It is deliberately *not* preloaded: Lighthouse identified the
 * hero `<h1>` (Poppins) as the Largest Contentful Paint element, and having
 * Inter compete for the same early bandwidth pushed that paint later. Body
 * text renders in the size-adjusted fallback for a moment instead, which is
 * imperceptible and costs nothing in layout shift.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: false,
});

/**
 * Poppins is not a variable font, so every weight is a separate file that gets
 * preloaded. Only the three weights the headings actually use are requested —
 * carrying 400 and 800 as well cost two extra render-blocking font fetches and
 * measurably delayed Largest Contentful Paint.
 */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#04070f',
  colorScheme: 'dark',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Structured data — one script per graph so each validates independently. */}
        {homePageSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            // Content is generated from typed constants in `lib/schema.ts`,
            // never from user input.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>

      <body className="min-h-dvh antialiased">
        {/* Single delegated listeners for every scroll reveal and card
            pointer effect on the page — see each component for why. */}
        <RevealObserver />
        <CardPointerEffects />
        <CursorGlow />
        <Navbar />

        <main id="main-content" className="relative">
          {children}
        </main>

        <Footer />
        <FloatingActions />

        {/* Google Analytics — only injected when an ID is configured. */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
