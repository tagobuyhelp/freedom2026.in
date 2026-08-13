import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import IndianFlag from "@/components/IndianFlag";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/data/templates";

export const metadata: Metadata = {
  title: "Independence Day 2026 Poster Templates – Free & Premium Designs",
  description:
    "Browse 50+ Independence Day 2026 poster templates. Classic, Modern, Bengali, Hindi, Business and Premium designs. Create your free personalised Independence Day poster.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Templates", href: "/templates" },
      ])} />

      <div className="min-h-screen bg-white">

        {/* ── Header ── */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-10 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <IndianFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
              <span>50+ TEMPLATES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              Independence Day 2026 Templates
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Browse our full collection of personalised Independence Day poster templates for 15 August 2026.
              Classic, Modern, Bengali, Hindi, Business and Premium designs — all free.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ── Category filter ── */}
          <div className="flex gap-2 flex-wrap mb-8">
            {TEMPLATE_CATEGORIES.map((cat, i) => (
              <span key={cat} className={`px-4 py-2 rounded-xl text-sm font-bold border cursor-pointer transition-all select-none ${
                i === 0 ? "bg-orange-600 text-white border-orange-600" : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
              }`}>
                {cat}
              </span>
            ))}
          </div>

          {/* ── Template grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {TEMPLATES.map((tmpl) => {
              const isAvailable = tmpl.id === "classic-india" || tmpl.id === "modern-india" || tmpl.id === "business" || tmpl.id === "india-map" || tmpl.id === "portrait" || tmpl.id === "bengali" || tmpl.id === "hindi" || tmpl.id === "student";
              return (
                <Link
                  key={tmpl.id}
                  href="/create"
                  aria-label={`Use ${tmpl.title} template`}
                  className="group"
                >
                  <div className={`border-2 rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                    isAvailable ? "border-orange-500 shadow-xs" : "border-slate-200 opacity-75"
                  }`}>
                    {/* Preview Image */}
                    <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                      {tmpl.thumbnailImage ? (
                        <img 
                          src={tmpl.thumbnailImage} 
                          alt={tmpl.title} 
                          className={`w-full h-full object-cover ${!isAvailable ? "grayscale" : ""}`}
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-b ${tmpl.previewBg}`} />
                      )}

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-1 z-10">
                        {isAvailable && (
                          <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">ACTIVE</span>
                        )}
                        {!isAvailable && (
                          <span className="bg-slate-800/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded">SOON</span>
                        )}
                        {tmpl.tier === "premium" && (
                          <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded">✨ PRO</span>
                        )}
                      </div>

                      {!isAvailable && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[0.5px]">
                          <span className="bg-white/90 text-slate-900 text-xs font-black px-2.5 py-1 rounded shadow-sm">Coming Soon</span>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="bg-white p-3 text-center">
                      <div className="font-extrabold text-slate-900 text-xs truncate">{tmpl.title}</div>
                      <div className={`text-[10px] font-bold mt-0.5 ${isAvailable ? "text-emerald-600" : "text-slate-400"}`}>
                        {isAvailable ? "Available Now" : "Coming Soon"}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <div className="mt-12 text-center bg-gradient-to-br from-orange-50 to-emerald-50 border border-orange-100 rounded-3xl p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Ready to Create Your Poster?</h2>
            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
              Choose a template above and create your personalised Independence Day 2026 poster in seconds.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Create Your Poster
            </Link>
          </div>

          {/* ── SEO content ── */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">About Our Independence Day Templates</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              Freedom2026.in offers a growing collection of Independence Day 2026 poster templates.
              All templates are designed specifically for 15 August 2026 and are optimised for sharing on
              WhatsApp, Instagram, Facebook and other social media platforms.
              Our templates are available in English, Bengali and Hindi.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: "Independence Day Wishes", href: "/independence-day-wishes" },
                { label: "Independence Day Quotes", href: "/independence-day-quotes" },
                { label: "Bengali Poster", href: "/independence-day-wishes-bengali" },
                { label: "Create Poster", href: "/create" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-orange-600 hover:text-orange-700 font-medium underline underline-offset-2">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
