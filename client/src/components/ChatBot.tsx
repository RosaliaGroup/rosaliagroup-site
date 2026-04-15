/*
 * ROSALIA GROUP — Live Chat Bot (v2)
 * Design: Urban Warmth / Warm Brutalism
 * - Floating chat widget fixed bottom-right
 * - AI-powered with Forge API (claude-3-5-haiku)
 * - Service-selection menu as first interaction
 * - 12 services as quick-select options
 * - Streaming responses with full Rosalia Group knowledge
 */

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, ChevronLeft, Home, TrendingUp, Building2, BarChart3, Globe, ShoppingBag, Lightbulb, Users, MapPin, PieChart, Briefcase, Paintbrush } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type ChatView = "menu" | "chat";

const SYSTEM_PROMPT = `You are a knowledgeable and friendly real estate assistant for Rosalia Group, a New Jersey real estate and property management company led by Ana Haynes.

== COMPANY OVERVIEW ==
- Founded and led by Ana Haynes, licensed NJ realtor
- Certifications: SBE (Small Business Enterprise), MWBE (Minority & Women-Owned Business Enterprise)
- Brokerage: Realty Mark Advantage | MLS: Bright MLS
- Phone: (862) 333-1681 | Email: inquiries@rosaliagroup.com
- Ana direct: (201) 449-6850 | ana@rosaliagroup.com
- Hours: Mon–Fri 9am–6pm, Sat–Sun 10am–5pm
- Areas: Newark, Jersey City, East Orange, Elizabeth, Orange (New Jersey)
- Stats: 200+ units managed, 98% occupancy rate, 10+ years in NJ, 5 cities

== SERVICES ==

1. APARTMENT RENTALS
Studio to 4BR apartments in Newark, Jersey City, East Orange, Elizabeth, Orange. Flexible leases, pet-friendly options, full application support.
Featured listings:
- Iron Pointe, Jersey City — 1BR/1BA, 650 sqft, $2,200/mo (Modern High-Rise)
- Madison Street, Newark — 2BR/1BA, 850 sqft, $2,800/mo (Classic Brownstone)
- Market Street, East Orange — 3BR/2BA, 1,100 sqft, $3,400/mo (Urban Townhouse)

2. BUY & SELL REAL ESTATE
Licensed NJ realtors, Bright MLS access, buyer/seller representation, free CMA, mortgage referrals, first-time homebuyer guidance.

3. PROPERTY MANAGEMENT
Full-service: tenant screening, rent collection, 24/7 maintenance, monthly financials, lease renewals, eviction support, inspections.

4. ASSET MANAGEMENT
Portfolio performance analysis, capex planning, value-add strategies, lease optimization, risk assessment, quarterly investor reporting.

5. INTERNATIONAL PROPERTY MANAGEMENT
For overseas investors: dedicated contact, multi-currency reporting, FIRPTA/1031 compliance, remote oversight, bilingual support (Spanish, Portuguese).

6. ACQUISITIONS
Off-market deal sourcing, underwriting, due diligence, financing strategy, negotiation, post-acquisition transition.

7. CONSULTING & PROJECT MAXIMIZATION
Feasibility studies, ROI projections, repositioning strategies, market timing, operational audits, custom KPI dashboards.

8. TENANT PLACEMENT
One-time service: listing, marketing, screening, lease prep. No ongoing management fee.

9. RELOCATION ASSISTANCE
Neighborhood matching, virtual/in-person tours, school/commute analysis, temp housing, corporate relocation packages.

10. INVESTMENT PORTFOLIO ANALYSIS
Cash-on-cash returns, cap rates, debt service review, diversification assessment, 1031 exchange planning, 1/3/5-year roadmaps.

11. COMMERCIAL REAL ESTATE
Office, retail, industrial leasing and sales, mixed-use consulting, NNN/gross lease structuring, CAM reconciliation.

12. HOME STAGING & RENOVATION
Staging consultation, virtual staging, contractor referrals, cost-vs-value analysis, photography coordination, digital marketing.

== YOUR ROLE ==
- Answer questions about any of the above services clearly and helpfully
- Keep responses concise (2–4 sentences) unless more detail is genuinely needed
- Always encourage users to contact Rosalia Group for personalized help
- Be warm, professional, and knowledgeable
- Do not invent prices or availability beyond what's listed above`;

