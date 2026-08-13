"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  "GTA 6 — SORTIE LE 19 NOVEMBRE 2026",
  "PRÉCOMMANDES OUVERTES",
  "TRAILER 3 IMMINENT",
  "PS5 · XBOX SERIES X|S",
  "VICE CITY · ÉTAT DE LEONIDA",
  "LUCIA & JASON",
];

function useClock() {
  const [now, setNow] = useState<string>("--:--");
  useEffect(() => {
    const update = () =>
      setNow(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 20000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Marquee() {
  const clock = useClock();
  const row = (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="marquee-item">
          <span className="marquee-dot" aria-hidden="true" />
          {item}
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-clock">PARIS&nbsp;{clock}</div>
      <div className="marquee-track">
        <div className="marquee-inner">{row}</div>
        <div className="marquee-inner">{row}</div>
      </div>
    </div>
  );
}
