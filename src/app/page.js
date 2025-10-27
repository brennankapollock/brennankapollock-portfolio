"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const videos = [
    "/videos/horse.mp4",
    "/videos/window.mp4",
    "/videos/disco.mp4",
    "/videos/eyes.mp4",
    "/videos/flower.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="homepage-container">
      <div className="video-square-wrapper">
        <div className="video-square">
          <video
            key={currentVideoIndex}
            autoPlay
            loop
            muted
            playsInline
            className="video-element"
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
          </video>
        </div>
        <h1 className="homepage-title">BRENNAN K.A. POLLOCK</h1>
      </div>
    </div>
  );
}
