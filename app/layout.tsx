import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { baseMetadata } from '@/lib/seo';
import { homePageSchemas } from '@/lib/schema';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { Preloader } from '@/components/layout/Preloader';
import { CursorGlow } from '@/components/background/CursorGlow';

/**
 * Fonts are self-hosted by `next/font`, which removes the render-blocking
 * request to Google Fonts and eliminates layout shift via `font-display: swap`
 * plus an automatic size-adjusted fallback.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
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
        <Preloader />
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
