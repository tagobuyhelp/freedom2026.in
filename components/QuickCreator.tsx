"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload, Sparkles, User, MapPin, Check, ChevronRight,
  Edit3, Download, Share2, ArrowRight, Info
} from "lucide-react";
import IndianFlag from "./IndianFlag";
import { trackClientEvent } from "@/lib/analytics";

interface QuickCreatorProps {
  onGenerate: (data: {
    name: string;
    city: string;
    photoFile: File | null;
    template: string;
    language: string;
  }) => void;
}

const TEMPLATE_CARDS = [
  { id: "classic-india", title: "Classic", tag: "Free", thumb: "/images/classic-india-style.png", alt: "Classic India Independence Day 2026 poster template" },
  { id: "modern-india",  title: "Modern",  tag: "Free", thumb: "/images/modern-india-style.png",  alt: "Modern India Independence Day 2026 poster template" },
  { id: "india-map",     title: "India",   tag: "Free", thumb: "/images/india-map-style.png",     alt: "India Map Independence Day 2026 poster template" },
  { id: "portrait",      title: "Portrait",tag: "Free", thumb: "/images/portrait-style.png",      alt: "Portrait style Independence Day 2026 poster template" },
];

const STYLE_TEMPLATES = [
  { id: "classic-india", title: "Classic India", type: "Free",        isAvailable: true,  thumb: "/images/classic-india-style.png", alt: "Classic India Independence Day 2026 poster template" },
  { id: "modern-india",  title: "Modern India",  type: "Coming Soon", isAvailable: false, thumb: "/images/modern-india-style.png",  alt: "Modern India Independence Day 2026 poster template" },
  { id: "india-map",     title: "India Map",     type: "Coming Soon", isAvailable: false, thumb: "/images/india-map-style.png",     alt: "India Map Independence Day 2026 poster template" },
  { id: "portrait",      title: "Portrait",      type: "Coming Soon", isAvailable: false, thumb: "/images/portrait-style.png",      alt: "Portrait style Independence Day 2026 poster template" },
  { id: "bengali",       title: "Bengali",       type: "Coming Soon", isAvailable: false, thumb: "/images/bengali-style.png",       alt: "Bengali Independence Day 2026 poster template" },
  { id: "hindi",         title: "Hindi",         type: "Coming Soon", isAvailable: false, thumb: "/images/hindi-style.png",         alt: "Hindi Independence Day 2026 poster template" },
  { id: "student",       title: "Student",       type: "Coming Soon", isAvailable: false, thumb: "/images/student-style.png",       alt: "Student Independence Day 2026 poster template" },
  { id: "professional",  title: "Business",      type: "Coming Soon", isAvailable: false, thumb: "/images/professional-style.png",  alt: "Professional Independence Day 2026 poster template" },
];

