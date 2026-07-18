/*
 * ROSALIA GROUP — Hero dynamic sky layer
 *
 * A permanent Newark skyline photograph sits behind this layer. This component
 * draws the DYNAMIC sky on top of it: a time-of-day colour tint and a horizon
 * glow, plus — AT NIGHT ONLY — a moon positioned from the *real* lunar geometry
 * over Newark, NJ (America/New_York) at the current instant.
 *
 * - Daytime (sunrise → midday → sunset, sun above the horizon): tint + a warm
 *   horizon glow only. There is deliberately NO sun disc / orb.
 * - Night (sun below the horizon): dark-blue tint + a subtle moon in the safe
 *   open-sky band + faint stars. No moon is ever shown while the sun is up.
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
import { sunPosition, moonPosition } from "@/lib/solar";
import { getHeroNow, NEWARK } from "@/lib/heroTime";

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
const NIGHT: RGB = [16, 26, 64];

interface SkyState {
  phase: "sunrise" | "morning" | "midday" | "evening" | "sunset" | "night";
  tint: string;
  navScrim: string;
  horizonOpacity: number;
  horizonColor: string;
  horizonX: number;
  moonVisible: boolean;
  moonX: number; moonY: number; moonOpacity: number;
  starOpacity: number;
}

function computeSky(date: Date, isMobile: boolean): SkyState {
  const sun = sunPosition(date, NEWARK.lat, NEWARK.lng);
  const altDeg = sun.altitude / DEG;
  const morning = sun.azimuth < 0; // eastern half of the sky

  // 0 in deep night → 1 in full day, with a smooth twilight band around the horizon
  const dayness = clamp((altDeg + 4) / 10, 0, 1);
  const dayHeight = clamp(altDeg / 45, 0, 1); // 0 at horizon → 1 high in the sky

  // sky tint (overlay gradient, alpha stronger near the horizon / at night)
  const horizonTone = morning ? SUNRISE : GOLDEN;
  const dayTint = mix(horizonTone, MIDDAY, dayHeight);
  const tintColor = mix(NIGHT, dayTint, dayness);
  // Daytime blue-sky base: midday stays light/neutral (low alpha), sunrise/sunset warm,
  // night a MODERATE deep-blue that darkens the sky but keeps building detail. The tint
  // is a top-weighted gradient (not a uniform full-screen darkener) so the skyline stays
  // visible; contrast for the copy comes from the localized gradients in HeroSection.
  const alphaTop = lerp(0.66, lerp(0.40, 0.13, dayHeight), dayness);
  const alphaMid = alphaTop * (dayness < 0.3 ? 0.52 : 0.45);
  const fade = dayness < 0.3 ? "90%" : "76%";
  const tint = `linear-gradient(to bottom, ${rgba(tintColor, alphaTop)} 0%, ${rgba(tintColor, alphaMid)} 48%, rgba(0,0,0,0) ${fade})`;
  // Adaptive top scrim behind the (dark) logo / nav / language selector: subtle by day,
  // stronger at night so the dark navigation text keeps a readable light backdrop. Kept
  // soft so it reads as sky glow rather than washing out the night.
  const scrim = lerp(0.52, 0.14, dayness);
  const navScrim = `linear-gradient(to bottom, rgba(247,246,241,${scrim.toFixed(3)}) 0%, rgba(247,246,241,${(scrim * 0.38).toFixed(3)}) 42%, rgba(0,0,0,0) 100%)`;

  // Horizon glow tracks the sun's azimuth (a soft sunrise / golden-hour wash near the
  // horizon). There is deliberately NO sun disc: during the day the sky shows only the
  // tint + this glow, never an orb over the skyline.
  const sunXFrac = clamp(0.5 + clamp(sun.azimuth, -Math.PI / 2, Math.PI / 2) / Math.PI, 0.08, 0.92);

  // Moon — NIGHT ONLY. Rendered strictly when the sun is below the horizon
  // (sun.altitude < 0); there is no daytime / twilight fallback orb. Its preferred
  // position is the real lunar altitude/azimuth over Newark; when the moon is up that
  // position is clamped INTO a safe open-sky band (above the skyline, below the nav) so
  // the disc never lands on a building. When the real moon is below the horizon but the
  // sun is too (deep night), a safe in-band sky spot is used so a moon is still present.
  const moon = moonPosition(date, NEWARK.lat, NEWARK.lng);
  const moonAltDeg = moon.altitude / DEG;
  const moonUp = moonAltDeg > 0.5;
  const moonVisible = sun.altitude < 0; // strictly night: sun below the horizon
  // Safe SKY band: strictly above the skyline (buildings sit lower in the frame) and
  // below the navigation. The moon's preferred position is computed from its real
  // altitude/azimuth, then clamped INTO this band so the disc never lands on a building.
  // The mobile crop frames the skyline tighter, so the buildings rise higher in the
  // viewport — keep the mobile band shallower so the moon stays in the clear sky above
  // the rooftops (desktop has more open sky and can sit a little lower).
  const skyTop = isMobile ? 0.10 : 0.09;
  const skyBot = isMobile ? 0.19 : 0.25;
  const moonXFrac = moonUp ? clamp(0.5 + clamp(moon.azimuth, -Math.PI / 2, Math.PI / 2) / Math.PI, 0.14, 0.86) : (isMobile ? 0.72 : 0.76);
  const preferredMoonY = moonUp ? skyBot - clamp(moon.altitude / (58 * DEG), 0, 1) * (skyBot - skyTop) : (skyTop + skyBot) / 2;
  const moonYFrac = clamp(preferredMoonY, skyTop, skyBot);

  const phase: SkyState["phase"] =
    dayness < 0.15 ? "night"
    : altDeg < 8 ? (morning ? "sunrise" : "sunset")
    : altDeg < 30 ? (morning ? "morning" : "evening")
    : "midday";

  return {
    phase,
    tint,
    navScrim,
    horizonOpacity: dayness * clamp(1 - altDeg / 16, 0, 1) * 0.9,
    horizonColor: rgba(horizonTone, 0.9),
    horizonX: sunXFrac,
    moonVisible,
    moonX: moonXFrac * 100, moonY: moonYFrac * 100,
    moonOpacity: 0.96,
    starOpacity: clamp((0.18 - dayness) / 0.18, 0, 1) * 0.7,
  };
}

const isMobileView = () => {
  try { return window.matchMedia("(max-width: 640px)").matches; } catch { return false; }
};

export default function HeroSky() {
  const [sky, setSky] = useState<SkyState>(() => computeSky(getHeroNow(), isMobileView()));
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mob = window.matchMedia("(max-width: 640px)");
    const apply = () => setReduced(rm.matches);
    apply();
    rm.addEventListener("change", apply);
    // recompute every minute (sun/moon drift) and whenever the viewport crosses the
    // mobile breakpoint (the moon safe-zone is responsive).
    const tick = () => setSky(computeSky(getHeroNow(), mob.matches));
    tick();
    mob.addEventListener("change", tick);
    const id = window.setInterval(tick, 60_000);
    return () => { window.clearInterval(id); rm.removeEventListener("change", apply); mob.removeEventListener("change", tick); };
  }, []);

  const move = reduced ? "none" : "left 4s ease, top 4s ease, opacity 4s ease";
  const fade = reduced ? "none" : "opacity 4s ease, background 6s ease";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" data-sky-phase={sky.phase}>
      {/* time-of-day colour tint */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: sky.tint, transition: fade }} />

      {/* adaptive top scrim — keeps the dark logo / nav / language selector readable */}
      <div className="absolute inset-x-0 top-0" style={{ zIndex: 2, height: "27%", background: sky.navScrim, transition: fade }} />

      {/* horizon glow (sunrise / golden hour) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          zIndex: 3, height: "70%", mixBlendMode: "screen", transition: fade,
          opacity: sky.horizonOpacity,
          background: `radial-gradient(120% 90% at ${sky.horizonX * 100}% 100%, ${sky.horizonColor} 0%, rgba(0,0,0,0) 60%)`,
        }}
      />

      {/* stars — subtle, night only, confined to the OPEN SKY above the skyline (the
          gradient mask fades them out before the building line so none sit on a building) */}
      {sky.starOpacity > 0.02 && (
        <div
          className="absolute inset-x-0 top-0"
          style={{
            zIndex: 3, height: "30%", opacity: sky.starOpacity, transition: fade,
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 60%, rgba(0,0,0,0) 100%)",
            maskImage: "linear-gradient(to bottom, #000 0%, #000 60%, rgba(0,0,0,0) 100%)",
            backgroundImage:
              "radial-gradient(1.2px 1.2px at 12% 30%, #fff, transparent), radial-gradient(1px 1px at 28% 62%, #fff, transparent), radial-gradient(1.3px 1.3px at 46% 22%, #fff, transparent), radial-gradient(1px 1px at 63% 48%, #fff, transparent), radial-gradient(1.4px 1.4px at 78% 34%, #fff, transparent), radial-gradient(1px 1px at 90% 56%, #fff, transparent), radial-gradient(1px 1px at 55% 70%, #fff, transparent), radial-gradient(1.1px 1.1px at 36% 44%, #fff, transparent)",
          }}
        />
      )}

      {/* No sun disc: the daytime sky is tint + horizon glow only, never an orb. */}

      {/* moon (night only) — clearly visible with a subtle glow; behind nav + content */}
      {sky.moonVisible && (
        <>
          {/* soft glow halo */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              zIndex: 3, left: `${sky.moonX}%`, top: `${sky.moonY}%`,
              width: "18vmin", height: "18vmin", mixBlendMode: "screen",
              background: "radial-gradient(circle, rgba(210,224,255,0.5) 0%, rgba(0,0,0,0) 62%)",
              transition: move,
            }}
          />
          {/* moon disc */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              zIndex: 3, left: `${sky.moonX}%`, top: `${sky.moonY}%`,
              width: "6vmin", height: "6vmin", opacity: sky.moonOpacity,
              background: "radial-gradient(circle at 37% 35%, #f8f9ff 0%, #e2e7f5 52%, #bcc4da 100%)",
              boxShadow: "0 0 4vmin rgba(205,220,255,0.65), inset -0.6vmin -0.6vmin 1.5vmin rgba(120,132,168,0.4)",
              transition: move,
            }}
          />
        </>
      )}
    </div>
  );
}
