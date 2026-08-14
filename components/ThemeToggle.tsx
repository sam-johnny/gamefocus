"use client";

import { useEffect, useState } from "react";

/**
 * Bascule de thème en 3 états : auto (suit le système, défaut) → clair →
 * sombre. Le choix manuel est mémorisé dans localStorage (« gf-theme ») et
 * appliqué via [data-theme] sur <html> ; en « auto », la préférence système
 * est suivie en temps réel (media query CSS). Le script inline de
 * app/layout.tsx applique le thème mémorisé avant le premier rendu (pas de
 * flash). L'état initial « auto » est identique côté serveur et client :
 * aucun mismatch d'hydratation.
 */

type Mode = "auto" | "light" | "dark";

const ORDER: Mode[] = ["auto", "light", "dark"];

const LABELS: Record<Mode, string> = {
  auto: "Thème : automatique (suit le système) — cliquer pour passer en clair",
  light: "Thème : clair — cliquer pour passer en sombre",
  dark: "Thème : sombre — cliquer pour revenir en automatique",
};

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("auto");

  // Synchronise l'état avec le thème mémorisé (appliqué avant le rendu par
  // le script inline du layout).
  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    setMode(t === "light" || t === "dark" ? t : "auto");
  }, []);

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    setMode(next);
    const root = document.documentElement;
    try {
      if (next === "auto") {
        delete root.dataset.theme;
        localStorage.removeItem("gf-theme");
      } else {
        root.dataset.theme = next;
        localStorage.setItem("gf-theme", next);
      }
    } catch {
      /* localStorage indisponible : le thème reste appliqué pour la session */
      if (next === "auto") delete root.dataset.theme;
    }
  };

  return (
    <button
      type="button"
      className={`theme-toggle is-${mode}`}
      onClick={cycle}
      aria-label={LABELS[mode]}
      title={LABELS[mode]}
    >
      {/* Auto : moitié claire / moitié sombre */}
      <svg className="icon-auto" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" />
      </svg>
      {/* Clair : soleil */}
      <svg className="icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      {/* Sombre : lune */}
      <svg className="icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.2 14.2A8.5 8.5 0 1 1 9.8 3.8a7 7 0 1 0 10.4 10.4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
