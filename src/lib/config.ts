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

export const SRD_CONFIG = {
  batchStartDay: 25,
  grantName: "SRD R370",
};

// DATE GOVERNANCE: The authoritative, governance-tagged schedule lives in
// public/data/payment-schedule-forecast.json, where each month carries:
//   - per-grant status of "confirmed" (officially announced) vs "projected"
//   - a governance block { source, sourceURL, lastVerified, notes }
// The /dates/[month-year] template reads those fields and always labels
// non-confirmed (projected) dates as such with an amber warning, and renders
// the source + last-verified per month.
//
// As of the September 2026 cycle: permanent grant dates (Older Persons,
// Disability, Children's) are confirmed by SASSA, but the SRD R370 date and the
// fourth payment day (grants under review) were still TBC. Do NOT publish a
// specific SRD/fourth-payment date as official until SASSA announces it —
// update the forecast JSON status field to "confirmed" and its source/lastVerified
// only when an official announcement exists.
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

export function getSRDBatchWindow(month: number, year: number): { start: Date; end: Date } {
  const start = new Date(year, month, SRD_CONFIG.batchStartDay);
  const end = new Date(year, month + 1, 0);
  return { start, end };
}

export function isMonthPast(month: number, year: number): boolean {
  const now = new Date();
  return year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth());
}

const CONFIRMED_SCHEDULE: Record<string, { older_persons: string; disability: string; children: string }> = {
  "2026-08": { older_persons: "2026-08-04", disability: "2026-08-05", children: "2026-08-06" },
  "2026-09": { older_persons: "2026-09-02", disability: "2026-09-03", children: "2026-09-04" },
  "2026-10": { older_persons: "2026-10-02", disability: "2026-10-05", children: "2026-10-06" },
  "2026-11": { older_persons: "2026-11-03", disability: "2026-11-04", children: "2026-11-05" },
  "2026-12": { older_persons: "2026-12-02", disability: "2026-12-03", children: "2026-12-04" },
};

export function generateMonthSchedule(): { month: string; dates: string[]; srdStart: string; srdEnd: string; confirmed: boolean }[] {
  const now = new Date();
  const months: { month: string; dates: string[]; srdStart: string; srdEnd: string; confirmed: boolean }[] = [];
  // Generate from current month through December 2026
  const endMonthIndex = 11;
  const endYear = 2026;
  const totalMonths = (endYear - now.getFullYear()) * 12 + (endMonthIndex - now.getMonth()) + 1;
  const count = Math.max(0, Math.min(totalMonths, 12));

  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
    const confirmed = !!CONFIRMED_SCHEDULE[monthKey];

    let dates: string[];
    if (confirmed) {
      const c = CONFIRMED_SCHEDULE[monthKey];
      dates = [c.older_persons, c.disability, c.children];
    } else {
      const baseDay = new Date(year, month, 1).getDay();
      const secondWorkingDay = baseDay <= 1 ? 2 : baseDay === 6 ? 4 : 2;
      dates = [
        `${year}-${String(month + 1).padStart(2, "0")}-${String(secondWorkingDay).padStart(2, "0")}`,
        `${year}-${String(month + 1).padStart(2, "0")}-${String(secondWorkingDay + 1).padStart(2, "0")}`,
        `${year}-${String(month + 1).padStart(2, "0")}-${String(secondWorkingDay + 4).padStart(2, "0")}`,
      ];
    }
    const srdWindow = getSRDBatchWindow(month, year);
    const fmt = (dt: Date) => `${year}-${String(month + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
    months.push({ month: label, dates, srdStart: fmt(srdWindow.start), srdEnd: fmt(srdWindow.end), confirmed });
  }
  return months;
}

export function getSiteUrl(path: string = ""): string {
  return `${SITE_CONFIG.url}${path}`;
}
