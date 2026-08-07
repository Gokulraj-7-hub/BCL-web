import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { COMPANY, FULL_ADDRESS } from '@/constants/company';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `The terms that govern your use of the ${COMPANY.name} website and the services described on it.`,
  alternates: { canonical: '/terms-and-conditions' },
};

/**
 * NOTE FOR THE COMPANY: baseline terms covering website use, training and
 * services. Have them reviewed by a legal advisor and aligned with your actual
 * service agreements, fee policy and refund policy before launch.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated="1 January 2026"
      intro={`These terms govern your use of the ${COMPANY.name} website. By browsing this site or submitting an enquiry, you agree to them. If you do not agree, please do not use the site.`}
      sections={[
        {
          heading: '1. About Us',
          paragraphs: [
            `${COMPANY.legalName} is a technology company registered in India, with its office at ${FULL_ADDRESS}. References to "we", "us" and "our" mean ${COMPANY.name}.`,
          ],
        },
        {
          heading: '2. Use of This Website',
          bullets: [
            'You may browse and use this site for lawful, personal or business purposes.',
            'You must not attempt to gain unauthorised access to the site, its servers, or any connected system.',
            'You must not use the site to transmit malware, conduct automated scraping at a rate that degrades service, or submit false or misleading information.',
            'You must not copy, reproduce or republish substantial portions of the site content without our written permission.',
          ],
        },
        {
          heading: '3. Information Is Not an Offer',
          paragraphs: [
            'Service descriptions, training curricula, internship details, durations and statistics on this website are provided for general information. They do not constitute a binding offer. Every engagement is governed by a separate written proposal, quotation or enrolment agreement.',
          ],
        },
        {
          heading: '4. Training and Internship Programs',
          bullets: [
            'Program content, duration, batch timings and mode of delivery may be revised to keep pace with industry requirements.',
            'Certificates are issued only on satisfactory completion of the coursework and the assigned project.',
            'Placement assistance means preparation, guidance and introductions to our hiring-partner network. It is assistance, not a guarantee of employment — hiring decisions rest entirely with the employer.',
            'Fees, instalments and refund eligibility are set out in your enrolment agreement.',
          ],
        },
        {
          heading: '5. Professional Services',
          bullets: [
            'Project scope, deliverables, timelines, acceptance criteria and payment terms are defined in the written agreement for each engagement.',
            'Security testing is performed only within an agreed scope and with your written authorisation. We will not test systems you do not own or are not authorised to have tested.',
            'Unless the agreement states otherwise, intellectual property in bespoke deliverables transfers to the client on receipt of final payment.',
            'Post-delivery support is provided for the period stated in the agreement, and may be extended under an AMC or retainer.',
          ],
        },
        {
          heading: '6. Confidentiality',
          paragraphs: [
            'Information you share with us in the course of an engagement — including security findings — is treated as confidential and is not disclosed to third parties except as required by law or with your consent.',
          ],
        },
        {
          heading: '7. Intellectual Property',
          paragraphs: [
            `All content on this website, including text, layout, graphics, the ${COMPANY.shortName} name and logo, is owned by or licensed to us and is protected by applicable intellectual property law.`,
          ],
        },
        {
          heading: '8. Third-Party Links and Embeds',
          paragraphs: [
            'This site links to third-party platforms and embeds a Google Maps frame. We do not control those services and are not responsible for their content, availability or privacy practices.',
          ],
        },
        {
          heading: '9. Disclaimer',
          paragraphs: [
            'This website is provided on an "as is" and "as available" basis. While we work to keep information accurate and current, we make no warranty that the site will be uninterrupted, error-free, or that its content is complete or up to date at all times.',
          ],
        },
        {
          heading: '10. Limitation of Liability',
          paragraphs: [
            'To the maximum extent permitted by law, we are not liable for indirect, incidental or consequential loss arising from your use of this website. Nothing in these terms limits liability that cannot lawfully be limited. Liability arising from a paid engagement is governed by that engagement’s own agreement.',
          ],
        },
        {
          heading: '11. Governing Law and Jurisdiction',
          paragraphs: [
            `These terms are governed by the laws of India. Any dispute arising from them is subject to the exclusive jurisdiction of the courts at ${COMPANY.address.city}, ${COMPANY.address.state}.`,
          ],
        },
        {
          heading: '12. Changes to These Terms',
          paragraphs: [
            'We may update these terms from time to time. Continued use of the website after an update constitutes acceptance of the revised terms.',
          ],
        },
        {
          heading: '13. Contact',
          paragraphs: [
            `Questions about these terms can be sent to ${COMPANY.contact.email} or ${COMPANY.contact.phone}.`,
          ],
        },
      ]}
    />
  );
}
