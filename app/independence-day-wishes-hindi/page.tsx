import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import SEOPageLayout from "@/components/SEOPageLayout";
import { WISHES_HI } from "@/data/wishes";

export const metadata: Metadata = {
  title: "हिन्दी में स्वतंत्रता दिवस 2026 की शुभकामनाएं – Independence Day Wishes in Hindi",
  description:
    "15 अगस्त 2026 स्वतंत्रता दिवस पर हिन्दी में हार्दिक शुभकामनाएं। Independence Day 2026 wishes in Hindi for WhatsApp, Facebook and Instagram.",
  alternates: { canonical: "/independence-day-wishes-hindi" },
};

const RELATED = [
  { label: "Independence Day Wishes", href: "/independence-day-wishes" },
  { label: "Bengali Wishes", href: "/independence-day-wishes-bengali" },
  { label: "WhatsApp Status", href: "/independence-day-status" },
  { label: "Create Poster", href: "/create" },
  { label: "Independence Day Quotes", href: "/independence-day-quotes" },
];

const EXTRA_HI = [
  { id: "w-hi-5", text: "देश की मिट्टी में जन्म लिया, इस मिट्टी का कर्ज चुकाना है। स्वतंत्रता दिवस 2026 की हार्दिक शुभकामनाएं! 🇮🇳", category: "patriotic", language: "hi" },
  { id: "w-hi-6", text: "हर एक भारतीय का दिल तिरंगे के रंगों से रंगा है। इस स्वतंत्रता दिवस पर अपने प्रिय जनों को शुभकामनाएं दें। जय हिन्द! 🇮🇳", category: "general", language: "hi" },
  { id: "w-hi-7", text: "78 साल की आजादी के बाद भी हमारा संकल्प वही है — एक सशक्त, एकजुट और समृद्ध भारत। हैप्पी इंडिपेंडेंस डे 2026! 🇮🇳", category: "inspirational", language: "hi" },
];

export default function HindiWishesPage() {
  const allHiWishes = [...WISHES_HI, ...EXTRA_HI];

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Wishes", href: "/independence-day-wishes" },
          { name: "Hindi Wishes", href: "/independence-day-wishes-hindi" },
        ]),
        articleSchema({
          title: "हिन्दी में स्वतंत्रता दिवस 2026 की शुभकामनाएं",
          description: "15 अगस्त 2026 पर हिन्दी में हार्दिक शुभकामनाएं।",
          url: "/independence-day-wishes-hindi",
        }),
      ]} />

      <SEOPageLayout
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Wishes", href: "/independence-day-wishes" },
          { name: "Hindi Wishes", href: "/independence-day-wishes-hindi" },
        ]}
        eyebrow="15 अगस्त 2026"
        title="हिन्दी में स्वतंत्रता दिवस 2026 की शुभकामनाएं"
        subtitle="15 अगस्त 2026 स्वतंत्रता दिवस के अवसर पर अपने प्रियजनों को हिन्दी में शुभकामनाएं भेजें। WhatsApp, Facebook और Instagram पर शेयर करें।"
        ctaText="हिन्दी पोस्टर बनाएं"
        relatedLinks={RELATED}
      >
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            Independence Day 2026 Wishes in Hindi
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            इन हिन्दी शुभकामनाओं को अपने दोस्तों, परिवार और सहकर्मियों के साथ 15 अगस्त 2026 को शेयर करें।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allHiWishes.map((wish) => (
              <div key={wish.id} className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
                <p className="text-slate-800 leading-relaxed text-sm">{wish.text}</p>
                <div className="mt-3">
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {wish.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            हिन्दी में पर्सनलाइज्ड पोस्टर बनाएं
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Freedom2026 पर हिन्दी टेम्पलेट का उपयोग करके अपना नाम, फोटो और शहर जोड़कर एक खूबसूरत स्वतंत्रता दिवस पोस्टर बनाएं।
            बिल्कुल मुफ्त, कोई ऐप डाउनलोड नहीं।
          </p>
        </section>
      </SEOPageLayout>
    </>
  );
}
