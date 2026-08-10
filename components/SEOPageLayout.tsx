// components/SEOPageLayout.tsx
// Shared layout wrapper for all SEO content pages.

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import IndianFlag from "./IndianFlag";

interface RelatedLink {
  label: string;
  href: string;
}

interface SEOPageLayoutProps {
  breadcrumbs: { name: string; href: string }[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  relatedLinks?: RelatedLink[];
  children: React.ReactNode;
}

export default function SEOPageLayout({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  ctaText = "Create Your Poster",
  ctaHref = "/create",
  relatedLinks = [],
  children,
}: SEOPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Page Header ── */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumbs crumbs={breadcrumbs} />
          </div>
          {eyebrow && (
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <IndianFlag className="w-5 h-3.5" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-lg text-slate-600 leading-relaxed max-w-2xl">{subtitle}</p>
          )}
          <div className="mt-6">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md shadow-orange-500/20 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {children}
      </div>

      {/* ── Related Links ── */}
      {relatedLinks.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-base font-bold text-slate-700 mb-4">Related Pages</h2>
            <div className="flex flex-wrap gap-2">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 border border-slate-300 bg-white hover:border-orange-400 hover:text-orange-600 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                >
                  {link.label} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom CTA Banner ── */}
      <div className="bg-slate-900 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="text-white font-bold text-lg">Create Your Independence Day Poster</div>
            <div className="text-slate-400 text-sm mt-0.5">Free, personalised, ready to share in seconds.</div>
          </div>
          <Link
            href="/create"
            className="shrink-0 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Create Poster
          </Link>
        </div>
      </div>

    </div>
  );
}
