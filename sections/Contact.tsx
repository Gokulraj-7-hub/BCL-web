'use client';

import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, User } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { ContactForm } from '@/components/ContactForm';
import {
  COMPANY,
  FULL_ADDRESS,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_LINK,
} from '@/constants/company';
import { slideInLeft, slideInRight, viewportOnce } from '@/lib/motion';

/** Contact details, business hours, an embedded map and the enquiry form. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative section-padding">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(43_140_238_/_0.1),transparent_60%)]"
      />

      <Container className="relative">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact Us"
          title="Let’s talk about"
          highlight="what you need built or secured"
          description="Whether it is a project, a training batch or an internship application — send us the details and we will get back to you."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Details column */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <GlassCard className="p-7">
              <h3 className="text-xl">Get in Touch</h3>

              <ul className="mt-6 flex flex-col gap-5">
                <ContactRow Icon={User} label="Director">
                  <span className="text-white">{COMPANY.director.name}</span>
                </ContactRow>

                <ContactRow Icon={Phone} label="Phone">
                  <a
                    href={`tel:${COMPANY.contact.phoneRaw}`}
                    className="text-white transition-colors hover:text-brand-300"
                  >
                    {COMPANY.contact.phone}
                  </a>
                </ContactRow>

                <ContactRow Icon={Mail} label="Email">
                  <a
                    href={`mailto:${COMPANY.contact.email}`}
                    className="break-all text-white transition-colors hover:text-brand-300"
                  >
                    {COMPANY.contact.email}
                  </a>
                </ContactRow>

                <ContactRow Icon={MapPin} label="Address">
                  <address className="leading-relaxed text-slate-300 not-italic">
                    {FULL_ADDRESS}
                  </address>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block text-xs font-semibold text-brand-300 hover:text-brand-200"
                  >
                    Open in Google Maps →
                  </a>
                </ContactRow>

                <ContactRow Icon={Clock} label="Business Hours">
                  <ul className="flex flex-col gap-1.5">
                    {COMPANY.businessHours.map((slot) => (
                      <li key={slot.days} className="flex justify-between gap-4 text-sm">
                        <span className="text-slate-300">{slot.days}</span>
                        <span
                          className={
                            slot.hours === 'Closed' ? 'text-slate-500' : 'font-medium text-white'
                          }
                        >
                          {slot.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </ContactRow>
              </ul>
            </GlassCard>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title={`Google Maps location of ${COMPANY.name}`}
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block w-full grayscale-[0.35] transition-[filter] duration-500 hover:grayscale-0"
              />
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <GlassCard hoverLift={false} className="p-7 sm:p-8">
              <h3 className="text-xl">Send Us a Message</h3>
              <p className="mt-2 text-sm text-slate-400">
                Fields marked <span className="text-brand-400">*</span> are required. We usually
                reply within one business day.
              </p>

              <div className="mt-7">
                <ContactForm />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  Icon,
  label,
  children,
}: {
  Icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-brand-400/20 bg-brand-500/10 text-brand-300">
        <Icon className="size-4.5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">{label}</p>
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </li>
  );
}
