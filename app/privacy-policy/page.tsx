import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { COMPANY, FULL_ADDRESS } from '@/constants/company';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${COMPANY.name} collects, uses and protects the personal information you share through this website.`,
  alternates: { canonical: '/privacy-policy' },
};

/**
 * NOTE FOR THE COMPANY: this is a good-faith baseline policy that reflects how
 * the site actually behaves (contact form + optional analytics). Have it
 * reviewed by a legal advisor before launch, and update it if you add
 * newsletters, payments, cookies or third-party embeds.
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="1 January 2026"
      intro={`${COMPANY.name} respects your privacy. This policy explains what information we collect through this website, why we collect it, and the choices available to you.`}
      sections={[
        {
          heading: '1. Information We Collect',
          paragraphs: [
            'We only collect information you choose to give us, plus limited technical data that is generated automatically when you visit the site.',
          ],
          bullets: [
            'Information you submit through the contact form: your name, email address, phone number, subject and message.',
            'Technical data such as browser type, device type, approximate location derived from your IP address, and pages viewed — collected only if Google Analytics is enabled.',
            'We do not collect payment card details, government identification numbers or any special category personal data through this website.',
          ],
        },
        {
          heading: '2. How We Use Your Information',
          bullets: [
            'To respond to your enquiry about our services, training programs or internships.',
            'To contact you about the specific request you submitted.',
            'To understand, in aggregate, how visitors use the site so we can improve it.',
            'To comply with legal obligations where applicable.',
          ],
        },
        {
          heading: '3. Legal Basis and Consent',
          paragraphs: [
            'When you submit the contact form, you consent to us using the details provided to respond to your enquiry. We do not add you to a marketing list without a separate, explicit opt-in.',
          ],
        },
        {
          heading: '4. How Your Information Is Stored',
          paragraphs: [
            'Contact form submissions are delivered by email to our official address and stored in that mailbox. Form data is transmitted over HTTPS and is not written to a public database by this website.',
            'We retain enquiry emails only as long as needed to handle your request and to maintain reasonable business records.',
          ],
        },
        {
          heading: '5. Sharing and Disclosure',
          paragraphs: [
            'We do not sell, rent or trade your personal information. We share it only in these limited circumstances:',
          ],
          bullets: [
            'With service providers who operate our infrastructure (website hosting and email delivery), strictly to provide the service.',
            'Where disclosure is required by law, regulation or a valid legal request.',
          ],
        },
        {
          heading: '6. Cookies and Analytics',
          paragraphs: [
            'This website does not set advertising or tracking cookies of its own. If Google Analytics is enabled, it may set cookies to measure aggregate site usage; IP anonymisation is turned on. You can block cookies through your browser settings without losing access to any part of the site.',
            'The contact form uses your browser’s session storage to carry a pre-filled subject line between sections. That data stays on your device and is cleared when you close the tab.',
          ],
        },
        {
          heading: '7. Third-Party Embeds',
          paragraphs: [
            'The contact section embeds a Google Maps frame so you can locate our office. Loading that map means Google may receive your IP address and standard request data under its own privacy policy.',
          ],
        },
        {
          heading: '8. Security',
          paragraphs: [
            'The site is served over HTTPS with strict transport security, content security policy and clickjacking protections enabled. Form input is validated and sanitised on both the client and the server, and submissions are rate limited to deter abuse.',
            'No system can be guaranteed completely secure, but we apply the same defensive practices to our own website that we recommend to our clients.',
          ],
        },
        {
          heading: '9. Your Rights',
          bullets: [
            'Request a copy of the personal information we hold about you.',
            'Ask us to correct information that is inaccurate or incomplete.',
            'Ask us to delete your enquiry and associated correspondence.',
            'Withdraw consent for further contact at any time.',
          ],
          paragraphs: [
            `To exercise any of these rights, email ${COMPANY.contact.email} or call ${COMPANY.contact.phone}. We will respond within a reasonable period.`,
          ],
        },
        {
          heading: '10. Children’s Privacy',
          paragraphs: [
            'This website is intended for businesses, students and working professionals. We do not knowingly collect personal information from children under 13. If you believe a child has submitted information, contact us and we will delete it.',
          ],
        },
        {
          heading: '11. Changes to This Policy',
          paragraphs: [
            'We may update this policy as our services or legal obligations change. The revision date at the top of this page always reflects the current version.',
          ],
        },
        {
          heading: '12. Contact Us',
          paragraphs: [
            `If you have any question about this policy or how your data is handled, write to us at ${COMPANY.contact.email}, call ${COMPANY.contact.phone}, or post to: ${FULL_ADDRESS}.`,
          ],
        },
      ]}
    />
  );
}
