/**
 * Legal document content (Privacy Policy + Terms & Conditions) as translatable
 * data, rendered by a single shared renderer (see LegalPage). English is the
 * source of truth and the controlling legal version.
 *
 * Prose is stored as plain strings so it can be translated per language, while
 * compliance-critical / structural pieces are expressed as tokens that the
 * renderer expands verbatim regardless of language — so the A2P 10DLC mobile
 * disclaimer, the Terms/Privacy cross-links, and the contact email/phone are
 * NEVER altered by translation:
 *
 *   {brand}       → the brand name (SMS_BRAND)
 *   {disclaimer}  → the mobile opt-in disclaimer, verbatim English (bold)
 *   {terms}       → link to the Terms & Conditions
 *   {privacy}     → link to the Privacy Policy
 *   {email}       → mailto link to the legal contact email
 *   {phone}       → tel link to the legal contact phone
 *
 * Full translations exist for the languages in `LEGAL_TRANSLATED_LANGS`. Every
 * other language renders this English body plus a translated notice stating that
 * English is the controlling version (see LegalPage) — English is shown
 * deliberately and labelled, never passed off as a translation.
 */
import type { LangCode } from "../contexts/LanguageContext";
import type { LegalDoc, LegalPack, LegalDocId } from "./legal/types";
import { legalEs } from "./legal/es";
import { legalPt } from "./legal/pt";
import { legalFr } from "./legal/fr";
import { legalAr } from "./legal/ar";

export type { LegalBlock, LegalSection, LegalDoc, LegalPack, LegalDocId } from "./legal/types";

export const LAST_UPDATED = "July 13, 2026";

