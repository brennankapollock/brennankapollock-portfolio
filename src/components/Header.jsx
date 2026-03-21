"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const LEFT_NAV = [
  { label: "WORDS", href: "/blog" },
  { label: "STASH", href: "/stash" },
  { label: "WORK", href: "/work" },
  { label: "ABOUT", href: "/about" },
];

const SOCIAL_NAV = [
  { label: "GITHUB", href: "https://github.com/brennankapollock" },
  { label: "YOUTUBE", href: "https://youtube.com/@brennankapollock" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="editorial-header">
      <nav className="editorial-nav" aria-label="Primary">
        <div className="editorial-nav-group">
          <Link
            href="/"
            aria-label="Home"
            className="editorial-nav-link editorial-brand"
          >
            BKAP
          </Link>
          {LEFT_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`editorial-nav-link editorial-nav-link--desktop${isActive ? " editorial-nav-link--active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="editorial-nav-group">
          {SOCIAL_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-nav-link editorial-nav-link--desktop"
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
