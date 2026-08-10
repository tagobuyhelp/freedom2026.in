"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, User, Camera, LayoutTemplate, Download, Info, AlertCircle } from "lucide-react";
import IndianFlag from "@/components/IndianFlag";

const TEMPLATES_PREVIEW = [
  { id: "classic-india", title: "Classic India", image: "/images/classic-india-style.png", selected: true },
  { id: "modern-india", title: "Modern India (Coming Soon)", image: "/images/modern-india-style.png" },
  { id: "bengali", title: "Bengali (Coming Soon)", image: "/images/bengali-style.png" },
  { id: "hindi", title: "Hindi (Coming Soon)", image: "/images/hindi-style.png" },
  { id: "india-map", title: "India Map (Coming Soon)", image: "/images/india-map-style.png" },
  { id: "business", title: "Business (Coming Soon)", image: "/images/professional-style.png" },
];

const STEPS = [
  { num: 1, icon: <User className="w-5 h-5" />, title: "Your Details", desc: "Enter your name and city" },
  { num: 2, icon: <Camera className="w-5 h-5" />, title: "Your Photo", desc: "Upload a clear photo of yourself" },
  { num: 3, icon: <LayoutTemplate className="w-5 h-5" />, title: "Choose Template", desc: "Pick from 50+ designs" },
  { num: 4, icon: <Download className="w-5 h-5" />, title: "Download & Share", desc: "Save in HD and share" },
];

