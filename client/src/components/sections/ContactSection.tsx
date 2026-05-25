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

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                    Phone
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
                    Email
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
                    Areas Served
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
                    Hours
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
                Quick Contact
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
                  Message Sent!
                </h3>
                <p className="text-[oklch(0.65_0.01_80)] text-sm max-w-sm">
                  Thank you for reaching out. A member of the Rosalia Group team will follow up with you the same day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs text-[oklch(0.55_0.13_38)] hover:text-white transition-colors"
                  style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>First Name</label>
                    <input
                      type="text"
                      placeholder="Ana"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>Last Name</label>
                    <input
                      type="text"
                      placeholder="Haynes"
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
                    <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>Email</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>Phone</label>
                    <input
                      type="tel"
                      placeholder="(201) 555-1234"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>I'm Interested In…</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className={`${inputClass} appearance-none`}
                    required
                  >
                    <option value="" disabled>Select one</option>
                    <option value="rentals">Apartment Rentals</option>
                    <option value="buying">Buying a Home</option>
                    <option value="selling">Selling a Home</option>
                    <option value="property-mgmt">Property Management</option>
                    <option value="asset-mgmt">Asset Management</option>
                    <option value="international">International Property Management</option>
                    <option value="acquisitions">Acquisitions</option>
                    <option value="consulting">Consulting &amp; Project Maximization</option>
                    <option value="tenant-placement">Tenant Placement</option>
                    <option value="relocation">Relocation Assistance</option>
                    <option value="investment">Investment Portfolio Analysis</option>
                    <option value="commercial">Commercial Real Estate</option>
                    <option value="staging">Home Staging &amp; Renovation</option>
                    <option value="other">Other / General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Space Mono', monospace" }}>Message</label>
                  <textarea
                    placeholder="Tell us what you're looking for…"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* SMS Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="sms_consent"
                    checked={formData.smsConsent}
                    onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 accent-[oklch(0.55_0.13_38)]"
                  />
                  <label
                    htmlFor="sms_consent"
                    className="text-xs text-[oklch(0.50_0.01_80)] leading-relaxed"
                  >
                    I agree to receive SMS messages from Rosalia Group regarding my inquiry. Msg &amp; data rates may apply. Reply STOP to opt out.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[oklch(0.55_0.13_38)] text-white py-4 text-xs tracking-widest uppercase hover:bg-[oklch(0.65_0.12_38)] transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
