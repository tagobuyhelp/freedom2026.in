"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface TemplateGridProps {
  onSelectTemplate: (templateId: string) => void;
}

const TEMPLATES_LIST = [
  {
    id: "classic-india",
    title: "Classic India",
    type: "",
    isPremium: false,
    gradient: "from-orange-500 via-amber-100 to-emerald-600",
  },
  {
    id: "modern-india",
    title: "Modern India",
    type: "",
    isPremium: false,
    gradient: "from-slate-900 via-slate-800 to-orange-950",
  },
  {
    id: "business",
    title: "Business",
    type: "Premium",
    isPremium: true,
    gradient: "from-slate-900 via-amber-950 to-slate-950",
  },
  {
    id: "india-map",
    title: "India Map",
    type: "",
    isPremium: false,
    gradient: "from-emerald-700 via-white to-orange-500",
  },
  {
    id: "bengali",
    title: "Bengali",
    type: "",
    isPremium: false,
    gradient: "from-orange-600 via-white to-green-700",
    bengaliText: "স্বাধীনতা দিবস 2026",
  },
  {
    id: "hindi",
    title: "Hindi",
    type: "",
    isPremium: false,
    gradient: "from-amber-600 via-orange-500 to-emerald-600",
    hindiText: "स्वतंत्रता दिवस 2026",
  },
  {
    id: "portrait",
    title: "Portrait",
    type: "",
    isPremium: false,
    gradient: "from-amber-500 via-orange-500 to-rose-600",
  },
  {
    id: "student",
    title: "Student",
    type: "",
    isPremium: false,
    gradient: "from-cyan-600 via-blue-600 to-indigo-700",
  },
];

export default function TemplateGrid({ onSelectTemplate }: TemplateGridProps) {
  return (
    <section id="templates" className="py-8 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Templates
            </h2>
          </div>

          <a
            href="#creator"
            className="text-emerald-700 font-bold text-xs sm:text-sm hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile horizontal scroll / Desktop 8-column Grid */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 overflow-x-auto pb-4 sm:pb-0 scrollbar-none snap-x">
          {TEMPLATES_LIST.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className="min-w-[130px] sm:min-w-0 snap-start bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-2 cursor-pointer shadow-2xs hover:shadow-xl hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0"
            >
              
              {/* Card Preview Box */}
              <div className={`aspect-[4/5] rounded-lg sm:rounded-xl bg-gradient-to-b ${tmpl.gradient} p-2 flex flex-col justify-between text-center relative overflow-hidden text-white shadow-inner`}>
                
                {tmpl.isPremium && (
                  <div className="absolute top-1 right-1 bg-amber-400 text-slate-950 text-[8px] font-black px-1 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                    <Sparkles className="w-2 h-2 fill-slate-950" />
                    <span>PREMIUM</span>
                  </div>
                )}

                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider opacity-90">
                  {tmpl.bengaliText || tmpl.hindiText || "HAPPY 15 AUG"}
                </div>

                {/* Avatar circle */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white mx-auto overflow-hidden bg-slate-200 my-auto shadow-xs">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80')" }} />
                </div>

                <div className="bg-black/30 backdrop-blur-xs rounded py-0.5 px-1 text-[7px] font-bold">
                  TARIK AZIZ
                </div>

              </div>

              {/* Title & Tag */}
              <div className="pt-2 text-center">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {tmpl.title}
                </div>
                <div className={`text-[10px] font-semibold mt-0.5 ${tmpl.isPremium ? "text-amber-600" : "text-emerald-600"}`}>
                  {tmpl.type}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
