/*
 * ROSALIA GROUP — CTA Banner
 * Design: Urban Warmth / Warm Brutalism
 * - Terracotta background, bold white text
 * - Horizontal layout with dual CTAs
 */

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    const elements = ref.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[oklch(0.55_0.13_38)] py-14 lg:py-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="reveal flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text */}
          <div>
            <div
              className="text-xs text-[oklch(0.85_0.06_38)] tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Ready to Get Started?
            </div>
            <h2
              className="text-3xl lg:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your next chapter in New Jersey
              <br />
              <em className="italic">begins with one call.</em>
            </h2>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="tel:8623331681"
              className="flex items-center gap-2 bg-white text-[oklch(0.22_0.01_65)] px-6 py-3.5 text-xs tracking-widest uppercase hover:bg-[oklch(0.93_0.018_80)] transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Call Now
              <ArrowRight size={12} />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 border border-white text-white px-6 py-3.5 text-xs tracking-widest uppercase hover:bg-white hover:text-[oklch(0.22_0.01_65)] transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Send a Message
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
