"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload, Sparkles, Check, ChevronRight, ChevronLeft,
  Edit3, Download, Share2, ArrowRight, Camera, User, MapPin, AlertCircle
} from "lucide-react";
import IndianFlag from "./IndianFlag";
import { trackClientEvent } from "@/lib/analytics";
import { getTemplatePricing } from "@/lib/pricing";

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
  { id: "classic-india", title: "Classic", gender: "Male",   isAvailable: true, thumb: "/images/classic-india-style.png", alt: "Classic India Independence Day 2026 poster template" },
  { id: "modern-india",  title: "Modern",  gender: "Female", isAvailable: true, thumb: "/images/modern-india-style.png",  alt: "Modern India Independence Day 2026 poster template" },
  { id: "business",      title: "Business",gender: "Male",   isAvailable: true, thumb: "/images/professional-style.png",  alt: "Business Independence Day 2026 poster template" },
  { id: "public-leader", title: "Public Leader",gender: "All",isAvailable: true, thumb: "/images/Public-Leader-Style.png", alt: "Public Leader Independence Day 2026 poster template" },
  { id: "national-vision", title: "National Vision", gender: "All", isAvailable: true, thumb: "/images/National-Vision-Style.png", alt: "National Vision Independence Day 2026 poster template" },
  { id: "india-map",     title: "India Map",                 isAvailable: true, thumb: "/images/india-map-style.png",     alt: "India Map Independence Day 2026 poster template" },
];

const STYLE_TEMPLATES = [
  { id: "classic-india", title: "Classic India", gender: "Male",   isAvailable: true, thumb: "/images/classic-india-style.png", alt: "Classic India Independence Day 2026 poster template" },
  { id: "modern-india",  title: "Modern India",  gender: "Female", isAvailable: true, thumb: "/images/modern-india-style.png",  alt: "Modern India Independence Day 2026 poster template" },
  { id: "business",      title: "Business",      gender: "Male",   isAvailable: true, thumb: "/images/professional-style.png",  alt: "Professional Independence Day 2026 poster template" },
  { id: "public-leader", title: "Public Leader", gender: "All",    isAvailable: true, thumb: "/images/Public-Leader-Style.png", alt: "Public Leader Independence Day 2026 poster template" },
  { id: "national-vision", title: "National Vision", gender: "All", isAvailable: true, thumb: "/images/National-Vision-Style.png", alt: "National Vision Independence Day 2026 poster template" },
  { id: "india-map",     title: "India Map",                       isAvailable: true, thumb: "/images/india-map-style.png",     alt: "India Map Independence Day 2026 poster template" },
  { id: "portrait",      title: "Portrait",      gender: "Female", isAvailable: true, thumb: "/images/portrait-style.png",      alt: "Portrait style Independence Day 2026 poster template" },
  { id: "bengali",       title: "Bengali",       gender: "Female", isAvailable: true, thumb: "/images/bengali-style.png",       alt: "Bengali Independence Day 2026 poster template" },
  { id: "hindi",         title: "Hindi",         gender: "Male",   isAvailable: true, thumb: "/images/hindi-style.png",         alt: "Hindi Independence Day 2026 poster template" },
  { id: "student",       title: "Student",       gender: "Male",   isAvailable: true, thumb: "/images/student-style.png",       alt: "Student Independence Day 2026 poster template" },
];

