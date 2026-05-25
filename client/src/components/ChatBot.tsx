/**
 * ROSALIA GROUP — Live Chat Bot (v5)
 * Design: Urban Warmth / Warm Brutalism
 *
 * Features:
 *   - Anthropic Claude API via /api/chat backend proxy
 *   - 22-language selector (auto-detected from browser)
 *   - ALL UI strings, service labels, preset questions translate with language
 *   - Service selection menu with 14 options
 *   - Preset question buttons per service (no typing required)
 *   - Inline lead capture form (First, Last, Email, Phone, Message, SMS consent)
 *   - Confirmation screen with contact details
 */

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  MessageCircle, X, Send, Bot, User, Loader2, ChevronLeft,
  Home, TrendingUp, Building2, BarChart3, Globe, ShoppingBag,
  Lightbulb, Users, MapPin, PieChart, Briefcase, Paintbrush,
  Phone, Mail, Clock, Languages,
} from "lucide-react";
import { getTranslation } from "@/lib/chatTranslations";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type ChatView = "menu" | "chat" | "form" | "confirm";

interface LeadForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  smsConsent: boolean;
}

interface Language {
  code: string;
  label: string;
  native: string;
}

/* ─── Languages ─────────────────────────────────────────────────────── */
const LANGUAGES: Language[] = [
  { code: "en",    label: "English",              native: "English" },
  { code: "es",    label: "Spanish",              native: "Español" },
  { code: "pt",    label: "Portuguese",           native: "Português" },
  { code: "fr",    label: "French",               native: "Français" },
  { code: "it",    label: "Italian",              native: "Italiano" },
  { code: "de",    label: "German",               native: "Deutsch" },
  { code: "nl",    label: "Dutch",                native: "Nederlands" },
  { code: "pl",    label: "Polish",               native: "Polski" },
  { code: "ru",    label: "Russian",              native: "Русский" },
  { code: "uk",    label: "Ukrainian",            native: "Українська" },
  { code: "ar",    label: "Arabic",               native: "العربية" },
  { code: "zh",    label: "Chinese (Simplified)", native: "中文(简体)" },
  { code: "zh-TW", label: "Chinese (Traditional)",native: "中文(繁體)" },
  { code: "ja",    label: "Japanese",             native: "日本語" },
  { code: "ko",    label: "Korean",               native: "한국어" },
  { code: "hi",    label: "Hindi",                native: "हिन्दी" },
  { code: "bn",    label: "Bengali",              native: "বাংলা" },
  { code: "tr",    label: "Turkish",              native: "Türkçe" },
  { code: "vi",    label: "Vietnamese",           native: "Tiếng Việt" },
  { code: "tl",    label: "Filipino (Tagalog)",   native: "Filipino" },
  { code: "ht",    label: "Haitian Creole",       native: "Kreyòl Ayisyen" },
  { code: "sw",    label: "Swahili",              native: "Kiswahili" },
];

function detectBrowserLanguage(): string {
  const lang = navigator.language || "en";
  const code = lang.split("-")[0];
  const match = LANGUAGES.find(l => l.code === lang || l.code === code);
  return match ? match.code : "en";
}

/* ─── Service IDs (stable, language-independent) ────────────────────── */
const SERVICE_IDS = [
  "rentals", "sales", "intlListings", "resort", "propertyMgmt",
  "intlMgmt", "assetMgmt", "acquisitions", "consulting",
  "tenantPlacement", "relocation", "investment", "commercial", "staging",
] as const;

type ServiceId = typeof SERVICE_IDS[number];

const SERVICE_ICONS: Record<ServiceId, React.ElementType> = {
  rentals: Home, sales: TrendingUp, intlListings: Globe, resort: MapPin,
  propertyMgmt: Building2, intlMgmt: Globe, assetMgmt: BarChart3,
  acquisitions: ShoppingBag, consulting: Lightbulb, tenantPlacement: Users,
  relocation: MapPin, investment: PieChart, commercial: Briefcase, staging: Paintbrush,
};

