import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { buildMetadata } from "../../lib/seo";
import PaymentCalendarClient from "./PaymentCalendarClient";

const curYear = new Date().getFullYear().toString();

export const metadata: Metadata = buildMetadata({
  title: `SASSA Payment Dates ${curYear} — Independent Grant Payment Schedule`,
  description: `View the SASSA grant payment schedule for ${curYear} including SRD R370, Old Age Pension, Disability Grant, and Child Support Grant payment dates. Independent guide.`,
  path: "/payment-calendar",
});

interface ScheduleMonth {
  month_key: string;
  label: string;
  older_persons: string;
  disability: string;
  children: string;
  srd_start: string;
  srd_end: string;
  note: string;
}

export default function PaymentCalendarPage() {
  const paymentDatesPath = path.join(process.cwd(), "public/data/paymentDates.json");
  const paymentDates: { grant: string; date: string; day: string }[] = JSON.parse(fs.readFileSync(paymentDatesPath, "utf8"));

  const historyPath = path.join(process.cwd(), "public/data/payment-schedule-history.json");
  let historyData: ScheduleMonth[] = [];
  try {
    historyData = JSON.parse(fs.readFileSync(historyPath, "utf8"));
  } catch {}

  return <PaymentCalendarClient paymentDates={paymentDates} historyData={historyData} />;
}
