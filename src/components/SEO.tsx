import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  structuredData?: object;
}

const defaultMeta = {
  title: 'Brand of a Champion | High School Football Recruiting & Athlete Development',
  description: 'Brand of a Champion is a nonprofit empowering high school football athletes through coaching, recruiting exposure, and personal development. Home to D1-bound talent at Texas A&M, UCLA, Tennessee, Florida State & more.',
  image: 'https://brandofachampion.com/images/og-image.png',
  url: 'https://brandofachampion.com',
};

export const SEO = ({
  title,
  description = defaultMeta.description,
  canonical,
  image = defaultMeta.image,
  type = 'website',
  noindex = false,
  structuredData,
}: SEOProps) => {
  const fullTitle = title 
    ? `${title} | Brand of a Champion` 
    : defaultMeta.title;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@brandofachamp" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Organization Schema - use on homepage
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['NonprofitOrganization', 'SportsOrganization'],
  '@id': 'https://brandofachampion.com/#organization',
  name: 'Brand of a Champion',
  alternateName: 'BOAC',
  description: 'Nonprofit organization empowering high school football athletes through coaching, recruiting exposure, and personal development. Producers of D1 talent at Texas A&M, UCLA, Tennessee, Florida State, and more.',
  url: 'https://brandofachampion.com',
  logo: 'https://brandofachampion.com/images/og-image.png',
  areaServed: { '@type': 'Country', name: 'United States' },
  address: { '@type': 'PostalAddress', addressRegion: 'GA', addressCountry: 'US' },
  sport: 'American Football',
  sameAs: [
    'https://www.instagram.com/brandofachampion/',
    'https://x.com/brandofachamp',
    'https://www.youtube.com/@BrandofachampionTV',
  ],
  knowsAbout: [
    'High School Football Recruiting',
    'Athlete Development',
    'College Football Scholarships',
    'Youth Sports Mentorship',
    'D1 Football Recruiting',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'BOAC Subscription Plans',
    itemListElement: [
      { '@type': 'Offer', name: 'Basic Membership', price: '4.99', priceCurrency: 'USD', description: 'Access to coaching and platform resources' },
      { '@type': 'Offer', name: 'Premium Membership', price: '14.99', priceCurrency: 'USD', description: 'Enhanced coaching, exposure, and training' },
      { '@type': 'Offer', name: 'Recruiting Package', price: '19.99', priceCurrency: 'USD', description: 'Full recruiting services with college coach exposure' },
    ],
  },
};

// Webpage Schema generator
export const createWebPageSchema = (name: string, description: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  description,
  url,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Brand of a Champion',
    url: 'https://brandofachampion.com',
  },
});

// FAQ Schema generator
export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Article Schema generator
export const createArticleSchema = (
  headline: string,
  description: string,
  image: string,
  datePublished: string,
  author: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  image,
  datePublished,
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Brand of a Champion',
    logo: {
      '@type': 'ImageObject',
      url: 'https://brandofachampion.com/images/og-image.png',
    },
  },
});

export default SEO;
