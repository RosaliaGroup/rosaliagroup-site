/**
 * LanguageContext — Global language state for the entire Rosalia Group website.
 * Design: Urban Warmth / Warm Brutalism — Playfair Display + DM Sans + Space Mono
 * All sections read from this context to render translated content.
 */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { DEEP_EN, deepMerge, type DeepContent, type DeepPartial } from "../i18n/deep";
import { DEEP } from "../i18n/deep/index";

export type LangCode =
  | "en" | "es" | "pt" | "fr" | "it" | "de" | "nl" | "pl"
  | "ru" | "uk" | "ar" | "zh" | "zh-TW" | "ja" | "ko"
  | "hi" | "bn" | "tr" | "vi" | "tl" | "sw" | "ht";

export interface Language {
  code: LangCode;
  label: string;
  flag: string;
  dir?: "rtl" | "ltr";
}

export const LANGUAGES: Language[] = [
  { code: "en",    label: "English",              flag: "🇺🇸" },
  { code: "es",    label: "Español",              flag: "🇪🇸" },
  { code: "pt",    label: "Português",            flag: "🇧🇷" },
  { code: "fr",    label: "Français",             flag: "🇫🇷" },
  { code: "it",    label: "Italiano",             flag: "🇮🇹" },
  { code: "de",    label: "Deutsch",              flag: "🇩🇪" },
  { code: "nl",    label: "Nederlands",           flag: "🇳🇱" },
  { code: "pl",    label: "Polski",               flag: "🇵🇱" },
  { code: "ru",    label: "Русский",              flag: "🇷🇺" },
  { code: "uk",    label: "Українська",           flag: "🇺🇦" },
  { code: "ar",    label: "العربية",              flag: "🇸🇦", dir: "rtl" },
  { code: "zh",    label: "中文(简体)",            flag: "🇨🇳" },
  { code: "zh-TW", label: "中文(繁體)",            flag: "🇹🇼" },
  { code: "ja",    label: "日本語",               flag: "🇯🇵" },
  { code: "ko",    label: "한국어",               flag: "🇰🇷" },
  { code: "hi",    label: "हिन्दी",               flag: "🇮🇳" },
  { code: "bn",    label: "বাংলা",               flag: "🇧🇩" },
  { code: "tr",    label: "Türkçe",              flag: "🇹🇷" },
  { code: "vi",    label: "Tiếng Việt",          flag: "🇻🇳" },
  { code: "tl",    label: "Filipino",            flag: "🇵🇭" },
  { code: "sw",    label: "Swahili",             flag: "🇰🇪" },
  { code: "ht",    label: "Kreyòl Ayisyen",      flag: "🇭🇹" },
];

// ── Site-wide translations ────────────────────────────────────────────────────
export type SiteTranslations = {
  // Navbar
  nav: {
    services: string; rentals: string; buySell: string;
    management: string; international: string; about: string;
    contact: string; bookTour: string; home?: string; language?: string;
  };
  // Hero
  hero: {
    tag: string; headline1: string; headline2: string; headline3: string;
    sub: string; bookTour: string; browse: string;
    stat1: string; stat1label: string; stat2: string; stat2label: string;
    stat3: string; stat3label: string; stat4: string; stat4label: string;
  };
  // Services overview
  services: {
    tag: string; heading1: string; heading2: string; sub: string; cta: string;
    s1title: string; s1desc: string; s1cta: string;
    s2title: string; s2desc: string; s2cta: string;
    s3title: string; s3desc: string; s3cta: string;
    certBadge: string; certSub: string;
  };
  // All services grid
  allServices: {
    tag: string; heading1: string; heading2: string; sub: string;
    ctaTitle: string; ctaSub: string; ctaBtn1: string; ctaBtn2: string;
    learnMore: string; showLess: string;
  };
  // Rentals
  rentals: {
    tag: string; heading: string; bookTour: string;
    bed: string; bath: string; sqft: string;
    scheduleTour: string; viewAll: string;
    badge1: string; badge2: string; badge3: string;
  };
  // Buy & Sell
  buySell: {
    tag: string; heading1: string; heading2: string;
    buyTab: string; sellTab: string;
    buyTitle: string; buySub: string; buyBtn: string;
    sellTitle: string; sellSub: string; sellBtn: string;
    searchPlaceholder: string; searchBtn: string;
  };
  // Management
  management: {
    tag: string; heading1: string; heading2: string; sub: string;
    getStarted: string;
  };
  // International
  international: {
    tag: string; heading1: string; heading2: string; sub: string;
    exploreBtn: string; inquireBtn: string;
    resortTag: string; resortHeading: string; resortSub: string;
    learnMore: string;
  };
  // CTA Banner
  cta: {
    heading: string; sub: string; btn1: string; btn2: string;
  };
  // About
  about: {
    tag: string; heading1: string; heading2: string; sub: string;
    testimonialsHeading: string; founderTitle: string;
  };
  // Contact
  contact: {
    tag: string; heading1: string; heading2: string; sub: string;
    firstName: string; lastName: string; email: string; phone: string;
    service: string; message: string; smsConsent: string; sendBtn: string;
    selectService: string;
  };
  // Footer
  footer: {
    desc: string; services: string; areas: string; contact: string;
    rights: string; privacy: string; terms: string; sbe: string;
  };
};

const EN: SiteTranslations = {
  nav: {
    services: "Services", rentals: "Rentals", buySell: "Buy & Sell",
    management: "Management", international: "International",
    about: "About", contact: "Contact", bookTour: "Book a Tour",
  },
  hero: {
    tag: "New Jersey & New York Real Estate",
    headline1: "Your Home", headline2: "in", headline3: "Starts Here",
    sub: "Rosalia Group connects renters, buyers, and investors across New Jersey and New York — with the care and expertise you deserve.",
    bookTour: "Book a Tour", browse: "Browse Listings",
    stat1: "200+", stat1label: "Units Managed",
    stat2: "98%", stat2label: "Occupancy Rate",
    stat3: "10+", stat3label: "Years Experience",
    stat4: "2 States", stat4label: "NJ & NY",
  },
  services: {
    tag: "What We Offer",
    heading1: "Full-Service Real Estate", heading2: "in NJ & NY",
    sub: "Whether you're renting, buying, selling, or investing — Rosalia Group brings local expertise, personal attention, and proven results to every transaction.",
    cta: "Get in Touch",
    s1title: "Apartment Rentals",
    s1desc: "Studio to four-bedroom apartments across Newark, Jersey City, East Orange, Elizabeth, New York City, Brooklyn, and the Bronx.",
    s1cta: "View Rentals",
    s2title: "Buy & Sell",
    s2desc: "Licensed NJ & NY realtors guiding buyers and sellers from first showing to closing day. Search live Bright MLS listings.",
    s2cta: "Search Listings",
    s3title: "Property Management",
    s3desc: "Full-service management for landlords and investors. Tenant screening, rent collection, 24/7 maintenance coordination.",
    s3cta: "Learn More",
    certBadge: "SBE & MWBE Certified",
    certSub: "Proudly serving the New Jersey and New York communities with integrity, expertise, and a personal touch.",
  },
  allServices: {
    tag: "Everything We Do",
    heading1: "Our Full Suite", heading2: "of Services",
    sub: "From finding your first apartment to managing a global real estate portfolio — Rosalia Group delivers expert, personalized service at every stage of your real estate journey.",
    ctaTitle: "Not Sure Where to Start?",
    ctaSub: "Let's find the right service for you.",
    ctaBtn1: "Free Consultation", ctaBtn2: "Call Now",
    learnMore: "Learn More", showLess: "Show Less",
  },
  rentals: {
    tag: "Available Now", heading: "Featured Rentals",
    bookTour: "Book a Tour", bed: "Bed", bath: "Bath", sqft: "sqft",
    scheduleTour: "Schedule a Tour", viewAll: "View All Listings",
    badge1: "Featured", badge2: "New Listing", badge3: "Available",
  },
  buySell: {
    tag: "Expert Guidance", heading1: "Buy & Sell Real Estate",
    heading2: "in NJ & NY",
    buyTab: "Buying", sellTab: "Selling",
    buyTitle: "Find Your Dream Home", buySub: "Access live MLS listings across NJ & NY with expert buyer representation.",
    buyBtn: "Talk to a Buyer's Agent",
    sellTitle: "Sell for Top Dollar", sellSub: "Strategic pricing, professional marketing, and expert negotiation to maximize your sale.",
    sellBtn: "Free Consultation",
    searchPlaceholder: "Search by city, zip, or address…", searchBtn: "Search",
  },
  management: {
    tag: "Hands-Free Ownership",
    heading1: "Property Management", heading2: "That Works for You",
    sub: "We handle everything — so you don't have to.",
    getStarted: "Get Started",
  },
  international: {
    tag: "Global Reach",
    heading1: "International", heading2: "Properties",
    sub: "Buy, sell, and invest in properties across the Caribbean, Latin America, Europe, and beyond.",
    exploreBtn: "Explore International Listings", inquireBtn: "Inquire Now",
    resortTag: "Resort Investment",
    resortHeading: "Luxury Resort Properties",
    resortSub: "Invest in world-class resort properties and let Rosalia Group manage them for maximum returns.",
    learnMore: "Learn More",
  },
  cta: {
    heading: "Ready to Get Started?",
    sub: "Whether you're renting, buying, selling, or investing — we're here to help across NJ, NY & internationally.",
    btn1: "Schedule a Free Consultation", btn2: "Call Now",
  },
  about: {
    tag: "Our Story",
    heading1: "Meet", heading2: "Ana Haynes",
    sub: "Woman-run, family-owned real estate firm serving NJ & NY with integrity and expertise.",
    testimonialsHeading: "What Our Clients Say", founderTitle: "Founder &amp; Lead Agent",
  },
  contact: {
    tag: "Get in Touch",
    heading1: "Let's Start a", heading2: "Conversation",
    sub: "Ready to find your next home, sell your property, or explore investment opportunities? We're here to help.",
    firstName: "First Name", lastName: "Last Name",
    email: "Email Address", phone: "Phone Number",
    service: "I'm Interested In…", message: "Message",
    smsConsent: "I agree to receive SMS messages from Rosalia Group regarding my inquiry. Msg & data rates may apply. Reply STOP to opt out.",
    sendBtn: "Send Message",
    selectService: "Select one",
  },
  footer: {
    desc: "New Jersey & New York real estate, property management, and international resort investment specialists. Woman-run, family-owned. SBE & MWBE Certified.",
    services: "Services", areas: "Service Areas", contact: "Contact",
    rights: "All rights reserved.", privacy: "Privacy Policy",
    terms: "Terms", sbe: "SBE & MWBE Certified",
  },
};

