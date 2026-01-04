import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/common/NavBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Core SEO
  title: {
    default: "E-Tutor | AI-Powered Personalized Online Learning Platform",
    template: "%s | E-Tutor - AI Tutor for Smarter Learning",
  },
  description:
    "E-Tutor is an AI-powered online tutoring platform that delivers personalized learning experiences. Get instant help in math, science, coding, languages, and more with adaptive lessons and 24/7 AI assistance.",

  // Open Graph / Social Media (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: "E-Tutor - Your Personal AI Tutor for Any Subject",
    description:
      "Learn faster with E-Tutor’s AI-powered personalized tutoring. Adaptive lessons, instant feedback, and 24/7 support in math, science, coding, and more.",
    url: "https://e-tutor-frontend.vercel.app", // Replace with your actual domain
    siteName: "E-Tutor",
    images: [
      {
        url: "/web/display.png", // Recommended: 1200x630 PNG/JPG in public/images/
        width: 1200,
        height: 630,
        alt: "E-Tutor AI Platform - Personalized Learning with Artificial Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "E-Tutor - AI-Powered Personalized Tutoring Platform",
    description:
      "Master any subject with E-Tutor’s adaptive AI tutor. Instant help, personalized lessons, and progress tracking — anytime, anywhere.",
    images: ["/web/display.png"], // Can be same as OG or optimized for X
    creator: "@etutor_ai", // Replace with your X handle if you have one
  },

  // Robots & Indexing
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

  // Favicons & Icons (place these files in public/)
  icons: {
    icon: [
      "/web/16px-favicon.png",
      "/web/32px-favicon.png",
      "/web/192px-favicon.png",
      "/web/512px-favicon.png",
    ],
    apple: "/web/192px-favicon.png", // iOS uses this (or your 512px if you prefer)
  },
  // Additional SEO Boosters
  keywords: [
    "AI tutor",
    "online tutoring",
    "personalized learning",
    "AI education platform",
    "adaptive learning",
    "math AI tutor",
    "science tutor online",
    "coding tutor",
    "language learning AI",
    "24/7 homework help",
  ],

  // Canonical URL (prevents duplicate content issues)
  alternates: {
    canonical: "https://e-tutor-frontend.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
