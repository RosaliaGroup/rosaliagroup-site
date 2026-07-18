/*
 * Shared time-of-day helper for the hero. Uses Newark's real sun geometry
 * (America/New_York is implicit — a JS Date is an absolute instant) to decide
 * which image group the rotating carousel should show, and it reads the same
 * ?skyTime QA override the sky layer uses so both stay in sync.
 */

import { sunPosition } from "@/lib/solar";

export const NEWARK = { lat: 40.7357, lng: -74.1724 };
const DEG = Math.PI / 180;

export type HeroGroup = "day" | "golden" | "night";

/** Current instant, or the ?skyTime override (QA), for the hero visuals only. */
export function getHeroNow(): Date {
  try {
    const p = new URLSearchParams(window.location.search).get("skyTime");
    if (p) {
      const d = new Date(p);
      if (!isNaN(d.valueOf())) return d;
    }
  } catch {
    /* ignore */
  }
  return new Date();
}

/**
 * Which image group to show for the given instant over Newark:
 *  - night  : sun below the horizon
 *  - golden : low sun in the western (evening) sky — sunset / golden hour
 *  - day    : morning low sun and all higher sun
 */
export function heroPhaseGroup(date: Date): HeroGroup {
  const { altitude, azimuth } = sunPosition(date, NEWARK.lat, NEWARK.lng);
  const altDeg = altitude / DEG;
  if (altDeg < -1) return "night";
  const evening = azimuth > 0; // western half of the sky → afternoon/evening
  if (altDeg < 9 && evening) return "golden";
  return "day";
}
