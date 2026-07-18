/**
 * Netlify Serverless Function: /api/contact
 *
 * Receives contact-form submissions from the website, validates + normalizes
 * them server-side, and emails every valid submission to the Rosalia Group
 * inbox via Resend (https://resend.com). The visitor's email is set as
 * Reply-To so the team can reply directly.
 *
 * Security / reliability:
 *  - required-field + email-format validation, length caps, input normalization
 *  - hidden honeypot field ("company") → silently discarded
 *  - best-effort in-memory rate limit per client IP
 *  - all user content HTML-escaped before it is rendered into the email
 *  - safe client-facing errors (no provider details leaked)
 *  - the full message body / visitor PII is never written to logs
 *
 * Secrets: RESEND_API_KEY (+ optional CONTACT_FROM_EMAIL) come from Netlify
 * environment variables only. Nothing sensitive is committed or logged.
 */

export const config = {
  path: "/api/contact",
};

const RECIPIENT = "inquiries@rosaliagroup.com";

// The sender MUST be an address on a Resend-verified domain. It is configurable
// (via CONTACT_FROM_EMAIL, resolved per-invocation) so it can be pointed at a
// verified Rosalia Group address once DNS is set up. The default is Resend's
// shared onboarding sender, which only delivers to the Resend account owner —
// it is NOT suitable for production delivery to the inbox.
const DEFAULT_FROM = "Rosalia Group Website <onboarding@resend.dev>";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const JSON_HEADERS = { "Content-Type": "application/json", ...CORS };

// ── best-effort rate limit (per warm instance) ────────────────────────────────
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map(); // ip -> number[] (timestamps)
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // opportunistic cleanup so the map can't grow unbounded on a warm instance
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

// ── helpers ───────────────────────────────────────────────────────────────────
const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);
const clean = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
// permissive but sane email shape check
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function submissionId() {
  const t = Date.now().toString(36);
  let r = "";
  for (let i = 0; i < 6; i++) r += Math.floor(Math.random() * 36).toString(36);
  return `RG-${t}${r}`.toUpperCase();
}

function json(status, obj) {
  return new Response(JSON.stringify(obj), { status, headers: JSON_HEADERS });
}

export default async function handler(req) {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" });

  const ip =
    req.headers.get("x-nf-client-connection-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown";

  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, error: "invalid_request" });
  }

  // Honeypot: real users never fill the hidden "company" field. Silently accept
  // (so bots see a normal success) but send nothing.
  if (clean(body.company, 200)) {
    return json(200, { ok: true, id: submissionId() });
  }

  if (rateLimited(ip)) {
    return json(429, { ok: false, error: "rate_limited" });
  }

  // ── validate + normalize ────────────────────────────────────────────────────
  const firstName = clean(body.firstName, 80);
  const lastName = clean(body.lastName, 80);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 40);
  const interest = clean(body.interest, 60);
  // message: preserve line breaks, cap length; only collapse trailing whitespace
  const message = String(body.message ?? "").replace(/\r\n/g, "\n").trim().slice(0, 5000);
  const pageUrl = clean(body.pageUrl, 300);
  const smsConsent = body.smsConsent === true;

  const missing = [];
  if (!firstName) missing.push("firstName");
  if (!lastName) missing.push("lastName");
  if (!email) missing.push("email");
  if (!interest) missing.push("interest");
  if (missing.length) return json(422, { ok: false, error: "missing_fields", fields: missing });
  if (!EMAIL_RE.test(email) || email.length > 160) {
    return json(422, { ok: false, error: "invalid_email" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — fail LOUDLY to the client (no fake success) but keep
    // the message safe/generic.
    console.error("contact: RESEND_API_KEY not configured");
    return json(500, { ok: false, error: "email_unconfigured" });
  }

  const id = submissionId();
  const receivedAt = new Date();
  const iso = receivedAt.toISOString();
  let readable = iso;
  try {
    readable =
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        dateStyle: "full",
        timeStyle: "long",
      }).format(receivedAt) + " (America/New_York)";
  } catch { /* fall back to ISO */ }

  const fullName = `${firstName} ${lastName}`.trim();
  const messageHtml = message ? esc(message).replace(/\n/g, "<br>") : "<em>(no message provided)</em>";

  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;line-height:1.5">
  <h2 style="margin:0 0 4px">New website inquiry</h2>
  <p style="margin:0 0 16px;color:#666;font-size:13px">Submission ${esc(id)}</p>
  <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse">
    <tr><td style="padding:4px 16px 4px 0;color:#666">Name</td><td style="padding:4px 0"><strong>${esc(fullName)}</strong></td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#666">Email</td><td style="padding:4px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#666">Phone</td><td style="padding:4px 0">${phone ? esc(phone) : "<em>(not provided)</em>"}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#666">Inquiry type</td><td style="padding:4px 0">${esc(interest)}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">Message</td><td style="padding:4px 0">${messageHtml}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#666">SMS consent</td><td style="padding:4px 0">${smsConsent ? "Yes" : "No"}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#666">Submitted</td><td style="padding:4px 0">${esc(readable)}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#666">Page</td><td style="padding:4px 0">${pageUrl ? esc(pageUrl) : "<em>(unknown)</em>"}</td></tr>
  </table>
  <p style="margin:20px 0 0;color:#999;font-size:12px">Reply directly to this email to reach ${esc(fullName)}.</p>
  </body></html>`;

  const text = [
    `New website inquiry — ${id}`,
    ``,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    `Inquiry type: ${interest}`,
    `Message: ${message || "(no message provided)"}`,
    `SMS consent: ${smsConsent ? "Yes" : "No"}`,
    `Submitted: ${readable}`,
    `Page: ${pageUrl || "(unknown)"}`,
  ].join("\n");

  const subject = `New website inquiry: ${interest} — ${fullName} [${id}]`;

  let resendStatus = 0;
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [RECIPIENT],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });
    resendStatus = resp.status;
    if (!resp.ok) {
      // Log status only — never the provider body (may echo content) or PII.
      console.error(`contact: delivery failed id=${id} status=${resendStatus}`);
      return json(502, { ok: false, error: "delivery_failed", id });
    }
  } catch (e) {
    console.error(`contact: delivery error id=${id} name=${e?.name || "Error"}`);
    return json(502, { ok: false, error: "delivery_failed", id });
  }

  // Audit log: success + non-sensitive metadata only (no name/email/phone/message).
  console.log(`contact: sent id=${id} interest="${interest}" status=${resendStatus}`);
  return json(200, { ok: true, id });
}
