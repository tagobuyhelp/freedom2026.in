"use client";

import React from "react";
import { ArrowRight, User, IndianRupee, Briefcase } from "lucide-react";

interface FreedomProductsSectionProps {
  onScrollToCreator: () => void;
}

export default function FreedomProductsSection({ onScrollToCreator }: FreedomProductsSectionProps) {
  return (
    <section className="py-8 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Freedom Means More Than One Thing.
          </h2>
          <div className="w-8 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full mx-auto mt-1" />
        </div>

        {/* 3 Cards Grid (Stacked on mobile, 3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Personal Freedom */}
          <div className="bg-gradient-to-b from-orange-50/70 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-orange-100 shadow-2xs hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Personal Freedom
                </h3>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 leading-tight">
                  Create. Express. Celebrate. Tell your Independence Day story.
                </p>
                <button
                  onClick={onScrollToCreator}
                  className="mt-2 text-orange-600 font-bold text-xs inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                >
                  <span>Create Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Financial Freedom (CapitalCoach AI) */}
          <div className="bg-gradient-to-b from-emerald-50/70 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-100 shadow-2xs hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Financial Freedom
                </h3>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 leading-tight">
                  Plan. Track. Grow. Take control of your finances with AI Financial Coach.
                </p>
                <a
                  href="https://freedom2026.in"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 text-emerald-700 font-bold text-xs inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  <span>Explore CapitalCoach AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Business Freedom (TagoConnect AI) */}
          <div className="bg-gradient-to-b from-blue-50/70 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-blue-100 shadow-2xs hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Business Freedom
                </h3>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 leading-tight">
                  Connect. Manage. Grow. Manage leads from WhatsApp, Facebook & Instagram.
                </p>
                <a
                  href="https://freedom2026.in"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 text-blue-700 font-bold text-xs inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  <span>Explore TagoConnect AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