// ── English source of truth ───────────────────────────────────────────────────
const PRIVACY_EN: LegalDoc = {
  title: "Privacy Policy",
  intro:
    "This Privacy Policy explains how {brand} (“we,” “us,” or “our”) collects, uses, and protects information when you visit our website, contact us, submit an inquiry or rental application, request a showing or appointment, or communicate with us by email or text message.",
  sections: [
    {
      heading: "Information We Collect",
      blocks: [
        { p: "We collect information you provide directly to us and information collected automatically when you use our site. This may include:" },
        { ul: [
          "Contact details such as your name, email address, phone number, and mailing address.",
          "Information you submit through our forms — property inquiries, contact messages, showing or appointment requests, and rental applications.",
          "Details you choose to share, such as desired move-in date, budget, the type of service you are interested in, and property preferences.",
          "Messages and content you send us through forms, our AI assistant, email, or SMS.",
          "Technical and usage data such as IP address, browser type, device information, pages viewed, and referring pages.",
        ] },
      ],
    },
    {
      heading: "How We Use Your Information",
      blocks: [
        { p: "We use the information we collect to:" },
        { ul: [
          "Respond to your inquiries and provide the services you request.",
          "Schedule and confirm appointments, showings, and follow-ups.",
          "Process rental applications and communicate about their status.",
          "Send transactional and service-related messages by email and, with your consent, SMS.",
          "Operate, maintain, secure, and improve our website and services.",
          "Comply with our legal, tax, and regulatory obligations.",
        ] },
      ],
    },
    {
      heading: "Property Inquiries",
      blocks: [
        { p: "When you submit a property inquiry or request information about a listing, we use your contact details and the details of your inquiry to respond, schedule appointments, and provide updates relevant to your request." },
      ],
    },
    {
      heading: "Contact Forms",
      blocks: [
        { p: "When you submit a contact form, we collect the information you provide (such as your name, email, phone number, and message) in order to respond to your request and follow up with you about our properties and services." },
      ],
    },
    {
      heading: "Rental Applications",
      blocks: [
        { p: "If you begin or submit a rental application, we collect the application information you provide to evaluate your interest, communicate with you, and process your request. This information is used for leasing purposes and shared only with service providers and parties necessary to process your application." },
      ],
    },
    {
      heading: "Appointment and Showing Requests",
      blocks: [
        { p: "When you request an appointment or a property showing, we use your contact details to schedule, confirm, remind, and follow up with you about the appointment. Appointment reminders and confirmations may be sent by email or, if you have opted in, by SMS." },
      ],
    },
    {
      heading: "AI Chatbot Interactions",
      blocks: [
        { p: "Our website offers an AI assistant to help answer questions and connect you with our team. Conversations with the assistant may be processed and stored to answer your questions, route your request, and improve the quality of our responses. Please do not share sensitive personal information in the chat. Information you provide to the assistant is handled in accordance with this Privacy Policy." },
      ],
    },
    {
      heading: "Email Communications",
      blocks: [
        { p: "We may send you transactional and service-related emails, such as responses to your inquiries, appointment confirmations, application updates, and customer service messages. You may opt out of non-essential emails at any time using the unsubscribe link or by contacting us." },
      ],
    },
    {
      heading: "SMS Communications",
      blocks: [
        { p: "If you provide your mobile number and opt in, we may send you SMS text messages from {brand} regarding your property inquiries, appointments, leasing updates, rental applications, and related customer service communications. SMS consent is optional and is never a condition of purchasing or renting a property." },
        { ul: [
          "Message frequency varies.",
          "Message and data rates may apply.",
          "Reply STOP to unsubscribe.",
          "Reply HELP for assistance.",
        ] },
        { p: "{disclaimer}" },
        { p: "For details about our SMS program, including message types and consent, see our {terms}." },
      ],
    },
    {
      heading: "Cookies and Analytics",
      blocks: [
        { p: "We use cookies and similar technologies to operate our site, remember your preferences, maintain your session, and understand how our site is used. We use privacy-respecting analytics to measure traffic and improve our pages; analytics data is aggregated and is not used to sell your personal information. You can control or disable cookies through your browser settings, though some features may not function properly if cookies are disabled." },
      ],
    },
    {
      heading: "Service Providers",
      blocks: [
        { p: "We share information with trusted service providers that help us operate our business — for example, website hosting, analytics, email delivery, SMS delivery (our messaging provider), leasing and application processing, scheduling, and customer relationship tools. These providers may access personal information only to perform services on our behalf and are obligated to protect it." },
        { p: "{disclaimer} No mobile information is shared with third parties or affiliates for their own marketing or promotional purposes." },
      ],
    },
    {
      heading: "Data Security",
      blocks: [
        { p: "We use reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, misuse, or alteration. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security." },
      ],
    },
    {
      heading: "Data Retention",
      blocks: [
        { p: "We retain personal information for as long as necessary to fulfill the purposes described in this policy, to provide our services, to comply with our legal, tax, and regulatory obligations, to resolve disputes, and to enforce our agreements. When information is no longer needed, we take reasonable steps to delete or de-identify it." },
      ],
    },
    {
      heading: "Your Rights and Choices",
      blocks: [
        { p: "Depending on your location, you may have the right to request access to, correction of, or deletion of your personal information, and to opt out of certain communications. You can opt out of SMS at any time by replying STOP, and opt out of non-essential email using the unsubscribe link. To exercise any of these rights, contact us using the details below." },
      ],
    },
    {
      heading: "Children’s Privacy",
      blocks: [
        { p: "Our website and services are intended for adults and are not directed to children under 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will take appropriate steps to delete it." },
      ],
    },
    {
      heading: "Changes to This Policy",
      blocks: [
        { p: "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date above. Material changes will be reflected on this page, and your continued use of our site after an update constitutes acceptance of the revised policy." },
      ],
    },
    {
      heading: "Contact Information",
      blocks: [
        { p: "If you have questions about this Privacy Policy or wish to exercise your privacy rights, contact us:" },
        { ul: ["{brand}", "Email: {email}", "Phone: {phone}"] },
      ],
    },
  ],
};

