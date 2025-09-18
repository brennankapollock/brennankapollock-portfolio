"use client";

import { useEffect, useRef } from "react";

export default function ReadingTitle({ title }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    const sentinel = document.getElementById('reading-sentinel') || document.querySelector('.blog-post-content');
    const hero = document.querySelector('.blog-post-hero-title');
    const compact = rootRef.current;
    const main = document.querySelector('.blog-post-main');
    const aside = document.querySelector('.blog-post-aside');

    if (!sentinel || !compact) return;

    const getStickyTop = () => {
      if (!aside) return 72; // px fallback
      const top = parseFloat(getComputedStyle(aside).top);
      return Number.isNaN(top) ? 72 : top;
    };

    const setState = (active) => {
      if (active) {
        body.classList.add('is-reading');
        compact.setAttribute('aria-hidden', 'false');
        if (hero) hero.setAttribute('aria-hidden', 'true');
      } else {
        body.classList.remove('is-reading');
        compact.setAttribute('aria-hidden', 'true');
        if (hero) hero.setAttribute('aria-hidden', 'false');
      }
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const offset = getStickyTop();
      const rect = sentinel.getBoundingClientRect();
      // Stay active after crossing this line until user scrolls back up above it
      const active = rect.top <= offset + 8; // small buffer
      setState(active);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (main) main.addEventListener('scroll', onScroll, { passive: true });

    // Initialize
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (main) main.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="reading-title" aria-hidden="true">
      <div className="reading-title-text">{title}</div>
    </div>
  );
}
