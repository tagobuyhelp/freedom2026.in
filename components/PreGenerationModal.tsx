"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, Download, ArrowRight, Image as ImageIcon, Palette, Flame } from "lucide-react";
import IndianFlag from "./IndianFlag";
import { getTemplatePricing } from "@/lib/pricing";
import Link from "next/link";

interface PreGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isGenerating: boolean;
  templateId?: string;
  templateName?: string;
}

export default function PreGenerationModal({ isOpen, onClose, onConfirm, isGenerating, templateId = "classic-india", templateName }: PreGenerationModalProps) {
  const { basePrice, sellingPrice, savings } = getTemplatePricing(templateId);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [socialProofNames, setSocialProofNames] = useState<string[]>([]);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (socialProofNames.length === 0) return;
    const interval = setInterval(() => {
      setCycleCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [socialProofNames]);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/social-proof')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.names)) {
          setSocialProofNames(data.names);
        }
      })
      .catch(err => console.error('Error fetching social proof:', err));
  }, [isOpen]);

  const truncateName = (name: string, maxLen = 16) => {
    if (name.length > maxLen) {
      return name.slice(0, maxLen - 1) + "…";
    }
    return name;
  };

  useEffect(() => {
    const STORAGE_KEY = "offer_countdown_end_time";
    let targetTimeStr = localStorage.getItem(STORAGE_KEY);
    let targetTime = targetTimeStr ? parseInt(targetTimeStr, 10) : 0;

    const now = Date.now();
    // If no target exists or if the target is in the past, initialize a fresh 2-hour countdown
    if (!targetTime || targetTime < now) {
      targetTime = now + 2 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const calculateTimeLeft = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        return "00h : 00m : 00s";
      }
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      return `${h.toString().padStart(2, "0")}h : ${m.toString().padStart(2, "0")}m : ${s.toString().padStart(2, "0")}s`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
      {/* Bottom sheet on mobile, centered card on desktop */}
      <div className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl relative animate-in slide-in-from-bottom-4 sm:fade-in sm:zoom-in-95 duration-300 max-h-[92vh] flex flex-col">

        {/* Drag handle – mobile only */}
        <div className="flex justify-center pt-3 pb-0 sm:hidden shrink-0">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Close – desktop only */}
        <button
          onClick={onClose}
          disabled={isGenerating}
          className="hidden sm:flex absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full transition-colors cursor-pointer z-10 bg-slate-100 hover:bg-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-8 pt-4 sm:pt-8 pb-2 space-y-4">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-100 to-emerald-100" />
                <IndianFlag className="w-5 h-3.5 relative z-10 drop-shadow-sm" />
              </div>
            </div>
            <h3 className="text-[20px] sm:text-2xl font-black text-[#0f172a] leading-tight">
              Your Poster Is Ready to Create!
            </h3>
            <div className="flex h-0.5 w-16 mx-auto rounded-full overflow-hidden">
              <div className="w-1/2 bg-orange-500" />
              <div className="w-1/2 bg-emerald-600" />
            </div>
            <p className="text-slate-500 text-[13px] sm:text-sm font-medium leading-snug max-w-[280px] mx-auto">
              Create your personalized Independence Day poster with AI using your photo, name and city.
            </p>
          </div>

          {/* Style chip */}
          {templateName && (
            <div className="flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-50 border border-orange-100 rounded-2xl">
              <Palette className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="text-[12px] text-slate-500 font-semibold">Your style:</span>
              <span className="text-[12px] font-black text-orange-600">{templateName}</span>
            </div>
          )}

          {/* Price Card */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50/60 border border-orange-100 rounded-2xl p-4 flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0">
              <div className="absolute inset-0 bg-amber-200/40 rounded-full blur-lg" />
              <img src="/images/lightning-podium.png" alt="Unlock" className="w-full h-full object-contain relative z-10" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[30px] font-black text-orange-500 leading-none">&#8377;{sellingPrice}</span>
                <span className="text-base text-slate-400 line-through decoration-slate-400 decoration-1">&#8377;{basePrice}</span>
                <span className="text-[11px] font-black text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">Save &#8377;{savings}</span>
              </div>

              {timeLeft && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wide text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full animate-pulse">
                    Limited-Time Offer
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-orange-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ends in {timeLeft}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5 mt-2.5 text-[11px] font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                No watermark &middot; High-res &middot; Instant download
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: "image", label: "Personalized\nfor You" },
              { icon: "shield", label: "Secure\nPayment" },
              { icon: "download", label: "Instant\nDownload" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 sm:gap-1.5 bg-slate-50 border border-slate-100 rounded-xl py-2 sm:py-3 px-1">
                <div className="bg-emerald-50 p-1 sm:p-1.5 rounded-full text-emerald-600 border border-emerald-100">
                  {icon === "image" && <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                  {icon === "shield" && <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                  {icon === "download" && <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 text-center leading-tight whitespace-pre-line">{label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Sticky CTA – always visible at bottom */}
        <div className="shrink-0 px-5 sm:px-8 py-4 sm:pb-6 border-t border-slate-100 bg-white rounded-b-3xl flex flex-col gap-3">
          {/* Social Proof Section */}
          {socialProofNames.length > 0 && (
            <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-100 rounded-lg px-2.5 py-1.5 flex items-center justify-center gap-1.5 overflow-hidden">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 leading-none shrink-0">People are creating</span>
              
              <style>{`
                @keyframes fadeSlideUp {
                  0% { opacity: 0; transform: translateY(6px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-slide-up {
                  animation: fadeSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
              `}</style>
              
              {(() => {
                const currentNameIndex = cycleCount % socialProofNames.length;
                const name = socialProofNames[currentNameIndex];
                if (!name) return null;
                const colors = ["bg-orange-500", "bg-emerald-500", "bg-blue-500", "bg-purple-500"];
                const colorClass = colors[currentNameIndex % colors.length];
                
                return (
                  <div key={cycleCount} className="flex items-center gap-1 animate-fade-slide-up shrink-0 min-w-0">
                    <span className="text-slate-300 text-[10px] font-bold mr-0.5">·</span>
                    <div className={`w-4 h-4 rounded-full ${colorClass} flex items-center justify-center shrink-0`}>
                      <span className="text-[8px] font-black text-white leading-none">{truncateName(name, 1)}</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-800 truncate max-w-[70px] sm:max-w-[100px]">{truncateName(name, 12)}</span>
                  </div>
                );
              })()}
            </div>
          )}


          <div className="flex gap-3 items-stretch">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="h-14 w-14 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold flex items-center justify-center transition-all active:scale-[0.96] shrink-0"
              aria-label="Go back"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={onConfirm}
              disabled={isGenerating}
              className="flex-1 h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl font-black text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {isGenerating ? (
                "Processing..."
              ) : (
                <>Pay &#8377;{sellingPrice} &amp; Generate</>
              )}
              {!isGenerating && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