// ── Translations for each language ───────────────────────────────────────────
const TRANSLATIONS: Record<string, DeepPartial<Translations>> = {
  en: EN,
  es: {
    nav: { services: "Servicios", rentals: "Alquileres", buySell: "Compra y Venta", management: "Gestión", international: "Internacional", about: "Nosotros", contact: "Contacto", bookTour: "Reservar Visita" },
    hero: { tag: "Bienes Raíces en Nueva Jersey y Nueva York", headline1: "Tu Hogar", headline2: "en", headline3: "Empieza Aquí", sub: "Rosalia Group conecta inquilinos, compradores e inversores en Nueva Jersey y Nueva York con el cuidado y la experiencia que mereces.", bookTour: "Reservar Visita", browse: "Ver Propiedades", stat1: "200+", stat1label: "Unidades Gestionadas", stat2: "98%", stat2label: "Tasa de Ocupación", stat3: "10+", stat3label: "Años de Experiencia", stat4: "2 Estados", stat4label: "NJ y NY" },
    services: { tag: "Lo Que Ofrecemos", heading1: "Servicios Inmobiliarios", heading2: "en NJ y NY", sub: "Ya sea que alquile, compre, venda o invierta — Rosalia Group aporta experiencia local y resultados comprobados.", cta: "Contáctenos", s1title: "Alquiler de Apartamentos", s1desc: "Apartamentos de estudio a cuatro habitaciones en Newark, Jersey City, East Orange, Elizabeth, Nueva York, Brooklyn y el Bronx.", s1cta: "Ver Alquileres", s2title: "Compra y Venta", s2desc: "Agentes inmobiliarios licenciados en NJ y NY guiando a compradores y vendedores desde la primera visita hasta el cierre.", s2cta: "Buscar Propiedades", s3title: "Gestión de Propiedades", s3desc: "Gestión completa para propietarios e inversores. Selección de inquilinos, cobro de alquiler, mantenimiento 24/7.", s3cta: "Más Información", certBadge: "Certificado SBE y MWBE", certSub: "Sirviendo con integridad, experiencia y trato personal a las comunidades de Nueva Jersey y Nueva York." },
    allServices: { tag: "Todo Lo Que Hacemos", heading1: "Nuestra Gama Completa", heading2: "de Servicios", sub: "Desde encontrar tu primer apartamento hasta gestionar una cartera inmobiliaria global.", ctaTitle: "¿No Sabes Por Dónde Empezar?", ctaSub: "Encontremos el servicio adecuado para ti.", ctaBtn1: "Consulta Gratuita", ctaBtn2: "Llamar Ahora", learnMore: "Más Información", showLess: "Ver Menos" },
    rentals: { tag: "Disponible Ahora", heading: "Alquileres Destacados", bookTour: "Reservar Visita", bed: "Hab", bath: "Baño", sqft: "m²", scheduleTour: "Programar Visita", viewAll: "Ver Todos los Anuncios", badge1: "Destacado", badge2: "Nuevo Anuncio", badge3: "Disponible" },
    buySell: { tag: "Orientación Experta", heading1: "Compra y Venta Inmobiliaria", heading2: "en NJ y NY", buyTab: "Comprar", sellTab: "Vender", buyTitle: "Encuentra Tu Hogar Ideal", buySub: "Accede a listados MLS en vivo en NJ y NY con representación experta.", buyBtn: "Hablar con un Agente", sellTitle: "Vende al Mejor Precio", sellSub: "Precios estratégicos, marketing profesional y negociación experta.", sellBtn: "Consulta Gratuita", searchPlaceholder: "Buscar por ciudad, código postal o dirección…", searchBtn: "Buscar" },
    management: { tag: "Propiedad Sin Preocupaciones", heading1: "Gestión de Propiedades", heading2: "Que Trabaja Para Ti", sub: "Nos encargamos de todo — para que tú no tengas que hacerlo.", getStarted: "Comenzar" },
    international: { tag: "Alcance Global", heading1: "Propiedades", heading2: "Internacionales", sub: "Compra, vende e invierte en propiedades en el Caribe, América Latina, Europa y más.", exploreBtn: "Explorar Propiedades Internacionales", inquireBtn: "Consultar Ahora", resortTag: "Inversión en Resort", resortHeading: "Propiedades de Resort de Lujo", resortSub: "Invierte en propiedades de resort de clase mundial y deja que Rosalia Group las gestione.", learnMore: "Más Información" },
    cta: { heading: "¿Listo Para Empezar?", sub: "Ya sea que alquile, compre, venda o invierta — estamos aquí para ayudarle en NJ, NY e internacionalmente.", btn1: "Programar Consulta Gratuita", btn2: "Llamar Ahora" },
    about: { tag: "Nuestra Historia", heading1: "Conoce a", heading2: "Ana Haynes", sub: "Empresa inmobiliaria dirigida por mujeres y de propiedad familiar que sirve a NJ y NY.", testimonialsHeading: "Lo Que Dicen Nuestros Clientes", founderTitle: "Fundadora y Agente Principal" },
    contact: { tag: "Contáctenos", heading1: "Iniciemos una", heading2: "Conversación", sub: "¿Listo para encontrar tu próximo hogar, vender tu propiedad o explorar oportunidades de inversión?", firstName: "Nombre", lastName: "Apellido", email: "Correo Electrónico", phone: "Número de Teléfono", service: "Me Interesa…", message: "Mensaje", smsConsent: "Acepto recibir mensajes SMS de Rosalia Group. Se pueden aplicar tarifas de mensajes y datos. Responda STOP para cancelar.", sendBtn: "Enviar Mensaje", selectService: "Seleccionar uno" },
    footer: { desc: "Especialistas en bienes raíces, gestión de propiedades e inversión en resorts internacionales en NJ y NY. Empresa familiar dirigida por mujeres. Certificado SBE y MWBE.", services: "Servicios", areas: "Áreas de Servicio", contact: "Contacto", rights: "Todos los derechos reservados.", privacy: "Política de Privacidad", terms: "Términos", sbe: "Certificado SBE y MWBE" },
  },
  pt: {
    nav: { services: "Serviços", rentals: "Aluguéis", buySell: "Compra e Venda", management: "Gestão", international: "Internacional", about: "Sobre Nós", contact: "Contato", bookTour: "Agendar Visita" },
    hero: { tag: "Imóveis em Nova Jersey e Nova York", headline1: "Seu Lar", headline2: "em", headline3: "Começa Aqui", sub: "Rosalia Group conecta locatários, compradores e investidores em Nova Jersey e Nova York com o cuidado e a expertise que você merece.", bookTour: "Agendar Visita", browse: "Ver Imóveis", stat1: "200+", stat1label: "Unidades Gerenciadas", stat2: "98%", stat2label: "Taxa de Ocupação", stat3: "10+", stat3label: "Anos de Experiência", stat4: "2 Estados", stat4label: "NJ e NY" },
    services: { tag: "O Que Oferecemos", heading1: "Serviços Imobiliários", heading2: "em NJ e NY", sub: "Seja para alugar, comprar, vender ou investir — a Rosalia Group traz expertise local e resultados comprovados.", cta: "Entre em Contato", s1title: "Aluguel de Apartamentos", s1desc: "Apartamentos de estúdio a quatro quartos em Newark, Jersey City, East Orange, Elizabeth, Nova York, Brooklyn e o Bronx.", s1cta: "Ver Aluguéis", s2title: "Compra e Venda", s2desc: "Corretores licenciados em NJ e NY guiando compradores e vendedores da primeira visita ao fechamento.", s2cta: "Buscar Imóveis", s3title: "Gestão de Imóveis", s3desc: "Gestão completa para proprietários e investidores. Triagem de inquilinos, cobrança de aluguel, manutenção 24/7.", s3cta: "Saiba Mais", certBadge: "Certificado SBE e MWBE", certSub: "Servindo às comunidades de Nova Jersey e Nova York com integridade, expertise e atenção pessoal." },
    allServices: { tag: "Tudo o Que Fazemos", heading1: "Nossa Gama Completa", heading2: "de Serviços", sub: "De encontrar seu primeiro apartamento a gerenciar um portfólio imobiliário global.", ctaTitle: "Não Sabe Por Onde Começar?", ctaSub: "Vamos encontrar o serviço certo para você.", ctaBtn1: "Consulta Gratuita", ctaBtn2: "Ligar Agora", learnMore: "Saiba Mais", showLess: "Ver Menos" },
    rentals: { tag: "Disponível Agora", heading: "Aluguéis em Destaque", bookTour: "Agendar Visita", bed: "Quarto", bath: "Banheiro", sqft: "m²", scheduleTour: "Agendar Visita", viewAll: "Ver Todos os Anúncios", badge1: "Destaque", badge2: "Novo Anúncio", badge3: "Disponível" },
    buySell: { tag: "Orientação Especializada", heading1: "Compra e Venda Imobiliária", heading2: "em NJ e NY", buyTab: "Comprar", sellTab: "Vender", buyTitle: "Encontre Seu Lar Ideal", buySub: "Acesse listagens MLS ao vivo em NJ e NY com representação especializada.", buyBtn: "Falar com um Corretor", sellTitle: "Venda pelo Melhor Preço", sellSub: "Precificação estratégica, marketing profissional e negociação especializada.", sellBtn: "Consulta Gratuita", searchPlaceholder: "Buscar por cidade, CEP ou endereço…", searchBtn: "Buscar" },
    management: { tag: "Propriedade Sem Preocupações", heading1: "Gestão de Imóveis", heading2: "Que Trabalha Para Você", sub: "Cuidamos de tudo — para que você não precise.", getStarted: "Começar" },
    international: { tag: "Alcance Global", heading1: "Imóveis", heading2: "Internacionais", sub: "Compre, venda e invista em imóveis no Caribe, América Latina, Europa e além.", exploreBtn: "Explorar Imóveis Internacionais", inquireBtn: "Consultar Agora", resortTag: "Investimento em Resort", resortHeading: "Imóveis de Resort de Luxo", resortSub: "Invista em imóveis de resort de classe mundial e deixe a Rosalia Group gerenciá-los.", learnMore: "Saiba Mais" },
    cta: { heading: "Pronto Para Começar?", sub: "Seja para alugar, comprar, vender ou investir — estamos aqui para ajudar em NJ, NY e internacionalmente.", btn1: "Agendar Consulta Gratuita", btn2: "Ligar Agora" },
    about: { tag: "Nossa História", heading1: "Conheça", heading2: "Ana Haynes", sub: "Empresa imobiliária dirigida por mulheres e de propriedade familiar servindo NJ e NY.", testimonialsHeading: "O Que Nossos Clientes Dizem", founderTitle: "Founder & Lead Agent" },
    contact: { tag: "Entre em Contato", heading1: "Vamos Iniciar uma", heading2: "Conversa", sub: "Pronto para encontrar seu próximo lar, vender seu imóvel ou explorar oportunidades de investimento?", firstName: "Nome", lastName: "Sobrenome", email: "Endereço de E-mail", phone: "Número de Telefone", service: "Tenho Interesse em…", message: "Mensagem", smsConsent: "Concordo em receber mensagens SMS da Rosalia Group. Taxas de mensagens e dados podem ser aplicadas. Responda STOP para cancelar.", sendBtn: "Enviar Mensagem", selectService: "Selecionar um" },
    footer: { desc: "Especialistas em imóveis, gestão de propriedades e investimento em resorts internacionais em NJ e NY. Empresa familiar dirigida por mulheres. Certificado SBE e MWBE.", services: "Serviços", areas: "Áreas de Serviço", contact: "Contato", rights: "Todos os direitos reservados.", privacy: "Política de Privacidade", terms: "Termos", sbe: "Certificado SBE e MWBE" },
  },
  fr: {
    nav: { services: "Services", rentals: "Locations", buySell: "Achat & Vente", management: "Gestion", international: "International", about: "À Propos", contact: "Contact", bookTour: "Réserver une Visite" },
    hero: { tag: "Immobilier au New Jersey et New York", headline1: "Votre Maison", headline2: "au", headline3: "Commence Ici", sub: "Rosalia Group met en relation locataires, acheteurs et investisseurs au New Jersey et à New York avec le soin et l'expertise que vous méritez.", bookTour: "Réserver une Visite", browse: "Voir les Annonces", stat1: "200+", stat1label: "Unités Gérées", stat2: "98%", stat2label: "Taux d'Occupation", stat3: "10+", stat3label: "Années d'Expérience", stat4: "2 États", stat4label: "NJ et NY" },
    services: { tag: "Ce Que Nous Offrons", heading1: "Immobilier Complet", heading2: "au NJ et NY", sub: "Que vous louiez, achetiez, vendiez ou investissiez — Rosalia Group apporte expertise locale et résultats prouvés.", cta: "Nous Contacter", s1title: "Location d'Appartements", s1desc: "Appartements du studio au quatre pièces à Newark, Jersey City, East Orange, Elizabeth, New York, Brooklyn et le Bronx.", s1cta: "Voir les Locations", s2title: "Achat et Vente", s2desc: "Agents immobiliers agréés NJ et NY guidant acheteurs et vendeurs de la première visite à la clôture.", s2cta: "Rechercher des Biens", s3title: "Gestion Immobilière", s3desc: "Gestion complète pour propriétaires et investisseurs. Sélection des locataires, encaissement des loyers, maintenance 24/7.", s3cta: "En Savoir Plus", certBadge: "Certifié SBE et MWBE", certSub: "Au service des communautés du New Jersey et de New York avec intégrité, expertise et attention personnelle." },
    allServices: { tag: "Tout Ce Que Nous Faisons", heading1: "Notre Gamme Complète", heading2: "de Services", sub: "De la recherche de votre premier appartement à la gestion d'un portefeuille immobilier mondial.", ctaTitle: "Vous Ne Savez Pas Par Où Commencer?", ctaSub: "Trouvons ensemble le bon service pour vous.", ctaBtn1: "Consultation Gratuite", ctaBtn2: "Appeler Maintenant", learnMore: "En Savoir Plus", showLess: "Voir Moins" },
    rentals: { tag: "Disponible Maintenant", heading: "Locations en Vedette", bookTour: "Réserver une Visite", bed: "Ch", bath: "SdB", sqft: "m²", scheduleTour: "Planifier une Visite", viewAll: "Voir Toutes les Annonces", badge1: "En Vedette", badge2: "Nouvelle Annonce", badge3: "Disponible" },
    buySell: { tag: "Conseils d'Experts", heading1: "Achat et Vente Immobilière", heading2: "au NJ et NY", buyTab: "Acheter", sellTab: "Vendre", buyTitle: "Trouvez Votre Maison Idéale", buySub: "Accédez aux annonces MLS en direct au NJ et NY avec une représentation experte.", buyBtn: "Parler à un Agent", sellTitle: "Vendez au Meilleur Prix", sellSub: "Tarification stratégique, marketing professionnel et négociation experte.", sellBtn: "Consultation Gratuite", searchPlaceholder: "Rechercher par ville, code postal ou adresse…", searchBtn: "Rechercher" },
    management: { tag: "Propriété Sans Souci", heading1: "Gestion Immobilière", heading2: "Qui Travaille Pour Vous", sub: "Nous gérons tout — pour que vous n'ayez pas à le faire.", getStarted: "Commencer" },
    international: { tag: "Portée Mondiale", heading1: "Propriétés", heading2: "Internationales", sub: "Achetez, vendez et investissez dans des propriétés aux Caraïbes, en Amérique latine, en Europe et au-delà.", exploreBtn: "Explorer les Propriétés Internationales", inquireBtn: "Renseignez-vous Maintenant", resortTag: "Investissement en Resort", resortHeading: "Propriétés de Resort de Luxe", resortSub: "Investissez dans des propriétés de resort de classe mondiale et laissez Rosalia Group les gérer.", learnMore: "En Savoir Plus" },
    cta: { heading: "Prêt à Commencer?", sub: "Que vous louiez, achetiez, vendiez ou investissiez — nous sommes là pour vous aider au NJ, NY et à l'international.", btn1: "Planifier une Consultation Gratuite", btn2: "Appeler Maintenant" },
    about: { tag: "Notre Histoire", heading1: "Rencontrez", heading2: "Ana Haynes", sub: "Cabinet immobilier dirigé par des femmes et familial au service du NJ et NY.", testimonialsHeading: "Ce Que Disent Nos Clients", founderTitle: "Founder & Lead Agent" },
    contact: { tag: "Nous Contacter", heading1: "Commençons une", heading2: "Conversation", sub: "Prêt à trouver votre prochain logement, vendre votre propriété ou explorer des opportunités d'investissement?", firstName: "Prénom", lastName: "Nom de Famille", email: "Adresse E-mail", phone: "Numéro de Téléphone", service: "Je Suis Intéressé par…", message: "Message", smsConsent: "J'accepte de recevoir des SMS de Rosalia Group. Des frais de message et de données peuvent s'appliquer. Répondez STOP pour vous désabonner.", sendBtn: "Envoyer le Message", selectService: "Sélectionner un" },
    footer: { desc: "Spécialistes en immobilier, gestion de propriétés et investissement en resorts internationaux au NJ et NY. Entreprise familiale dirigée par des femmes. Certifié SBE et MWBE.", services: "Services", areas: "Zones de Service", contact: "Contact", rights: "Tous droits réservés.", privacy: "Politique de Confidentialité", terms: "Conditions", sbe: "Certifié SBE et MWBE" },
  },
  ar: {
    nav: { services: "الخدمات", rentals: "الإيجارات", buySell: "بيع وشراء", management: "الإدارة", international: "دولي", about: "من نحن", contact: "اتصل بنا", bookTour: "احجز جولة" },
    hero: { tag: "عقارات نيوجيرسي ونيويورك", headline1: "منزلك", headline2: "في", headline3: "يبدأ هنا", sub: "تربط مجموعة روزاليا المستأجرين والمشترين والمستثمرين في نيوجيرسي ونيويورك بالرعاية والخبرة التي تستحقها.", bookTour: "احجز جولة", browse: "تصفح العقارات", stat1: "200+", stat1label: "وحدة مُدارة", stat2: "98%", stat2label: "معدل الإشغال", stat3: "10+", stat3label: "سنوات خبرة", stat4: "ولايتان", stat4label: "NJ و NY" },
    services: { tag: "ما نقدمه", heading1: "خدمات عقارية متكاملة", heading2: "في NJ و NY", sub: "سواء كنت تستأجر أو تشتري أو تبيع أو تستثمر — تجلب مجموعة روزاليا الخبرة المحلية والنتائج المثبتة.", cta: "تواصل معنا", s1title: "تأجير الشقق", s1desc: "شقق من الاستوديو إلى أربع غرف في نيوارك وجيرسي سيتي وإيست أورانج وإليزابيث ونيويورك وبروكلين والبرونكس.", s1cta: "عرض الإيجارات", s2title: "بيع وشراء", s2desc: "وكلاء عقاريون مرخصون في NJ و NY يرشدون المشترين والبائعين من أول معاينة حتى الإغلاق.", s2cta: "البحث عن عقارات", s3title: "إدارة العقارات", s3desc: "إدارة متكاملة للملاك والمستثمرين. فحص المستأجرين وتحصيل الإيجار وصيانة على مدار الساعة.", s3cta: "اعرف المزيد", certBadge: "معتمد SBE و MWBE", certSub: "نخدم مجتمعات نيوجيرسي ونيويورك بنزاهة وخبرة واهتمام شخصي." },
    allServices: { tag: "كل ما نفعله", heading1: "مجموعتنا الكاملة", heading2: "من الخدمات", sub: "من إيجاد شقتك الأولى إلى إدارة محفظة عقارية عالمية.", ctaTitle: "لا تعرف من أين تبدأ؟", ctaSub: "دعنا نجد الخدمة المناسبة لك.", ctaBtn1: "استشارة مجانية", ctaBtn2: "اتصل الآن", learnMore: "اعرف المزيد", showLess: "عرض أقل" },
    rentals: { tag: "متاح الآن", heading: "إيجارات مميزة", bookTour: "احجز جولة", bed: "غرفة", bath: "حمام", sqft: "قدم²", scheduleTour: "جدولة جولة", viewAll: "عرض جميع الإعلانات", badge1: "مميز", badge2: "إعلان جديد", badge3: "متاح" },
    buySell: { tag: "توجيه خبراء", heading1: "بيع وشراء العقارات", heading2: "في NJ و NY", buyTab: "شراء", sellTab: "بيع", buyTitle: "اعثر على منزل أحلامك", buySub: "الوصول إلى قوائم MLS المباشرة في NJ و NY مع تمثيل خبراء.", buyBtn: "تحدث مع وكيل", sellTitle: "بع بأعلى سعر", sellSub: "تسعير استراتيجي وتسويق احترافي وتفاوض خبراء.", sellBtn: "استشارة مجانية", searchPlaceholder: "ابحث بالمدينة أو الرمز البريدي أو العنوان…", searchBtn: "بحث" },
    management: { tag: "ملكية بلا قلق", heading1: "إدارة العقارات", heading2: "التي تعمل لصالحك", sub: "نتولى كل شيء — حتى لا تضطر إلى ذلك.", getStarted: "ابدأ الآن" },
    international: { tag: "وصول عالمي", heading1: "عقارات", heading2: "دولية", sub: "اشترِ وبع واستثمر في عقارات في منطقة الكاريبي وأمريكا اللاتينية وأوروبا وما وراءها.", exploreBtn: "استكشف العقارات الدولية", inquireBtn: "استفسر الآن", resortTag: "استثمار في المنتجعات", resortHeading: "عقارات منتجعات فاخرة", resortSub: "استثمر في عقارات منتجعات عالمية المستوى ودع مجموعة روزاليا تديرها.", learnMore: "اعرف المزيد" },
    cta: { heading: "مستعد للبدء؟", sub: "سواء كنت تستأجر أو تشتري أو تبيع أو تستثمر — نحن هنا للمساعدة في NJ و NY ودولياً.", btn1: "جدولة استشارة مجانية", btn2: "اتصل الآن" },
    about: { tag: "قصتنا", heading1: "تعرف على", heading2: "آنا هاينز", sub: "شركة عقارية تديرها امرأة ومملوكة عائلياً تخدم NJ و NY.", testimonialsHeading: "ما يقوله عملاؤنا", founderTitle: "Founder & Lead Agent" },
    contact: { tag: "تواصل معنا", heading1: "لنبدأ", heading2: "محادثة", sub: "مستعد للعثور على منزلك القادم أو بيع عقارك أو استكشاف فرص الاستثمار؟", firstName: "الاسم الأول", lastName: "اسم العائلة", email: "عنوان البريد الإلكتروني", phone: "رقم الهاتف", service: "أنا مهتم بـ…", message: "الرسالة", smsConsent: "أوافق على تلقي رسائل SMS من مجموعة روزاليا. قد تُطبق رسوم الرسائل والبيانات. رد STOP للإلغاء.", sendBtn: "إرسال الرسالة", selectService: "اختر واحداً" },
    footer: { desc: "متخصصون في العقارات وإدارة الممتلكات والاستثمار في المنتجعات الدولية في NJ و NY. شركة عائلية تديرها امرأة. معتمد SBE و MWBE.", services: "الخدمات", areas: "مناطق الخدمة", contact: "اتصل بنا", rights: "جميع الحقوق محفوظة.", privacy: "سياسة الخصوصية", terms: "الشروط", sbe: "معتمد SBE و MWBE" },
  },
  zh: {
    nav: { services: "服务", rentals: "租赁", buySell: "买卖", management: "物业管理", international: "国际", about: "关于我们", contact: "联系我们", bookTour: "预约参观" },
    hero: { tag: "新泽西州和纽约州房地产", headline1: "您的家", headline2: "在", headline3: "从这里开始", sub: "Rosalia Group 在新泽西州和纽约州为租客、买家和投资者提供您应得的关怀和专业服务。", bookTour: "预约参观", browse: "浏览房源", stat1: "200+", stat1label: "管理单位", stat2: "98%", stat2label: "入住率", stat3: "10+", stat3label: "年经验", stat4: "2个州", stat4label: "NJ 和 NY" },
    services: { tag: "我们提供的服务", heading1: "全方位房地产服务", heading2: "在 NJ 和 NY", sub: "无论您是租房、买房、卖房还是投资 — Rosalia Group 都能为您提供本地专业知识和经过验证的结果。", cta: "联系我们", s1title: "公寓租赁", s1desc: "纽瓦克、泽西市、东奥兰治、伊丽莎白、纽约市、布鲁克林和布朗克斯的单间至四居室公寓。", s1cta: "查看租赁", s2title: "买卖房产", s2desc: "持牌 NJ 和 NY 房产经纪人，从首次看房到成交全程指导买家和卖家。", s2cta: "搜索房源", s3title: "物业管理", s3desc: "为房东和投资者提供全方位管理服务。租客筛选、租金收取、24/7 维修协调。", s3cta: "了解更多", certBadge: "SBE 和 MWBE 认证", certSub: "以诚信、专业知识和个人关怀服务新泽西州和纽约州社区。" },
    allServices: { tag: "我们的全部服务", heading1: "我们完整的", heading2: "服务套餐", sub: "从寻找您的第一套公寓到管理全球房地产投资组合。", ctaTitle: "不知道从哪里开始？", ctaSub: "让我们为您找到合适的服务。", ctaBtn1: "免费咨询", ctaBtn2: "立即致电", learnMore: "了解更多", showLess: "收起" },
    rentals: { tag: "即刻可用", heading: "精选租赁", bookTour: "预约参观", bed: "卧室", bath: "浴室", sqft: "平方英尺", scheduleTour: "安排参观", viewAll: "查看所有房源", badge1: "精选", badge2: "新上市", badge3: "可用" },
    buySell: { tag: "专业指导", heading1: "NJ 和 NY 房产", heading2: "买卖服务", buyTab: "购买", sellTab: "出售", buyTitle: "找到您的理想家园", buySub: "通过专业买家代理访问 NJ 和 NY 的实时 MLS 房源。", buyBtn: "咨询买家经纪人", sellTitle: "以最高价出售", sellSub: "战略定价、专业营销和专家谈判，最大化您的销售额。", sellBtn: "免费咨询", searchPlaceholder: "按城市、邮编或地址搜索…", searchBtn: "搜索" },
    management: { tag: "无忧物业", heading1: "物业管理", heading2: "为您服务", sub: "我们处理一切 — 让您无需操心。", getStarted: "开始" },
    international: { tag: "全球覆盖", heading1: "国际", heading2: "房产", sub: "在加勒比海、拉丁美洲、欧洲及更多地区购买、出售和投资房产。", exploreBtn: "探索国际房源", inquireBtn: "立即咨询", resortTag: "度假村投资", resortHeading: "豪华度假村房产", resortSub: "投资世界级度假村房产，让 Rosalia Group 为您管理以获得最大回报。", learnMore: "了解更多" },
    cta: { heading: "准备好开始了吗？", sub: "无论您是租房、买房、卖房还是投资 — 我们在 NJ、NY 和国际上都能为您提供帮助。", btn1: "安排免费咨询", btn2: "立即致电" },
    about: { tag: "我们的故事", heading1: "认识", heading2: "Ana Haynes", sub: "女性经营、家族拥有的房地产公司，服务于 NJ 和 NY。", testimonialsHeading: "客户评价", founderTitle: "Founder & Lead Agent" },
    contact: { tag: "联系我们", heading1: "开始一次", heading2: "对话", sub: "准备好找到您的下一个家、出售您的房产或探索投资机会了吗？", firstName: "名字", lastName: "姓氏", email: "电子邮件地址", phone: "电话号码", service: "我感兴趣的是…", message: "留言", smsConsent: "我同意接收来自 Rosalia Group 的短信。可能收取消息和数据费用。回复 STOP 取消订阅。", sendBtn: "发送消息", selectService: "请选择" },
    footer: { desc: "NJ 和 NY 房地产、物业管理和国际度假村投资专家。女性经营、家族拥有。SBE 和 MWBE 认证。", services: "服务", areas: "服务区域", contact: "联系我们", rights: "版权所有。", privacy: "隐私政策", terms: "条款", sbe: "SBE 和 MWBE 认证" },
  },
};

