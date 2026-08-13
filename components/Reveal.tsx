"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Apparition au scroll. Le contenu est visible par défaut (SEO, no-JS) ;
 * l'état caché n'est appliqué qu'une fois le JS prêt, puis retiré quand
 * l'élément entre dans le viewport.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Arme l'animation après le premier rendu pour éviter tout flash.
    const raf = requestAnimationFrame(() => {
      el.classList.add("armed");
      // Filet de sécurité : si l'élément est déjà visible, on le révèle.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("in");
      } else {
        io.observe(el);
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
