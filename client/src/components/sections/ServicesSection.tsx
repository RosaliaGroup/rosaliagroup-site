/*
 * ROSALIA GROUP — Services Section
 * Design: Urban Warmth / Warm Brutalism
 * - Three service cards: Rentals, Buy & Sell, Property Management
 * - i18n: reads from global LanguageContext
 */

import { useEffect, useRef } from "react";
import { ArrowRight, Home, TrendingUp, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const INTERIOR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663360032476/guxaFoxGN7JgksYjUwZfPH/hero-apartment-interior-EGvvKtvHejhoBsHDM7rN3e.webp";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const services = [
    { number: "01", icon: Home, title: t.services.s1title, subtitle: t.hero.browse, description: t.services.s1desc, cta: t.services.s1cta, href: "#rentals", accent: "terracotta" },
    { number: "02", icon: TrendingUp, title: t.services.s2title, subtitle: t.nav.buySell, description: t.services.s2desc, cta: t.services.s2cta, href: "#buy-sell", accent: "olive" },
    { number: "03", icon: Building2, title: t.services.s3title, subtitle: t.management.tag, description: t.services.s3desc, cta: t.services.s3cta, href: "#management", accent: "charcoal" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); },
      { threshold: 0.15 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="bg-[oklch(0.97_0.015_80)] py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <div className="reveal">
              <span className="section-label mb-4 block">{t.services.tag}</span>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[oklch(0.22_0.01_65)] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.services.heading1}
                <br />
                <em className="italic text-[oklch(0.55_0.13_38)]">{t.services.heading2}</em>
              </h2>
            </div>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <div className="reveal">
              <p className="text-[oklch(0.50_0.02_65)] text-base leading-relaxed mb-6">{t.services.sub}</p>
              <a href="#contact" className="btn-outline">{t.services.cta}</a>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[oklch(0.87_0.02_80)]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLast = index === services.length - 1;
            return (
              <div key={service.number} className={`reveal property-card p-8 lg:p-10 ${!isLast ? "border-b md:border-b-0 md:border-r border-[oklch(0.87_0.02_80)]" : ""}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="text-7xl font-bold text-[oklch(0.93_0.018_80)] leading-none mb-6 select-none" style={{ fontFamily: "'Playfair Display', serif" }}>{service.number}</div>
                <div className={`w-10 h-10 flex items-center justify-center mb-5 ${service.accent === "terracotta" ? "bg-[oklch(0.55_0.13_38)]" : service.accent === "olive" ? "bg-[oklch(0.52_0.07_130)]" : "bg-[oklch(0.22_0.01_65)]"}`}>
                  <Icon size={18} className="text-white" />
                </div>
                <span className="section-label mb-2 block">{service.subtitle}</span>
                <h3 className="text-xl lg:text-2xl font-bold text-[oklch(0.22_0.01_65)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
                <p className="text-[oklch(0.50_0.02_65)] text-sm leading-relaxed mb-8">{service.description}</p>
                <a href={service.href} className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[oklch(0.22_0.01_65)] hover:text-[oklch(0.55_0.13_38)] transition-colors group" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {service.cta}<ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Interior Image Banner */}
        <div className="reveal mt-12 relative overflow-hidden" style={{ height: "320px" }}>
          <img src={INTERIOR_IMAGE} alt="Luxury apartment interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center" style={{ background: "linear-gradient(to right, oklch(0.22 0.01 65 / 0.85) 0%, oklch(0.22 0.01 65 / 0.3) 60%, transparent 100%)" }}>
            <div className="px-10 lg:px-16 max-w-lg">
              <span className="section-label text-[oklch(0.55_0.13_38)] mb-3 block">{t.extra.services.womanRun}</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.services.certBadge}
              </h3>
              <p className="text-[oklch(0.75_0.01_80)] text-sm mt-3 leading-relaxed">{t.services.certSub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
