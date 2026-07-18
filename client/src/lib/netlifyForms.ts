/*
 * Netlify Forms client helper.
 *
 * The site is a client-rendered SPA, so Netlify cannot detect the real forms in
 * the app bundle. Hidden static forms are declared in client/index.html (parsed
 * by Netlify at build time to register the "contact" and "chatbot-lead" forms).
 * The React forms submit to them here via a urlencoded AJAX POST to "/", which
 * Netlify's form handler intercepts by matching `form-name` (it returns 404 for
 * an unregistered form, so an un-detected form can never show a false success).
 * Callers gate success on `ok` (a confirmed 2xx from Netlify's form handler).
 *
 * Note: a 2xx means Netlify accepted and stored the submission. It does NOT by
 * itself mean an email notification was delivered — notifications are configured
 * separately in the Netlify dashboard.
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
