"use client";

import React, { useState } from "react";
import Script from "next/script";
import QuickCreator from "./QuickCreator";
import PosterGeneratorModal from "./PosterGeneratorModal";
import PreGenerationModal from "./PreGenerationModal";
import { TEMPLATES } from "@/data/templates";
import { getTemplatePricing } from "@/lib/pricing";

export default function CreatorSectionWrapper() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showCommitment, setShowCommitment] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingData, setPendingData] = useState<{
    name: string;
    city: string;
    photoFile: File | null;
    template: string;
    language: string;
  } | null>(null);
  const [posterData, setPosterData] = useState<{
    name: string;
    city: string;
    posterUrl: string | null;
    posterId: string | null;
    shareActionToken: string | null;
    template: string;
    isLoading: boolean;
  }>({
    name: "",
    city: "",
    posterUrl: null,
    posterId: null,
    shareActionToken: null,
    template: "classic-india",
    isLoading: false,
  });

  const handlePreGenerate = async (data: {
    name: string;
    city: string;
    photoFile: File | null;
    template: string;
    language: string;
  }) => {
    setPendingData(data);
    setShowCommitment(true);
    try {
      const { trackClientEvent } = await import("@/lib/analytics");
      const { basePrice, sellingPrice } = getTemplatePricing(data.template);
      trackClientEvent("pre_generation_offer_viewed", {
        templateId: data.template,
        price: sellingPrice,
        basePrice,
        sellingPrice,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const startPaymentFlow = async () => {
    if (!pendingData || isGenerating) return;
    setIsGenerating(true);

    try {
      const { trackClientEvent, getSessionId } = await import("@/lib/analytics");
      const { basePrice, sellingPrice } = getTemplatePricing(pendingData.template);
      trackClientEvent("pre_generation_confirmed", {
        templateId: pendingData.template,
        price: sellingPrice,
        basePrice,
        sellingPrice,
      });

      // 1. Initialize PosterSession
      const initRes = await fetch("/api/poster/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pendingData.name.trim(),
          city: pendingData.city.trim(),
          templateId: pendingData.template,
        }),
      });
      const initData = await initRes.json();
      if (!initRes.ok || !initData.success) {
        throw new Error(initData.error || "Failed to initialize session.");
      }
      const posterId = initData.posterId;

      // 2. Create Razorpay Order bound to this posterId
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": getSessionId(),
        },
        body: JSON.stringify({ posterId }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create payment order.");
      }

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
          await executeGeneration(posterId, response);
        },
        prefill: {
          name: pendingData.name.trim(),
        },
        theme: { color: "#f97316" },
        modal: {
          ondismiss: function () {
            alert("Payment cancelled. You can try again.");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function () {
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
      setIsGenerating(false);
    }
  };

  const executeGeneration = async (posterId: string, paymentDetails: any) => {
    if (!pendingData) return;
    setIsGenerating(true);
    setPosterData({
      name: pendingData.name.trim(),
      city: pendingData.city.trim(),
      posterUrl: null,
      posterId,
      shareActionToken: null,
      template: pendingData.template,
      isLoading: true,
    });
    setModalOpen(true);

    try {
      const { trackClientEvent, getSessionId } = await import("@/lib/analytics");
      const { basePrice, sellingPrice } = getTemplatePricing(pendingData.template);
      trackClientEvent("poster_generation_started", {
        templateId: pendingData.template,
        price: sellingPrice,
        basePrice,
        sellingPrice,
      });

      if (
        !paymentDetails?.razorpay_payment_id ||
        !paymentDetails?.razorpay_order_id ||
        !paymentDetails?.razorpay_signature
      ) {
        throw new Error("Payment confirmation missing required parameters from Razorpay.");
      }
      if (!pendingData.photoFile) {
        throw new Error("Photo is required for poster generation. Please select your photo.");
      }

      const formData = new FormData();
      formData.append("posterId", posterId);
      formData.append("razorpay_payment_id", paymentDetails.razorpay_payment_id);
      formData.append("razorpay_order_id", paymentDetails.razorpay_order_id);
      formData.append("razorpay_signature", paymentDetails.razorpay_signature);
      formData.append("name", pendingData.name.trim());
      formData.append("city", pendingData.city.trim());
      formData.append("templateId", pendingData.template);
      formData.append("photo", pendingData.photoFile);

      const res = await fetch("/api/poster/generate", {
        method: "POST",
        headers: { "x-session-id": getSessionId() },
        body: formData,
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch (e) {
        console.error(e);
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.details || "Generation failed after payment.");
      }

      setPosterData((prev) => ({
        ...prev,
        posterUrl: data.posterUrl,
        shareActionToken: data.shareActionToken,
        isLoading: false,
      }));
    } catch (err: any) {
      alert(err.message || "Something went wrong during generation. Your payment was captured, please contact support or retry.");
      setModalOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <QuickCreator onGenerate={handlePreGenerate} />
      <PreGenerationModal 
        isOpen={showCommitment} 
        onClose={() => setShowCommitment(false)} 
        onConfirm={startPaymentFlow} 
        isGenerating={isGenerating}
        templateId={pendingData?.template}
        templateName={
          TEMPLATES.find(t => t.id === pendingData?.template)?.title
        }
      />
      <PosterGeneratorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={posterData}
      />
    </>
  );
}
