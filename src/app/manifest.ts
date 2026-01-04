import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    /* =========================
       APP IDENTITY
       ========================= */
    name: "E-Tutor — AI-Powered Personalized Learning",
    short_name: "E-Tutor",
    description:
      "AI-powered personalized learning platform for math, science, coding, languages, and more. Adaptive lessons with 24/7 support.",

    /* =========================
       PWA BEHAVIOR
       ========================= */
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",

    /* =========================
       THEME COLORS
       ========================= */
    background_color: "#ffffff", // matches global background
    theme_color: "#2563eb", // primary brand color (Tailwind blue-600)

    /* =========================
       ICONS
       ========================= */
    icons: [
      {
        src: "/web/192px-favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web/512px-favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],

    /* =========================
       OPTIONAL BUT RECOMMENDED
       ========================= */
    categories: ["education", "productivity", "ai"],
    lang: "en",
  };
}
