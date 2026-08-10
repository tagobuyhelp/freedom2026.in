"use client";

import React, { useState } from "react";
import { MessageCircle, Link as LinkIcon, Check } from "lucide-react";

export default function ViralShareSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://freedom2026.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      "Create your personalized Independence Day 2026 poster for free at https://freedom2026.in 🇮🇳"
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleFacebookShare = () => {
    window.open("https://www.facebook.com/sharer/sharer.php?u=https://freedom2026.in", "_blank");
  };

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Made to Be Shared
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Your Independence Day creation is better when you share it.
          </p>
        </div>

        {/* 3 Share Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppShare}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2.5 shadow-md shadow-emerald-600/20 hover:scale-105 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>WhatsApp</span>
          </button>

          {/* Facebook Button */}
          <button
            onClick={handleFacebookShare}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2.5 shadow-md shadow-blue-600/20 hover:scale-105 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2.5 shadow-2xs hover:scale-105 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon className="w-5 h-5 text-slate-600" />
                <span>Copy Link</span>
              </>
            )}
          </button>

        </div>

      </div>
    </section>
  );
}
