"use client";

import React from "react";
import { Heart, MessageSquare, Smartphone, Video, Image as ImageIcon, Type, ArrowRight, Check } from "lucide-react";
import IndianFlag from "@/components/IndianFlag";

export default function SeoHubSection() {
  return (
    <section id="wishes" className="py-16 bg-slate-50/60 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Everything for Independence Day 2026 (SEO Hub) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6">
                Everything for Independence Day 2026
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                {/* Wishes */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors text-center">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Wishes</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Best wishes for friends & family</div>
                </div>

                {/* Quotes */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors text-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Quotes</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Inspiring patriotic quotes</div>
                </div>

                {/* WhatsApp Status */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">WhatsApp Status</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Short status ideas for everyone</div>
                </div>

                {/* Video Ideas */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors text-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Video Ideas</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">15-sec video ideas for social media</div>
                </div>

                {/* Images */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors text-center">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Images</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Beautiful images & posters</div>
                </div>

                {/* Captions */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors text-center">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2">
                    <Type className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Captions</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Instagram & Facebook captions</div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Bengali Content Highlight */}
          <div className="lg:col-span-4 bg-emerald-50/40 rounded-3xl p-6 border border-emerald-200/80 shadow-xs flex flex-col justify-between font-bengali">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center justify-center gap-1.5 font-bengali">
                <span>বাংলায় স্বাধীনতা দিবসের শুভেচ্ছা</span>
                <IndianFlag className="w-5 h-3.5" />
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white border border-emerald-200 p-2.5 rounded-xl text-center text-xs font-bold text-emerald-950 flex items-center justify-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-bengali">বাংলা শুভেচ্ছা</span>
                </div>

                <div className="bg-white border border-emerald-200 p-2.5 rounded-xl text-center text-xs font-bold text-emerald-950 flex items-center justify-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-bengali">বাংলা কবিতা</span>
                </div>

                <div className="bg-white border border-emerald-200 p-2.5 rounded-xl text-center text-xs font-bold text-emerald-950 flex items-center justify-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-bengali">বাংলা স্ট্যাটাস</span>
                </div>

                <div className="bg-white border border-emerald-200 p-2.5 rounded-xl text-center text-xs font-bold text-emerald-950 flex items-center justify-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-bengali">বাংলা ক্যাপশন</span>
                </div>
              </div>
            </div>

            <button className="w-full green-gradient text-white py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 cursor-pointer">
              <span className="font-bengali">বাংলা কনটেন্ট দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
