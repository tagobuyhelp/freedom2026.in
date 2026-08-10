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

      const response = await fetch("/api/poster/generate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setPosterData((prev) => ({
          ...prev,
          posterUrl: result.posterUrl,
          posterId: result.posterId,
          shareActionToken: result.shareActionToken,
          isLoading: false,
        }));
      } else {
        alert("Failed to generate poster: " + (result.error || "Unknown error"));
        setModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while generating the poster.");
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
