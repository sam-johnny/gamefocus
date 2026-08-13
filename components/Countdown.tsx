"use client";

import { useEffect, useState } from "react";
import { GTA_RELEASE_ISO } from "@/lib/articles";

type Left = { d: number; h: number; m: number; s: number; total: number };

function compute(): Left {
  const total = Math.max(0, new Date(GTA_RELEASE_ISO).getTime() - Date.now());
  const d = Math.floor(total / 86400000);
  const h = Math.floor((total % 86400000) / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  return { d, h, m, s, total };
}

const ANNOUNCE = new Date("2023-12-05T00:00:00Z").getTime(); // trailer 1

export default function Countdown() {
  const [left, setLeft] = useState<Left | null>(null);

  useEffect(() => {
    setLeft(compute());
    const id = setInterval(() => setLeft(compute()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const progress = left
    ? Math.min(
        100,
        Math.max(
          0,
          ((Date.now() - ANNOUNCE) /
            (new Date(GTA_RELEASE_ISO).getTime() - ANNOUNCE)) * 100
        )
      )
    : 0;

  const cells = left
    ? [
        { v: String(left.d), label: "jours" },
        { v: pad(left.h), label: "heures" },
        { v: pad(left.m), label: "min" },
        { v: pad(left.s), label: "sec" },
      ]
    : [
        { v: "--", label: "jours" },
        { v: "--", label: "heures" },
        { v: "--", label: "min" },
        { v: "--", label: "sec" },
      ];

  return (
    <div className="countdown">
      <div className="countdown-grid" role="timer" aria-label="Compte à rebours avant la sortie de GTA 6">
        {cells.map((c) => (
          <div key={c.label} className="countdown-cell">
            <span className="countdown-value">{c.v}</span>
            <span className="countdown-label">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="countdown-progress">
        <div className="countdown-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="countdown-caption">
        {progress.toFixed(1)}% du chemin parcouru depuis le premier trailer
      </p>
    </div>
  );
}
