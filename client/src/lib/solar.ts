/*
 * Lightweight solar + lunar position math (no dependencies).
 * Ported from the public-domain algorithm used by SunCalc
 * (Vladimir Agafonkin), which itself follows Astronomy Answers /
 * Meeus "Astronomical Algorithms". Returns the sun's and moon's
 * altitude + azimuth for a given instant and geographic location.
 *
 * The hero uses this to place a decorative sun/moon over the Newark
 * skyline based on the ACTUAL sun position over Newark at the current
 * instant. Because a JS Date is an absolute UTC instant, the result is
 * identical no matter which time zone the visitor is in — it always
 * reflects Newark's real sky.
 */

const rad = Math.PI / 180;
const dayMs = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;
const e = rad * 23.4397; // obliquity of the Earth

function toDays(date: Date): number {
  return date.valueOf() / dayMs - 0.5 + J1970 - J2000;
}
function rightAscension(l: number, b: number): number {
  return Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l));
}
function declination(l: number, b: number): number {
  return Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l));
}
function siderealTime(d: number, lw: number): number {
  return rad * (280.16 + 360.9856235 * d) - lw;
}
function solarMeanAnomaly(d: number): number {
  return rad * (357.5291 + 0.98560028 * d);
}
function eclipticLongitude(M: number): number {
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const P = rad * 102.9372; // perihelion of the Earth
  return M + C + P + Math.PI;
}

function sunCoords(d: number) {
  const M = solarMeanAnomaly(d);
  const L = eclipticLongitude(M);
  return { dec: declination(L, 0), ra: rightAscension(L, 0) };
}
function moonCoords(d: number) {
  const L = rad * (218.316 + 13.176396 * d);
  const M = rad * (134.963 + 13.064993 * d);
  const F = rad * (93.272 + 13.229350 * d);
  const l = L + rad * 6.289 * Math.sin(M);
  const b = rad * 5.128 * Math.sin(F);
  return { ra: rightAscension(l, b), dec: declination(l, b) };
}

export interface Horizontal { altitude: number; azimuth: number } // radians

/** Sun altitude (0 = horizon) and azimuth (measured from south, +west). */
export function sunPosition(date: Date, lat: number, lng: number): Horizontal {
  const lw = rad * -lng;
  const phi = rad * lat;
  const d = toDays(date);
  const c = sunCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  return {
    altitude: Math.asin(Math.sin(phi) * Math.sin(c.dec) + Math.cos(phi) * Math.cos(c.dec) * Math.cos(H)),
    azimuth: Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(c.dec) * Math.cos(phi)),
  };
}

/** Moon altitude + azimuth (topocentric, refraction ignored — good enough for decoration). */
export function moonPosition(date: Date, lat: number, lng: number): Horizontal {
  const lw = rad * -lng;
  const phi = rad * lat;
  const d = toDays(date);
  const c = moonCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  let h = Math.asin(Math.sin(phi) * Math.sin(c.dec) + Math.cos(phi) * Math.cos(c.dec) * Math.cos(H));
  h += rad * 0.017 / Math.tan(h + (rad * 10.26) / (h + rad * 5.10)); // atmospheric refraction
  return {
    altitude: h,
    azimuth: Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(c.dec) * Math.cos(phi)),
  };
}

/** Max possible sun altitude for the day at this latitude (solar-noon altitude). */
export function maxSunAltitude(date: Date, lat: number): number {
  const d = toDays(date);
  const dec = sunCoords(d).dec;
  return Math.PI / 2 - Math.abs(rad * lat - dec);
}
