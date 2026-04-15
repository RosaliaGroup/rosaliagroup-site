/*
 * ROSALIA GROUP — Navbar Component
 * Design: Urban Warmth / Warm Brutalism
 * - Space Mono labels, thin underline hover effect
 * - Sticky with blur on scroll
 * - Mobile hamburger menu
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Rentals", href: "#rentals" },
    { label: "Buy & Sell", href: "#buy-sell" },
    { label: "Management", href: "#management" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.97_0.015_80/0.95)] backdrop-blur-md shadow-sm border-b border-[oklch(0.87_0.02_80)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-[oklch(0.55_0.13_38)] flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>R</span>
            </div>
            <div>
              <span
                className="text-[oklch(0.22_0.01_65)] font-semibold tracking-wide text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Rosalia Group
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden lg:inline-block btn-primary text-xs py-2.5 px-5"
            >
              Book a Tour
            </a>
            <button
              className="lg:hidden p-2 text-[oklch(0.22_0.01_65)]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[oklch(0.97_0.015_80)] border-t border-[oklch(0.87_0.02_80)] px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-sm py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-center mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Book a Tour
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