const TERMS_EN: LegalDoc = {
  title: "Terms & Conditions",
  intro:
    "These Terms & Conditions govern your use of the {brand} website and services. By accessing our site or submitting information through it, you agree to these terms. If you do not agree, please do not use the site.",
  sections: [
    {
      heading: "Website Use",
      blocks: [
        { p: "You may use our website for lawful, personal, non-commercial purposes related to learning about and inquiring about our properties and services. You agree not to misuse the site, interfere with its operation, attempt to gain unauthorized access, or use it in violation of any applicable law." },
      ],
    },
    {
      heading: "Property Listing Accuracy Disclaimer",
      blocks: [
        { p: "Property listings, descriptions, images, floor plans, and amenities are provided for general informational purposes and are believed to be accurate but are not guaranteed. Listings do not constitute an offer or a binding contract, and you should verify any information that is important to you before relying on it." },
      ],
    },
    {
      heading: "Availability and Pricing Disclaimer",
      blocks: [
        { p: "Availability, pricing, and terms are subject to change without notice and may change at any time. Availability is not guaranteed until a lease or agreement is fully executed. Nothing on this site constitutes a commitment to lease, sell, or provide any property or service at a particular price." },
      ],
    },
    {
      heading: "Fair Housing Compliance",
      blocks: [
        { p: "{brand} is committed to the principles of the Fair Housing Act and equal housing opportunity. We do not discriminate on the basis of race, color, religion, sex, national origin, familial status, disability, or any other class protected by federal, state, or local law. All properties are offered on an equal opportunity basis." },
      ],
    },
    {
      heading: "User Responsibilities",
      blocks: [
        { p: "You are responsible for:" },
        { ul: [
          "Providing accurate, current, and complete information when you submit forms or applications.",
          "Maintaining the confidentiality of any credentials associated with your interactions.",
          "Using the site and any communications features lawfully and respectfully.",
          "Ensuring you are authorized to provide any phone number or email address you submit.",
        ] },
      ],
    },
    {
      heading: "Intellectual Property",
      blocks: [
        { p: "All content on our site — including text, graphics, logos, images, photography, layouts, and software — is owned by or licensed to {brand} and is protected by intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from this content without our prior written permission." },
      ],
    },
    {
      heading: "Third-Party Links",
      blocks: [
        { p: "Our site may contain links to third-party websites or services that we do not control. We provide these links for convenience only and are not responsible for the content, policies, or practices of any third-party site. Accessing third-party sites is at your own risk and subject to their terms and privacy policies." },
      ],
    },
    {
      heading: "AI Assistant Disclaimer",
      blocks: [
        { p: "Our site may provide an AI-powered assistant to help answer questions and connect you with our team. The assistant may produce inaccurate or incomplete information and does not provide legal, financial, or professional advice. Responses are for general informational purposes only and are not binding. For decisions that matter, please confirm with a member of our team." },
      ],
    },
    {
      heading: "Limitation of Liability",
      blocks: [
        { p: "To the fullest extent permitted by law, {brand} and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or related to your use of, or inability to use, the site or services. The site and its content are provided “as is” and “as available” without warranties of any kind, whether express or implied." },
      ],
    },
    {
      heading: "Governing Terms",
      blocks: [
        { p: "These Terms are governed by the laws of the State of New Jersey, without regard to its conflict-of-laws rules. We may update these Terms from time to time; changes take effect when posted, and your continued use of the site constitutes acceptance of the revised Terms." },
      ],
    },
    {
      heading: "SMS Terms",
      blocks: [
        { p: "By providing your mobile number and opting in, you agree to receive SMS text messages from {brand}. Participation in our SMS program is optional, and consent is not a condition of purchasing or renting a property." },
        { strong: "Types of messages." },
        { p: "Messages you may receive relate to your property inquiries, appointment and showing confirmations and reminders, leasing updates, rental application updates, and related customer service communications. We do not send unsolicited marketing text messages." },
        { strong: "Consent requirements." },
        { p: "You must opt in by checking the SMS consent box on a form where you provide your mobile number. Consent is never pre-checked and is not a condition of purchasing or renting a property. You confirm that you are the account holder or are authorized to consent for the number provided." },
        { strong: "Frequency and rates." },
        { ul: ["Message frequency varies.", "Message and data rates may apply."] },
        { strong: "Opt out and help." },
        { ul: [
          "Reply STOP to unsubscribe at any time. After you send STOP, we will send one confirmation message and then stop sending SMS messages.",
          "Reply HELP for assistance.",
        ] },
        { p: "{disclaimer}" },
        { p: "For SMS support, contact {email} or {phone}. For more information about how we handle your information, see our {privacy}." },
      ],
    },
    {
      heading: "Contact Information",
      blocks: [
        { p: "Questions about these Terms & Conditions or our SMS program? Contact us:" },
        { ul: ["{brand}", "Email: {email}", "Phone: {phone}"] },
      ],
    },
  ],
};

export const LEGAL_EN: LegalPack = { privacy: PRIVACY_EN, terms: TERMS_EN };

// Languages whose full legal body is professionally translated. Everything else
// renders the English body with a translated "English is controlling" notice.
export const LEGAL_TRANSLATED_LANGS: LangCode[] = ["en", "es", "pt", "fr", "ar"];

const LEGAL_BY_LANG: Partial<Record<LangCode, LegalPack>> = {
  en: LEGAL_EN,
  es: legalEs,
  pt: legalPt,
  fr: legalFr,
  ar: legalAr,
};

export function isLegalTranslated(lang: LangCode): boolean {
  return LEGAL_TRANSLATED_LANGS.includes(lang);
}

/** Full translated doc when available; otherwise the English source. */
export function getLegalDoc(docId: LegalDocId, lang: LangCode): LegalDoc {
  const pack = LEGAL_BY_LANG[lang] ?? LEGAL_EN;
  return pack[docId];
}
