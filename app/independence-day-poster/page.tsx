import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Download, Share2, Upload, CheckCircle2, Image as ImageIcon } from "lucide-react";
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import IndianFlag from "@/components/IndianFlag";

export const metadata: Metadata = {
  title: "15 August 2026 Poster – Create Your Independence Day Poster | Freedom2026",
  description:
    "Create a personalized 15 August 2026 poster with your photo. Explore Independence Day 2026 poster designs, choose your style, customize your poster and share it with friends.",
  alternates: { canonical: "/independence-day-poster" },
};

const TEMPLATE_DESIGNS = [
  { name: "Classic India", desc: "Traditional tricolor patriotic design", file: "classic-india-style.png", alt: "Classic India 15 August 2026 Independence Day poster" },
  { name: "Modern India", desc: "Bold minimal design for digital spaces", file: "modern-india-style.png", alt: "Modern India Independence Day poster design" },
  { name: "Professional", desc: "Clean corporate and business style", file: "professional-style.png", alt: "Professional Independence Day 2026 poster design" },
  { name: "Bengali", desc: "Independence Day in Bengali script", file: "bengali-style.png", alt: "Bengali 15 August 2026 poster design" },
  { name: "Hindi", desc: "Patriotic design in Hindi script", file: "hindi-style.png", alt: "Hindi Independence Day 2026 poster" },
  { name: "Student", desc: "Youth-focused energetic design", file: "student-style.png", alt: "Student 15 August 2026 poster making" },
  { name: "India Map", desc: "Featuring India's proud silhouette", file: "india-map-style.png", alt: "India Map Independence Day poster 2026" },
  { name: "Portrait", desc: "Photo-forward clean vertical design", file: "portrait-style.png", alt: "Portrait 15 August poster 2026 with photo" },
];

const FAQS = [
  { q: "When is Independence Day 2026?", a: "India's Independence Day will be celebrated on 15 August 2026." },
  { q: "Where can I create a 15 August 2026 poster?", a: "You can use Freedom2026 to explore Independence Day 2026 poster designs and create a personalized poster with your photo." },
  { q: "Can I create a 15 August poster with my photo?", a: "Yes. Select a supported template, upload a clear photo and create a personalized Independence Day poster." },
  { q: "Can I share my Independence Day poster on WhatsApp?", a: "Yes. Your personalized poster can be downloaded and shared on WhatsApp and other social media platforms." },
  { q: "Do I need Photoshop to create an Independence Day poster?", a: "No. Freedom2026 is designed to make poster creation simple without requiring professional graphic design software." },
  { q: "Can I create a Hindi or Bengali Independence Day poster?", a: "Yes. Freedom2026 is designed to support different languages and styles, including Hindi and Bengali Independence Day creatives." },
];

