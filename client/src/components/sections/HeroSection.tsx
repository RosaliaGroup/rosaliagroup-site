/*
 * ROSALIA GROUP — Hero Section
 * Design: Urban Warmth / Warm Brutalism
 * - Full-viewport cinematic background with NJ skyline
 * - Asymmetric layout: large display text left, stat card right
 * - Staggered entrance animations
 * - i18n: reads from global LanguageContext
 */

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSky from "@/components/hero/HeroSky";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const stats = [
    { value: t.hero.stat1, label: t.hero.stat1label },
    { value: t.hero.stat2, label: t.hero.stat2label },
    { value: t.hero.stat3, label: t.hero.stat3label },
    { value: t.hero.stat4, label: t.hero.stat4label },
  ];

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".hero-animate");
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(28px)";
      setTimeout(() => {
        item.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 200 + i * 120);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ isolation: "isolate", backgroundColor: "oklch(0.22 0.01 65)" }}
    >
      {/* Permanent daytime Newark skyline photograph (responsive AVIF/WebP/JPEG) */}
      <picture>
        <source
          type="image/avif"
          srcSet="/hero/newark-day-640.avif 640w, /hero/newark-day-1024.avif 1024w, /hero/newark-day-1600.avif 1600w, /hero/newark-day-2400.avif 2400w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/hero/newark-day-640.webp 640w, /hero/newark-day-1024.webp 1024w, /hero/newark-day-1600.webp 1600w, /hero/newark-day-2400.webp 2400w"
          sizes="100vw"
        />
        <img
          src="/hero/newark-day-2400.jpg"
          srcSet="/hero/newark-day-640.jpg 640w, /hero/newark-day-1024.jpg 1024w, /hero/newark-day-1600.jpg 1600w, /hero/newark-day-2400.jpg 2400w"
          sizes="100vw"
          alt="The Newark, New Jersey skyline across the Passaic River"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0, objectPosition: "center 38%" }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Dynamic sky: time-of-day tint + sun / moon over Newark (decorative) */}
      <HeroSky />

      {/* Localized bottom gradient behind the headline / stats / buttons (kept independent
          of the sky tint so the copy stays readable at every time of day; fades out before
          the top, where the sky and the adaptive nav scrim take over). */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to top, oklch(0.19 0.01 65 / 0.95) 0%, oklch(0.19 0.01 65 / 0.60) 44%, rgba(0,0,0,0) 82%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-7xl pb-16 lg:pb-24 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left: Main Text */}
          <div className="lg:col-span-7">
            <div className="hero-animate mb-4">
              <span
                className="text-[oklch(0.55_0.13_38)] text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {t.hero.tag}
              </span>
            </div>

            <h1
              className="hero-animate text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.0] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.hero.headline1}
              <br />
              {t.hero.headline2}{" "}
              <em className="italic text-[oklch(0.72_0.10_38)]">NJ & NY</em>
              <br />
              {t.hero.headline3}
            </h1>

            <p className="hero-animate text-[oklch(0.80_0.01_80)] text-lg leading-relaxed max-w-xl mb-8">
              {t.hero.sub}
            </p>

            <div className="hero-animate flex flex-wrap gap-4">
              <a href="#contact" className="btn-outline-light">
                {t.hero.bookTour}
              </a>
              <a href="#rentals" className="btn-outline-light">
                {t.hero.browse}
              </a>
            </div>
          </div>

          {/* Right: Stats Card */}
          <div className="hero-animate lg:col-span-5 lg:pl-8">
            <div className="bg-[oklch(0.97_0.015_80/0.08)] backdrop-blur-sm border border-white/10 p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-[oklch(0.55_0.13_38)] pl-4">
                    <div
                      className="text-3xl lg:text-4xl font-bold text-white mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[oklch(0.65_0.01_80)] text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-animate flex items-center gap-3 mt-12 text-[oklch(0.65_0.01_80)]">
          <div className="w-px h-10 bg-[oklch(0.55_0.13_38)]" />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {t.extra.common.scrollToExplore}
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </div>

      {/* City Tabs */}
      <div className="relative z-10 bg-[oklch(0.22_0.01_65/0.85)] backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-0 overflow-x-auto">
            {["Newark", "Jersey City", "East Orange", "Elizabeth", "Orange", "New York City", "Brooklyn", "Bronx"].map((city, i) => (
              <div
                key={city}
                className={`flex-shrink-0 px-5 py-3.5 text-xs tracking-widest uppercase cursor-pointer transition-colors ${
                  i === 0
                    ? "text-[oklch(0.55_0.13_38)] border-b-2 border-[oklch(0.55_0.13_38)]"
                    : "text-[oklch(0.55_0.01_80)] hover:text-[oklch(0.80_0.01_80)]"
                }`}
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
