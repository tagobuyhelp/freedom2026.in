// app/sitemap.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://freedom2026.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/create", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/templates", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/independence-day-2026", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/independence-day-wishes", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/independence-day-quotes", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/independence-day-images", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/independence-day-status", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/independence-day-poster", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/independence-day-video", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/15-august-wishes", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/15-august-status", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/independence-day-wishes-bengali", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/independence-day-wishes-hindi", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