export default function IndependenceDayPosterPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Independence Day Poster", href: "/independence-day-poster" },
        ]),
        faqSchema(FAQS.map(faq => ({ question: faq.q, answer: faq.a })))
      ]} />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 pt-8 pb-16 sm:pt-12 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Copy */}
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-5">
                15 August 2026 Poster – Create Your Own Independence Day Poster 🇮🇳
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Celebrate India's Independence Day with a personalized 15 August 2026 poster featuring your own photo, name and patriotic style. Explore beautiful Independence Day 2026 poster designs and create a shareable poster for WhatsApp, Facebook, Instagram and other social platforms.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md shadow-orange-500/20 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  Create Your Poster
                </Link>
                <Link
                  href="/templates"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold px-6 py-3.5 rounded-xl transition-all active:scale-95"
                >
                  Explore Templates
                </Link>
              </div>
            </div>

            {/* Right Visuals (Poster Examples) */}
            <div className="relative h-[400px] sm:h-[500px] w-full flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-[180px] sm:w-[220px] -rotate-6 z-10 shadow-2xl rounded-xl overflow-hidden border-4 border-white">
                <img src="/images/classic-india-style.png" alt="15 August 2026 poster classic" className="w-full h-auto" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-[45%] w-[180px] sm:w-[220px] rotate-6 z-20 shadow-2xl rounded-xl overflow-hidden border-4 border-white">
                <img src="/images/portrait-style.png" alt="15 august poster 2026 with photo" className="w-full h-auto" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — CREATE YOUR POSTER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Create Your 15 August 2026 Poster
            </h2>
            <p className="text-slate-600">
              Make your Independence Day celebration personal. Choose from professionally designed poster styles, upload your photo and create a personalized 15 August poster 2026 design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { num: "1", title: "Choose a poster style", icon: <ImageIcon className="w-5 h-5" /> },
              { num: "2", title: "Upload your photo", icon: <Upload className="w-5 h-5" /> },
              { num: "3", title: "Create your poster", icon: <Sparkles className="w-5 h-5" /> },
              { num: "4", title: "Download or share", icon: <Share2 className="w-5 h-5" /> },
            ].map((step) => (
              <div key={step.num} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-slate-400 mb-1">Step {step.num}</div>
                <h3 className="font-bold text-slate-900">{step.title}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-[#138808] hover:bg-[#0f6c06] text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              Create My Poster <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — POSTER DESIGNS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Independence Day 2026 Poster Designs
            </h2>
            <p className="text-slate-600">
              Freedom2026 provides multiple patriotic poster styles. Find the perfect <Link href="/templates" className="text-orange-600 hover:underline">Independence Day poster designs</Link> for your personal or professional use.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TEMPLATE_DESIGNS.map((tmpl) => (
              <div key={tmpl.name} className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-col">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                  <img src={`/images/${tmpl.file}`} alt={tmpl.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{tmpl.name}</h3>
                <p className="text-xs text-slate-500 mt-1 flex-1">{tmpl.desc}</p>
                <Link href="/create" className="mt-3 text-xs font-bold text-orange-600 flex items-center gap-1 group">
                  Use Design <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/templates" className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-6 py-3 rounded-xl transition-all">
              Explore All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — PERSONALIZED POSTER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-5">
                15 August Poster 2026 With Your Photo
              </h2>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  A personalized poster makes Independence Day more meaningful. 
                </p>
                <p>
                  Instead of downloading the same generic image everyone else is sharing, <Link href="/create" className="text-orange-600 hover:underline">create your Independence Day poster</Link> featuring your own photo and a design that represents your personality.
                </p>
                
                <div className="pt-2">
                  <h3 className="font-bold text-slate-900 mb-3 text-base">Perfect for:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Personal Independence Day greetings",
                      "WhatsApp Status",
                      "Facebook posts",
                      "Instagram posts",
                      "Instagram Stories",
                      "Profile pictures",
                      "Family celebrations",
                      "Student celebrations",
                      "Professional greetings",
                      "Business promotions"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/create" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
                  Create a Personalized Poster
                </Link>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100 flex items-center justify-center h-full min-h-[300px]">
               <div className="relative w-full max-w-[280px] aspect-[3/4] shadow-xl rounded-2xl overflow-hidden border-[6px] border-white rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img src="/images/modern-india-style.png" alt="independence day poster 2026 personalized" className="w-full h-full object-cover" loading="lazy" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — POSTER MAKING
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-5">
                Independence Day Poster Making Online
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Creating an <Link href="/create" className="text-orange-400 hover:underline">independence day 2026 poster making</Link> experience does not need complicated graphic design software.
                </p>
                <p>
                  Freedom2026 makes poster creation simple:<br/>
                  <strong className="text-white mt-2 block">Choose → Upload → Create → Share</strong>
                </p>
                <p>
                  You do not need Photoshop or professional design skills to get a stunning result.
                </p>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                Best photo for best results
              </h3>
              <ul className="space-y-3">
                {[
                  "Clear photo",
                  "Good lighting",
                  "Face clearly visible",
                  "Preferably upper-body or half-body photo",
                  "Good image resolution"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 & 7 — SOCIAL MEDIA & BUSINESS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Social Media */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                15 August 2026 Poster for WhatsApp and Social Media
              </h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Create the perfect patriotic creative for your social feeds. Our posters are perfectly sized and formatted for:
              </p>
              <ul className="grid grid-cols-2 gap-3 mb-8">
                {["WhatsApp Status", "WhatsApp sharing", "Facebook", "Instagram", "Instagram Stories", "Social media posts", "Personal greetings"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/create" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                Create Your Poster
              </Link>
              <div className="mt-4 text-xs text-slate-500">
                Looking for short quotes? Check our <Link href="/independence-day-status" className="text-blue-600 hover:underline">Independence Day status</Link> collection.
              </div>
            </div>

            {/* Business */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                Independence Day 2026 Poster for Businesses
              </h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Freedom2026 is being developed to support personalized business creatives with your business name, logo and branding for:
              </p>
              <ul className="grid grid-cols-2 gap-3 mb-8">
                {["Independence Day greetings", "Customer appreciation", "Social media posts", "WhatsApp marketing", "Promotional campaigns", "Brand awareness"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/create?type=business" className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                Explore Business Creatives
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 — BENEFITS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-10">
            Why Create a Personalized Independence Day Poster?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Use your own photo",
              "Choose a unique design",
              "Create a patriotic social media creative",
              "Share your Independence Day message",
              "Create different visual styles",
              "Celebrate India's Independence Day in your own way"
            ].map((benefit, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-center text-sm font-medium text-slate-700">
                {benefit}
              </div>
            ))}
          </div>
          <div className="mt-8 text-sm text-slate-500">
             You can also explore our <Link href="/independence-day-images" className="text-orange-600 hover:underline">15 August images</Link> or <Link href="/independence-day-video" className="text-orange-600 hover:underline">video creator</Link>.
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9 — FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
            {FAQS.map((faq, i) => (
              <details key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5 group" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4" itemProp="name">
                  {faq.q}
                  <span className="text-orange-500 group-open:rotate-180 transition-transform shrink-0">▼</span>
                </summary>
                <div className="mt-3 text-slate-600 text-sm leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <span itemProp="text">{faq.a}</span>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-orange-50 via-white to-emerald-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
            <IndianFlag className="w-8 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Celebrate 15 August 2026 Your Way 🇮🇳
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            Your <Link href="/independence-day-wishes" className="text-orange-600 hover:underline">Independence Day greeting</Link> doesn't have to be ordinary.<br/>
            Choose your design, add your photo and create a poster that is uniquely yours.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all text-lg"
          >
            <Sparkles className="w-5 h-5" />
            Create My 15 August 2026 Poster
          </Link>
        </div>
      </section>

    </div>
  );
}
