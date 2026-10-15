import { SITE_CONFIG } from "./config";
import type { Metadata } from "next";

const BRAND_SUFFIX = " | SASSA Help Hub";
const BRAND_NAME = "SASSA Help Hub";

// Search engines generally truncate titles beyond ~60 characters and meta
// descriptions beyond ~160. We only ever shorten strings that exceed these
// caps, and never below a floor where meaning would be lost — if a string
// cannot be safely shortened, the original is preserved unchanged.
const TITLE_LIMIT = 60;
const TITLE_FLOOR = 25;
const DESC_LIMIT = 160;
const DESC_FLOOR = 70;

// Trailing punctuation and connector words that must never end a trimmed
// title/description ("...how to apply for", "SRD grant —", "...(Online &").
const TRAILING_PUNCT = /[\s\-–—|:,;.!?&+/]+$/;
const TRAILING_STOPWORD =
  /\s+(?:and|or|but|nor|the|a|an|of|to|for|with|in|on|at|by|from|as|is|are|was|were|be|been|being|that|which|who|whom|whose|your|you|we|our|it|its|this|these|those|how|why|what|when|where|so|if|then|than|into|over|under|about|after|before|between|during|without|within|vs|versus|amid|per)$/i;

/** Trim trailing punctuation and dangling connector words without touching the interior. */
function tidyEnd(input: string): string {
  let out = input.trim();
  for (let i = 0; i < 10; i += 1) {
    const next = out.replace(TRAILING_STOPWORD, "").replace(TRAILING_PUNCT, "").trim();
    if (next === out) break;
    out = next;
  }
  // Drop an unclosed opening bracket and everything after it.
  const opens = (out.match(/\(/g) || []).length;
  const closes = (out.match(/\)/g) || []).length;
  if (opens > closes) {
    const at = out.lastIndexOf("(");
    if (at > 0) out = out.slice(0, at).replace(TRAILING_PUNCT, "").trim();
  }
  return out;
}

/** Longest prefix of `text` within `budget`, cut on the last whole-word boundary. */
function trimToBudget(text: string, budget: number): string {
  if (text.length <= budget) return text;
  const head = text.slice(0, budget);
  const space = head.lastIndexOf(" ");
  return (space > 0 ? head.slice(0, space) : head.replace(TRAILING_PUNCT, "")).trimEnd();
}

/**
 * Shorten a title that would overflow search-result width while preserving the
 * leading keyword phrase. `withBrand` accounts for the " | SASSA Help Hub"
 * suffix the root layout appends, so the result fits the cap once rendered.
 * Returns the original unchanged when it already fits or cannot be safely
 * shortened.
 */
export function clampTitle(raw: string, withBrand = true): string {
  const base = (raw ?? "").trim();
  if (!base) return base;
  const budget = TITLE_LIMIT - (withBrand ? BRAND_SUFFIX.length : 0);
  if (base.length <= budget) return base;
  const cut = tidyEnd(trimToBudget(base, budget));
  return cut.length >= TITLE_FLOOR ? cut : base;
}

/**
 * Shorten a meta description that would overflow search-result width, ending on
 * a sentence boundary when possible (otherwise a whole word). Returns the
 * original unchanged when it already fits or cannot be safely shortened.
 */
export function clampDescription(raw: string): string {
  const text = (raw ?? "").trim();
  if (text.length <= DESC_LIMIT) return text;
  const head = text.slice(0, DESC_LIMIT);
  let sentenceEnd = -1;
  for (const mark of [". ", "! ", "? "]) {
    const at = head.lastIndexOf(mark);
    if (at > sentenceEnd) sentenceEnd = at + 1;
  }
  if (sentenceEnd >= DESC_FLOOR) return head.slice(0, sentenceEnd).trim();
  const cut = tidyEnd(trimToBudget(text, DESC_LIMIT));
  return cut.length >= DESC_FLOOR ? cut : text;
}

export function buildMetadata(
  overrides: {
    title?: string;
    description?: string;
    path: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: "website" | "article";
    noTemplate?: boolean;
    robots?: { index?: boolean; follow?: boolean };
  }
): Partial<Metadata> {
  const url = `${SITE_CONFIG.url}${overrides.path}`;
  // Titles that already contain the brand name must not also receive the
  // root layout's " | SASSA Help Hub" suffix (which would duplicate it), so
  // they render as an absolute title and are clamped to the full 60 chars.
  const titleHasBrand = !!overrides.title && overrides.title.toLowerCase().includes(BRAND_NAME.toLowerCase());
  const title = overrides.title ? clampTitle(overrides.title, !overrides.noTemplate && !titleHasBrand) : undefined;
  const description = overrides.description ? clampDescription(overrides.description) : undefined;
  const ogTitle = overrides.ogTitle ? clampTitle(overrides.ogTitle, false) : title;
  const ogDescription = overrides.ogDescription ? clampDescription(overrides.ogDescription) : description;
  return {
    ...(title && {
      title: overrides.noTemplate || titleHasBrand
        ? { absolute: title }
        : { default: title, template: "%s | SASSA Help Hub" },
    }),
    ...(description && { description }),
    alternates: { canonical: url },
    robots: overrides.robots ?? { index: true, follow: true },
    openGraph: {
      title: ogTitle || SITE_CONFIG.name,
      description: ogDescription || SITE_CONFIG.description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "en_ZA",
      type: overrides.ogType || "website",
      images: [{ url: `${SITE_CONFIG.url}/logo.png`, width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle || SITE_CONFIG.name,
      description: ogDescription || SITE_CONFIG.description,
      images: [`${SITE_CONFIG.url}/logo.png`],
    },
  };
}
