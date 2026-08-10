"use client";

import { useEffect } from "react";
import { trackClientEvent } from "@/lib/analytics";

export default function AnalyticsTracker() {
  useEffect(() => {
    trackClientEvent("page_view");
  }, []);

  return null;
}
