"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Download, Share2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
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

interface PosterStatus {
  shareCount: number;
  shareThreshold: number;
  shareUnlocked: boolean;
  paymentUnlocked: boolean;
  status: string;
}

// Ensure Razorpay window object type
declare global {
  interface Window {
    Razorpay: any;
  }
}

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
  const [posterStatus, setPosterStatus] = useState<PosterStatus | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch current status from server
  const fetchStatus = useCallback(async () => {
    if (!data.posterId) return;
    try {
      const res = await fetch(`/api/poster/status?posterId=${data.posterId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setPosterStatus(json.poster);
        }
      }
    } catch (err) {
      console.error("Failed to fetch poster status", err);
    }
  }, [data.posterId]);

  useEffect(() => {
    if (isOpen && data.posterId) {
      fetchStatus();
    }
  }, [isOpen, data.posterId, fetchStatus]);

  const isUnlocked = posterStatus?.shareUnlocked || posterStatus?.paymentUnlocked || posterStatus?.status === 'unlocked';

  useEffect(() => {
    if (isOpen && data.posterId && !data.isLoading && !isUnlocked) {
      import("@/lib/analytics").then(({ trackClientEvent }) => {
        trackClientEvent("unlock_screen_viewed", { posterId: data.posterId, templateId: data.template });
      });
    }
  }, [isOpen, data.posterId, data.isLoading, isUnlocked, data.template]);

  if (!isOpen) return null;

  const handleShare = async () => {
    if (!data.posterId || !data.shareActionToken || isSharing) return;
    setErrorMsg(null);
    setIsSharing(true);

    try {
      const { trackClientEvent, getSessionId } = await import("@/lib/analytics");

      // 1. Track share_started immediately when user clicks Share
      trackClientEvent("share_started", { posterId: data.posterId, templateId: data.template });

      const shareData = {
        title: "My Freedom Story — Independence Day 2026",
        text: "I created my Freedom Story for Independence Day 2026!\n\nCreate your own Freedom Story and celebrate 15 August with your personalized poster. ❤️🇮🇳\n\nhttps://freedom2026.in",
        url: "https://freedom2026.in",
      };

      // 2. Check if Web Share API is available
      if (!navigator.share) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareData.url);
          alert("Web Share is not supported on this browser. Link copied to clipboard!");
        } else {
          alert("Web Share is not supported on this browser.");
        }
        // DO NOT call /api/poster/share, DO NOT increment share count
        return;
      }

      // 3. Record start time before launching native share sheet
      const shareStartTime = Date.now();

      // Trigger native share sheet and WAIT for user to complete or cancel
      await navigator.share(shareData);

      const elapsedTime = Date.now() - shareStartTime;

      // Guard: If navigator.share() resolves in under 500ms without actual user interaction,
      // it means the OS wrapper or browser auto-resolved immediately without native share completion.
      if (elapsedTime < 500) {
        console.log(`Share dismissed or auto-resolved too quickly (${elapsedTime}ms). Count not incremented.`);
        return;
      }

      // ONLY REACHED IF navigator.share() RESOLVED AFTER REAL USER ENGAGEMENT (>500ms)
      // (If user pressed Cancel, navigator.share() rejected and control jumped to catch block)

      // 4. Record share action on server
      const res = await fetch("/api/poster/share", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-session-id": getSessionId()
        },
        body: JSON.stringify({
          posterId: data.posterId,
          shareActionToken: data.shareActionToken,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        if (res.status === 429) {
          setErrorMsg("Please wait a moment before sharing again.");
        } else {
          setErrorMsg(json.error || "Could not register share action on server.");
        }
        return;
      }

      if (json.success) {
        // 5. ONLY AFTER server accepted the share action, track share_completed
        trackClientEvent("share_completed", { 
          posterId: data.posterId, 
          templateId: data.template,
          shareCount: json.shareCount
        });

        if (json.unlocked) {
          trackClientEvent("share_unlock_completed", {
            posterId: data.posterId,
            templateId: data.template
          });
        }

        // 6. Refresh authoritative status from server
        await fetchStatus();
      }
    } catch (error: any) {
      // User cancelled native share sheet or share failed
      console.log("Share sheet cancelled or rejected by user. Count not incremented.", error?.name || error);
      // DO NOT call /api/poster/share, DO NOT increment share count, DO NOT track share_completed
    } finally {
      setIsSharing(false);
    }
  };

  const handlePayment = async () => {
    if (!data.posterId) return;
    setErrorMsg(null);
    setIsProcessingPayment(true);
    
    const { trackClientEvent, getSessionId } = await import("@/lib/analytics");
    trackClientEvent("payment_started", { posterId: data.posterId, templateId: data.template });

    try {
      // 1. Create Order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-session-id": getSessionId()
        },
        body: JSON.stringify({ posterId: data.posterId }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Freedom2026",
        description: "Independence Day Poster Download",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                posterId: data.posterId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok && verifyData.success) {
              await fetchStatus();
            } else {
              setErrorMsg(verifyData.error || "Payment verification failed.");
            }
          } catch (err) {
            setErrorMsg("Payment verification error.");
          }
        },
        prefill: {
          name: data.name,
        },
        theme: {
          color: "#f97316",
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
            setErrorMsg("Payment cancelled. You can try again or unlock your poster by sharing.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setIsProcessingPayment(false);
        setErrorMsg("Payment was not completed. Your poster is still safe.");
      });
      rzp.open();
    } catch (error: any) {
      setIsProcessingPayment(false);
      setErrorMsg(error.message || "Failed to start payment process.");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
              <span>{data.isLoading ? "Generating Poster..." : (isUnlocked ? "Your Poster is Unlocked!" : "Your Freedom Poster is Ready! 🎉")}</span>
            </div>
            {!data.isLoading && !isUnlocked && (
              <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
                <span>Unlock Your Poster</span>
                <IndianFlag className="w-5 h-3.5 inline-block" />
              </h3>
            )}
          </div>

          {/* Rendered Poster Preview */}
          <div className="relative bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-200 flex items-center justify-center mb-6 min-h-[400px]">
            {data.isLoading ? (
              <PosterLoadingState />
            ) : data.posterUrl ? (
              <img
                src={data.posterUrl}
                alt="Generated Poster Preview"
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
              {isUnlocked ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-emerald-700 font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200/80 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>🎉 Download Unlocked! Click below to download.</span>
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
              ) : (
                <div className="space-y-4">
                  {/* Share Option */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                    <p className="text-sm font-bold text-slate-800 mb-1">Share with {posterStatus?.shareThreshold || 10} friends to unlock your free download.</p>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-500" 
                          style={{ width: `${Math.min(100, ((posterStatus?.shareCount || 0) / (posterStatus?.shareThreshold || 10)) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500">
                        {posterStatus?.shareCount || 0} / {posterStatus?.shareThreshold || 10} Shares
                      </span>
                    </div>
                    <button
                      onClick={handleShare}
                      disabled={isSharing || !posterStatus}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.01] disabled:opacity-70"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{isSharing ? "Opening Share..." : "🇮🇳 Share My Freedom Story"}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>

                  {/* Payment Option */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessingPayment || !posterStatus}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.01] disabled:opacity-70"
                  >
                    {isProcessingPayment ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span>{isProcessingPayment ? "Processing..." : "Download Instantly for ₹10"}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
