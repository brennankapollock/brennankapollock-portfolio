'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

const LEFT_NAV = [
  { label: 'WORDS', href: '/blog' },
  { label: 'STASH', href: '/stash' },
  { label: 'CODE', href: '/work' },
  { label: 'WHO?', href: '/about' },
];

const SOCIAL_NAV = [
  { label: 'YOUTUBE', href: 'https://youtube.com/@brennankapollock' },
  { label: 'GITHUB', href: 'https://github.com/brennankapollock' },
  { label: 'MEETUPS', href: 'https://lu.ma/brennankapollock' },
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
                className={`museum-nav-link museum-nav-link--desktop${isActive ? ' museum-nav-link--active' : ''}`}
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
              className="museum-nav-link museum-nav-link--desktop"
            >
              {item.label}
            </a>
          ))}
        </div>
        <MobileMenu />
      </nav>
    </header>
  );
}
