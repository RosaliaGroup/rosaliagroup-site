/**
 * LanguageContext — Global language state for the entire Rosalia Group website.
 * Design: Urban Warmth / Warm Brutalism — Playfair Display + DM Sans + Space Mono
 * All sections read from this context to render translated content.
 */
import React, { createContext, useContext, useState, useEffect } from "react";

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
    contact: string; bookTour: string;
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
const TRANSLATIONS: Record<string, SiteTranslations> = {
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

// For languages not fully translated, fall back to English
function getTranslation(code: string): SiteTranslations {
  if (TRANSLATIONS[code]) return TRANSLATIONS[code];
  // zh-TW falls back to zh
  if (code === "zh-TW") return TRANSLATIONS.zh;
  return TRANSLATIONS.en;
}

// ── Context ───────────────────────────────────────────────────────────────────
interface LanguageContextType {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: SiteTranslations;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: EN,
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

  const setLang = (code: LangCode) => {
    setLangState(code);
    localStorage.setItem("rg-lang", code);
    // Update document direction for RTL languages
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = code;
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

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
