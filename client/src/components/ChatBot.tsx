/*
 * ROSALIA GROUP — Live Chat Bot
 * Design: Urban Warmth / Warm Brutalism
 * - Floating chat widget fixed bottom-right
 * - AI-powered assistant using Forge API (built-in LLM)
 * - Terracotta/charcoal palette matching site design
 * - Streaming responses for real-time feel
 * - Pre-seeded with Rosalia Group knowledge
 */

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are a helpful real estate assistant for Rosalia Group, a New Jersey real estate and property management company. You are friendly, professional, and knowledgeable.

Key facts about Rosalia Group:
- Founded and led by Ana Haynes, a licensed NJ realtor
- Services: Apartment Rentals, Buy & Sell (homes), Property Management
- Service areas: Newark, Jersey City, East Orange, Elizabeth, and Orange (New Jersey)
- Certifications: SBE (Small Business Enterprise) and MWBE (Minority & Women-Owned Business Enterprise)
- MLS Partner: Bright MLS (live listings)
- Brokerage: Realty Mark Advantage
- Phone: (862) 333-1681
- Email: inquiries@rosaliagroup.com
- Ana Haynes direct: (201) 449-6850 | ana@rosaliagroup.com
- Hours: Mon–Fri 9am–6pm, Sat–Sun 10am–5pm
- Stats: 200+ units managed, 98% occupancy rate, 10+ years in NJ, 5 cities served

Featured rentals:
- Iron Pointe, Jersey City — 1 bed/1 bath, 650 sqft, $2,200/mo (Modern High-Rise)
- Madison Street, Newark — 2 bed/1 bath, 850 sqft, $2,800/mo (Classic Brownstone)
- Market Street, East Orange — 3 bed/2 bath, 1,100 sqft, $3,400/mo (Urban Townhouse)

Property management services include: tenant screening, rent collection, 24/7 maintenance, monthly financial reporting, lease renewals, eviction support, and property inspections.

Your role:
- Answer questions about rentals, buying, selling, and property management in New Jersey
- Help users understand the process of renting or buying a home
- Encourage users to contact Rosalia Group for personalized help
- Keep responses concise (2-4 sentences max unless more detail is needed)
- Always be warm, helpful, and professional
- If asked about specific listings not mentioned above, suggest contacting Ana directly
- Do not make up prices, addresses, or availability for unlisted properties`;

const QUICK_REPLIES = [
  "What apartments are available?",
  "How does property management work?",
  "I want to buy a home in NJ",
  "Contact Ana Haynes",
];

const FORGE_API_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL;
const FORGE_API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm the Rosalia Group assistant. I can help you find apartments, answer questions about buying or selling a home in New Jersey, or connect you with Ana Haynes. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Build conversation history for API
    const history = [...messages, userMessage]
      .filter((m) => m.id !== "welcome" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    // Add assistant placeholder
    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
    ]);

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
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
          ],
          max_tokens: 400,
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
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                if (delta) {
                  accumulated += delta;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId ? { ...m, content: accumulated } : m
                    )
                  );
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "I'm having trouble connecting right now. Please call us at (862) 333-1681 or email inquiries@rosaliagroup.com and we'll be happy to help!",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: "oklch(0.55 0.13 38)" }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
        {/* Unread badge */}
        {!isOpen && hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "oklch(0.55 0.13 38)" }} />
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ height: "520px", maxHeight: "calc(100vh - 8rem)" }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 shrink-0"
          style={{ backgroundColor: "oklch(0.22 0.01 65)" }}
        >
          <div
            className="w-9 h-9 flex items-center justify-center shrink-0"
            style={{ backgroundColor: "oklch(0.55 0.13 38)" }}
          >
            <Bot size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="text-white text-sm font-semibold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Rosalia Group Assistant
            </div>
            <div
              className="text-xs flex items-center gap-1.5 mt-0.5"
              style={{ color: "oklch(0.55 0.13 38)", fontFamily: "'Space Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Online · Typically replies instantly
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ backgroundColor: "oklch(0.97 0.015 80)" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor:
                    msg.role === "assistant"
                      ? "oklch(0.55 0.13 38)"
                      : "oklch(0.22 0.01 65)",
                }}
              >
                {msg.role === "assistant" ? (
                  <Bot size={14} className="text-white" />
                ) : (
                  <User size={14} className="text-white" />
                )}
              </div>

              {/* Bubble */}
              <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className="px-3.5 py-2.5 text-sm leading-relaxed"
                  style={{
                    backgroundColor:
                      msg.role === "assistant"
                        ? "oklch(1 0 0)"
                        : "oklch(0.55 0.13 38)",
                    color:
                      msg.role === "assistant"
                        ? "oklch(0.22 0.01 65)"
                        : "white",
                    border:
                      msg.role === "assistant"
                        ? "1px solid oklch(0.87 0.02 80)"
                        : "none",
                  }}
                >
                  {msg.content || (
                    <span className="flex items-center gap-1.5 text-[oklch(0.55_0.02_65)]">
                      <Loader2 size={12} className="animate-spin" />
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem" }}>
                        Typing…
                      </span>
                    </span>
                  )}
                </div>
                <span
                  className="text-[0.65rem] px-1"
                  style={{
                    color: "oklch(0.65 0.01 80)",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies — show only when just welcome message */}
        {messages.length === 1 && (
          <div
            className="px-3 py-2 flex flex-wrap gap-2 shrink-0 border-t"
            style={{
              backgroundColor: "oklch(0.97 0.015 80)",
              borderColor: "oklch(0.87 0.02 80)",
            }}
          >
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-xs px-3 py-1.5 border transition-colors hover:text-white"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.04em",
                  color: "oklch(0.22 0.01 65)",
                  borderColor: "oklch(0.22 0.01 65)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.22 0.01 65)";
                  (e.currentTarget as HTMLButtonElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.22 0.01 65)";
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-0 shrink-0 border-t"
          style={{
            backgroundColor: "oklch(0.22 0.01 65)",
            borderColor: "oklch(0.35 0.01 65)",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about rentals, buying, or management…"
            disabled={isLoading}
            className="flex-1 bg-transparent text-white placeholder-[oklch(0.45_0.01_80)] px-4 py-3.5 text-sm focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-3.5 transition-colors disabled:opacity-40"
            style={{ backgroundColor: "oklch(0.55 0.13 38)" }}
          >
            {isLoading ? (
              <Loader2 size={16} className="text-white animate-spin" />
            ) : (
              <Send size={16} className="text-white" />
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          className="px-4 py-2 text-center shrink-0"
          style={{ backgroundColor: "oklch(0.22 0.01 65)" }}
        >
          <span
            className="text-[0.6rem] text-[oklch(0.40_0.01_80)]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Powered by Rosalia Group · rosaliagroup.com
          </span>
        </div>
      </div>
    </>
  );
}
