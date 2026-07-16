/*
 * ROSALIA GROUP — Terms & Conditions
 * Public, unauthenticated route (/terms-and-conditions). Required for the
 * Rosalia Group A2P 10DLC / Telnyx campaign review. The SMS Terms reuse the
 * shared consent constants so the wording matches the consent checkbox and the
 * Privacy Policy exactly.
 */
import LegalPage, { Section, P, UL, LI } from "@/components/LegalPage";
import {
  SMS_BRAND,
  SMS_MOBILE_DISCLAIMER,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTACT_PHONE,
  PRIVACY_POLICY_PATH,
} from "@shared/legal/sms-consent";

const LAST_UPDATED = "July 13, 2026";

const linkClass = "text-[oklch(0.55_0.13_38)] underline underline-offset-2 hover:text-[oklch(0.30_0.01_65)]";

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          These Terms &amp; Conditions govern your use of the {SMS_BRAND} website and services. By
          accessing our site or submitting information through it, you agree to these terms. If you do
          not agree, please do not use the site.
        </>
      }
    >
      <Section title="Website Use">
        <P>
          You may use our website for lawful, personal, non-commercial purposes related to learning
          about and inquiring about our properties and services. You agree not to misuse the site,
          interfere with its operation, attempt to gain unauthorized access, or use it in violation of
          any applicable law.
        </P>
      </Section>

      <Section title="Property Listing Accuracy Disclaimer">
        <P>
          Property listings, descriptions, images, floor plans, and amenities are provided for general
          informational purposes and are believed to be accurate but are not guaranteed. Listings do
          not constitute an offer or a binding contract, and you should verify any information that is
          important to you before relying on it.
        </P>
      </Section>

      <Section title="Availability and Pricing Disclaimer">
        <P>
          Availability, pricing, and terms are subject to change without notice and may change at any
          time. Availability is not guaranteed until a lease or agreement is fully executed. Nothing on
          this site constitutes a commitment to lease, sell, or provide any property or service at a
          particular price.
        </P>
      </Section>

      <Section title="Fair Housing Compliance">
        <P>
          {SMS_BRAND} is committed to the principles of the Fair Housing Act and equal housing
          opportunity. We do not discriminate on the basis of race, color, religion, sex, national
          origin, familial status, disability, or any other class protected by federal, state, or local
          law. All properties are offered on an equal opportunity basis.
        </P>
      </Section>

      <Section title="User Responsibilities">
        <P>You are responsible for:</P>
        <UL>
          <LI>Providing accurate, current, and complete information when you submit forms or applications.</LI>
          <LI>Maintaining the confidentiality of any credentials associated with your interactions.</LI>
          <LI>Using the site and any communications features lawfully and respectfully.</LI>
          <LI>Ensuring you are authorized to provide any phone number or email address you submit.</LI>
        </UL>
      </Section>

      <Section title="Intellectual Property">
        <P>
          All content on our site — including text, graphics, logos, images, photography, layouts, and
          software — is owned by or licensed to {SMS_BRAND} and is protected by intellectual property
          laws. You may not copy, reproduce, distribute, or create derivative works from this content
          without our prior written permission.
        </P>
      </Section>

      <Section title="Third-Party Links">
        <P>
          Our site may contain links to third-party websites or services that we do not control. We
          provide these links for convenience only and are not responsible for the content, policies,
          or practices of any third-party site. Accessing third-party sites is at your own risk and
          subject to their terms and privacy policies.
        </P>
      </Section>

      <Section title="AI Assistant Disclaimer">
        <P>
          Our site may provide an AI-powered assistant to help answer questions and connect you with
          our team. The assistant may produce inaccurate or incomplete information and does not provide
          legal, financial, or professional advice. Responses are for general informational purposes
          only and are not binding. For decisions that matter, please confirm with a member of our
          team.
        </P>
      </Section>

      <Section title="Limitation of Liability">
        <P>
          To the fullest extent permitted by law, {SMS_BRAND} and its affiliates will not be liable for
          any indirect, incidental, special, consequential, or punitive damages, or any loss of profits
          or data, arising out of or related to your use of, or inability to use, the site or services.
          The site and its content are provided “as is” and “as available” without warranties of any
          kind, whether express or implied.
        </P>
      </Section>

      <Section title="Governing Terms">
        <P>
          These Terms are governed by the laws of the State of New Jersey, without regard to its
          conflict-of-laws rules. We may update these Terms from time to time; changes take effect when
          posted, and your continued use of the site constitutes acceptance of the revised Terms.
        </P>
      </Section>

      <Section title="SMS Terms">
        <P>
          By providing your mobile number and opting in, you agree to receive SMS text messages from{" "}
          {SMS_BRAND}. Participation in our SMS program is optional, and consent is not a condition of
          purchasing or renting a property.
        </P>

        <P className="font-medium text-[oklch(0.22_0.01_65)]">Types of messages.</P>
        <P>
          Messages you may receive relate to your property inquiries, appointment and showing
          confirmations and reminders, leasing updates, rental application updates, and related customer
          service communications. We do not send unsolicited marketing text messages.
        </P>

        <P className="font-medium text-[oklch(0.22_0.01_65)]">Consent requirements.</P>
        <P>
          You must opt in by checking the SMS consent box on a form where you provide your mobile
          number. Consent is never pre-checked and is not a condition of purchasing or renting a
          property. You confirm that you are the account holder or are authorized to consent for the
          number provided.
        </P>

        <P className="font-medium text-[oklch(0.22_0.01_65)]">Frequency and rates.</P>
        <UL>
          <LI>Message frequency varies.</LI>
          <LI>Message and data rates may apply.</LI>
        </UL>

        <P className="font-medium text-[oklch(0.22_0.01_65)]">Opt out and help.</P>
        <UL>
          <LI>Reply STOP to unsubscribe at any time. After you send STOP, we will send one confirmation message and then stop sending SMS messages.</LI>
          <LI>Reply HELP for assistance.</LI>
        </UL>

        <P>
          <strong className="font-semibold text-[oklch(0.22_0.01_65)]">{SMS_MOBILE_DISCLAIMER}</strong>
        </P>
        <P>
          For SMS support, contact{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className={linkClass}>
            {LEGAL_CONTACT_EMAIL}
          </a>{" "}
          or{" "}
          <a href={`tel:${LEGAL_CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className={linkClass}>
            {LEGAL_CONTACT_PHONE}
          </a>
          . For more information about how we handle your information, see our{" "}
          <a href={PRIVACY_POLICY_PATH} className={linkClass}>
            Privacy Policy
          </a>
          .
        </P>
      </Section>

      <Section title="Contact Information">
        <P>Questions about these Terms &amp; Conditions or our SMS program? Contact us:</P>
        <UL>
          <LI>{SMS_BRAND}</LI>
          <LI>
            Email:{" "}
            <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className={linkClass}>
              {LEGAL_CONTACT_EMAIL}
            </a>
          </LI>
          <LI>
            Phone:{" "}
            <a href={`tel:${LEGAL_CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className={linkClass}>
              {LEGAL_CONTACT_PHONE}
            </a>
          </LI>
        </UL>
      </Section>
    </LegalPage>
  );
}
