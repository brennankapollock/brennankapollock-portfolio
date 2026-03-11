"use client";

import { useMemo } from "react";

// Seeded pseudo-random number generator (mulberry32)
function createSeededRandom(seed) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FONT_FAMILIES = [
  "var(--font-display)",
  "var(--font-departure-mono)",
  "var(--font-geist-sans)",
  "var(--font-medieval, 'UnifrakturMaguntia', 'MedievalSharp', serif)",
];

export default function RansomText({
  text,
  className = "",
  as: Tag = "span",
  seed = 0,
}) {
  const letterStyles = useMemo(() => {
    const rand = createSeededRandom(seed);
    return text.split("").map((char) => {
      if (char === " ") return null;
      const fontFamily =
        FONT_FAMILIES[Math.floor(rand() * FONT_FAMILIES.length)];
      const rotation = rand() * 6 - 3; // -3 to 3
      const yOffset = rand() * 5 - 2; // -2 to 3
      const scale = 0.92 + rand() * 0.16; // 0.92 to 1.08
      return {
        fontFamily,
        display: "inline-block",
        transform: `rotate(${rotation}deg) translateY(${yOffset}px) scale(${scale})`,
      };
    });
  }, [text, seed]);

  return (
    <Tag className={className} aria-label={text}>
      {text.split("").map((char, i) => {
        if (char === " ") {
          return " ";
        }
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static character list
          <span key={i} style={letterStyles[i]} aria-hidden="true">
            {char}
          </span>
        );
      })}
    </Tag>
  );
}
