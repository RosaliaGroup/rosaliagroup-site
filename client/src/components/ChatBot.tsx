/*
 * ROSALIA GROUP — Live Chat Bot (v3)
 * Design: Urban Warmth / Warm Brutalism
 *
 * Flow:
 *   1. Menu — pick a service (12 options + general)
 *   2. Chat — AI answers questions about chosen service
 *   3. Lead Form — inline form collects: First Name, Last Name, Email, Phone, Message + SMS consent
 *   4. Confirmation — thank-you screen with contact details
 *
 * The "Get in Touch" button in chat view triggers the lead form.
 * Form submission mirrors the website contact form (same fields, same mailto fallback).
 */

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle, X, Send, Bot, User, Loader2, ChevronLeft,
  Home, TrendingUp, Building2, BarChart3, Globe, ShoppingBag,
  Lightbulb, Users, MapPin, PieChart, Briefcase, Paintbrush,
  ArrowRight, CheckCircle2, Phone, Mail, Clock,
} from "lucide-react";

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

/* ─── Constants ─────────────────────────────────────────────────────── */
const SERVICES_MENU = [
  { id: "rentals",          icon: Home,       label: "Apartment Rentals",           color: "oklch(0.55 0.13 38)" },
  { id: "sales",            icon: TrendingUp, label: "Buy & Sell",                  color: "oklch(0.52 0.07 130)" },
  { id: "property-mgmt",   icon: Building2,  label: "Property Management",         color: "oklch(0.40 0.06 240)" },
  { id: "asset-mgmt",      icon: BarChart3,  label: "Asset Management",            color: "oklch(0.55 0.13 38)" },
  { id: "international",   icon: Globe,      label: "International Management",    color: "oklch(0.52 0.07 130)" },
  { id: "acquisitions",    icon: ShoppingBag,label: "Acquisitions",                color: "oklch(0.40 0.06 240)" },
  { id: "consulting",      icon: Lightbulb,  label: "Consulting & Project Max",    color: "oklch(0.55 0.13 38)" },
  { id: "tenant-placement",icon: Users,      label: "Tenant Placement",            color: "oklch(0.52 0.07 130)" },
  { id: "relocation",      icon: MapPin,     label: "Relocation Assistance",       color: "oklch(0.40 0.06 240)" },
  { id: "investment",      icon: PieChart,   label: "Investment Analysis",         color: "oklch(0.55 0.13 38)" },
  { id: "commercial",      icon: Briefcase,  label: "Commercial Real Estate",      color: "oklch(0.52 0.07 130)" },
  { id: "staging",         icon: Paintbrush, label: "Staging & Renovation",        color: "oklch(0.40 0.06 240)" },
];

const SERVICE_PROMPTS: Record<string, string> = {
  rentals:           "Tell me about your apartment rental listings and how I can find a place to rent.",
  sales:             "I'm interested in buying or selling a home in New Jersey. What services do you offer?",
  "property-mgmt":  "How does your property management service work for landlords?",
  "asset-mgmt":     "Can you explain your asset management services for real estate portfolios?",
  international:    "I'm an international investor. How do you manage properties for overseas owners?",
  acquisitions:     "I want to acquire investment properties in New Jersey. How can Rosalia Group help?",
  consulting:       "Tell me about your consulting services for maximizing real estate project returns.",
  "tenant-placement":"I manage my own property but need help finding a qualified tenant. What do you offer?",
  relocation:       "I'm relocating to New Jersey. What relocation assistance do you provide?",
  investment:       "I want an analysis of my real estate investment portfolio. What does that involve?",
  commercial:       "I'm looking for commercial real estate services — office, retail, or industrial.",
  staging:          "I need help staging my home for sale. What staging and renovation services do you offer?",
  general:          "What services does Rosalia Group offer?",
};

const SYSTEM_PROMPT = `You are a knowledgeable and friendly real estate assistant for Rosalia Group, a New Jersey real estate and property management company led by Ana Haynes.

COMPANY:
- Phone: (862) 333-1681 | Email: inquiries@rosaliagroup.com
- Ana direct: (201) 449-6850 | ana@rosaliagroup.com
- Hours: Mon–Fri 9am–6pm, Sat–Sun 10am–5pm
- Areas: Newark, Jersey City, East Orange, Elizabeth, Orange (NJ)
- Certifications: SBE, MWBE | Brokerage: Realty Mark Advantage | MLS: Bright MLS
- Stats: 200+ units managed, 98% occupancy, 10+ years in NJ, 5 cities

SERVICES: Apartment Rentals, Buy & Sell, Property Management, Asset Management, International Property Management, Acquisitions, Consulting & Project Maximization, Tenant Placement, Relocation Assistance, Investment Portfolio Analysis, Commercial Real Estate, Home Staging & Renovation.

RENTALS: Iron Pointe Jersey City 1BR $2,200/mo · Madison St Newark 2BR $2,800/mo · Market St East Orange 3BR $3,400/mo.

Keep answers concise (2–4 sentences). Be warm and professional. Encourage users to submit an inquiry using the "Get in Touch" button below the chat.`;

