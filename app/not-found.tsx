import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { GridBackdrop } from '@/components/background/GridBackdrop';

/**
 * The `robots` override is required, not redundant.
 *
 * Next.js emits its own `<meta name="robots" content="noindex">` for the
 * not-found boundary, but the root layout's `index, follow` is still inherited
 * here — without this override the 404 ships two *conflicting* directives.
 * With it, both tags agree on `noindex`.
 */
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden py-24">
      <GridBackdrop />

      <Container className="relative text-center">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6">
          <Logo size={56} withText={false} />

          <p className="font-heading text-7xl font-bold text-gradient-brand sm:text-8xl">404</p>

          <h1 className="text-3xl sm:text-4xl">This page could not be found</h1>

          <p className="text-slate-400">
            The link may be broken or the page may have moved. Head back to the homepage and you
            will find everything from there.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-7 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-transform hover:-translate-y-0.5"
            >
              Back to Homepage
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-brand-500/50 px-7 text-sm font-semibold text-brand-200 transition-colors hover:bg-brand-500/10 hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
