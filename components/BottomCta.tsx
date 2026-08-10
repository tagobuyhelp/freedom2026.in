"use client";

import React from "react";
import { Sparkles, Play } from "lucide-react";
import IndianFlag from "./IndianFlag";

interface BottomCtaProps {
  onScrollToCreator: () => void;
  onScrollToVideo: () => void;
}

export default function BottomCta({ onScrollToCreator, onScrollToVideo }: BottomCtaProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500/10 via-white to-emerald-500/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <span>Your Story. Your Freedom.</span>
          <IndianFlag className="w-6 h-4 sm:w-8 sm:h-5" />
        </h2>

        <p className="text-slate-600 text-base max-w-lg mx-auto font-medium">
          Create your personalized Independence Day 2026 poster today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onScrollToCreator}
            className="w-full sm:w-auto saffron-gradient text-white px-8 py-3.5 rounded-full font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Create My Poster</span>
          </button>

          <button
            onClick={onScrollToVideo}
            className="w-full sm:w-auto bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50/60 px-8 py-3.5 rounded-full font-extrabold text-base flex items-center justify-center gap-2 shadow-xs hover:scale-105 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-emerald-600 text-emerald-600" />
            <span>Create My Video</span>
          </button>
        </div>

      </div>
    </section>
  );
}
