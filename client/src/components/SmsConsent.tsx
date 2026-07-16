/*
 * ROSALIA GROUP — SmsConsent
 *
 * The shared, A2P-10DLC-compliant SMS opt-in block used by every form that
 * collects a phone number (contact form, chatbot lead capture). It renders, in
 * this exact order:
 *
 *   1. An independent, unchecked consent checkbox with the carrier-approved
 *      consent language (never pre-checked; consent is not a condition of
 *      purchasing or renting a property).
 *   2. The required "Mobile information will not be sold…" statement directly
 *      below the checkbox.
 *   3. Links to the Privacy Policy and Terms & Conditions.
 *
 * Wording is imported from @shared/legal/sms-consent so every placement stays
 * byte-for-byte identical. Callers own the checkbox state and pass palette
 * classes so the block matches each form's design (no redesign).
 */
import {
  SMS_CONSENT_TEXT,
  SMS_MOBILE_DISCLAIMER,
  PRIVACY_POLICY_PATH,
  TERMS_PATH,
} from "@shared/legal/sms-consent";

interface SmsConsentProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  id?: string;
  /** Wrapper classes (spacing). */
  className?: string;
  /** Text color/size for the consent + mobile statement. */
  textClassName?: string;
  /** Classes for the Privacy/Terms links. */
  linkClassName?: string;
  /** Classes for the checkbox input (accent color). */
  checkboxClassName?: string;
}

export default function SmsConsent({
  checked,
  onChange,
  id = "sms_consent",
  className = "",
  textClassName = "text-xs leading-relaxed text-[oklch(0.50_0.01_80)]",
  linkClassName = "underline underline-offset-2 hover:text-[oklch(0.55_0.13_38)] transition-colors",
  checkboxClassName = "accent-[oklch(0.55_0.13_38)]",
}: SmsConsentProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={`mt-1 h-4 w-4 shrink-0 ${checkboxClassName}`}
        />
        <label htmlFor={id} className={`${textClassName} cursor-pointer`}>
          {SMS_CONSENT_TEXT}
        </label>
      </div>
      <p className={`pl-7 ${textClassName}`}>{SMS_MOBILE_DISCLAIMER}</p>
      <p className={`pl-7 ${textClassName}`}>
        See our{" "}
        <a href={PRIVACY_POLICY_PATH} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href={TERMS_PATH} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Terms &amp; Conditions
        </a>
        .
      </p>
    </div>
  );
}
