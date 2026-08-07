import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/ContactForm';

const validInput = {
  name: 'Manikandan K',
  email: 'someone@example.com',
  phone: '+91 79047 67261',
  subject: 'Penetration testing enquiry',
  message: 'We would like a vulnerability assessment for our web application.',
};

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), validInput.name);
  await user.type(screen.getByLabelText(/email address/i), validInput.email);
  await user.type(screen.getByLabelText(/phone number/i), validInput.phone);
  await user.type(screen.getByLabelText(/subject/i), validInput.subject);
  await user.type(screen.getByLabelText(/message/i), validInput.message);
}

beforeEach(() => {
  vi.restoreAllMocks();
  window.sessionStorage.clear();
});

describe('ContactForm', () => {
  it('renders every required field with an accessible label', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toBeRequired();
    expect(screen.getByLabelText(/email address/i)).toBeRequired();
    expect(screen.getByLabelText(/phone number/i)).toBeRequired();
    expect(screen.getByLabelText(/subject/i)).toBeRequired();
    expect(screen.getByLabelText(/message/i)).toBeRequired();
  });

  it('shows validation errors and does not submit an empty form', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findAllByRole('alert')).not.toHaveLength(0);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('rejects a malformed email address', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const email = screen.getByLabelText(/email address/i);
    await user.type(email, 'not-an-email');
    await user.tab();

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(email).toHaveAttribute('aria-invalid', 'true');
  });

  it('rejects a message that is too short', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/message/i), 'hi');
    await user.tab();

    expect(await screen.findByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  it('posts valid data to the contact endpoint and shows a success message', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true, message: 'Thank you for your message.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledOnce());

    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/contact');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toMatchObject(validInput);

    expect(await screen.findByText('Thank you for your message.')).toBeInTheDocument();
  });

  it('surfaces a server-side failure to the user', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: false, message: 'Delivery failed.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Delivery failed.')).toBeInTheDocument();
  });

  it('handles a network error without crashing', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/could not reach the server/i)).toBeInTheDocument();
  });

  it('pre-fills the subject stashed by an internship "Apply Now" button', () => {
    window.sessionStorage.setItem('bcl:contact-subject', 'Internship Application — Cyber Security');
    render(<ContactForm />);

    expect(screen.getByLabelText(/subject/i)).toHaveValue(
      'Internship Application — Cyber Security',
    );
    // The stashed value is consumed so it cannot leak into a later visit.
    expect(window.sessionStorage.getItem('bcl:contact-subject')).toBeNull();
  });

  it('keeps the honeypot field out of the accessibility tree', () => {
    const { container } = render(<ContactForm />);

    const honeypot = container.querySelector('#company-website');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