export default function CreatePage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      setError("Please choose a photo smaller than 10 MB.");
      return;
    }
    
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      setError("Please upload a JPG, PNG or WebP image.");
      return;
    }

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleGenerate = async () => {
    if (!name || !city || !photo) {
      setError("Please fill in your name, city, and upload a photo.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResultUrl(null);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("city", city.trim());
    formData.append("templateId", "classic-india");
    formData.append("photo", photo);

    try {
      const res = await fetch("/api/poster/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Something went wrong while creating your poster. Please try again.");
      }

      setResultUrl(data.posterUrl);
    } catch (err: any) {
      setError("Something went wrong while creating your poster. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <IndianFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
            <span>FREE POSTER CREATOR</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
            Create Your Independence Day 2026 Poster
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Add your name, photo and city, choose a template, and download your personalised Independence Day poster in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
          {STEPS.map((step, idx) => (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm border-2 ${
                  resultUrl ? (step.num === 4 ? "bg-orange-600 border-orange-600 text-white" : "bg-white border-slate-300 text-slate-400") :
                  (step.num === 1 ? "bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-500/30" : "bg-white border-slate-300 text-slate-400")
                }`}>
                  {step.num}
                </div>
                <span className={`text-xs font-bold mt-1.5 whitespace-nowrap ${
                  (resultUrl && step.num === 4) || (!resultUrl && step.num === 1) ? "text-orange-600" : "text-slate-400"
                }`}>
                  {step.title}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="w-16 sm:w-24 h-0.5 bg-slate-200 mx-2 mt-[-1rem] shrink-0" />
              )}
            </div>
          ))}
        </div>

        {resultUrl ? (
          /* Success State */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-2 flex justify-center items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-600" />
              Your Poster is Ready!
            </h2>
            <p className="text-slate-500 mb-6 text-sm">Download your HD poster below and share it with friends.</p>
            
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 mx-auto max-w-sm mb-6">
              <img src={resultUrl} alt="Your Independence Day Poster" className="w-full h-auto" />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href={resultUrl}
                download="freedom2026-poster.png"
                className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors shadow-md shadow-orange-600/20"
              >
                <Download className="w-5 h-5" />
                Download HD Poster
              </a>
              <button
                onClick={() => {
                  setResultUrl(null);
                  setPhoto(null);
                  setPhotoPreview(null);
                  setName("");
                  setCity("");
                }}
                className="bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
              >
                Create Another
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Details Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                Enter Your Details
              </h2>

              {/* Name */}
              <div>
                <label htmlFor="poster-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Name <span className="text-orange-600">*</span>
                </label>
                <input
                  id="poster-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  maxLength={30}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 text-sm transition-all"
                  disabled={isGenerating}
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="poster-city" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your City <span className="text-orange-600">*</span>
                </label>
                <input
                  id="poster-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  maxLength={30}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 text-sm transition-all"
                  disabled={isGenerating}
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Upload Your Photo <span className="text-orange-600">*</span></label>
                <p className="text-xs text-slate-500 mb-3">Upload a clear photo of yourself for the best personalized poster.</p>
                
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl overflow-hidden hover:border-orange-400 transition-colors bg-slate-50 flex flex-col items-center justify-center p-6" style={{ minHeight: '160px' }}>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handlePhotoUpload}
                    disabled={isGenerating}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  {photoPreview ? (
                    <div className="relative z-20 w-full flex flex-col items-center">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-sm font-bold text-emerald-600 flex items-center gap-1 mb-1">
                        ✓ Your photo is ready
                      </div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px] mb-3">
                        {photo?.name}
                      </div>
                      <button 
                        type="button" 
                        onClick={(e) => { e.preventDefault(); setPhoto(null); setPhotoPreview(null); setError(null); }}
                        className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-4 py-2 rounded-full hover:bg-orange-100 transition-colors"
                        disabled={isGenerating}
                      >
                        Remove / Change
                      </button>
                    </div>
                  ) : (
                    <div className="text-center relative z-0">
                      <Camera className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <div className="text-sm font-bold text-slate-700 mb-1">Click to upload photo</div>
                      <div className="text-xs text-slate-500">JPG, PNG, WebP</div>
                      <div className="text-[10px] text-slate-400 mt-1.5 uppercase tracking-wider font-bold">Up to 10 MB</div>
                    </div>
                  )}
                </div>
                
                {/* Guidelines */}
                {!photoPreview && (
                  <div className="mt-4 bg-orange-50/50 border border-orange-100 rounded-xl p-4 sm:p-5">
                    <h4 className="text-xs font-bold text-slate-800 mb-2.5 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-orange-600" />
                      For the best result
                    </h4>
                    <ul className="text-[11px] sm:text-xs text-slate-600 space-y-2 pl-4 list-disc marker:text-orange-400">
                      <li><span className="font-semibold text-slate-800">Best: Clear portrait or selfie</span></li>
                      <li>Use a clear photo where your face is clearly visible</li>
                      <li>Front-facing or slightly angled photos work best</li>
                      <li>Upload a photo with only one person</li>
                      <li>Use a well-lit photo</li>
                      <li>Avoid sunglasses, masks or anything covering your face</li>
                      <li>Avoid blurry or extremely low-resolution photos</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Template Selection */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-slate-900 flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-orange-600" />
                  Choose Your Template
                </h2>
              </div>

              {/* Template grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-grow">
                {TEMPLATES_PREVIEW.map((tmpl, i) => (
                  <div key={tmpl.id} className={`border-2 rounded-xl overflow-hidden transition-all ${
                    i === 0 ? "border-orange-600 shadow-md shadow-orange-500/15" : "border-slate-100 opacity-60 grayscale"
                  }`}>
                    <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
                      <img 
                        src={tmpl.image} 
                        alt={tmpl.title} 
                        className="w-full h-full object-cover" 
                      />
                      {i !== 0 && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-1 rounded shadow-xs">Soon</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-white py-1.5 text-center">
                      <div className="text-[10px] font-bold text-slate-800 truncate px-1">{tmpl.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 text-sm font-medium p-3 rounded-lg flex items-start gap-2 border border-red-200 mt-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !name || !city || !photo}
                className={`w-full py-4 rounded-xl font-extrabold text-base flex flex-col items-center justify-center gap-1 mt-4 transition-all ${
                  isGenerating 
                    ? "bg-orange-500 text-white cursor-wait opacity-80" 
                    : !name || !city || !photo 
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                      : "bg-orange-600 text-white shadow-lg shadow-orange-600/25 hover:bg-orange-700 hover:-translate-y-0.5"
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating your personalized poster...</span>
                    </div>
                    <span className="text-[11px] text-orange-200 font-medium">This may take a few seconds.</span>
                  </>
                ) : error ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Try Again</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Generate My Poster</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
