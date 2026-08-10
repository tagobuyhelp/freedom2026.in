import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";
import { WISHES_EN, WISHES_BN, WISHES_HI } from "@/data/wishes";

export const metadata: Metadata = {
  title: "Independence Day 2026 Wishes – 15 August Wishes in English, Bengali & Hindi",
  description:
    "Find the best Independence Day 2026 wishes for 15 August. Share heartfelt wishes for Independence Day with friends, family and colleagues in English, Bengali and Hindi.",
  alternates: { canonical: "/independence-day-wishes" },
  openGraph: {
    title: "Independence Day 2026 Wishes – 15 August Wishes",
    description: "Find the best Independence Day 2026 wishes for 15 August. Share heartfelt messages in English, Bengali and Hindi.",
    url: "https://freedom2026.in/independence-day-wishes",
  },
};

const RELATED = [
  { label: "Independence Day Quotes", href: "/independence-day-quotes" },
  { label: "WhatsApp Status", href: "/independence-day-status" },
  { label: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
  { label: "Hindi Wishes", href: "/independence-day-wishes-hindi" },
  { label: "Create Poster", href: "/create" },
  { label: "Images", href: "/independence-day-images" },
];

export default function WishesPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Wishes", href: "/independence-day-wishes" },
        ]),
        articleSchema({
          title: "Independence Day 2026 Wishes – 15 August Wishes in English, Bengali & Hindi",
          description: "Find the best Independence Day 2026 wishes for 15 August.",
          url: "/independence-day-wishes",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Independence Day Wishes", href: "/independence-day-wishes" },
        ]}
        eyebrow="15 AUGUST 2026"
        title="Independence Day 2026 Wishes"
        subtitle="Share heartfelt Independence Day 2026 wishes with your friends, family and colleagues. Choose from wishes in English, Bengali and Hindi."
        ctaText="Create Your Own Poster"
        relatedLinks={RELATED}
      >
        {/* ── English Wishes ── */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">Independence Day Wishes in English</h2>
          <p className="text-slate-500 text-sm mb-6">
            Send these heartfelt English Independence Day 2026 wishes to friends, family and colleagues on 15 August.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WISHES_EN.map((wish) => (
              <div key={wish.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-slate-800 leading-relaxed text-sm">{wish.text}</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {wish.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bengali Wishes ── */}
        <section className="mb-12 font-bengali">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-slate-900">বাংলায় স্বাধীনতা দিবসের শুভেচ্ছা</h2>
            <Link href="/independence-day-wishes-bengali" className="text-sm text-orange-600 hover:text-orange-700 font-bold">
              আরও দেখুন →
            </Link>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            বাংলায় স্বাধীনতা দিবসের শুভেচ্ছা — পশ্চিমবঙ্গের সকলের জন্য।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WISHES_BN.slice(0, 4).map((wish) => (
              <div key={wish.id} className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                <p className="text-slate-800 leading-relaxed text-sm">{wish.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Hindi Wishes ── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-slate-900">हिन्दी में स्वतंत्रता दिवस की शुभकामनाएं</h2>
            <Link href="/independence-day-wishes-hindi" className="text-sm text-orange-600 hover:text-orange-700 font-bold">
              और देखें →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WISHES_HI.slice(0, 4).map((wish) => (
              <div key={wish.id} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <p className="text-slate-800 leading-relaxed text-sm">{wish.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tips Section ── */}
        <section className="bg-gradient-to-br from-slate-50 to-orange-50 border border-orange-100 rounded-2xl p-6">
          <h2 className="text-lg font-black text-slate-900 mb-3">How to Share Your Independence Day Wishes</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2"><span className="text-orange-600 font-bold shrink-0">1.</span> Copy any wish above to your clipboard.</li>
            <li className="flex items-start gap-2"><span className="text-orange-600 font-bold shrink-0">2.</span> Create a personalised poster with your name and photo using Freedom2026.</li>
            <li className="flex items-start gap-2"><span className="text-orange-600 font-bold shrink-0">3.</span> Download your poster in HD and share it on WhatsApp, Facebook or Instagram.</li>
          </ul>
        </section>
      </SEOPageLayout>
    </>
  );
}
