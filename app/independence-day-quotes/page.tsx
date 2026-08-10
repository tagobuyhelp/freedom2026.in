import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";
import { QUOTES } from "@/data/wishes";

export const metadata: Metadata = {
  title: "Independence Day 2026 Quotes – Patriotic Quotes for 15 August",
  description:
    "Read the best Independence Day 2026 quotes from Mahatma Gandhi, Netaji, Nehru and other freedom fighters. Share patriotic quotes for 15 August 2026.",
  alternates: { canonical: "https://freedom2026.in/independence-day-quotes" },
  openGraph: {
    title: "Independence Day 2026 Quotes – Patriotic Quotes for 15 August",
    description: "Read the best Independence Day 2026 quotes from Mahatma Gandhi, Netaji, Nehru and other freedom fighters.",
    url: "https://freedom2026.in/independence-day-quotes",
    images: ["https://freedom2026.in/images/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Independence Day 2026 Quotes – Patriotic Quotes",
    description: "Read the best Independence Day 2026 quotes from Mahatma Gandhi, Netaji, Nehru and other freedom fighters.",
    images: ["https://freedom2026.in/images/og-default.jpg"],
  },
};

const RELATED = [
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "WhatsApp Status", href: "/independence-day-status" },
  { label: "Poster Maker", href: "/independence-day-poster" },
  { label: "Images", href: "/independence-day-images" },
  { label: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
];

const EXTRA_QUOTES = [
  { text: "India is not a country, it's a feeling.", author: "Unknown", category: "patriotism" },
  { text: "Every citizen of India must remember that he is an Indian and he has every right in this country, but with certain duties.", author: "Sardar Vallabhbhai Patel", category: "duty" },
  { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi", category: "service" },
  { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi", category: "strength" },
];

export default function QuotesPage() {
  const allQuotes = [...QUOTES, ...EXTRA_QUOTES];

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Quotes", href: "/independence-day-quotes" },
        ]),
        articleSchema({
          title: "Independence Day 2026 Quotes – Patriotic Quotes for 15 August",
          description: "Read the best Independence Day 2026 quotes from freedom fighters.",
          url: "/independence-day-quotes",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Independence Day Quotes", href: "/independence-day-quotes" },
        ]}
        eyebrow="15 AUGUST 2026"
        title="Independence Day 2026 Quotes"
        subtitle="Inspiring words from India's greatest freedom fighters and leaders. Share these patriotic quotes this Independence Day to honour their legacy."
        relatedLinks={RELATED}
      >
        {/* Quote grid */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            Patriotic Independence Day Quotes
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            These timeless quotes from India's freedom fighters capture the true spirit of Independence Day 2026.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {allQuotes.map((q, i) => (
              <figure key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <blockquote className="text-slate-800 text-sm leading-relaxed italic mb-3">
                  "{q.text}"
                </blockquote>
                <figcaption className="text-xs font-bold text-orange-600">
                  — {q.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Category cards */}
        <section className="mb-8">
          <h2 className="text-lg font-black text-slate-900 mb-4">Quote Categories</h2>
          <div className="flex flex-wrap gap-2">
            {["freedom", "patriotism", "independence", "duty", "service", "strength", "culture", "nation"].map((cat) => (
              <span key={cat} className="bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-2 rounded-xl capitalize border border-slate-200">
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Info block */}
        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">About These Quotes</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            These Independence Day quotes are collected from the public speeches, writings and documented statements of India's freedom fighters and leaders.
            They are widely shared and attributed in public historical records.
            Use them to inspire, share and celebrate the spirit of 15 August 2026.
          </p>
        </section>
      </SEOPageLayout>
    </>
  );
}