export default function QuickCreator({ onGenerate }: QuickCreatorProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("classic-india");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Please choose a photo smaller than 10 MB.");
        return;
      }
      if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
        setError("Please upload a JPG, PNG or WebP image.");
        return;
      }
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      setPhotoFile(file);
      setError(null);
      trackClientEvent("photo_selected");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !photoFile) {
      setError("Please fill in your name, city, and upload a photo.");
      return;
    }
    setError(null);
    trackClientEvent("poster_generation_started", { templateId: selectedTemplate });
    onGenerate({
      name: name.trim(),
      city: city.trim(),
      photoFile,
      template: selectedTemplate,
      language: "EN",
    });
  };

  return (
    <section
      id="creator"
      className="py-6 sm:py-10 bg-white relative z-20 space-y-8"
      aria-label="Independence Day 2026 poster maker — create your personalized poster"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ══════════════════════════════════════════════════════════════════════
            1. CREATE YOUR INDEPENDENCE DAY POSTER TOOL CARD
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs max-w-6xl mx-auto">
          
          {/* Section Header matching screenshot */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Create Your Independence Day Poster
            </h2>
            <div className="my-1.5">
              <IndianFlag className="w-5 h-3.5 mx-auto" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Make yours in just a few seconds.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Create your personalized Independence Day 2026 poster"
          >
            
            {/* 4 Tool Fields Row matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-start">

              {/* 1. Your Name */}
              <div className="lg:col-span-3">
                <label htmlFor="creator-name" className="block text-xs font-bold text-slate-800 mb-1.5">
                  Your Name
                </label>
                <input
                  id="creator-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 text-sm transition-all h-[52px]"
                />
              </div>

              {/* 2. Your City */}
              <div className="lg:col-span-3">
                <label htmlFor="creator-city" className="block text-xs font-bold text-slate-800 mb-1.5">
                  Your City
                </label>
                <input
                  id="creator-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  autoComplete="address-level2"
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 text-sm transition-all h-[52px]"
                />
              </div>

              {/* 3. Add Your Photo */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Add Your Photo <span className="text-orange-600">*</span>
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full h-[52px] border-2 border-dashed rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all px-3 ${
                    photoUrl
                      ? "border-emerald-500 bg-emerald-50/40"
                      : "border-slate-300 hover:border-orange-500 bg-slate-50/50 hover:bg-orange-50/30"
                  }`}
                >
                  {photoUrl ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500 shrink-0">
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <Upload className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <div className="flex flex-col text-left leading-tight overflow-hidden">
                    <span className={`text-xs font-bold truncate ${photoUrl ? "text-emerald-700" : "text-slate-800"}`}>
                      {photoUrl ? "✓ Photo Ready" : "Upload Photo"}
                    </span>
                    <span className="text-[10px] text-slate-400">JPG, PNG, WebP (Max 10MB)</span>
                  </div>
                </button>
              </div>

              {/* 4. Choose Template Cards List */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Choose Template
                </label>
                <div
                  className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1"
                  role="radiogroup"
                  aria-label="Select an Independence Day poster template"
                >
                  {TEMPLATE_CARDS.map((tmpl) => {
                    const isSelected = selectedTemplate === tmpl.id;
                    const isAvailable = tmpl.id === "classic-india";
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedTemplate(tmpl.id);
                          }
                        }}
                        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border-2 transition-all shrink-0 cursor-pointer ${
                          isSelected
                            ? "border-[#f97316] bg-orange-50/50 shadow-xs"
                            : "border-slate-200 bg-white opacity-70"
                        }`}
                      >
                        <div className="w-10 h-12 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/50">
                         <img src={tmpl.thumb} alt={tmpl.alt} className={`w-full h-full object-cover ${!isAvailable ? "grayscale" : ""}`} />
                          {!isAvailable && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[0.5px]">
                              <span className="bg-white/90 text-slate-800 text-[8px] font-bold px-1 py-0.5 rounded">Soon</span>
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-800">{tmpl.title}</span>
                      </button>
                    );
                  })}
                  <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 cursor-pointer hover:bg-slate-50">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>

            {/* Photo Guidelines / Tip Box */}
            <div className="bg-orange-50/60 border border-orange-200/70 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-700">
              <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">
                  Photo Instructions for Best Result:
                </span>
                <ul className="text-[11px] text-slate-600 leading-relaxed list-disc pl-4 space-y-0.5">
                  <li>Upload a clear portrait or selfie with face clearly visible</li>
                  <li>Use a well-lit photo (avoid dark, blurry, or low-resolution images)</li>
                  <li>Avoid sunglasses, masks, or hats covering your face</li>
                </ul>
              </div>
            </div>

            {/* Full-Width Solid Orange Button */}
            <div className="pt-2">
              {error && (
                <p className="text-xs font-bold text-red-600 mb-2 text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={!name.trim() || !city.trim() || !photoFile}
                className={`w-full py-3.5 rounded-xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all ${
                  !name.trim() || !city.trim() || !photoFile
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-[#f97316] hover:bg-[#ea580c] text-white shadow-md shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                }`}
              >
                <span>Generate My Poster</span>
                <Sparkles className="w-5 h-5" />
              </button>
            </div>

          </form>

        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            2. "CREATE. DOWNLOAD. SHARE." STEPS SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-[#f8fafc] border border-slate-200/70 rounded-3xl p-6 sm:p-8 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0f172a] tracking-tight">
              Create. Download. Share.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Step 01: Create */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f97316] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                <Edit3 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-black text-[#f97316]">01</div>
                <div className="font-extrabold text-slate-900 text-base">Create</div>
                <div className="text-xs text-slate-500 mt-0.5">Add your name, photo and city.</div>
              </div>
            </div>

            {/* Step 02: Download */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#15803d] text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                <Download className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-black text-[#15803d]">02</div>
                <div className="font-extrabold text-slate-900 text-base">Download</div>
                <div className="text-xs text-slate-500 mt-0.5">Get your personalized poster or video instantly.</div>
              </div>
            </div>

            {/* Step 03: Share */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                <Share2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-black text-blue-600">03</div>
                <div className="font-extrabold text-slate-900 text-base">Share</div>
                <div className="text-xs text-slate-500 mt-0.5">Share your Freedom Story with friends and family.</div>
              </div>
            </div>

          </div>
        </div>



        {/* ══════════════════════════════════════════════════════════════════════
            3. "CHOOSE YOUR STYLE 🇮🇳" TEMPLATE GALLERY SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-[#faf9f5] border border-amber-200/60 rounded-3xl p-6 sm:p-8 max-w-6xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">
                  Choose Your Style
                </h2>
                <IndianFlag className="w-5 h-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Pick a design and make it yours.
              </p>
            </div>
            
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-[#15803d] hover:text-emerald-800 font-bold text-xs sm:text-sm shrink-0"
            >
              <span>View All Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 8 Template Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {STYLE_TEMPLATES.map((tmpl) => {
              const isAvailable = tmpl.id === "classic-india";
              return (
                <div 
                  key={tmpl.id} 
                  onClick={() => {
                    if (isAvailable) {
                      setSelectedTemplate(tmpl.id);
                    }
                  }}
                  className="group cursor-pointer"
                >
                  <div className={`aspect-[3/4] rounded-xl overflow-hidden relative shadow-xs border border-slate-200 bg-white transition-all ${
                    isAvailable ? "group-hover:shadow-md border-orange-400" : "opacity-75 grayscale"
                  }`}>
                    <img src={tmpl.thumb} alt={tmpl.alt} className="w-full h-full object-cover" />
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center backdrop-blur-[0.5px]">
                        <span className="bg-white/90 text-slate-800 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">Soon</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <div className="font-extrabold text-slate-900 text-xs truncate">{tmpl.title}</div>
                    <div className={`text-[10px] font-bold ${isAvailable ? "text-[#15803d]" : "text-slate-400"}`}>
                      {tmpl.type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
