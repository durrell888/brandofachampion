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
  title: 'Brand of a Champion - Empowering Athletes Beyond the Game',
  description: 'Brand of a Champion is a nonprofit helping professional athletes succeed in every aspect of life beyond sports through media relations, marketing, and personal development.',
  image: 'https://lovable.dev/opengraph-image-p98pqg.png',
  url: 'https://brandofachampion.org',
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
  '@type': 'NonProfit',
  name: 'Brand of a Champion',
  description: 'A nonprofit helping professional athletes succeed in every aspect of life beyond sports through media relations, marketing, and personal development.',
  url: 'https://brandofachampion.org',
  logo: 'https://brandofachampion.org/favicon.ico',
  sameAs: [
    'https://facebook.com/brandofachampion',
    'https://twitter.com/brandofachamp',
    'https://instagram.com/brandofachampion',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-960-657-1001',
    contactType: 'customer service',
    email: 'info@brandofachamp.org',
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
    url: 'https://brandofachampion.org',
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
      url: 'https://brandofachampion.org/favicon.ico',
    },
  },
});

export default SEO;
