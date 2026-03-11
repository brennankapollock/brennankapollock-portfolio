"use client";

import { useEffect, useRef, useState } from "react";

export default function ScanReveal({ children, className = "", delay = 0 }) {
  const containerRef = useRef(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || hasRevealed) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setHasRevealed(true), delay);
          } else {
            setHasRevealed(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, hasRevealed, delay]);

  // Reduced motion: just render content immediately
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <style>{`
        @keyframes scan-line {
          from { top: 0; }
          to { top: 100%; }
        }
        @keyframes scan-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div
        ref={containerRef}
        className={className}
        style={{
          position: "relative",
          overflow: "hidden",
          opacity: hasRevealed ? 1 : 0,
          animation: hasRevealed
            ? "scan-fade-in 400ms ease-out forwards"
            : "none",
        }}
      >
        {hasRevealed && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "2px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(255,255,255,0))",
              zIndex: 10,
              pointerEvents: "none",
              animation: "scan-line 400ms ease-out forwards",
            }}
          />
        )}
        {children}
      </div>
    </>
  );
}
