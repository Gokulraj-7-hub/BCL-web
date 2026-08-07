import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { isMailConfigured, sendContactEmail } from '@/lib/mailer';
import { getClientIdentifier, rateLimit } from '@/lib/rate-limit';
import type { ContactApiResponse } from '@/types';

/** Node runtime — Nodemailer needs Node APIs that the edge runtime lacks. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Reject oversized bodies before parsing them. */
const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: Request): Promise<NextResponse<ContactApiResponse>> {
  // --- Rate limiting -------------------------------------------------------
  const identifier = getClientIdentifier(request.headers);
  const limit = rateLimit(identifier);

  if (!limit.success) {
    return NextResponse.json(
      {
        success: false,
        message: `Too many submissions. Please try again in about ${Math.ceil(
          limit.retryAfter / 60,
        )} minute(s).`,
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  // --- Body parsing --------------------------------------------------------
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, message: 'Your message is too long. Please shorten it and try again.' },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request format.' },
      { status: 400 },
    );
  }

  // --- Validation ----------------------------------------------------------
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const { company, ...fieldErrors } = parsed.error.flatten().fieldErrors;

    // A filled honeypot means a bot. Return a generic success so the bot has
    // no signal to adapt to, while sending nothing.
    if (company) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message. We will be in touch shortly.',
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Please correct the highlighted fields and try again.',
        errors: fieldErrors as Record<string, string[]>,
      },
      { status: 422 },
    );
  }

  // --- Delivery ------------------------------------------------------------
  if (!isMailConfigured()) {
    // Deployed without SMTP credentials: tell the visitor plainly rather than
    // pretending the message was delivered.
    console.warn('[contact] SMTP is not configured — submission was not delivered.');
    return NextResponse.json(
      {
        success: false,
        message:
          'Our contact form is not configured for delivery yet. Please email bugcaplabinfo@gmail.com or call +91 79047 67261.',
      },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail(parsed.data);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. Our team will get back to you within one business day.',
    });
  } catch (error) {
    // Log server-side only — never leak transport details to the client.
    console.error('[contact] Failed to send email:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          'We could not send your message right now. Please email bugcaplabinfo@gmail.com or call +91 79047 67261.',
      },
      { status: 502 },
    );
  }
}

/** Any method other than POST is not supported on this endpoint. */
export function GET(): NextResponse<ContactApiResponse> {
  return NextResponse.json(
    { success: false, message: 'Method not allowed.' },
    { status: 405, headers: { Allow: 'POST' } },
  );
}
