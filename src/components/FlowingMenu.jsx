"use client";

import Link from 'next/link';
import React from 'react';
import { gsap } from 'gsap';

import './FlowingMenu.css';

// Curated palette of distinct, vibrant editorial colors
const HOVER_COLORS = [
  '#ffd700', // bright yellow
  '#87ceeb', // sky blue
  '#98fb98', // pale green
  '#ffb6c1', // light pink
  '#dda0dd', // plum
  '#ffa07a', // light salmon
  '#f0e68c', // khaki
  '#b0e0e6', // powder blue
  '#ffb347', // pastel orange
  '#c5a3ff', // light purple
];

function FlowingMenu({ items = [], renderItem, skipAnimation = false }) {
  // Deterministically assign colors based on item ID or index to avoid hydration issues
  const getColorForItem = (item, idx) => {
    // Use item ID hash if available, otherwise use index
    const seed = item.id ? hashString(item.id) : idx;
    return HOVER_COLORS[seed % HOVER_COLORS.length];
  };

  return (
    <div className="menu-wrap">
      <nav className={`menu${skipAnimation ? ' menu--instant' : ''}`}>
        {items.map((item, idx) => (
          <MenuItem 
            key={item.id ?? idx} 
            item={item} 
            renderItem={renderItem}
            hoverColor={getColorForItem(item, idx)}
          />
        ))}
      </nav>
    </div>
  );
}

// Simple string hash function for deterministic color selection
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function MenuItem({ item, renderItem, hoverColor }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{item.marqueeText ?? item.text}</span>
      <div
        className="marquee__chip"
        style={{ background: item.marqueeChip ?? "linear-gradient(135deg, #fff, #d1d5db)" }}
      />
    </React.Fragment>
  ));

  const marqueeStyle = {
    background: item.marqueeBackground ?? "rgba(17, 17, 17, 0.92)",
    color: item.marqueeTextColor ?? "#fafafa",
    borderColor: item.marqueeBorder ?? "rgba(255, 255, 255, 0.2)",
  };

  return (
    <div 
      className="menu__item" 
      ref={itemRef}
      style={{ '--hover-color': hoverColor }}
    >
      <Link
        className="menu__item-link"
        href={item.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderItem ? renderItem(item) : item.text}
      </Link>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true" style={marqueeStyle}>
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