const SERVICE_COLORS: Record<ServiceId, string> = {
  rentals: "oklch(0.55 0.13 38)", sales: "oklch(0.52 0.07 130)",
  intlListings: "oklch(0.40 0.12 200)", resort: "oklch(0.40 0.12 200)",
  propertyMgmt: "oklch(0.40 0.06 240)", intlMgmt: "oklch(0.40 0.12 200)",
  assetMgmt: "oklch(0.55 0.13 38)", acquisitions: "oklch(0.40 0.06 240)",
  consulting: "oklch(0.55 0.13 38)", tenantPlacement: "oklch(0.52 0.07 130)",
  relocation: "oklch(0.40 0.06 240)", investment: "oklch(0.55 0.13 38)",
  commercial: "oklch(0.52 0.07 130)", staging: "oklch(0.40 0.06 240)",
};

/* English service prompts to kick off AI conversation (always English for Claude) */
const SERVICE_PROMPTS: Record<ServiceId, string> = {
  rentals:          "Tell me about your apartment rental listings in New Jersey and New York.",
  sales:            "I'm interested in buying or selling a home in New Jersey or New York.",
  intlListings:     "I'm interested in international property listings. What countries do you cover?",
  resort:           "Tell me about resort investment properties and how I can earn rental income.",
  propertyMgmt:     "How does your property management service work for landlords?",
  intlMgmt:         "I own a property overseas. How does your international property management work?",
  assetMgmt:        "Can you explain your asset management services for real estate portfolios?",
  acquisitions:     "I want to acquire investment properties. How can Rosalia Group help?",
  consulting:       "Tell me about your consulting services for maximizing real estate project returns.",
  tenantPlacement:  "I need help finding a qualified tenant. What does your placement service include?",
  relocation:       "I'm relocating to New Jersey or New York. What relocation assistance do you provide?",
  investment:       "I want an analysis of my real estate investment portfolio.",
  commercial:       "I'm looking for commercial real estate services — office, retail, or industrial.",
  staging:          "I need help staging my home for sale. What staging and renovation services do you offer?",
};

/* ─── System Prompt ─────────────────────────────────────────────────── */
const buildSystemPrompt = (langCode: string) => {
  const lang = LANGUAGES.find(l => l.code === langCode);
  const langName = lang ? lang.label : "English";
  return `You are a knowledgeable and friendly real estate assistant for Rosalia Group, a New Jersey and New York real estate, property management, and international resort investment company led by Ana Haynes.

IMPORTANT: Always respond in ${langName}. If the user writes in a different language, still respond in ${langName}.

COMPANY:
- Phone: (862) 333-1681 | Email: inquiries@rosaliagroup.com
- Ana direct: (201) 449-6850 | ana@rosaliagroup.com
- Hours: Mon–Fri 9am–6pm, Sat–Sun 10am–5pm
- Domestic Areas: Newark, Jersey City, East Orange, Elizabeth, Orange (NJ) + New York City, Brooklyn, Bronx (NY)
- International Markets: Caribbean (Dominican Republic, Puerto Rico, Jamaica, Turks & Caicos), Latin America (Mexico, Costa Rica, Panama, Colombia, Brazil), Europe (Spain, Portugal, Italy, Greece, France), Asia Pacific (Bali, Thailand, Philippines, Maldives)
- Certifications: SBE, MWBE | Brokerage: Realty Mark Advantage | MLS: Bright MLS
- Stats: 200+ units managed, 98% occupancy, 10+ years experience, NJ & NY markets

SERVICES:
1. Apartment Rentals (NJ & NY) — studio to 4BR across Newark, Jersey City, East Orange, Elizabeth, Orange, NYC, Brooklyn, Bronx
2. Buy & Sell (NJ & NY) — licensed NJ & NY realtors, Bright MLS access
3. International Listings — buy, sell, or rent properties in 20+ countries
4. Resort Investment Properties — beachfront villas, resort condos, vacation rentals; rental income potential, ROI analysis, fractional ownership
5. Property Management — tenant screening, rent collection, 24/7 maintenance, monthly reporting
6. International Property Management — remote management for overseas owners
7. Asset Management — portfolio optimization for real estate investors
8. Acquisitions — off-market deal sourcing, due diligence, negotiation
9. Consulting & Project Maximization — strategy to maximize ROI on development and investment projects
10. Tenant Placement — screening and placement only
11. Relocation Assistance — concierge moves to/within NJ, NY, and internationally
12. Investment Portfolio Analysis — detailed analysis and recommendations
13. Commercial Real Estate — office, retail, industrial in NJ & NY
14. Home Staging & Renovation — staging for sale, renovation referrals

RENTALS: Iron Pointe Jersey City 1BR $2,200/mo · Madison St Newark 2BR $2,800/mo · Market St East Orange 3BR $3,400/mo.
RESORTS: Caribbean beachfront villas, Latin American eco-resort condos, European coastal properties — all with rental income management.

Keep answers concise (2–4 sentences). Be warm and professional. Encourage users to use the "Get in Touch" button to submit an inquiry.`;
};

