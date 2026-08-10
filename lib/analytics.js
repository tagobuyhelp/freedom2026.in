// lib/analytics.js
// Google Analytics 4 utility for Freedom2026.in
// Safe to use: gracefully degrades if GA_ID is not set.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/**
 * Send a pageview event to GA4.
 * @param {string} url - The URL of the page being viewed.
 */
export function pageview(url) {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_ID, { page_path: url });
}

/**
 * Send a custom event to GA4.
 * @param {string} action - The event action name.
 * @param {Object} params - Additional event parameters.
 */
export function event(action, params = {}) {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}

// ─── Pre-defined event helpers ────────────────────────────────────────────────

export const trackCreatorOpen = () => event("creator_open");
export const trackTemplateSelect = (templateId) => event("template_select", { template_id: templateId });
export const trackPhotoUpload = () => event("photo_upload");
export const trackPosterGenerate = (templateId) => event("poster_generate", { template_id: templateId });
export const trackPosterDownload = (templateId) => event("poster_download", { template_id: templateId });
export const trackVideoGenerate = () => event("video_generate");
export const trackVideoDownload = () => event("video_download");
export const trackWhatsAppShare = () => event("whatsapp_share");
export const trackFacebookShare = () => event("facebook_share");
export const trackCopyLink = () => event("copy_link");
export const trackPremiumClick = () => event("premium_click");
export const trackBusinessCreatorOpen = () => event("business_creator_open");
export const trackBusinessOrder = () => event("business_order");
export const trackTagoConnectClick = () => event("tagoconnect_click");
export const trackCapitalCoachClick = () => event("capitalcoach_click");
