/*
 * ROSALIA GROUP — Hero image carousel
 *
 * A crossfading carousel of real, licensed Newark, NJ skyline photographs. The
 * ACTIVE image group is chosen from Newark's time of day (America/New_York) so the
 * photography matches the sky:
 *   day    → daytime skylines
 *   golden → sunset / golden-hour skyline
 *   night  → nighttime skyline
 * Within the active group the images crossfade every ~9s. It respects
 * prefers-reduced-motion (no auto-rotation, no fade) and shares the ?skyTime QA
 * override + Newark-time logic with the sky layer (see lib/heroTime).
 *
 * Each image is a responsive <picture> (AVIF → WebP → JPEG). Layers are absolutely
 * positioned (no layout shift) behind the sky, content and navigation.
 */

import { useEffect, useState } from "react";
import { getHeroNow, heroPhaseGroup, type HeroGroup } from "@/lib/heroTime";

interface HeroImage {
  base: string;
  widths: number[];
  alt: string;
  pos: string; // object-position
}

// Real Newark skyline photography (see footer credit / report for sources + licenses).
const IMAGES: Record<HeroGroup, HeroImage[]> = {
  day: [
    { base: "newark-day", widths: [640, 1024, 1600, 2400], alt: "The Newark, New Jersey skyline across the Passaic River", pos: "center 38%" },
    { base: "newark-day2", widths: [640, 1024, 1600, 2400], alt: "The Newark, New Jersey skyline from Riverfront Park", pos: "center 40%" },
  ],
  golden: [
    { base: "newark-golden", widths: [640, 960, 1290], alt: "The Newark, New Jersey skyline at sunset", pos: "center 46%" },
  ],
  night: [
    { base: "newark-night", widths: [640, 1024, 1600, 2400], alt: "The Newark, New Jersey skyline at night", pos: "center 44%" },
  ],
};

const srcset = (img: HeroImage, ext: string) =>
  img.widths.map((w) => `/hero/${img.base}-${w}.${ext} ${w}w`).join(", ");

export default function HeroCarousel() {
  const [group, setGroup] = useState<HeroGroup>(() => heroPhaseGroup(getHeroNow()));
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(rm.matches);
    const onRm = () => setReduced(rm.matches);
    rm.addEventListener("change", onRm);
    // re-evaluate the Newark-time image group every minute
    const groupTick = () => setGroup(heroPhaseGroup(getHeroNow()));
    groupTick();
    const gid = window.setInterval(groupTick, 60_000);
    return () => { window.clearInterval(gid); rm.removeEventListener("change", onRm); };
  }, []);

  // restart from the first image whenever the time-of-day group changes
  useEffect(() => { setIndex(0); }, [group]);

  const images = IMAGES[group];

  // rotate within the active group (skip when reduced-motion or a single image)
  useEffect(() => {
    if (reduced || images.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 9000);
    return () => window.clearInterval(id);
  }, [group, reduced, images.length]);

  const active = Math.min(index, images.length - 1);

  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      {images.map((img, i) => (
        <picture key={img.base}>
          <source type="image/avif" srcSet={srcset(img, "avif")} sizes="100vw" />
          <source type="image/webp" srcSet={srcset(img, "webp")} sizes="100vw" />
          <img
            src={`/hero/${img.base}-${img.widths[img.widths.length - 1]}.jpg`}
            srcSet={srcset(img, "jpg")}
            sizes="100vw"
            alt={i === active ? img.alt : ""}
            aria-hidden={i === active ? undefined : true}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: img.pos,
              opacity: i === active ? 1 : 0,
              transition: reduced ? "none" : "opacity 1.2s ease-in-out",
            }}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
          />
        </picture>
      ))}
    </div>
  );
}