export default function QuickCreator({ onGenerate }: QuickCreatorProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("classic-india");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tmplScrollRef = useRef<HTMLDivElement>(null);

  const scrollTmplLeft = () => tmplScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollTmplRight = () => tmplScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { setError("Please choose a photo smaller than 10 MB."); return; }
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) { setError("Please upload a JPG, PNG or WebP image."); return; }
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    setPhotoFile(file);
    setError(null);
    trackClientEvent("photo_selected");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !photoFile) {
      setError("Please fill in your name, city, and upload a photo.");
      return;
    }
    setError(null);
    trackClientEvent("poster_generation_started", { templateId: selectedTemplate });
    onGenerate({ name: name.trim(), city: city.trim(), photoFile, template: selectedTemplate, language: "EN" });
  };

  const isReady = !!name.trim() && !!city.trim() && !!photoFile;
  const completedSteps = [!!name.trim(), !!city.trim(), !!photoFile].filter(Boolean).length;

  return (
    <section
      id="creator"
      className="py-8 sm:py-14 bg-gradient-to-b from-white to-slate-50/60 relative z-20 space-y-10"
      aria-label="Independence Day 2026 poster maker — create your personalized poster"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ══ MAIN CREATOR CARD ══ */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden max-w-6xl mx-auto">

          {/* Top gradient accent bar */}
          <div className="h-1 sm:h-1.5 bg-gradient-to-r from-[#f97316] via-white to-[#15803d]" />

          <div className="p-4 sm:p-10">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-8">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-[10px] sm:text-[11px] font-extrabold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3 tracking-wide uppercase">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>AI Poster Maker</span>
              </div>
              <h2 className="text-lg sm:text-3xl font-black text-[#0f172a] tracking-tight leading-tight">
                Create Your Independence Day Poster
              </h2>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <IndianFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
                <p className="text-[10px] sm:text-sm text-slate-500 font-medium">
                  Fill in the details below to get started
                </p>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-1.5 sm:gap-2">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black transition-all ${
                      completedSteps >= step
                        ? "bg-[#f97316] text-white shadow-sm shadow-orange-400/40"
                        : "bg-slate-100 text-slate-400"
                    }`}>
                      {completedSteps >= step ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : step}
                    </div>
                    {step < 3 && <div className={`w-5 sm:w-8 h-0.5 rounded-full transition-all ${completedSteps > step ? "bg-[#f97316]" : "bg-slate-200"}`} />}
                  </div>
                ))}
                <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-[11px] font-semibold text-slate-400">
                  {completedSteps}/3
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">

              {/* Fields Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-start">

                {/* Name */}
                <div className="lg:col-span-3">
                  <label htmlFor="creator-name" className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      id="creator-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      autoComplete="name"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 rounded-xl text-slate-900 font-medium placeholder-slate-300 focus:outline-none focus:ring-0 text-sm transition-all h-[44px] sm:h-[52px] ${
                        name.trim() ? "border-orange-400 bg-orange-50/20" : "border-slate-200 focus:border-orange-400"
                      }`}
                    />
                    {name.trim() && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* City */}
                <div className="lg:col-span-3">
                  <label htmlFor="creator-city" className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Your City
                  </label>
                  <div className="relative">
                    <input
                      id="creator-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New Delhi"
                      autoComplete="address-level2"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 rounded-xl text-slate-900 font-medium placeholder-slate-300 focus:outline-none focus:ring-0 text-sm transition-all h-[44px] sm:h-[52px] ${
                        city.trim() ? "border-orange-400 bg-orange-50/20" : "border-slate-200 focus:border-orange-400"
                      }`}
                    />
                    {city.trim() && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="lg:col-span-3">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                    <Camera className="w-3.5 h-3.5 text-slate-400" />
                    Your Photo <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`w-full h-[44px] sm:h-[52px] border-2 rounded-xl flex items-center gap-3 cursor-pointer transition-all px-3 select-none ${
                      photoUrl
                        ? "border-emerald-400 bg-emerald-50/40"
                        : dragOver
                        ? "border-orange-400 bg-orange-50/30 scale-[1.01]"
                        : "border-dashed border-slate-300 hover:border-orange-400 bg-slate-50 hover:bg-orange-50/20"
                    }`}
                  >
                    {photoUrl ? (
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 shrink-0 shadow-sm">
                        <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <Upload className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                    <div className="flex flex-col text-left leading-tight overflow-hidden min-w-0">
                      <span className={`text-xs font-bold truncate ${photoUrl ? "text-emerald-700" : "text-slate-700"}`}>
                        {photoUrl ? "✓ Photo Ready" : "Upload or drag photo"}
                      </span>
                      <span className="text-[10px] text-slate-400">JPG, PNG, WebP · Max 10MB</span>
                    </div>
                  </div>
                </div>

                {/* Template Selector */}
                <div className="lg:col-span-3">
                  <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    Choose Template
                    <div className="flex gap-1">
                      <button type="button" onClick={scrollTmplLeft} className="p-1 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 transition-colors">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={scrollTmplRight} className="p-1 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 transition-colors">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </label>
                  <div ref={tmplScrollRef} className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 pt-3 pr-2 scroll-smooth">
                    {TEMPLATE_CARDS.map((tmpl) => {
                      const isSelected = selectedTemplate === tmpl.id;
                      return (
                        <button
                          key={tmpl.id}
                          type="button"
                          onClick={() => setSelectedTemplate(tmpl.id)}
                          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border-2 transition-all shrink-0 cursor-pointer relative ${
                            isSelected
                              ? "border-[#f97316] bg-orange-50/70 shadow-sm shadow-orange-200"
                              : "border-slate-200 bg-white hover:border-orange-200"
                          }`}
                        >
                          {tmpl.gender && (
                            <div className={`absolute -top-1.5 -right-1.5 shadow-sm px-1 py-0.5 rounded text-[7px] uppercase font-bold text-white tracking-wider z-20 ${tmpl.gender === "Male" ? "bg-blue-600" : "bg-pink-500"}`}>
                              {tmpl.gender}
                            </div>
                          )}
                          <div className={`w-14 h-[4.5rem] rounded-lg overflow-hidden relative border transition-all ${isSelected ? "border-orange-300" : "border-slate-200"}`}>
                            <img src={tmpl.thumb} alt={tmpl.alt} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-orange-500/10 flex items-end justify-center pb-1">
                                <Check className="w-4 h-4 text-orange-600 drop-shadow-sm" />
                              </div>
                            )}
                          </div>
                          <span className={`text-[10px] font-bold ${isSelected ? "text-orange-600" : "text-slate-600"}`}>{tmpl.title}</span>
                        </button>
                      );
                    })}
                    <Link
                      href="/create"
                      className="flex flex-col items-center gap-1 p-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:border-orange-300 hover:bg-orange-50/30 transition-all shrink-0 w-[62px]"
                    >
                      <div className="w-14 h-[4.5rem] rounded-lg bg-slate-100 flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">More</span>
                    </Link>
                  </div>
                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-xs font-bold text-red-600">{error}</p>
                </div>
              )}

              {/* Photo tip */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/70 rounded-xl p-2.5 sm:p-3.5 flex items-center sm:items-start gap-2.5 sm:gap-3 text-xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-[11px] sm:text-xs">📸 Clear selfie · Face visible · No sunglasses · Well-lit</span>
                  <ul className="text-[11px] text-slate-600 leading-relaxed space-y-0.5 hidden sm:block mt-0.5">
                    <li>• Clear portrait or selfie with face clearly visible</li>
                    <li>• Well-lit photo — avoid dark, blurry or low-res images</li>
                    <li>• No sunglasses, masks or hats covering your face</li>
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={!isReady}
                className={`w-full py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-200 ${
                  isReady
                    ? "bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{isReady ? "Generate My Poster →" : "Fill all details to continue"}</span>
              </button>

            </form>
          </div>
        </div>

        {/* ══ HOW IT WORKS STEPS ══ */}
        <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-6xl mx-auto">
          <div className="text-center mb-3 sm:mb-6">
            <h2 className="text-base sm:text-2xl font-black text-[#0f172a] tracking-tight">
              How It Works
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 sm:mt-1">Ready in under 60 seconds</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-4">
            {[
              { icon: Edit3,   num: "01", color: "bg-[#f97316]", shadow: "shadow-orange-400/25", title: "Create",   desc: "Add your name, photo and city." },
              { icon: Download,num: "02", color: "bg-[#15803d]", shadow: "shadow-emerald-600/20", title: "Download", desc: "Get your personalized poster instantly." },
              { icon: Share2,  num: "03", color: "bg-blue-600",  shadow: "shadow-blue-600/20",   title: "Share",    desc: "Share your Freedom Story everywhere." },
            ].map(({ icon: Icon, num, color, shadow, title, desc }) => (
              <div key={num} className="bg-slate-50/60 border border-slate-100 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-4 text-center sm:text-left hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all">
                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${color} text-white flex items-center justify-center shrink-0 shadow-md ${shadow}`}>
                  <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className={`text-[8px] sm:text-[10px] font-black ${color.replace("bg-", "text-")} hidden sm:block`}>{num}</div>
                  <div className="font-extrabold text-slate-900 text-[11px] sm:text-sm leading-tight">{title}</div>
                  <div className="text-[9px] sm:text-xs text-slate-500 mt-0.5 hidden sm:block">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ CHOOSE YOUR STYLE ══ */}
        <div className="bg-gradient-to-br from-[#fffbf0] to-amber-50/40 border border-amber-200/60 rounded-3xl p-6 sm:p-8 max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">Choose Your Style</h2>
                <IndianFlag className="w-5 h-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {STYLE_TEMPLATES.filter(t => t.isAvailable).length} templates available — pick a design and make it yours.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/templates" className="inline-flex items-center gap-1.5 text-[#15803d] hover:text-emerald-800 font-bold text-xs sm:text-sm">
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Wrap Template Gallery (Multiple Rows) */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 pb-2 pt-3">
            {STYLE_TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => {
                    if (tmpl.isAvailable) {
                      setSelectedTemplate(tmpl.id);
                      document.getElementById("creator")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="group cursor-pointer relative shrink-0 w-[110px] sm:w-[130px] lg:w-[148px]"
                >
                  {tmpl.gender && (
                    <div className={`absolute -top-2 -right-2 shadow-sm px-1.5 py-0.5 rounded text-[8px] uppercase font-bold text-white tracking-wider z-20 ${tmpl.gender === "Male" ? "bg-blue-600" : "bg-pink-500"}`}>
                      {tmpl.gender}
                    </div>
                  )}
                  <div className={`aspect-[3/4] rounded-xl overflow-hidden relative border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-orange-500 shadow-md shadow-orange-500/25 ring-2 ring-orange-500/20 scale-[1.02]"
                      : "border-slate-200 group-hover:border-orange-300 group-hover:shadow-md group-hover:-translate-y-0.5"
                  }`}>
                    <img src={tmpl.thumb} alt={tmpl.alt} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center z-10 shadow-sm">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 bg-orange-500/5" />
                    )}
                  </div>
                  <div className="text-center mt-2 px-1">
                    <div className={`font-extrabold text-xs truncate ${isSelected ? "text-orange-600" : "text-slate-800"}`}>{tmpl.title}</div>
                    <div className={`text-[10px] font-semibold mt-0.5 h-[15px] ${isSelected ? "text-orange-500" : "text-transparent"}`}>
                      {isSelected ? "✓ Selected" : ""}
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
