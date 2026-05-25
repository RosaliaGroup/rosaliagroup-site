/*
 * ROSALIA GROUP — Rentals Section
 * Design: Urban Warmth / Warm Brutalism
 * - Featured rental property cards
 * - Warm parchment-dark background
 * - Each property card has distinct style per Building Style Preference
 */

import { useEffect, useRef } from "react";
import { Bed, Bath, Square, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Each property uses a distinct image and style
const rentals = [
  {
    id: 1,
    name: "Iron Pointe",
    location: "Jersey City, NJ",
    price: "$2,200",
    period: "/ mo",
    beds: 1,
    baths: 1,
    sqft: 650,
    status: "Available",
    tag: "Featured",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    style: {
      accent: "oklch(0.55 0.13 38)",
      label: "Modern High-Rise",
    },
  },
  {
    id: 2,
    name: "Madison Street",
    location: "Newark, NJ",
    price: "$2,800",
    period: "/ mo",
    beds: 2,
    baths: 1,
    sqft: 850,
    status: "Available",
    tag: "New Listing",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    style: {
      accent: "oklch(0.52 0.07 130)",
      label: "Classic Brownstone",
    },
  },
  {
    id: 3,
    name: "Market Street",
    location: "East Orange, NJ",
    price: "$3,400",
    period: "/ mo",
    beds: 3,
    baths: 2,
    sqft: 1100,
    status: "Available",
    tag: "Spacious",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    style: {
      accent: "oklch(0.72 0.10 38)",
      label: "Urban Townhouse",
    },
  },
];

export default function RentalsSection() {
  const { t } = useLanguage();
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
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="rentals" ref={sectionRef} className="bg-[oklch(0.93_0.018_80)] py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label mb-3 block">{t.rentals.tag}</span>
            <h2
              className="text-4xl lg:text-5xl font-bold text-[oklch(0.22_0.01_65)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.rentals.heading}
            </h2>
          </div>
          <a href="#contact" className="btn-primary shrink-0">
            {t.rentals.bookTour}
          </a>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rentals.map((rental, index) => (
            <div
              key={rental.id}
              className="reveal property-card"
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={rental.image}
                  alt={rental.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 text-xs text-white tracking-widest uppercase"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      backgroundColor: rental.style.accent,
                    }}
                  >
                    {rental.tag}
                  </span>
                </div>
                {/* Status */}
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 text-xs text-white tracking-widest uppercase bg-[oklch(0.22_0.01_65/0.8)]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {rental.status}
                  </span>
                </div>
                {/* Style Label */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-[oklch(0.22_0.01_65/0.7)] to-transparent">
                  <span
                    className="text-xs text-white/80 tracking-widest uppercase"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {rental.style.label}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="text-2xl font-bold text-[oklch(0.22_0.01_65)]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {rental.price}
                  </span>
                  <span className="text-sm text-[oklch(0.55_0.02_65)]">{rental.period}</span>
                </div>

                {/* Name & Location */}
                <h3
                  className="text-lg font-semibold text-[oklch(0.22_0.01_65)] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {rental.name}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-[oklch(0.55_0.02_65)] mb-4">
                  <MapPin size={12} />
                  {rental.location}
                </div>

                {/* Divider */}
                <div className="border-t border-[oklch(0.87_0.02_80)] mb-4" />

                {/* Details */}
                <div className="flex items-center gap-4 text-xs text-[oklch(0.50_0.02_65)] mb-5" style={{ fontFamily: "'Space Mono', monospace" }}>
                  <span className="flex items-center gap-1.5">
                    <Bed size={12} />
                    {rental.beds} {t.rentals.bed}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath size={12} />
                    {rental.baths} {t.rentals.bath}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Square size={12} />
                    {rental.sqft} {t.rentals.sqft}
                  </span>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="flex items-center justify-between w-full px-4 py-3 border border-[oklch(0.22_0.01_65)] text-xs tracking-widest uppercase text-[oklch(0.22_0.01_65)] hover:bg-[oklch(0.22_0.01_65)] hover:text-[oklch(0.97_0.015_80)] transition-all group"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {t.rentals.scheduleTour}
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="reveal text-center mt-10">
          <a href="#contact" className="btn-outline">
            {t.rentals.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}
