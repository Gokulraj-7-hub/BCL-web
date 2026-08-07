import { z } from 'zod';

/**
 * Strip characters that are meaningless in a plain-text message but useful in
 * an injection payload (angle brackets, control characters). Output is always
 * treated as text — never rendered as HTML — so this is defence in depth.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .replace(/[<>]/g, '')
    .trim();
}

/** Escape a string for safe interpolation into an HTML email body. */
export function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return input.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

const NAME_PATTERN = /^[\p{L}\p{M}\s.'-]+$/u;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

/**
 * Contact form schema. Shared by the client (React Hook Form resolver) and the
 * server route, so validation can never be bypassed by editing the DOM.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter at least 2 characters.')
    .max(80, 'Name must be 80 characters or fewer.')
    .regex(NAME_PATTERN, 'Please use letters, spaces, hyphens and apostrophes only.')
    .transform(sanitizeText),

  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .max(160, 'Email must be 160 characters or fewer.')
    .email('Please enter a valid email address.')
    .toLowerCase(),

  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number.')
    .max(20, 'Phone number must be 20 characters or fewer.')
    .regex(PHONE_PATTERN, 'Please enter a valid phone number.')
    .transform(sanitizeText),

  subject: z
    .string()
    .trim()
    .min(3, 'Please enter at least 3 characters.')
    .max(120, 'Subject must be 120 characters or fewer.')
    .transform(sanitizeText),

  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more (at least 10 characters).')
    .max(2000, 'Message must be 2000 characters or fewer.')
    .transform(sanitizeText),

  /**
   * Honeypot. Hidden from real users via CSS and `aria-hidden`; bots that fill
   * every field in the form will populate it and get rejected silently.
   */
  company: z.string().max(0, 'Spam detected.').optional().default(''),
});

/** Input shape before Zod transforms (what the form fields hold). */
export type ContactFormValues = z.input<typeof contactSchema>;
/** Output shape after validation and sanitisation. */
export type ContactFormData = z.output<typeof contactSchema>;
