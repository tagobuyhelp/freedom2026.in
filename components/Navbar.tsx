"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Wand2, Bell } from "lucide-react";

const NAV_MENU = [
  { label: "Home", href: "/" },
  { label: "Create", href: "/create" },
  { label: "Templates", href: "/templates" },
  { label: "Business", href: "/create?type=business" },
  { label: "Wishes", href: "/independence-day-wishes" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
        scrolled ? "shadow-xs border-b border-slate-200/80" : "border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* ── Mobile Left: Hamburger Icon ── */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
            </button>
          </div>

          {/* ── Logo Matching Reference Image (Centered on Mobile, Left-aligned on Desktop) ── */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" aria-label="Freedom2026 Home">
            {/* Ashoka Chakra with Tricolor Ribbon SVG */}
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
              <svg className="w-9 h-9 sm:w-12 sm:h-12" viewBox="0 0 60 60" fill="none">
                <circle cx="28" cy="28" r="16" stroke="#0038a8" strokeWidth="2.5" />
                <circle cx="28" cy="28" r="3.5" fill="#0038a8" />
                {Array.from({ length: 24 }).map((_, i) => (
                  <line
                    key={i}
                    x1="28"
                    y1="28"
                    x2={Number((28 + 14 * Math.cos((i * 15 * Math.PI) / 180)).toFixed(4))}
                    y2={Number((28 + 14 * Math.sin((i * 15 * Math.PI) / 180)).toFixed(4))}
                    stroke="#0038a8"
                    strokeWidth="1.2"
                  />
                ))}
                <path d="M6 34C18 36 24 48 48 44" stroke="#ff671f" strokeWidth="4" strokeLinecap="round" />
                <path d="M12 40C22 42 28 52 52 48" stroke="#046a38" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            {/* Logo Text Block */}
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5 leading-none">
                <span className="text-xl sm:text-[26px] font-black tracking-tight text-[#0e172a]">
                  FREEDOM
                </span>
                <span className="text-xl sm:text-[26px] font-black tracking-tight">
                  <span className="text-[#ff671f]">20</span>
                  <span className="text-[#046a38]">26</span>
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-extrabold text-[#0e172a] tracking-wider uppercase mt-0.5">
                15 AUGUST 2026
              </span>
            </div>
          </Link>

          {/* ── Mobile Right: Bell Icon ── */}
          <div className="flex lg:hidden items-center">
            <button
              className="p-1.5 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_MENU.map((link) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "text-[#f97316]"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Right CTA Button ── */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/create"
              className="bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Create Poster</span>
              <Wand2 className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2">
          {NAV_MENU.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold ${
                pathname === link.href ? "bg-orange-50 text-orange-600" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
