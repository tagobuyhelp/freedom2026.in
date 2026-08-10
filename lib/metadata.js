// lib/metadata.js
// Reusable metadata builder for Next.js App Router pages.

import { SITE_CONFIG } from "./siteConfig";

/**
 * Build Next.js metadata object for a page.
 * @param {Object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} opts.path - e.g. "/independence-day-wishes"
 * @param {string} [opts.ogImage]
 * @param {string[]} [opts.keywords]
 * @returns {import("next").Metadata}
 */
export function buildMetadata({ title, description, path, ogImage, keywords = [] }) {
  const url = `${SITE_CONFIG.url}${path}`;
  const image = ogImage || SITE_CONFIG.ogImage;

  return {
    title,
    description,
    keywords: [
      "Independence Day 2026",
      "15 August 2026",
      "Independence Day poster",
      "Freedom2026",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.fullName,
      images: [
        {
          url: `${SITE_CONFIG.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_CONFIG.url}${image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}
