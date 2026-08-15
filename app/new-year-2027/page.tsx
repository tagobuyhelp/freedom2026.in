import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, Camera, Smartphone, Users, Briefcase, Smile, Heart, Image as ImageIcon, Stars, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "New Year 2027 AI Photo – Create Your Personalized New Year Photo",
  description: "Create a personalized New Year 2027 AI photo with your own picture. Explore New Year photo ideas for WhatsApp, Instagram, Facebook and social media.",
  alternates: { canonical: "https://freedom2026.in/new-year-2027" },
  openGraph: {
    title: "New Year 2027 AI Photo – Create Your Personalized New Year Photo",
    description: "Create a personalized New Year 2027 AI photo with your own picture. Explore New Year photo ideas for WhatsApp, Instagram, Facebook and social media.",
    url: "https://freedom2026.in/new-year-2027",
    type: "website",
  },
};

export default function NewYear2027Page() {
  const faqs = [
    {
      q: "What is a New Year 2027 AI photo?",
      a: "A New Year 2027 AI photo is a visually enhanced digital image created to celebrate the upcoming year. It integrates your personal photo with festive designs and themes."
    },
    {
      q: "Can I create a New Year photo using my own picture?",
      a: "Yes, you can use your own photograph to create a personalized New Year image that reflects your identity and festive spirit."
    },
    {
      q: "Where can I use my New Year 2027 photo?",
      a: "You can use your personalized New Year photo on various platforms, including WhatsApp, Instagram, Facebook, and other social media networks, or send it directly to loved ones."
    },
    {
      q: "Can I use the photo as my WhatsApp profile picture?",
      a: "Absolutely. A personalized New Year photo is an excellent way to update your WhatsApp profile picture and status to celebrate the season with your contacts."
    },
    {
      q: "Can I share the photo on Instagram and Facebook?",
      a: "Yes, these photos are perfect for sharing on Instagram stories, posts, and Facebook timelines to engage with your friends and followers."
    },
    {
      q: "How do I create a personalized New Year photo?",
      a: "You simply need to upload a clear photo of yourself, and the dedicated New Year photo platform will process it into a customized festive design."
    },
    {
      q: "Where can I create my New Year 2027 AI photo?",
      a: "You can create your personalized New Year 2027 photo by visiting newyearphoto2027.com, our dedicated platform for the upcoming year's celebrations."
    },
    {
      q: "Can I create a New Year photo for my family or friends?",
      a: "Yes, you can upload photos of your family or friends to create thoughtful, personalized New Year greetings for them as well."
    }
  ];

  const ideas = [
    { title: "New Year Profile Photo", icon: Camera, desc: "Update your social profiles with a festive, personalized touch to start the year fresh." },
    { title: "New Year WhatsApp Photo", icon: Smartphone, desc: "Share your excitement for 2027 directly with your contacts on WhatsApp." },
    { title: "New Year Instagram Photo", icon: ImageIcon, desc: "Post a beautifully integrated New Year image to your Instagram grid or stories." },
    { title: "New Year Facebook Photo", icon: Heart, desc: "Connect with your wider circle of friends on Facebook with a unique greeting." },
    { title: "Family New Year Photo", icon: Users, desc: "Create a memorable digital keepsake featuring your family members." },
    { title: "Personalized Greeting", icon: Smile, desc: "Send direct, customized wishes that stand out from generic forwarded messages." },
    { title: "Friends & Group Photo", icon: Sparkles, desc: "Celebrate your friendships by creating unique 2027 group memories." },
    { title: "Professional Photo", icon: Briefcase, desc: "Maintain a professional yet festive presence for your business contacts." },
  ];

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
        "name": "New Year 2027",
        "item": "https://freedom2026.in/new-year-2027"
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
        {/* Festive CSS Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 z-0" />
        <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-10 z-0 mix-blend-overlay" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px] z-0 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/20 text-white/90 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Looking ahead to 2027</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-tight px-2 drop-shadow-lg">
              New Year 2027 AI Photo
            </h1>
            
            <h2 className="text-xl sm:text-3xl font-bold text-fuchsia-200 px-4 drop-shadow-md">
              Create Your Personalized New Year Photo
            </h2>
            
            <p className="text-sm sm:text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed px-2 font-medium">
              Celebrate the arrival of 2027 with a personalized AI photo made with your own picture. Create a unique New Year design to share with friends, family and your social media audience.
            </p>
            
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <a
                href="https://newyearphoto2027.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                Create My New Year 2027 Photo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#ideas"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                Explore Photo Ideas
              </a>
            </div>

            {/* Typography Hero Visual Element */}
            <div className="mt-16 sm:mt-24 pb-8 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent z-10" />
              <div className="flex items-center justify-center gap-4 text-white/10 select-none overflow-hidden w-full relative z-0">
                <Stars className="w-12 h-12 sm:w-24 sm:h-24 animate-pulse hidden sm:block" />
                <span className="text-8xl sm:text-[12rem] font-black tracking-tighter leading-none">
                  2027
                </span>
                <Stars className="w-12 h-12 sm:w-24 sm:h-24 animate-pulse hidden sm:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BREADCRUMBS ══ */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800">New Year 2027</span>
        </div>
      </div>

      {/* ══ TRANSITION SECTION ══ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-800">
            From Independence Day 2026<br className="hidden sm:block"/> to New Year 2027
          </h2>
          <div className="w-16 h-1 bg-fuchsia-500 mx-auto rounded-full" />
          <div className="prose prose-slate prose-lg mx-auto text-slate-600 leading-relaxed">
            <p>
              Independence Day is a time to celebrate our country, our stories, and the people around us. As 2026 moves forward, the next celebration is just around the corner — <strong>New Year 2027</strong>.
            </p>
            <p>
              If you enjoyed creating and sharing your personalized <Link href="/15-august-poster" className="text-fuchsia-600 font-bold hover:underline">15 August 2026 poster</Link> or exploring our <Link href="/15-august-images" className="text-fuchsia-600 font-bold hover:underline">Independence Day images</Link>, you can now get ready for the new year with a personalized New Year 2027 photo. 
            </p>
            <p>
              Transitioning from patriotic celebrations to the excitement of a new year gives everyone a chance to look forward to new beginnings, fresh goals, and beautiful new memories.
            </p>
          </div>
        </div>
      </section>

      {/* ══ PHOTO IDEAS SECTION ══ */}
      <section id="ideas" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 mb-4">
              New Year 2027 Photo Ideas
            </h2>
            <p className="text-slate-600 text-lg">
              Explore different ways to use your personalized New Year 2027 images across platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ideas.map((idea, idx) => {
              const Icon = idea.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-xl bg-fuchsia-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-fuchsia-100 transition-all">
                    <Icon className="w-6 h-6 text-fuchsia-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{idea.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {idea.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 mb-4">
              Create Your New Year 2027 Photo in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10" />
            
            {[
              { step: "01", title: "Upload Your Photo", desc: "Choose the photo you want to personalize from your gallery." },
              { step: "02", title: "Create Your Design", desc: "Use the New Year 2027 AI photo experience to apply festive designs." },
              { step: "03", title: "Share Your Photo", desc: "Use your personalized design on WhatsApp, Instagram, Facebook or other social platforms." }
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-24 h-24 mx-auto bg-white border-4 border-fuchsia-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-3xl font-black text-fuchsia-600">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
                <p className="text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CREATE SECTION ══ */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-800 mb-8 text-center">
            Why Create a Personalized New Year 2027 Photo?
          </h2>
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="prose prose-slate prose-lg max-w-none text-slate-600">
              <p>
                Sending standard text messages or forwarded generic images has become common during festive seasons. A personalized New Year 2027 photo cuts through the noise and adds a genuine, meaningful touch to your greetings. 
              </p>
              <p>
                Personal photos feel more meaningful to the receiver because they show effort and individuality. Whether you are updating your WhatsApp status, changing your profile picture, or creating a dedicated Instagram post, a customized image naturally captures attention.
              </p>
              <p>
                It is also highly versatile. You can easily share these photos with friends and family in private chats, or post them publicly to wish your entire network at once. For businesses and professionals, maintaining a festive yet recognizable presence helps in building stronger relationships. 
              </p>
              <p>
                As we approach 2027, making your New Year greetings more personal ensures you start the year with authenticity and style.
              </p>
            </div>
            
            <div className="mt-10 text-center">
              <a
                href="https://newyearphoto2027.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-fuchsia-600 hover:text-fuchsia-700 transition-colors"
              >
                Start creating your photo now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ SECTION ══ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-800 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-indigo-950 to-purple-950 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-10 z-0 mix-blend-overlay" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Get Ready for New Year 2027 🎆
          </h2>
          <p className="text-lg text-indigo-200">
            Create a personalized New Year 2027 photo with your own picture and start the new year with something made especially for you.
          </p>
          <div className="pt-4">
            <a
              href="https://newyearphoto2027.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-amber-950 rounded-2xl font-black text-lg shadow-xl hover:bg-amber-300 hover:-translate-y-1 transition-all"
            >
              Create My New Year 2027 Photo
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
