import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Check, ChevronRight, Image as ImageIcon, Smartphone, Share2, Users, HelpCircle, ArrowRight } from "lucide-react";
import IndianFlag from "@/components/IndianFlag";
import { TEMPLATES } from "@/data/templates";

// Filter only available templates
const AVAILABLE_TEMPLATES = TEMPLATES.filter((t) => t.isAvailable);

export const metadata: Metadata = {
  title: "15 August 2026 Poster | Create Your Independence Day Poster",
  description: "Create a personalized 15 August 2026 Independence Day poster with your photo, name and city. Choose a patriotic style and get your AI-generated HD poster.",
  alternates: { canonical: "https://freedom2026.in/15-august-poster" },
  openGraph: {
    title: "15 August 2026 Poster | Create Your Independence Day Poster",
    description: "Create a personalized 15 August 2026 Independence Day poster with your photo, name and city. Choose a patriotic style and get your AI-generated HD poster.",
    url: "https://freedom2026.in/15-august-poster",
    type: "website",
    images: [
      {
        url: "https://freedom2026.in/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "15 August 2026 Poster Maker",
      },
    ],
  },
};

export default function August15PosterPage() {
  const faqs = [
    {
      q: "What is a 15 August 2026 poster?",
      a: "It is a digital patriotic poster celebrating India's Independence Day. Our platform allows you to personalize these designs with your own details."
    },
    {
      q: "Can I create a 15 August poster with my own photo?",
      a: "Yes. You can upload a clear selfie or portrait, and our AI will integrate your facial identity into the selected poster style."
    },
    {
      q: "How do I create a personalized Independence Day poster?",
      a: "Choose a poster style from our gallery, enter your name and city, upload your photo, complete the payment, and wait for the AI to generate your personalized poster."
    },
    {
      q: "How much does a personalized poster cost?",
      a: "Personalized posters start at ₹49. Premium and Exclusive templates may have different pricing, such as ₹69 or ₹79. The exact price is shown when you select a template."
    },
    {
      q: "Can I download my HD poster?",
      a: "Yes. Once your payment is processed and the AI generation is complete, you can download your poster in high definition (HD) directly to your device."
    },
    {
      q: "Can I use the poster on WhatsApp and Instagram?",
      a: "Absolutely. The posters are optimized in a 3:4 vertical aspect ratio, making them perfect for WhatsApp status, Instagram stories, Facebook posts, and profile pictures."
    },
    {
      q: "Do I need design skills to create a poster?",
      a: "No design skills are required. The entire process is automated. You simply provide your photo and text, and our system handles the layout and generation."
    },
    {
      q: "Does AI generate the personalized poster?",
      a: "Yes. We use advanced AI models to smoothly integrate your face into the patriotic template while preserving the overall composition and HD quality."
    }
  ];

  const socialUses = [
    { name: "WhatsApp Status", icon: Smartphone },
    { name: "Facebook Posts", icon: Share2 },
    { name: "Instagram Stories", icon: ImageIcon },
    { name: "Profile Pictures", icon: Users }
  ];

  const targetAudiences = [
    "Students",
    "Young Professionals",
    "Families",
    "Teachers",
    "Business Owners",
    "Creators",
    "Community Leaders",
    "Patriotic Citizens"
  ];

  // Schema generation
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://freedom2026.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "15 August 2026 Poster",
        "item": "https://freedom2026.in/15-august-poster"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ══ HERO SECTION ══ */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-emerald-50 z-0" />
        <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-5 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-slate-200 text-slate-700 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm">
              <IndianFlag className="w-3.5 h-2.5 sm:w-4 sm:h-3" />
              <span>Independence Day Special</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-tight px-2">
              15 August 2026 Poster
            </h1>
            
            <h2 className="text-lg sm:text-2xl font-bold text-slate-700 px-4">
              Create Your Personalized Independence Day Poster
            </h2>
            
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-2">
              Celebrate India's 80th Independence Day with a personalized poster featuring your photo and patriotic design. Choose a style, add your details, and create your own HD Independence Day poster.
            </p>
            
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <Link
                href="/create"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Create My 15 August Poster
              </Link>
              <Link
                href="#styles"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-slate-700 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Explore Poster Styles
              </Link>
            </div>
            
            <p className="text-[10px] sm:text-sm text-slate-500 font-semibold pt-1 sm:pt-2 flex items-center justify-center gap-1.5 sm:gap-2">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" /> Personalized • HD Quality • Ready to Download
            </p>
          </div>

          {/* Hero Visual Showcase */}
          <div className="mt-12 sm:mt-16 flex overflow-x-auto snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 pb-4 px-4 -mx-4 sm:mx-0 sm:px-0 sm:pb-0">
            {AVAILABLE_TEMPLATES.slice(0, 6).map((tmpl, idx) => (
              <div key={`hero-${tmpl.id}`} className={`relative flex-none w-[200px] sm:w-auto rounded-2xl overflow-hidden aspect-[3/4] border-4 border-white shadow-xl snap-center transform transition-transform hover:-translate-y-1 ${idx % 2 === 1 ? 'sm:translate-y-4' : ''}`}>
                <Image
                  src={tmpl.thumbnailImage!}
                  alt={`${tmpl.title} 15 August 2026 Poster`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 33vw, 16vw"
                  priority={idx < 4}
                />
              </div>
            ))}
          </div>

          {/* Price Transparency */}
          <div className="mt-16 max-w-sm mx-auto bg-white rounded-2xl border-2 border-slate-100 shadow-sm p-4 text-center">
            <h3 className="font-bold text-slate-800 text-lg">Personalized HD Poster</h3>
            <p className="text-2xl font-black text-orange-600 my-1">Starting at ₹49</p>
            <p className="text-xs text-slate-500 font-medium">Your poster is generated after payment.</p>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] mb-12 uppercase tracking-wide">
            How to Create Your 15 August Poster
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-100 relative mt-4 sm:mt-0">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-lg sm:text-xl font-black text-slate-400">01</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 sm:mt-4 mb-2">Choose Your Style</h3>
              <p className="text-slate-600 text-xs sm:text-sm">Select from patriotic Independence Day poster designs.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-100 relative mt-4 sm:mt-0">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-lg sm:text-xl font-black text-slate-400">02</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 sm:mt-4 mb-2">Add Your Details</h3>
              <p className="text-slate-600 text-xs sm:text-sm">Upload your photo and enter your name and city.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-100 relative mt-4 sm:mt-0">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-[#f97316] text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-black shadow-md shadow-orange-500/30">03</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 sm:mt-4 mb-2">Pay & Generate</h3>
              <p className="text-slate-600 text-xs sm:text-sm">Complete the payment and let AI create your personalized HD poster.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/create"
              className="inline-flex px-8 py-3 bg-[#0f172a] text-white rounded-xl font-bold text-base hover:bg-slate-800 transition-colors"
            >
              Create My Poster
            </Link>
          </div>
        </div>
      </section>

      {/* ══ POSTER STYLE SHOWCASE ══ */}
      <section id="styles" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] mb-4">
              Choose Your 15 August Poster Style
            </h2>
            <p className="text-slate-600 text-lg">
              Create a poster that matches your personality, profession or patriotic mood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {AVAILABLE_TEMPLATES.map((tmpl) => (
              <div key={tmpl.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                  <Image
                    src={tmpl.thumbnailImage!}
                    alt={`${tmpl.title} 15 August Poster Template`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-slate-700 shadow-sm uppercase tracking-wider">
                    {tmpl.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-slate-800 mb-2">{tmpl.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 flex-1">{tmpl.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price</span>
                      <span className="text-lg font-black text-slate-800">
                        {tmpl.tier === 'premium' && tmpl.id !== 'india-map' && tmpl.id !== 'patriot-creator' ? 'Starting at ₹79' : 
                         tmpl.id === 'india-map' || tmpl.id === 'patriot-creator' ? 'Starting at ₹69' : 'Starting at ₹49'}
                      </span>
                    </div>
                    <Link
                      href="/create"
                      className="px-5 py-2.5 bg-[#f97316] text-white font-bold rounded-xl text-sm hover:bg-orange-600 transition-colors shadow-sm"
                    >
                      Create This Poster
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SEO CONTENT SECTION ══ */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-slate">
          <h2 className="text-3xl font-black text-[#0f172a] text-center mb-8">15 August 2026 Poster</h2>
          
          <div className="space-y-6 text-slate-600 text-base leading-relaxed">
            <p>
              Independence Day is a time of immense national pride. Every year on August 15th, Indians across the globe celebrate the spirit of freedom. In the digital age, sharing a <strong>15 August 2026 poster</strong> on social media has become one of the most popular ways to express patriotism and connect with friends, family, and your community.
            </p>
            
            <p>
              Finding the perfect <strong>15 August poster design</strong> can be challenging if you don't have graphic design skills. That's where our AI-powered platform comes in. We allow you to create a deeply personalized Independence Day poster that features your own photo, your name, and your city, seamlessly integrated into professional, high-quality patriotic backgrounds.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Why Create a Personalized 15 August Poster?</h3>
            
            <p>
              A standard <strong>15 August poster image</strong> downloaded from the internet is easily forgotten. A personalized poster, however, stands out. Whether you are a student, a working professional, a business owner, or a public leader, sharing an <strong>Independence Day poster 2026</strong> with your own identity shows genuine effort and personal pride. It is highly engaging for WhatsApp status updates, Facebook posts, and Instagram stories.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">How Our 15 August Poster Generator Works</h3>
            
            <p>
              Our system is designed to be simple and accessible. You do not need to download complex apps or possess editing skills. Simply browse our gallery to find the perfect <strong>15 August poster</strong> style—ranging from traditional tricolor designs (Classic India) to modern, corporate, or regional styles (like our Bengali or Hindi templates). 
            </p>
            
            <p>
              After choosing a style, you provide your name, city, and a clear photo of yourself. Once you complete the secure payment process, our advanced AI analyzes your photo and carefully generates a stunning, HD-quality personalized poster. The final <strong>15 August 2026 poster download</strong> is ready for you to save to your device and share instantly across all your social networks. 
            </p>

            <p>
              Celebrate this Independence Day uniquely. Create your personalized poster today and share your patriotic spirit with the world!
            </p>
          </div>
        </div>
      </section>

      {/* ══ SOCIAL MEDIA USE CASES ══ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#0f172a] mb-4">
            Where Can You Share Your 15 August Poster?
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-12">
            Your personalized Independence Day poster can be used for your social media profile, posts, stories and status updates.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {socialUses.map((use, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                  <use.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-800 text-sm">{use.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/create"
              className="inline-flex px-8 py-4 bg-[#f97316] text-white rounded-xl font-black text-lg hover:bg-orange-600 transition-colors shadow-md"
            >
              Create My Poster
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHO IS IT FOR? ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#0f172a] mb-12">
            Who Can Create a 15 August Poster?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {targetAudiences.map((audience, idx) => (
              <div key={idx} className="py-4 px-2 border-b-2 border-slate-100 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold text-slate-700 text-sm sm:text-base">{audience}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ SECTION ══ */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-orange-400 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-[#0f172a]">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-16 sm:py-24 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 via-transparent to-emerald-900/20 z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Create Your 15 August 2026 Poster
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            Add your photo, choose your favorite patriotic style, and create a personalized Independence Day poster made for you.
          </p>
          
          <Link
            href="/create"
            className="w-full sm:w-auto inline-flex justify-center px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:scale-105 transition-transform shadow-xl shadow-orange-500/20"
          >
            Create My 15 August Poster
          </Link>
          
          <p className="mt-6 text-slate-400 font-medium flex items-center justify-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-orange-400" /> Starting at ₹49 • Personalized HD Poster
          </p>

          {/* Internal Links Footer (SEO context) */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href="/create" className="text-slate-400 hover:text-white transition-colors">Create your personalized poster</Link>
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">15 August status</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
