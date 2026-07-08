export const SITE_CONFIG = {
  url: "https://www.sassahelphub.co.za",
  name: "SASSA Help Hub",
  description: "Your independent guide to SASSA grants, payment dates, and applications in South Africa.",
  defaultOgImage: "/logo.png",
};

export const GRANT_CONFIG = {
  helpline: "0800 60 10 11",
  ussdCode: "*120*3227#",
  whatsappNumber: "082 046 8553",
};

export const SRD_CONFIG = {
  batchStartDay: 25,
  grantName: "SRD R370",
};

export function getCurrentMonthLabel(): string {
  return new Date().toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
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

export function generateMonthSchedule(): { month: string; dates: string[]; srdStart: string; srdEnd: string }[] {
  const now = new Date();
  const months: { month: string; dates: string[]; srdStart: string; srdEnd: string }[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const label = d.toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
    const year = d.getFullYear();
    const month = d.getMonth();
    const baseDay = new Date(year, month, 1).getDay();
    const secondWorkingDay = baseDay <= 1 ? 2 : baseDay === 6 ? 4 : 2;
    const dates = [
      `${year}-${String(month + 1).padStart(2, "0")}-${String(secondWorkingDay).padStart(2, "0")}`,
      `${year}-${String(month + 1).padStart(2, "0")}-${String(secondWorkingDay + 1).padStart(2, "0")}`,
      `${year}-${String(month + 1).padStart(2, "0")}-${String(secondWorkingDay + 4).padStart(2, "0")}`,
    ];
    const srdWindow = getSRDBatchWindow(month, year);
    const fmt = (dt: Date) => `${year}-${String(month + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
    months.push({ month: label, dates, srdStart: fmt(srdWindow.start), srdEnd: fmt(srdWindow.end) });
  }
  return months;
}

export function getSiteUrl(path: string = ""): string {
  return `${SITE_CONFIG.url}${path}`;
}
