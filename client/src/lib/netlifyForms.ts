/*
 * Netlify Forms client helper.
 *
 * The site is a client-rendered SPA, so Netlify cannot detect the real forms in
 * the app bundle. Hidden static forms are declared in client/index.html and in
 * the dedicated endpoint file client/public/__forms.html (both parsed by Netlify
 * at build time to register the "contact" and "chatbot-lead" forms).
 *
 * The React forms submit via a urlencoded AJAX POST to "/__forms.html" — a REAL
 * static file. This is deliberate: a POST to "/" races with the SPA catch-all
 * rewrite ("/*" -> "/index.html"), so it non-deterministically returns 404 and
 * silently drops submissions. Posting to a real file is not subject to that
 * rewrite, so Netlify's form handler processes it reliably.
 *
 * IMPORTANT: a 2xx here means Netlify accepted the POST — it is NOT on its own
 * proof that the submission was stored (dashboard confirmation is the source of
 * truth). Callers still gate the success UI on `ok`, but final verification must
 * be that the entry appears in the Netlify Forms dashboard. Email notifications
 * are configured separately in the dashboard.
 */

// Client-side reference ID shown to the visitor and stored with the submission.
export function genReferenceId(): string {
  const t = Date.now().toString(36);
  let r = "";
  for (let i = 0; i < 5; i++) r += Math.floor(Math.random() * 36).toString(36);
  return `RG-${t}${r}`.toUpperCase();
}

export async function submitToNetlifyForms(
  formName: string,
  fields: Record<string, string>,
): Promise<{ ok: boolean; status: number }> {
  const body = new URLSearchParams({ "form-name": formName, ...fields }).toString();
  const res = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return { ok: res.ok, status: res.status };
}
