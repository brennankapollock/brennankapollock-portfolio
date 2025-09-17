"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--transition-slow)] ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border"
            : "bg-background/50 backdrop-blur-sm"
        }`}
      >
        <nav className="container flex items-center justify-between h-[72px]">
          <Link
            href="/"
            className="text-foreground font-semibold text-xl tracking-[var(--letter-spacing-tight)] hover:opacity-70 transition-opacity duration-[var(--transition-fast)]"
          >
            Brennan Pollock
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-[var(--letter-spacing-wide)] transition-all duration-[var(--transition-fast)] hover:text-accent-primary ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-foreground-muted"
                  }`}
                >
                  {link.label}
                  <span
                    className={`block h-[2px] bg-accent-primary transition-all duration-[var(--transition-base)] ${
                      pathname === link.href ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute left-0 block w-full h-[2px] bg-foreground transition-all duration-[var(--transition-base)] ${
                isOpen ? "top-[15px] rotate-45" : "top-2"
              }`}
            />
            <span
              className={`absolute left-0 block w-full h-[2px] bg-foreground transition-all duration-[var(--transition-base)] ${
                isOpen ? "opacity-0" : "top-[15px] opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block w-full h-[2px] bg-foreground transition-all duration-[var(--transition-base)] ${
                isOpen ? "top-[15px] -rotate-45" : "top-[22px]"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-[var(--transition-slow)] md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex items-center justify-center min-h-screen">
          <ul className="space-y-8 text-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-3xl font-bold tracking-[var(--letter-spacing-tight)] transition-all duration-[var(--transition-fast)] hover:text-accent-primary ${
                    pathname === link.href
                      ? "text-accent-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
