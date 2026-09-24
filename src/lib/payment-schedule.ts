import fs from "fs";
import path from "path";

export interface GrantDateRow {
  date: string;
  day: string;
  status: string;
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