/*
 * ROSALIA GROUP — Navbar Component
 * Design: Urban Warmth / Warm Brutalism
 * - Space Mono labels, thin underline hover effect
 * - Sticky with blur on scroll
 * - Mobile hamburger menu
 * - Global language selector (22 languages)
 */

import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage, LANGUAGES, LangCode } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const links = [
    { label: t.nav.services, href: "#all-services" },
    { label: t.nav.rentals, href: "#rentals" },
    { label: t.nav.buySell, href: "#buy-sell" },
    { label: t.nav.management, href: "#management" },
    { label: t.nav.international, href: "#international" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

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
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side: Language + CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-sm border transition-all duration-200 text-xs font-bold tracking-widest ${
                  langOpen
                    ? "bg-[oklch(0.55_0.13_38)] text-white border-[oklch(0.55_0.13_38)]"
                    : "border-[oklch(0.80_0.02_80)] text-[oklch(0.35_0.02_65)] hover:border-[oklch(0.55_0.13_38)] hover:text-[oklch(0.55_0.13_38)] bg-transparent"
                }`}
                style={{ fontFamily: "'Space Mono', monospace" }}
                aria-label="Select language"
              >
                <Globe size={13} />
                <span>{currentLang.flag} {currentLang.code.toUpperCase().replace("-TW","")}</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[oklch(0.97_0.015_80)] border border-[oklch(0.87_0.02_80)] shadow-xl rounded-sm overflow-hidden z-[200]">
                  <div className="max-h-80 overflow-y-auto">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code as LangCode); setLangOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                          lang === l.code
                            ? "bg-[oklch(0.55_0.13_38)] text-white font-semibold"
                            : "text-[oklch(0.30_0.02_65)] hover:bg-[oklch(0.93_0.02_80)]"
                        }`}
                      >
                        <span className="text-base">{l.flag}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{l.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Book a Tour CTA */}
            <a
              href="#contact"
              className="hidden lg:inline-block btn-primary text-xs py-2.5 px-5"
            >
              {t.nav.bookTour}
            </a>

            {/* Mobile Toggle */}
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
                key={link.href}
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
              {t.nav.bookTour}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
