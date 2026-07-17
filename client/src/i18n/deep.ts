/**
 * Deep content dictionary — the marketing / body copy that was previously
 * hardcoded (in English) inside individual section components. It is layered on
 * top of the core `SiteTranslations` (see LanguageContext) through a single
 * global provider, so every route and shared component reads its text from one
 * place and stays consistent across navigation.
 *
 * English (`DEEP_EN`) is the source of truth. Per-language overrides live in
 * ./deep/<lang>.ts and are deep-merged onto English; anything a language has
 * not translated yet transparently falls back to English (never a crash), and
 * the coverage gaps are documented in the PR rather than shown as if they were
 * translated.
 */

/** Recursive partial — a locale may override any subset of the tree. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U[] // arrays are replaced wholesale, not merged element-by-element
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Deep-merge `override` onto `base`, returning a new object. Arrays and
 * primitives from `override` replace those in `base`; nested plain objects are
 * merged recursively. `base` is never mutated.
 */
export function deepMerge<T>(base: T, override?: DeepPartial<T>): T {
  if (override == null) return base;
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override as unknown as T) ?? base;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(override)) {
    const b = (base as Record<string, unknown>)[key];
    const o = (override as Record<string, unknown>)[key];
    if (o === undefined) continue;
    out[key] = isPlainObject(b) && isPlainObject(o)
      ? deepMerge(b, o as DeepPartial<typeof b>)
      : o;
  }
  return out as T;
}

// ── Deep content shape ────────────────────────────────────────────────────────
// Nested under a single `extra` namespace so it never collides with the core
// SiteTranslations top-level keys (services/about/contact/rentals/...).
export interface ExtraContent {
  services: { womanRun: string };
  buySell: {
    mlsPowered: string;
    mlsSub: string;
    buyerBenefits: string[];
    sellerBenefits: string[];
    attribution: string;
    imageAlt: string;
  };
  management: {
    bannerLine1: string;
    bannerLine2: string;
    stats: { label: string; sub: string }[];
    features: { title: string; description: string }[];
    imageAlt: string;
  };
  footer: { services: string[]; internationalMarkets: string };
  a11y: { selectLanguage: string; toggleMenu: string; openChat: string };
  chat: {
    assistantTitle: string;
    /** Opening question shown (and sent to the assistant) when a service is picked. */
    servicePrompts: {
      rentals: string; sales: string; intlListings: string; resort: string;
      propertyMgmt: string; intlMgmt: string; assetMgmt: string; acquisitions: string;
      consulting: string; tenantPlacement: string; relocation: string; investment: string;
      commercial: string; staging: string;
    };
    /** Shown when the assistant backend is unreachable. */
    connectionError: string;
  };
  about: {
    story: string[];
    founderCred: string;
    mission: string;
    clientStories: string;
    certSubs: string[];
    testimonials: { quote: string }[];
  };
  contact: {
    info: { phone: string; email: string; areas: string; hours: string; quickContact: string };
    successTitle: string;
    successBody: string;
    sendAnother: string;
    messagePlaceholder: string;
    placeholders: { firstName: string; lastName: string; email: string; phone: string };
    options: {
      rentals: string; buying: string; selling: string; propertyMgmt: string;
      assetMgmt: string; international: string; acquisitions: string; consulting: string;
      tenantPlacement: string; relocation: string; investment: string; commercial: string;
      staging: string; other: string;
    };
  };
  rentals: {
    tags: { featured: string; newListing: string; spacious: string };
    statusAvailable: string;
    styleLabels: { modernHighRise: string; classicBrownstone: string; urbanTownhouse: string };
  };
  allSvc: {
    getStarted: string;
    items: Record<string, { title: string; tagline: string; shortDesc: string; details: string[] }>;
  };
  intl: {
    tag: string;
    heading1: string;
    heading2: string;
    intro: string;
    exploreBtn: string;
    featuredDest: string;
    featuredHeading1: string;
    featuredHeading2: string;
    featuredDesc: string;
    inquireNow: string;
    cards: { title: string; desc: string }[];
    learnMore: string;
    resortInvestment: string;
    ownParadise1: string;
    ownParadise2: string;
    whyInvest: string;
    turnHomes1: string;
    turnHomes2: string;
    deepPara: string;
    benefits: string[];
    regions: string[];
    scheduleConsult: string;
    heroAlt: string;
    interiorAlt: string;
  };
  notFound: { code: string; title: string; body1: string; body2: string; goHome: string };
  common: { unexpectedError: string; scrollToExplore: string };
  legalUi: {
    lastUpdated: string;
    /** Shown on legal pages whose detailed body is not yet translated. */
    controllingNotice: string;
  };
}

