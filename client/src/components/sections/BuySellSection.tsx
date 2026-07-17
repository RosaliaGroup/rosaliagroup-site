/*
 * ROSALIA GROUP — Buy & Sell Section
 * Design: Urban Warmth / Warm Brutalism
 * - Dark charcoal background with warm accents
 * - i18n: reads from global LanguageContext
 */

import { useEffect, useRef, useState } from "react";
import { Search, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BUY_SELL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663360032476/guxaFoxGN7JgksYjUwZfPH/hero-buy-sell-6oseHqi4UmWG5M6qJUmyfv.webp";

const buyerBenefits = [
  "Access to live Bright MLS listings updated daily",
  "Licensed NJ & NY realtors with local market expertise",
  "Guidance from first showing through closing day",
  "Mortgage pre-approval assistance & referrals",
  "Neighborhood insights across NJ & NY markets",
];

const sellerBenefits = [
  "Free comparative market analysis (CMA)",
  "Professional photography & listing preparation",
  "Strategic pricing to maximize your return",
  "Negotiation expertise on your behalf",
  "Seamless coordination from listing to close",
];

export default function BuySellSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const benefits =
    activeTab === "buy"
      ? (t.extra.buySell.buyerBenefits ?? buyerBenefits)
      : (t.extra.buySell.sellerBenefits ?? sellerBenefits);

  return (
    <section id="buy-sell" ref={sectionRef} className="bg-[oklch(0.22_0.01_65)] py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="reveal">
              <span className="section-label text-[oklch(0.55_0.13_38)] mb-4 block">{t.buySell.tag}</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.buySell.heading1}
                <br />
                <em className="italic text-[oklch(0.72_0.10_38)]">{t.buySell.heading2}</em>
              </h2>
              <p className="text-[oklch(0.65_0.01_80)] text-base leading-relaxed mb-8">
                {activeTab === "buy" ? t.buySell.buySub : t.buySell.sellSub}
              </p>
            </div>

            {/* Search Bar */}
            <div className="reveal mb-8">
              <div className="flex gap-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.buySell.searchPlaceholder}
                  className="flex-1 bg-[oklch(0.32_0.01_65)] text-white placeholder-[oklch(0.50_0.01_80)] px-4 py-3.5 text-sm border border-[oklch(0.40_0.01_65)] focus:outline-none focus:border-[oklch(0.55_0.13_38)] transition-colors"
                />
                <button
                  className="bg-[oklch(0.55_0.13_38)] text-white px-5 py-3.5 hover:bg-[oklch(0.65_0.12_38)] transition-colors flex items-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em" }}
                >
                  <Search size={14} />
                  {t.buySell.searchBtn}
                </button>
              </div>
              <p className="text-xs text-[oklch(0.45_0.01_80)] mt-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                {t.extra.buySell.attribution}
              </p>
            </div>

            {/* Tabs */}
            <div className="reveal">
              <div className="flex gap-0 mb-6 border border-[oklch(0.40_0.01_65)]">
                {(["buy", "sell"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-xs tracking-widest uppercase transition-colors ${activeTab === tab ? "bg-[oklch(0.55_0.13_38)] text-white" : "text-[oklch(0.55_0.01_80)] hover:text-white"}`}
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {tab === "buy" ? t.buySell.buyTab : t.buySell.sellTab}
                  </button>
                ))}
              </div>

              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[oklch(0.55_0.13_38)] mt-0.5 shrink-0" />
                    <span className="text-sm text-[oklch(0.75_0.01_80)] leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a href="#contact" className="btn-outline-light">
                  {activeTab === "buy" ? t.buySell.buyBtn : t.buySell.sellBtn}
                </a>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="reveal relative">
            <div className="relative overflow-hidden" style={{ height: "520px" }}>
              <img src={BUY_SELL_IMAGE} alt={t.extra.buySell.imageAlt} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 right-6 bg-[oklch(0.22_0.01_65/0.9)] backdrop-blur-sm p-5 border-l-4 border-[oklch(0.55_0.13_38)]">
                <div className="text-xs text-[oklch(0.55_0.13_38)] tracking-widest uppercase mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>{t.extra.buySell.mlsPowered}</div>
                <p className="text-white text-sm font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t.extra.buySell.mlsSub}
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[oklch(0.55_0.13_38/0.3)] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
