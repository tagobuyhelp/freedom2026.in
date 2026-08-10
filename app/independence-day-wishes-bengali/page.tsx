import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";
import { WISHES_BN } from "@/data/wishes";

export const metadata: Metadata = {
  title: "বাংলায় স্বাধীনতা দিবসের শুভেচ্ছা ২০২৬ – Independence Day Wishes in Bengali",
  description:
    "১৫ আগস্ট ২০২৬ স্বাধীনতা দিবস উপলক্ষে বাংলায় শুভেচ্ছা বার্তা। Independence Day 2026 wishes in Bengali for West Bengal. Share on WhatsApp and Facebook.",
  alternates: { canonical: "/independence-day-wishes-bengali" },
};

const RELATED = [
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "Hindi Wishes", href: "/independence-day-wishes-hindi" },
  { label: "WhatsApp Status", href: "/independence-day-status" },
  { label: "Create Bengali Poster", href: "/create" },
  { label: "Independence Day Quotes", href: "/independence-day-quotes" },
];

const EXTRA_BN = [
  { id: "w-bn-6", text: "স্বাধীনতার ৭৯তম বার্ষিকীতে সকলকে জানাই আন্তরিক শুভেচ্ছা। আমাদের এই দেশকে ভালোবাসি, আর এই ভালোবাসা চিরকাল থাকুক। জয় হিন্দ! 🇮🇳", category: "general", language: "bn" },
  { id: "w-bn-7", text: "যাঁদের ত্যাগ আর বলিদানের বিনিময়ে আমরা স্বাধীনতা পেয়েছি, তাঁদের প্রতি শ্রদ্ধা জানাই। শুভ স্বাধীনতা দিবস ২০২৬। বন্দে মাতরম! 🇮🇳", category: "patriotic", language: "bn" },
  { id: "w-bn-8", text: "স্বাধীনতা মানে কেবল রাজনৈতিক মুক্তি নয় — মনের স্বাধীনতা, চিন্তার স্বাধীনতা এবং স্বপ্নের স্বাধীনতা। শুভ স্বাধীনতা দিবস! 🇮🇳", category: "inspirational", language: "bn" },
];

export default function BengaliWishesPage() {
  const allBnWishes = [...WISHES_BN, ...EXTRA_BN];

  return (
    <div className="font-bengali">
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Wishes", href: "/independence-day-wishes" },
          { name: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
        ]),
        articleSchema({
          title: "বাংলায় স্বাধীনতা দিবসের শুভেচ্ছা ২০২৬",
          description: "১৫ আগস্ট ২০২৬ স্বাধীনতা দিবস উপলক্ষে বাংলায় শুভেচ্ছা বার্তা।",
          url: "/independence-day-wishes-bengali",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Wishes", href: "/independence-day-wishes" },
          { name: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
        ]}
        eyebrow="১৫ আগস্ট ২০২৬"
        title="বাংলায় স্বাধীনতা দিবসের শুভেচ্ছা ২০২৬"
        subtitle="পশ্চিমবঙ্গ এবং সকল বাংলাভাষী মানুষের জন্য স্বাধীনতা দিবস ২০২৬-এর বাংলা শুভেচ্ছা বার্তা। WhatsApp, Facebook এবং Instagram-এ শেয়ার করুন।"
        ctaText="বাংলা পোস্টার তৈরি করুন"
        relatedLinks={RELATED}
      >
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            Independence Day 2026 Wishes in Bengali
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            বাংলায় লেখা এই শুভেচ্ছাগুলো আপনার বন্ধু, পরিবার এবং প্রিয়জনদের সাথে শেয়ার করুন ১৫ আগস্ট ২০২৬-এ।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allBnWishes.map((wish) => (
              <div key={wish.id} className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5">
                <p className="text-slate-800 leading-relaxed text-sm">{wish.text}</p>
                <div className="mt-3">
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {wish.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            বাংলায় পার্সোনালাইজড পোস্টার তৈরি করুন
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Freedom2026-এ বাংলা টেমপ্লেট ব্যবহার করে আপনার নাম, ছবি এবং শহরের নাম দিয়ে একটি পার্সোনালাইজড স্বাধীনতা দিবসের পোস্টার তৈরি করুন।
            সম্পূর্ণ বিনামূল্যে, কোনো অ্যাপ ডাউনলোড ছাড়াই।
          </p>
        </section>
      </SEOPageLayout>
    </div>
  );
}