// ── English source of truth ───────────────────────────────────────────────────
export const EXTRA_EN: ExtraContent = {
  services: {
    womanRun: "Woman-Run · Family Business",
  },
  buySell: {
    mlsPowered: "Bright MLS Powered",
    mlsSub: "Thousands of active listings across New Jersey and New York — updated daily.",
    buyerBenefits: [
      "Access to live Bright MLS listings updated daily",
      "Licensed NJ & NY realtors with local market expertise",
      "Guidance from first showing through closing day",
      "Mortgage pre-approval assistance & referrals",
      "Neighborhood insights across NJ & NY markets",
    ],
    sellerBenefits: [
      "Free comparative market analysis (CMA)",
      "Professional photography & listing preparation",
      "Strategic pricing to maximize your return",
      "Negotiation expertise on your behalf",
      "Seamless coordination from listing to close",
    ],
    attribution: "Powered by Bright MLS · Live listings updated daily",
    imageAlt: "New Jersey home for sale",
  },
  management: {
    bannerLine1: "We handle everything",
    bannerLine2: "so you don't have to",
    stats: [
      { label: "Occupancy Rate", sub: "Across all managed units" },
      { label: "Units Managed", sub: "Across NJ & NY" },
      { label: "Years Experience", sub: "Across NJ & NY markets" },
      { label: "Maintenance", sub: "Emergency response" },
    ],
    features: [
      { title: "Tenant Screening & Placement", description: "Thorough background checks, credit verification, and reference checks to find reliable, long-term tenants." },
      { title: "Rent Collection & Disbursement", description: "Automated rent collection with direct deposit to your account, plus late fee enforcement." },
      { title: "24/7 Maintenance Coordination", description: "Round-the-clock emergency response and a trusted network of licensed contractors." },
      { title: "Monthly Financial Reporting", description: "Detailed income and expense statements, owner portal access, and year-end tax documents." },
      { title: "Lease Renewals & Eviction Support", description: "Proactive lease renewal management and full legal support when eviction becomes necessary." },
      { title: "Regular Property Inspections", description: "Scheduled move-in, move-out, and periodic inspections with detailed photo reports." },
    ],
    imageAlt: "Property management building",
  },
  footer: {
    services: [
      "Apartment Rentals",
      "Buy a Home",
      "Sell a Home",
      "Property Management",
      "International Listings",
      "Resort Investments",
      "Asset Management",
      "Acquisitions",
    ],
    internationalMarkets: "International Markets",
  },
  a11y: {
    selectLanguage: "Select language",
    toggleMenu: "Toggle menu",
    openChat: "Open chat",
  },
  chat: {
    assistantTitle: "Rosalia Assistant",
    servicePrompts: {
      rentals: "Tell me about your apartment rental listings in New Jersey and New York.",
      sales: "I'm interested in buying or selling a home in New Jersey or New York.",
      intlListings: "I'm interested in international property listings. What countries do you cover?",
      resort: "Tell me about resort investment properties and how I can earn rental income.",
      propertyMgmt: "How does your property management service work for landlords?",
      intlMgmt: "I own a property overseas. How does your international property management work?",
      assetMgmt: "Can you explain your asset management services for real estate portfolios?",
      acquisitions: "I want to acquire investment properties. How can Rosalia Group help?",
      consulting: "Tell me about your consulting services for maximizing real estate project returns.",
      tenantPlacement: "I need help finding a qualified tenant. What does your placement service include?",
      relocation: "I'm relocating to New Jersey or New York. What relocation assistance do you provide?",
      investment: "I want an analysis of my real estate investment portfolio.",
      commercial: "I'm looking for commercial real estate services — office, retail, or industrial.",
      staging: "I need help staging my home for sale. What staging and renovation services do you offer?",
    },
    connectionError: "I'm having trouble connecting right now. Please contact us directly:\n\n📞 (862) 333-1681\n✉️ inquiries@rosaliagroup.com",
  },
  about: {
    story: [
      "Rosalia Group was founded with a simple mission: to be your trusted real estate partner in New Jersey, New York, and beyond. Led by Ana Haynes, a licensed NJ & NY realtor and property manager, we've built our reputation on honest advice, personal attention, and exceptional results.",
      "As a woman-run, family-owned business, we understand that real estate decisions are deeply personal. Whether you're searching for your first apartment, buying your dream home, or growing your investment portfolio — we treat every client like family.",
      "We proudly serve clients across New Jersey, New York, and international markets — from local apartment rentals to resort investment properties in the Caribbean, Latin America, and Europe.",
    ],
    founderCred: "Licensed NJ & NY Realtor · Realty Mark Advantage",
    mission:
      "My mission is to be your trusted real estate partner — providing exceptional service for buying, selling, and managing properties in New Jersey, New York, and internationally.",
    clientStories: "Client Stories",
    certSubs: [
      "Small Business Enterprise",
      "Minority & Women-Owned Business",
      "Licensed NJ Realtors",
      "Advantage Partner",
    ],
    testimonials: [
      { quote: "Ana and her team made finding our apartment in Newark so easy. They were responsive, professional, and genuinely cared about finding us the right place." },
      { quote: "Rosalia Group manages three of my properties. The monthly reports are detailed, maintenance issues are handled fast, and my occupancy has never been higher." },
      { quote: "As a first-time homebuyer, I was nervous. Ana walked me through every step and we closed on our dream home in East Orange. Couldn't be happier." },
    ],
  },
  contact: {
    info: {
      phone: "Phone",
      email: "Email",
      areas: "Areas Served",
      hours: "Hours",
      quickContact: "Quick Contact",
    },
    successTitle: "Message Sent!",
    successBody:
      "Thank you for reaching out. A member of the Rosalia Group team will follow up with you the same day.",
    sendAnother: "Send Another Message",
    messagePlaceholder: "Tell us what you're looking for…",
    placeholders: { firstName: "Ana", lastName: "Haynes", email: "you@email.com", phone: "(201) 555-1234" },
    options: {
      rentals: "Apartment Rentals",
      buying: "Buying a Home",
      selling: "Selling a Home",
      propertyMgmt: "Property Management",
      assetMgmt: "Asset Management",
      international: "International Property Management",
      acquisitions: "Acquisitions",
      consulting: "Consulting & Project Maximization",
      tenantPlacement: "Tenant Placement",
      relocation: "Relocation Assistance",
      investment: "Investment Portfolio Analysis",
      commercial: "Commercial Real Estate",
      staging: "Home Staging & Renovation",
      other: "Other / General Inquiry",
    },
  },
  rentals: {
    tags: { featured: "Featured", newListing: "New Listing", spacious: "Spacious" },
    statusAvailable: "Available",
    styleLabels: {
      modernHighRise: "Modern High-Rise",
      classicBrownstone: "Classic Brownstone",
      urbanTownhouse: "Urban Townhouse",
    },
  },
  allSvc: {
    getStarted: "Get Started",
    items: {
      "rentals": {
        title: "Apartment Rentals",
        tagline: "Find Your Perfect Home",
        shortDesc: "Studio to four-bedroom apartments across Newark, Jersey City, East Orange, Elizabeth, and Orange.",
        details: [
          "Curated listings updated daily across 5 New Jersey cities",
          "Studio, 1BR, 2BR, 3BR, and 4BR options available",
          "Flexible lease terms — short-term and long-term",
          "Full application support and lease signing assistance",
          "Move-in coordination and tenant onboarding",
          "Pet-friendly and accessible units available",
        ],
      },
      "sales": {
        title: "Buy & Sell Real Estate",
        tagline: "Expert NJ Realtors",
        shortDesc: "Licensed NJ realtors guiding buyers and sellers from first showing to closing day with Bright MLS access.",
        details: [
          "Live Bright MLS listings — thousands of NJ properties",
          "Buyer representation from search to closing",
          "Seller services: pricing, staging, marketing, negotiation",
          "Free comparative market analysis (CMA) for sellers",
          "Mortgage pre-approval referrals and lender connections",
          "First-time homebuyer guidance and education",
        ],
      },
      "property-management": {
        title: "Property Management",
        tagline: "Hands-Free Ownership",
        shortDesc: "Full-service management for landlords — tenant screening, rent collection, maintenance, and monthly reporting.",
        details: [
          "Comprehensive tenant screening and placement",
          "Automated rent collection with direct deposit",
          "24/7 emergency maintenance coordination",
          "Monthly financial statements and owner portal",
          "Lease renewals, rent increases, and eviction support",
          "Move-in/move-out inspections with photo documentation",
        ],
      },
      "asset-management": {
        title: "Asset Management",
        tagline: "Maximize Your Portfolio",
        shortDesc: "Strategic oversight of real estate assets to optimize performance, reduce costs, and grow long-term value.",
        details: [
          "Portfolio performance analysis and benchmarking",
          "Capital expenditure planning and budgeting",
          "Value-add strategy development for underperforming assets",
          "Lease optimization and tenant mix analysis",
          "Risk assessment and mitigation planning",
          "Quarterly and annual investor reporting",
        ],
      },
      "international": {
        title: "International Property Management",
        tagline: "Global Reach, Local Expertise",
        shortDesc: "End-to-end management for international investors and property owners with assets in the New Jersey market.",
        details: [
          "Dedicated point of contact for overseas investors",
          "Multi-currency reporting and wire transfer coordination",
          "Compliance with US tax regulations (FIRPTA, 1031 exchanges)",
          "Remote property oversight with regular video updates",
          "Legal and title coordination with international partners",
          "Bilingual support available (Spanish, Portuguese)",
        ],
      },
      "acquisitions": {
        title: "Acquisitions",
        tagline: "Identify & Secure Opportunities",
        shortDesc: "End-to-end acquisition support — from sourcing off-market deals to due diligence, financing, and closing.",
        details: [
          "Off-market deal sourcing across New Jersey",
          "Investment property underwriting and analysis",
          "Due diligence coordination (inspections, title, zoning)",
          "Financing strategy and lender introductions",
          "Negotiation and contract management",
          "Post-acquisition transition and onboarding",
        ],
      },
      "consulting": {
        title: "Consulting & Project Maximization",
        tagline: "Unlock Your Property's Potential",
        shortDesc: "Strategic consulting to help owners, developers, and investors maximize ROI on every real estate project.",
        details: [
          "Feasibility studies and highest-and-best-use analysis",
          "Development and renovation ROI projections",
          "Repositioning strategies for underperforming properties",
          "Market entry and exit timing recommendations",
          "Operational efficiency audits for existing portfolios",
          "Custom reporting and KPI dashboards for stakeholders",
        ],
      },
      "tenant-placement": {
        title: "Tenant Placement",
        tagline: "Find the Right Tenant, Fast",
        shortDesc: "One-time tenant sourcing and screening service for landlords who self-manage but need qualified tenants.",
        details: [
          "Professional listing creation and marketing",
          "Showing coordination and applicant screening",
          "Full background, credit, and reference checks",
          "Lease preparation and execution support",
          "Move-in documentation and key handover",
          "No ongoing management fee — pay once, manage yourself",
        ],
      },
      "relocation": {
        title: "Relocation Assistance",
        tagline: "Seamless Moves to New Jersey",
        shortDesc: "Concierge relocation services for individuals, families, and corporate clients moving to or within New Jersey.",
        details: [
          "Neighborhood matching based on lifestyle and budget",
          "Virtual and in-person property tours",
          "School district and commute analysis",
          "Temporary housing and short-term rental coordination",
          "Utility setup, moving vendor referrals, and local guides",
          "Corporate relocation packages for HR departments",
        ],
      },
      "investment": {
        title: "Investment Portfolio Analysis",
        tagline: "Data-Driven Investment Decisions",
        shortDesc: "In-depth analysis of your real estate investment portfolio to identify strengths, gaps, and growth opportunities.",
        details: [
          "Cash-on-cash return and cap rate analysis",
          "Debt service coverage and leverage review",
          "Comparative market analysis for each asset",
          "Diversification and risk exposure assessment",
          "1031 exchange planning and identification",
          "Custom investment roadmap for 1, 3, and 5-year horizons",
        ],
      },
      "commercial": {
        title: "Commercial Real Estate",
        tagline: "Office, Retail & Industrial",
        shortDesc: "Leasing, sales, and management of commercial properties including office, retail, mixed-use, and industrial assets.",
        details: [
          "Commercial tenant sourcing and lease negotiation",
          "Office, retail, and industrial property sales",
          "Mixed-use development consulting",
          "NNN and gross lease structuring",
          "Commercial property management and CAM reconciliation",
          "Zoning analysis and entitlement support",
        ],
      },
      "staging": {
        title: "Home Staging & Renovation",
        tagline: "Present Your Property at Its Best",
        shortDesc: "Professional staging consultation and trusted renovation referrals to maximize your property's appeal and sale price.",
        details: [
          "Pre-listing staging consultation and furniture sourcing",
          "Virtual staging for vacant properties",
          "Trusted contractor network for renovations and repairs",
          "Cost-vs-value analysis for renovation projects",
          "Photography and videography coordination",
          "Digital marketing package for staged listings",
        ],
      },
    },
  },
  intl: {
    tag: "Global Real Estate",
    heading1: "International Listings",
    heading2: "& Resort Investments",
    intro: "Rosalia Group connects buyers and investors with premium properties across the Caribbean, Latin America, Europe, and Asia Pacific — including luxury resort villas, vacation rentals, and income-generating beachfront properties.",
    exploreBtn: "Explore International Listings",
    featuredDest: "Featured Destination",
    featuredHeading1: "Caribbean Beachfront",
    featuredHeading2: "Resort Villas",
    featuredDesc: "Luxury beachfront villas with private pools, direct ocean access, and proven rental income potential. Ideal for personal use and investment.",
    inquireNow: "Inquire Now",
    cards: [
      { title: "International Listings", desc: "Buy, sell, or rent residential and commercial properties across 20+ countries. We source off-market deals and connect you with vetted local partners." },
      { title: "Resort Investment", desc: "Identify, acquire, and profit from beachfront villas, resort condos, and vacation rental properties in the world's top tourist destinations." },
      { title: "International Management", desc: "End-to-end remote property management for international owners — tenant placement, maintenance coordination, rental income disbursement, and monthly reporting." },
    ],
    learnMore: "Learn More",
    resortInvestment: "Resort Investment",
    ownParadise1: "Own paradise.",
    ownParadise2: "Earn while you're away.",
    whyInvest: "Why Invest in Resort Properties",
    turnHomes1: "Turn Vacation Homes",
    turnHomes2: "Into Income Assets",
    deepPara: "Resort and vacation rental properties in top tourist destinations generate strong rental yields, benefit from rising tourism demand, and offer personal enjoyment alongside financial returns. Rosalia Group guides you through every step — from destination selection to acquisition and ongoing management.",
    benefits: [
      "Identify high-yield resort & vacation rental properties",
      "Due diligence, title search & legal coordination",
      "Rental income projections & ROI analysis",
      "Fractional ownership & co-investment structures",
      "Full property management after acquisition",
      "Currency & tax guidance with local partners",
    ],
    regions: ["Caribbean", "Latin America", "Europe", "Asia Pacific"],
    scheduleConsult: "Schedule a Free Consultation",
    heroAlt: "Caribbean beachfront resort villas",
    interiorAlt: "Luxury resort villa interior with ocean view",
  },
  notFound: {
    code: "404",
    title: "Page Not Found",
    body1: "Sorry, the page you are looking for doesn't exist.",
    body2: "It may have been moved or deleted.",
    goHome: "Go Home",
  },
  common: {
    unexpectedError: "An unexpected error occurred.",
    scrollToExplore: "Scroll to explore",
  },
  legalUi: {
    lastUpdated: "Last updated",
    controllingNotice:
      "The English version is the controlling legal version. The detailed policy below is currently available in English.",
  },
};

/** Top-level wrapper merged onto the core dictionary (see LanguageContext). */
export interface DeepContent {
  extra: ExtraContent;
}

export const DEEP_EN: DeepContent = { extra: EXTRA_EN };
