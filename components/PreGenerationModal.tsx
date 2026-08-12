"use client";

import React from "react";
import { X, CheckCircle2, ShieldCheck, Download, ArrowLeft, ArrowRight, Image as ImageIcon } from "lucide-react";
import IndianFlag from "./IndianFlag";

interface PreGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isGenerating: boolean;
}

export default function PreGenerationModal({ isOpen, onClose, onConfirm, isGenerating }: PreGenerationModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Container */}
      <div className="bg-[#fdfbf7] rounded-3xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl relative border border-[#f0ebe1] animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isGenerating}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4 sm:space-y-6">
          {/* Top Icon Badge */}
          <div className="relative mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            {/* Decorative background circle with subtle gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-100/50 to-emerald-100/50" />
            <IndianFlag className="w-6 h-4 sm:w-8 sm:h-6 relative z-10 drop-shadow-sm" />
            
            {/* SVG decorative lines imitating the design */}
            <svg className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 text-orange-400 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2C13.5 5 13.5 9 12 12" transform="rotate(-45 12 12)" />
            </svg>
            <svg className="absolute top-1 -right-3 sm:-right-4 w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2C13.5 5 13.5 9 12 12" transform="rotate(45 12 12)" />
            </svg>
          </div>

          {/* Header */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-[19px] sm:text-3xl font-black text-[#0f172a] leading-tight flex items-center justify-center gap-1.5 sm:gap-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8l10-4" />
                <path d="M2 14l12-6" />
                <path d="M6 20l12-4" />
              </svg>
              Your Poster Is Ready to Create
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 8l-10-4" />
                <path d="M22 14l-12-6" />
                <path d="M18 20l-12-4" />
              </svg>
            </h3>
            
            {/* Underline decorative bar */}
            <div className="flex h-1 w-24 sm:w-32 mx-auto rounded-full overflow-hidden">
              <div className="w-1/2 bg-orange-500" />
              <div className="w-1/2 bg-emerald-600" />
            </div>

            <p className="text-[#475569] font-medium max-w-sm mx-auto text-[13px] sm:text-[15px] px-2 sm:px-0 leading-snug">
              AI will now create your personalized Independence Day poster using your photo, name and city.
            </p>
          </div>

          {/* Offer Card */}
          <div className="bg-white border border-[#fbe5d6] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-row items-center gap-3 sm:gap-6 shadow-[0_2px_10px_-4px_rgba(251,229,214,0.6)] relative overflow-hidden">
            {/* 3D Image */}
            <div className="shrink-0 relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-transparent rounded-full blur-xl opacity-80 scale-150" />
               <img src="/images/lightning-podium.png" alt="Premium Unlock" className="w-[120%] h-[120%] object-contain relative z-10" />
            </div>
            
            {/* Text details */}
            <div className="text-left space-y-1 sm:space-y-1.5 flex-1 relative z-10">
              <p className="text-[11px] sm:text-sm font-bold text-[#0f172a] mb-0.5 sm:mb-2 leading-none">
                After generation, unlock your HD poster:
              </p>
              <h4 className="text-[17px] sm:text-2xl font-black text-[#0f172a] flex items-center justify-start gap-1.5 sm:gap-2 leading-none">
                <span className="text-orange-500">₹10</span>
                <span className="text-[#94a3b8] text-sm sm:text-xl font-medium">—</span>
                Instant Download
              </h4>
              <div className="flex items-center justify-start gap-1.5 text-[10px] sm:text-sm font-semibold text-[#16a34a] pt-0.5 sm:pt-1 leading-none">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>No watermarks, high-res</span>
              </div>
            </div>
          </div>

          {/* Features Row */}
          <div className="flex flex-row items-center justify-between bg-[#f8fafc] border border-slate-100 rounded-xl sm:rounded-2xl py-2 px-2 sm:py-3 sm:px-4 gap-1 sm:gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 flex-1 justify-center">
              <div className="bg-emerald-50 p-1.5 sm:p-2 rounded-full text-emerald-600 shrink-0 border border-emerald-100/50">
                <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[9px] sm:text-xs font-bold text-slate-700 leading-[1.1] text-center sm:text-left">Personalized<br className="hidden sm:block" />for You</span>
            </div>
            
            <div className="w-px h-6 sm:h-8 bg-slate-200 shrink-0" />
            
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 flex-1 justify-center">
              <div className="bg-emerald-50 p-1.5 sm:p-2 rounded-full text-emerald-600 shrink-0 border border-emerald-100/50">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[9px] sm:text-xs font-bold text-slate-700 leading-[1.1] text-center sm:text-left">Secure<br className="hidden sm:block" />Payment</span>
            </div>
            
            <div className="w-px h-6 sm:h-8 bg-slate-200 shrink-0" />
            
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 flex-1 justify-center">
              <div className="bg-emerald-50 p-1.5 sm:p-2 rounded-full text-emerald-600 shrink-0 border border-emerald-100/50">
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[9px] sm:text-xs font-bold text-slate-700 leading-[1.1] text-center sm:text-left">Instant<br className="hidden sm:block" />Download</span>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="pt-1 flex flex-row gap-2 sm:gap-4 items-stretch">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="px-3 sm:px-6 py-3 sm:py-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-[13px] sm:text-[15px] flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm transition-all sm:w-[160px] shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Go Back</span>
              <span className="sm:hidden">Back</span>
            </button>
            <button
              onClick={onConfirm}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-[#ff6b00] to-[#ff5500] hover:from-[#e65c00] hover:to-[#e64a00] text-white py-3 sm:py-4 px-3 sm:px-6 rounded-xl font-black text-[15px] sm:text-[17px] flex flex-col items-center justify-center shadow-lg shadow-orange-500/25 transition-all transform hover:scale-[1.01]"
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                {isGenerating ? "Processing..." : (
                  <>
                    <span className="hidden sm:inline">Continue & Generate</span>
                    <span className="sm:hidden">Generate Poster</span>
                  </>
                )}
                {!isGenerating && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              {!isGenerating && (
                <span className="text-[9px] sm:text-[11px] text-orange-100 font-medium mt-0 sm:mt-0.5 font-normal tracking-wide opacity-90 hidden sm:block">
                  AI generation will start after confirmation
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
