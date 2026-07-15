/**
 * SMS consent — single source of truth for the exact A2P 10DLC / Telnyx
 * compliance wording shown wherever a phone number is collected on the Rosalia
 * Group site (contact form, chatbot lead capture). The Telnyx campaign is
 * registered under the "Rosalia Group" brand, so the consent text and mobile
 * disclaimer below must be reproduced VERBATIM anywhere consent is captured and
 * on the Privacy Policy / Terms pages.
 *
 * If this wording changes, bump SMS_CONSENT_VERSION.
 */

/** Brand registered for the SMS (A2P 10DLC) program. */
export const SMS_BRAND = "Rosalia Group";

/** Public routes for the legal pages (footer + every consent block link here). */
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const TERMS_PATH = "/terms-and-conditions";

/** Contact channels shown in the legal pages and SMS support copy. */
export const LEGAL_CONTACT_EMAIL = "inquiries@rosaliagroup.com";
export const LEGAL_CONTACT_PHONE = "+1 (551) 600-7027";

/** Bump when the SMS consent wording changes. */
export const SMS_CONSENT_VERSION = "v1-2026-07";

/**
 * Exact SMS consent language. Rendered next to the independent, unchecked
 * consent checkbox on every phone-collecting form. Do not paraphrase — this is
 * the string the carrier campaign was approved against.
 */
export const SMS_CONSENT_TEXT =
  "I agree to receive SMS messages from Rosalia Group regarding my property " +
  "inquiries, appointments, leasing updates, rental applications, and related " +
  "customer service communications. Message frequency varies. Message and data " +
  "rates may apply. Reply STOP to unsubscribe or HELP for assistance. Consent " +
  "is not a condition of purchasing or renting a property.";

/**
 * Mobile-data disclaimer shown immediately below the consent checkbox and in
 * the Privacy Policy / Terms SMS sections. Required verbatim by the campaign.
 */
export const SMS_MOBILE_DISCLAIMER =
  "Mobile information will not be sold or shared with third parties for " +
  "promotional or marketing purposes.";
