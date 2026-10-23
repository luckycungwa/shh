import fs from "fs";
import path from "path";

export interface GrantDateRow {
  date: string;
  day: string;
  status: string;
  /** Final day of a multi-day payment window, when SASSA confirms more than one date. */
  endDate?: string;
}

export interface MonthSchedule {
  month_key: string;
  label: string;
  year: number;
  month: number;
  older_persons: GrantDateRow;
  disability: GrantDateRow;
  children: GrantDateRow;
  under_review: GrantDateRow;
  srd: GrantDateRow;
  note: string;
  governance?: { source: string; sourceURL: string; lastVerified: string; notes: string };
}

export function readForecast(): MonthSchedule[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/payment-schedule-forecast.json"), "utf8"));
}

// SRD R370 dates are only officially announced around the 20th of the target
// month (they change every month). Until the forecast data marks a month's SRD
// as "confirmed", surface a TBA placeholder instead of any guessed date so no
// page — especially the homepage "payment schedule" strip — contradicts the
// displayed month.
export function srdDisplay(row: GrantDateRow, label: string): GrantDateRow {
  if (row.status === "confirmed") return row;
  const monthName = label.split(" ")[0];
  return {
    date: "TBA",
    day: `To be confirmed — SRD R370 is announced later in ${monthName}, after mid-month`,
    status: "projected",
  };
}

export function underReviewDisplay(row: GrantDateRow): GrantDateRow {
  if (row.status === "confirmed") return row;
  return { date: "TBC", day: "Only if your grant is under review — date not yet confirmed", status: "projected" };
}

function localISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function getDisplayedMonth(
  forecast: MonthSchedule[],
  now: Date = new Date(),
): MonthSchedule | undefined {
  const currentKey = `${now.toLocaleDateString("en-ZA", { month: "long" }).toLowerCase()}-${now.getFullYear()}`;
  const currentIndex = forecast.findIndex((m) => m.month_key === currentKey);
  const current = currentIndex >= 0 ? forecast[currentIndex] : undefined;

  if (current) {
    const todayISO = localISODate(now);
    const confirmedDates = [
      current.older_persons,
      current.disability,
      current.children,
      current.srd,
      current.under_review,
    ]
      .filter((row) => row.status === "confirmed" && /^\d{4}-\d{2}-\d{2}$/.test(row.endDate ?? row.date))
      .map((row) => row.endDate ?? row.date)
      .sort();
    const lastConfirmedDate = confirmedDates[confirmedDates.length - 1];

    if (!lastConfirmedDate || lastConfirmedDate >= todayISO) return current;
    if (now.getDate() <= 20) return current;
    return forecast[currentIndex + 1] ?? current;
  }

  return forecast[0];
}

export interface StripRow extends GrantDateRow {
  grant: string;
}

// Homepage strip rows for a displayed month. Permanent grants render their
// actual (confirmed or projected) dates; SRD and under-review grants render
// TBA/TBC until officially confirmed.
export function stripRowsFor(month: MonthSchedule): StripRow[] {
  return [
    { grant: "Older Persons Grant", ...month.older_persons },
    { grant: "Disability Grant", ...month.disability },
    { grant: "Children's Grants", ...month.children },
    { grant: "Grants Under Review", ...underReviewDisplay(month.under_review) },
    { grant: "SRD R370 Grant", ...srdDisplay(month.srd, month.label) },
  ];
}