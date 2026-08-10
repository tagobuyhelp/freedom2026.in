// components/JsonLd.tsx
// Injects JSON-LD structured data into page <head>.

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
}

// ─── Schema Builders ──────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Freedom2026",
    url: "https://freedom2026.in",
    description:
      "Create personalized Independence Day 2026 posters, videos and social media creatives.",
    publisher: {
      "@type": "Organization",
      name: "Tagobuy Technologies Private Limited",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://freedom2026.in/independence-day-wishes?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tagobuy Technologies Private Limited",
    url: "https://tagobuy.com",
    logo: "https://freedom2026.in/images/tagobuy-logo.png",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Bengali", "Hindi"],
    },
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `https://freedom2026.in${crumb.href}`,
    })),
  };
}

export function articleSchema({
  title,
  description,
  url,
  datePublished = "2026-08-01",
  dateModified = "2026-08-08",
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://freedom2026.in${url}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "Freedom2026",
    },
    publisher: {
      "@type": "Organization",
      name: "Tagobuy Technologies Private Limited",
      logo: {
        "@type": "ImageObject",
        url: "https://freedom2026.in/images/tagobuy-logo.png",
      },
    },
    image: {
      "@type": "ImageObject",
      url: "https://freedom2026.in/images/og-default.jpg",
      width: 1200,
      height: 630,
    },
  };
}

export function webPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `https://freedom2026.in${url}`,
    publisher: {
      "@type": "Organization",
      name: "Tagobuy Technologies Private Limited",
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
