'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  return (
    <header className="museum-header" role="banner" aria-label="Site header">
      <nav className="museum-nav" aria-label="Primary">
        <div className="museum-nav-group museum-nav-left" aria-label="Site sections">
          <Link href="/" aria-label="Home" className="museum-nav-link museum-brand">[bkap]</Link>
          {LEFT_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`museum-nav-link${isActive ? ' museum-nav-link--active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
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
