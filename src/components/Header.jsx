'use client';

import Link from 'next/link';
import React from 'react';

const LEFT_NAV = [
  { label: 'WORDS', href: '/blog' },
  { label: 'STASH', href: '/stash' },
  { label: 'CODE', href: '/work' },
  { label: 'WHO?', href: '/about' },
];

// TODO: replace placeholder URLs with real destinations once provided
const SOCIAL_NAV = [
  { label: 'YOUTUBE', href: 'https://example.com/youtube' },
  { label: 'GITHUB', href: 'https://example.com/github' },
  { label: 'MEETUPS', href: 'https://example.com/meetups' },
];

export default function Header() {
  return (
    <header className="museum-header" role="banner" aria-label="Site header">
      <nav className="museum-nav" aria-label="Primary">
        <div className="museum-nav-group museum-nav-left" aria-label="Site sections">
          {LEFT_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="museum-nav-link">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="museum-nav-group museum-nav-right" aria-label="Social links">
          {SOCIAL_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="museum-nav-link"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
