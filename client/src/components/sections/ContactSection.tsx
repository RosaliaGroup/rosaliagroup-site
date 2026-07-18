/*
 * ROSALIA GROUP — Contact Section
 * Design: Urban Warmth / Warm Brutalism
 * - Dark charcoal background
 * - Contact form with terracotta accents
 * - Contact info sidebar
 */

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SmsConsent from "@/components/SmsConsent";
import { submitToNetlifyForms, genReferenceId } from "@/lib/netlifyForms";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    smsConsent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Synchronous in-flight guard: blocks duplicate sends from rapid double-clicks
  // that fire before React re-renders the disabled state.
  const inFlightRef = useRef(false);

  // Clear, non-technical failure message (kept in-component so no translation
  // files are touched); the entered data is preserved so the visitor can retry.
  const ERROR_MESSAGE =
    "Sorry — your message couldn't be sent just now. Your details below are saved; please try again in a moment, or email inquiries@rosaliagroup.com directly.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current) return; // guard against double-clicks / duplicate sends
    inFlightRef.current = true;
    setSubmitting(true);
    setError(null);
    const referenceId = genReferenceId();
    try {
      const { ok } = await submitToNetlifyForms("contact", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest,
        message: formData.message,
        smsConsent: formData.smsConsent ? "Yes" : "No",
        referenceId,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        submittedAt: new Date().toISOString(),
        language: lang,
        "bot-field": honeypotRef.current?.value || "", // honeypot (must stay empty)
      });
      // Only show success on a confirmed 2xx from Netlify Forms.
      if (ok) {
        setSubmissionId(referenceId);
        setSubmitted(true);
      } else {
        setError(ERROR_MESSAGE);
      }
    } catch {
      setError(ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
      inFlightRef.current = false;
    }
  };

  const inputClass =
    "w-full bg-[oklch(0.32_0.01_65)] text-white placeholder-[oklch(0.45_0.01_80)] px-4 py-3 text-sm border border-[oklch(0.40_0.01_65)] focus:outline-none focus:border-[oklch(0.55_0.13_38)] transition-colors";

  const labelClass =
    "block text-xs text-[oklch(0.65_0.01_80)] tracking-widest uppercase mb-1.5";

  return (
    <section id="contact" ref={sectionRef} className="bg-[oklch(0.22_0.01_65)] py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="reveal mb-12">
          <span className="section-label text-[oklch(0.55_0.13_38)] mb-4 block">{t.contact.tag}</span>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.contact.heading1}
            <br />
            <em className="italic text-[oklch(0.72_0.10_38)]">{t.contact.heading2}</em>
          </h2>
          <p className="text-[oklch(0.65_0.01_80)] text-base mt-4 max-w-xl">
            {t.contact.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="reveal lg:col-span-4">
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[oklch(0.55_0.13_38)] flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-white" />
                </div>
                <div>
                  <div
                    className="text-xs text-[oklch(0.55_0.01_80)] tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {t.extra.contact.info.phone}
                  </div>
                  <a
                    href="tel:8623331681"
                    className="text-white text-sm hover:text-[oklch(0.55_0.13_38)] transition-colors"
                  >
                    (862) 333-1681
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[oklch(0.55_0.13_38)] flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-white" />
                </div>
                <div>
                  <div
                    className="text-xs text-[oklch(0.55_0.01_80)] tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {t.extra.contact.info.email}
                  </div>
                  <a
                    href="mailto:inquiries@rosaliagroup.com"
                    className="text-white text-sm hover:text-[oklch(0.55_0.13_38)] transition-colors break-all"
                  >
                    inquiries@rosaliagroup.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[oklch(0.55_0.13_38)] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <div
                    className="text-xs text-[oklch(0.55_0.01_80)] tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {t.extra.contact.info.areas}
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Newark · Jersey City<br />
                    East Orange · Elizabeth · Orange
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[oklch(0.55_0.13_38)] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <div
                    className="text-xs text-[oklch(0.55_0.01_80)] tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {t.extra.contact.info.hours}
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Mon–Fri: 9am–6pm<br />
                    Sat–Sun: 10am–5pm
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-10 pt-8 border-t border-[oklch(0.35_0.01_65)]">
              <div
                className="text-xs text-[oklch(0.55_0.01_80)] tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {t.extra.contact.info.quickContact}
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:2014496850"
                  className="text-sm text-[oklch(0.65_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                >
                  Ana Haynes: (201) 449-6850
                </a>
                <a
                  href="mailto:ana@rosaliagroup.com"
                  className="text-sm text-[oklch(0.65_0.01_80)] hover:text-[oklch(0.55_0.13_38)] transition-colors"
                >
                  ana@rosaliagroup.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal lg:col-span-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-16 h-16 bg-[oklch(0.55_0.13_38)] flex items-center justify-center mb-6">
                  <Send size={24} className="text-white" />
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t.extra.contact.successTitle}
                </h3>
                <p className="text-[oklch(0.65_0.01_80)] text-sm max-w-sm">
                  {t.extra.contact.successBody}
                </p>
                {submissionId && (
                  <p
                    className="mt-4 text-xs text-[oklch(0.55_0.01_80)]"
                    style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}
                  >
                    Reference: {submissionId}
                  </p>
                )}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmissionId(null);
                    setError(null);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      interest: "",
                      message: "",
                      smsConsent: false,
                    });
                  }}
                  className="mt-6 text-xs text-[oklch(0.55_0.13_38)] hover:text-white transition-colors"
                  style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}
                >
                  {t.extra.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>{t.contact.firstName}</label>
                    <input
                      type="text"
                      placeholder={t.extra.contact.placeholders.firstName}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>{t.contact.lastName}</label>
                    <input
                      type="text"
                      placeholder={t.extra.contact.placeholders.lastName}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>{t.contact.email}</label>
                    <input
                      type="email"
                      placeholder={t.extra.contact.placeholders.email}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>{t.contact.phone}</label>
                    <input
                      type="tel"
                      placeholder={t.extra.contact.placeholders.phone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>{t.contact.service}</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className={`${inputClass} appearance-none`}
                    required
                  >
                    <option value="" disabled>{t.contact.selectService}</option>
                    <option value="rentals">{t.extra.contact.options.rentals}</option>
                    <option value="buying">{t.extra.contact.options.buying}</option>
                    <option value="selling">{t.extra.contact.options.selling}</option>
                    <option value="property-mgmt">{t.extra.contact.options.propertyMgmt}</option>
                    <option value="asset-mgmt">{t.extra.contact.options.assetMgmt}</option>
                    <option value="international">{t.extra.contact.options.international}</option>
                    <option value="acquisitions">{t.extra.contact.options.acquisitions}</option>
                    <option value="consulting">{t.extra.contact.options.consulting}</option>
                    <option value="tenant-placement">{t.extra.contact.options.tenantPlacement}</option>
                    <option value="relocation">{t.extra.contact.options.relocation}</option>
                    <option value="investment">{t.extra.contact.options.investment}</option>
                    <option value="commercial">{t.extra.contact.options.commercial}</option>
                    <option value="staging">{t.extra.contact.options.staging}</option>
                    <option value="other">{t.extra.contact.options.other}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>{t.contact.message}</label>
                  <textarea
                    placeholder={t.extra.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* SMS Consent — A2P 10DLC compliant (shared wording) */}
                <SmsConsent
                  id="contact_sms_consent"
                  checked={formData.smsConsent}
                  onChange={(value) => setFormData({ ...formData, smsConsent: value })}
                  textClassName="text-xs leading-relaxed text-[oklch(0.65_0.01_80)]"
                  linkClassName="text-[oklch(0.72_0.10_38)] underline underline-offset-2 hover:text-white transition-colors"
                  checkboxClassName="accent-[oklch(0.55_0.13_38)]"
                />

                {/* Honeypot — visually hidden, off-screen; real users never fill it.
                    Bots that populate it are silently discarded server-side. */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
                >
                  <label>
                    Do not fill this out if you are human
                    <input
                      ref={honeypotRef}
                      type="text"
                      name="bot-field"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </label>
                </div>

                {/* Delivery error — shown only on a failed send; entered data is kept */}
                {error && (
                  <p
                    role="alert"
                    className="text-sm leading-relaxed text-[oklch(0.72_0.16_28)] border border-[oklch(0.50_0.14_28)] bg-[oklch(0.30_0.06_28)] px-4 py-3"
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="w-full bg-[oklch(0.55_0.13_38)] text-white py-4 text-xs tracking-widest uppercase hover:bg-[oklch(0.65_0.12_38)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <Send size={14} />
                  {submitting ? "Sending…" : t.contact.sendBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
