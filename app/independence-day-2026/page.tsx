import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Play, ImageIcon, MessageSquare, Quote, Flag } from "lucide-react";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";

export const metadata: Metadata = {
  title: "Independence Day 2026 – 15 August 2026 Complete Guide | Freedom2026",
  description:
    "Everything about Independence Day 2026 — 15 August 2026. Create personalised posters, videos, explore wishes, quotes, status and be part of India's biggest Independence Day celebration.",
  alternates: { canonical: "/independence-day-2026" },
};

const RELATED = [
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "Independence Day Quotes", href: "/independence-day-quotes" },
  { label: "Create Poster", href: "/create" },
  { label: "WhatsApp Status", href: "/independence-day-status" },
  { label: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
];

export default function IndependenceDay2026Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day 2026", href: "/independence-day-2026" },
        ]),
        articleSchema({
          title: "Independence Day 2026 – 15 August 2026 Complete Guide",
          description: "Everything about Independence Day 2026 — 15 August 2026.",
          url: "/independence-day-2026",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Independence Day 2026", href: "/independence-day-2026" },
        ]}
        eyebrow="15 AUGUST 2026"
        title="Independence Day 2026 — 15 August 2026"
        subtitle="India's 79th Independence Day is on 15 August 2026. Create personalised posters, explore wishes, quotes, status and celebrate the spirit of freedom."
        relatedLinks={RELATED}
      >
        {/* About */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-3">About Independence Day 2026</h2>
          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-3">
            <p>
              India's Independence Day is celebrated every year on <strong>15 August</strong> to commemorate
              the country's independence from British rule on 15 August 1947.
              In 2026, India will celebrate its <strong>79th Independence Day</strong>.
            </p>
            <p>
              Independence Day 2026 falls on a <strong>Saturday, 15 August 2026</strong> — a public holiday across all of India.
              The national celebration includes flag hoisting ceremonies, parades, cultural programmes and patriotic events at schools, colleges, offices and public spaces.
            </p>
            <p>
              Freedom2026.in is your dedicated platform for celebrating 15 August 2026 with personalised digital creatives, wishes, quotes and social media content.
            </p>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-5">How to Celebrate Independence Day 2026</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Sparkles className="w-5 h-5" />, color: "text-orange-600 bg-orange-50", title: "Create a Personalised Poster", desc: "Add your name, photo and city to a beautiful Independence Day template.", href: "/create" },
              { icon: <Play className="w-5 h-5" />, color: "text-pink-600 bg-pink-50", title: "Create an Independence Day Video", desc: "Coming soon — personalised Independence Day video greetings.", href: "/independence-day-video" },
              { icon: <MessageSquare className="w-5 h-5" />, color: "text-emerald-600 bg-emerald-50", title: "Share Wishes & Messages", desc: "Find heartfelt Independence Day wishes to send to friends and family.", href: "/independence-day-wishes" },
              { icon: <Quote className="w-5 h-5" />, color: "text-blue-600 bg-blue-50", title: "Patriotic Quotes", desc: "Read inspiring quotes from India's greatest freedom fighters.", href: "/independence-day-quotes" },
              { icon: <ImageIcon className="w-5 h-5" />, color: "text-purple-600 bg-purple-50", title: "Independence Day Images", desc: "Beautiful Independence Day images to share on social media.", href: "/independence-day-images" },
              { icon: <Flag className="w-5 h-5" />, color: "text-teal-600 bg-teal-50", title: "Bengali & Hindi Content", desc: "Wishes, quotes and status in Bengali and Hindi for regional celebration.", href: "/independence-day-wishes-bengali" },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>{card.icon}</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">{card.title}</div>
                  <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{card.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Independence Day — A Brief History</h2>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
            <p>India gained independence from British rule at midnight on <strong>14–15 August 1947</strong>, following decades of struggle led by Mahatma Gandhi, Nehru, Netaji Subhas Chandra Bose, Sardar Vallabhbhai Patel and countless other freedom fighters.</p>
            <p>The first Prime Minister of India, Jawaharlal Nehru, delivered his famous <em>"Tryst with Destiny"</em> speech at the stroke of midnight, marking the birth of independent India.</p>
            <p>Since 1947, every 15 August, the Prime Minister of India hoists the national flag at the Red Fort in New Delhi and addresses the nation.</p>
          </div>
        </section>
      </SEOPageLayout>
    </>
  );
}
