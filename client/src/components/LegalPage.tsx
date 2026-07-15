/*
 * ROSALIA GROUP — LegalPage
 * Shared shell for the public legal pages (Privacy Policy, Terms & Conditions).
 * Reuses the site Navbar + Footer so a visitor is never trapped, clears the
 * fixed header, and constrains the body to a comfortable reading measure. No
 * homepage layout is modified — these are standalone wouter routes.
 *
 * The small typography helpers (Section / P / UL / LI) keep both legal pages
 * visually consistent with the site's palette and fonts.
 */
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.97_0.015_80)] text-[oklch(0.30_0.01_65)]">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-36">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl pb-20">
          <header className="mb-10 border-b border-[oklch(0.87_0.02_80)] pb-8">
            <h1
              className="text-4xl lg:text-5xl font-bold text-[oklch(0.22_0.01_65)] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h1>
            <p
              className="mt-3 text-xs tracking-widest uppercase text-[oklch(0.55_0.01_80)]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Last updated: {lastUpdated}
            </p>
            {intro && (
              <div className="mt-5 text-sm leading-relaxed text-[oklch(0.45_0.01_65)]">{intro}</div>
            )}
          </header>
          <div className="space-y-10">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/** A titled content block: heading + body. */
export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2
        className="mb-3 text-xl lg:text-2xl font-bold text-[oklch(0.22_0.01_65)]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-[oklch(0.40_0.01_65)]">{children}</div>
    </section>
  );
}

export function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`leading-relaxed ${className}`}>{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="ml-5 list-disc space-y-1.5 leading-relaxed">{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}
