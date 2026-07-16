/**
 * Conditional analytics loader.
 *
 * Injects the privacy-friendly (umami) analytics script ONLY when both
 * VITE_ANALYTICS_ENDPOINT and VITE_ANALYTICS_WEBSITE_ID are configured with
 * valid values at build time. If either is missing, blank, or an unresolved
 * build placeholder, no script is loaded — no external analytics dependency and
 * no failed requests. The endpoint is taken entirely from the environment, so
 * there is no hard-coded analytics host.
 */

function isConfigured(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    // guard against an unresolved Vite placeholder ("%VITE_...%")
    !value.includes("%VITE_")
  );
}

export function loadAnalytics(): void {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

  if (!isConfigured(endpoint) || !isConfigured(websiteId)) return;

  // Endpoint must be an absolute http(s) URL.
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = `${endpoint.replace(/\/$/, "")}/umami`;
  script.setAttribute("data-website-id", websiteId);
  document.head.appendChild(script);
}
