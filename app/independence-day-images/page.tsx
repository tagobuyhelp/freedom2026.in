import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";

export const metadata: Metadata = {
  title: "Independence Day 2026 Images – 15 August 2026 Photos & Images",
  description:
    "Browse and download Independence Day 2026 images for 15 August. Beautiful patriotic images for WhatsApp, Facebook, Instagram and social media. Create personalised images free.",
  alternates: { canonical: "/independence-day-images" },
};

const RELATED = [
  { label: "Create Poster", href: "/create" },
  { label: "Independence Day Poster", href: "/independence-day-poster" },
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "WhatsApp Status", href: "/independence-day-status" },
  { label: "View Templates", href: "/templates" },
];

const IMAGE_TYPES = [
  { title: "Independence Day Poster Images", desc: "Personalised poster images with your name and photo for 15 August 2026." },
  { title: "Indian Flag Images", desc: "High-quality Indian tricolor flag images for Independence Day 2026." },
  { title: "Independence Day Wishes Images", desc: "Beautiful images with Independence Day wishes text for WhatsApp sharing." },
  { title: "Patriotic Quote Images", desc: "Quote images with words from Mahatma Gandhi, Netaji and other freedom fighters." },
  { title: "Independence Day Status Images", desc: "Vertical format images perfect for WhatsApp Status on 15 August 2026." },
  { title: "Business Independence Day Images", desc: "Brand your business with Independence Day images for 15 August 2026." },
];

export default function IndependenceDayImagesPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Images", href: "/independence-day-images" },
        ]),
        articleSchema({
          title: "Independence Day 2026 Images – 15 August 2026 Photos",
          description: "Browse Independence Day 2026 images for 15 August.",
          url: "/independence-day-images",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Independence Day Images", href: "/independence-day-images" },
        ]}
        eyebrow="15 AUGUST 2026"
        title="Independence Day 2026 Images"
        subtitle="Beautiful Independence Day images for 15 August 2026. Create your own personalised Independence Day image with your name and photo — completely free."
        relatedLinks={RELATED}
      >
        {/* Creator CTA */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-orange-50 via-white to-emerald-50 border border-orange-100 rounded-2xl p-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-2">Create Your Own Independence Day Image</h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                The best Independence Day image is one that has your face, your name and your city on it.
                Create a personalised Independence Day poster image completely free at Freedom2026.in.
              </p>
            </div>
          </div>
        </section>

        {/* Image categories */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-5">Types of Independence Day 2026 Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {IMAGE_TYPES.map((t) => (
              <div key={t.title} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="font-bold text-slate-900 text-sm mb-1">{t.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{t.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage guide */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            How to Use Independence Day 2026 Images
          </h2>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
            <p><strong>WhatsApp:</strong> Set as your profile photo or post to WhatsApp Status on 15 August 2026.</p>
            <p><strong>Facebook:</strong> Share as a post on your timeline or in groups and events.</p>
            <p><strong>Instagram:</strong> Post as your feed image or use as an Instagram Story on Independence Day.</p>
            <p><strong>Twitter/X:</strong> Share your patriotic Independence Day image as a tweet or as your header.</p>
            <p><strong>LinkedIn:</strong> Celebrate Independence Day professionally with a branded business poster.</p>
          </div>
        </section>
      </SEOPageLayout>
    </>
  );
}