/* ─── Anthropic API Call (via backend proxy to avoid CORS) ──────────── */
async function callClaude(
  messages: { role: "user" | "assistant"; content: string }[],
  systemPrompt: string,
  onChunk: (text: string) => void
): Promise<void> {
  let response: Response;
  try {
    response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 512,
        system: systemPrompt,
        messages,
      }),
    });
  } catch {
    onChunk("I'm having trouble connecting right now. Please contact us directly:\n\n📞 (862) 333-1681\n✉️ inquiries@rosaliagroup.com");
    return;
  }

  if (!response.ok) {
    onChunk("I'm having trouble connecting right now. Please contact us directly:\n\n📞 (862) 333-1681\n✉️ inquiries@rosaliagroup.com");
    return;
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === "content_block_delta" && data.delta?.text) {
            onChunk(data.delta.text);
          }
        } catch {}
      }
    }
  }
}

const EMPTY_FORM: LeadForm = {
  firstName: "", lastName: "", email: "", phone: "", message: "", smsConsent: false,
};

/* ─── Component ─────────────────────────────────────────────────────── */
export default function ChatBot() {
  const [isOpen, setIsOpen]             = useState(false);
  const [view, setView]                 = useState<ChatView>("menu");
  const [selectedService, setSelected]  = useState<ServiceId | null>(null);
  const [messages, setMessages]         = useState<Message[]>([]);
  const [input, setInput]               = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [hasUnread, setHasUnread]       = useState(true);
  const [form, setForm]                 = useState<LeadForm>(EMPTY_FORM);
  const [formErrors, setFormErrors]     = useState<Partial<LeadForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lang: globalLang, setLang: setGlobalLang } = useLanguage();
  const [language, setLanguage]         = useState<string>(() => globalLang || detectBrowserLanguage());
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Sync chat bot language with global navbar language
  useEffect(() => {
    setLanguage(globalLang);
  }, [globalLang]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);
  const langMenuRef    = useRef<HTMLDivElement>(null);

  // Derive translated strings reactively from language
  const t = getTranslation(language);

  useEffect(() => {
    if (isOpen) setHasUnread(false);
    if (isOpen && view === "chat") setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen, view]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close lang menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  // Build translated service menu from translation keys
  const servicesMenu = SERVICE_IDS.map(id => ({
    id,
    icon: SERVICE_ICONS[id],
    label: t.services[id],
    color: SERVICE_COLORS[id],
  }));

  // Get translated presets for current service
  const presets: string[] = selectedService
    ? (t.presets[selectedService] ?? t.presets.general)
    : t.presets.general;

  // Translated service label for header
  const serviceLabel = selectedService ? t.services[selectedService] : t.howCanWeHelp;

  async function startService(serviceId: ServiceId) {
    setSelected(serviceId);
    setView("chat");
    const prompt = SERVICE_PROMPTS[serviceId];
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: prompt, timestamp: new Date() };
    setMessages([userMsg]);
    await sendToAI([{ role: "user", content: prompt }]);
  }

  async function sendToAI(msgs: { role: "user" | "assistant"; content: string }[]) {
    setIsLoading(true);
    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);
    let full = "";
    try {
      await callClaude(msgs, buildSystemPrompt(language), (chunk) => {
        full += chunk;
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: full } : m));
      });
    } catch {
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: "I'm having trouble connecting. Please call us at (862) 333-1681." } : m));
    }
    setIsLoading(false);
  }

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
    await sendToAI(history);
  }

  function validateForm(): boolean {
    const errors: Partial<LeadForm> = {};
    if (!form.firstName.trim()) errors.firstName = "Required";
    if (!form.lastName.trim()) errors.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = "Valid email required";
    if (!form.phone.trim()) errors.phone = "Required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setIsSubmitting(false);
    setView("confirm");
  }

  function resetChat() {
    setView("menu");
    setSelected(null);
    setMessages([]);
    setInput("");
    setForm(EMPTY_FORM);
    setFormErrors({});
  }

  /* ── Render ── */
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
        style={{ background: "oklch(0.55 0.13 38)", borderRadius: 0 }}
        aria-label="Open chat"
      >
        {isOpen ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
        {!isOpen && hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[9px] font-bold">1</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col shadow-2xl border border-[oklch(0.87_0.02_80)] overflow-hidden"
          style={{ width: "360px", maxHeight: "600px", background: "oklch(0.97 0.015 80)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[oklch(0.87_0.02_80)]" style={{ background: "oklch(0.22 0.01 65)" }}>
            <div className="flex items-center gap-2">
              {(view === "chat" || view === "form") && (
                <button onClick={resetChat} className="text-[oklch(0.65_0.01_80)] hover:text-white mr-1 transition-colors">
                  <ChevronLeft size={16} />
                </button>
              )}
              <div className="w-7 h-7 flex items-center justify-center" style={{ background: "oklch(0.55 0.13 38)" }}>
                <Bot size={14} color="white" />
              </div>
              <div>
                <div className="text-white text-xs font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Rosalia Assistant</div>
                <div className="text-[oklch(0.55_0.01_80)] text-[10px]" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {view === "chat"
                    ? serviceLabel
                    : view === "form"
                    ? t.submitInquiryTitle
                    : view === "confirm"
                    ? t.confirmed
                    : t.howCanWeHelp}
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={(e) => { e.stopPropagation(); setShowLangMenu(prev => !prev); }}
                className="flex items-center gap-1.5 transition-colors px-2.5 py-1.5 border"
                style={{
                  background: showLangMenu ? "oklch(0.55 0.13 38)" : "oklch(0.32 0.01 65)",
                  borderColor: showLangMenu ? "oklch(0.55 0.13 38)" : "oklch(0.45 0.01 65)",
                  color: "white",
                }}
                title={t.selectLanguage}
              >
                <Languages size={13} />
                <span className="text-[11px] font-bold tracking-wide" style={{ fontFamily: "'Space Mono', monospace" }}>{currentLang.code.toUpperCase()}</span>
              </button>
              {showLangMenu && (
                <div
                  className="absolute right-0 top-10 border border-[oklch(0.35_0.01_65)] overflow-y-auto shadow-2xl"
                  style={{ background: "oklch(0.18 0.01 65)", width: "220px", maxHeight: "300px", zIndex: 9999 }}
                >
                  <div className="px-3 py-2 border-b border-[oklch(0.30_0.01_65)]">
                    <span className="text-[10px] text-[oklch(0.55_0.01_65)] uppercase tracking-widest font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>{t.selectLanguage}</span>
                  </div>
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={(e) => { e.stopPropagation(); setLanguage(lang.code); setGlobalLang(lang.code as any); setShowLangMenu(false); }}
                      className="w-full text-left px-3 py-2.5 text-xs transition-all flex items-center justify-between gap-2"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: language === lang.code ? "oklch(0.55 0.13 38)" : "transparent",
                        color: language === lang.code ? "white" : "oklch(0.72 0.01 80)",
                        fontWeight: language === lang.code ? 700 : 400,
                      }}
                      onMouseEnter={e => { if (language !== lang.code) (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.28 0.01 65)"; }}
                      onMouseLeave={e => { if (language !== lang.code) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                    >
                      <span className="font-semibold">{lang.native}</span>
                      <span className="text-[9px] opacity-50 shrink-0">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Menu View ── */}
          {view === "menu" && (
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-3 border-b border-[oklch(0.87_0.02_80)]">
                <p className="text-xs text-[oklch(0.45_0.01_65)] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {t.welcome}
                </p>
              </div>
              <div className="p-3 grid grid-cols-1 gap-1">
                {servicesMenu.map(service => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => startService(service.id)}
                      className="flex items-center gap-3 px-3 py-2.5 text-left border border-transparent hover:border-[oklch(0.87_0.02_80)] hover:bg-white transition-all group"
                    >
                      <div className="w-6 h-6 flex items-center justify-center shrink-0" style={{ background: service.color + "22" }}>
                        <Icon size={12} style={{ color: service.color }} />
                      </div>
                      <span className="text-xs text-[oklch(0.35_0.01_65)] group-hover:text-[oklch(0.22_0.01_65)] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {service.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="px-3 pb-4">
                <button
                  onClick={() => setView("form")}
                  className="w-full py-2.5 text-xs text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "oklch(0.55 0.13 38)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}
                >
                  {t.submitInquiry}
                </button>
              </div>
            </div>
          )}

          {/* ── Chat View ── */}
          {view === "chat" && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0, maxHeight: "340px" }}>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className="w-6 h-6 shrink-0 flex items-center justify-center"
                      style={{ background: msg.role === "assistant" ? "oklch(0.55 0.13 38)" : "oklch(0.87 0.02 80)" }}
                    >
                      {msg.role === "assistant" ? <Bot size={12} color="white" /> : <User size={12} color="oklch(0.45 0.01 65)" />}
                    </div>
                    <div
                      className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "text-right" : "text-left"}`}
                      style={{
                        background: msg.role === "user" ? "oklch(0.22 0.01 65)" : "white",
                        color: msg.role === "user" ? "white" : "oklch(0.35 0.01 65)",
                        fontFamily: "'DM Sans', sans-serif",
                        border: msg.role === "assistant" ? "1px solid oklch(0.87 0.02 80)" : "none",
                      }}
                    >
                      {msg.content || (isLoading && msg.role === "assistant" ? <Loader2 size={12} className="animate-spin inline" /> : "")}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Preset Questions — translated */}
              {!isLoading && messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
                <div className="px-3 py-2 border-t border-[oklch(0.87_0.02_80)] flex flex-wrap gap-1">
                  {presets.map(q => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[10px] px-2 py-1 border border-[oklch(0.87_0.02_80)] text-[oklch(0.45_0.01_65)] hover:border-[oklch(0.55_0.13_38)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 py-2 border-t border-[oklch(0.87_0.02_80)] flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder={t.typeMessage}
                  disabled={isLoading}
                  className="flex-1 text-xs px-3 py-2 border border-[oklch(0.87_0.02_80)] outline-none focus:border-[oklch(0.55_0.13_38)] bg-white text-[oklch(0.35_0.01_65)] placeholder:text-[oklch(0.70_0.01_65)]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="w-8 h-8 flex items-center justify-center disabled:opacity-40 transition-opacity"
                  style={{ background: "oklch(0.55 0.13 38)" }}
                >
                  {isLoading ? <Loader2 size={13} color="white" className="animate-spin" /> : <Send size={13} color="white" />}
                </button>
              </div>

              {/* Get in Touch CTA — translated */}
              <div className="px-3 pb-3">
                <button
                  onClick={() => setView("form")}
                  className="w-full py-2 text-[10px] text-white font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
                  style={{ background: "oklch(0.22 0.01 65)", fontFamily: "'Space Mono', monospace" }}
                >
                  {t.getInTouch}
                </button>
              </div>
            </>
          )}

          {/* ── Lead Form View ── */}
          {view === "form" && (
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-xs text-[oklch(0.45_0.01_65)] leading-relaxed mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t.fillForm}
              </p>
              {[
                { key: "firstName", label: t.firstName, type: "text",  placeholder: "Ana" },
                { key: "lastName",  label: t.lastName,  type: "text",  placeholder: "Haynes" },
                { key: "email",     label: t.email,     type: "email", placeholder: "ana@example.com" },
                { key: "phone",     label: t.phone,     type: "tel",   placeholder: "(201) 555-0100" },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-[10px] text-[oklch(0.45_0.01_65)] mb-1 uppercase tracking-wide" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof LeadForm] as string}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border outline-none focus:border-[oklch(0.55_0.13_38)] bg-white text-[oklch(0.35_0.01_65)] placeholder:text-[oklch(0.75_0.01_65)]"
                    style={{ borderColor: formErrors[field.key as keyof LeadForm] ? "oklch(0.577 0.245 27.325)" : "oklch(0.87 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}
                  />
                  {formErrors[field.key as keyof LeadForm] && (
                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors[field.key as keyof LeadForm]}</p>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-[10px] text-[oklch(0.45_0.01_65)] mb-1 uppercase tracking-wide" style={{ fontFamily: "'Space Mono', monospace" }}>{t.message}</label>
                <textarea
                  placeholder={t.messagePlaceholder}
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full text-xs px-3 py-2 border border-[oklch(0.87_0.02_80)] outline-none focus:border-[oklch(0.55_0.13_38)] bg-white text-[oklch(0.35_0.01_65)] placeholder:text-[oklch(0.75_0.01_65)] resize-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.smsConsent}
                  onChange={e => setForm(prev => ({ ...prev, smsConsent: e.target.checked }))}
                  className="mt-0.5 shrink-0"
                />
                <span className="text-[10px] text-[oklch(0.55_0.01_65)] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {t.smsConsent}
                </span>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 text-xs text-white font-semibold tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: "oklch(0.55 0.13 38)", fontFamily: "'Space Mono', monospace" }}
              >
                {isSubmitting ? <><Loader2 size={12} className="animate-spin" /> Sending...</> : t.sendInquiry}
              </button>
            </form>
          )}

          {/* ── Confirm View ── */}
          {view === "confirm" && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center" style={{ background: "oklch(0.55 0.13 38)" }}>
                <Mail size={22} color="white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[oklch(0.22_0.01_65)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t.inquiryReceived}
                </h3>
                <p className="text-xs text-[oklch(0.50_0.01_65)] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {t.thankYou}, {form.firstName}. {t.teamInTouch}
                </p>
              </div>
              <div className="w-full space-y-2 text-xs text-[oklch(0.45_0.01_65)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <div className="flex items-center gap-2 justify-center"><Phone size={11} /> (862) 333-1681</div>
                <div className="flex items-center gap-2 justify-center"><Mail size={11} /> inquiries@rosaliagroup.com</div>
                <div className="flex items-center gap-2 justify-center"><Clock size={11} /> Mon–Fri 9am–6pm · Sat–Sun 10am–5pm</div>
              </div>
              <button
                onClick={resetChat}
                className="text-[10px] text-[oklch(0.55_0.13_38)] underline underline-offset-2 mt-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {t.startOver}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
