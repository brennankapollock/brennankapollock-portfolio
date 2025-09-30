"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function EditorialSections({ sections, figures = {} }) {
  const reduce = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 22, mass: 0.6 },
    },
  };

  return (
    <div className="about-layout">
      {sections.map((s) => {
        const fig = figures[s.id] || {};
        return (
          <motion.section
            key={s.id}
            className="about-editorial-section"
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            viewport={reduce ? undefined : { once: true, amount: 0.25 }}
            variants={sectionVariants}
          >
            {/* Left column: language toggle + note/ornament */}
            <aside className="about-left">
              <div className="about-lang-toggle" aria-hidden>
                <span className="about-lang-chip about-lang-chip--active">EN</span>
                <span className="about-lang-chip">NL</span>
              </div>
              <div className="about-note">
                <span className="about-note-number">{s.id}</span>
                <span className="about-note-title">{s.title}</span>
              </div>
            </aside>

            {/* Center column: body */}
            <div className="about-center">
              {s.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={reduce ? undefined : { opacity: 0, y: 10 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={reduce ? undefined : { once: true, amount: 0.3 }}
                  transition={{ delay: reduce ? 0 : i * 0.05, type: "spring", stiffness: 130, damping: 22 }}
                  className="about-body-paragraph"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Right column: sticky figure */}
            <figure className="about-right">
              {fig.src ? (
                <div className="about-figure">
                  <Image
                    src={fig.src}
                    alt={fig.alt || ""}
                    width={800}
                    height={800}
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="about-figure-image"
                    priority={false}
                  />
                  {fig.caption ? (
                    <figcaption className="about-figure-caption">{fig.caption}</figcaption>
                  ) : null}
                </div>
              ) : (
                <div className="about-figure about-figure--placeholder" aria-hidden="true" />
              )}
            </figure>
          </motion.section>
        );
      })}
      <style jsx global>{`
        .about-editorial-section {
          display: grid;
          grid-template-columns: 200px minmax(0, 1fr) 360px;
          gap: 2.5rem;
          align-items: start;
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e1e5e9;
        }
        .about-left { display: flex; flex-direction: column; gap: 1rem; }
        .about-lang-toggle { display: inline-flex; gap: 0.25rem; }
        .about-lang-chip {
          display: inline-flex; align-items: center; justify-content: center;
          font-family: var(--font-geist-sans);
          font-size: 0.625rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          border: 1px solid #d1d5db; color: #6b7280; background: #fff; padding: 0.15rem 0.35rem; border-radius: 999px;
        }
        .about-lang-chip--active { color: #111; border-color: #111; }
        .about-note { display: grid; gap: 0.25rem; }
        .about-note-number { font-family: var(--font-geist-sans); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; color: #6b7280; }
        .about-note-title { font-family: var(--font-display), serif; font-weight: 700; letter-spacing: -0.01em; font-size: 0.95rem; }
        .about-center { font-family: var(--font-geist-sans); font-size: 1.125rem; line-height: 1.9; color: var(--color-fg); }
        .about-body-paragraph { margin-bottom: 1.5rem; }
        .about-body-paragraph:last-child { margin-bottom: 0; }
        .about-right { position: relative; }
        .about-figure { position: sticky; top: 6rem; }
        .about-figure-image { width: 100%; height: auto; display: block; object-fit: cover; }
        .about-figure-caption { font-family: var(--font-geist-sans); font-size: 0.8125rem; line-height: 1.5; color: #6b7280; margin-top: 0.5rem; }
        .about-figure--placeholder { height: 320px; background: #f5f5f5; border: 1px dashed #d1d5db; }
        @media (max-width: 768px) {
          .about-editorial-section { grid-template-columns: 1fr; gap: 1.5rem; }
          .about-right .about-figure { position: static; }
          .about-center { font-size: 1rem; line-height: 1.7; }
        }
      `}</style>
    </div>
  );
}
