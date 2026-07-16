/*
 * ROSALIA GROUP — Footer Component
 * Design: Urban Warmth / Warm Brutalism
 * - Dark charcoal background, warm parchment text
 * - Space Mono labels, Playfair Display brand name
 */

import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { PRIVACY_POLICY_PATH, TERMS_PATH } from "@shared/legal/sms-consent";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[oklch(0.22_0.01_65)] text-[oklch(0.85_0.01_80)]">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-[oklch(0.55_0.13_38)] flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>R</span>
              </div>
              <span
                className="text-[oklch(0.97_0.015_80)] font-semibold text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Rosalia Group
              </span>
            </div>
            <p className="text-sm text-[oklch(0.65_0.01_80)] leading-relaxed mb-6">
              New Jersey & New York real estate, property management, and international resort investment specialists. Woman-run, family-owned. SBE & MWBE Certified.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-[oklch(0.40_0.01_65)] flex items-center justify-center text-[oklch(0.65_0.01_80)] hover:border-[oklch(0.55_0.13_38)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://facebook.com/p/Rosalia-Group-61556822101956/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-[oklch(0.40_0.01_65)] flex items-center justify-center text-[oklch(0.65_0.01_80)] hover:border-[oklch(0.55_0.13_38)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-[oklch(0.40_0.01_65)] flex items-center justify-center text-[oklch(0.65_0.01_80)] hover:border-[oklch(0.55_0.13_38)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-[oklch(0.97_0.015_80)] text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {t.footer.services}
            </h4>
            <ul className="space-y-3">
              {["Apartment Rentals", "Buy a Home", "Sell a Home", "Property Management", "International Listings", "Resort Investments", "Asset Management", "Acquisitions"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[oklch(0.65_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4
              className="text-[oklch(0.97_0.015_80)] text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {t.footer.areas}
            </h4>
            <ul className="space-y-3">
              {["Newark, NJ", "Jersey City, NJ", "East Orange, NJ", "Elizabeth, NJ", "Orange, NJ", "New York City, NY", "Brooklyn, NY", "International Markets"].map((area) => (
                <li key={area}>
                  <span className="text-sm text-[oklch(0.65_0.01_80)]">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[oklch(0.97_0.015_80)] text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {t.footer.contact}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:8623331681"
                  className="flex items-start gap-3 text-sm text-[oklch(0.65_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                >
                  <Phone size={14} className="mt-0.5 shrink-0" />
                  (862) 333-1681
                </a>
              </li>
              <li>
                <a
                  href="mailto:inquiries@rosaliagroup.com"
                  className="flex items-start gap-3 text-sm text-[oklch(0.65_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                >
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  inquiries@rosaliagroup.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-[oklch(0.65_0.01_80)]">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  Newark, NJ
                </div>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-[oklch(0.32_0.01_65)]">
              <p className="text-xs text-[oklch(0.50_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
                Mon–Fri 9am–6pm<br />
                Sat–Sun 10am–5pm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[oklch(0.32_0.01_65)]">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[oklch(0.45_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
            © {currentYear} Rosalia Group. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link href={PRIVACY_POLICY_PATH} className="text-xs text-[oklch(0.45_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors" style={{ fontFamily: "'Space Mono', monospace" }}>
              Privacy Policy
            </Link>
            <Link href={TERMS_PATH} className="text-xs text-[oklch(0.45_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors" style={{ fontFamily: "'Space Mono', monospace" }}>
              Terms &amp; Conditions
            </Link>
            <span className="text-xs text-[oklch(0.45_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
              SBE &amp; MWBE Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
