import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";
import { WISHES_EN, STATUS_IDEAS } from "@/data/wishes";

export const metadata: Metadata = {
  title: "15 August 2026 Wishes – Happy Independence Day 15 August Wishes",
  description:
    "Best 15 August 2026 wishes for Happy Independence Day. Share heartfelt 15 August wishes with friends, family and colleagues on Independence Day 2026.",
  alternates: { canonical: "/15-august-wishes" },
};

const RELATED = [
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "15 August Status", href: "/15-august-status" },
  { label: "Independence Day Quotes", href: "/independence-day-quotes" },
  { label: "Create Poster", href: "/create" },
  { label: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
];

const AUGUST15_WISHES = [
  "Happy 15 August 2026! Wishing everyone a very proud and joyful Independence Day. Jai Hind! 🇮🇳",
  "On this glorious 15 August, let us salute the heroes who made India free. Happy Independence Day 2026!",
  "15 August 2026 — 79 years of freedom, unity and pride. Happy Independence Day, India! 🇮🇳",
  "This 15 August, may every Indian feel the pride of being born in the greatest nation on earth. Jai Hind!",
  "Happy 15 August! Today we celebrate not just the end of colonial rule, but the beginning of every Indian's limitless potential. 🇮🇳",
  "Wishing you a very Happy 15 August 2026. May our nation continue to rise, shine and inspire the world.",
];

export default function AugustWishesPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "15 August Wishes", href: "/15-august-wishes" },
        ]),
        articleSchema({
          title: "15 August 2026 Wishes – Happy Independence Day 15 August Wishes",
          description: "Best 15 August 2026 wishes for Happy Independence Day.",
          url: "/15-august-wishes",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "15 August Wishes", href: "/15-august-wishes" },
        ]}
        eyebrow="15 AUGUST 2026"
        title="15 August 2026 Wishes"
        subtitle="Find the best Happy Independence Day 15 August wishes to share with your friends, family and loved ones on India's Independence Day 2026."
        relatedLinks={RELATED}
      >
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-2">Happy 15 August 2026 Wishes</h2>
          <p className="text-slate-500 text-sm mb-6">
            Share these heartfelt Independence Day 2026 wishes on 15 August to celebrate India's freedom.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...AUGUST15_WISHES, ...WISHES_EN.slice(0, 4).map((w) => w.text)].map((wish, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <p className="text-slate-800 text-sm leading-relaxed">{wish}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Make Your 15 August Wishes More Personal</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Don't just send a text — create a personalised Independence Day poster with your own name and photo
            and share it along with your 15 August wishes. It takes less than a minute and it's completely free.
          </p>
        </section>
      </SEOPageLayout>
    </>
  );
}
