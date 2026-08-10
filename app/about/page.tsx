import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import IndianFlag from "@/components/IndianFlag";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Freedom2026 – India's Independence Day 2026 Platform",
  description:
    "Freedom2026.in is India's Independence Day 2026 digital creation platform powered by Tagobuy Technologies Private Limited. Create personalised posters and videos for 15 August 2026.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
      ])} />

      <div className="min-h-screen bg-white">
        <div className="bg-slate-50 border-b border-slate-100 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-slate-500 mb-4">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span className="mx-1.5">›</span>
              <span className="text-slate-700">About</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">About Freedom2026</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">What is Freedom2026?</h2>
            <div className="text-slate-600 text-sm leading-relaxed space-y-3">
              <p>
                <strong>Freedom2026.in</strong> is an Independence Day 2026 digital creation platform for India.
                We help every Indian create beautiful, personalised Independence Day posters, videos, wishes and
                social media creatives for 15 August 2026 — completely free.
              </p>
              <p>
                Our platform is designed for the mobile-first Indian internet user.
                Whether you're sharing a poster on WhatsApp, posting an Independence Day message on Facebook
                or creating a personalised video greeting for Instagram Reels, Freedom2026 makes it easy and instant.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our mission is simple: to help every Indian express their Independence Day pride with a personalised creative that represents who they are.
              We believe that Independence Day is not just a date on the calendar — it's a feeling, a memory and a celebration of what India means to each of us.
            </p>
          </section>

          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-black text-slate-900 mb-3">Powered by Tagobuy Technologies</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Freedom2026 is built and operated by <strong>{SITE_CONFIG.company.name}</strong>,
              a technology company focused on building digital products for India.
              Tagobuy Technologies develops tools for individuals and businesses to grow their digital presence.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.products.capitalCoach.url}
                className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5"
              >
                CapitalCoach AI <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.products.tagoConnect.url}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1.5"
              >
                TagoConnect AI <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">What We're Building</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "Free personalised Independence Day poster creator",
                "Independence Day video creator for WhatsApp Status and Instagram Reels",
                "Business Independence Day creative generator",
                "Premium AI-powered patriotic creatives",
                "Independence Day wishes, quotes and status in English, Bengali and Hindi",
                "Independence Day content hub for 15 August 2026",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <IndianFlag className="w-4 h-3 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-center">
            <h2 className="text-lg font-black text-white mb-2">Try Freedom2026 Today</h2>
            <p className="text-slate-400 text-sm mb-4">Create your personalised Independence Day poster — free, instant, no signup required.</p>
            <Link href="/create" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
              <Sparkles className="w-4 h-4" />
              Create Your Poster
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
