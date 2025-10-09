'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'WORDS', href: '/blog' },
  { label: 'STASH', href: '/stash' },
  { label: 'CODE', href: '/work' },
  { label: 'WHO?', href: '/about' },
];

const SOCIAL_ITEMS = [
  { label: 'YOUTUBE', href: 'https://youtube.com/@brennankapollock' },
  { label: 'GITHUB', href: 'https://github.com/brennankapollock' },
  { label: 'MEETUPS', href: 'https://lu.ma/brennankapollock' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const panel = panelRef.current;
      if (panel) {
        if (open) {
          panel.style.transform = 'translateX(0)';
          document.body.style.overflow = 'hidden';
        } else {
          panel.style.transform = 'translateX(100%)';
          document.body.style.overflow = '';
        }
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [open]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={toggleMenu}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        type="button"
      >
        <span className="mobile-menu-icon">
          <span className={`mobile-menu-line ${open ? 'open' : ''}`} />
          <span className={`mobile-menu-line ${open ? 'open' : ''}`} />
        </span>
      </button>

      <aside
        ref={panelRef}
        className="mobile-menu-panel"
        aria-hidden={!open}
      >
        <div className="mobile-menu-inner">
          <nav className="mobile-menu-nav" aria-label="Mobile navigation">
            <ul className="mobile-menu-list">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="mobile-menu-item">
                    <Link
                      href={item.href}
                      className={`mobile-menu-link ${isActive ? 'active' : ''}`}
                      onClick={closeMenu}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="mobile-menu-number">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="mobile-menu-label">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-menu-socials">
              <h3 className="mobile-menu-socials-title">Connect</h3>
              <ul className="mobile-menu-socials-list">
                {SOCIAL_ITEMS.map((item) => (
                  <li key={item.href} className="mobile-menu-socials-item">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-menu-socials-link"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {open && (
        <div
          className="mobile-menu-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
