import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";
import { STATUS_IDEAS } from "@/data/wishes";

export const metadata: Metadata = {
  title: "Independence Day 2026 WhatsApp Status – 15 August Status in English, Bengali & Hindi",
  description:
    "Best Independence Day 2026 WhatsApp status messages for 15 August. Short patriotic captions in English, Bengali and Hindi — ready to copy and share.",
  alternates: { canonical: "https://freedom2026.in/independence-day-status" },
  openGraph: {
    title: "Independence Day 2026 WhatsApp Status – 15 August Status",
    description: "Best Independence Day 2026 WhatsApp status messages for 15 August. Short patriotic captions in English, Bengali and Hindi.",
    url: "https://freedom2026.in/independence-day-status",
    images: ["https://freedom2026.in/images/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Independence Day 2026 WhatsApp Status – 15 August Status",
    description: "Best Independence Day 2026 WhatsApp status messages for 15 August.",
    images: ["https://freedom2026.in/images/og-default.jpg"],
  },
};

const RELATED = [
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "Independence Day Quotes", href: "/independence-day-quotes" },
  { label: "Poster Maker", href: "/independence-day-poster" },
  { label: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
  { label: "15 August Status", href: "/15-august-status" },
  { label: "Images", href: "/independence-day-images" },
];

const CAPTION_IDEAS = [
  "79th Independence Day — Celebrating the land of brave! 🇮🇳",
  "Freedom is not free. Honour those who earned it. 🇮🇳",
  "Proud citizen of the greatest democracy on earth. Happy 15 August!",
  "Born free, live free — Happy Independence Day 2026 🇮🇳",
  "Every colour of the flag tells a story. Today we celebrate them all. 🇮🇳",
];

export default function StatusPage() {
  const enStatus = STATUS_IDEAS.filter((s) => s.language === "en");
  const bnStatus = STATUS_IDEAS.filter((s) => s.language === "bn");
  const hiStatus = STATUS_IDEAS.filter((s) => s.language === "hi");

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Status", href: "/independence-day-status" },
        ]),
        articleSchema({
          title: "Independence Day 2026 WhatsApp Status – 15 August Status",
          description: "Best Independence Day 2026 WhatsApp status messages for 15 August.",
          url: "/independence-day-status",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Independence Day Status", href: "/independence-day-status" },
        ]}
        eyebrow="WHATSAPP STATUS 2026"
        title="Independence Day 2026 WhatsApp Status"
        subtitle="Short, powerful patriotic messages perfect for your WhatsApp Status, Instagram Stories and social media captions this 15 August 2026."
        ctaText="Create Your Status Poster"
        relatedLinks={RELATED}
      >
        {/* English Status */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-2">Independence Day Status in English</h2>
          <p className="text-slate-500 text-sm mb-5">Copy and paste these status messages directly to your WhatsApp or Instagram Stories.</p>
          <div className="space-y-3">
            {[...enStatus.map((s) => s.text), ...CAPTION_IDEAS].map((msg, i) => (
              <div key={i} className="flex items-start justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <p className="text-slate-800 text-sm leading-relaxed">{msg}</p>
                <span className="text-slate-400 text-xs font-mono shrink-0 mt-0.5">#{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bengali Status */}
        <section className="mb-10 font-bengali">
          <h2 className="text-xl font-black text-slate-900 mb-2">বাংলায় স্বাধীনতা দিবস স্ট্যাটাস</h2>
          <div className="space-y-3">
            {bnStatus.map((s) => (
              <div key={s.id} className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
                <p className="text-slate-800 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hindi Status */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-2">हिन्दी में स्वतंत्रता दिवस स्टेटस</h2>
          <div className="space-y-3">
            {hiStatus.map((s) => (
              <div key={s.id} className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                <p className="text-slate-800 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Tips for the Perfect Independence Day Status</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold shrink-0">→</span> Keep it short — 1 to 2 sentences work best for WhatsApp status.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold shrink-0">→</span> Add an Indian flag emoji 🇮🇳 for instant patriotic impact.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold shrink-0">→</span> Create a personalised poster with your name and photo for an even more impactful status.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold shrink-0">→</span> Share early on the morning of 15 August for maximum engagement.</li>
          </ul>
        </section>
      </SEOPageLayout>
    </>
  );
}
