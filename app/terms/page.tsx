import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms of Service – Freedom2026.in",
  description: "Terms of Service for Freedom2026.in — Independence Day 2026 platform by Tagobuy Technologies Private Limited.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

const UPDATED = "8 August 2026";

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Terms of Service", href: "/terms" },
      ])} />

      <div className="min-h-screen bg-white">
        <div className="bg-slate-50 border-b border-slate-100 py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-slate-500 mb-3">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span className="mx-1.5">›</span>
              <span>Terms of Service</span>
            </nav>
            <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
            <p className="text-slate-500 text-sm mt-1">Last updated: {UPDATED}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate max-w-none text-sm">
          <p>
            By using Freedom2026.in, you agree to these Terms of Service.
            Freedom2026.in is operated by {SITE_CONFIG.company.name}.
          </p>

          <h2>1. Acceptable Use</h2>
          <p>You may use Freedom2026.in only for lawful purposes. You agree not to:</p>
          <ul>
            <li>Upload content that is illegal, defamatory, obscene or harmful</li>
            <li>Infringe the intellectual property rights of others</li>
            <li>Attempt to disrupt or compromise the security or integrity of the platform</li>
            <li>Use automated tools to scrape or abuse the service</li>
          </ul>

          <h2>2. User-Generated Content</h2>
          <p>
            When you upload a photo or enter personal information to create a poster or video,
            you confirm that you have the right to use that content and that it does not infringe the rights of any third party.
            You retain ownership of any images you upload.
          </p>

          <h2>3. Uploaded Images</h2>
          <p>
            You are solely responsible for the photos and content you upload.
            Do not upload images of other individuals without their consent.
            Do not upload images containing hate speech, nudity or illegal content.
          </p>

          <h2>4. Copyright</h2>
          <p>
            All original design templates, branding and platform content on Freedom2026.in are the intellectual property of
            {SITE_CONFIG.company.name}. You may not reproduce or distribute our templates without permission.
          </p>

          <h2>5. Service Availability</h2>
          <p>
            We aim to provide continuous access to Freedom2026.in but do not guarantee uninterrupted availability.
            We may modify, suspend or discontinue any part of the service at any time without notice.
          </p>

          <h2>6. Premium Purchases</h2>
          <p>
            When premium features are introduced, all purchase terms including refund policies will be clearly communicated.
            No premium charges apply without your explicit consent.
          </p>

          <h2>7. Abuse Prevention</h2>
          <p>
            We reserve the right to terminate access for users who abuse the service, violate these terms or
            attempt to misuse the poster creator or other platform features.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Freedom2026.in is provided "as is" without warranties of any kind.
            {SITE_CONFIG.company.name} shall not be liable for any indirect or consequential damages arising from your use of the platform.
          </p>

          <h2>9. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be resolved in the courts of West Bengal, India.</p>

          <h2>10. Contact</h2>
          <p>
            For questions about these Terms, contact us at{" "}
            <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a>.
          </p>

          <p className="text-xs text-slate-400 mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <strong>Note:</strong> These Terms of Service are provided in good faith and may be updated as the platform develops.
            For jurisdiction-specific legal compliance, please consult a qualified legal professional.
          </p>
        </div>
      </div>
    </>
  );
}
