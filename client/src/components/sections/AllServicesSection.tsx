/*
 * ROSALIA GROUP — All Services Section
 * Design: Urban Warmth / Warm Brutalism
 * Full expanded services grid covering:
 * - Apartment Rentals
 * - Sales (Buy & Sell)
 * - Property Management
 * - Asset Management
 * - International Property Management
 * - Acquisitions
 * - Consulting / Project Maximization
 * - Tenant Placement
 * - Relocation Assistance
 * - Investment Portfolio Analysis
 * - Commercial Real Estate
 * - Home Staging & Renovation Referrals
 */

import { useEffect, useRef, useState } from "react";
import {
  Home,
  TrendingUp,
  Building2,
  BarChart3,
  Globe,
  ShoppingBag,
  Lightbulb,
  Users,
  MapPin,
  PieChart,
  Briefcase,
  Paintbrush,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ALL_SERVICES = [
  {
    id: "rentals",
    icon: Home,
    number: "01",
    title: "Apartment Rentals",
    tagline: "Find Your Perfect Home",
    accent: "oklch(0.55 0.13 38)",
    shortDesc:
      "Studio to four-bedroom apartments across Newark, Jersey City, East Orange, Elizabeth, and Orange.",
    details: [
      "Curated listings updated daily across 5 New Jersey cities",
      "Studio, 1BR, 2BR, 3BR, and 4BR options available",
      "Flexible lease terms — short-term and long-term",
      "Full application support and lease signing assistance",
      "Move-in coordination and tenant onboarding",
      "Pet-friendly and accessible units available",
    ],
  },
  {
    id: "sales",
    icon: TrendingUp,
    number: "02",
    title: "Buy & Sell Real Estate",
    tagline: "Expert NJ Realtors",
    accent: "oklch(0.52 0.07 130)",
    shortDesc:
      "Licensed NJ realtors guiding buyers and sellers from first showing to closing day with Bright MLS access.",
    details: [
      "Live Bright MLS listings — thousands of NJ properties",
      "Buyer representation from search to closing",
      "Seller services: pricing, staging, marketing, negotiation",
      "Free comparative market analysis (CMA) for sellers",
      "Mortgage pre-approval referrals and lender connections",
      "First-time homebuyer guidance and education",
    ],
  },
  {
    id: "property-management",
    icon: Building2,
    number: "03",
    title: "Property Management",
    tagline: "Hands-Free Ownership",
    accent: "oklch(0.40 0.06 240)",
    shortDesc:
      "Full-service management for landlords — tenant screening, rent collection, maintenance, and monthly reporting.",
    details: [
      "Comprehensive tenant screening and placement",
      "Automated rent collection with direct deposit",
      "24/7 emergency maintenance coordination",
      "Monthly financial statements and owner portal",
      "Lease renewals, rent increases, and eviction support",
      "Move-in/move-out inspections with photo documentation",
    ],
  },
  {
    id: "asset-management",
    icon: BarChart3,
    number: "04",
    title: "Asset Management",
    tagline: "Maximize Your Portfolio",
    accent: "oklch(0.55 0.13 38)",
    shortDesc:
      "Strategic oversight of real estate assets to optimize performance, reduce costs, and grow long-term value.",
    details: [
      "Portfolio performance analysis and benchmarking",
      "Capital expenditure planning and budgeting",
      "Value-add strategy development for underperforming assets",
      "Lease optimization and tenant mix analysis",
      "Risk assessment and mitigation planning",
      "Quarterly and annual investor reporting",
    ],
  },
  {
    id: "international",
    icon: Globe,
    number: "05",
    title: "International Property Management",
    tagline: "Global Reach, Local Expertise",
    accent: "oklch(0.52 0.07 130)",
    shortDesc:
      "End-to-end management for international investors and property owners with assets in the New Jersey market.",
    details: [
      "Dedicated point of contact for overseas investors",
      "Multi-currency reporting and wire transfer coordination",
      "Compliance with US tax regulations (FIRPTA, 1031 exchanges)",
      "Remote property oversight with regular video updates",
      "Legal and title coordination with international partners",
      "Bilingual support available (Spanish, Portuguese)",
    ],
  },
  {
    id: "acquisitions",
    icon: ShoppingBag,
    number: "06",
    title: "Acquisitions",
    tagline: "Identify & Secure Opportunities",
    accent: "oklch(0.40 0.06 240)",
    shortDesc:
      "End-to-end acquisition support — from sourcing off-market deals to due diligence, financing, and closing.",
    details: [
      "Off-market deal sourcing across New Jersey",
      "Investment property underwriting and analysis",
      "Due diligence coordination (inspections, title, zoning)",
      "Financing strategy and lender introductions",
      "Negotiation and contract management",
      "Post-acquisition transition and onboarding",
    ],
  },
  {
    id: "consulting",
    icon: Lightbulb,
    number: "07",
    title: "Consulting & Project Maximization",
    tagline: "Unlock Your Property's Potential",
    accent: "oklch(0.55 0.13 38)",
    shortDesc:
      "Strategic consulting to help owners, developers, and investors maximize ROI on every real estate project.",
    details: [
      "Feasibility studies and highest-and-best-use analysis",
      "Development and renovation ROI projections",
      "Repositioning strategies for underperforming properties",
      "Market entry and exit timing recommendations",
      "Operational efficiency audits for existing portfolios",
      "Custom reporting and KPI dashboards for stakeholders",
    ],
  },
  {
    id: "tenant-placement",
    icon: Users,
    number: "08",
    title: "Tenant Placement",
    tagline: "Find the Right Tenant, Fast",
    accent: "oklch(0.52 0.07 130)",
    shortDesc:
      "One-time tenant sourcing and screening service for landlords who self-manage but need qualified tenants.",
    details: [
      "Professional listing creation and marketing",
      "Showing coordination and applicant screening",
      "Full background, credit, and reference checks",
      "Lease preparation and execution support",
      "Move-in documentation and key handover",
      "No ongoing management fee — pay once, manage yourself",
    ],
  },
  {
    id: "relocation",
    icon: MapPin,
    number: "09",
    title: "Relocation Assistance",
    tagline: "Seamless Moves to New Jersey",
    accent: "oklch(0.40 0.06 240)",
    shortDesc:
      "Concierge relocation services for individuals, families, and corporate clients moving to or within New Jersey.",
    details: [
      "Neighborhood matching based on lifestyle and budget",
      "Virtual and in-person property tours",
      "School district and commute analysis",
      "Temporary housing and short-term rental coordination",
      "Utility setup, moving vendor referrals, and local guides",
      "Corporate relocation packages for HR departments",
    ],
  },
  {
    id: "investment",
    icon: PieChart,
    number: "10",
    title: "Investment Portfolio Analysis",
    tagline: "Data-Driven Investment Decisions",
    accent: "oklch(0.55 0.13 38)",
    shortDesc:
      "In-depth analysis of your real estate investment portfolio to identify strengths, gaps, and growth opportunities.",
    details: [
      "Cash-on-cash return and cap rate analysis",
      "Debt service coverage and leverage review",
      "Comparative market analysis for each asset",
      "Diversification and risk exposure assessment",
      "1031 exchange planning and identification",
      "Custom investment roadmap for 1, 3, and 5-year horizons",
    ],
  },
  {
    id: "commercial",
    icon: Briefcase,
    number: "11",
    title: "Commercial Real Estate",
    tagline: "Office, Retail & Industrial",
    accent: "oklch(0.52 0.07 130)",
    shortDesc:
      "Leasing, sales, and management of commercial properties including office, retail, mixed-use, and industrial assets.",
    details: [
      "Commercial tenant sourcing and lease negotiation",
      "Office, retail, and industrial property sales",
      "Mixed-use development consulting",
      "NNN and gross lease structuring",
      "Commercial property management and CAM reconciliation",
      "Zoning analysis and entitlement support",
    ],
  },
  {
    id: "staging",
    icon: Paintbrush,
    number: "12",
    title: "Home Staging & Renovation",
    tagline: "Present Your Property at Its Best",
    accent: "oklch(0.40 0.06 240)",
    shortDesc:
      "Professional staging consultation and trusted renovation referrals to maximize your property's appeal and sale price.",
    details: [
      "Pre-listing staging consultation and furniture sourcing",
      "Virtual staging for vacant properties",
      "Trusted contractor network for renovations and repairs",
      "Cost-vs-value analysis for renovation projects",
      "Photography and videography coordination",
      "Digital marketing package for staged listings",
    ],
  },
];

export default function AllServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="all-services" ref={sectionRef} className="bg-[oklch(0.97_0.015_80)] py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="reveal mb-14">
          <span className="section-label mb-4 block">{t.allServices.tag}</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h2
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[oklch(0.22_0.01_65)] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.allServices.heading1}
              <br />
              <em className="italic text-[oklch(0.55_0.13_38)]">{t.allServices.heading2}</em>
            </h2>
            <p className="text-[oklch(0.50_0.02_65)] text-base leading-relaxed">
              {t.allServices.sub}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[oklch(0.87_0.02_80)]">
          {ALL_SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedId === service.id;
            const copy = t.extra.allSvc.items[service.id] ?? service;

            return (
              <div
                key={service.id}
                className="reveal bg-[oklch(0.97_0.015_80)] p-6 lg:p-8 flex flex-col group cursor-pointer hover:bg-white transition-colors duration-200"
                style={{ transitionDelay: `${(index % 6) * 0.06}s` }}
                onClick={() => setExpandedId(isExpanded ? null : service.id)}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: service.accent }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <span
                    className="text-4xl font-bold text-[oklch(0.91_0.018_80)] leading-none select-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Label */}
                <span
                  className="text-[0.65rem] tracking-widest uppercase mb-1.5"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    color: service.accent,
                  }}
                >
                  {copy.tagline}
                </span>

                {/* Title */}
                <h3
                  className="text-lg font-bold text-[oklch(0.22_0.01_65)] mb-3 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {copy.title}
                </h3>

                {/* Short desc */}
                <p className="text-sm text-[oklch(0.50_0.02_65)] leading-relaxed mb-4 flex-1">
                  {copy.shortDesc}
                </p>

                {/* Expand toggle */}
                <button
                  className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors mt-auto"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    color: isExpanded ? service.accent : "oklch(0.22 0.01 65)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(isExpanded ? null : service.id);
                  }}
                >
                  {isExpanded ? t.allServices.showLess : t.allServices.learnMore}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[oklch(0.87_0.02_80)]">
                    <ul className="space-y-2">
                      {copy.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[oklch(0.40_0.02_65)] leading-relaxed">
                          <span
                            className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: service.accent }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 mt-4 text-xs tracking-widest uppercase transition-colors group/cta"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        color: service.accent,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t.extra.allSvc.getStarted}
                      <ArrowRight size={11} className="transition-transform group-hover/cta:translate-x-1" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="reveal mt-12 bg-[oklch(0.22_0.01_65)] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div
              className="text-xs text-[oklch(0.55_0.13_38)] tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {t.allServices.ctaTitle}
            </div>
            <h3
              className="text-2xl lg:text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.allServices.ctaSub}
            </h3>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="#contact" className="btn-outline-light">
              {t.allServices.ctaBtn1}
            </a>
            <a href="tel:8623331681" className="btn-primary">
              {t.allServices.ctaBtn2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
