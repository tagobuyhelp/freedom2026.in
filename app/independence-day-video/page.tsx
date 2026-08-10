import type { Metadata } from "next";
import { Play } from "lucide-react";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";

export const metadata: Metadata = {
  title: "Independence Day 2026 Video – Create Your 15 August Video Greeting",
  description:
    "Create a personalised Independence Day 2026 video greeting with your photo, name and city. Share your 15 August 2026 video on WhatsApp Status and Instagram Reels. Coming soon.",
  alternates: { canonical: "/independence-day-video" },
};

const RELATED = [
  { label: "Create Poster", href: "/create" },
  { label: "Independence Day Poster", href: "/independence-day-poster" },
  { label: "Independence Day Images", href: "/independence-day-images" },
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "WhatsApp Status", href: "/independence-day-status" },
];

export default function IndependenceDayVideoPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Video", href: "/independence-day-video" },
        ]),
        articleSchema({
          title: "Independence Day 2026 Video – Create Your 15 August Video Greeting",
          description: "Create a personalised Independence Day 2026 video greeting.",
          url: "/independence-day-video",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Independence Day Video", href: "/independence-day-video" },
        ]}
        eyebrow="COMING SOON"
        title="Independence Day 2026 Video Creator"
        subtitle="Create personalised Independence Day 2026 video greetings with your photo, name and city — perfect for WhatsApp Status and Instagram Reels."
        ctaText="Create Poster Instead"
        relatedLinks={RELATED}
      >
        {/* Coming soon notice */}
        <section className="mb-10">
          <div className="bg-orange-50 border-2 border-orange-200 border-dashed rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 fill-orange-600" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Video Creator Coming Soon</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
              Our Independence Day video creator is under development. You'll soon be able to create
              personalised Independence Day video greetings with your photo, animated tricolor effects
              and patriotic music — completely free.
            </p>
            <p className="mt-4 text-orange-600 font-bold text-sm">
              Available before 15 August 2026 🇮🇳
            </p>
          </div>
        </section>

        {/* What to expect */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-5">What the Video Creator Will Include</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Your Photo in the Video", desc: "Upload your photo to appear in the personalised Independence Day video." },
              { title: "Your Name and City", desc: "Your name and city will be displayed beautifully in the video greeting." },
              { title: "Animated Tricolor Effects", desc: "Patriotic tricolor animations to celebrate the spirit of 15 August." },
              { title: "Patriotic Music", desc: "Background music that captures the emotion of Independence Day." },
              { title: "WhatsApp Status Format", desc: "Optimised video format for WhatsApp Status — 30 seconds, vertical." },
              { title: "Instagram Reels Format", desc: "Vertical video format perfect for Instagram Reels and Stories." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
                <span className="text-emerald-500 font-black text-sm shrink-0 mt-0.5">✓</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{f.title}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Create poster while waiting */}
        <section className="bg-slate-900 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-black text-white mb-2">While the Video Creator is Coming…</h2>
          <p className="text-slate-400 text-sm mb-4">
            Create a personalised Independence Day poster right now — free, instant and ready to share on WhatsApp, Instagram and Facebook.
          </p>
        </section>
      </SEOPageLayout>
    </>
  );
}
