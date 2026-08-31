// Affiliate architecture — config-driven, placeholder-safe.
//
// RULE (verified by owner 2026-08): no affiliate links, IDs, or commission
// rates may be hardcoded until the owner provides approved publisher
// credentials from a network (Affiliate.co.za / OfferForge). Until then every
// offer slot is read from NEXT_PUBLIC_ env vars. If a var is unset, the
// component renders NOTHING user-facing (never a fake link).

export type AffiliateVertical = "banking" | "mobile" | "education" | "insurance" | "finance";

const VERTICAL_ENV_PREFIX: Record<AffiliateVertical, string> = {
  banking: "NEXT_PUBLIC_AFFILIATE_BANK",
  mobile: "NEXT_PUBLIC_AFFILIATE_MOBILE",
  education: "NEXT_PUBLIC_AFFILIATE_EDUCATION",
  insurance: "NEXT_PUBLIC_AFFILIATE_INSURANCE",
  finance: "NEXT_PUBLIC_AFFILIATE_FINANCE",
};

export interface AffiliateLink {
  url: string;
  id?: string;
  slot: number;
}

// Returns the configured link for a vertical+slot, or null when unset.
// The `slot` lets multiple offers exist per vertical (01, 02, ...).
export function getAffiliateLink(vertical: AffiliateVertical, slot = 1): AffiliateLink | null {
  const prefix = VERTICAL_ENV_PREFIX[vertical];
  const url = process.env[`${prefix}_0${slot}_URL`];
  if (!url) return null;
  return {
    url,
    id: process.env[`${prefix}_0${slot}_ID`] || undefined,
    slot,
  };
}

// GA4 event helper. Safe no-op when gtag is unavailable.
export function trackAffiliate(params: {
  vertical: AffiliateVertical;
  slot?: number;
  page: string;
  placement: string;
  action?: "impression" | "click";
}): void {
  if (typeof window === "undefined" || typeof (window as any).gtag !== "function") return;
  (window as any).gtag("event", params.action === "impression" ? "affiliate_impression" : "affiliate_click", {
    affiliate_vertical: params.vertical,
    affiliate_slot: params.slot ?? 1,
    page_path: params.page,
    placement: params.placement,
  });
}

// Generic CRO/monetization event (CTA click, tool start, etc.)
export function trackMonetizationEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === "undefined" || typeof (window as any).gtag !== "function") return;
  (window as any).gtag("event", name, params);
}

// Honest, editorial-first CTA copy per vertical. Never claims SASSA endorses a
// product. The actual outbound link is only rendered when a verified affiliate
// URL is configured for that vertical.
export function ctaCopyFor(vertical: AffiliateVertical): {
  title: string;
  description: string;
  ctaLabel: string;
} {
  switch (vertical) {
    case "banking":
      return {
        title: "Choosing where to receive your grant",
        description:
          "SASSA does not require you to use a specific commercial bank. If you're looking for a low-fee account for receiving payments, compare your options below.",
        ctaLabel: "Compare bank accounts",
      };
    case "mobile":
      return {
        title: "Keep your SASSA-linked number active",
        description:
          "If your cellphone number is linked to SASSA, keeping your SIM active can help avoid unnecessary problems. Compare affordable prepaid data and mobile options.",
        ctaLabel: "Compare mobile options",
      };
    case "education":
      return {
        title: "Build skills while you wait",
        description:
          "If you're looking to improve your prospects, compare free and low-cost learning options available in South Africa.",
        ctaLabel: "Explore learning options",
      };
    case "insurance":
      return {
        title: "Protecting your household",
        description:
          "If you're researching ways to protect your family from unexpected costs, compare independent funeral cover options below.",
        ctaLabel: "Compare cover options",
      };
    case "finance":
      return {
        title: "Compare financial options carefully",
        description:
          "If you're comparing financial products, use our independent comparison tool to find the right option for your situation.",
        ctaLabel: "Compare options",
      };
  }
}
