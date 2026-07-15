/*
 * ROSALIA GROUP — LegalPage
 * Shared, data-driven renderer for the public legal pages (Privacy Policy,
 * Terms & Conditions). Reuses the site Navbar + Footer so a visitor is never
 * trapped, clears the fixed header, and constrains the body to a comfortable
 * reading measure. No homepage layout is modified — these are standalone wouter
 * routes.
 *
 * Content comes from the global i18n legal dictionary (see i18n/legal.ts) keyed
 * off the selected language, so a legal page translates like the rest of the
 * site instead of being hardcoded English. Compliance-critical pieces (the A2P
 * 10DLC mobile disclaimer, Privacy/Terms cross-links, contact email/phone) are
 * expanded from tokens and never altered by translation. Languages without a
 * full legal translation render the English body beneath a translated notice
 * that English is the controlling legal version.
 */
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getLegalDoc,
  isLegalTranslated,
  LAST_UPDATED,
  type LegalDocId,
} from "@/i18n/legal";
import {
  SMS_BRAND,
  SMS_MOBILE_DISCLAIMER,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTACT_PHONE,
  PRIVACY_POLICY_PATH,
  TERMS_PATH,
} from "@shared/legal/sms-consent";

const linkClass =
  "text-[oklch(0.55_0.13_38)] underline underline-offset-2 hover:text-[oklch(0.30_0.01_65)]";

const TOKEN_RE = /(\{brand\}|\{disclaimer\}|\{terms\}|\{privacy\}|\{email\}|\{phone\})/g;

/** Expand {tokens} in a translatable string into text + compliance-safe nodes. */
function renderTokens(text: string, labels: { terms: string; privacy: string }): ReactNode[] {
  return text.split(TOKEN_RE).map((part, i) => {
    switch (part) {
      case "{brand}":
        return SMS_BRAND;
      case "{disclaimer}":
        return (
          <strong key={i} className="font-semibold text-[oklch(0.22_0.01_65)]">
            {SMS_MOBILE_DISCLAIMER}
          </strong>
        );
      case "{terms}":
        return (
          <a key={i} href={TERMS_PATH} className={linkClass}>
            {labels.terms}
          </a>
        );
      case "{privacy}":
        return (
          <a key={i} href={PRIVACY_POLICY_PATH} className={linkClass}>
            {labels.privacy}
          </a>
        );
      case "{email}":
        return (
          <a key={i} href={`mailto:${LEGAL_CONTACT_EMAIL}`} className={linkClass}>
            {LEGAL_CONTACT_EMAIL}
          </a>
        );
      case "{phone}":
        return (
          <a key={i} href={`tel:${LEGAL_CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className={linkClass}>
            {LEGAL_CONTACT_PHONE}
          </a>
        );
      default:
        return part;
    }
  });
}

export default function LegalPage({ docId }: { docId: LegalDocId }) {
  const { lang, t } = useLanguage();
  const doc = getLegalDoc(docId, lang);
  const translated = isLegalTranslated(lang);
  const labels = {
    terms: getLegalDoc("terms", lang).title,
    privacy: getLegalDoc("privacy", lang).title,
  };

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
              {doc.title}
            </h1>
            <p
              className="mt-3 text-xs tracking-widest uppercase text-[oklch(0.55_0.01_80)]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {t.extra.legalUi.lastUpdated}: {LAST_UPDATED}
            </p>
            <div className="mt-5 text-sm leading-relaxed text-[oklch(0.45_0.01_65)]">
              {renderTokens(doc.intro, labels)}
            </div>
          </header>

          {!translated && (
            <div
              className="mb-10 border-l-2 border-[oklch(0.55_0.13_38)] bg-[oklch(0.93_0.02_80)] px-5 py-4 text-sm leading-relaxed text-[oklch(0.35_0.02_65)]"
              role="note"
            >
              {t.extra.legalUi.controllingNotice}
            </div>
          )}

          <div className="space-y-10">
            {doc.sections.map((section, si) => (
              <section key={si} className="scroll-mt-28">
                <h2
                  className="mb-3 text-xl lg:text-2xl font-bold text-[oklch(0.22_0.01_65)]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {section.heading}
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-[oklch(0.40_0.01_65)]">
                  {section.blocks.map((block, bi) => {
                    if ("ul" in block) {
                      return (
                        <ul key={bi} className="ml-5 list-disc space-y-1.5 leading-relaxed">
                          {block.ul.map((li, li_i) => (
                            <li key={li_i}>{renderTokens(li, labels)}</li>
                          ))}
                        </ul>
                      );
                    }
                    if ("strong" in block) {
                      return (
                        <p key={bi} className="font-medium text-[oklch(0.22_0.01_65)]">
                          {renderTokens(block.strong, labels)}
                        </p>
                      );
                    }
                    return (
                      <p key={bi} className="leading-relaxed">
                        {renderTokens(block.p, labels)}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
