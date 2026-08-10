import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles, Play, ArrowRight,
  Quote, MessageSquare, ImageIcon,
  Heart, TrendingUp, Bot, Smartphone, BookOpen,
  Send
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/siteConfig";
import HeroSection from "@/components/HeroSection";
import CreatorSectionWrapper from "@/components/CreatorSectionWrapper";
import IndianFlag from "@/components/IndianFlag";

export const metadata: Metadata = {
  title: "Independence Day 2026 Poster Maker | Create Your Freedom Story",
  description:
    "Create a personalized Independence Day 2026 poster with your photo, name and city. Celebrate 15 August with free patriotic posters, wishes, quotes, images and social media creatives.",
  alternates: { canonical: "https://freedom2026.in/" },
  openGraph: {
    title: "Independence Day 2026 Poster Maker | Create Your Freedom Story",
    description:
      "Create your personalized Independence Day 2026 poster with your photo, name and city. Celebrate 15 August with Freedom2026.in.",
    url: "https://freedom2026.in/",
    type: "website",
    images: [
      {
        url: "https://freedom2026.in/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Freedom2026 — Independence Day 2026 Poster Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Independence Day 2026 Poster Maker | Create Your Freedom Story",
    description:
      "Create your personalized Independence Day 2026 poster with your photo, name and city. Celebrate 15 August with Freedom2026.in.",
    images: ["https://freedom2026.in/images/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

// Template gallery — img data used in the "STYLE_TEMPLATES" section
// alt text is descriptive for image SEO; tag/img used for rendering
const STYLE_TEMPLATES = [
  { id: "classic-india",  title: "Classic India",  tag: "Free",    img: "/images/classic-india-style.png",   alt: "Classic India Independence Day 2026 poster template" },
  { id: "modern-india",   title: "Modern India",   tag: "Free",    img: "/images/modern-india-style.png",    alt: "Modern India Independence Day 2026 poster template" },
  { id: "india-map",      title: "India Map",      tag: "Free",    img: "/images/india-map-style.png",       alt: "India Map Independence Day 2026 poster template" },
  { id: "portrait",       title: "Portrait",       tag: "Free",    img: "/images/portrait-style.png",        alt: "Portrait style Independence Day 2026 poster template" },
  { id: "bengali",        title: "Bengali",        tag: "Free",    img: "/images/bengali-style.png",         alt: "Bengali Independence Day 2026 poster template" },
  { id: "hindi",          title: "Hindi",          tag: "Free",    img: "/images/hindi-style.png",           alt: "Hindi Independence Day 2026 poster template" },
  { id: "student",        title: "Student",        tag: "Free",    img: "/images/student-style.png",         alt: "Student Independence Day 2026 poster template" },
  { id: "professional",  title: "Professional",   tag: "Premium", img: "/images/professional-style.png",    alt: "Professional Independence Day 2026 poster template" },
];

export default function HomePage() {
  // ── JSON-LD: WebPage + WebApplication schemas for this route ──
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Independence Day 2026 Poster Maker | Create Your Freedom Story",
    description:
      "Create a personalized Independence Day 2026 poster with your photo, name and city. Celebrate 15 August with free patriotic posters, wishes, quotes, images and social media creatives.",
    url: "https://freedom2026.in/",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Tagobuy Technologies Private Limited",
      url: "https://tagobuy.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://freedom2026.in/" },
      ],
    },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Freedom2026 Independence Day Poster Maker",
    description:
      "Create personalized Independence Day 2026 posters with your photo, name and city.",
    url: "https://freedom2026.in/create",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    inLanguage: ["en", "bn", "hi"],
  };

  return (
    <>
      <JsonLd data={[webPageSchema, webAppSchema]} />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Headline: "Create Your Freedom Story"
          CTA: [Create My Poster] [Create My Video]
          Trust strip: Free · No Signup · Share Instantly · Mobile Friendly
          Right: 3D floating poster cards
      ══════════════════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — QUICK CREATOR
          Name | Photo | City | Template → Generate My Poster
      ══════════════════════════════════════════════════════════════════════ */}
      <CreatorSectionWrapper />





      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — BUSINESS CREATOR
          Celebrate Independence Day With Your Brand 🇮🇳
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Copy */}
            <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
              <div>
                <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-wider mb-3.5 border border-orange-200 bg-orange-50 px-3 py-1 rounded-full">
                  For Businesses
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Celebrate Independence Day<br />With Your Brand{" "}
                  <IndianFlag className="w-6 h-4 inline" />
                </h2>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  Create professional Independence Day posters with your business name, logo and contact details.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 max-w-xs mx-auto lg:mx-0">
                <Link
                  href="/create?type=business"
                  className="bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-xs text-sm text-center"
                >
                  Create Business Poster
                </Link>
                <Link
                  href="/templates"
                  className="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold px-5 py-3 rounded-xl transition-all text-sm text-center"
                >
                  View Business Packages
                </Link>
              </div>
            </div>

            {/* Centre: Sample Business Poster */}
            <div className="lg:col-span-4 flex justify-center">
              <div
                className="w-64 h-64 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-md shrink-0"
                aria-label="Independence Day 2026 business promotional poster example"
                role="img"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#FF9933]" />
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#138808]" />

                <div className="text-center font-black text-[#0f172a] text-xs tracking-wider uppercase pt-2">
                  ABC ELECTRONICS
                </div>

                <div className="text-center my-auto space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 tracking-wide uppercase">HAPPY</div>
                  <div className="text-base font-black text-blue-900 tracking-tight">INDEPENDENCE DAY</div>
                  <div className="text-lg font-black text-orange-600">2026</div>
                  <div className="text-[8px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded-md py-0.5 px-2 inline-block uppercase tracking-wide">
                    Special Independence Day Offer
                  </div>
                  <div className="text-xs font-black text-[#138808]">UP TO 25% OFF</div>
                </div>

                <div className="flex items-center justify-between text-[8px] text-slate-500 font-bold border-t border-slate-100 pt-2 pb-1">
                  <span>📞 98765 43210</span>
                  <span>www.abcelectronics.in</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing Tiers */}
            <div className="lg:col-span-4 grid grid-cols-3 gap-2.5">
              {[
                { label: "Starter", price: "₹199", features: "3 Creatives", popular: false, color: "bg-[#f97316] hover:bg-[#ea580c]" },
                { label: "Business", price: "₹499", features: "5 Creatives\n+ 1 Video", popular: true, color: "bg-[#137333] hover:bg-[#0f5c28]" },
                { label: "Premium", price: "₹999", features: "10 Creatives\n+ 3 Videos", popular: false, color: "bg-[#f97316] hover:bg-[#ea580c]" },
              ].map((plan) => (
                <div
                  key={plan.label}
                  className={`bg-white rounded-2xl p-3 flex flex-col justify-between text-center shadow-2xs h-60 relative ${plan.popular ? "border-2 border-emerald-600" : "border border-slate-200"}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{plan.label}</div>
                    <div className="text-xl font-black text-slate-900 mt-2">{plan.price}</div>
                    <div className="text-[9px] font-bold text-slate-500 mt-2 leading-relaxed whitespace-pre-line">{plan.features}</div>
                  </div>
                  <Link
                    href="/create?type=business"
                    className={`${plan.color} text-white py-1.5 rounded-lg text-[10px] font-extrabold transition-all`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 — FREEDOM MEANS MORE THAN ONE THING
          Personal | Financial (CapitalCoach) | Business (TagoConnect)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Freedom Means More Than One Thing.
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
              Independence inspires us to build a better life, a better business and a better future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Personal Freedom */}
            <div className="bg-gradient-to-br from-orange-50/60 via-white to-orange-50/20 border border-orange-100 rounded-3xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div className="text-xs font-extrabold text-orange-600 uppercase tracking-wide">Personal Freedom</div>
                <div className="font-extrabold text-slate-800">Create. Express. Celebrate.</div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Tell your Independence Day story with a personalised poster or video.
                </p>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold text-xs"
                >
                  Create Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="mt-8 pt-4 border-t border-orange-100 flex justify-end">
                <div className="w-14 h-10 bg-orange-100/50 rounded-xl flex items-center justify-center">
                  <IndianFlag className="w-7 h-5" />
                </div>
              </div>
            </div>

            {/* Financial Freedom */}
            <div className="bg-gradient-to-br from-amber-50/60 via-white to-amber-50/20 border border-amber-100 rounded-3xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-xs font-extrabold text-amber-600 uppercase tracking-wide">Financial Freedom</div>
                <div className="font-extrabold text-slate-800">Plan. Track. Grow.</div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Take control of your personal finances with an AI-powered financial coach.
                </p>
                <a
                  href={SITE_CONFIG.products.capitalCoach.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold text-xs"
                >
                  Explore CapitalCoach <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="mt-8 pt-4 border-t border-amber-100 flex items-center justify-between">
                <div className="text-[10px] font-black text-slate-900">
                  CapitalCoach <span className="text-emerald-600">AI</span>
                </div>
                <div className="flex items-end gap-0.5 h-6">
                  {[2, 3, 5, 6].map((h, i) => (
                    <span key={i} className="w-1.5 rounded-xs bg-emerald-500" style={{ height: `${h * 4}px` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Business Freedom */}
            <div className="bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/20 border border-emerald-100 rounded-3xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Bot className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wide">Business Freedom</div>
                <div className="font-extrabold text-slate-800">Connect. Manage. Grow.</div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Manage your WhatsApp, Facebook and Instagram leads from one place.
                </p>
                <a
                  href={SITE_CONFIG.products.tagoConnect.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold text-xs"
                >
                  Explore TagoConnect <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="mt-8 pt-4 border-t border-emerald-100 flex items-center justify-between">
                <div className="text-[10px] font-black text-slate-900">
                  TagoConnect <span className="text-orange-500">AI</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100/60 text-emerald-700 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9 — EVERYTHING FOR INDEPENDENCE DAY 2026
          Content Hub: Wishes | Quotes | Status | Video | Images | Captions
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Everything for Independence Day 2026
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Everything you need for 15 August 2026 — wishes, quotes, status, images and more.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: "Wishes",         desc: "Best wishes for friends & family",         href: "/independence-day-wishes",   icon: <Heart className="w-4 h-4" />,        bg: "bg-red-50",    border: "border-red-100/60",    text: "text-red-600" },
              { title: "Quotes",         desc: "Inspiring patriotic quotes",               href: "/independence-day-quotes",   icon: <Quote className="w-4 h-4" />,        bg: "bg-blue-50",   border: "border-blue-100/60",   text: "text-blue-600" },
              { title: "WhatsApp Status",desc: "Short status messages for everyone",       href: "/independence-day-status",   icon: <Smartphone className="w-4 h-4" />,   bg: "bg-emerald-50",border: "border-emerald-100/60",text: "text-emerald-600" },
              { title: "Video Ideas",    desc: "15-sec video ideas for social media",      href: "/independence-day-video",    icon: <Play className="w-4 h-4" />,         bg: "bg-purple-50", border: "border-purple-100/60", text: "text-purple-600" },
              { title: "Images",         desc: "Beautiful images & posters",               href: "/independence-day-images",   icon: <ImageIcon className="w-4 h-4" />,    bg: "bg-amber-50",  border: "border-amber-100/60",  text: "text-amber-600" },
              { title: "Captions",       desc: "Instagram & Facebook captions",            href: "/independence-day-quotes",   icon: <Send className="w-4 h-4" />,         bg: "bg-teal-50",   border: "border-teal-100/60",   text: "text-teal-600" },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center justify-between"
              >
                <div className={`w-9 h-9 rounded-xl ${card.bg} border ${card.border} ${card.text} flex items-center justify-center`}>
                  {card.icon}
                </div>
                <h3 className="font-extrabold text-slate-900 text-xs mt-3">{card.title}</h3>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{card.desc}</p>
                <div className={`mt-3 text-[10px] font-bold ${card.text} flex items-center gap-0.5`}>
                  Explore <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 10 — BENGALI REGIONAL CONTENT
          বাংলায় স্বাধীনতা দিবসের শুভেচ্ছা
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-50/20 via-white to-orange-50/10 border border-slate-200/80 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">

            <div className="space-y-4 max-w-xl text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-2 font-bengali">
                <span>বাংলায় স্বাধীনতা দিবসের শুভেচ্ছা</span>
                <IndianFlag className="w-5 h-3.5" />
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md leading-relaxed font-bengali">
                বাঙালি সংস্কৃতি ও ঐতিহ্য মেনে সুন্দরভাবে সাজানো শুভেচ্ছা বাণী ও স্ট্যাটাস কালেকশন।
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />, text: "বাংলা শুভেচ্ছা" },
                  { icon: <Send className="w-4 h-4 text-emerald-600 shrink-0" />,          text: "বাংলা স্ট্যাটাস" },
                  { icon: <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />,      text: "বাংলা কবিতা" },
                  { icon: <Quote className="w-4 h-4 text-emerald-600 shrink-0" />,         text: "বাংলা মেসেজ" },
                ].map((item) => (
                  <div key={item.text} className="border border-emerald-100 bg-emerald-50/20 rounded-xl p-3 flex items-center gap-2">
                    {item.icon}
                    <span className="text-xs font-bold text-slate-800 font-bengali">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-center w-full md:w-auto">
              <Link
                href="/independence-day-wishes-bengali"
                className="bg-[#137333] hover:bg-[#0f5c28] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <span className="font-bengali">বাংলা কনটেন্ট দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 11 — FINAL CTA: YOUR STORY. YOUR FREEDOM. 🇮🇳
          Tricolour-inspired gradient background
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-white border-t border-slate-100">
        {/* Tricolour gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 shadow-2xs rounded-full text-xs font-extrabold">
            <IndianFlag className="w-4 h-3" />
            <span className="text-slate-800">15 AUGUST 2026</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Your Story.{" "}
            <span className="text-[#f97316]">Your</span>{" "}
            <span className="text-[#15803d]">Freedom.</span>{" "}
            <IndianFlag className="w-9 h-6 inline" />
          </h2>

          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Create your personalized Independence Day 2026 poster today. Free, no signup required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.99] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create My Poster</span>
            </Link>
            <Link
              href="/independence-day-video"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#137333] text-[#137333] hover:bg-emerald-50/50 font-extrabold text-sm px-8 py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.99] transition-all"
            >
              <Play className="w-4 h-4 fill-[#137333]/20" />
              <span>Create My Video</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
