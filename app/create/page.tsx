"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Camera, Check, AlertCircle, ChevronRight } from "lucide-react";
import IndianFlag from "@/components/IndianFlag";
import PosterGeneratorModal from "@/components/PosterGeneratorModal";
import Script from "next/script";

const TEMPLATES_PREVIEW = [
  { id: "classic-india",  title: "Classic India",   image: "/images/classic-india-style.png",  gender: "Male",   isAvailable: true },
  { id: "modern-india",   title: "Modern India",    image: "/images/modern-india-style.png",   gender: "Female", isAvailable: true },
  { id: "bengali",        title: "Bengali",         image: "/images/bengali-style.png",                          isAvailable: false },
  { id: "hindi",          title: "Hindi",           image: "/images/hindi-style.png",                            isAvailable: false },
  { id: "india-map",      title: "India Map",       image: "/images/india-map-style.png",                        isAvailable: false },
  { id: "business",       title: "Business",        image: "/images/professional-style.png",                     isAvailable: false },
];

import PreGenerationModal from "@/components/PreGenerationModal";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("classic-india");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showCommitment, setShowCommitment] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [posterData, setPosterData] = useState<{
    name: string; city: string; posterUrl: string | null;
    posterId: string | null; shareActionToken: string | null;
    template: string; isLoading: boolean;
  }>({ name: "", city: "", posterUrl: null, posterId: null, shareActionToken: null, template: "classic-india", isLoading: false });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError("Photo must be smaller than 10 MB."); return; }
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) { setError("Please upload a JPG, PNG or WebP."); return; }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handlePreGenerate = async () => {
    if (!name || !city || !photo) { setError("Please fill in your name, city, and upload a photo."); return; }
    setError(null);
    setShowCommitment(true);
    try {
      const { trackClientEvent } = await import("@/lib/analytics");
      trackClientEvent("pre_generation_offer_viewed", { templateId: selectedTemplate });
    } catch (e) { console.error(e); }
  };

  const startPaymentFlow = async () => {
    if (isGenerating) return;
    setIsGenerating(true); 
    setError(null);
    
    try {
      const { trackClientEvent, getSessionId } = await import("@/lib/analytics");
      trackClientEvent("pre_generation_confirmed", { templateId: selectedTemplate });

      // 1. Initialize PosterSession (no photo uploaded yet)
      const initRes = await fetch("/api/poster/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), city: city.trim(), templateId: selectedTemplate }),
      });
      const initData = await initRes.json();
      if (!initRes.ok || !initData.success) throw new Error(initData.error || "Failed to initialize session.");
      const posterId = initData.posterId;

      // 2. Create Razorpay Order bound to this posterId
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-session-id": getSessionId() },
        body: JSON.stringify({ posterId }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) throw new Error(orderData.error || "Failed to create order");

      // Hide the PreGenerationModal while Razorpay is open
      setShowCommitment(false);
      setIsGenerating(false);

      // 3. Open Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Freedom2026",
        description: "Independence Day Poster Generation",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Razorpay Success Callback
          await executeGeneration(posterId, response);
        },
        prefill: {
          name: name.trim(),
        },
        theme: { color: "#f97316" },
        modal: {
          ondismiss: function () {
            setError("Payment cancelled. You can try again.");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setError("Payment failed. Please try again.");
      });
      rzp.open();

    } catch (err: any) { 
      setError(err.message || "Something went wrong."); 
      setIsGenerating(false);
    }
  };

  const executeGeneration = async (posterId: string, paymentDetails: any) => {
    setIsGenerating(true);
    setPosterData({ name: name.trim(), city: city.trim(), posterUrl: null, posterId, shareActionToken: null, template: selectedTemplate, isLoading: true });
    setModalOpen(true);
    
    try {
      const { trackClientEvent, getSessionId } = await import("@/lib/analytics");
      trackClientEvent("poster_generation_started", { templateId: selectedTemplate });
      
      const formData = new FormData();
      formData.append("posterId", posterId);
      formData.append("razorpay_payment_id", paymentDetails.razorpay_payment_id);
      formData.append("razorpay_order_id", paymentDetails.razorpay_order_id);
      formData.append("razorpay_signature", paymentDetails.razorpay_signature);
      formData.append("name", name.trim()); 
      formData.append("city", city.trim());
      formData.append("templateId", selectedTemplate); 
      formData.append("photo", photo!);
      
      const res = await fetch("/api/poster/generate", { method: "POST", headers: { "x-session-id": getSessionId() }, body: formData });
      let data: any = {};
      try { data = await res.json(); } catch (e) { console.error(e); }
      if (!res.ok || !data.success) throw new Error(data.error || data.details || "Generation failed after payment.");
      setPosterData((prev) => ({ ...prev, posterUrl: data.posterUrl, shareActionToken: data.shareActionToken, isLoading: false }));
    } catch (err: any) { 
      setError(err.message || "Something went wrong during generation. Your payment was captured, please contact support or retry."); 
      setModalOpen(false); 
    } finally { 
      setIsGenerating(false); 
    }
  };

  const isReady = !!name.trim() && !!city.trim() && !!photo;
  const selectedTmpl = TEMPLATES_PREVIEW.find(t => t.id === selectedTemplate);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="min-h-screen bg-slate-50 pb-28 sm:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-4 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-2 sm:mb-3">
            <IndianFlag className="w-4 h-3" /><span>POSTER CREATOR</span>
          </div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-1 sm:mb-2 leading-tight">
            Create Your Independence Day 2026 Poster
          </h1>
          <p className="hidden sm:block text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Add your name, photo and city, choose a template, and download your personalised poster in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

          {/* Template Picker - order 1 on mobile */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-6 shadow-xs">
              <h2 className="text-sm sm:text-base font-black text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-black">1</span>
                Choose Your Template
              </h2>
              <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 pt-3 pr-2">
                {TEMPLATES_PREVIEW.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <div key={tmpl.id} className="relative shrink-0 w-[110px] sm:w-[140px]">
                      {tmpl.gender && tmpl.isAvailable && (
                        <div className={`absolute -top-2 -right-2 shadow-sm px-1.5 py-0.5 rounded text-[7px] uppercase font-bold text-white tracking-wider z-20 ${tmpl.gender === "Male" ? "bg-blue-600" : "bg-pink-600"}`}>
                          {tmpl.gender}
                        </div>
                      )}
                      <div onClick={() => tmpl.isAvailable && setSelectedTemplate(tmpl.id)}
                        className={`border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${
                          isSelected ? "border-orange-500 shadow-md shadow-orange-500/20" :
                          tmpl.isAvailable ? "border-slate-200 hover:border-orange-300" :
                          "border-slate-100 opacity-50 grayscale cursor-not-allowed"}`}>
                        <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
                          <img src={tmpl.image} alt={tmpl.title} className="w-full h-full object-cover" />
                          {!tmpl.isAvailable && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <span className="bg-white/90 text-slate-800 text-[9px] font-bold px-2 py-0.5 rounded">Soon</span>
                            </div>
                          )}
                          {isSelected && (
                            <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center z-10">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="bg-white py-1.5 text-center border-t border-slate-100">
                          <div className="text-[10px] font-bold text-slate-800 truncate px-1">{tmpl.title}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {selectedTmpl && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                  <Check className="w-3.5 h-3.5 text-orange-500" />
                  <span>Selected: <span className="font-bold text-slate-900">{selectedTmpl.title}</span></span>
                  {selectedTmpl.gender && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${selectedTmpl.gender === "Male" ? "bg-blue-600" : "bg-pink-600"}`}>
                      {selectedTmpl.gender}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Details Form - order 2 on mobile */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-6 shadow-xs space-y-4">
              <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-black">2</span>
                Your Details
              </h2>
              {/* Name + City side by side on mobile */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-4">
                <div>
                  <label htmlFor="poster-name" className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-orange-600">*</span>
                  </label>
                  <input id="poster-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Full name" maxLength={30} disabled={isGenerating}
                    className="w-full px-3 py-2.5 sm:px-4 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 text-sm transition-all" />
                </div>
                <div>
                  <label htmlFor="poster-city" className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Your City <span className="text-orange-600">*</span>
                  </label>
                  <input id="poster-city" type="text" value={city} onChange={(e) => setCity(e.target.value)}
                    placeholder="Your city" maxLength={30} disabled={isGenerating}
                    className="w-full px-3 py-2.5 sm:px-4 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 text-sm transition-all" />
                </div>
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                  Your Photo <span className="text-orange-600">*</span>
                </label>
                <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handlePhotoUpload} disabled={isGenerating} className="hidden" />
                {photoPreview ? (
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <img src={photoPreview} alt="Preview" className="w-14 h-14 rounded-full object-cover border-2 border-emerald-300 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Photo ready
                      </div>
                      <div className="text-xs text-slate-500 truncate">{photo?.name}</div>
                    </div>
                    <button type="button" disabled={isGenerating}
                      onClick={() => { setPhoto(null); setPhotoPreview(null); setError(null); fileInputRef.current?.click(); }}
                      className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg shrink-0">
                      Change
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isGenerating}
                    className="w-full border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-orange-400 hover:bg-orange-50/30 transition-all flex items-center gap-3 px-4 py-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center shrink-0">
                      <Camera className="w-5 h-5 text-slate-500" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-slate-700">Tap to upload your photo</div>
                      <div className="text-xs text-slate-400">JPG, PNG, WebP · Max 10 MB</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                  </button>
                )}
              </div>

              {!photoPreview && (
                <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-3 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800">Tips: </span>
                  Clear selfie · Face visible · No sunglasses · Well-lit · One person only
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Floating bottom CTA - mobile only */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg z-40 sm:hidden">
        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-medium p-2 rounded-lg flex items-start gap-2 border border-red-200 mb-2">
            <AlertCircle className="w-4 h-4 shrink-0" /><p>{error}</p>
          </div>
        )}
        <button onClick={handlePreGenerate} disabled={isGenerating || !isReady}
          className={`w-full py-4 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 transition-all ${
            isGenerating ? "bg-orange-500 text-white opacity-80" :
            !isReady ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
            "bg-orange-600 text-white shadow-lg shadow-orange-600/30 active:scale-[0.98]"}`}>
          {isGenerating ? (
            <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg><span>Creating poster...</span></>
          ) : (
            <><Sparkles className="w-5 h-5" /><span>Generate My Freedom Story</span></>
          )}
        </button>
        {!isReady && !isGenerating && (
          <p className="text-center text-[10px] text-slate-400 mt-1.5">
            {!name ? "Enter name · " : ""}{!city ? "Enter city · " : ""}{!photo ? "Upload photo" : ""}
          </p>
        )}
      </div>

      {/* Desktop generate button */}
      <div className="hidden sm:block max-w-xl mx-auto px-6 pb-10 mt-6">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm font-medium p-3 rounded-lg flex items-start gap-2 border border-red-200 mb-4">
            <AlertCircle className="w-5 h-5 shrink-0" /><p>{error}</p>
          </div>
        )}
        <button onClick={handlePreGenerate} disabled={isGenerating || !isReady}
          className={`w-full py-4 rounded-xl font-extrabold text-base flex flex-col items-center justify-center gap-1 transition-all ${
            isGenerating ? "bg-orange-500 text-white cursor-wait opacity-80" :
            !isReady ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
            "bg-orange-600 text-white shadow-lg shadow-orange-600/25 hover:bg-orange-700 hover:-translate-y-0.5"}`}>
          {isGenerating ? (
            <><div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg><span>Creating your personalized poster...</span>
            </div><span className="text-[11px] text-orange-200 font-medium">This may take a few seconds.</span></>
          ) : (
            <div className="flex items-center gap-2"><Sparkles className="w-5 h-5" /><span>Generate My Freedom Story Poster</span></div>
          )}
        </button>
      </div>

      <PreGenerationModal isOpen={showCommitment} onClose={() => setShowCommitment(false)} onConfirm={startPaymentFlow} isGenerating={isGenerating} />
      <PosterGeneratorModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={posterData} />
    </div>
    </>
  );
}
