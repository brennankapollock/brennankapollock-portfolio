"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RansomText from "@/components/ui/RansomText";
import StampText from "@/components/ui/StampText";

export default function HomePage() {
  const videos = [
    "/videos/horse.mp4",
    "/videos/window.mp4",
    "/videos/disco.mp4",
    "/videos/eyes.mp4",
    "/videos/flower.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="homepage-container">
      {/* Scan lines overlay */}
      <div className="homepage-scanlines" />

      {/* Video background */}
      <div className="homepage-video-bg">
        <video
          key={currentVideoIndex}
          autoPlay
          loop
          muted
          playsInline
          className="homepage-video"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
      </div>

      {/* Main content */}
      <div
        className="homepage-content"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      >
        {/* Hero title with misprint effect */}
        <h1 className="homepage-hero-title type-misprint" data-text="BRENNAN K.A. POLLOCK">
          <RansomText text="BRENNAN K.A. POLLOCK" seed={42} />
        </h1>

        {/* Subtitle */}
        <div className="homepage-subtitle">
          <StampText color="var(--color-accent-red)" rotate={-1.5}>
            Engineer
          </StampText>
          <span className="homepage-divider">/</span>
          <StampText color="var(--color-accent-red)" rotate={2}>
            Artist
          </StampText>
          <span className="homepage-divider">/</span>
          <StampText color="var(--color-accent-red)" rotate={-0.5}>
            Maker
          </StampText>
        </div>

        {/* Navigation hints */}
        <nav className="homepage-nav" aria-label="Quick navigation">
          <Link href="/blog" className="homepage-nav-link">
            <span className="homepage-nav-number">01</span>
            <span className="homepage-nav-label">Words</span>
          </Link>
          <Link href="/stash" className="homepage-nav-link">
            <span className="homepage-nav-number">02</span>
            <span className="homepage-nav-label">Stash</span>
          </Link>
          <Link href="/work" className="homepage-nav-link">
            <span className="homepage-nav-number">03</span>
            <span className="homepage-nav-label">Code</span>
          </Link>
          <Link href="/about" className="homepage-nav-link">
            <span className="homepage-nav-number">04</span>
            <span className="homepage-nav-label">Who?</span>
          </Link>
        </nav>

        {/* Scroll pulse */}
        <div className="homepage-scroll-indicator">
          <div className="homepage-scroll-dot" />
        </div>
      </div>
    </div>
  );
}
