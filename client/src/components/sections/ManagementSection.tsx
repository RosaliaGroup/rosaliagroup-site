/*
 * ROSALIA GROUP — Property Management Section
 * Design: Urban Warmth / Warm Brutalism
 * - Warm parchment background
 * - Feature list with terracotta accents
 * - Stats grid with large Playfair Display numbers
 */

import { useEffect, useRef } from "react";
import { Users, DollarSign, Wrench, BarChart3, FileText, Eye, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MGMT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663360032476/guxaFoxGN7JgksYjUwZfPH/hero-property-management-g3Ji6BMJhFWRVkmDNQ8odn.webp";

const features = [
  {
    icon: Users,
    title: "Tenant Screening & Placement",
    description: "Thorough background checks, credit verification, and reference checks to find reliable, long-term tenants.",
  },
  {
    icon: DollarSign,
    title: "Rent Collection & Disbursement",
    description: "Automated rent collection with direct deposit to your account, plus late fee enforcement.",
  },
  {
    icon: Wrench,
    title: "24/7 Maintenance Coordination",
    description: "Round-the-clock emergency response and a trusted network of licensed contractors.",
  },
  {
    icon: BarChart3,
    title: "Monthly Financial Reporting",
    description: "Detailed income and expense statements, owner portal access, and year-end tax documents.",
  },
  {
    icon: FileText,
    title: "Lease Renewals & Eviction Support",
    description: "Proactive lease renewal management and full legal support when eviction becomes necessary.",
  },
  {
    icon: Eye,
    title: "Regular Property Inspections",
    description: "Scheduled move-in, move-out, and periodic inspections with detailed photo reports.",
  },
];

const stats = [
  { value: "98%", label: "Occupancy Rate", sub: "Across all managed units" },
  { value: "200+", label: "Units Managed", sub: "Across NJ & NY" },
  { value: "10+", label: "Years Experience", sub: "Across NJ & NY markets" },
  { value: "24/7", label: "Maintenance", sub: "Emergency response" },
];

export default function ManagementSection() {
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
    <section id="management" ref={sectionRef} className="bg-[oklch(0.97_0.015_80)] py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="reveal mb-14">
          <span className="section-label mb-4 block">{t.management.tag}</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h2
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[oklch(0.22_0.01_65)] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.management.heading1}
              <br />
              <em className="italic text-[oklch(0.55_0.13_38)]">{t.management.heading2}</em>
            </h2>
            <div>
              <p className="text-[oklch(0.50_0.02_65)] text-base leading-relaxed mb-6">
                {t.management.sub}
              </p>
              <a href="#contact" className="btn-primary">
                {t.management.getStarted}
              </a>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-0 border border-[oklch(0.87_0.02_80)] mb-14">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 lg:p-8 ${i < stats.length - 1 ? "border-b lg:border-b-0" : ""} ${i < stats.length - 1 ? "lg:border-r border-[oklch(0.87_0.02_80)]" : ""}`}
            >
              <div
                className="text-4xl lg:text-5xl font-bold text-[oklch(0.55_0.13_38)] mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs text-[oklch(0.22_0.01_65)] tracking-widest uppercase mb-1"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {stat.label}
              </div>
              <div className="text-xs text-[oklch(0.55_0.02_65)]">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Features Grid + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Features */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="reveal flex gap-4"
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  >
                    <div className="w-9 h-9 bg-[oklch(0.93_0.018_80)] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-[oklch(0.55_0.13_38)]" />
                    </div>
                    <div>
                      <h4
                        className="text-sm font-semibold text-[oklch(0.22_0.01_65)] mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {feature.title}
                      </h4>
                      <p className="text-xs text-[oklch(0.55_0.02_65)] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="reveal lg:col-span-5">
            <div className="relative h-full min-h-[400px]">
              <img
                src={MGMT_IMAGE}
                alt="Property management building"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-8"
                style={{
                  background: "linear-gradient(to top, oklch(0.22 0.01 65 / 0.90) 0%, transparent 60%)",
                }}
              >
                <h3
                  className="text-2xl font-bold text-white mb-2 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  We handle everything
                  <br />
                  <em className="italic text-[oklch(0.72_0.10_38)]">so you don't have to</em>
                </h3>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[oklch(0.55_0.13_38)] hover:text-white transition-colors mt-3 group"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  Get Started
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
