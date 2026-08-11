"use client";

import React, { useState } from "react";
import QuickCreator from "./QuickCreator";
import PosterGeneratorModal from "./PosterGeneratorModal";
import PreGenerationModal from "./PreGenerationModal";

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
      trackClientEvent("pre_generation_offer_viewed", { templateId: data.template });
    } catch (e) {
      console.error(e);
    }
  };

  const confirmGeneration = async () => {
    if (!pendingData || isGenerating) return;
    
    setShowCommitment(false);
    setIsGenerating(true);
    setPosterData({
      name: pendingData.name,
      city: pendingData.city,
      posterUrl: null,
      posterId: null,
      shareActionToken: null,
      template: pendingData.template,
      isLoading: true,
    });
    setModalOpen(true);

    try {
      const { trackClientEvent, getSessionId } = await import("@/lib/analytics");
      trackClientEvent("pre_generation_confirmed", { templateId: pendingData.template });
      trackClientEvent("poster_generation_started", { templateId: pendingData.template });

      const formData = new FormData();
      formData.append("name", pendingData.name);
      formData.append("city", pendingData.city);
      formData.append("templateId", pendingData.template);
      
      if (pendingData.photoFile) {
        formData.append("photo", pendingData.photoFile);
      } else {
        alert("Please upload a photo first!");
        setModalOpen(false);
        setIsGenerating(false);
        return;
      }

      const response = await fetch("/api/poster/generate", {
        method: "POST",
        headers: {
          "x-session-id": getSessionId(),
        },
        body: formData,
      });

      let result: any = {};
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("Failed to parse JSON response from server:", parseError);
      }
      
      if (response.ok && result.success) {
        setPosterData((prev) => ({
          ...prev,
          posterUrl: result.posterUrl,
          posterId: result.posterId,
          shareActionToken: result.shareActionToken,
          isLoading: false,
        }));
      } else {
        const errorMsg = result.error || result.details || "Server error while creating poster. Please try again.";
        alert("Failed to generate poster: " + errorMsg);
        setModalOpen(false);
      }
    } catch (error: any) {
      console.error("Poster generation error:", error);
      alert("Network or server error while generating your poster. Please try again.");
      setModalOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <QuickCreator onGenerate={handlePreGenerate} />
      <PreGenerationModal 
        isOpen={showCommitment} 
        onClose={() => setShowCommitment(false)} 
        onConfirm={confirmGeneration} 
        isGenerating={isGenerating} 
      />
      <PosterGeneratorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={posterData}
      />
    </>
  );
}
