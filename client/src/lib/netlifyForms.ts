/*
 * Netlify Forms client helper.
 *
 * The site is a client-rendered SPA, so Netlify cannot detect the real forms in
 * the app bundle. Hidden static forms are declared ONCE, in client/index.html
 * (served at "/"), and Netlify parses them at build time to register the
 * "contact" and "chatbot-lead" forms — both with the submission endpoint "/".
 *
 * The React forms submit via a urlencoded AJAX POST to "/". This is the only
 * endpoint a *browser* can post a Netlify form to on this site (Netlify returns
 * 404 for browser POSTs to real static files). Declaring the forms in a SECOND
 * file with a different action (e.g. a dedicated /__forms.html) must be avoided:
 * Netlify then registers a form's endpoint nondeterministically, and a form that
 * lands on the other path becomes unreachable from the browser (404, dropped).
 *
 * Reliability note: right after a deploy, form registration takes a short time
 * to propagate across Netlify's edge; POSTs during that window can 404 and be
 * silently dropped. Once propagated, "/" is reliable.
 *
 * IMPORTANT: a 2xx here means Netlify accepted the POST — it is NOT on its own
 * proof that the submission was stored. The source of truth is the entry
 * appearing in the Netlify Forms dashboard. Callers still gate the success UI on
 * `ok`, but final verification must be dashboard-confirmed. Email notifications
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
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return { ok: res.ok, status: res.status };
}
