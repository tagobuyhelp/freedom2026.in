// lib/siteConfig.js
// Central configuration for Freedom2026.in

export const SITE_CONFIG = {
  name: "Freedom2026",
  fullName: "Freedom2026.in",
  tagline: "Create Your Freedom Story",
  description:
    "Create personalized Independence Day 2026 posters, videos and social media creatives. Explore 15 August wishes, quotes, WhatsApp status, images and more at Freedom2026.in.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://freedom2026.in",
  ogImage: "/images/og-default.jpg",
  campaign: "15 August 2026",
  year: "2026",
  company: {
    name: "Tagobuy Technologies Private Limited",
    short: "Tagobuy Technologies",
    url: process.env.TAGOBUY_URL || "https://tagobuy.com",
  },
  products: {
    capitalCoach: {
      name: "CapitalCoach AI",
      description: "Plan, track and grow your personal finances with an AI-powered financial coach.",
      url: process.env.CAPITALCOACH_URL || "#capitalcoach",
    },
    tagoConnect: {
      name: "TagoConnect AI",
      description: "Manage WhatsApp, Facebook and Instagram leads from one place.",
      url: process.env.TAGOCONNECT_URL || "#tagoconnect",
    },
  },
  social: {
    whatsapp: "#",
    facebook: "#",
    instagram: "#",
    twitter: "#",
  },
  contact: {
    email: process.env.CONTACT_EMAIL || "tagobuyhelp@gmail.com",
    phone: process.env.CONTACT_PHONE || "",
    address: process.env.CONTACT_ADDRESS || "West Bengal, India",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Create", href: "/create" },
  { label: "Templates", href: "/templates" },
  { label: "Wishes", href: "/independence-day-wishes" },
  { label: "Quotes", href: "/independence-day-quotes" },
  { label: "Status", href: "/independence-day-status" },
  { label: "Business", href: "/create?type=business" },
  { label: "About Us", href: "/about" },
];

export const FOOTER_LINKS = {
  create: [
    { label: "Poster Creator", href: "/create" },
    { label: "Video Creator", href: "/independence-day-video" },
    { label: "Templates", href: "/templates" },
    { label: "Business Poster", href: "/create?type=business" },
  ],
  explore: [
    { label: "Wishes", href: "/independence-day-wishes" },
    { label: "Quotes", href: "/independence-day-quotes" },
    { label: "Status", href: "/independence-day-status" },
    { label: "Images", href: "/independence-day-images" },
    { label: "New Year 2027", href: "/new-year-2027" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cancellation & Refund", href: "/refund" },
    { label: "Shipping & Delivery", href: "/shipping" },
  ],
};
