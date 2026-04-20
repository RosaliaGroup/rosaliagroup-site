/*
 * ROSALIA GROUP — Services Section
 * Design: Urban Warmth / Warm Brutalism
 * - Three service cards: Rentals, Buy & Sell, Property Management
 * - Asymmetric layout with large numbered labels
 * - Warm parchment background
 */

import { useEffect, useRef } from "react";
import { ArrowRight, Home, TrendingUp, Building2 } from "lucide-react";

const INTERIOR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663360032476/guxaFoxGN7JgksYjUwZfPH/hero-apartment-interior-EGvvKtvHejhoBsHDM7rN3e.webp";

const services = [
  {
    number: "01",
    icon: Home,
    title: "Apartment Rentals",
    subtitle: "Find Your Next Home",
    description:
      "Studio to four-bedroom apartments across Newark, Jersey City, East Orange, Elizabeth, New York City, Brooklyn, and the Bronx. We match you with the right space, handle the paperwork, and get you moved in fast.",
    cta: "View Rentals",
    href: "#rentals",
    accent: "terracotta",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Buy & Sell",
    subtitle: "Expert Guidance",
    description:
      "Licensed NJ & NY realtors guiding buyers and sellers from first showing to closing day. Search live Bright MLS listings and get expert negotiation support every step of the way.",
    cta: "Search Listings",
    href: "#buy-sell",
    accent: "olive",
  },
  {
    number: "03",
    icon: Building2,
    title: "Property Management",
    subtitle: "Hands-Free Ownership",
    description:
      "Full-service management for landlords and investors. Tenant screening, rent collection, 24/7 maintenance coordination, and monthly financial reporting — we handle everything.",
    cta: "Learn More",
    href: "#management",
    accent: "charcoal",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
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
              <span className="section-label mb-4 block">What We Offer</span>
              <h2
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[oklch(0.22_0.01_65)] leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Full-Service Real Estate
                <br />
                <em className="italic text-[oklch(0.55_0.13_38)]">in NJ & NY</em>
              </h2>
            </div>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <div className="reveal">
              <p className="text-[oklch(0.50_0.02_65)] text-base leading-relaxed mb-6">
                Whether you're renting, buying, selling, or investing — Rosalia Group brings local expertise, personal attention, and proven results to every transaction.
              </p>
              <a href="#contact" className="btn-outline">
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[oklch(0.87_0.02_80)]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLast = index === services.length - 1;
            return (
              <div
                key={service.number}
                className={`reveal property-card p-8 lg:p-10 ${
                  !isLast ? "border-b md:border-b-0 md:border-r border-[oklch(0.87_0.02_80)]" : ""
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Number */}
                <div
                  className="text-7xl font-bold text-[oklch(0.93_0.018_80)] leading-none mb-6 select-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.number}
                </div>

                {/* Icon */}
                <div
                  className={`w-10 h-10 flex items-center justify-center mb-5 ${
                    service.accent === "terracotta"
                      ? "bg-[oklch(0.55_0.13_38)]"
                      : service.accent === "olive"
                      ? "bg-[oklch(0.52_0.07_130)]"
                      : "bg-[oklch(0.22_0.01_65)]"
                  }`}
                >
                  <Icon size={18} className="text-white" />
                </div>

                {/* Text */}
                <span className="section-label mb-2 block">{service.subtitle}</span>
                <h3
                  className="text-xl lg:text-2xl font-bold text-[oklch(0.22_0.01_65)] mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-[oklch(0.50_0.02_65)] text-sm leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* CTA */}
                <a
                  href={service.href}
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[oklch(0.22_0.01_65)] hover:text-[oklch(0.55_0.13_38)] transition-colors group"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {service.cta}
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            );
          })}
        </div>

        {/* Interior Image Banner */}
        <div className="reveal mt-12 relative overflow-hidden" style={{ height: "320px" }}>
          <img
            src={INTERIOR_IMAGE}
            alt="Luxury apartment interior"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center"
            style={{
              background:
                "linear-gradient(to right, oklch(0.22 0.01 65 / 0.85) 0%, oklch(0.22 0.01 65 / 0.3) 60%, transparent 100%)",
            }}
          >
            <div className="px-10 lg:px-16 max-w-lg">
              <span className="section-label text-[oklch(0.55_0.13_38)] mb-3 block">Woman-Run · Family Business</span>
              <h3
                className="text-3xl lg:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                SBE &amp; MWBE
                <br />
                <em className="italic">Certified</em>
              </h3>
              <p className="text-[oklch(0.75_0.01_80)] text-sm mt-3 leading-relaxed">
                Proudly serving the New Jersey and New York communities with integrity, expertise, and a personal touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
