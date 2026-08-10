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

  if (!isOpen) return null;

  const isUnlocked = posterStatus?.shareUnlocked || posterStatus?.paymentUnlocked || posterStatus?.status === 'unlocked';

  const handleShare = async () => {
    if (!data.posterId || !data.shareActionToken) return;
    setErrorMsg(null);
    setIsSharing(true);

    try {
      const shareData = {
        title: "Create Your Freedom Story — Freedom2026.in",
        text: "Create your personalized Independence Day 2026 poster on Freedom2026.in",
        url: `https://freedom2026.in`,
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        // Only if share succeeds (promise resolves), we record the action
      } else {
        // Fallback for browsers without Web Share API
        // For MVP we trigger the fallback as a successful action
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard! Share it with your friends.");
      }

      // Record share action on server
      const res = await fetch("/api/poster/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posterId: data.posterId,
          shareActionToken: data.shareActionToken,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        if (res.status === 429) {
          setErrorMsg("Please wait a moment before sharing again.");
        }
      } else if (json.success) {
        // Refresh status
        await fetchStatus();
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        // User cancelled share, do nothing
      } else {
        console.error("Error sharing", error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handlePayment = async () => {
    if (!data.posterId) return;
    setErrorMsg(null);
    setIsProcessingPayment(true);

    try {
      // 1. Create Order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
              <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-bold text-slate-700">Rendering high-res poster on server...</p>
              </div>
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
                  <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Download Unlocked</span>
                  </div>
                  <a
                    href={`/api/poster/download?posterId=${data.posterId}`}
                    className="w-full saffron-gradient text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
                    download
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Poster</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                  >
                    Create Another
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
                      <span>{isSharing ? "Opening Share..." : "Share My Poster"}</span>
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
