/*
 * ROSALIA GROUP — International & Resort Investment Section
 * Design: Urban Warmth / Warm Brutalism
 * - Deep ocean blue/teal accent to evoke international, coastal luxury
 * - Asymmetric editorial layout with full-bleed resort imagery
 * - Three sub-services: International Listings, Resort Investment, International Management
 */

import { useEffect, useRef } from "react";
import { Globe, TrendingUp, Building2, ArrowRight, CheckCircle2, MapPin } from "lucide-react";

const RESORT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663360032476/guxaFoxGN7JgksYjUwZfPH/resort-caribbean-gCiiBPMDJtXtPt4bybnapM.webp";
const INTERIOR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663360032476/guxaFoxGN7JgksYjUwZfPH/resort-interior-luxury-NsQXG22NDH2L9jbdtVEoiN.webp";

const destinations = [
  { region: "Caribbean", markets: "Dominican Republic, Puerto Rico, Jamaica, Turks & Caicos" },
  { region: "Latin America", markets: "Mexico, Costa Rica, Panama, Colombia, Brazil" },
  { region: "Europe", markets: "Spain, Portugal, Italy, Greece, France" },
  { region: "Asia Pacific", markets: "Bali, Thailand, Philippines, Maldives" },
];

const resortBenefits = [
  "Identify high-yield resort & vacation rental properties",
  "Due diligence, title search & legal coordination",
  "Rental income projections & ROI analysis",
  "Fractional ownership & co-investment structures",
  "Full property management after acquisition",
  "Currency & tax guidance with local partners",
];

const mgmtServices = [
  {
    icon: Globe,
    title: "International Listings",
    desc: "Buy, sell, or rent residential and commercial properties across 20+ countries. We source off-market deals and connect you with vetted local partners.",
  },
  {
    icon: TrendingUp,
    title: "Resort Investment",
    desc: "Identify, acquire, and profit from beachfront villas, resort condos, and vacation rental properties in the world's top tourist destinations.",
  },
  {
    icon: Building2,
    title: "International Management",
    desc: "End-to-end remote property management for international owners — tenant placement, maintenance coordination, rental income disbursement, and monthly reporting.",
  },
];

export default function InternationalSection() {
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
      { threshold: 0.08 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="international" ref={sectionRef} className="bg-[oklch(0.22_0.01_65)] py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <span
              className="text-[oklch(0.55_0.18_200)] text-xs tracking-widest uppercase mb-4 block"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Global Real Estate
            </span>
            <h2
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              International Listings
              <br />
              <em className="italic text-[oklch(0.65_0.18_200)]">&amp; Resort Investments</em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[oklch(0.65_0.01_80)] text-base leading-relaxed mb-6">
              Rosalia Group connects buyers and investors with premium properties across the Caribbean, Latin America, Europe, and Asia Pacific — including luxury resort villas, vacation rentals, and income-generating beachfront properties.
            </p>
            <a href="#contact" className="btn-outline-light">
              Explore International Listings
            </a>
          </div>
        </div>

        {/* Hero Image with Destination Tags */}
        <div className="reveal relative overflow-hidden mb-16" style={{ height: "480px" }}>
          <img
            src={RESORT_IMAGE}
            alt="Caribbean beachfront resort villas"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, oklch(0.22 0.01 65 / 0.80) 0%, oklch(0.22 0.01 65 / 0.20) 60%, transparent 100%)",
            }}
          />
          {/* Overlay content */}
          <div className="absolute inset-0 flex items-end p-8 lg:p-12">
            <div className="max-w-lg">
              <div
                className="text-xs text-[oklch(0.55_0.18_200)] tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Featured Destination
              </div>
              <h3
                className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Caribbean Beachfront
                <br />
                <em className="italic text-[oklch(0.72_0.15_200)]">Resort Villas</em>
              </h3>
              <p className="text-[oklch(0.75_0.01_80)] text-sm leading-relaxed mb-5">
                Luxury beachfront villas with private pools, direct ocean access, and proven rental income potential. Ideal for personal use and investment.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[oklch(0.55_0.18_200)] hover:text-white transition-colors group"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Inquire Now
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Destination tags — top right */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {destinations.map((d) => (
              <div
                key={d.region}
                className="flex items-center gap-2 bg-[oklch(0.22_0.01_65/0.85)] backdrop-blur-sm px-3 py-2 border-l-2 border-[oklch(0.55_0.18_200)]"
              >
                <MapPin size={10} className="text-[oklch(0.55_0.18_200)] shrink-0" />
                <span
                  className="text-xs text-white"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {d.region}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Three Service Cards */}
        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-0 border border-[oklch(0.35_0.01_65)] mb-16">
          {mgmtServices.map((service, i) => {
            const Icon = service.icon;
            const isLast = i === mgmtServices.length - 1;
            return (
              <div
                key={service.title}
                className={`p-8 lg:p-10 ${!isLast ? "border-b md:border-b-0 md:border-r border-[oklch(0.35_0.01_65)]" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-[oklch(0.30_0.06_200)] flex items-center justify-center mb-5">
                  <Icon size={18} className="text-[oklch(0.65_0.18_200)]" />
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-[oklch(0.60_0.01_80)] text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[oklch(0.55_0.18_200)] hover:text-white transition-colors group"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  Learn More
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Resort Investment Deep Dive */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative overflow-hidden" style={{ height: "460px" }}>
            <img
              src={INTERIOR_IMAGE}
              alt="Luxury resort villa interior with ocean view"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-8"
              style={{
                background: "linear-gradient(to top, oklch(0.22 0.01 65 / 0.90) 0%, transparent 60%)",
              }}
            >
              <div
                className="text-xs text-[oklch(0.55_0.18_200)] tracking-widest uppercase mb-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Resort Investment
              </div>
              <p
                className="text-white text-lg font-bold leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Own paradise.
                <br />
                <em className="italic text-[oklch(0.65_0.18_200)]">Earn while you're away.</em>
              </p>
            </div>
          </div>

          {/* Right: Benefits */}
          <div>
            <span
              className="text-[oklch(0.55_0.18_200)] text-xs tracking-widest uppercase mb-4 block"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Why Invest in Resort Properties
            </span>
            <h3
              className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Turn Vacation Homes
              <br />
              <em className="italic text-[oklch(0.65_0.18_200)]">Into Income Assets</em>
            </h3>
            <p className="text-[oklch(0.65_0.01_80)] text-sm leading-relaxed mb-8">
              Resort and vacation rental properties in top tourist destinations generate strong rental yields, benefit from rising tourism demand, and offer personal enjoyment alongside financial returns. Rosalia Group guides you through every step — from destination selection to acquisition and ongoing management.
            </p>

            <ul className="space-y-3 mb-8">
              {resortBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="text-[oklch(0.55_0.18_200)] mt-0.5 shrink-0" />
                  <span className="text-sm text-[oklch(0.75_0.01_80)] leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Destination grid */}
            <div className="grid grid-cols-2 gap-3">
              {destinations.map((d) => (
                <div
                  key={d.region}
                  className="p-4 border border-[oklch(0.35_0.01_65)] hover:border-[oklch(0.55_0.18_200)] transition-colors"
                >
                  <div
                    className="text-xs font-semibold text-[oklch(0.65_0.18_200)] tracking-wide uppercase mb-1"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {d.region}
                  </div>
                  <div className="text-xs text-[oklch(0.55_0.01_80)] leading-relaxed">{d.markets}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a href="#contact" className="btn-outline-light">
                Schedule a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
