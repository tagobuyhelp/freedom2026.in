import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd, { websiteSchema, organizationSchema } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://freedom2026.in";

export const metadata: Metadata = {
  title: {
    default: "Independence Day 2026 – Posters, Wishes, Quotes, Status & Videos | Freedom2026",
    template: "%s | Freedom2026.in",
  },
  description:
    "Create personalized Independence Day 2026 posters, videos and social media creatives. Explore 15 August wishes, quotes, WhatsApp status, images and more at Freedom2026.in.",
  keywords: [
    "Independence Day 2026",
    "15 August 2026",
    "Independence Day poster",
    "Independence Day wishes",
    "Independence Day quotes",
    "Independence Day status",
    "Independence Day video",
    "15 August wishes",
    "Bengali Independence Day wishes",
    "Hindi Independence Day wishes",
    "Freedom2026",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Independence Day 2026 – Posters, Wishes, Quotes, Status & Videos | Freedom2026",
    description:
      "Create personalized Independence Day 2026 posters, videos and social media creatives. Explore 15 August wishes, quotes, WhatsApp status, images and more.",
    url: SITE_URL,
    siteName: "Freedom2026.in",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Freedom2026 — Independence Day 2026 Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Independence Day 2026 – Posters, Wishes & Creatives | Freedom2026",
    description:
      "Create personalized Independence Day 2026 posters and explore 15 August wishes, quotes and status.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${hindSiliguri.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7058990081803760"
          crossOrigin="anonymous"
        />
        <JsonLd data={[websiteSchema(), organizationSchema()]} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-700">
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