const SERVICES_MENU = [
  { id: "rentals", icon: Home, label: "Apartment Rentals", color: "oklch(0.55 0.13 38)" },
  { id: "sales", icon: TrendingUp, label: "Buy & Sell", color: "oklch(0.52 0.07 130)" },
  { id: "property-mgmt", icon: Building2, label: "Property Management", color: "oklch(0.40 0.06 240)" },
  { id: "asset-mgmt", icon: BarChart3, label: "Asset Management", color: "oklch(0.55 0.13 38)" },
  { id: "international", icon: Globe, label: "International Management", color: "oklch(0.52 0.07 130)" },
  { id: "acquisitions", icon: ShoppingBag, label: "Acquisitions", color: "oklch(0.40 0.06 240)" },
  { id: "consulting", icon: Lightbulb, label: "Consulting & Project Max", color: "oklch(0.55 0.13 38)" },
  { id: "tenant-placement", icon: Users, label: "Tenant Placement", color: "oklch(0.52 0.07 130)" },
  { id: "relocation", icon: MapPin, label: "Relocation Assistance", color: "oklch(0.40 0.06 240)" },
  { id: "investment", icon: PieChart, label: "Investment Analysis", color: "oklch(0.55 0.13 38)" },
  { id: "commercial", icon: Briefcase, label: "Commercial Real Estate", color: "oklch(0.52 0.07 130)" },
  { id: "staging", icon: Paintbrush, label: "Staging & Renovation", color: "oklch(0.40 0.06 240)" },
];

const SERVICE_PROMPTS: Record<string, string> = {
  rentals: "Tell me about your apartment rental listings and how I can find a place to rent.",
  sales: "I'm interested in buying or selling a home in New Jersey. What services do you offer?",
  "property-mgmt": "How does your property management service work for landlords?",
  "asset-mgmt": "Can you explain your asset management services for real estate portfolios?",
  international: "I'm an international investor. How do you manage properties for overseas owners?",
  acquisitions: "I want to acquire investment properties in New Jersey. How can Rosalia Group help?",
  consulting: "Tell me about your consulting services for maximizing real estate project returns.",
  "tenant-placement": "I manage my own property but need help finding a qualified tenant. What do you offer?",
  relocation: "I'm relocating to New Jersey. What relocation assistance do you provide?",
  investment: "I want an analysis of my real estate investment portfolio. What does that involve?",
  commercial: "I'm looking for commercial real estate services — office, retail, or industrial.",
  staging: "I need help staging my home for sale. What staging and renovation services do you offer?",
};