const FORGE_API_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL;
const FORGE_API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;

const EMPTY_FORM: LeadForm = {
  firstName: "", lastName: "", email: "", phone: "", message: "", smsConsent: false,
};

/* ─── Component ─────────────────────────────────────────────────────── */
export default function ChatBot() {
  const [isOpen, setIsOpen]           = useState(false);
  const [view, setView]               = useState<ChatView>("menu");
  const [selectedService, setSelected] = useState<string | null>(null);
  const [messages, setMessages]       = useState<Message[]>([]);
  const [input, setInput]             = useState("");
  const [isLoading, setIsLoading]     = useState(false);
  const [hasUnread, setHasUnread]     = useState(true);
  const [form, setForm]               = useState<LeadForm>(EMPTY_FORM);
  const [formErrors, setFormErrors]   = useState<Partial<LeadForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) { setHasUnread(false); }
    if (isOpen && view === "chat") setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen, view]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Stream helper ── */
  const streamResponse = async (history: { role: string; content: string }[], assistantId: string) => {
    try {
      const res = await fetch(`${FORGE_API_URL}/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${FORGE_API_KEY}` },
        body: JSON.stringify({
          model: "claude-3-5-haiku", stream: true,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          max_tokens: 500,
        }),
      });
      if (!res.ok) throw new Error();
      const reader = res.body?.getReader();
      const dec = new TextDecoder();
      let acc = "";
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          for (const line of dec.decode(value).split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") continue;
            try {
              const delta = JSON.parse(raw).choices?.[0]?.delta?.content || "";
              if (delta) {
                acc += delta;
                setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: acc } : m));
              }
            } catch { /* skip */ }
          }
        }
      }
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === assistantId
          ? { ...m, content: "I'm having trouble connecting right now. Please call (862) 333-1681 or email inquiries@rosaliagroup.com — we're happy to help!" }
          : m
      ));
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Start service chat ── */
  const startServiceChat = async (serviceId: string) => {
    setSelected(serviceId);
    setView("chat");
    const svc = SERVICES_MENU.find(s => s.id === serviceId);
    const label = svc?.label ?? "our services";
    const prompt = SERVICE_PROMPTS[serviceId] ?? `Tell me about ${label}.`;

    const welcome: Message = {
      id: "welcome", role: "assistant",
      content: `Hi! You've selected **${label}**. Let me tell you all about it — and feel free to ask any follow-up questions!`,
      timestamp: new Date(),
    };
    const userInit: Message = { id: "init-user", role: "user", content: prompt, timestamp: new Date() };
    const assistantId = "init-assistant";
    const assistantPlaceholder: Message = { id: assistantId, role: "assistant", content: "", timestamp: new Date() };

    setMessages([welcome, userInit, assistantPlaceholder]);
    setIsLoading(true);
    await streamResponse([{ role: "user", content: prompt }], assistantId);
  };

  /* ── Send follow-up message ── */
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    const history = [...messages, userMsg]
      .filter(m => m.id !== "welcome")
      .map(m => ({ role: m.role, content: m.content }));
    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);
    await streamResponse(history, assistantId);
  };

  /* ── Form validation ── */
  const validateForm = (): boolean => {
    const errors: Partial<LeadForm> = {};
    if (!form.firstName.trim()) errors.firstName = "Required";
    if (!form.lastName.trim())  errors.lastName  = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Valid email required";
    if (!form.phone.trim())     errors.phone     = "Required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ── Form submit ── */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    // Pre-fill the service label into the message
    const svcLabel = SERVICES_MENU.find(s => s.id === selectedService)?.label ?? "General Inquiry";
    const fullMessage = `Service: ${svcLabel}\n\n${form.message}`.trim();

    // Build mailto as fallback (works without backend)
    const subject = encodeURIComponent(`New Inquiry — ${svcLabel} — ${form.firstName} ${form.lastName}`);
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${svcLabel}\n\nMessage:\n${form.message}\n\nSMS Consent: ${form.smsConsent ? "Yes" : "No"}`
    );

    // Try to open mailto silently; in production this would be a real API call
    try {
      const link = document.createElement("a");
      link.href = `mailto:inquiries@rosaliagroup.com?subject=${subject}&body=${body}`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch { /* ignore */ }

    // Small delay to simulate submission
    await new Promise(r => setTimeout(r, 800));
    setIsSubmitting(false);
    setView("confirm");
  };

  /* ── Navigation helpers ── */
  const goBack = () => {
    if (view === "form") { setView("chat"); return; }
    setView("menu");
    setMessages([]);
    setSelected(null);
    setIsLoading(false);
    setForm(EMPTY_FORM);
    setFormErrors({});
  };

  const openForm = () => {
    const svcLabel = SERVICES_MENU.find(s => s.id === selectedService)?.label ?? "";
    setForm(f => ({ ...f, message: svcLabel ? `I'm interested in your ${svcLabel} service.` : "" }));
    setView("form");
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const renderMd = (t: string) =>
    t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
     .replace(/\*(.*?)\*/g, "<em>$1</em>")
     .replace(/\n/g, "<br/>");

  const svcData = SERVICES_MENU.find(s => s.id === selectedService);
  const accentColor = svcData?.color ?? "oklch(0.55 0.13 38)";

  /* ─── Render ─────────────────────────────────────────────────────── */
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: "oklch(0.55 0.13 38)" }}
        aria-label="Open chat"
      >
        {isOpen ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
        {!isOpen && hasUnread && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: "oklch(0.55 0.13 38)" }} />
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[390px] max-w-[calc(100vw-2rem)] shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          height: view === "menu" ? "auto" : view === "confirm" ? "auto" : "560px",
          maxHeight: "calc(100vh - 8rem)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-4 py-3.5 shrink-0" style={{ backgroundColor: "oklch(0.22 0.01 65)" }}>
          {(view === "chat" || view === "form") && (
            <button onClick={goBack} className="text-white/60 hover:text-white transition-colors mr-1">
              <ChevronLeft size={18} />
            </button>
          )}
          <div
            className="w-9 h-9 flex items-center justify-center shrink-0"
            style={{ backgroundColor: view !== "menu" && view !== "confirm" && svcData ? accentColor : "oklch(0.55 0.13 38)" }}
          >
            {view === "chat" && svcData ? (
              <svcData.icon size={18} className="text-white" />
            ) : view === "form" ? (
              <Mail size={18} className="text-white" />
            ) : view === "confirm" ? (
              <CheckCircle2 size={18} className="text-white" />
            ) : (
              <Bot size={18} className="text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-semibold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {view === "chat" && svcData ? svcData.label
               : view === "form" ? "Submit an Inquiry"
               : view === "confirm" ? "Inquiry Received"
               : "Rosalia Group Assistant"}
            </div>
            <div className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: "oklch(0.55 0.13 38)", fontFamily: "'Space Mono', monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              {view === "menu" ? "Select a service to get started"
               : view === "form" ? "We'll follow up the same day"
               : view === "confirm" ? "Thank you!"
               : "Online · Ask me anything"}
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* ══════════════════════════════════════════
            VIEW: MENU
        ══════════════════════════════════════════ */}
        {view === "menu" && (
          <div style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
            <div className="px-4 pt-4 pb-3">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.55 0.13 38)" }}>
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white border border-[oklch(0.87_0.02_80)] px-3.5 py-2.5 text-sm text-[oklch(0.22_0.01_65)] leading-relaxed flex-1">
                  Hi! I'm the Rosalia Group assistant. Which service can I help you with today?
                </div>
              </div>
            </div>
            <div className="px-4 pb-3 grid grid-cols-2 gap-2">
              {SERVICES_MENU.map(svc => {
                const Icon = svc.icon;
                return (
                  <button
                    key={svc.id}
                    onClick={() => startServiceChat(svc.id)}
                    className="flex items-center gap-2.5 p-3 text-left border border-[oklch(0.87_0.02_80)] bg-white transition-all"
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = svc.color;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.87 0.02 80)";
                    }}
                  >
                    <div className="w-7 h-7 flex items-center justify-center shrink-0" style={{ backgroundColor: svc.color }}>
                      <Icon size={13} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-[oklch(0.22_0.01_65)] leading-tight">{svc.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="px-4 pb-3 flex gap-2">
              <button
                onClick={() => {
                  setSelected("general");
                  setView("chat");
                  setMessages([{ id: "welcome", role: "assistant", content: "Hi! I'm here to help with any questions about Rosalia Group. What would you like to know?", timestamp: new Date() }]);
                }}
                className="flex-1 py-2.5 text-xs tracking-widest uppercase border border-dashed border-[oklch(0.75_0.02_80)] text-[oklch(0.55_0.02_65)] hover:border-[oklch(0.55_0.13_38)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Ask a General Question
              </button>
              <button
                onClick={() => { setSelected("general"); setView("form"); }}
                className="flex-1 py-2.5 text-xs tracking-widest uppercase border text-white transition-colors"
                style={{ fontFamily: "'Space Mono', monospace", backgroundColor: "oklch(0.55 0.13 38)", borderColor: "oklch(0.55 0.13 38)" }}
              >
                Submit Inquiry
              </button>
            </div>
            <div className="px-4 py-2.5 border-t border-[oklch(0.87_0.02_80)] text-center">
              <span className="text-[0.6rem] text-[oklch(0.65_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
                Powered by Rosalia Group · rosaliagroup.com
              </span>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            VIEW: CHAT
        ══════════════════════════════════════════ */}
        {view === "chat" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: msg.role === "assistant" ? accentColor : "oklch(0.22 0.01 65)" }}
                  >
                    {msg.role === "assistant"
                      ? (svcData ? <svcData.icon size={14} className="text-white" /> : <Bot size={14} className="text-white" />)
                      : <User size={14} className="text-white" />}
                  </div>
                  <div className={`max-w-[78%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className="px-3.5 py-2.5 text-sm leading-relaxed"
                      style={{
                        backgroundColor: msg.role === "assistant" ? "oklch(1 0 0)" : accentColor,
                        color: msg.role === "assistant" ? "oklch(0.22 0.01 65)" : "white",
                        border: msg.role === "assistant" ? "1px solid oklch(0.87 0.02 80)" : "none",
                      }}
                    >
                      {msg.content
                        ? <span dangerouslySetInnerHTML={{ __html: renderMd(msg.content) }} />
                        : <span className="flex items-center gap-1.5 text-[oklch(0.55_0.02_65)]">
                            <Loader2 size={12} className="animate-spin" />
                            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem" }}>Typing…</span>
                          </span>
                      }
                    </div>
                    <span className="text-[0.62rem] px-1" style={{ color: "oklch(0.65 0.01 80)", fontFamily: "'Space Mono', monospace" }}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Get in Touch CTA */}
            <div className="px-4 py-2.5 border-t border-[oklch(0.87_0.02_80)] shrink-0" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
              <button
                onClick={openForm}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase text-white transition-colors"
                style={{ fontFamily: "'Space Mono', monospace", backgroundColor: accentColor }}
              >
                Get in Touch — Submit an Inquiry
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(input); }}
              className="flex shrink-0 border-t"
              style={{ backgroundColor: "oklch(0.22 0.01 65)", borderColor: "oklch(0.35 0.01 65)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a follow-up question…"
                disabled={isLoading}
                className="flex-1 bg-transparent text-white placeholder-[oklch(0.45_0.01_80)] px-4 py-3.5 text-sm focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-3.5 transition-colors disabled:opacity-40"
                style={{ backgroundColor: accentColor }}
              >
                {isLoading ? <Loader2 size={16} className="text-white animate-spin" /> : <Send size={16} className="text-white" />}
              </button>
            </form>

            <div className="px-4 py-2 text-center shrink-0" style={{ backgroundColor: "oklch(0.22 0.01 65)" }}>
              <span className="text-[0.6rem] text-[oklch(0.40_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
                Powered by Rosalia Group · rosaliagroup.com
              </span>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            VIEW: FORM
        ══════════════════════════════════════════ */}
        {view === "form" && (
          <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
              {/* Service badge */}
              {svcData && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                    <svcData.icon size={12} className="text-white" />
                  </div>
                  <span className="text-xs text-[oklch(0.50_0.02_65)]" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Inquiry about: <strong className="text-[oklch(0.22_0.01_65)]">{svcData.label}</strong>
                  </span>
                </div>
              )}

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">First Name <span className="text-[oklch(0.55_0.13_38)]">*</span></label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder="Ana"
                    className={`chat-input ${formErrors.firstName ? "border-red-400" : ""}`}
                  />
                  {formErrors.firstName && <p className="form-error">{formErrors.firstName}</p>}
                </div>
                <div>
                  <label className="form-label">Last Name <span className="text-[oklch(0.55_0.13_38)]">*</span></label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    placeholder="Haynes"
                    className={`chat-input ${formErrors.lastName ? "border-red-400" : ""}`}
                  />
                  {formErrors.lastName && <p className="form-error">{formErrors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="form-label">Email Address <span className="text-[oklch(0.55_0.13_38)]">*</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@email.com"
                  className={`chat-input ${formErrors.email ? "border-red-400" : ""}`}
                />
                {formErrors.email && <p className="form-error">{formErrors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="form-label">Phone Number <span className="text-[oklch(0.55_0.13_38)]">*</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="(201) 555-1234"
                  className={`chat-input ${formErrors.phone ? "border-red-400" : ""}`}
                />
                {formErrors.phone && <p className="form-error">{formErrors.phone}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="form-label">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you're looking for…"
                  rows={3}
                  className="chat-input resize-none"
                />
              </div>

              {/* SMS Consent */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.smsConsent}
                  onChange={e => setForm(f => ({ ...f, smsConsent: e.target.checked }))}
                  className="mt-0.5 accent-[oklch(0.55_0.13_38)]"
                />
                <span className="text-[0.68rem] text-[oklch(0.55_0.02_65)] leading-relaxed">
                  I agree to receive SMS messages from Rosalia Group regarding my inquiry. Msg &amp; data rates may apply. Reply STOP to opt out.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase text-white transition-all disabled:opacity-60"
                style={{ fontFamily: "'Space Mono', monospace", backgroundColor: accentColor }}
              >
                {isSubmitting ? (
                  <><Loader2 size={14} className="animate-spin" /> Sending…</>
                ) : (
                  <><Send size={14} /> Send Inquiry</>
                )}
              </button>

              <p className="text-[0.62rem] text-center text-[oklch(0.65_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
                We respond within the same business day.
              </p>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════
            VIEW: CONFIRM
        ══════════════════════════════════════════ */}
        {view === "confirm" && (
          <div style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
            <div className="p-6 text-center">
              <div
                className="w-14 h-14 flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "oklch(0.55 0.13 38)" }}
              >
                <CheckCircle2 size={28} className="text-white" />
              </div>
              <h3
                className="text-xl font-bold text-[oklch(0.22_0.01_65)] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Inquiry Received!
              </h3>
              <p className="text-sm text-[oklch(0.50_0.02_65)] leading-relaxed mb-5">
                Thank you, <strong>{form.firstName}</strong>! A member of the Rosalia Group team will follow up with you shortly.
              </p>

              {/* Contact info */}
              <div className="space-y-2.5 text-left border border-[oklch(0.87_0.02_80)] bg-white p-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.22 0.01 65)" }}>
                    <Phone size={13} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] text-[oklch(0.65_0.01_80)] uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>Phone</div>
                    <a href="tel:8623331681" className="text-sm font-medium text-[oklch(0.22_0.01_65)] hover:text-[oklch(0.55_0.13_38)] transition-colors">(862) 333-1681</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.22 0.01 65)" }}>
                    <Mail size={13} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] text-[oklch(0.65_0.01_80)] uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>Email</div>
                    <a href="mailto:inquiries@rosaliagroup.com" className="text-sm font-medium text-[oklch(0.22_0.01_65)] hover:text-[oklch(0.55_0.13_38)] transition-colors">inquiries@rosaliagroup.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.22 0.01 65)" }}>
                    <Clock size={13} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] text-[oklch(0.65_0.01_80)] uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>Hours</div>
                    <span className="text-sm text-[oklch(0.22_0.01_65)]">Mon–Fri 9am–6pm · Sat–Sun 10am–5pm</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setView("menu"); setForm(EMPTY_FORM); setFormErrors({}); setMessages([]); setSelected(null); }}
                className="w-full py-2.5 text-xs tracking-widest uppercase border border-[oklch(0.22_0.01_65)] text-[oklch(0.22_0.01_65)] hover:bg-[oklch(0.22_0.01_65)] hover:text-white transition-colors"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Back to Services
              </button>
            </div>

            <div className="px-4 py-2.5 border-t border-[oklch(0.87_0.02_80)] text-center">
              <span className="text-[0.6rem] text-[oklch(0.65_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
                Powered by Rosalia Group · rosaliagroup.com
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
