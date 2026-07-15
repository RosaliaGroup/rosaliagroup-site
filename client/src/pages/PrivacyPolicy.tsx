/*
 * ROSALIA GROUP — Privacy Policy
 * Public, unauthenticated route (/privacy-policy). Required for the Rosalia
 * Group A2P 10DLC / Telnyx campaign review. Content is static and self-
 * contained; the SMS wording and mobile statement are imported from the shared
 * source of truth so they stay byte-for-byte identical to what users agree to
 * on every form.
 */
import LegalPage, { Section, P, UL, LI } from "@/components/LegalPage";
import {
  SMS_BRAND,
  SMS_MOBILE_DISCLAIMER,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTACT_PHONE,
  TERMS_PATH,
} from "@shared/legal/sms-consent";

const LAST_UPDATED = "July 13, 2026";

const linkClass = "text-[oklch(0.55_0.13_38)] underline underline-offset-2 hover:text-[oklch(0.30_0.01_65)]";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          This Privacy Policy explains how {SMS_BRAND} (“we,” “us,” or “our”) collects, uses, and
          protects information when you visit our website, contact us, submit an inquiry or rental
          application, request a showing or appointment, or communicate with us by email or text
          message.
        </>
      }
    >
      <Section title="Information We Collect">
        <P>
          We collect information you provide directly to us and information collected automatically
          when you use our site. This may include:
        </P>
        <UL>
          <LI>Contact details such as your name, email address, phone number, and mailing address.</LI>
          <LI>Information you submit through our forms — property inquiries, contact messages, showing or appointment requests, and rental applications.</LI>
          <LI>Details you choose to share, such as desired move-in date, budget, the type of service you are interested in, and property preferences.</LI>
          <LI>Messages and content you send us through forms, our AI assistant, email, or SMS.</LI>
          <LI>Technical and usage data such as IP address, browser type, device information, pages viewed, and referring pages.</LI>
        </UL>
      </Section>

      <Section title="How We Use Your Information">
        <P>We use the information we collect to:</P>
        <UL>
          <LI>Respond to your inquiries and provide the services you request.</LI>
          <LI>Schedule and confirm appointments, showings, and follow-ups.</LI>
          <LI>Process rental applications and communicate about their status.</LI>
          <LI>Send transactional and service-related messages by email and, with your consent, SMS.</LI>
          <LI>Operate, maintain, secure, and improve our website and services.</LI>
          <LI>Comply with our legal, tax, and regulatory obligations.</LI>
        </UL>
      </Section>

      <Section title="Property Inquiries">
        <P>
          When you submit a property inquiry or request information about a listing, we use your
          contact details and the details of your inquiry to respond, schedule appointments, and
          provide updates relevant to your request.
        </P>
      </Section>

      <Section title="Contact Forms">
        <P>
          When you submit a contact form, we collect the information you provide (such as your name,
          email, phone number, and message) in order to respond to your request and follow up with
          you about our properties and services.
        </P>
      </Section>

      <Section title="Rental Applications">
        <P>
          If you begin or submit a rental application, we collect the application information you
          provide to evaluate your interest, communicate with you, and process your request. This
          information is used for leasing purposes and shared only with service providers and parties
          necessary to process your application.
        </P>
      </Section>

      <Section title="Appointment and Showing Requests">
        <P>
          When you request an appointment or a property showing, we use your contact details to
          schedule, confirm, remind, and follow up with you about the appointment. Appointment
          reminders and confirmations may be sent by email or, if you have opted in, by SMS.
        </P>
      </Section>

      <Section title="AI Chatbot Interactions">
        <P>
          Our website offers an AI assistant to help answer questions and connect you with our team.
          Conversations with the assistant may be processed and stored to answer your questions,
          route your request, and improve the quality of our responses. Please do not share sensitive
          personal information in the chat. Information you provide to the assistant is handled in
          accordance with this Privacy Policy.
        </P>
      </Section>

      <Section title="Email Communications">
        <P>
          We may send you transactional and service-related emails, such as responses to your
          inquiries, appointment confirmations, application updates, and customer service messages.
          You may opt out of non-essential emails at any time using the unsubscribe link or by
          contacting us.
        </P>
      </Section>

      <Section title="SMS Communications">
        <P>
          If you provide your mobile number and opt in, we may send you SMS text messages from{" "}
          {SMS_BRAND} regarding your property inquiries, appointments, leasing updates, rental
          applications, and related customer service communications. SMS consent is optional and is
          never a condition of purchasing or renting a property.
        </P>
        <UL>
          <LI>Message frequency varies.</LI>
          <LI>Message and data rates may apply.</LI>
          <LI>Reply STOP to unsubscribe.</LI>
          <LI>Reply HELP for assistance.</LI>
        </UL>
        <P>
          <strong className="font-semibold text-[oklch(0.22_0.01_65)]">{SMS_MOBILE_DISCLAIMER}</strong>
        </P>
        <P>
          For details about our SMS program, including message types and consent, see our{" "}
          <a href={TERMS_PATH} className={linkClass}>
            Terms &amp; Conditions
          </a>
          .
        </P>
      </Section>

      <Section title="Cookies and Analytics">
        <P>
          We use cookies and similar technologies to operate our site, remember your preferences,
          maintain your session, and understand how our site is used. We use privacy-respecting
          analytics to measure traffic and improve our pages; analytics data is aggregated and is not
          used to sell your personal information. You can control or disable cookies through your
          browser settings, though some features may not function properly if cookies are disabled.
        </P>
      </Section>

      <Section title="Service Providers">
        <P>
          We share information with trusted service providers that help us operate our business — for
          example, website hosting, analytics, email delivery, SMS delivery (our messaging provider),
          leasing and application processing, scheduling, and customer relationship tools. These
          providers may access personal information only to perform services on our behalf and are
          obligated to protect it.
        </P>
        <P>
          {SMS_MOBILE_DISCLAIMER} No mobile information is shared with third parties or affiliates
          for their own marketing or promotional purposes.
        </P>
      </Section>

      <Section title="Data Security">
        <P>
          We use reasonable administrative, technical, and physical safeguards designed to protect
          personal information against unauthorized access, loss, misuse, or alteration. No method of
          transmission or storage is completely secure, however, and we cannot guarantee absolute
          security.
        </P>
      </Section>

      <Section title="Data Retention">
        <P>
          We retain personal information for as long as necessary to fulfill the purposes described in
          this policy, to provide our services, to comply with our legal, tax, and regulatory
          obligations, to resolve disputes, and to enforce our agreements. When information is no
          longer needed, we take reasonable steps to delete or de-identify it.
        </P>
      </Section>

      <Section title="Your Rights and Choices">
        <P>
          Depending on your location, you may have the right to request access to, correction of, or
          deletion of your personal information, and to opt out of certain communications. You can opt
          out of SMS at any time by replying STOP, and opt out of non-essential email using the
          unsubscribe link. To exercise any of these rights, contact us using the details below.
        </P>
      </Section>

      <Section title="Children’s Privacy">
        <P>
          Our website and services are intended for adults and are not directed to children under 18.
          We do not knowingly collect personal information from children. If you believe a child has
          provided us with personal information, please contact us and we will take appropriate steps
          to delete it.
        </P>
      </Section>

      <Section title="Changes to This Policy">
        <P>
          We may update this Privacy Policy from time to time. When we do, we will revise the “Last
          updated” date above. Material changes will be reflected on this page, and your continued use
          of our site after an update constitutes acceptance of the revised policy.
        </P>
      </Section>

      <Section title="Contact Information">
        <P>
          If you have questions about this Privacy Policy or wish to exercise your privacy rights,
          contact us:
        </P>
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