const FORGE_API_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL;
const FORGE_API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ChatView>("menu");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      if (view === "chat") setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, view]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startServiceChat = async (serviceId: string) => {
    setSelectedService(serviceId);
    setView("chat");

    const serviceLabel = SERVICES_MENU.find((s) => s.id === serviceId)?.label ?? serviceId;
    const userPrompt = SERVICE_PROMPTS[serviceId] ?? `Tell me about your ${serviceLabel} service.`;

    const welcomeMsg: Message = {
      id: "welcome",
      role: "assistant",
      content: `Hi! You've selected **${serviceLabel}**. Let me tell you all about it — and feel free to ask any follow-up questions!`,
      timestamp: new Date(),
    };

    const userMsg: Message = {
      id: "init-user",
      role: "user",
      content: userPrompt,
      timestamp: new Date(),
    };

    setMessages([welcomeMsg, userMsg]);
    setIsLoading(true);

    const assistantId = "init-assistant";
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
    ]);

    await streamResponse([{ role: "user", content: userPrompt }], assistantId);
  };

  const streamResponse = async (history: { role: string; content: string }[], assistantId: string) => {
    try {
      const response = await fetch(`${FORGE_API_URL}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${FORGE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku",
          stream: true,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          max_tokens: 500,
        }),
      });

      if (!response.ok) throw new Error("API error");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          for (const line of chunk.split("\n")) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                if (delta) {
                  accumulated += delta;
                  setMessages((prev) =>
                    prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
                  );
                }
              } catch { /* skip */ }
            }
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "I'm having trouble connecting right now. Please call us at (862) 333-1681 or email inquiries@rosaliagroup.com — we're happy to help!" }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const history = [...messages, userMsg]
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);

    await streamResponse(history, assistantId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const goBack = () => {
    setView("menu");
    setMessages([]);
    setSelectedService(null);
    setIsLoading(false);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  };

  const selectedServiceData = SERVICES_MENU.find((s) => s.id === selectedService);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
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
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ height: view === "menu" ? "auto" : "540px", maxHeight: "calc(100vh - 8rem)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 shrink-0" style={{ backgroundColor: "oklch(0.22 0.01 65)" }}>
          {view === "chat" && (
            <button onClick={goBack} className="text-white/60 hover:text-white transition-colors mr-1">
              <ChevronLeft size={18} />
            </button>
          )}
          <div
            className="w-9 h-9 flex items-center justify-center shrink-0"
            style={{ backgroundColor: view === "chat" && selectedServiceData ? selectedServiceData.color : "oklch(0.55 0.13 38)" }}
          >
            {view === "chat" && selectedServiceData ? (
              <selectedServiceData.icon size={18} className="text-white" />
            ) : (
              <Bot size={18} className="text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-semibold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {view === "chat" && selectedServiceData ? selectedServiceData.label : "Rosalia Group Assistant"}
            </div>
            <div className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: "oklch(0.55 0.13 38)", fontFamily: "'Space Mono', monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              {view === "menu" ? "Select a service to get started" : "Online · Ask me anything"}
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* ── MENU VIEW ── */}
        {view === "menu" && (
          <div style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
            {/* Intro */}
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

            {/* Service Grid */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
              {SERVICES_MENU.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => startServiceChat(service.id)}
                    className="flex items-center gap-2.5 p-3 text-left border border-[oklch(0.87_0.02_80)] bg-white hover:border-current transition-all group"
                    style={{ color: "oklch(0.22 0.01 65)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = service.color;
                      (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(1 0 0)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.87 0.02 80)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "white";
                    }}
                  >
                    <div className="w-7 h-7 flex items-center justify-center shrink-0" style={{ backgroundColor: service.color }}>
                      <Icon size={13} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-[oklch(0.22_0.01_65)] leading-tight">
                      {service.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* General question option */}
            <div className="px-4 pb-4">
              <button
                onClick={() => {
                  setView("chat");
                  setSelectedService("general");
                  const welcomeMsg: Message = {
                    id: "welcome",
                    role: "assistant",
                    content: "Hi! I'm here to help with any questions about Rosalia Group's services. What would you like to know?",
                    timestamp: new Date(),
                  };
                  setMessages([welcomeMsg]);
                }}
                className="w-full py-2.5 text-xs tracking-widest uppercase border border-dashed border-[oklch(0.75_0.02_80)] text-[oklch(0.55_0.02_65)] hover:border-[oklch(0.55_0.13_38)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Ask a General Question
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[oklch(0.87_0.02_80)] text-center">
              <span className="text-[0.6rem] text-[oklch(0.65_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
                Powered by Rosalia Group · rosaliagroup.com
              </span>
            </div>
          </div>
        )}

        {/* ── CHAT VIEW ── */}
        {view === "chat" && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: msg.role === "assistant"
                        ? (selectedServiceData?.color ?? "oklch(0.55 0.13 38)")
                        : "oklch(0.22 0.01 65)",
                    }}
                  >
                    {msg.role === "assistant"
                      ? (selectedServiceData ? <selectedServiceData.icon size={14} className="text-white" /> : <Bot size={14} className="text-white" />)
                      : <User size={14} className="text-white" />}
                  </div>
                  <div className={`max-w-[78%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className="px-3.5 py-2.5 text-sm leading-relaxed"
                      style={{
                        backgroundColor: msg.role === "assistant" ? "oklch(1 0 0)" : (selectedServiceData?.color ?? "oklch(0.55 0.13 38)"),
                        color: msg.role === "assistant" ? "oklch(0.22 0.01 65)" : "white",
                        border: msg.role === "assistant" ? "1px solid oklch(0.87 0.02 80)" : "none",
                      }}
                    >
                      {msg.content ? (
                        <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                      ) : (
                        <span className="flex items-center gap-1.5 text-[oklch(0.55_0.02_65)]">
                          <Loader2 size={12} className="animate-spin" />
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem" }}>Typing…</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[0.62rem] px-1" style={{ color: "oklch(0.65 0.01 80)", fontFamily: "'Space Mono', monospace" }}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex gap-0 shrink-0 border-t"
              style={{ backgroundColor: "oklch(0.22 0.01 65)", borderColor: "oklch(0.35 0.01 65)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a follow-up question…"
                disabled={isLoading}
                className="flex-1 bg-transparent text-white placeholder-[oklch(0.45_0.01_80)] px-4 py-3.5 text-sm focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-3.5 transition-colors disabled:opacity-40"
                style={{ backgroundColor: selectedServiceData?.color ?? "oklch(0.55 0.13 38)" }}
              >
                {isLoading ? <Loader2 size={16} className="text-white animate-spin" /> : <Send size={16} className="text-white" />}
              </button>
            </form>

            {/* Footer */}
            <div className="px-4 py-2 text-center shrink-0" style={{ backgroundColor: "oklch(0.22 0.01 65)" }}>
              <span className="text-[0.6rem] text-[oklch(0.40_0.01_80)]" style={{ fontFamily: "'Space Mono', monospace" }}>
                Powered by Rosalia Group · rosaliagroup.com
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
