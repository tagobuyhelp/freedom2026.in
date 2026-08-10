"use client";

import React from "react";
import { Store, Phone, Globe } from "lucide-react";
import IndianFlag from "./IndianFlag";

interface BusinessCreatorSectionProps {
  onStartBusiness: () => void;
}

export default function BusinessCreatorSection({ onStartBusiness }: BusinessCreatorSectionProps) {
  return (
    <section id="business" className="py-8 sm:py-16 bg-slate-50/80 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-orange-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Storefront Icon & Text Block */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-start gap-4">
              
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-xs">
                <Store className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>

              <div className="space-y-1.5 text-left">
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight flex items-center flex-wrap gap-2">
                  <span>Celebrate Independence Day With Your Brand</span>
                  <IndianFlag className="w-6 h-4 sm:w-7 sm:h-5 inline-block" />
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                  Create professional Independence Day posters with your business name, logo and contact details.
                </p>
              </div>

            </div>

            {/* Stacked Mobile Buttons on Right */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              <button
                onClick={onStartBusiness}
                className="w-full bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-center shadow-xs transition-all cursor-pointer"
              >
                Create Business Poster
              </button>

              <a
                href="#pricing"
                className="w-full bg-white border border-amber-800/40 text-amber-900 hover:bg-amber-50/50 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all"
              >
                View Business Packages
              </a>
            </div>

          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div id="pricing" className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          
          {/* Starter */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">Starter</span>
              <div className="text-lg font-black text-slate-900 mt-0.5">₹199</div>
              <span className="text-[10px] text-slate-500">3 Creatives</span>
            </div>
            <button
              onClick={onStartBusiness}
              className="saffron-gradient text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Business */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border-2 border-emerald-500 shadow-xs flex items-center justify-between relative">
            <span className="absolute -top-2 right-4 bg-emerald-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
              Popular
            </span>
            <div>
              <span className="text-xs font-bold text-emerald-800">Business</span>
              <div className="text-lg font-black text-slate-900 mt-0.5">₹499</div>
              <span className="text-[10px] text-emerald-600">5 Creatives + 1 Video</span>
            </div>
            <button
              onClick={onStartBusiness}
              className="green-gradient text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Premium */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">Premium</span>
              <div className="text-lg font-black text-slate-900 mt-0.5">₹999</div>
              <span className="text-[10px] text-slate-500">10 Creatives + 3 Videos</span>
            </div>
            <button
              onClick={onStartBusiness}
              className="saffron-gradient text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              Get Started
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
