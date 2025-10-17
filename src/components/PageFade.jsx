"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageFade({ children }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState("page-fade-enter");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("");
      return;
    }
    // Start enter animation on mount and on route change
    setPhase("page-fade-enter");
    const id = requestAnimationFrame(() => {
      setPhase("page-fade-enter page-fade-enter-active");
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <div className={phase}>{children}</div>;
}
