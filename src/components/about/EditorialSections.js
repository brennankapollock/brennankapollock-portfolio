"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./EditorialSections.module.css";

export default function EditorialSections({ sections, figures = {}, blurb }) {
  const reduce = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.06,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className={styles.layout}>
      {sections.map((s) => {
        const fig = figures[s.id] || {};
        return (
          <motion.section
            key={s.id}
            className={styles.section}
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            viewport={reduce ? undefined : { once: true, amount: 0.25 }}
            variants={sectionVariants}
          >
            {/* Left column: static English blurb + section meta */}
            <aside className={styles.left}>
              <div className={styles.note}>
                <span className={styles.noteNumber}>{s.id}</span>
                <span className={styles.noteTitle}>{s.title}</span>
              </div>
              {blurb ? <p className={styles.leftBlurb}>{blurb}</p> : null}
            </aside>

            {/* Center column: body */}
            <div className={styles.center}>
              {s.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={paragraphVariants}
                  className={styles.bodyParagraph}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Right column: sticky figure */}
            <div className={styles.right}>
              {fig.src
                ? <figure className={styles.figure}>
                    <Image
                      src={fig.src}
                      alt={fig.alt || ""}
                      width={800}
                      height={800}
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className={styles.figureImage}
                      priority={false}
                    />
                    {fig.caption
                      ? <figcaption className={styles.figureCaption}>
                          {fig.caption}
                        </figcaption>
                      : null}
                  </figure>
                : <div
                    className={`${styles.figure} ${styles.figurePlaceholder}`}
                    aria-hidden="true"
                  />}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
