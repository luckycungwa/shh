export const SITE_CONFIG = {
  url: "https://www.sassahelphub.co.za",
  name: "SASSA Help Hub",
  description: "Your independent guide to SASSA grants, payment dates, and applications in South Africa.",
  defaultOgImage: "/logo.png",
};

export const GRANT_CONFIG = {
  helpline: "0800 60 10 11",
  ussdCode: "*120*69277#",
  whatsappNumber: "082 601 0111",
};

// DATE GOVERNANCE: The authoritative, governance-tagged schedule lives in
// public/data/payment-schedule-forecast.json, where each month carries:
//   - per-grant status of "confirmed" (officially announced) vs "projected"
//   - a governance block { source, sourceURL, lastVerified, notes }
// The /dates/[month-year] template reads those fields and always labels
// non-confirmed (projected) dates as such with an amber warning, and renders
// the source + last-verified per month.
//
// Confirmation rhythm (rule of thumb):
//   - Permanent grant dates (Older Persons, Disability, Children's) for the
//     NEXT month are confirmed in advance — typically mid-to-late the month
//     before, per the DSD-approved annual schedule. e.g. SASSA confirmed the
//     October 2026 dates (2/5/6 Oct) on 16 September 2026.
//   - The SRD R370 dates change EVERY month and are only announced AFTER the
//     ~20th of that same month. Until then they must render as TBA — never a
//     guessed date. src/lib/payment-schedule.ts encodes this rule via
//     srdDisplay(), so the homepage strip and the calendar can never
//     contradict the displayed month.
//   - The fourth payment day (grants under review) is confirmed separately,
//     often later in the month; keep it TBC until SASSA announces it.
//
// Do NOT publish an unannounced date as official — update the forecast JSON
// status field to "confirmed" and refresh its source/lastVerified only when an
// official announcement exists (see the September 2026 cycle as reference).
//
// USSD note: *120*69277# is the SRD status-check code (matches guides/ussd-codes). The old
// *120*3227# value was retired — kept in git history only.

export function getCurrentMonthLabel(): string {
  const now = new Date();
  // After the 20th, show next month (SASSA publishes the next cycle in advance)
  if (now.getDate() > 20) {
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return next.toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
  }
  return now.toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getCurrentMonth(): string {
  return new Date().toLocaleDateString("en-ZA", { month: "long" });
}

export function getCurrentYearString(): string {
  return String(getCurrentYear());
}

export function getCurrentMonthYearKey(): string {
  const now = new Date();
  return `${now.toLocaleDateString("en-ZA", { month: "long" })} ${now.getFullYear()}`;
}

// Matches the month_key format used in public/data/payment-schedule-forecast.json.
// Uses the same "after the 20th, show next month" rule as getCurrentMonthLabel()
// so the homepage strip and the displayed heading never contradict.
export function getCurrentMonthKey(): string {
  const now = new Date();
  const target = now.getDate() > 20
    ? new Date(now.getFullYear(), now.getMonth() + 1, 1)
    : new Date(now.getFullYear(), now.getMonth(), 1);
  return `${target.toLocaleDateString("en-ZA", { month: "long" }).toLowerCase()}-${target.getFullYear()}`;
}

export function isMonthPast(month: number, year: number): boolean {
  const now = new Date();
  return year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth());
}

export function getSiteUrl(path: string = ""): string {
  return `${SITE_CONFIG.url}${path}`;
}
