'use client';

import Link from 'next/link';
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { COMPANY, FULL_ADDRESS } from '@/constants/company';
import {
  FOOTER_LEARNING_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICE_LINKS,
  LEGAL_LINKS,
} from '@/constants/navigation';
import { scrollToSection } from '@/utils/dom';
import type { NavItem } from '@/types';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: COMPANY.social.linkedin, Icon: Linkedin },
  { label: 'X (Twitter)', href: COMPANY.social.twitter, Icon: Twitter },
  { label: 'Facebook', href: COMPANY.social.facebook, Icon: Facebook },
  { label: 'Instagram', href: COMPANY.social.instagram, Icon: Instagram },
  { label: 'GitHub', href: COMPANY.social.github, Icon: Github },
  { label: 'YouTube', href: COMPANY.social.youtube, Icon: Youtube },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 cyber-grid opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 size-96 rounded-full bg-brand-700/15 blur-[120px]"
      />

      <Container className="relative py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo size={48} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {COMPANY.description}
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`tel:${COMPANY.contact.phoneRaw}`}
                  className="flex items-center gap-3 text-slate-300 transition-colors hover:text-brand-300"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5">
                    <Phone className="size-3.5 text-brand-400" aria-hidden="true" />
                  </span>
                  {COMPANY.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="flex items-center gap-3 break-all text-slate-300 transition-colors hover:text-brand-300"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5">
                    <Mail className="size-3.5 text-brand-400" aria-hidden="true" />
                  </span>
                  {COMPANY.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5">
                  <MapPin className="size-3.5 text-brand-400" aria-hidden="true" />
                </span>
                <address className="not-italic leading-relaxed">{FULL_ADDRESS}</address>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            <FooterLinkColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
            <FooterLinkColumn title="Services" links={FOOTER_SERVICE_LINKS} />
            <FooterLinkColumn title="Training & Careers" links={FOOTER_LEARNING_LINKS} />
          </div>
        </div>

        {/* Social */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-sm font-semibold text-white">Follow BugCap Labs</p>
            <ul className="mt-3 flex flex-wrap items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${COMPANY.shortName} on ${label}`}
                    className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/15 hover:text-brand-300"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm sm:text-right">
            <p className="text-slate-400">
              <span className="font-semibold text-white">{COMPANY.director.name}</span>
              <span className="mx-2 text-slate-600">•</span>
              {COMPANY.director.title}
            </p>
            <p className="mt-1 text-xs tracking-[0.14em] text-brand-400 uppercase">
              {COMPANY.tagline}
            </p>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brand-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: readonly NavItem[] }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a
              href={link.href}
              onClick={(event) => {
                if (link.href.startsWith('#')) {
                  event.preventDefault();
                  scrollToSection(link.href);
                }
              }}
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-brand-300"
            >
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-brand-500/60 transition-colors"
              />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
