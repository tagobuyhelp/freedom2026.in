"use client";

import React from "react";
import { Edit3, Download, Share2 } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-8 sm:py-12 bg-slate-50/60 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <div className="w-8 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full mx-auto mt-1" />
        </div>

        {/* 3 Step Cards Grid (Horizontal scrollable flex on mobile, 3 columns on desktop) */}
        <div className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          
          {/* Step 1 */}
          <div className="min-w-[85%] sm:min-w-0 snap-center bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
              <Edit3 className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                01 Step
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-slate-900">Create</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Add your name, photo and city.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="min-w-[85%] sm:min-w-0 snap-center bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
              <Download className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                02 Step
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-slate-900">Download</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Get your personalized poster or video.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="min-w-[85%] sm:min-w-0 snap-center bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
              <Share2 className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                03 Step
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-slate-900">Share</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Share your Freedom Story with friends.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
