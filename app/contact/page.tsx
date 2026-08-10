import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/siteConfig";
import ContactForm from "@/app/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Freedom2026 – Get in Touch",
  description:
    "Contact the Freedom2026 team. Reach out to Tagobuy Technologies Private Limited for questions, feedback or business enquiries about the Independence Day 2026 platform.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Contact", href: "/contact" },
      ])} />

      <div className="min-h-screen bg-white">
        <div className="bg-slate-50 border-b border-slate-100 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-slate-500 mb-4">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span className="mx-1.5">›</span>
              <span className="text-slate-700">Contact</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Contact Us</h1>
            <p className="text-slate-500 mt-2">We'd love to hear from you. Reach out with questions, feedback or partnership enquiries.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">Email</div>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                  {SITE_CONFIG.contact.email}
                </a>
                <div className="text-slate-500 text-xs mt-0.5">We respond within 24–48 hours</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">Location</div>
                <div className="text-slate-600 text-sm">{SITE_CONFIG.contact.address}</div>
                <div className="text-slate-500 text-xs mt-0.5">Tagobuy Technologies Private Limited</div>
              </div>
            </div>

          </div>

          <ContactForm email={SITE_CONFIG.contact.email} />
        </div>
      </div>
    </>
  );
}
