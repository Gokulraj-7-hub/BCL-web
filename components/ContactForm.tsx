'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextAreaField, TextField } from '@/components/ui/FormField';
import { contactSchema, type ContactFormValues } from '@/lib/validation';
import type { ContactApiResponse } from '@/types';

type SubmitStatus =
  { state: 'idle' } | { state: 'success'; message: string } | { state: 'error'; message: string };

/**
 * Contact form.
 *
 * Validation runs against the same Zod schema the API route uses, so a client
 * that bypasses the form still hits identical rules server-side. A hidden
 * honeypot field catches naive bots without adding a CAPTCHA.
 */
export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>({ state: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '', company: '' },
  });

  // "Apply Now" buttons in the internships section stash a subject line before
  // scrolling here; pick it up so the enquiry arrives pre-tagged.
  useEffect(() => {
    const applyPrefill = () => {
      const subject = window.sessionStorage.getItem('bcl:contact-subject');
      if (subject) {
        setValue('subject', subject, { shouldValidate: true });
        window.sessionStorage.removeItem('bcl:contact-subject');
      }
    };

    applyPrefill();
    window.addEventListener('bcl:prefill-contact', applyPrefill);
    return () => window.removeEventListener('bcl:prefill-contact', applyPrefill);
  }, [setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ state: 'idle' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as ContactApiResponse;

      if (response.ok && result.success) {
        setStatus({ state: 'success', message: result.message });
        reset();
        return;
      }

      setStatus({
        state: 'error',
        message: result.message || 'Something went wrong. Please try again.',
      });
    } catch {
      setStatus({
        state: 'error',
        message:
          'We could not reach the server. Check your connection, or email us directly at bugcaplabinfo@gmail.com.',
      });
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from users, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Company (leave this field empty)</label>
        <input
          id="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="contact-name"
          label="Full Name"
          placeholder="Your name"
          autoComplete="name"
          required
          error={errors.name?.message}
          {...register('name')}
        />
        <TextField
          id="contact-email"
          label="Email Address"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="contact-phone"
          label="Phone Number"
          type="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          autoComplete="tel"
          required
          error={errors.phone?.message}
          {...register('phone')}
        />
        <TextField
          id="contact-subject"
          label="Subject"
          placeholder="e.g. Penetration testing enquiry"
          required
          error={errors.subject?.message}
          {...register('subject')}
        />
      </div>

      <TextAreaField
        id="contact-message"
        label="Message"
        placeholder="Tell us about your project, training requirement or internship application…"
        required
        rows={6}
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Status region — `aria-live` so screen readers announce the result. */}
      <div aria-live="polite" aria-atomic="true">
        {status.state === 'success' && (
          <p className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        )}
        {status.state === 'error' && (
          <p className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" isLoading={isSubmitting} fullWidth>
        {!isSubmitting && <Send className="size-4" aria-hidden="true" />}
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </Button>

      <p className="text-center text-xs text-slate-400">
        By submitting this form you agree to be contacted about your enquiry. We never share your
        details with third parties.
      </p>
    </form>
  );
}
