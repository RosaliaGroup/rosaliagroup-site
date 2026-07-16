/*
 * ROSALIA GROUP — Privacy Policy
 * Public, unauthenticated route (/privacy-policy). Required for the Rosalia
 * Group A2P 10DLC / Telnyx campaign review. Content is served from the global
 * i18n legal dictionary (i18n/legal.ts) so it translates with the rest of the
 * site; the SMS wording and mobile disclaimer are expanded verbatim from tokens
 * so they stay byte-for-byte identical to what users agree to on every form.
 */
import LegalPage from "@/components/LegalPage";

export default function PrivacyPolicy() {
  return <LegalPage docId="privacy" />;
}
