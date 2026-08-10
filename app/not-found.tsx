import Link from "next/link";
import { Home, Sparkles } from "lucide-react";
import IndianFlag from "@/components/IndianFlag";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-lg">
        {/* 404 Visual */}
        <div className="text-8xl font-black leading-none mb-2 flex items-center justify-center gap-1">
          <span className="text-orange-500">4</span>
          <IndianFlag className="w-16 h-11 inline-block" />
          <span className="text-emerald-600">4</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-2 flex items-center justify-center gap-2">
          <span>Lost Your Way?</span>
          <IndianFlag className="w-6 h-4" />
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          The page you're looking for doesn't exist or may have moved.
          Let's get you back to celebrating Independence Day 2026!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            Back Home
          </Link>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Create Your Poster
          </Link>
        </div>

        {/* Popular links */}
        <div className="mt-10 text-left">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">Popular Pages</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "Independence Day Wishes", href: "/independence-day-wishes" },
              { label: "Independence Day Quotes", href: "/independence-day-quotes" },
              { label: "WhatsApp Status", href: "/independence-day-status" },
              { label: "Templates", href: "/templates" },
              { label: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-orange-600 hover:text-orange-700 border border-orange-200 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
