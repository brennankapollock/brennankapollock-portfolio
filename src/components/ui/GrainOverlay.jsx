"use client";

export default function GrainOverlay({ intensity = 0.06, className = "" }) {
  return (
    <div
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#grain-filter)",
          opacity: intensity,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
