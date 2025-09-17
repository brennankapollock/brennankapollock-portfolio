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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white text-black px-3 py-1 rounded">
        Skip to content
      </a>
      <div className="container-site flex items-center justify-between py-4">
        {/* Brand */}
        <Link href="/" className="font-display font-semibold text-lg tracking-tight hover:opacity-80 transition">
          BK
        </Link>

        {/* Navigation */}
        <nav aria-label="Primary" className="flex items-center gap-1">
          {NAV.map((item, idx) => {
            const isActive = active === item.href || (item.href !== '/' && active.startsWith(item.href));
            return (
              <div key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className={`link px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/5'
                      : 'hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </Link>
                {idx < NAV.length - 1 && (
                  <span className="text-gray-300 text-sm mx-1">/</span>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}