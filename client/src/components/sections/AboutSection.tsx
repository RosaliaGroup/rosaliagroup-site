/*
 * ROSALIA GROUP — About Section
 * Design: Urban Warmth / Warm Brutalism
 * - Terracotta accent background
 * - About Ana Haynes and the company story
 * - Certifications and trust signals
 */

import { useEffect, useRef } from "react";
import { Award, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    quote: "Ana and her team made finding our apartment in Newark so easy. They were responsive, professional, and genuinely cared about finding us the right place.",
    author: "Maria T.",
    location: "Newark, NJ",
    rating: 5,
  },
  {
    quote: "Rosalia Group manages three of my properties. The monthly reports are detailed, maintenance issues are handled fast, and my occupancy has never been higher.",
    author: "James K.",
    location: "Jersey City, NJ",
    rating: 5,
  },
  {
    quote: "As a first-time homebuyer, I was nervous. Ana walked me through every step and we closed on our dream home in East Orange. Couldn't be happier.",
    author: "Priya S.",
    location: "East Orange, NJ",
    rating: 5,
  },
];

const certifications = [
  { label: "SBE Certified", sub: "Small Business Enterprise" },
  { label: "MWBE Certified", sub: "Minority & Women-Owned Business" },
  { label: "Bright MLS", sub: "Licensed NJ Realtors" },
  { label: "Realty Mark", sub: "Advantage Partner" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-[oklch(0.93_0.018_80)] py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left: Story */}
          <div className="lg:col-span-6">
            <div className="reveal">
              <span className="section-label mb-4 block">{t.about.tag}</span>
              <h2
                className="text-4xl lg:text-5xl font-bold text-[oklch(0.22_0.01_65)] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t.about.heading1}
                <br />
                <em className="italic text-[oklch(0.55_0.13_38)]">{t.about.heading2}</em>
              </h2>
              <div className="space-y-4 text-[oklch(0.45_0.02_65)] text-sm leading-relaxed">
                {t.extra.about.story.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="reveal mt-8 grid grid-cols-2 gap-3">
              {certifications.map((cert, certIndex) => (
                <div
                  key={cert.label}
                  className="flex items-start gap-3 p-4 bg-[oklch(0.97_0.015_80)] border border-[oklch(0.87_0.02_80)]"
                >
                  <Award size={16} className="text-[oklch(0.55_0.13_38)] mt-0.5 shrink-0" />
                  <div>
                    <div
                      className="text-xs font-semibold text-[oklch(0.22_0.01_65)] tracking-wide uppercase"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {cert.label}
                    </div>
                    <div className="text-xs text-[oklch(0.55_0.02_65)] mt-0.5">{t.extra.about.certSubs[certIndex] ?? cert.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Ana Haynes Card */}
          <div className="reveal lg:col-span-6">
            <div className="bg-[oklch(0.22_0.01_65)] p-8 lg:p-10">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 bg-[oklch(0.55_0.13_38)] flex items-center justify-center mb-6">
                <span
                  className="text-white text-3xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  A
                </span>
              </div>

              <div
                className="text-xs text-[oklch(0.55_0.13_38)] tracking-widest uppercase mb-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {t.about.founderTitle}
              </div>
              <h3
                className="text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ana Haynes
              </h3>
              <p className="text-[oklch(0.55_0.01_80)] text-sm mb-6">
                {t.extra.about.founderCred}
              </p>

              <blockquote
                className="text-[oklch(0.80_0.01_80)] text-base italic leading-relaxed mb-6 border-l-2 border-[oklch(0.55_0.13_38)] pl-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                &ldquo;{t.extra.about.mission}&rdquo;
              </blockquote>

              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="tel:2014496850"
                  className="text-[oklch(0.65_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}
                >
                  (201) 449-6850
                </a>
                <a
                  href="mailto:ana@rosaliagroup.com"
                  className="text-[oklch(0.65_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}
                >
                  ana@rosaliagroup.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="reveal mb-8">
            <span className="section-label mb-3 block">{t.extra.about.clientStories}</span>
            <h2
              className="text-3xl lg:text-4xl font-bold text-[oklch(0.22_0.01_65)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.about.testimonialsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="reveal bg-[oklch(0.97_0.015_80)] p-6 lg:p-8 border border-[oklch(0.87_0.02_80)]"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-[oklch(0.55_0.13_38)] fill-[oklch(0.55_0.13_38)]" />
                  ))}
                </div>

                <blockquote
                  className="text-[oklch(0.35_0.02_65)] text-sm leading-relaxed mb-5 italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  &ldquo;{t.extra.about.testimonials[index]?.quote ?? testimonial.quote}&rdquo;
                </blockquote>

                <div className="border-t border-[oklch(0.87_0.02_80)] pt-4">
                  <div
                    className="text-xs font-semibold text-[oklch(0.22_0.01_65)] tracking-wide"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-[oklch(0.55_0.02_65)]">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
