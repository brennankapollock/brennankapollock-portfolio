'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/stash', label: 'Stash' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const active = useMemo(() => pathname || '/', [pathname]);

  return (
    <header className="museum-header">
      <div className="museum-nav-container">
        {/* Left Navigation */}
        <nav className="museum-nav-left">
          <Link href="/blog" className="museum-nav-link">
            WORDS
          </Link>
          <Link href="/stash" className="museum-nav-link">
            STASH
          </Link>
          <Link href="/work" className="museum-nav-link">
            CODE
          </Link>
          <Link href="/about" className="museum-nav-link">
            WHO?
          </Link>
        </nav>

        {/* Right Navigation */}
        <nav className="museum-nav-right">
          <Link href="/contact" className="museum-book-btn">
            Contact
          </Link>
          <button className="museum-menu-btn">
            <svg width="20" height="16" viewBox="0 0 24 16" fill="none">
              <path d="M0 1H24M0 8H24M0 15H24" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}