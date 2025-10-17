"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({
  as: Tag = "div",
  threshold = 0.2,
  children,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`${className} transition duration-700 ease-out will-change-transform will-change-opacity ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
    >
      {children}
    </Tag>
  );
}
