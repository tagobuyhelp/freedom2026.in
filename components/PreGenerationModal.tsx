"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface PreGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isGenerating: boolean;
}

export default function PreGenerationModal({ isOpen, onClose, onConfirm, isGenerating }: PreGenerationModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2 text-orange-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900 leading-tight">
            🎉 Your Poster Is Ready to Create
          </h3>
          <p className="text-sm text-slate-600 font-medium">
            AI will now create your personalized Independence Day poster using your photo, name and city.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 text-center">After generation, unlock your HD poster:</p>
            <div className="flex items-start gap-3">
              <div className="text-xl">🆓</div>
              <div>
                <p className="text-sm font-bold text-slate-800">FREE — Share 10 times</p>
                <p className="text-xs text-slate-500 font-medium">Share with friends to unlock for free</p>
              </div>
            </div>
            <div className="h-px bg-slate-200 w-full" />
            <div className="flex items-start gap-3">
              <div className="text-xl">⚡</div>
              <div>
                <p className="text-sm font-bold text-slate-800">₹10 — Instant Download</p>
                <p className="text-xs text-slate-500 font-medium">Unlock immediately</p>
              </div>
            </div>
          </div>
          <div className="pt-2 space-y-3">
            <button onClick={onConfirm} disabled={isGenerating} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center shadow-lg shadow-orange-600/25 transition-all">
              {isGenerating ? "Processing..." : "Continue & Generate"}
            </button>
            <button onClick={onClose} disabled={isGenerating} className="w-full bg-transparent hover:bg-slate-100 text-slate-500 py-2 rounded-xl font-bold text-sm transition-colors">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
