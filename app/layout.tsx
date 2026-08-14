import type { Metadata, Viewport } from "next";
import { Anton, Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/articles";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Actualités jeux vidéo & dossier GTA 6`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "GTA 6",
    "GTA VI",
    "actualité jeux vidéo",
    "GTA 6 date de sortie",
    "GTA 6 trailer",
    "blog jeux vidéo",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.name,
    title: `${SITE.name} — Actualités jeux vidéo & dossier GTA 6`,
    description: SITE.description,
    images: [{ url: "/images/hero.svg", width: 1600, height: 900, alt: "NeonActu" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0a15" },
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
  ],
  colorScheme: "dark light",
};

/**
 * Applique le thème mémorisé (clair/sombre) avant le premier rendu pour
 * éviter tout flash. Sans choix mémorisé, rien n'est posé : le thème suit
 * automatiquement prefers-color-scheme (voir globals.css).
 */
const themeScript = `(function(){try{var t=localStorage.getItem("gf-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${playfair.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Thème mémorisé, appliqué avant peinture (anti-flash) */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