// ── Additional language translations ─────────────────────────────────────────
const EXTRA_TRANSLATIONS: Record<string, SiteTranslations> = {
  "zh-TW": {
    nav: { services: "服務", rentals: "租賃", buySell: "買賣", management: "物業管理", international: "國際", about: "關於我們", contact: "聯絡我們", bookTour: "預約參觀" },
    hero: { tag: "紐澤西州和紐約州房地產", headline1: "您的家", headline2: "在", headline3: "從這裡開始", sub: "Rosalia Group 在紐澤西州和紐約州連接租客、買家和投資者，提供您應得的關懷與專業知識。", bookTour: "預約參觀", browse: "瀏覽房源", stat1: "200+", stat1label: "管理單位", stat2: "98%", stat2label: "入住率", stat3: "10+", stat3label: "年經驗", stat4: "2州", stat4label: "NJ 和 NY" },
    services: { tag: "我們提供的服務", heading1: "全方位房地產服務", heading2: "在 NJ 和 NY", sub: "無論您是租房、買房、賣房還是投資 — Rosalia Group 帶來本地專業知識和卓越成果。", cta: "聯絡我們", s1title: "公寓租賃", s1desc: "在紐瓦克、澤西市、東橙市、伊莉莎白市、紐約市、布魯克林和布朗克斯提供單室至四臥室公寓。", s1cta: "查看租賃", s2title: "買賣", s2desc: "持牌 NJ 和 NY 房地產經紀人，從首次看房到成交全程指導買家和賣家。", s2cta: "搜尋房源", s3title: "物業管理", s3desc: "為房東和投資者提供全方位管理服務。租客篩選、租金收取、24/7 維護協調。", s3cta: "了解更多", certBadge: "SBE 和 MWBE 認證", certSub: "以誠信、專業知識和個人關懷自豪地服務紐澤西州和紐約州社區。" },
    allServices: { tag: "我們所做的一切", heading1: "我們的完整服務", heading2: "套餐", sub: "從找到您的第一套公寓到管理全球房地產投資組合。", ctaTitle: "不知道從哪裡開始？", ctaSub: "讓我們為您找到合適的服務。", ctaBtn1: "免費諮詢", ctaBtn2: "立即致電", learnMore: "了解更多", showLess: "顯示更少" },
    rentals: { tag: "現在可用", heading: "精選租賃", bookTour: "預約參觀", bed: "臥室", bath: "浴室", sqft: "平方英尺", scheduleTour: "安排參觀", viewAll: "查看所有房源", badge1: "精選", badge2: "新房源", badge3: "可用" },
    buySell: { tag: "專業指導", heading1: "買賣房地產", heading2: "在 NJ 和 NY", buyTab: "購買", sellTab: "出售", buyTitle: "找到您的夢想家園", buySub: "在 NJ 和 NY 獲取即時 MLS 房源，享受專業買家代理服務。", buyBtn: "與買家代理交談", sellTitle: "以最高價出售", sellSub: "策略定價、專業行銷和專業談判。", sellBtn: "免費諮詢", searchPlaceholder: "按城市、郵遞區號或地址搜尋…", searchBtn: "搜尋" },
    management: { tag: "無憂物業所有權", heading1: "物業管理", heading2: "為您服務", sub: "我們處理一切 — 讓您無需操心。", getStarted: "開始" },
    international: { tag: "全球覆蓋", heading1: "國際", heading2: "房產", sub: "在加勒比海、拉丁美洲、歐洲及更多地區買賣和投資房產。", exploreBtn: "探索國際房源", inquireBtn: "立即諮詢", resortTag: "度假村投資", resortHeading: "豪華度假村房產", resortSub: "投資世界級度假村房產，讓 Rosalia Group 管理以獲得最大回報。", learnMore: "了解更多" },
    cta: { heading: "準備好開始了嗎？", sub: "無論您是租房、買房、賣房還是投資 — 我們在 NJ、NY 和國際上都能為您提供幫助。", btn1: "安排免費諮詢", btn2: "立即致電" },
    about: { tag: "我們的故事", heading1: "認識", heading2: "Ana Haynes", sub: "女性經營、家族擁有的房地產公司，服務於 NJ 和 NY。", testimonialsHeading: "客戶評價", founderTitle: "創辦人兼首席代理人" },
    contact: { tag: "聯絡我們", heading1: "開始一次", heading2: "對話", sub: "準備好找到您的下一個家、出售您的房產或探索投資機會了嗎？", firstName: "名字", lastName: "姓氏", email: "電子郵件地址", phone: "電話號碼", service: "我感興趣的是…", message: "留言", smsConsent: "我同意接收來自 Rosalia Group 的短信。可能收取消息和數據費用。回覆 STOP 取消訂閱。", sendBtn: "發送消息", selectService: "請選擇" },
    footer: { desc: "NJ 和 NY 房地產、物業管理和國際度假村投資專家。女性經營、家族擁有。SBE 和 MWBE 認證。", services: "服務", areas: "服務區域", contact: "聯絡我們", rights: "版權所有。", privacy: "隱私政策", terms: "條款", sbe: "SBE 和 MWBE 認證" },
  },
  ja: {
    nav: { services: "サービス", rentals: "賃貸", buySell: "売買", management: "物件管理", international: "海外", about: "会社概要", contact: "お問い合わせ", bookTour: "内覧予約" },
    hero: { tag: "ニュージャージー州・ニューヨーク州の不動産", headline1: "あなたの家", headline2: "が", headline3: "ここから始まります", sub: "Rosalia Groupは、ニュージャージー州とニューヨーク州全域で、賃借人、購入者、投資家をつなぎます。", bookTour: "内覧予約", browse: "物件を見る", stat1: "200+", stat1label: "管理物件数", stat2: "98%", stat2label: "入居率", stat3: "10+", stat3label: "年の経験", stat4: "2州", stat4label: "NJ・NY" },
    services: { tag: "サービス内容", heading1: "総合不動産サービス", heading2: "NJ・NY対応", sub: "賃貸・購入・売却・投資 — Rosalia Groupが地域の専門知識と実績でサポートします。", cta: "お問い合わせ", s1title: "アパート賃貸", s1desc: "ニューアーク、ジャージーシティ、イーストオレンジ、エリザベス、ニューヨーク市、ブルックリン、ブロンクスのスタジオ〜4ベッドルーム。", s1cta: "賃貸を見る", s2title: "売買", s2desc: "NJ・NY公認不動産業者が内覧から成約まで買主・売主をサポート。", s2cta: "物件を探す", s3title: "物件管理", s3desc: "オーナー・投資家向けフルサービス管理。入居者審査、家賃回収、24時間メンテナンス対応。", s3cta: "詳細を見る", certBadge: "SBE・MWBE認定", certSub: "誠実さ、専門知識、個人的なケアでNJ・NYコミュニティに貢献しています。" },
    allServices: { tag: "すべてのサービス", heading1: "サービス一覧", heading2: "", sub: "初めてのアパート探しからグローバルな不動産ポートフォリオ管理まで。", ctaTitle: "どこから始めればいいか分からない？", ctaSub: "最適なサービスを一緒に見つけましょう。", ctaBtn1: "無料相談", ctaBtn2: "今すぐ電話", learnMore: "詳細を見る", showLess: "閉じる" },
    rentals: { tag: "入居可能", heading: "おすすめ賃貸物件", bookTour: "内覧予約", bed: "寝室", bath: "浴室", sqft: "㎡", scheduleTour: "内覧を予約", viewAll: "全物件を見る", badge1: "おすすめ", badge2: "新着", badge3: "入居可能" },
    buySell: { tag: "専門家によるサポート", heading1: "不動産の売買", heading2: "NJ・NY対応", buyTab: "購入", sellTab: "売却", buyTitle: "理想の家を見つける", buySub: "NJ・NYのMLS物件をリアルタイムで検索。専門家が購入をサポート。", buyBtn: "購入エージェントに相談", sellTitle: "最高値で売却", sellSub: "戦略的な価格設定、プロのマーケティング、専門交渉。", sellBtn: "無料相談", searchPlaceholder: "市区町村、郵便番号、住所で検索…", searchBtn: "検索" },
    management: { tag: "手間なし物件所有", heading1: "物件管理", heading2: "あなたのために働く", sub: "すべてお任せください — あなたは何もする必要はありません。", getStarted: "始める" },
    international: { tag: "グローバル展開", heading1: "海外", heading2: "不動産", sub: "カリブ海、中南米、ヨーロッパなど世界中の物件を購入・売却・投資。", exploreBtn: "海外物件を探す", inquireBtn: "今すぐ問い合わせ", resortTag: "リゾート投資", resortHeading: "高級リゾート物件", resortSub: "世界クラスのリゾート物件に投資し、Rosalia Groupが管理します。", learnMore: "詳細を見る" },
    cta: { heading: "始める準備はできていますか？", sub: "賃貸・購入・売却・投資 — NJ、NY、海外でサポートします。", btn1: "無料相談を予約", btn2: "今すぐ電話" },
    about: { tag: "私たちのストーリー", heading1: "紹介", heading2: "Ana Haynes", sub: "NJ・NYを誠実さと専門知識でサポートする女性経営・家族所有の不動産会社。", testimonialsHeading: "お客様の声", founderTitle: "創業者・主任エージェント" },
    contact: { tag: "お問い合わせ", heading1: "会話を", heading2: "始めましょう", sub: "次の住まいを探す、物件を売却する、投資機会を探す — お気軽にご相談ください。", firstName: "名前", lastName: "苗字", email: "メールアドレス", phone: "電話番号", service: "ご興味のあるサービス", message: "メッセージ", smsConsent: "Rosalia GroupからのSMSメッセージ受信に同意します。メッセージ・データ料金が発生する場合があります。STOPと返信で配信停止。", sendBtn: "送信", selectService: "選択してください" },
    footer: { desc: "NJ・NY不動産、物件管理、国際リゾート投資の専門家。女性経営・家族所有。SBE・MWBE認定。", services: "サービス", areas: "対応エリア", contact: "お問い合わせ", rights: "全著作権所有。", privacy: "プライバシーポリシー", terms: "利用規約", sbe: "SBE・MWBE認定" },
  },
  ko: {
    nav: { services: "서비스", rentals: "임대", buySell: "매매", management: "부동산 관리", international: "해외", about: "회사 소개", contact: "문의하기", bookTour: "투어 예약" },
    hero: { tag: "뉴저지 & 뉴욕 부동산", headline1: "당신의 집", headline2: "이", headline3: "여기서 시작됩니다", sub: "Rosalia Group은 뉴저지와 뉴욕 전역에서 임차인, 구매자, 투자자를 연결합니다.", bookTour: "투어 예약", browse: "매물 보기", stat1: "200+", stat1label: "관리 유닛", stat2: "98%", stat2label: "입주율", stat3: "10+", stat3label: "년 경험", stat4: "2개 주", stat4label: "NJ & NY" },
    services: { tag: "서비스 안내", heading1: "종합 부동산 서비스", heading2: "NJ & NY", sub: "임대, 구매, 매도, 투자 — Rosalia Group이 지역 전문성과 검증된 결과로 도와드립니다.", cta: "문의하기", s1title: "아파트 임대", s1desc: "뉴어크, 저지시티, 이스트오렌지, 엘리자베스, 뉴욕시, 브루클린, 브롱크스의 스튜디오~4베드룸.", s1cta: "임대 보기", s2title: "매매", s2desc: "NJ & NY 공인 부동산 중개인이 첫 방문부터 계약 완료까지 안내합니다.", s2cta: "매물 검색", s3title: "부동산 관리", s3desc: "임대인과 투자자를 위한 풀서비스 관리. 세입자 심사, 임대료 수금, 24시간 유지보수.", s3cta: "자세히 보기", certBadge: "SBE & MWBE 인증", certSub: "성실함, 전문성, 개인적인 배려로 NJ & NY 커뮤니티를 자랑스럽게 섬깁니다." },
    allServices: { tag: "모든 서비스", heading1: "전체 서비스", heading2: "목록", sub: "첫 아파트 찾기부터 글로벌 부동산 포트폴리오 관리까지.", ctaTitle: "어디서 시작할지 모르겠나요?", ctaSub: "적합한 서비스를 함께 찾아드립니다.", ctaBtn1: "무료 상담", ctaBtn2: "지금 전화", learnMore: "자세히 보기", showLess: "접기" },
    rentals: { tag: "현재 입주 가능", heading: "추천 임대 매물", bookTour: "투어 예약", bed: "침실", bath: "욕실", sqft: "㎡", scheduleTour: "투어 예약", viewAll: "전체 매물 보기", badge1: "추천", badge2: "신규 매물", badge3: "입주 가능" },
    buySell: { tag: "전문가 안내", heading1: "부동산 매매", heading2: "NJ & NY", buyTab: "구매", sellTab: "매도", buyTitle: "꿈의 집 찾기", buySub: "NJ & NY의 실시간 MLS 매물을 전문 구매자 대리인과 함께 검색하세요.", buyBtn: "구매 에이전트 상담", sellTitle: "최고가로 매도", sellSub: "전략적 가격 책정, 전문 마케팅, 전문 협상.", sellBtn: "무료 상담", searchPlaceholder: "도시, 우편번호 또는 주소로 검색…", searchBtn: "검색" },
    management: { tag: "걱정 없는 부동산 소유", heading1: "부동산 관리", heading2: "당신을 위해 일합니다", sub: "모든 것을 처리합니다 — 당신은 아무것도 할 필요가 없습니다.", getStarted: "시작하기" },
    international: { tag: "글로벌 네트워크", heading1: "해외", heading2: "부동산", sub: "카리브해, 라틴아메리카, 유럽 등 전 세계 부동산을 구매, 매도, 투자하세요.", exploreBtn: "해외 매물 탐색", inquireBtn: "지금 문의", resortTag: "리조트 투자", resortHeading: "럭셔리 리조트 부동산", resortSub: "세계적 수준의 리조트 부동산에 투자하고 Rosalia Group이 관리합니다.", learnMore: "자세히 보기" },
    cta: { heading: "시작할 준비가 되셨나요?", sub: "임대, 구매, 매도, 투자 — NJ, NY 및 해외에서 도와드립니다.", btn1: "무료 상담 예약", btn2: "지금 전화" },
    about: { tag: "우리의 이야기", heading1: "소개", heading2: "Ana Haynes", sub: "성실함과 전문성으로 NJ & NY를 섬기는 여성 운영, 가족 소유 부동산 회사.", testimonialsHeading: "고객 후기", founderTitle: "창립자 & 수석 에이전트" },
    contact: { tag: "문의하기", heading1: "대화를", heading2: "시작합시다", sub: "다음 집을 찾거나, 부동산을 매도하거나, 투자 기회를 탐색할 준비가 되셨나요?", firstName: "이름", lastName: "성", email: "이메일 주소", phone: "전화번호", service: "관심 서비스", message: "메시지", smsConsent: "Rosalia Group의 SMS 메시지 수신에 동의합니다. 메시지 및 데이터 요금이 부과될 수 있습니다. STOP으로 수신 거부.", sendBtn: "메시지 보내기", selectService: "선택하세요" },
    footer: { desc: "NJ & NY 부동산, 부동산 관리, 국제 리조트 투자 전문가. 여성 운영, 가족 소유. SBE & MWBE 인증.", services: "서비스", areas: "서비스 지역", contact: "문의하기", rights: "모든 권리 보유.", privacy: "개인정보 처리방침", terms: "이용약관", sbe: "SBE & MWBE 인증" },
  },
  it: {
    nav: { services: "Servizi", rentals: "Affitti", buySell: "Compra e Vendi", management: "Gestione", international: "Internazionale", about: "Chi Siamo", contact: "Contatti", bookTour: "Prenota Visita" },
    hero: { tag: "Immobili nel New Jersey e New York", headline1: "La Tua Casa", headline2: "a", headline3: "Inizia Qui", sub: "Rosalia Group connette affittuari, acquirenti e investitori in New Jersey e New York con la cura e l'esperienza che meriti.", bookTour: "Prenota Visita", browse: "Sfoglia Annunci", stat1: "200+", stat1label: "Unità Gestite", stat2: "98%", stat2label: "Tasso di Occupazione", stat3: "10+", stat3label: "Anni di Esperienza", stat4: "2 Stati", stat4label: "NJ e NY" },
    services: { tag: "Cosa Offriamo", heading1: "Servizi Immobiliari Completi", heading2: "in NJ e NY", sub: "Che tu stia affittando, acquistando, vendendo o investendo — Rosalia Group porta competenza locale e risultati comprovati.", cta: "Contattaci", s1title: "Affitto Appartamenti", s1desc: "Appartamenti da monolocale a quattro camere a Newark, Jersey City, East Orange, Elizabeth, New York, Brooklyn e il Bronx.", s1cta: "Vedi Affitti", s2title: "Compra e Vendi", s2desc: "Agenti immobiliari autorizzati NJ e NY che guidano acquirenti e venditori dalla prima visita alla chiusura.", s2cta: "Cerca Annunci", s3title: "Gestione Immobiliare", s3desc: "Gestione completa per proprietari e investitori. Selezione inquilini, riscossione affitti, manutenzione 24/7.", s3cta: "Scopri di Più", certBadge: "Certificato SBE e MWBE", certSub: "Serviamo con orgoglio le comunità del New Jersey e New York con integrità, competenza e attenzione personale." },
    allServices: { tag: "Tutto Quello Che Facciamo", heading1: "La Nostra Gamma Completa", heading2: "di Servizi", sub: "Dal trovare il tuo primo appartamento alla gestione di un portafoglio immobiliare globale.", ctaTitle: "Non Sai Da Dove Iniziare?", ctaSub: "Troviamo insieme il servizio giusto per te.", ctaBtn1: "Consulenza Gratuita", ctaBtn2: "Chiama Ora", learnMore: "Scopri di Più", showLess: "Mostra Meno" },
    rentals: { tag: "Disponibile Ora", heading: "Affitti in Evidenza", bookTour: "Prenota Visita", bed: "Camera", bath: "Bagno", sqft: "m²", scheduleTour: "Programma Visita", viewAll: "Vedi Tutti gli Annunci", badge1: "In Evidenza", badge2: "Nuovo Annuncio", badge3: "Disponibile" },
    buySell: { tag: "Guida Esperta", heading1: "Compra e Vendi Immobili", heading2: "in NJ e NY", buyTab: "Acquisto", sellTab: "Vendita", buyTitle: "Trova la Casa dei Tuoi Sogni", buySub: "Accedi agli annunci MLS in tempo reale in NJ e NY con rappresentanza acquirente esperta.", buyBtn: "Parla con un Agente Acquirente", sellTitle: "Vendi al Massimo Prezzo", sellSub: "Prezzi strategici, marketing professionale e negoziazione esperta.", sellBtn: "Consulenza Gratuita", searchPlaceholder: "Cerca per città, CAP o indirizzo…", searchBtn: "Cerca" },
    management: { tag: "Proprietà Senza Pensieri", heading1: "Gestione Immobiliare", heading2: "Che Lavora per Te", sub: "Ci occupiamo di tutto — così tu non devi farlo.", getStarted: "Inizia" },
    international: { tag: "Portata Globale", heading1: "Proprietà", heading2: "Internazionali", sub: "Acquista, vendi e investi in proprietà nei Caraibi, America Latina, Europa e oltre.", exploreBtn: "Esplora Proprietà Internazionali", inquireBtn: "Richiedi Informazioni", resortTag: "Investimento Resort", resortHeading: "Proprietà Resort di Lusso", resortSub: "Investi in proprietà resort di classe mondiale e lascia che Rosalia Group le gestisca.", learnMore: "Scopri di Più" },
    cta: { heading: "Pronto per Iniziare?", sub: "Che tu stia affittando, acquistando, vendendo o investendo — siamo qui per aiutarti in NJ, NY e internazionalmente.", btn1: "Prenota una Consulenza Gratuita", btn2: "Chiama Ora" },
    about: { tag: "La Nostra Storia", heading1: "Incontra", heading2: "Ana Haynes", sub: "Azienda immobiliare a conduzione femminile e familiare che serve NJ e NY.", testimonialsHeading: "Cosa Dicono i Nostri Clienti", founderTitle: "Fondatrice e Agente Principale" },
    contact: { tag: "Contattaci", heading1: "Iniziamo una", heading2: "Conversazione", sub: "Pronto a trovare la tua prossima casa, vendere la tua proprietà o esplorare opportunità di investimento?", firstName: "Nome", lastName: "Cognome", email: "Indirizzo Email", phone: "Numero di Telefono", service: "Sono Interessato a…", message: "Messaggio", smsConsent: "Accetto di ricevere messaggi SMS da Rosalia Group. Potrebbero essere applicate tariffe per messaggi e dati. Rispondi STOP per annullare.", sendBtn: "Invia Messaggio", selectService: "Seleziona uno" },
    footer: { desc: "Specialisti in immobili, gestione proprietà e investimenti resort internazionali in NJ e NY. A conduzione femminile, di proprietà familiare. Certificato SBE e MWBE.", services: "Servizi", areas: "Aree di Servizio", contact: "Contatti", rights: "Tutti i diritti riservati.", privacy: "Informativa sulla Privacy", terms: "Termini", sbe: "Certificato SBE e MWBE" },
  },
  de: {
    nav: { services: "Dienstleistungen", rentals: "Mietobjekte", buySell: "Kaufen & Verkaufen", management: "Verwaltung", international: "International", about: "Über Uns", contact: "Kontakt", bookTour: "Besichtigung Buchen" },
    hero: { tag: "Immobilien in New Jersey & New York", headline1: "Ihr Zuhause", headline2: "in", headline3: "Beginnt Hier", sub: "Rosalia Group verbindet Mieter, Käufer und Investoren in New Jersey und New York mit der Sorgfalt und Expertise, die Sie verdienen.", bookTour: "Besichtigung Buchen", browse: "Angebote Durchsuchen", stat1: "200+", stat1label: "Verwaltete Einheiten", stat2: "98%", stat2label: "Belegungsrate", stat3: "10+", stat3label: "Jahre Erfahrung", stat4: "2 Bundesstaaten", stat4label: "NJ & NY" },
    services: { tag: "Unser Angebot", heading1: "Vollständige Immobiliendienstleistungen", heading2: "in NJ & NY", sub: "Ob Mieten, Kaufen, Verkaufen oder Investieren — Rosalia Group bringt lokale Expertise und bewährte Ergebnisse.", cta: "Kontakt Aufnehmen", s1title: "Wohnungsvermietung", s1desc: "Studio- bis Vier-Zimmer-Wohnungen in Newark, Jersey City, East Orange, Elizabeth, New York City, Brooklyn und der Bronx.", s1cta: "Mietobjekte Ansehen", s2title: "Kaufen & Verkaufen", s2desc: "Lizenzierte NJ & NY Makler begleiten Käufer und Verkäufer von der ersten Besichtigung bis zum Abschluss.", s2cta: "Angebote Suchen", s3title: "Immobilienverwaltung", s3desc: "Vollständige Verwaltung für Vermieter und Investoren. Mieterprüfung, Mieteinkassierung, 24/7 Wartungskoordination.", s3cta: "Mehr Erfahren", certBadge: "SBE & MWBE Zertifiziert", certSub: "Wir dienen den Gemeinschaften in New Jersey und New York stolz mit Integrität, Expertise und persönlicher Betreuung." },
    allServices: { tag: "Alles Was Wir Tun", heading1: "Unser Vollständiges", heading2: "Dienstleistungsangebot", sub: "Von der ersten Wohnung bis zur Verwaltung eines globalen Immobilienportfolios.", ctaTitle: "Nicht Sicher, Wo Sie Anfangen Sollen?", ctaSub: "Lassen Sie uns den richtigen Service für Sie finden.", ctaBtn1: "Kostenlose Beratung", ctaBtn2: "Jetzt Anrufen", learnMore: "Mehr Erfahren", showLess: "Weniger Anzeigen" },
    rentals: { tag: "Jetzt Verfügbar", heading: "Empfohlene Mietobjekte", bookTour: "Besichtigung Buchen", bed: "Schlafzimmer", bath: "Badezimmer", sqft: "m²", scheduleTour: "Besichtigung Planen", viewAll: "Alle Angebote Ansehen", badge1: "Empfohlen", badge2: "Neues Angebot", badge3: "Verfügbar" },
    buySell: { tag: "Expertenberatung", heading1: "Immobilien Kaufen & Verkaufen", heading2: "in NJ & NY", buyTab: "Kaufen", sellTab: "Verkaufen", buyTitle: "Ihr Traumhaus Finden", buySub: "Zugang zu Live-MLS-Angeboten in NJ & NY mit professioneller Käufervertretung.", buyBtn: "Mit Einem Käuferagenten Sprechen", sellTitle: "Zum Höchstpreis Verkaufen", sellSub: "Strategische Preisgestaltung, professionelles Marketing und Expertenverhandlung.", sellBtn: "Kostenlose Beratung", searchPlaceholder: "Nach Stadt, PLZ oder Adresse suchen…", searchBtn: "Suchen" },
    management: { tag: "Sorgenfreier Immobilienbesitz", heading1: "Immobilienverwaltung", heading2: "Die Für Sie Arbeitet", sub: "Wir kümmern uns um alles — damit Sie es nicht müssen.", getStarted: "Loslegen" },
    international: { tag: "Globale Reichweite", heading1: "Internationale", heading2: "Immobilien", sub: "Kaufen, verkaufen und investieren Sie in Immobilien in der Karibik, Lateinamerika, Europa und darüber hinaus.", exploreBtn: "Internationale Angebote Erkunden", inquireBtn: "Jetzt Anfragen", resortTag: "Resort-Investment", resortHeading: "Luxus-Resort-Immobilien", resortSub: "Investieren Sie in erstklassige Resort-Immobilien und lassen Sie Rosalia Group sie verwalten.", learnMore: "Mehr Erfahren" },
    cta: { heading: "Bereit Loszulegen?", sub: "Ob Mieten, Kaufen, Verkaufen oder Investieren — wir sind in NJ, NY und international für Sie da.", btn1: "Kostenlose Beratung Vereinbaren", btn2: "Jetzt Anrufen" },
    about: { tag: "Unsere Geschichte", heading1: "Treffen Sie", heading2: "Ana Haynes", sub: "Frauengeführtes, familienbesessenes Immobilienunternehmen, das NJ & NY mit Integrität und Expertise bedient.", testimonialsHeading: "Was Unsere Kunden Sagen", founderTitle: "Gründerin & Leitende Agentin" },
    contact: { tag: "Kontakt Aufnehmen", heading1: "Lassen Sie Uns Ein", heading2: "Gespräch Beginnen", sub: "Bereit, Ihr nächstes Zuhause zu finden, Ihre Immobilie zu verkaufen oder Investitionsmöglichkeiten zu erkunden?", firstName: "Vorname", lastName: "Nachname", email: "E-Mail-Adresse", phone: "Telefonnummer", service: "Ich Interessiere Mich Für…", message: "Nachricht", smsConsent: "Ich stimme dem Empfang von SMS-Nachrichten von Rosalia Group zu. Es können Nachrichten- und Datengebühren anfallen. Antworten Sie STOP zum Abbestellen.", sendBtn: "Nachricht Senden", selectService: "Auswählen" },
    footer: { desc: "Spezialisten für Immobilien, Immobilienverwaltung und internationale Resort-Investitionen in NJ & NY. Frauengeführt, familienbesessen. SBE & MWBE Zertifiziert.", services: "Dienstleistungen", areas: "Servicegebiete", contact: "Kontakt", rights: "Alle Rechte vorbehalten.", privacy: "Datenschutzrichtlinie", terms: "Bedingungen", sbe: "SBE & MWBE Zertifiziert" },
  },
  nl: {
    nav: { services: "Diensten", rentals: "Verhuur", buySell: "Kopen & Verkopen", management: "Beheer", international: "Internationaal", about: "Over Ons", contact: "Contact", bookTour: "Bezichtiging Boeken" },
    hero: { tag: "Vastgoed in New Jersey & New York", headline1: "Uw Thuis", headline2: "in", headline3: "Begint Hier", sub: "Rosalia Group verbindt huurders, kopers en investeerders in New Jersey en New York met de zorg en expertise die u verdient.", bookTour: "Bezichtiging Boeken", browse: "Aanbod Bekijken", stat1: "200+", stat1label: "Beheerde Eenheden", stat2: "98%", stat2label: "Bezettingsgraad", stat3: "10+", stat3label: "Jaar Ervaring", stat4: "2 Staten", stat4label: "NJ & NY" },
    services: { tag: "Ons Aanbod", heading1: "Volledig Vastgoeddiensten", heading2: "in NJ & NY", sub: "Of u nu huurt, koopt, verkoopt of investeert — Rosalia Group brengt lokale expertise en bewezen resultaten.", cta: "Neem Contact Op", s1title: "Appartementverhuur", s1desc: "Studio tot vier-slaapkamer appartementen in Newark, Jersey City, East Orange, Elizabeth, New York City, Brooklyn en de Bronx.", s1cta: "Verhuur Bekijken", s2title: "Kopen & Verkopen", s2desc: "Erkende NJ & NY makelaars begeleiden kopers en verkopers van eerste bezichtiging tot overdracht.", s2cta: "Aanbod Zoeken", s3title: "Vastgoedbeheer", s3desc: "Volledig beheer voor verhuurders en investeerders. Huurdersscreening, huurinning, 24/7 onderhoudscoördinatie.", s3cta: "Meer Informatie", certBadge: "SBE & MWBE Gecertificeerd", certSub: "Trots de gemeenschappen van New Jersey en New York te dienen met integriteit, expertise en persoonlijke aandacht." },
    allServices: { tag: "Alles Wat We Doen", heading1: "Ons Volledige", heading2: "Dienstenpakket", sub: "Van uw eerste appartement vinden tot het beheren van een wereldwijd vastgoedportfolio.", ctaTitle: "Weet U Niet Waar Te Beginnen?", ctaSub: "Laten we de juiste service voor u vinden.", ctaBtn1: "Gratis Adviesgesprek", ctaBtn2: "Bel Nu", learnMore: "Meer Informatie", showLess: "Minder Tonen" },
    rentals: { tag: "Nu Beschikbaar", heading: "Uitgelichte Verhuur", bookTour: "Bezichtiging Boeken", bed: "Slaapkamer", bath: "Badkamer", sqft: "m²", scheduleTour: "Bezichtiging Plannen", viewAll: "Alle Aanbiedingen Bekijken", badge1: "Uitgelicht", badge2: "Nieuw Aanbod", badge3: "Beschikbaar" },
    buySell: { tag: "Deskundige Begeleiding", heading1: "Vastgoed Kopen & Verkopen", heading2: "in NJ & NY", buyTab: "Kopen", sellTab: "Verkopen", buyTitle: "Uw Droomhuis Vinden", buySub: "Toegang tot live MLS-aanbiedingen in NJ & NY met deskundige kopersvertegenwoordiging.", buyBtn: "Spreek Met Een Kopersagent", sellTitle: "Verkopen Voor De Hoogste Prijs", sellSub: "Strategische prijsstelling, professionele marketing en deskundige onderhandeling.", sellBtn: "Gratis Adviesgesprek", searchPlaceholder: "Zoek op stad, postcode of adres…", searchBtn: "Zoeken" },
    management: { tag: "Zorgeloos Vastgoedbezit", heading1: "Vastgoedbeheer", heading2: "Dat Voor U Werkt", sub: "Wij regelen alles — zodat u dat niet hoeft te doen.", getStarted: "Beginnen" },
    international: { tag: "Wereldwijde Reikwijdte", heading1: "Internationale", heading2: "Eigendommen", sub: "Koop, verkoop en investeer in eigendommen in het Caribisch gebied, Latijns-Amerika, Europa en daarbuiten.", exploreBtn: "Internationale Aanbiedingen Verkennen", inquireBtn: "Nu Informeren", resortTag: "Resortinvestering", resortHeading: "Luxe Resort Eigendommen", resortSub: "Investeer in wereldklasse resort eigendommen en laat Rosalia Group ze beheren.", learnMore: "Meer Informatie" },
    cta: { heading: "Klaar Om Te Beginnen?", sub: "Of u nu huurt, koopt, verkoopt of investeert — wij zijn er voor u in NJ, NY en internationaal.", btn1: "Gratis Adviesgesprek Plannen", btn2: "Bel Nu" },
    about: { tag: "Ons Verhaal", heading1: "Maak Kennis Met", heading2: "Ana Haynes", sub: "Door vrouwen geleid, familiebedrijf dat NJ & NY bedient met integriteit en expertise.", testimonialsHeading: "Wat Onze Klanten Zeggen", founderTitle: "Oprichter & Hoofdagent" },
    contact: { tag: "Neem Contact Op", heading1: "Laten We Een", heading2: "Gesprek Beginnen", sub: "Klaar om uw volgende huis te vinden, uw eigendom te verkopen of investeringsmogelijkheden te verkennen?", firstName: "Voornaam", lastName: "Achternaam", email: "E-mailadres", phone: "Telefoonnummer", service: "Ik Ben Geïnteresseerd In…", message: "Bericht", smsConsent: "Ik ga akkoord met het ontvangen van SMS-berichten van Rosalia Group. Berichten- en datatarieven kunnen van toepassing zijn. Antwoord STOP om u af te melden.", sendBtn: "Bericht Verzenden", selectService: "Selecteer één" },
    footer: { desc: "Specialisten in vastgoed, vastgoedbeheer en internationale resortinvesteringen in NJ & NY. Door vrouwen geleid, familiebedrijf. SBE & MWBE Gecertificeerd.", services: "Diensten", areas: "Servicegebieden", contact: "Contact", rights: "Alle rechten voorbehouden.", privacy: "Privacybeleid", terms: "Voorwaarden", sbe: "SBE & MWBE Gecertificeerd" },
  },
  pl: {
    nav: { services: "Usługi", rentals: "Wynajem", buySell: "Kupno i Sprzedaż", management: "Zarządzanie", international: "Międzynarodowe", about: "O Nas", contact: "Kontakt", bookTour: "Zarezerwuj Wizytę" },
    hero: { tag: "Nieruchomości w New Jersey i Nowym Jorku", headline1: "Twój Dom", headline2: "w", headline3: "Zaczyna Się Tutaj", sub: "Rosalia Group łączy najemców, kupujących i inwestorów w New Jersey i Nowym Jorku z troską i wiedzą, na jaką zasługujesz.", bookTour: "Zarezerwuj Wizytę", browse: "Przeglądaj Oferty", stat1: "200+", stat1label: "Zarządzanych Jednostek", stat2: "98%", stat2label: "Wskaźnik Obłożenia", stat3: "10+", stat3label: "Lat Doświadczenia", stat4: "2 Stany", stat4label: "NJ i NY" },
    services: { tag: "Co Oferujemy", heading1: "Kompleksowe Usługi Nieruchomości", heading2: "w NJ i NY", sub: "Czy wynajmujesz, kupujesz, sprzedajesz czy inwestujesz — Rosalia Group wnosi lokalną wiedzę i sprawdzone wyniki.", cta: "Skontaktuj Się", s1title: "Wynajem Mieszkań", s1desc: "Mieszkania od kawalerki do czterech sypialni w Newark, Jersey City, East Orange, Elizabeth, Nowym Jorku, Brooklynie i Bronksie.", s1cta: "Zobacz Wynajem", s2title: "Kupno i Sprzedaż", s2desc: "Licencjonowani pośrednicy NJ i NY prowadzący kupujących i sprzedających od pierwszego oglądania do zamknięcia.", s2cta: "Szukaj Ofert", s3title: "Zarządzanie Nieruchomościami", s3desc: "Pełna obsługa dla właścicieli i inwestorów. Weryfikacja najemców, pobieranie czynszu, koordynacja konserwacji 24/7.", s3cta: "Dowiedz Się Więcej", certBadge: "Certyfikat SBE i MWBE", certSub: "Z dumą służymy społecznościom New Jersey i Nowego Jorku z uczciwością, wiedzą i osobistą troską." },
    allServices: { tag: "Wszystko Co Robimy", heading1: "Nasz Pełny Zakres", heading2: "Usług", sub: "Od znalezienia pierwszego mieszkania po zarządzanie globalnym portfelem nieruchomości.", ctaTitle: "Nie Wiesz Od Czego Zacząć?", ctaSub: "Znajdźmy razem odpowiednią usługę dla Ciebie.", ctaBtn1: "Bezpłatna Konsultacja", ctaBtn2: "Zadzwoń Teraz", learnMore: "Dowiedz Się Więcej", showLess: "Pokaż Mniej" },
    rentals: { tag: "Dostępne Teraz", heading: "Polecane Wynajmy", bookTour: "Zarezerwuj Wizytę", bed: "Sypialnia", bath: "Łazienka", sqft: "m²", scheduleTour: "Zaplanuj Wizytę", viewAll: "Zobacz Wszystkie Oferty", badge1: "Polecane", badge2: "Nowa Oferta", badge3: "Dostępne" },
    buySell: { tag: "Eksperckie Doradztwo", heading1: "Kupno i Sprzedaż Nieruchomości", heading2: "w NJ i NY", buyTab: "Kupno", sellTab: "Sprzedaż", buyTitle: "Znajdź Dom Swoich Marzeń", buySub: "Dostęp do aktualnych ofert MLS w NJ i NY z ekspercką reprezentacją kupującego.", buyBtn: "Porozmawiaj z Agentem Kupującego", sellTitle: "Sprzedaj za Najwyższą Cenę", sellSub: "Strategiczne wyceny, profesjonalny marketing i eksperckie negocjacje.", sellBtn: "Bezpłatna Konsultacja", searchPlaceholder: "Szukaj po mieście, kodzie pocztowym lub adresie…", searchBtn: "Szukaj" },
    management: { tag: "Nieruchomość Bez Stresu", heading1: "Zarządzanie Nieruchomościami", heading2: "Które Pracuje Dla Ciebie", sub: "Zajmujemy się wszystkim — abyś Ty nie musiał.", getStarted: "Zacznij" },
    international: { tag: "Globalny Zasięg", heading1: "Nieruchomości", heading2: "Międzynarodowe", sub: "Kupuj, sprzedawaj i inwestuj w nieruchomości na Karaibach, w Ameryce Łacińskiej, Europie i nie tylko.", exploreBtn: "Przeglądaj Oferty Międzynarodowe", inquireBtn: "Zapytaj Teraz", resortTag: "Inwestycja w Resort", resortHeading: "Luksusowe Nieruchomości Resortowe", resortSub: "Inwestuj w nieruchomości resortowe światowej klasy i pozwól Rosalia Group nimi zarządzać.", learnMore: "Dowiedz Się Więcej" },
    cta: { heading: "Gotowy Zacząć?", sub: "Czy wynajmujesz, kupujesz, sprzedajesz czy inwestujesz — jesteśmy tutaj, aby pomóc w NJ, NY i na arenie międzynarodowej.", btn1: "Zaplanuj Bezpłatną Konsultację", btn2: "Zadzwoń Teraz" },
    about: { tag: "Nasza Historia", heading1: "Poznaj", heading2: "Ana Haynes", sub: "Firma nieruchomości prowadzona przez kobiety i należąca do rodziny, obsługująca NJ i NY.", testimonialsHeading: "Co Mówią Nasi Klienci", founderTitle: "Założycielka i Główny Agent" },
    contact: { tag: "Skontaktuj Się", heading1: "Zacznijmy", heading2: "Rozmowę", sub: "Gotowy znaleźć swój następny dom, sprzedać nieruchomość lub zbadać możliwości inwestycyjne?", firstName: "Imię", lastName: "Nazwisko", email: "Adres E-mail", phone: "Numer Telefonu", service: "Interesuje Mnie…", message: "Wiadomość", smsConsent: "Zgadzam się na otrzymywanie wiadomości SMS od Rosalia Group. Mogą obowiązywać opłaty za wiadomości i dane. Odpowiedz STOP, aby zrezygnować.", sendBtn: "Wyślij Wiadomość", selectService: "Wybierz jeden" },
    footer: { desc: "Specjaliści od nieruchomości, zarządzania nieruchomościami i międzynarodowych inwestycji resortowych w NJ i NY. Prowadzone przez kobiety, własność rodzinna. Certyfikat SBE i MWBE.", services: "Usługi", areas: "Obszary Obsługi", contact: "Kontakt", rights: "Wszelkie prawa zastrzeżone.", privacy: "Polityka Prywatności", terms: "Warunki", sbe: "Certyfikat SBE i MWBE" },
  },
  ru: {
    nav: { services: "Услуги", rentals: "Аренда", buySell: "Купля-Продажа", management: "Управление", international: "Международное", about: "О Нас", contact: "Контакты", bookTour: "Записаться на Просмотр" },
    hero: { tag: "Недвижимость в Нью-Джерси и Нью-Йорке", headline1: "Ваш Дом", headline2: "в", headline3: "Начинается Здесь", sub: "Rosalia Group соединяет арендаторов, покупателей и инвесторов в Нью-Джерси и Нью-Йорке с заботой и опытом, которых вы заслуживаете.", bookTour: "Записаться на Просмотр", browse: "Просмотреть Объявления", stat1: "200+", stat1label: "Управляемых Единиц", stat2: "98%", stat2label: "Заполняемость", stat3: "10+", stat3label: "Лет Опыта", stat4: "2 Штата", stat4label: "NJ и NY" },
    services: { tag: "Что Мы Предлагаем", heading1: "Полный Спектр Услуг", heading2: "в NJ и NY", sub: "Аренда, покупка, продажа или инвестиции — Rosalia Group предоставляет местную экспертизу и проверенные результаты.", cta: "Связаться", s1title: "Аренда Квартир", s1desc: "Квартиры от студии до четырёх спален в Ньюарке, Джерси-Сити, Ист-Оранже, Элизабет, Нью-Йорке, Бруклине и Бронксе.", s1cta: "Смотреть Аренду", s2title: "Купля-Продажа", s2desc: "Лицензированные риэлторы NJ и NY сопровождают покупателей и продавцов от первого показа до закрытия сделки.", s2cta: "Поиск Объявлений", s3title: "Управление Недвижимостью", s3desc: "Полное управление для арендодателей и инвесторов. Проверка арендаторов, сбор аренды, координация обслуживания 24/7.", s3cta: "Узнать Больше", certBadge: "Сертификат SBE и MWBE", certSub: "С гордостью служим сообществам Нью-Джерси и Нью-Йорка с честностью, опытом и личным вниманием." },
    allServices: { tag: "Всё Что Мы Делаем", heading1: "Полный Спектр", heading2: "Наших Услуг", sub: "От поиска первой квартиры до управления глобальным портфелем недвижимости.", ctaTitle: "Не Знаете С Чего Начать?", ctaSub: "Давайте найдём подходящую услугу для вас.", ctaBtn1: "Бесплатная Консультация", ctaBtn2: "Позвонить Сейчас", learnMore: "Узнать Больше", showLess: "Показать Меньше" },
    rentals: { tag: "Доступно Сейчас", heading: "Рекомендуемая Аренда", bookTour: "Записаться на Просмотр", bed: "Спальня", bath: "Ванная", sqft: "м²", scheduleTour: "Запланировать Просмотр", viewAll: "Смотреть Все Объявления", badge1: "Рекомендуемое", badge2: "Новое Объявление", badge3: "Доступно" },
    buySell: { tag: "Экспертное Руководство", heading1: "Купля-Продажа Недвижимости", heading2: "в NJ и NY", buyTab: "Покупка", sellTab: "Продажа", buyTitle: "Найдите Дом Мечты", buySub: "Доступ к актуальным объявлениям MLS в NJ и NY с профессиональным представлением покупателя.", buyBtn: "Поговорить с Агентом Покупателя", sellTitle: "Продать по Максимальной Цене", sellSub: "Стратегическое ценообразование, профессиональный маркетинг и экспертные переговоры.", sellBtn: "Бесплатная Консультация", searchPlaceholder: "Поиск по городу, индексу или адресу…", searchBtn: "Поиск" },
    management: { tag: "Владение Без Хлопот", heading1: "Управление Недвижимостью", heading2: "Которое Работает Для Вас", sub: "Мы берём на себя всё — чтобы вам не пришлось.", getStarted: "Начать" },
    international: { tag: "Глобальный Охват", heading1: "Международная", heading2: "Недвижимость", sub: "Покупайте, продавайте и инвестируйте в недвижимость на Карибах, в Латинской Америке, Европе и за её пределами.", exploreBtn: "Изучить Международные Объявления", inquireBtn: "Запросить Сейчас", resortTag: "Инвестиции в Курорт", resortHeading: "Элитная Курортная Недвижимость", resortSub: "Инвестируйте в курортную недвижимость мирового класса и позвольте Rosalia Group управлять ею.", learnMore: "Узнать Больше" },
    cta: { heading: "Готовы Начать?", sub: "Аренда, покупка, продажа или инвестиции — мы здесь, чтобы помочь в NJ, NY и на международном уровне.", btn1: "Запланировать Бесплатную Консультацию", btn2: "Позвонить Сейчас" },
    about: { tag: "Наша История", heading1: "Познакомьтесь с", heading2: "Ana Haynes", sub: "Компания по недвижимости под руководством женщин и в семейной собственности, обслуживающая NJ и NY.", testimonialsHeading: "Что Говорят Наши Клиенты", founderTitle: "Основатель и Ведущий Агент" },
    contact: { tag: "Связаться", heading1: "Давайте Начнём", heading2: "Разговор", sub: "Готовы найти следующий дом, продать недвижимость или изучить инвестиционные возможности?", firstName: "Имя", lastName: "Фамилия", email: "Адрес Электронной Почты", phone: "Номер Телефона", service: "Меня Интересует…", message: "Сообщение", smsConsent: "Я соглашаюсь получать SMS-сообщения от Rosalia Group. Могут применяться тарифы на сообщения и данные. Ответьте STOP для отписки.", sendBtn: "Отправить Сообщение", selectService: "Выберите один" },
    footer: { desc: "Специалисты по недвижимости, управлению недвижимостью и международным курортным инвестициям в NJ и NY. Под руководством женщин, семейная собственность. Сертификат SBE и MWBE.", services: "Услуги", areas: "Зоны Обслуживания", contact: "Контакты", rights: "Все права защищены.", privacy: "Политика Конфиденциальности", terms: "Условия", sbe: "Сертификат SBE и MWBE" },
  },
  uk: {
    nav: { services: "Послуги", rentals: "Оренда", buySell: "Купівля-Продаж", management: "Управління", international: "Міжнародне", about: "Про Нас", contact: "Контакти", bookTour: "Записатися на Перегляд" },
    hero: { tag: "Нерухомість у Нью-Джерсі та Нью-Йорку", headline1: "Ваш Дім", headline2: "у", headline3: "Починається Тут", sub: "Rosalia Group з'єднує орендарів, покупців та інвесторів у Нью-Джерсі та Нью-Йорку з турботою та досвідом, на які ви заслуговуєте.", bookTour: "Записатися на Перегляд", browse: "Переглянути Оголошення", stat1: "200+", stat1label: "Одиниць в Управлінні", stat2: "98%", stat2label: "Рівень Заповненості", stat3: "10+", stat3label: "Років Досвіду", stat4: "2 Штати", stat4label: "NJ і NY" },
    services: { tag: "Що Ми Пропонуємо", heading1: "Повний Спектр Послуг", heading2: "у NJ і NY", sub: "Оренда, купівля, продаж чи інвестиції — Rosalia Group надає місцеву експертизу та перевірені результати.", cta: "Зв'язатися", s1title: "Оренда Квартир", s1desc: "Квартири від студії до чотирьох спалень у Ньюарку, Джерсі-Сіті, Іст-Оранжі, Елізабет, Нью-Йорку, Брукліні та Бронксі.", s1cta: "Переглянути Оренду", s2title: "Купівля-Продаж", s2desc: "Ліцензовані ріелтори NJ і NY супроводжують покупців і продавців від першого показу до закриття угоди.", s2cta: "Пошук Оголошень", s3title: "Управління Нерухомістю", s3desc: "Повне управління для орендодавців та інвесторів. Перевірка орендарів, збір орендної плати, координація обслуговування 24/7.", s3cta: "Дізнатися Більше", certBadge: "Сертифікат SBE і MWBE", certSub: "З гордістю служимо громадам Нью-Джерсі та Нью-Йорку з чесністю, досвідом та особистою увагою." },
    allServices: { tag: "Все Що Ми Робимо", heading1: "Повний Спектр", heading2: "Наших Послуг", sub: "Від пошуку першої квартири до управління глобальним портфелем нерухомості.", ctaTitle: "Не Знаєте З Чого Почати?", ctaSub: "Давайте знайдемо підходящу послугу для вас.", ctaBtn1: "Безкоштовна Консультація", ctaBtn2: "Зателефонувати Зараз", learnMore: "Дізнатися Більше", showLess: "Показати Менше" },
    rentals: { tag: "Доступно Зараз", heading: "Рекомендована Оренда", bookTour: "Записатися на Перегляд", bed: "Спальня", bath: "Ванна", sqft: "м²", scheduleTour: "Запланувати Перегляд", viewAll: "Переглянути Всі Оголошення", badge1: "Рекомендоване", badge2: "Нове Оголошення", badge3: "Доступно" },
    buySell: { tag: "Експертне Керівництво", heading1: "Купівля-Продаж Нерухомості", heading2: "у NJ і NY", buyTab: "Купівля", sellTab: "Продаж", buyTitle: "Знайдіть Будинок Мрії", buySub: "Доступ до актуальних оголошень MLS у NJ і NY з професійним представленням покупця.", buyBtn: "Поговорити з Агентом Покупця", sellTitle: "Продати за Максимальною Ціною", sellSub: "Стратегічне ціноутворення, професійний маркетинг та експертні переговори.", sellBtn: "Безкоштовна Консультація", searchPlaceholder: "Пошук за містом, індексом або адресою…", searchBtn: "Пошук" },
    management: { tag: "Володіння Без Клопоту", heading1: "Управління Нерухомістю", heading2: "Яке Працює Для Вас", sub: "Ми беремо на себе все — щоб вам не довелося.", getStarted: "Почати" },
    international: { tag: "Глобальне Охоплення", heading1: "Міжнародна", heading2: "Нерухомість", sub: "Купуйте, продавайте та інвестуйте в нерухомість на Карибах, у Латинській Америці, Європі та за її межами.", exploreBtn: "Вивчити Міжнародні Оголошення", inquireBtn: "Запитати Зараз", resortTag: "Інвестиції в Курорт", resortHeading: "Елітна Курортна Нерухомість", resortSub: "Інвестуйте в курортну нерухомість світового класу і дозвольте Rosalia Group управляти нею.", learnMore: "Дізнатися Більше" },
    cta: { heading: "Готові Почати?", sub: "Оренда, купівля, продаж чи інвестиції — ми тут, щоб допомогти у NJ, NY та на міжнародному рівні.", btn1: "Запланувати Безкоштовну Консультацію", btn2: "Зателефонувати Зараз" },
    about: { tag: "Наша Історія", heading1: "Познайомтеся з", heading2: "Ana Haynes", sub: "Компанія з нерухомості під керівництвом жінок та у сімейній власності, що обслуговує NJ і NY.", testimonialsHeading: "Що Кажуть Наші Клієнти", founderTitle: "Засновник та Провідний Агент" },
    contact: { tag: "Зв'язатися", heading1: "Давайте Почнемо", heading2: "Розмову", sub: "Готові знайти наступний дім, продати нерухомість або вивчити інвестиційні можливості?", firstName: "Ім'я", lastName: "Прізвище", email: "Адреса Електронної Пошти", phone: "Номер Телефону", service: "Мене Цікавить…", message: "Повідомлення", smsConsent: "Я погоджуюся отримувати SMS-повідомлення від Rosalia Group. Можуть застосовуватися тарифи на повідомлення та дані. Відповідайте STOP для відписки.", sendBtn: "Надіслати Повідомлення", selectService: "Виберіть один" },
    footer: { desc: "Спеціалісти з нерухомості, управління нерухомістю та міжнародних курортних інвестицій у NJ і NY. Під керівництвом жінок, сімейна власність. Сертифікат SBE і MWBE.", services: "Послуги", areas: "Зони Обслуговування", contact: "Контакти", rights: "Всі права захищені.", privacy: "Політика Конфіденційності", terms: "Умови", sbe: "Сертифікат SBE і MWBE" },
  },
  hi: {
    nav: { services: "सेवाएं", rentals: "किराया", buySell: "खरीद और बिक्री", management: "प्रबंधन", international: "अंतर्राष्ट्रीय", about: "हमारे बारे में", contact: "संपर्क", bookTour: "टूर बुक करें" },
    hero: { tag: "न्यू जर्सी और न्यूयॉर्क में रियल एस्टेट", headline1: "आपका घर", headline2: "में", headline3: "यहाँ से शुरू होता है", sub: "Rosalia Group न्यू जर्सी और न्यूयॉर्क में किरायेदारों, खरीदारों और निवेशकों को जोड़ता है।", bookTour: "टूर बुक करें", browse: "लिस्टिंग ब्राउज़ करें", stat1: "200+", stat1label: "प्रबंधित इकाइयां", stat2: "98%", stat2label: "अधिभोग दर", stat3: "10+", stat3label: "वर्षों का अनुभव", stat4: "2 राज्य", stat4label: "NJ और NY" },
    services: { tag: "हम क्या प्रदान करते हैं", heading1: "पूर्ण रियल एस्टेट सेवाएं", heading2: "NJ और NY में", sub: "चाहे आप किराए पर लें, खरीदें, बेचें या निवेश करें — Rosalia Group स्थानीय विशेषज्ञता और सिद्ध परिणाम लाता है।", cta: "संपर्क करें", s1title: "अपार्टमेंट किराया", s1desc: "नेवार्क, जर्सी सिटी, ईस्ट ऑरेंज, एलिजाबेथ, न्यूयॉर्क, ब्रुकलिन और ब्रोंक्स में स्टूडियो से चार बेडरूम अपार्टमेंट।", s1cta: "किराया देखें", s2title: "खरीद और बिक्री", s2desc: "लाइसेंस प्राप्त NJ और NY रियल्टर्स पहली दिखावट से समापन तक खरीदारों और विक्रेताओं का मार्गदर्शन करते हैं।", s2cta: "लिस्टिंग खोजें", s3title: "संपत्ति प्रबंधन", s3desc: "मकान मालिकों और निवेशकों के लिए पूर्ण सेवा प्रबंधन। किरायेदार स्क्रीनिंग, किराया संग्रह, 24/7 रखरखाव समन्वय।", s3cta: "अधिक जानें", certBadge: "SBE और MWBE प्रमाणित", certSub: "ईमानदारी, विशेषज्ञता और व्यक्तिगत ध्यान के साथ न्यू जर्सी और न्यूयॉर्क समुदायों की सेवा करते हुए गर्व महसूस करते हैं।" },
    allServices: { tag: "हम जो कुछ भी करते हैं", heading1: "हमारी पूर्ण श्रृंखला", heading2: "सेवाओं की", sub: "पहले अपार्टमेंट खोजने से लेकर वैश्विक रियल एस्टेट पोर्टफोलियो प्रबंधन तक।", ctaTitle: "नहीं जानते कहाँ से शुरू करें?", ctaSub: "आइए आपके लिए सही सेवा खोजें।", ctaBtn1: "मुफ्त परामर्श", ctaBtn2: "अभी कॉल करें", learnMore: "अधिक जानें", showLess: "कम दिखाएं" },
    rentals: { tag: "अभी उपलब्ध", heading: "विशेष किराया", bookTour: "टूर बुक करें", bed: "बेडरूम", bath: "बाथरूम", sqft: "वर्ग फुट", scheduleTour: "टूर शेड्यूल करें", viewAll: "सभी लिस्टिंग देखें", badge1: "विशेष", badge2: "नई लिस्टिंग", badge3: "उपलब्ध" },
    buySell: { tag: "विशेषज्ञ मार्गदर्शन", heading1: "रियल एस्टेट खरीद और बिक्री", heading2: "NJ और NY में", buyTab: "खरीदना", sellTab: "बेचना", buyTitle: "अपना सपनों का घर खोजें", buySub: "NJ और NY में लाइव MLS लिस्टिंग तक पहुंच विशेषज्ञ खरीदार प्रतिनिधित्व के साथ।", buyBtn: "खरीदार एजेंट से बात करें", sellTitle: "सर्वोच्च कीमत पर बेचें", sellSub: "रणनीतिक मूल्य निर्धारण, पेशेवर मार्केटिंग और विशेषज्ञ वार्ता।", sellBtn: "मुफ्त परामर्श", searchPlaceholder: "शहर, ज़िप या पते से खोजें…", searchBtn: "खोजें" },
    management: { tag: "परेशानी मुक्त संपत्ति स्वामित्व", heading1: "संपत्ति प्रबंधन", heading2: "जो आपके लिए काम करे", sub: "हम सब कुछ संभालते हैं — ताकि आपको न करना पड़े।", getStarted: "शुरू करें" },
    international: { tag: "वैश्विक पहुंच", heading1: "अंतर्राष्ट्रीय", heading2: "संपत्तियां", sub: "कैरिबियन, लैटिन अमेरिका, यूरोप और उससे परे संपत्तियों में खरीदें, बेचें और निवेश करें।", exploreBtn: "अंतर्राष्ट्रीय लिस्टिंग एक्सप्लोर करें", inquireBtn: "अभी पूछताछ करें", resortTag: "रिसॉर्ट निवेश", resortHeading: "लक्जरी रिसॉर्ट संपत्तियां", resortSub: "विश्व स्तरीय रिसॉर्ट संपत्तियों में निवेश करें और Rosalia Group को उन्हें प्रबंधित करने दें।", learnMore: "अधिक जानें" },
    cta: { heading: "शुरू करने के लिए तैयार हैं?", sub: "चाहे आप किराए पर लें, खरीदें, बेचें या निवेश करें — हम NJ, NY और अंतर्राष्ट्रीय स्तर पर मदद के लिए यहाँ हैं।", btn1: "मुफ्त परामर्श शेड्यूल करें", btn2: "अभी कॉल करें" },
    about: { tag: "हमारी कहानी", heading1: "मिलिए", heading2: "Ana Haynes से", sub: "महिला-संचालित, परिवार-स्वामित्व वाली रियल एस्टेट फर्म जो NJ और NY की सेवा करती है।", testimonialsHeading: "हमारे ग्राहक क्या कहते हैं", founderTitle: "संस्थापक और प्रमुख एजेंट" },
    contact: { tag: "संपर्क करें", heading1: "आइए एक", heading2: "बातचीत शुरू करें", sub: "अपना अगला घर खोजने, संपत्ति बेचने या निवेश के अवसर तलाशने के लिए तैयार हैं?", firstName: "पहला नाम", lastName: "अंतिम नाम", email: "ईमेल पता", phone: "फोन नंबर", service: "मुझे रुचि है…", message: "संदेश", smsConsent: "मैं Rosalia Group से SMS संदेश प्राप्त करने के लिए सहमत हूं। संदेश और डेटा दरें लागू हो सकती हैं। ऑप्ट आउट करने के लिए STOP उत्तर दें।", sendBtn: "संदेश भेजें", selectService: "एक चुनें" },
    footer: { desc: "NJ और NY में रियल एस्टेट, संपत्ति प्रबंधन और अंतर्राष्ट्रीय रिसॉर्ट निवेश विशेषज्ञ। महिला-संचालित, परिवार-स्वामित्व। SBE और MWBE प्रमाणित।", services: "सेवाएं", areas: "सेवा क्षेत्र", contact: "संपर्क", rights: "सर्वाधिकार सुरक्षित।", privacy: "गोपनीयता नीति", terms: "शर्तें", sbe: "SBE और MWBE प्रमाणित" },
  },
  bn: {
    nav: { services: "সেবা", rentals: "ভাড়া", buySell: "কেনা-বেচা", management: "ব্যবস্থাপনা", international: "আন্তর্জাতিক", about: "আমাদের সম্পর্কে", contact: "যোগাযোগ", bookTour: "ট্যুর বুক করুন" },
    hero: { tag: "নিউ জার্সি ও নিউ ইয়র্কে রিয়েল এস্টেট", headline1: "আপনার বাড়ি", headline2: "এ", headline3: "এখান থেকে শুরু হয়", sub: "Rosalia Group নিউ জার্সি ও নিউ ইয়র্কে ভাড়াটে, ক্রেতা এবং বিনিয়োগকারীদের সংযুক্ত করে।", bookTour: "ট্যুর বুক করুন", browse: "তালিকা দেখুন", stat1: "২০০+", stat1label: "পরিচালিত ইউনিট", stat2: "৯৮%", stat2label: "দখলের হার", stat3: "১০+", stat3label: "বছরের অভিজ্ঞতা", stat4: "২টি রাজ্য", stat4label: "NJ ও NY" },
    services: { tag: "আমরা কী অফার করি", heading1: "সম্পূর্ণ রিয়েল এস্টেট সেবা", heading2: "NJ ও NY তে", sub: "ভাড়া, কেনা, বেচা বা বিনিয়োগ — Rosalia Group স্থানীয় দক্ষতা এবং প্রমাণিত ফলাফল নিয়ে আসে।", cta: "যোগাযোগ করুন", s1title: "অ্যাপার্টমেন্ট ভাড়া", s1desc: "নেওয়ার্ক, জার্সি সিটি, ইস্ট অরেঞ্জ, এলিজাবেথ, নিউ ইয়র্ক সিটি, ব্রুকলিন এবং ব্রঙ্কসে স্টুডিও থেকে চার বেডরুম অ্যাপার্টমেন্ট।", s1cta: "ভাড়া দেখুন", s2title: "কেনা-বেচা", s2desc: "লাইসেন্সপ্রাপ্ত NJ ও NY রিয়েলটর প্রথম দেখানো থেকে সমাপ্তি পর্যন্ত ক্রেতা ও বিক্রেতাদের গাইড করেন।", s2cta: "তালিকা খুঁজুন", s3title: "সম্পত্তি ব্যবস্থাপনা", s3desc: "বাড়িওয়ালা এবং বিনিয়োগকারীদের জন্য সম্পূর্ণ সেবা ব্যবস্থাপনা। ভাড়াটে স্ক্রিনিং, ভাড়া সংগ্রহ, ২৪/৭ রক্ষণাবেক্ষণ সমন্বয়।", s3cta: "আরও জানুন", certBadge: "SBE ও MWBE সার্টিফাইড", certSub: "সততা, দক্ষতা এবং ব্যক্তিগত যত্নের সাথে নিউ জার্সি ও নিউ ইয়র্ক সম্প্রদায়ের সেবা করতে গর্বিত।" },
    allServices: { tag: "আমরা যা করি", heading1: "আমাদের সম্পূর্ণ", heading2: "সেবার তালিকা", sub: "প্রথম অ্যাপার্টমেন্ট খোঁজা থেকে বৈশ্বিক রিয়েল এস্টেট পোর্টফোলিও পরিচালনা পর্যন্ত।", ctaTitle: "কোথা থেকে শুরু করবেন জানেন না?", ctaSub: "আসুন আপনার জন্য সঠিক সেবা খুঁজে বের করি।", ctaBtn1: "বিনামূল্যে পরামর্শ", ctaBtn2: "এখনই কল করুন", learnMore: "আরও জানুন", showLess: "কম দেখান" },
    rentals: { tag: "এখন উপলব্ধ", heading: "বিশেষ ভাড়া", bookTour: "ট্যুর বুক করুন", bed: "বেডরুম", bath: "বাথরুম", sqft: "বর্গফুট", scheduleTour: "ট্যুর নির্ধারণ করুন", viewAll: "সব তালিকা দেখুন", badge1: "বিশেষ", badge2: "নতুন তালিকা", badge3: "উপলব্ধ" },
    buySell: { tag: "বিশেষজ্ঞ নির্দেশনা", heading1: "রিয়েল এস্টেট কেনা-বেচা", heading2: "NJ ও NY তে", buyTab: "কেনা", sellTab: "বেচা", buyTitle: "আপনার স্বপ্নের বাড়ি খুঁজুন", buySub: "বিশেষজ্ঞ ক্রেতা প্রতিনিধিত্বের সাথে NJ ও NY তে লাইভ MLS তালিকায় অ্যাক্সেস।", buyBtn: "ক্রেতা এজেন্টের সাথে কথা বলুন", sellTitle: "সর্বোচ্চ মূল্যে বিক্রি করুন", sellSub: "কৌশলগত মূল্য নির্ধারণ, পেশাদার বিপণন এবং বিশেষজ্ঞ আলোচনা।", sellBtn: "বিনামূল্যে পরামর্শ", searchPlaceholder: "শহর, জিপ বা ঠিকানা দিয়ে খুঁজুন…", searchBtn: "খুঁজুন" },
    management: { tag: "ঝামেলামুক্ত সম্পত্তি মালিকানা", heading1: "সম্পত্তি ব্যবস্থাপনা", heading2: "যা আপনার জন্য কাজ করে", sub: "আমরা সব কিছু পরিচালনা করি — যাতে আপনাকে করতে না হয়।", getStarted: "শুরু করুন" },
    international: { tag: "বৈশ্বিক পৌঁছানো", heading1: "আন্তর্জাতিক", heading2: "সম্পত্তি", sub: "ক্যারিবিয়ান, লাতিন আমেরিকা, ইউরোপ এবং তার বাইরে সম্পত্তিতে কিনুন, বিক্রি করুন এবং বিনিয়োগ করুন।", exploreBtn: "আন্তর্জাতিক তালিকা অন্বেষণ করুন", inquireBtn: "এখনই জিজ্ঞাসা করুন", resortTag: "রিসোর্ট বিনিয়োগ", resortHeading: "বিলাসবহুল রিসোর্ট সম্পত্তি", resortSub: "বিশ্বমানের রিসোর্ট সম্পত্তিতে বিনিয়োগ করুন এবং Rosalia Group কে পরিচালনা করতে দিন।", learnMore: "আরও জানুন" },
    cta: { heading: "শুরু করতে প্রস্তুত?", sub: "ভাড়া, কেনা, বেচা বা বিনিয়োগ — আমরা NJ, NY এবং আন্তর্জাতিকভাবে সাহায্য করতে এখানে আছি।", btn1: "বিনামূল্যে পরামর্শ নির্ধারণ করুন", btn2: "এখনই কল করুন" },
    about: { tag: "আমাদের গল্প", heading1: "পরিচয় করুন", heading2: "Ana Haynes এর সাথে", sub: "মহিলা-পরিচালিত, পারিবারিক মালিকানাধীন রিয়েল এস্টেট ফার্ম যা NJ ও NY সেবা করে।", testimonialsHeading: "আমাদের ক্লায়েন্টরা কী বলেন", founderTitle: "প্রতিষ্ঠাতা ও প্রধান এজেন্ট" },
    contact: { tag: "যোগাযোগ করুন", heading1: "আসুন একটি", heading2: "কথোপকথন শুরু করি", sub: "আপনার পরবর্তী বাড়ি খুঁজতে, সম্পত্তি বিক্রি করতে বা বিনিয়োগের সুযোগ অন্বেষণ করতে প্রস্তুত?", firstName: "প্রথম নাম", lastName: "শেষ নাম", email: "ইমেইল ঠিকানা", phone: "ফোন নম্বর", service: "আমি আগ্রহী…", message: "বার্তা", smsConsent: "আমি Rosalia Group থেকে SMS বার্তা পেতে সম্মত। বার্তা ও ডেটা চার্জ প্রযোজ্য হতে পারে। অপ্ট আউট করতে STOP উত্তর দিন।", sendBtn: "বার্তা পাঠান", selectService: "একটি নির্বাচন করুন" },
    footer: { desc: "NJ ও NY তে রিয়েল এস্টেট, সম্পত্তি ব্যবস্থাপনা এবং আন্তর্জাতিক রিসোর্ট বিনিয়োগ বিশেষজ্ঞ। মহিলা-পরিচালিত, পারিবারিক মালিকানাধীন। SBE ও MWBE সার্টিফাইড।", services: "সেবা", areas: "সেবা এলাকা", contact: "যোগাযোগ", rights: "সর্বস্বত্ব সংরক্ষিত।", privacy: "গোপনীয়তা নীতি", terms: "শর্তাবলী", sbe: "SBE ও MWBE সার্টিফাইড" },
  },
  tr: {
    nav: { services: "Hizmetler", rentals: "Kiralık", buySell: "Al & Sat", management: "Yönetim", international: "Uluslararası", about: "Hakkımızda", contact: "İletişim", bookTour: "Tur Rezervasyonu" },
    hero: { tag: "New Jersey ve New York'ta Gayrimenkul", headline1: "Eviniz", headline2: "", headline3: "Buradan Başlıyor", sub: "Rosalia Group, New Jersey ve New York genelinde kiracıları, alıcıları ve yatırımcıları hak ettikleri özen ve uzmanlıkla buluşturur.", bookTour: "Tur Rezervasyonu", browse: "İlanları Gözat", stat1: "200+", stat1label: "Yönetilen Birim", stat2: "98%", stat2label: "Doluluk Oranı", stat3: "10+", stat3label: "Yıllık Deneyim", stat4: "2 Eyalet", stat4label: "NJ ve NY" },
    services: { tag: "Ne Sunuyoruz", heading1: "Kapsamlı Gayrimenkul Hizmetleri", heading2: "NJ ve NY'de", sub: "Kiralama, satın alma, satış veya yatırım — Rosalia Group yerel uzmanlık ve kanıtlanmış sonuçlar sunar.", cta: "İletişime Geç", s1title: "Daire Kiralama", s1desc: "Newark, Jersey City, East Orange, Elizabeth, New York City, Brooklyn ve Bronx'ta stüdyo ile dört yatak odalı daireler.", s1cta: "Kiralıkları Gör", s2title: "Al ve Sat", s2desc: "Lisanslı NJ ve NY emlakçıları, alıcıları ve satıcıları ilk gösterimden kapanışa kadar yönlendirir.", s2cta: "İlanları Ara", s3title: "Mülk Yönetimi", s3desc: "Ev sahipleri ve yatırımcılar için tam hizmet yönetimi. Kiracı taraması, kira tahsilatı, 7/24 bakım koordinasyonu.", s3cta: "Daha Fazla Bilgi", certBadge: "SBE ve MWBE Sertifikalı", certSub: "New Jersey ve New York topluluklarına dürüstlük, uzmanlık ve kişisel ilgiyle hizmet etmekten gurur duyuyoruz." },
    allServices: { tag: "Yaptığımız Her Şey", heading1: "Tam Hizmet", heading2: "Yelpazemiz", sub: "İlk dairenizi bulmaktan küresel bir gayrimenkul portföyü yönetmeye kadar.", ctaTitle: "Nereden Başlayacağınızı Bilmiyor musunuz?", ctaSub: "Sizin için doğru hizmeti birlikte bulalım.", ctaBtn1: "Ücretsiz Danışmanlık", ctaBtn2: "Hemen Ara", learnMore: "Daha Fazla Bilgi", showLess: "Daha Az Göster" },
    rentals: { tag: "Şu An Müsait", heading: "Öne Çıkan Kiralıklar", bookTour: "Tur Rezervasyonu", bed: "Yatak Odası", bath: "Banyo", sqft: "m²", scheduleTour: "Tur Planla", viewAll: "Tüm İlanları Gör", badge1: "Öne Çıkan", badge2: "Yeni İlan", badge3: "Müsait" },
    buySell: { tag: "Uzman Rehberlik", heading1: "Gayrimenkul Al ve Sat", heading2: "NJ ve NY'de", buyTab: "Satın Al", sellTab: "Sat", buyTitle: "Hayalinizdeki Evi Bulun", buySub: "NJ ve NY'de canlı MLS ilanlarına uzman alıcı temsilciliğiyle erişin.", buyBtn: "Alıcı Temsilcisiyle Konuş", sellTitle: "En Yüksek Fiyata Sat", sellSub: "Stratejik fiyatlandırma, profesyonel pazarlama ve uzman müzakere.", sellBtn: "Ücretsiz Danışmanlık", searchPlaceholder: "Şehir, posta kodu veya adrese göre ara…", searchBtn: "Ara" },
    management: { tag: "Zahmetsiz Mülk Sahipliği", heading1: "Mülk Yönetimi", heading2: "Sizin İçin Çalışıyor", sub: "Her şeyi biz hallederiz — siz halletmek zorunda kalmayın.", getStarted: "Başla" },
    international: { tag: "Küresel Erişim", heading1: "Uluslararası", heading2: "Mülkler", sub: "Karayipler, Latin Amerika, Avrupa ve ötesinde mülk alın, satın ve yatırım yapın.", exploreBtn: "Uluslararası İlanları Keşfet", inquireBtn: "Hemen Sorgula", resortTag: "Resort Yatırımı", resortHeading: "Lüks Resort Mülkleri", resortSub: "Dünya standartlarında resort mülklerine yatırım yapın ve Rosalia Group'un yönetmesine izin verin.", learnMore: "Daha Fazla Bilgi" },
    cta: { heading: "Başlamaya Hazır mısınız?", sub: "Kiralama, satın alma, satış veya yatırım — NJ, NY ve uluslararası alanda yardım etmek için buradayız.", btn1: "Ücretsiz Danışmanlık Planla", btn2: "Hemen Ara" },
    about: { tag: "Hikayemiz", heading1: "Tanışın", heading2: "Ana Haynes", sub: "NJ ve NY'e dürüstlük ve uzmanlıkla hizmet eden kadın liderliğinde, aile şirketi.", testimonialsHeading: "Müşterilerimiz Ne Diyor", founderTitle: "Kurucu ve Baş Ajan" },
    contact: { tag: "İletişime Geç", heading1: "Bir Konuşma", heading2: "Başlatalım", sub: "Bir sonraki evinizi bulmaya, mülkünüzü satmaya veya yatırım fırsatlarını keşfetmeye hazır mısınız?", firstName: "Ad", lastName: "Soyad", email: "E-posta Adresi", phone: "Telefon Numarası", service: "İlgilendiğim Konu…", message: "Mesaj", smsConsent: "Rosalia Group'tan SMS mesajı almayı kabul ediyorum. Mesaj ve veri ücretleri geçerli olabilir. Çıkmak için STOP yanıtlayın.", sendBtn: "Mesaj Gönder", selectService: "Birini seçin" },
    footer: { desc: "NJ ve NY'de gayrimenkul, mülk yönetimi ve uluslararası resort yatırım uzmanları. Kadın liderliğinde, aile şirketi. SBE ve MWBE Sertifikalı.", services: "Hizmetler", areas: "Hizmet Alanları", contact: "İletişim", rights: "Tüm hakları saklıdır.", privacy: "Gizlilik Politikası", terms: "Koşullar", sbe: "SBE ve MWBE Sertifikalı" },
  },
  vi: {
    nav: { services: "Dịch Vụ", rentals: "Cho Thuê", buySell: "Mua & Bán", management: "Quản Lý", international: "Quốc Tế", about: "Về Chúng Tôi", contact: "Liên Hệ", bookTour: "Đặt Lịch Xem" },
    hero: { tag: "Bất Động Sản tại New Jersey & New York", headline1: "Ngôi Nhà Của Bạn", headline2: "tại", headline3: "Bắt Đầu Từ Đây", sub: "Rosalia Group kết nối người thuê, người mua và nhà đầu tư tại New Jersey và New York với sự quan tâm và chuyên môn mà bạn xứng đáng được nhận.", bookTour: "Đặt Lịch Xem", browse: "Xem Danh Sách", stat1: "200+", stat1label: "Căn Hộ Đang Quản Lý", stat2: "98%", stat2label: "Tỷ Lệ Lấp Đầy", stat3: "10+", stat3label: "Năm Kinh Nghiệm", stat4: "2 Bang", stat4label: "NJ & NY" },
    services: { tag: "Chúng Tôi Cung Cấp", heading1: "Dịch Vụ Bất Động Sản Toàn Diện", heading2: "tại NJ & NY", sub: "Dù bạn đang thuê, mua, bán hay đầu tư — Rosalia Group mang đến chuyên môn địa phương và kết quả đã được chứng minh.", cta: "Liên Hệ", s1title: "Cho Thuê Căn Hộ", s1desc: "Căn hộ từ studio đến 4 phòng ngủ tại Newark, Jersey City, East Orange, Elizabeth, New York City, Brooklyn và Bronx.", s1cta: "Xem Cho Thuê", s2title: "Mua & Bán", s2desc: "Môi giới bất động sản được cấp phép tại NJ & NY hướng dẫn người mua và người bán từ lần xem đầu tiên đến khi đóng hợp đồng.", s2cta: "Tìm Kiếm Danh Sách", s3title: "Quản Lý Bất Động Sản", s3desc: "Quản lý dịch vụ đầy đủ cho chủ nhà và nhà đầu tư. Sàng lọc người thuê, thu tiền thuê, phối hợp bảo trì 24/7.", s3cta: "Tìm Hiểu Thêm", certBadge: "Được Chứng Nhận SBE & MWBE", certSub: "Tự hào phục vụ cộng đồng New Jersey và New York với sự chính trực, chuyên môn và sự quan tâm cá nhân." },
    allServices: { tag: "Tất Cả Những Gì Chúng Tôi Làm", heading1: "Bộ Dịch Vụ", heading2: "Đầy Đủ Của Chúng Tôi", sub: "Từ tìm căn hộ đầu tiên đến quản lý danh mục bất động sản toàn cầu.", ctaTitle: "Không Biết Bắt Đầu Từ Đâu?", ctaSub: "Hãy để chúng tôi tìm dịch vụ phù hợp cho bạn.", ctaBtn1: "Tư Vấn Miễn Phí", ctaBtn2: "Gọi Ngay", learnMore: "Tìm Hiểu Thêm", showLess: "Thu Gọn" },
    rentals: { tag: "Có Sẵn Ngay", heading: "Cho Thuê Nổi Bật", bookTour: "Đặt Lịch Xem", bed: "Phòng Ngủ", bath: "Phòng Tắm", sqft: "m²", scheduleTour: "Lên Lịch Xem", viewAll: "Xem Tất Cả Danh Sách", badge1: "Nổi Bật", badge2: "Danh Sách Mới", badge3: "Có Sẵn" },
    buySell: { tag: "Hướng Dẫn Chuyên Nghiệp", heading1: "Mua & Bán Bất Động Sản", heading2: "tại NJ & NY", buyTab: "Mua", sellTab: "Bán", buyTitle: "Tìm Ngôi Nhà Mơ Ước", buySub: "Truy cập danh sách MLS trực tiếp tại NJ & NY với đại diện người mua chuyên nghiệp.", buyBtn: "Nói Chuyện Với Đại Lý Mua", sellTitle: "Bán Với Giá Cao Nhất", sellSub: "Định giá chiến lược, tiếp thị chuyên nghiệp và đàm phán chuyên gia.", sellBtn: "Tư Vấn Miễn Phí", searchPlaceholder: "Tìm kiếm theo thành phố, mã bưu chính hoặc địa chỉ…", searchBtn: "Tìm Kiếm" },
    management: { tag: "Sở Hữu Bất Động Sản Không Lo Lắng", heading1: "Quản Lý Bất Động Sản", heading2: "Hoạt Động Cho Bạn", sub: "Chúng tôi xử lý mọi thứ — để bạn không phải làm.", getStarted: "Bắt Đầu" },
    international: { tag: "Tầm Vươn Toàn Cầu", heading1: "Bất Động Sản", heading2: "Quốc Tế", sub: "Mua, bán và đầu tư vào bất động sản ở Caribbean, Mỹ Latinh, Châu Âu và hơn thế nữa.", exploreBtn: "Khám Phá Danh Sách Quốc Tế", inquireBtn: "Hỏi Ngay", resortTag: "Đầu Tư Resort", resortHeading: "Bất Động Sản Resort Sang Trọng", resortSub: "Đầu tư vào bất động sản resort đẳng cấp thế giới và để Rosalia Group quản lý.", learnMore: "Tìm Hiểu Thêm" },
    cta: { heading: "Sẵn Sàng Bắt Đầu?", sub: "Dù bạn đang thuê, mua, bán hay đầu tư — chúng tôi ở đây để giúp bạn tại NJ, NY và quốc tế.", btn1: "Lên Lịch Tư Vấn Miễn Phí", btn2: "Gọi Ngay" },
    about: { tag: "Câu Chuyện Của Chúng Tôi", heading1: "Gặp Gỡ", heading2: "Ana Haynes", sub: "Công ty bất động sản do phụ nữ lãnh đạo, sở hữu gia đình phục vụ NJ & NY.", testimonialsHeading: "Khách Hàng Của Chúng Tôi Nói Gì", founderTitle: "Người Sáng Lập & Đại Lý Trưởng" },
    contact: { tag: "Liên Hệ", heading1: "Hãy Bắt Đầu", heading2: "Cuộc Trò Chuyện", sub: "Sẵn sàng tìm ngôi nhà tiếp theo, bán bất động sản hoặc khám phá cơ hội đầu tư?", firstName: "Tên", lastName: "Họ", email: "Địa Chỉ Email", phone: "Số Điện Thoại", service: "Tôi Quan Tâm Đến…", message: "Tin Nhắn", smsConsent: "Tôi đồng ý nhận tin nhắn SMS từ Rosalia Group. Có thể áp dụng phí tin nhắn và dữ liệu. Trả lời STOP để hủy đăng ký.", sendBtn: "Gửi Tin Nhắn", selectService: "Chọn một" },
    footer: { desc: "Chuyên gia bất động sản, quản lý bất động sản và đầu tư resort quốc tế tại NJ & NY. Do phụ nữ lãnh đạo, sở hữu gia đình. Được chứng nhận SBE & MWBE.", services: "Dịch Vụ", areas: "Khu Vực Phục Vụ", contact: "Liên Hệ", rights: "Bảo lưu mọi quyền.", privacy: "Chính Sách Bảo Mật", terms: "Điều Khoản", sbe: "Được Chứng Nhận SBE & MWBE" },
  },
  tl: {
    nav: { services: "Mga Serbisyo", rentals: "Renta", buySell: "Bilhin at Ibenta", management: "Pamamahala", international: "Internasyonal", about: "Tungkol sa Amin", contact: "Makipag-ugnayan", bookTour: "Mag-book ng Tour" },
    hero: { tag: "Real Estate sa New Jersey at New York", headline1: "Ang Iyong Tahanan", headline2: "sa", headline3: "Nagsisimula Dito", sub: "Ang Rosalia Group ay nag-uugnay ng mga nangungupahan, bumibili, at mamumuhunan sa buong New Jersey at New York.", bookTour: "Mag-book ng Tour", browse: "I-browse ang mga Listahan", stat1: "200+", stat1label: "Mga Pinamamahalaan na Unit", stat2: "98%", stat2label: "Rate ng Occupancy", stat3: "10+", stat3label: "Taon ng Karanasan", stat4: "2 Estado", stat4label: "NJ at NY" },
    services: { tag: "Ano ang Aming Inaalok", heading1: "Kumpletong Serbisyo sa Real Estate", heading2: "sa NJ at NY", sub: "Nagpapaupa, bumibili, nagbebenta, o namumuhunan — ang Rosalia Group ay nagdadala ng lokal na kaalaman at napatunayang mga resulta.", cta: "Makipag-ugnayan", s1title: "Pag-upa ng Apartment", s1desc: "Studio hanggang apat na silid-tulugan na apartment sa Newark, Jersey City, East Orange, Elizabeth, New York City, Brooklyn, at Bronx.", s1cta: "Tingnan ang mga Renta", s2title: "Bilhin at Ibenta", s2desc: "Mga lisensyadong NJ at NY realtor na gumagabay sa mga mamimili at nagbebenta mula sa unang pagpapakita hanggang sa pagsasara.", s2cta: "Maghanap ng mga Listahan", s3title: "Pamamahala ng Ari-arian", s3desc: "Kumpletong serbisyo para sa mga may-ari at mamumuhunan. Pagsusuri ng nangungupahan, pagkolekta ng upa, koordinasyon ng pagpapanatili 24/7.", s3cta: "Matuto Nang Higit Pa", certBadge: "Sertipikadong SBE at MWBE", certSub: "Ipinagmamalaki naming pagsilbihan ang mga komunidad ng New Jersey at New York nang may integridad, kaalaman, at personal na pagmamalasakit." },
    allServices: { tag: "Lahat ng Aming Ginagawa", heading1: "Aming Kumpletong", heading2: "Hanay ng mga Serbisyo", sub: "Mula sa paghanap ng iyong unang apartment hanggang sa pamamahala ng isang pandaigdigang portfolio ng real estate.", ctaTitle: "Hindi Alam Kung Saan Magsisimula?", ctaSub: "Hanapin natin ang tamang serbisyo para sa iyo.", ctaBtn1: "Libreng Konsultasyon", ctaBtn2: "Tumawag Ngayon", learnMore: "Matuto Nang Higit Pa", showLess: "Ipakita ang Mas Kaunti" },
    rentals: { tag: "Available Ngayon", heading: "Mga Tampok na Renta", bookTour: "Mag-book ng Tour", bed: "Silid-Tulugan", bath: "Banyo", sqft: "sq ft", scheduleTour: "Mag-iskedyul ng Tour", viewAll: "Tingnan ang Lahat ng Listahan", badge1: "Tampok", badge2: "Bagong Listahan", badge3: "Available" },
    buySell: { tag: "Gabay ng Eksperto", heading1: "Bilhin at Ibenta ang Real Estate", heading2: "sa NJ at NY", buyTab: "Bumili", sellTab: "Magbenta", buyTitle: "Hanapin ang Iyong Dream Home", buySub: "I-access ang mga live na listahan ng MLS sa NJ at NY na may representasyon ng eksperto sa pagbili.", buyBtn: "Makipag-usap sa isang Ahente ng Mamimili", sellTitle: "Ibenta sa Pinakamataas na Presyo", sellSub: "Estratehikong pagpepresyo, propesyonal na marketing, at dalubhasang negosasyon.", sellBtn: "Libreng Konsultasyon", searchPlaceholder: "Maghanap ayon sa lungsod, zip, o address…", searchBtn: "Maghanap" },
    management: { tag: "Walang Abala na Pagmamay-ari ng Ari-arian", heading1: "Pamamahala ng Ari-arian", heading2: "Na Gumagawa Para sa Iyo", sub: "Aming hawak ang lahat — para hindi mo na kailangang gawin.", getStarted: "Magsimula" },
    international: { tag: "Pandaigdigang Abot", heading1: "Internasyonal", heading2: "na mga Ari-arian", sub: "Bumili, magbenta, at mamuhunan sa mga ari-arian sa Caribbean, Latin America, Europe, at higit pa.", exploreBtn: "I-explore ang mga Internasyonal na Listahan", inquireBtn: "Magtanong Ngayon", resortTag: "Pamumuhunan sa Resort", resortHeading: "Mga Luxury Resort na Ari-arian", resortSub: "Mamuhunan sa mga world-class na resort na ari-arian at hayaan ang Rosalia Group na pamahalaan ang mga ito.", learnMore: "Matuto Nang Higit Pa" },
    cta: { heading: "Handa na Bang Magsimula?", sub: "Nagpapaupa, bumibili, nagbebenta, o namumuhunan — nandito kami para tumulong sa NJ, NY, at internasyonal.", btn1: "Mag-iskedyul ng Libreng Konsultasyon", btn2: "Tumawag Ngayon" },
    about: { tag: "Ang Aming Kwento", heading1: "Makilala", heading2: "si Ana Haynes", sub: "Kumpanya ng real estate na pinamumunuan ng babae at pag-aari ng pamilya na naglilingkod sa NJ at NY.", testimonialsHeading: "Ano ang Sinasabi ng Aming mga Kliyente", founderTitle: "Tagapagtatag at Nangungunang Ahente" },
    contact: { tag: "Makipag-ugnayan", heading1: "Simulan Natin", heading2: "ang Pag-uusap", sub: "Handa na bang hanapin ang iyong susunod na hakbang?", firstName: "Pangalan", lastName: "Apelyido", email: "Email", phone: "Telepono", service: "Serbisyo ng Interes", message: "Mensahe", smsConsent: "Sumasang-ayon ako na makatanggap ng mga text message mula sa Rosalia Group.", sendBtn: "Ipadala ang Kahilingan", selectService: "Pumili ng isa" },
    footer: { desc: "Mga espesyalista sa real estate, pamamahala ng ari-arian, at internasyonal na pamumuhunan sa resort sa NJ at NY. Pinamumunuan ng babae, pag-aari ng pamilya. Sertipikadong SBE at MWBE.", services: "Mga Serbisyo", areas: "Mga Lugar na Pinaglilingkuran", contact: "Makipag-ugnayan", rights: "Lahat ng karapatan ay nakalaan.", privacy: "Patakaran sa Privacy", terms: "Mga Tuntunin", sbe: "Sertipikadong SBE at MWBE" },
  },
};

