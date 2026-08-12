import type { Metadata } from "next";
import Link from "next/link";
import { ImageIcon, ArrowRight, Sparkles, Edit3 } from "lucide-react";
import JsonLd, { breadcrumbSchema, webPageSchema } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import IndianFlag from "@/components/IndianFlag";

export const metadata: Metadata = {
  title: "Independence Day Images 2026 – 15 August HD Images | Freedom2026",
  description:
    "Browse and download Independence Day 2026 images for 15 August. Beautiful patriotic images for WhatsApp, Facebook, Instagram and social media. Create personalised images free.",
  alternates: { canonical: "https://freedom2026.in/independence-day-images" },
  openGraph: {
    title: "Independence Day Images 2026 – 15 August HD Images | Freedom2026",
    description:
      "Browse and download Independence Day 2026 images for 15 August. Beautiful patriotic images for WhatsApp, Facebook and Instagram.",
    url: "https://freedom2026.in/independence-day-images",
    images: [
      {
        url: "https://freedom2026.in/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Freedom2026 — Independence Day 2026 Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Independence Day Images 2026 – 15 August HD Images | Freedom2026",
    description:
      "Browse and download Independence Day 2026 images for 15 August.",
    images: ["https://freedom2026.in/images/og-default.jpg"],
  },
};

const RELATED = [
  { label: "Create Poster", href: "/create" },
  { label: "Independence Day Poster", href: "/independence-day-poster" },
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "WhatsApp Status", href: "/independence-day-status" },
  { label: "View Templates", href: "/templates" },
];

const IMAGE_TYPES = [
  { title: "Personalized Poster Images", desc: "Personalised poster images with your name and photo for 15 August 2026.", images: ["portrait-style.png", "student-style.png"] },
  { title: "Indian Flag Images", desc: "High-quality Indian tricolor flag images for Independence Day 2026.", images: ["classic-india-style.png", "modern-india-style.png"] },
  { title: "Independence Day Wishes Images", desc: "Beautiful images with Independence Day wishes text for WhatsApp sharing.", images: [] },
  { title: "Patriotic Quote Images", desc: "Quote images with words from Mahatma Gandhi, Netaji and other freedom fighters.", images: [] },
  { title: "Independence Day Status Images", desc: "Vertical format images perfect for WhatsApp Status on 15 August 2026.", images: ["hindi-style.png", "bengali-style.png"] },
  { title: "Business Independence Day Images", desc: "Brand your business with Independence Day images for 15 August 2026.", images: ["professional-style.png"] },
];

const IMAGE_GALLERY = [
  { src: "/images/classic-india-style.png", alt: "Classic tricolour Independence Day 2026 poster design" },
  { src: "/images/modern-india-style.png", alt: "Modern Indian tricolour Independence Day poster" },
  { src: "/images/india-map-style.png", alt: "India map Independence Day patriotic poster" },
  { src: "/images/portrait-style.png", alt: "Personalized 15 August 2026 poster with portrait design" },
  { src: "/images/student-style.png", alt: "Student-themed Independence Day 2026 poster design" },
  { src: "/images/bengali-style.png", alt: "Bengali Independence Day 2026 poster design" },
  { src: "/images/hindi-style.png", alt: "Hindi 15 August 2026 patriotic poster design" },
  { src: "/images/professional-style.png", alt: "Professional Independence Day 2026 business poster" },
];

const IMAGE_IDEAS = [
  { title: "Tricolour flag design", desc: "Classic saffron, white, and green backgrounds.", link: "/create?style=classic-india" },
  { title: "Personalized photo image", desc: "Your portrait alongside patriotic themes.", link: "/create?style=portrait" },
  { title: "India map design", desc: "Creative framing using the map of India.", link: "/create?style=india-map" },
  { title: "Student celebration image", desc: "Vibrant styles for school or college events.", link: "/create?style=student" },
  { title: "Business greeting image", desc: "Minimal professional designs for corporate use.", link: "/create?style=professional" },
  { title: "WhatsApp Status image", desc: "Vertical formats suited perfectly for your status.", link: "/create?style=hindi" },
  { title: "Patriotic quote image", desc: "Add inspiring freedom fighter quotes.", link: "/independence-day-quotes" },
  { title: "Regional Independence Day", desc: "Express greetings natively in Bengali or Hindi.", link: "/create?style=bengali" },
];

const USE_CASES = [
  { platform: "WhatsApp Status", desc: "Use vertical images for a perfect 9:16 fit on your 15 August 2026 status update.", linkLabel: null, linkHref: null },
  { platform: "Instagram Stories", desc: "Share personalized images with your photo natively to your Stories.", linkLabel: null, linkHref: null },
  { platform: "Instagram Posts", desc: "Download high-quality portrait images for your main feed.", linkLabel: null, linkHref: null },
  { platform: "Facebook Posts", desc: "Create a and share it with friends and family.", linkLabel: "personalized Independence Day poster", linkHref: "/independence-day-poster" },
  { platform: "Profile Pictures", desc: "Set a patriotic visual as your WhatsApp or Facebook Display Picture (DP).", linkLabel: null, linkHref: null },
  { platform: "LinkedIn/Business", desc: "Celebrate professionally with branded", linkLabel: "business creatives", linkHref: "/templates" },
];

export default function IndependenceDayImagesPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Images", href: "/independence-day-images" },
        ]),
        webPageSchema({
          title: "Independence Day Images 2026 – 15 August HD Images",
          description: "Browse Independence Day 2026 images for 15 August.",
          url: "/independence-day-images",
        }),
      ]} />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-4 pb-8 sm:pt-10 sm:pb-16 lg:pb-20 bg-white border-b border-slate-100 overflow-hidden">
        {/* Background Tricolour blob — constrained to prevent overflow on narrow viewports */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 lg:w-[560px] lg:h-[560px] bg-gradient-to-bl from-orange-200/40 via-amber-100/20 to-emerald-200/40 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/4 -translate-y-1/4"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-4 sm:mb-6">
            <Breadcrumbs crumbs={[
              { name: "Home", href: "/" },
              { name: "Independence Day Images", href: "/independence-day-images" },
            ]} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* ── Left / Main Column ── */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">

              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-[11px] sm:text-xs font-extrabold">
                <IndianFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
                <span className="text-[#f97316]">15 AUGUST</span>
                <span className="text-[#15803d]">2026</span>
              </div>

              {/* H1 — preserved exactly, responsive size only */}
              <h1 className="text-[1.85rem] leading-[1.15] xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight text-[#0f172a]">
                Independence Day 2026 Images
              </h1>

              <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                Beautiful 15 August 2026 images for WhatsApp, Instagram, and social media. Browse all styles and create a personalised image with your name and photo — free.
              </p>

              {/* Primary CTA — full-width on mobile, auto on desktop */}
              <div className="pt-1 sm:pt-2">
                <Link
                  href="/create"
                  className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white px-6 py-4 sm:py-3.5 rounded-xl font-extrabold text-base sm:text-sm shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all min-h-[52px] sm:min-h-[44px]"
                >
                  <Edit3 className="w-4 h-4 stroke-[2.5] shrink-0" />
                  <span>Create Your Poster</span>
                </Link>
              </div>
            </div>

            {/* ── Right: 3-card showcase — Desktop only ── */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
              <div className="relative w-full max-w-sm h-[300px] flex items-center justify-center">
                <div className="absolute left-0 top-6 w-32 bg-white p-1 rounded-xl shadow-xl border border-slate-200/90 -rotate-6">
                  <img src="/images/modern-india-style.png" alt="" aria-hidden="true" className="w-full h-auto rounded-lg" loading="eager" fetchPriority="high" />
                </div>
                <div className="absolute right-0 top-10 w-32 bg-white p-1 rounded-xl shadow-xl border border-slate-200/90 rotate-6">
                  <img src="/images/portrait-style.png" alt="" aria-hidden="true" className="w-full h-auto rounded-lg" loading="eager" fetchPriority="high" />
                </div>
                <div className="relative z-10 w-40 bg-white p-1.5 rounded-2xl shadow-2xl border border-slate-200">
                  <img src="/images/classic-india-style.png" alt="Featured Independence Day 2026 image" className="w-full h-auto rounded-xl" loading="eager" fetchPriority="high" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        {/* ── Section: Create Your Own ── */}
        <section className="mb-10 sm:mb-14" aria-label="Create your own Independence Day image">
          <div className="bg-gradient-to-br from-orange-50 via-white to-emerald-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-48 h-48 bg-orange-200/30 blur-3xl rounded-full -z-10" />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-white shadow-sm border border-orange-100 text-orange-600 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-tight">Create Your Own Independence Day Image</h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                  The best Independence Day image is one that has your face, your name and your city on it. Create a personalised image completely free.
                </p>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  Start Creating Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: Image Categories ── */}
        <section className="mb-10 sm:mb-14" aria-label="Types of Independence Day images">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6">Types of Independence Day 2026 Images</h2>
          {/* 
            Mobile: 1-col stack. sm/md: 2-col. lg: 3-col.
            Each card has a visible thumbnail strip for categories that have images.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {IMAGE_TYPES.map((t) => (
              <div key={t.title} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm sm:text-base mb-1">{t.title}</div>
                  <div className="text-slate-500 text-xs sm:text-sm leading-relaxed">{t.desc}</div>
                </div>
                {t.images.length > 0 && (
                  <div className="flex gap-2">
                    {t.images.map(img => (
                      <div key={img} className="w-14 h-[4.5rem] sm:w-16 sm:h-20 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                        <img
                          src={`/images/${img}`}
                          alt={`${t.title} example`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={64}
                          height={80}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: Featured Image Gallery ── */}
        <section className="mb-10 sm:mb-16" aria-label="Featured Independence Day images gallery">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6">Featured Independence Day Images</h2>
          {/*
            Mobile 320–414px: 2 columns. Each card ≈ 148–195px wide for portrait images.
            Portrait images (4:5) at 2-col width are comfortably viewable.
            lg: 4-col grid for a richer desktop showcase.
          */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {IMAGE_GALLERY.map((img, i) => (
              <div
                key={img.src}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto block"
                  loading={i < 4 ? "eager" : "lazy"}
                  fetchPriority={i < 2 ? "high" : undefined}
                  width={600}
                  height={800}
                />
              </div>
            ))}
          </div>

          {/* Gallery CTA — full-width on mobile */}
          <div className="mt-6 sm:mt-8">
            <Link
              href="/create"
              className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-extrabold px-6 py-4 sm:py-3.5 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all text-base sm:text-sm min-h-[52px] sm:min-h-[44px]"
            >
              <Sparkles className="w-5 h-5 shrink-0" />
              Create these images with your photo
            </Link>
          </div>
        </section>

        {/* ── Section: Image Ideas ── */}
        <section className="mb-10 sm:mb-14" aria-label="15 August 2026 image ideas">
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-5 sm:mb-7">15 August 2026 Image Ideas</h2>
            {/*
              Mobile: 2-col compact cards. Each card is small and scannable.
              lg: 4-col. Ideas are concise — users scan, tap "Try this idea".
            */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {IMAGE_IDEAS.map((idea, i) => (
                <Link
                  key={i}
                  href={idea.link}
                  className="group block bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl p-3 sm:p-4 transition-colors min-h-[44px]"
                >
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1 group-hover:text-orange-700 transition-colors leading-snug">{idea.title}</h3>
                  <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed hidden sm:block">{idea.desc}</p>
                  <span className="inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-bold text-orange-600 mt-1.5 sm:mt-2">
                    Try it <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: How to Use ── */}
        <section className="mb-8 sm:mb-0" aria-label="How to use Independence Day images">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6">
              How to Use Independence Day 2026 Images
            </h2>
            {/*
              Mobile: Vertical card stack. Each card is a single platform with bold platform name.
              Each card has a generous tap height and clear visual separation.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {USE_CASES.map((uc) => (
                <div key={uc.platform} className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5">
                  <div className="font-bold text-slate-900 text-sm sm:text-base mb-1">{uc.platform}</div>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {uc.desc}
                    {uc.linkLabel && uc.linkHref && (
                      <>{" "}<Link href={uc.linkHref} className="text-orange-600 hover:underline font-medium">{uc.linkLabel}</Link>.</>  
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ── Related Links ── */}
      <div className="border-t border-slate-100 bg-slate-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm sm:text-base font-bold text-slate-700 mb-4">Related Pages</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {RELATED.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 sm:gap-1.5 border border-slate-300 bg-white hover:border-orange-400 hover:text-orange-600 text-slate-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2.5 rounded-xl transition-all min-h-[40px]"
              >
                {link.label} <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA Banner ── */}
      <div className="bg-slate-900 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left">
            <div>
              <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl leading-snug">Create Your Independence Day Poster</div>
              <div className="text-slate-400 text-sm mt-1">Free, personalised, ready to share in seconds.</div>
            </div>
            <Link
              href="/create"
              className="shrink-0 flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm sm:text-base min-h-[48px]"
            >
              <Sparkles className="w-5 h-5 shrink-0" />
              Create Poster
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
