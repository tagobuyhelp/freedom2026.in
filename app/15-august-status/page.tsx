import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";
import IndianFlag from "@/components/IndianFlag";
import { STATUS_IDEAS } from "@/data/wishes";

export const metadata: Metadata = {
  title: "15 August 2026 Status – WhatsApp Status for Independence Day",
  description:
    "Best 15 August 2026 WhatsApp status messages for Independence Day. Short patriotic captions in English, Bengali and Hindi for WhatsApp, Instagram Stories and Facebook.",
  alternates: { canonical: "/15-august-status" },
};

const RELATED = [
  { label: "Independence Day Status", href: "/independence-day-status" },
  { label: "15 August Wishes", href: "/15-august-wishes" },
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "Create Poster", href: "/create" },
  { label: "Independence Day Quotes", href: "/independence-day-quotes" },
];

const EXTRA_STATUS = [
  "15 August 2026 — 79 years of freedom! 🇮🇳 Proud to be Indian.",
  "Jai Hind! Happy 15 August 2026 — the day India became free. 🇮🇳",
  "Celebrating 79 years of independence. India, forever free! 🇮🇳",
  "Our flag, our pride. Happy Independence Day 15 August 2026! 🇮🇳",
];

export default function AugustStatusPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "15 August Status", href: "/15-august-status" },
        ]),
        articleSchema({
          title: "15 August 2026 Status – WhatsApp Status for Independence Day",
          description: "Best 15 August 2026 WhatsApp status messages for Independence Day.",
          url: "/15-august-status",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "15 August Status", href: "/15-august-status" },
        ]}
        eyebrow="WHATSAPP STATUS"
        title="15 August 2026 WhatsApp Status"
        subtitle="Short, powerful 15 August 2026 status messages for WhatsApp, Instagram Stories and Facebook — ready to copy and share on Independence Day."
        ctaText="Create Status Poster"
        relatedLinks={RELATED}
      >
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-2">15 August 2026 Status Messages</h2>
          <p className="text-slate-500 text-sm mb-6">
            Copy these 15 August WhatsApp status messages to your phone and share them on Independence Day 2026.
          </p>
          <div className="space-y-3">
            {[...EXTRA_STATUS, ...STATUS_IDEAS.filter(s => s.language === "en").map(s => s.text)].map((msg, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
                <IndianFlag className="w-4 h-3 mt-1 shrink-0" />
                <p className="text-slate-800 text-sm leading-relaxed">{msg}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-black text-white mb-2">Create Your Own 15 August Status</h2>
          <p className="text-slate-400 text-sm">
            Make your 15 August status uniquely yours — add your photo, name and city to a personalised Independence Day poster and use it as your WhatsApp status.
          </p>
        </section>
      </SEOPageLayout>
    </>
  );
}
