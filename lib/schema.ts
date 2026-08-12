import { COMPANY, FULL_ADDRESS, SITE_URL } from '@/constants/company';
import { SERVICES } from '@/constants/services';
import { FAQS } from '@/constants/faq';
import { SITE_DESCRIPTION } from '@/lib/seo';

/**
 * Schema.org structured data injected as JSON-LD. Split into focused graphs so
 * each block can be validated independently in Google's Rich Results Test.
 */

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
  addressLocality: COMPANY.address.city,
  addressRegion: COMPANY.address.state,
  postalCode: COMPANY.address.postalCode,
  addressCountry: COMPANY.address.countryCode,
} as const;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  alternateName: COMPANY.shortName,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESCRIPTION,
  slogan: COMPANY.tagline,
  foundingDate: COMPANY.founded,
  founder: {
    '@type': 'Person',
    name: COMPANY.director.name,
    jobTitle: COMPANY.director.title,
  },
  address: postalAddress,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: COMPANY.contact.phoneRaw,
      email: COMPANY.contact.email,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'ta'],
    },
  ],
  sameAs: Object.values(COMPANY.social),
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
  name: COMPANY.name,
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  telephone: COMPANY.contact.phoneRaw,
  email: COMPANY.contact.email,
  priceRange: '₹₹',
  description: FULL_ADDRESS,
  address: postalAddress,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: COMPANY.address.latitude,
    longitude: COMPANY.address.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '14:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Erode' },
    { '@type': 'State', name: 'Tamil Nadu' },
    { '@type': 'Country', name: 'India' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Technology Services',
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
      },
    })),
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: COMPANY.name,
  description: SITE_DESCRIPTION,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
};

export const educationalOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}/#training`,
  name: `${COMPANY.shortName} Training Academy`,
  url: `${SITE_URL}/#training`,
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  address: postalAddress,
  description:
    'Professional training programs in programming, cloud computing, networking, cyber security, ethical hacking and digital forensics, with internships and placement assistance.',
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/#about` },
    { '@type': 'ListItem', position: 3, name: 'Services', item: `${SITE_URL}/#services` },
    { '@type': 'ListItem', position: 4, name: 'Training', item: `${SITE_URL}/#training` },
    { '@type': 'ListItem', position: 5, name: 'Internships', item: `${SITE_URL}/#internships` },
    { '@type': 'ListItem', position: 6, name: 'Contact', item: `${SITE_URL}/#contact` },
  ],
};

/** Every graph rendered on the home page. */
export const homePageSchemas = [
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  educationalOrganizationSchema,
  faqSchema,
  breadcrumbSchema,
];
