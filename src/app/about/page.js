export const metadata = {
  title: "WHO?",
};

import fs from "node:fs/promises";
import path from "node:path";
import Hero from "../../components/about/Hero";
import EditorialSections from "../../components/about/EditorialSections";

export default async function AboutPage() {
  // Read and split markdown content into paragraphs
  const filePath = path.join(process.cwd(), "src", "data", "aboutMe.md");
  const raw = await fs.readFile(filePath, "utf8");
  const parts = raw
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Determine epilogue (last 2–3 short paragraphs)
  const total = parts.length;
  const approx = Math.max(2, Math.min(3, Math.round(total * 0.15)));
  const epilogueCount = total <= 5 ? 1 : approx; // guard very small docs
  const epilogue = parts.slice(-epilogueCount);
  const remaining = parts.slice(0, total - epilogueCount);

  // Distribute remaining into four balanced sections
  const titles = [
    "THE DIRT OF KNOCKEMSTIFF",
    "THE SYSTEM YEARS",
    "RESURRECTION ROAD",
    "THE WORK",
  ];

  const sections = (() => {
    const buckets = [[], [], [], []];
    const base = Math.floor(remaining.length / 4);
    const rem = remaining.length % 4;
    let idx = 0;
    for (let i = 0; i < 4; i++) {
      const count = base + (i < rem ? 1 : 0);
      buckets[i] = remaining.slice(idx, idx + count);
      idx += count;
    }
    return buckets.map((paras, i) => ({
      id: String(i + 1).padStart(3, "0"),
      title: titles[i],
      paragraphs: paras,
    }));
  })();

  const figures = {
    "001": {
      src: "/about-images/baby-me.jpeg",
      alt: "Baby photo of Brennan in Knockemstiff, Ohio.",
      caption:
        "The arrival of this feeling of overlap — the confluence of memory, dirt, and stubborn tenderness — is what keeps the story alive.",
    },
    "002": { src: null },
    "003": { src: null },
    "004": { src: null },
  };

  return (
    <div className="museum-layout">
      <Hero tagline="ALIVENESS OVER PERFORMANCE" />
      <EditorialSections sections={sections} figures={figures} />
    </div>
  );
}
