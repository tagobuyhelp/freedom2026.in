"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Download, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import IndianFlag from "./IndianFlag";
import Script from "next/script";

interface PosterData {
  name: string;
  city: string;
  posterUrl: string | null;
  posterId: string | null;
  shareActionToken: string | null;
  template: string;
  isLoading: boolean;
}

interface PosterGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PosterData;
}

// Payment logic moved to CreatePage

function PosterLoadingState() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(12);

  const steps = [
    "Analyzing face & photo features...",
    "Applying Classic India traditional attire...",
    "Blending patriotic tricolor & India Gate background...",
    "Rendering HD 1080x1350 poster artwork...",
    "Finalizing typography & quality check..."
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 3800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 92;
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 1200);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [steps.length]);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-orange-50/80 via-white/95 to-emerald-50/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-5 text-center select-none z-20">
      {/* Animated Tricolor Glowing Spinner Icon */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 blur-md opacity-40 animate-pulse" />
        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-orange-500 border-r-white border-b-emerald-600 border-l-blue-600 animate-spin" />
        <div className="absolute w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100">
          <Sparkles className="w-5 h-5 text-orange-500 animate-bounce" />
        </div>
      </div>

      {/* Dynamic Status Text */}
      <div className="space-y-1.5 max-w-xs">
        <div className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <IndianFlag className="w-4 h-3 inline-block" />
          <span>AI CREATING YOUR POSTER</span>
        </div>
        <p className="text-sm font-bold text-slate-800 transition-all duration-300 min-h-[40px] flex items-center justify-center">
          {steps[stepIndex]}
        </p>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full max-w-xs space-y-1.5">
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner p-0.5">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-400 px-1">
          <span>Processing Artwork</span>
          <span>{progress}%</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 font-medium italic">
        Please wait a few seconds. Do not close this window.
      </p>
    </div>
  );
}

export default function PosterGeneratorModal({ isOpen, onClose, data }: PosterGeneratorModalProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-1 mb-4">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{data.isLoading ? "Generating Poster..." : "Your Freedom Poster is Ready! 🎉"}</span>
            </div>
          </div>

          {/* Rendered Poster Preview */}
          <div className="relative bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-200 flex items-center justify-center mb-6 min-h-[400px] select-none">
            {data.isLoading ? (
              <PosterLoadingState />
            ) : data.posterUrl ? (
              <img
                src={data.posterUrl}
                alt="Generated Poster"
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="p-4 text-center text-red-500 text-sm font-medium">
                Something went wrong while creating your poster. Please try again.
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          {!data.isLoading && data.posterUrl && data.posterId && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-emerald-700 font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200/80 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>🎉 Download Ready! Click below to download.</span>
                </div>
                <a
                  href={`/api/poster/download?posterId=${data.posterId}&sessionId=${typeof window !== 'undefined' ? localStorage.getItem('freedom2026_anon_id') || '' : ''}`}
                  className="w-full bg-[#f97316] hover:bg-[#ea580c] saffron-gradient text-white py-4 rounded-xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-lg shadow-orange-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-orange-400/30"
                  download
                >
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>Download High-Res Poster</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                >
                  Create Another Poster
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
