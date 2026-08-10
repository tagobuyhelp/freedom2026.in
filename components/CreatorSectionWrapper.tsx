"use client";

import React, { useState } from "react";
import QuickCreator from "./QuickCreator";
import PosterGeneratorModal from "./PosterGeneratorModal";

export default function CreatorSectionWrapper() {
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleGenerate = async (data: {
    name: string;
    city: string;
    photoFile: File | null;
    template: string;
    language: string;
  }) => {
    setPosterData({
      name: data.name,
      city: data.city,
      posterUrl: null,
      posterId: null,
      shareActionToken: null,
      template: data.template,
      isLoading: true,
    });
    setModalOpen(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("templateId", data.template);
      if (data.photoFile) {
        formData.append("photo", data.photoFile);
      } else {
        // We require a photo for Phase 1
        alert("Please upload a photo first!");
        setModalOpen(false);
        return;
      }

      const { getSessionId } = await import("@/lib/analytics");

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
    }
  };

  return (
    <>
      <QuickCreator onGenerate={handleGenerate} />
      <PosterGeneratorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={posterData}
      />
    </>
  );
}