// ── Translation lookup ──────────────────────────────────────────────────────
/**
 * The full translation object a component consumes: the core `SiteTranslations`
 * plus the `DeepContent` marketing/body copy, both read from one global source.
 */
export type Translations = SiteTranslations & DeepContent;

/** English is the base every language is deep-merged onto. */
const EN_FULL: Translations = { ...EN, ...DEEP_EN };

/**
 * Resolve the complete dictionary for a language: English base ← core override
 * (inline `TRANSLATIONS`) ← deep/locale override (`DEEP`). Any key a language
 * has not translated transparently falls back to English.
 */
function getTranslation(lang: LangCode): Translations {
  const withCore = deepMerge(EN_FULL, TRANSLATIONS[lang]);
  return deepMerge(withCore, DEEP[lang]);
}

// ── Context ───────────────────────────────────────────────────────────────────
interface LanguageContextType {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: Translations;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: EN_FULL,
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    // Auto-detect from browser
    const saved = localStorage.getItem("rg-lang");
    if (saved) return saved as LangCode;
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("es")) return "es";
    if (browser.startsWith("pt")) return "pt";
    if (browser.startsWith("fr")) return "fr";
    if (browser.startsWith("ar")) return "ar";
    if (browser.startsWith("zh-tw") || browser.startsWith("zh-hant")) return "zh-TW";
    if (browser.startsWith("zh")) return "zh";
    if (browser.startsWith("ja")) return "ja";
    if (browser.startsWith("ko")) return "ko";
    if (browser.startsWith("hi")) return "hi";
    if (browser.startsWith("tr")) return "tr";
    if (browser.startsWith("vi")) return "vi";
    if (browser.startsWith("ru")) return "ru";
    if (browser.startsWith("uk")) return "uk";
    if (browser.startsWith("pl")) return "pl";
    if (browser.startsWith("de")) return "de";
    if (browser.startsWith("nl")) return "nl";
    if (browser.startsWith("it")) return "it";
    if (browser.startsWith("bn")) return "bn";
    if (browser.startsWith("tl") || browser.startsWith("fil")) return "tl";
    if (browser.startsWith("sw")) return "sw";
    if (browser.startsWith("ht")) return "ht";
    return "en";
  });

  // Wouter location. Re-running the side-effect on every route change guarantees
  // a freshly-mounted page can never drift from the selected language.
  const [location] = useLocation();

  const setLang = (code: LangCode) => setLangState(code);

  // Single source of truth for persistence + document attributes. Runs on mount,
  // on every language change, and on every navigation — so localStorage, the
  // <html lang> attribute, and RTL direction stay in lockstep across all routes.
  useEffect(() => {
    try {
      localStorage.setItem("rg-lang", lang);
    } catch {
      /* private-mode / storage-disabled: language still applies for the session */
    }
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, location]);

  const t = getTranslation(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
