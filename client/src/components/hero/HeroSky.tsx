/*
 * ROSALIA GROUP — Hero dynamic sky layer
 *
 * A permanent Newark skyline photograph sits behind this layer. This component
 * draws the DYNAMIC sky on top of it: a time-of-day colour tint, a horizon glow,
 * and a sun OR moon positioned from the *real* solar/lunar geometry over Newark,
 * NJ (America/New_York) at the current instant.
 *
 * - Sunrise: sun low on the eastern side, warm tone.
 * - Midday: sun high, neutral daylight.
 * - Sunset: sun low on the western side, golden tone.
 * - Night: sun hidden, dark-blue tint + subtle moon (if up) and faint stars.
 *
 * Everything here is decorative: aria-hidden, pointer-events:none, and it always
 * renders behind the hero content (z-index), so it can never cover the headline,
 * buttons, stats, navigation, or the scroll indicator. Motion is disabled under
 * prefers-reduced-motion.
 *
 * QA: append ?skyTime=<ISO-8601 with offset> to preview a specific instant, e.g.
 * ?skyTime=2026-07-17T13:00:00-04:00 . It only moves this decorative layer.
 */

import { useEffect, useState } from "react";
import { sunPosition, moonPosition, maxSunAltitude } from "@/lib/solar";

const NEWARK = { lat: 40.7357, lng: -74.1724 };
const DEG = Math.PI / 180;

type RGB = [number, number, number];
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const rgba = (c: RGB, a: number) => `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${a})`;

// palettes
const SUNRISE: RGB = [255, 150, 96];
const GOLDEN: RGB = [255, 168, 74];
const MIDDAY: RGB = [176, 202, 232];
const NIGHT: RGB = [8, 14, 40];
const SUN_WARM: RGB = [255, 158, 92];
const SUN_HOT: RGB = [255, 249, 234];

interface SkyState {
  phase: "sunrise" | "morning" | "midday" | "evening" | "sunset" | "night";
  tint: string;
  horizonOpacity: number;
  horizonColor: string;
  horizonX: number;
  sunVisible: boolean;
  sunX: number; sunY: number; sunSize: number;
  sunColor: string; sunGlow: string;
  moonVisible: boolean;
  moonX: number; moonY: number; moonOpacity: number;
  starOpacity: number;
}

function getNow(): Date {
  try {
    const p = new URLSearchParams(window.location.search).get("skyTime");
    if (p) { const d = new Date(p); if (!isNaN(d.valueOf())) return d; }
  } catch { /* ignore */ }
  return new Date();
}

function computeSky(date: Date): SkyState {
  const sun = sunPosition(date, NEWARK.lat, NEWARK.lng);
  const altDeg = sun.altitude / DEG;
  const morning = sun.azimuth < 0; // eastern half of the sky
  const maxAlt = maxSunAltitude(date, NEWARK.lat);

  // 0 in deep night → 1 in full day, with a smooth twilight band around the horizon
  const dayness = clamp((altDeg + 4) / 10, 0, 1);
  const dayHeight = clamp(altDeg / 45, 0, 1); // 0 at horizon → 1 high in the sky

  // sky tint (overlay gradient, alpha stronger near the horizon / at night)
  const horizonTone = morning ? SUNRISE : GOLDEN;
  const dayTint = mix(horizonTone, MIDDAY, dayHeight);
  const tintColor = mix(NIGHT, dayTint, dayness);
  const alphaTop = lerp(0.82, lerp(0.42, 0.22, dayHeight), dayness); // much stronger at night to override the golden base photo
  const alphaMid = alphaTop * (dayness < 0.3 ? 0.85 : 0.5);
  const fade = dayness < 0.3 ? "94%" : "78%";
  const tint = `linear-gradient(to bottom, ${rgba(tintColor, alphaTop)} 0%, ${rgba(tintColor, alphaMid)} 46%, rgba(0,0,0,0) ${fade})`;

  // sun position → screen fractions
  const sunXFrac = clamp(0.5 + clamp(sun.azimuth, -Math.PI / 2, Math.PI / 2) / Math.PI, 0.08, 0.92);
  const altNorm = clamp(sun.altitude / maxAlt, 0, 1);
  const sunYFrac = 0.47 - altNorm * 0.34; // 0.47 at horizon → 0.13 at solar noon (upper band, clear of content)
  const sunOpacity = clamp((altDeg + 0.5) / 5, 0, 1); // sinks behind the skyline as it sets
  const sunColor = mix(SUN_WARM, SUN_HOT, dayHeight);

  // moon (only drawn when it is above the horizon and it is dark enough)
  const moon = moonPosition(date, NEWARK.lat, NEWARK.lng);
  const moonAltDeg = moon.altitude / DEG;
  const moonVisible = dayness < 0.25 && moonAltDeg > 1.5;
  const moonXFrac = clamp(0.5 + clamp(moon.azimuth, -Math.PI / 2, Math.PI / 2) / Math.PI, 0.08, 0.92);
  const moonYFrac = 0.50 - clamp(moon.altitude / (58 * DEG), 0, 1) * 0.34;

  const phase: SkyState["phase"] =
    dayness < 0.15 ? "night"
    : altDeg < 8 ? (morning ? "sunrise" : "sunset")
    : altDeg < 30 ? (morning ? "morning" : "evening")
    : "midday";

  return {
    phase,
    tint,
    horizonOpacity: dayness * clamp(1 - altDeg / 16, 0, 1) * 0.9,
    horizonColor: rgba(horizonTone, 0.9),
    horizonX: sunXFrac,
    sunVisible: sunOpacity > 0.02,
    sunX: sunXFrac * 100, sunY: sunYFrac * 100,
    sunSize: 5.5 - dayHeight * 1.6, // vmin; a touch larger near the horizon
    sunColor: rgba(sunColor, sunOpacity),
    sunGlow: rgba(sunColor, sunOpacity),
    moonVisible,
    moonX: moonXFrac * 100, moonY: moonYFrac * 100,
    moonOpacity: clamp(moonAltDeg / 6, 0.4, 0.95),
    starOpacity: clamp((0.18 - dayness) / 0.18, 0, 1) * 0.7,
  };
}

