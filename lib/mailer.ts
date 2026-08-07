import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import { COMPANY } from '@/constants/company';
import { escapeHtml } from '@/lib/validation';
import type { ContactFormData } from '@/lib/validation';

/**
 * Server-only mail transport. Credentials come from environment variables and
 * are never bundled into client code (`server-only` makes an accidental client
 * import a build error).
 */

let cachedTransporter: Transporter | null = null;

function readSmtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  };
}

/** Returns `null` when SMTP is not configured, so callers can degrade gracefully. */
function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const config = readSmtpConfig();
  if (!config) return null;

  cachedTransporter = nodemailer.createTransport(config);
  return cachedTransporter;
}

export function isMailConfigured(): boolean {
  return readSmtpConfig() !== null;
}

function buildHtml(data: ContactFormData): string {
  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Subject', data.subject],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0b1220;width:120px;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#334155;">${escapeHtml(
            value,
          )}</td>
        </tr>`,
    )
    .join('');

  // Preserve line breaks from the textarea without allowing raw HTML through.
  const messageHtml = escapeHtml(data.message).replace(/\n/g, '<br />');

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f1f5f9;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr>
        <td style="background:#0a1128;padding:20px 24px;">
          <h1 style="margin:0;color:#ffffff;font-size:18px;">New enquiry — ${escapeHtml(
            COMPANY.name,
          )}</h1>
          <p style="margin:4px 0 0;color:#60a5fa;font-size:13px;">Submitted via the website contact form</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 10px 0;">
          <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 24px 24px;">
          <p style="margin:0 0 8px;font-weight:600;color:#0b1220;font-size:14px;">Message</p>
          <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;color:#334155;font-size:14px;line-height:1.6;">${messageHtml}</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildText(data: ContactFormData): string {
  return [
    `New enquiry — ${COMPANY.name}`,
    '',
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone}`,
    `Subject: ${data.subject}`,
    '',
    'Message:',
    data.message,
  ].join('\n');
}

/**
 * Deliver a contact-form submission. Returns `false` when SMTP is not
 * configured; throws only on an actual transport failure.
 */
export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;

  const to = process.env.CONTACT_TO_EMAIL ?? COMPANY.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER ?? COMPANY.contact.email;

  await transporter.sendMail({
    from: `"${COMPANY.shortName} Website" <${from}>`,
    to,
    // Replying in the mail client goes straight back to the enquirer.
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `[Website] ${data.subject}`,
    text: buildText(data),
    html: buildHtml(data),
  });

  return true;
}
