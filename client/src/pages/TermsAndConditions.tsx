/*
 * ROSALIA GROUP — Terms & Conditions
 * Public, unauthenticated route (/terms-and-conditions). Required for the
 * Rosalia Group A2P 10DLC / Telnyx campaign review. Content is served from the
 * global i18n legal dictionary (i18n/legal.ts) so it translates with the rest
 * of the site; the SMS terms reuse the shared consent tokens so the wording
 * matches the consent checkbox and the Privacy Policy exactly.
 */
import LegalPage from "@/components/LegalPage";

export default function TermsAndConditions() {
  return <LegalPage docId="terms" />;
}