export default function HeroSky() {
  const [sky, setSky] = useState<SkyState>(() => computeSky(getNow()));
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    // recompute every minute so the sun drifts across the day
    const tick = () => setSky(computeSky(getNow()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => { window.clearInterval(id); mq.removeEventListener("change", apply); };
  }, []);

  const move = reduced ? "none" : "left 4s ease, top 4s ease, opacity 4s ease";
  const fade = reduced ? "none" : "opacity 4s ease, background 6s ease";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" data-sky-phase={sky.phase}>
      {/* time-of-day colour tint */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: sky.tint, transition: fade }} />

      {/* horizon glow (sunrise / golden hour) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          zIndex: 3, height: "70%", mixBlendMode: "screen", transition: fade,
          opacity: sky.horizonOpacity,
          background: `radial-gradient(120% 90% at ${sky.horizonX * 100}% 100%, ${sky.horizonColor} 0%, rgba(0,0,0,0) 60%)`,
        }}
      />

      {/* stars (subtle, night only) */}
      {sky.starOpacity > 0.02 && (
        <div
          className="absolute inset-x-0 top-0"
          style={{
            zIndex: 3, height: "55%", opacity: sky.starOpacity, transition: fade,
            backgroundImage:
              "radial-gradient(1.2px 1.2px at 18% 22%, #fff, transparent), radial-gradient(1px 1px at 62% 15%, #fff, transparent), radial-gradient(1.4px 1.4px at 82% 30%, #fff, transparent), radial-gradient(1px 1px at 40% 38%, #fff, transparent), radial-gradient(1px 1px at 73% 44%, #fff, transparent), radial-gradient(1.2px 1.2px at 30% 12%, #fff, transparent)",
          }}
        />
      )}

      {/* sun */}
      {sky.sunVisible && (
        <>
          {/* glow halo */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              zIndex: 3, left: `${sky.sunX}%`, top: `${sky.sunY}%`,
              width: "27vmin", height: "27vmin", mixBlendMode: "screen",
              background: `radial-gradient(circle, ${sky.sunGlow} 0%, rgba(0,0,0,0) 62%)`,
              transition: move,
            }}
          />
          {/* disc */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              zIndex: 3, left: `${sky.sunX}%`, top: `${sky.sunY}%`,
              width: `${sky.sunSize}vmin`, height: `${sky.sunSize}vmin`,
              background: `radial-gradient(circle, ${sky.sunColor} 0%, ${sky.sunColor} 45%, rgba(0,0,0,0) 72%)`,
              boxShadow: `0 0 6vmin ${sky.sunGlow}`, mixBlendMode: "screen",
              transition: move,
            }}
          />
        </>
      )}

      {/* moon (night) */}
      {sky.moonVisible && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            zIndex: 3, left: `${sky.moonX}%`, top: `${sky.moonY}%`,
            width: "4.4vmin", height: "4.4vmin", opacity: sky.moonOpacity,
            background: "radial-gradient(circle at 38% 38%, #f4f5fb 0%, #d9deec 55%, #aeb6cc 100%)",
            boxShadow: "0 0 5vmin rgba(200,215,255,0.45)", transition: move,
          }}
        />
      )}
    </div>
  );
}
