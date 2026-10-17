/** Business details used across the site (contact page, footer, JSON-LD). */
export const SITE = {
  name: 'Symons Sport International',
  url: 'https://www.symons-sport.co.za',
  ogImage: '/images/og-image.jpg',
  email: 'symons.sport@gmail.com',
  founded: '2003',
  phones: [
    { label: 'Office', display: '021 975 9629', tel: '+27219759629' },
    { label: 'Sonja van Rensburg', display: '082 658 6866', tel: '+27826586866' },
  ],
  address: {
    lines: ['Unit 4 Durbanville Park', '5 Lilie Street, Durbanville', 'Cape Town, South Africa'],
    street: 'Unit 4 Durbanville Park, 5 Lilie Street',
    locality: 'Durbanville',
    region: 'Western Cape',
    country: 'ZA',
  },
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=5+Lilie+Street%2C+Durbanville%2C+South+Africa',
} as const;

/** schema.org LocalBusiness description, injected as JSON-LD on the home and contact pages. */
export const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  alternateName: 'SSI',
  description:
    'Importer and distributor of MX, enduro and off-road motorcycle parts, supplying dealers throughout Southern Africa.',
  url: `${SITE.url}/`,
  logo: `${SITE.url}/images/logos/ssi-logo-441.webp`,
  image: `${SITE.url}${SITE.ogImage}`,
  email: SITE.email,
  telephone: SITE.phones[0].tel,
  foundingDate: SITE.founded,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  contactPoint: SITE.phones.map((p) => ({
    '@type': 'ContactPoint',
    telephone: p.tel,
    contactType: p.label === 'Office' ? 'customer service' : 'sales',
    areaServed: ['ZA', 'NA', 'ZW', 'MU'],
  })),
  areaServed: 'Southern Africa',
  brand: [
    'Enduro Engineering',
    'Excel',
    'Kite',
    'Risk Racing',
    'Haan Wheels',
    'Runleader',
    'Supersprox',
    'TM Designworks',
  ].map((name) => ({ '@type': 'Brand', name })),
} as const;
