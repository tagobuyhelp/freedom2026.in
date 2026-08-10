"use client";

import React from "react";
import { Edit3, Play, Sun, UserCheck, Share2, Smartphone } from "lucide-react";
import IndianFlag from "./IndianFlag";
import FlyingBirds from "./FlyingBirds";

interface HeroSectionProps {
  onScrollToCreator?: () => void;
  onScrollToVideo?: () => void;
}

import { trackClientEvent } from "@/lib/analytics";

export default function HeroSection({ onScrollToCreator, onScrollToVideo }: HeroSectionProps) {
  const handleCreatorClick = () => {
    trackClientEvent("poster_creator_started");
    if (onScrollToCreator) {
      onScrollToCreator();
    } else {
      const el = document.getElementById("creator");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/create";
      }
    }
  };

  const handleVideoClick = () => {
    if (onScrollToVideo) {
      onScrollToVideo();
    } else {
      const el = document.getElementById("video");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/independence-day-video";
      }
    }
  };

  return (
    <section id="home" className="relative pt-4 pb-6 sm:pt-12 sm:pb-20 overflow-hidden bg-white">
      
      {/* Background Tricolour Brush Splash Texture */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-bl from-orange-200/35 via-amber-100/15 to-emerald-200/35 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center">
          
          {/* ── Left Column ── */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-5 text-center lg:text-left z-10">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-[11px] sm:text-xs font-extrabold">
              <IndianFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
              <span className="text-[#f97316]">15 AUGUST</span>
              <span className="text-[#15803d]">2026</span>
            </div>

            {/* Main Headline — single H1 for SEO, two visual lines preserved */}
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="space-y-0.5 sm:space-y-1">
                <span className="block text-3xl sm:text-5xl lg:text-[62px] font-black tracking-tight text-[#0f172a] leading-[1.1]">
                  Create Your
                </span>
                <span className="block text-3xl sm:text-5xl lg:text-[62px] font-black tracking-tight leading-[1.1]">
                  <span className="text-[#f97316]">Freedom</span>{" "}
                  <span className="text-[#15803d]">Story</span>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-600 text-xs sm:text-base lg:text-lg max-w-xs sm:max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Add your name, photo and city.<br className="hidden sm:inline" />
              Create a personalized <strong>15 August 2026 poster</strong> or video in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 pt-1 sm:pt-2">
              
              {/* Left Orange Button */}
              <button
                onClick={handleCreatorClick}
                className="w-full sm:w-auto bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl font-extrabold text-xs sm:text-base flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Create My Poster</span>
                <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </button>

              {/* Right Green Outline Button */}
              <button
                onClick={handleVideoClick}
                className="w-full sm:w-auto bg-white border-2 border-[#15803d] text-[#15803d] hover:bg-emerald-50/50 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl font-extrabold text-xs sm:text-base flex items-center justify-center gap-2 shadow-2xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Create My Video</span>
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15803d] fill-[#15803d]/10 stroke-[2.5]" />
              </button>

            </div>

            {/* Trust Badges Strip */}
            <div className="pt-3 sm:pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-7 text-[10px] sm:text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f97316] stroke-[2.2]" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 stroke-[2.2]" />
                <span>No Signup</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 stroke-[2.2]" />
                <span>Share Instantly</span>
              </div>
              <div className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 stroke-[2.2]" />
                <span>Mobile Friendly</span>
              </div>
            </div>

          </div>

          {/* ── Right Column: 3D Poster Stack matching Reference Image ── */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center pt-2 lg:pt-0">
            
            {/* Flying Birds Art */}
            <FlyingBirds />

            {/* Cards Stack Container */}
            <div className="relative w-full max-w-xs sm:max-w-xl flex items-center justify-center py-2 sm:py-6 min-h-[270px] sm:min-h-[420px]">
              
              {/* Left Side Card (Proud To Be Indian) */}
              <div className="absolute left-1 sm:left-4 top-4 sm:top-10 w-28 sm:w-48 bg-white p-1 rounded-2xl shadow-xl border border-slate-200/90 animate-float-left hover:z-30 hover:scale-105 transition-all duration-300">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative shadow-inner">
                  <img
                    src="/images/modern-india-style.png"
                    alt="Modern India Independence Day 2026 poster template"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Right Side Card (Waving Flag Sunset) */}
              <div className="absolute right-1 sm:right-4 top-6 sm:top-14 w-28 sm:w-48 bg-white p-1 rounded-2xl shadow-xl border border-slate-200/90 animate-float-right hover:z-30 hover:scale-105 transition-all duration-300">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative shadow-inner">
                  <img
                    src="/images/india-map-style.png"
                    alt="India Map Independence Day 2026 poster template"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Center Prominent Main Poster Card (TARIK AZIZ) */}
              <div className="relative w-48 sm:w-80 bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 z-20 animate-float-center hover:scale-[1.03] transition-transform duration-300">
                <div className="aspect-[4/5.2] rounded-xl sm:rounded-2xl overflow-hidden relative shadow-inner">
                  <img
                    src="/images/classic-india-style.png"
                    alt="Personalized Independence Day 2026 poster with India Gate and tricolor design"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>

            </div>

            {/* Pagination Carousel Dots */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1 sm:mt-2 z-20">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f97316] shadow-2xs" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
