import { describe, expect, it } from 'vitest';
import { contactSchema, escapeHtml, sanitizeText } from '@/lib/validation';

const validPayload = {
  name: 'Manikandan K',
  email: 'Someone@Example.COM',
  phone: '+91 79047 67261',
  subject: 'Penetration testing enquiry',
  message: 'We would like a vulnerability assessment for our web application.',
  company: '',
};

describe('sanitizeText', () => {
  it('strips angle brackets used in HTML injection', () => {
    expect(sanitizeText('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
  });

  it('strips control characters', () => {
    expect(sanitizeText('hel\u0000lo\u001f world')).toBe('hello world');
  });

  it('trims surrounding whitespace', () => {
    expect(sanitizeText('   spaced   ')).toBe('spaced');
  });
});

describe('escapeHtml', () => {
  it('escapes every HTML-significant character', () => {
    expect(escapeHtml(`<a href="x">O'Brien & Co</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;O&#39;Brien &amp; Co&lt;/a&gt;',
    );
  });

  it('leaves safe text untouched', () => {
    expect(escapeHtml('Plain text 123')).toBe('Plain text 123');
  });
});

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('lowercases the email address', () => {
    const result = contactSchema.parse(validPayload);
    expect(result.email).toBe('someone@example.com');
  });

  it('sanitises the message body', () => {
    const result = contactSchema.parse({
      ...validPayload,
      message: '<img src=x onerror=alert(1)> please contact me about training',
    });
    expect(result.message).not.toContain('<');
    expect(result.message).not.toContain('>');
  });

  it.each([
    ['name too short', { name: 'A' }],
    ['name with digits', { name: 'User 123' }],
    ['invalid email', { email: 'not-an-email' }],
    ['phone too short', { phone: '123' }],
    ['phone with letters', { phone: 'call-me-now' }],
    ['subject too short', { subject: 'hi' }],
    ['message too short', { message: 'too short' }],
  ])('rejects %s', (_label, override) => {
    const result = contactSchema.safeParse({ ...validPayload, ...override });
    expect(result.success).toBe(false);
  });

  it('rejects a message over the 2000 character limit', () => {
    const result = contactSchema.safeParse({ ...validPayload, message: 'a'.repeat(2001) });
    expect(result.success).toBe(false);
  });

  it('accepts names with accents, apostrophes and hyphens', () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "Anne-Marie O'Néill" });
    expect(result.success).toBe(true);
  });

  it('rejects a filled honeypot field', () => {
    const result = contactSchema.safeParse({ ...validPayload, company: 'spam-bot' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.company).toBeDefined();
    }
  });
});
