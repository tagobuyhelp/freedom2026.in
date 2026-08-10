import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy – Freedom2026.in",
  description: "Privacy Policy for Freedom2026.in — Independence Day 2026 platform by Tagobuy Technologies Private Limited. Learn how we handle your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
};

const UPDATED = "8 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Privacy Policy", href: "/privacy" },
      ])} />

      <div className="min-h-screen bg-white">
        <div className="bg-slate-50 border-b border-slate-100 py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-slate-500 mb-3">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span className="mx-1.5">›</span>
              <span>Privacy Policy</span>
            </nav>
            <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
            <p className="text-slate-500 text-sm mt-1">Last updated: {UPDATED}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate max-w-none text-sm">
          <p>
            Freedom2026.in ("<strong>Freedom2026</strong>", "<strong>we</strong>", "<strong>us</strong>") is operated by {SITE_CONFIG.company.name}.
            This Privacy Policy explains how we collect, use and protect your information when you use our website at{" "}
            <a href={SITE_CONFIG.url}>{SITE_CONFIG.url}</a>.
          </p>

          <h2>1. What Information We Collect</h2>
          <p><strong>Information you provide:</strong> When you use the poster creator, you may enter your name, city and upload a photo. This information is used solely to generate your personalised poster.</p>
          <p><strong>Automatically collected information:</strong> We may collect standard web analytics data including your approximate location, device type, browser and pages visited.</p>
          <p><strong>Cookies:</strong> We use cookies for analytics (Google Analytics) and to improve your experience. You can disable cookies in your browser settings.</p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To generate your personalised Independence Day poster or video</li>
            <li>To improve our platform and understand how users engage with our content</li>
            <li>To measure website performance and traffic</li>
          </ul>

          <h2>3. Uploaded Images</h2>
          <p>
            Photos you upload for poster creation are used only to generate your poster.
            We do not permanently store your uploaded photos on our servers beyond the time needed to process and deliver your poster.
            We do not share your photos with third parties.
          </p>

          <h2>4. Google Analytics</h2>
          <p>
            We use Google Analytics to understand website traffic and usage patterns.
            Google Analytics collects anonymised data and is subject to{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
            You can opt out of Google Analytics using the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a>.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>Our platform may use third-party services including image processing and analytics. These services have their own privacy policies.</p>

          <h2>6. Data Retention</h2>
          <p>We retain analytics data for up to 26 months. Uploaded images used in poster generation are not permanently stored. We do not sell or rent your personal data.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to request access to, correction of or deletion of any personal data we hold about you. To exercise these rights, contact us at{" "}
            <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a>.
          </p>

          <h2>8. Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a>.
          </p>

          <p className="text-xs text-slate-400 mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <strong>Note:</strong> This Privacy Policy is provided for informational purposes and may be updated as our platform develops.
            For legal compliance specific to your jurisdiction, please consult a qualified legal professional.
          </p>
        </div>
      </div>
    </>
  );
}
