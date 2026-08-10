import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy – Freedom2026.in",
  description: "Cancellation & Refund Policy for Freedom2026.in digital downloads.",
  alternates: { canonical: "/refund" },
  robots: { index: true, follow: false },
};

const UPDATED = "10 August 2026";

export default function RefundPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Refund Policy", href: "/refund" },
      ])} />

      <div className="min-h-screen bg-white">
        <div className="bg-slate-50 border-b border-slate-100 py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-slate-500 mb-3">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span className="mx-1.5">›</span>
              <span>Cancellation & Refund Policy</span>
            </nav>
            <h1 className="text-3xl font-black text-slate-900">Cancellation & Refund Policy</h1>
            <p className="text-slate-500 text-sm mt-1">Last updated: {UPDATED}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate max-w-none text-sm">
          <p>
            This Cancellation and Refund Policy applies to the digital services and products provided by {SITE_CONFIG.company.name} via Freedom2026.in.
          </p>

          <h2>1. Digital Products and Services</h2>
          <p>
            Freedom2026.in offers custom-generated digital posters. By purchasing a premium poster download or other digital goods, you acknowledge that the product is delivered instantly in digital format.
          </p>

          <h2>2. No Cancellations</h2>
          <p>
            Because our service involves the immediate generation and delivery of custom digital content upon your request and payment, we do not accept cancellations once an order has been placed and payment has been processed. 
          </p>

          <h2>3. No Refunds</h2>
          <p>
            All sales of digital products and downloads are final. We do not offer refunds, returns, or exchanges for downloaded posters. Please review the generated preview carefully before choosing to purchase the full-resolution download.
          </p>

          <h2>4. Exceptions / Technical Issues</h2>
          <p>
            If you have successfully made a payment but did not receive access to download your poster due to a technical error on our platform, please contact us immediately. We will investigate the issue and, at our sole discretion, provide you with the correct digital file or a refund if the service could not be rendered.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you experience any technical issues with your purchase, please reach out to us at:
            <br />
            Email: <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a>
          </p>
        </div>
      </div>
    </>
  );
}
