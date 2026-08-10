import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/siteConfig";
import IndianFlag from "./IndianFlag";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* ── Tricolor accent bar ── */}
      <div className="h-1 flex">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-emerald-600" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Freedom2026 Home">
              <div className="flex items-center gap-0.5 mb-1">
                <span className="text-white font-black text-2xl tracking-tight">FREEDOM</span>
                <span className="font-black text-2xl tracking-tight">
                  <span className="text-orange-400">2</span>
                  <span className="text-slate-200">0</span>
                  <span className="text-emerald-400">2</span>
                  <span className="text-blue-400">6</span>
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm font-medium mt-1 mb-4 flex items-center gap-1.5">
              <span>Create. Celebrate. Share.</span>
              <IndianFlag className="w-4 h-3" />
            </p>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Freedom2026.in is India's Independence Day digital creation platform for 15 August 2026.
              Create personalized posters, videos and social media creatives.
            </p>
            <p className="mt-4 text-xs text-slate-600">
              Powered by{" "}
              <a
                href={SITE_CONFIG.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-orange-400 transition-colors font-medium"
              >
                {SITE_CONFIG.company.name}
              </a>
            </p>
          </div>

          {/* ── Create ── */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Create</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.create.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Explore ── */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/independence-day-2026" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">
                  15 August 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Products + Company ── */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Products</h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={SITE_CONFIG.products.capitalCoach.url}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    CapitalCoach AI
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.products.tagoConnect.url}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    TagoConnect AI
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    Tagobuy Technologies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {currentYear} Freedom2026.in. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs text-center sm:text-right">
            Powered by{" "}
            <a
              href={SITE_CONFIG.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-400 transition-colors"
            >
              Tagobuy Technologies Private Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
