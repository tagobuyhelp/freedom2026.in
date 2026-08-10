import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy – Freedom2026.in",
  description: "Shipping & Delivery Policy for Freedom2026.in digital products.",
  alternates: { canonical: "/shipping" },
  robots: { index: true, follow: false },
};

const UPDATED = "10 August 2026";

export default function ShippingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Shipping & Delivery", href: "/shipping" },
      ])} />

      <div className="min-h-screen bg-white">
        <div className="bg-slate-50 border-b border-slate-100 py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-slate-500 mb-3">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span className="mx-1.5">›</span>
              <span>Shipping & Delivery Policy</span>
            </nav>
            <h1 className="text-3xl font-black text-slate-900">Shipping & Delivery Policy</h1>
            <p className="text-slate-500 text-sm mt-1">Last updated: {UPDATED}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate max-w-none text-sm">
          <p>
            This Shipping and Delivery Policy applies to the products and services provided by {SITE_CONFIG.company.name} via Freedom2026.in.
          </p>

          <h2>1. Digital Products Only</h2>
          <p>
            Freedom2026.in exclusively provides digital products (such as high-resolution custom posters and videos). We do not sell or ship any physical goods.
          </p>

          <h2>2. Delivery Method and Timing</h2>
          <p>
            Upon successful payment processing or completion of the required unlock actions (such as sharing), your digital product will be made available for download instantly on the website. 
          </p>
          <p>
            There are no shipping charges, delivery delays, or physical transit times associated with our digital products. Delivery is considered complete once the download link or file is presented to you on the screen.
          </p>

          <h2>3. International Users</h2>
          <p>
            Our digital services are accessible globally. Since there is no physical shipping, there are no geographic restrictions or international shipping fees for receiving your digital downloads.
          </p>

          <h2>4. Technical Issues with Delivery</h2>
          <p>
            If you have completed a payment but are unable to access your digital download, please verify your internet connection. If the issue persists, contact our support team so we can manually provide you with your purchased file.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            For any queries regarding the delivery of your digital products, please contact us at:
            <br />
            Email: <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a>
          </p>
        </div>
      </div>
    </>
  );
}
