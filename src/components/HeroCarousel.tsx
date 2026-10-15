"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface HeroSlide {
  src: string;
  alt: string;
  label: string;
  amount: string;
  qualifier: string;
  href: string;
}

// Homepage hero slides, one per major grant type. Image files must live in
// public/images/ (see filenames below). Amounts/qualifiers mirror the grant
// guides and canonical facts — keep them in sync when figures change. Hero
// copy stays static on top so the H1/CTAs (and SEO) are unaffected.
const SLIDES: HeroSlide[] = [
  {
    src: "/images/hero-srd.jpg",
    alt: "South Africans queuing outside an office building",
    label: "SRD Grant",
    amount: "R370/month",
    qualifier: "Ages 18–59 · Income under R624/month",
    href: "/grants/srd-r370-grant",
  },
  {
    src: "/images/hero-child-support.jpg",
    alt: "Group of smiling young children looking up at the camera",
    label: "Child Support Grant",
    amount: "R580/month per child",
    qualifier: "Primary caregivers of children under 18",
    href: "/grants/child-support-grant",
  },
  {
    src: "/images/hero-disability.jpg",
    alt: "Person in a wheelchair viewed from behind in a dim room",
    label: "Disability Grant",
    amount: "R2,400/month",
    qualifier: "Ages 18–59 · Unable to work due to disability",
    href: "/grants/disability-grant",
  },
  {
    src: "/images/hero-older-persons.jpg",
    alt: "Close-up of an elderly person's weathered hands",
    label: "Older Persons Grant",
    amount: "R2,400/month",
    qualifier: "South Africans aged 60 and over",
    href: "/grants/old-age-pension",
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // If a slide image is missing (404), drop it so the hero falls back to the
  // gradient background instead of showing a broken image.
  const visible = SLIDES.filter((s) => !failed[s.src]);
  const safeIndex = visible.length === 0 ? 0 : index % visible.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => {
        const n = visible.length || 1;
        return (i + dir + n) % n;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [failed]
  );

  useEffect(() => {
    if (paused || reducedMotion) return;
    timer.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reducedMotion, go]);

  const active = visible[safeIndex] ?? SLIDES[0];

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Grant types"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {visible.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === safeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i === safeIndex ? undefined : true}
        >
          {/* Plain <img> (not next/image): hero files are small (90–200KB)
              and this avoids depending on the image-optimizer service. */}
          <img
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
            onError={() => setFailed((f) => ({ ...f, [slide.src]: true }))}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Legibility overlay: keeps white hero text readable over photos */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-black/70 via-primary-black/55 to-primary-dark/90" />

      {/* Caption card: current grant type with amount, qualifier and guide link */}
      <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 z-20 flex items-end justify-between gap-3 sm:gap-4">
        <NextLink
          href={active.href}
          key={active.href}
          className="block max-w-[68%] sm:max-w-xs px-4 py-3 sm:px-5 sm:py-4 rounded-2xl bg-primary-black/60 border border-primary-gold/30 backdrop-blur-sm hover:bg-primary-black/80 hover:border-primary-gold/50 transition-colors animate-fade-in"
          aria-label={`Learn about the ${active.label}: ${active.amount}`}
        >
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary-gold">
            <span className="w-2 h-2 rounded-full bg-primary-gold animate-glow-pulse" />
            {active.label}
          </span>
          <span className="block text-xl sm:text-2xl font-black text-white mt-1">{active.amount}</span>
          <span className="hidden sm:block text-xs text-secondary-gray mt-1">{active.qualifier}</span>
          <span className="block text-xs font-bold text-primary-gold mt-2">View the full guide →</span>
        </NextLink>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous grant type"
            className="w-9 h-9 rounded-full bg-primary-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-primary-black/80 transition-colors"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose grant type">
            {visible.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={`Show ${slide.label}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === safeIndex ? "w-6 bg-primary-gold" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next grant type"
            className="w-9 h-9 rounded-full bg-primary-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-primary-black/80 transition-colors"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}
