"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = heroRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-subtle to-background pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-5xl">
          {/* Main content */}
          <div className="space-y-8">
            <div className="fade-up opacity-0 translate-y-8 transition-all duration-1000">
              <p className="text-sm font-medium tracking-[var(--letter-spacing-wider)] text-foreground-subtle uppercase mb-4">
                Developer & Creative
              </p>
              <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-[var(--letter-spacing-tight)] mb-6">
                Brennan Pollock
              </h1>
              <p className="text-xl md:text-2xl text-foreground-muted max-w-2xl leading-relaxed">
                I craft digital experiences that blend{" "}
                <span className="text-accent-primary">technical precision</span>{" "}
                with <span className="text-accent-warm">creative vision</span>.
                Currently building the future of web experiences.
              </p>
            </div>

            <div className="fade-up opacity-0 translate-y-8 transition-all duration-1000 delay-200 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium text-sm tracking-[var(--letter-spacing-wide)] hover:bg-foreground-muted transition-all duration-[var(--transition-base)] group"
              >
                View Selected Work
                <svg
                  className="w-4 h-4 transition-transform duration-[var(--transition-base)] group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border hover:border-foreground text-foreground font-medium text-sm tracking-[var(--letter-spacing-wide)] transition-all duration-[var(--transition-base)]"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Featured project preview */}
          <div className="fade-up opacity-0 translate-y-8 transition-all duration-1000 delay-300 mt-20">
            <div className="relative aspect-[16/9] md:aspect-[21/9] bg-surface rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />
              <Image
                src="/next.svg"
                alt="Featured project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[var(--transition-slow)]"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <p className="text-sm font-medium text-accent-primary mb-2">
                  FEATURED PROJECT
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Design System Architecture
                </h3>
                <p className="text-foreground-muted">
                  Building scalable component libraries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-up opacity-0 translate-y-8 transition-all duration-1000 delay-500">
        <div className="flex flex-col items-center gap-2 text-foreground-subtle">
          <p className="text-xs tracking-[var(--letter-spacing-wider)] uppercase">
            Scroll
          </p>
          <div className="w-[1px] h-12 bg-foreground-subtle animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .delay-200 {
          transition-delay: 200ms;
        }

        .delay-300 {
          transition-delay: 300ms;
        }

        .delay-500 {
          transition-delay: 500ms;
        }
      `}</style>
    </section>
  );
}
