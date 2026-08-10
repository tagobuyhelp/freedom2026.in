"use client";

import React from "react";
import { Play, Video, Smartphone, Music, Sparkles } from "lucide-react";

interface VideoCreatorSectionProps {
  onStartVideo: () => void;
}

export default function VideoCreatorSection({ onStartVideo }: VideoCreatorSectionProps) {
  return (
    <section id="video" className="py-16 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-emerald-100 shadow-xl shadow-emerald-900/5 relative overflow-hidden">
          
          {/* Ashoka Chakra Artwork Graphic Background */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-15 pointer-events-none">
            <svg className="w-full h-full text-blue-700 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Phone Video Mockup Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-56 sm:w-64 aspect-[9/16] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-950/10 transform hover:scale-105 transition-transform duration-300">
                
                {/* Phone Speaker Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-20" />

                {/* Screen Content */}
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-gradient-to-b from-slate-900 via-orange-950 to-emerald-950 p-4 flex flex-col justify-between text-center text-white">
                  
                  {/* Top Bar */}
                  <div className="pt-4 text-[10px] font-extrabold tracking-wider text-orange-400">
                    15 AUGUST 2026
                  </div>

                  {/* Play Button Circle */}
                  <div className="my-auto relative">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center mx-auto shadow-lg group cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-white text-white translate-x-0.5" />
                    </div>

                    {/* Animated Avatar Frame */}
                    <div className="w-20 h-20 rounded-full border-2 border-orange-500 mx-auto mt-4 overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                        alt="Video Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-2.5 text-center">
                    <div className="text-xs font-black uppercase text-amber-300">
                      HAPPY INDEPENDENCE DAY
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium">
                      2026 • freedom2026.in
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Right Column: Copy & Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <Video className="w-3.5 h-3.5" />
                <span>NEW VIDEO CREATOR</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Turn Your Photo Into a{" "}
                <span className="text-emerald-700">15-Second</span>{" "}
                Independence Video
              </h2>

              <p className="text-slate-600 text-sm sm:text-base font-normal max-w-lg mx-auto lg:mx-0">
                Create a vertical video perfect for WhatsApp Status, Instagram Stories and Reels.
              </p>

              {/* 4 Feature Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-xs font-bold text-slate-700">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                  <div className="text-emerald-600 mb-1 flex justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span>9:16 Vertical Video</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                  <div className="text-orange-500 mb-1 flex justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span>Your Photo & Name</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                  <div className="text-blue-600 mb-1 flex justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <span>Patriotic Animation</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                  <div className="text-purple-600 mb-1 flex justify-center">
                    <Music className="w-5 h-5" />
                  </div>
                  <span>Background Music</span>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button
                  onClick={onStartVideo}
                  className="green-gradient text-white px-8 py-3.5 rounded-full font-extrabold text-base inline-flex items-center gap-2.5 shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white text-white" />
                  <span>Create My Video</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
