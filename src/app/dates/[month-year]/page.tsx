import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import { clampTitle, clampDescription } from "../../../lib/seo";
import { Chip, Divider } from "@nextui-org/react";
import { FaCalendarCheck, FaQuestionCircle, FaLink, FaExclamationTriangle } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import EditorialMeta from "../../../components/EditorialMeta";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import NextStepCard from "../../../components/affiliate/NextStepCard";
import EntityLinks from "../../../components/EntityLinks";
import { articleSchema, breadcrumbSchema, faqPageSchema, paymentScheduleSchema } from "../../../lib/schema";
import { SITE_CONFIG } from "../../../lib/config";
import { readForecast, srdDisplay, underReviewDisplay, type MonthSchedule } from "../../../lib/payment-schedule";

function readAll(): MonthSchedule[] {
  return readForecast();
}

function creditInfo(s: MonthSchedule, key: "older_persons" | "disability" | "children" | "under_review" | "srd") {
  const grantNames: Record<string, string> = {
    older_persons: "Older Persons Grant",
    disability: "Disability Grant",
    children: "Children's Grants",
    under_review: "Grants Under Review",
    srd: "SRD R370 Grant",
  };
  const row = key === "srd"
    ? srdDisplay(s.srd, s.label)
    : key === "under_review"
      ? underReviewDisplay(s.under_review)
      : s[key];
  return {
    key,
    grant: grantNames[key],
    ...row,
  };
}

const grantRows = ["older_persons", "disability", "children", "under_review", "srd"] as const;

// A row is only truly "projected" when SASSA has given a working date that is
// not yet confirmed. TBA/TBC rows are not projections — the date has simply not
// been announced yet, so they must not be labelled as if a date were guessed.
function rowStatusLabel(date: string, status: string): string {
  if (status === "confirmed") return "Confirmed";
  if (date === "TBA" || date === "TBC") return "Not yet announced";
  return "Projected";
}

export function generateStaticParams() {
  return readAll().map((s) => ({ "month-year": s.month_key }));
}

function toFriendlyDate(iso: string): string {
  if (!iso || !iso.includes("-")) return iso || "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${months[m - 1]} ${y}`;
}

export function generateMetadata({ params }: { params: { "month-year": string } }): Metadata {
  const s = readAll().find((x) => x.month_key === params["month-year"]);
  if (!s) return { title: "Payment Dates Not Found" };
  const title = clampTitle(`SASSA ${s.label} Grant Schedule — All Grant Payment Dates`);
  const confirmedDays = grantRows
    .filter((row) => s[row].status === "confirmed")
    .map((row) => creditInfo(s, row))
    .map((info) => `${info.grant}: ${toFriendlyDate(info.date)}`)
    .join(", ");
  const description = clampDescription(confirmedDays
    ? `${s.label} SASSA payment dates, confirmed: ${confirmedDays}. Official schedule for the Older Persons, Disability, Children's and SRD R370 grants.`
    : `View the ${s.label} SASSA payment dates for the Older Persons, Disability, Children's and SRD R370 grants. Check when each grant is paid this month.`);
  const url = `https://www.sassahelphub.co.za/dates/${params["month-year"]}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, type: "article", siteName: "SASSA Help Hub", locale: "en_ZA", images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }] },
    twitter: { card: "summary_large_image", title, description, images: ["https://www.sassahelphub.co.za/logo.png"] },
  };
}

export default function PaymentDatesPage({ params }: { params: { "month-year": string } }) {
  const schedule = readAll().find((x) => x.month_key === params["month-year"]);
  if (!schedule) notFound();

  const title = `SASSA ${schedule.label} Grant Schedule — All Grant Payment Dates`;
  const confirmedDays = grantRows
    .filter((row) => schedule[row].status === "confirmed")
    .map((row) => creditInfo(schedule, row))
    .map((info) => `${info.grant}: ${toFriendlyDate(info.date)}`)
    .join(", ");
  const description = confirmedDays
    ? `${schedule.label} SASSA payment dates, confirmed: ${confirmedDays}. Official schedule for the Older Persons, Disability, Children's and SRD R370 grants.`
    : `View the ${schedule.label} SASSA payment dates for the Older Persons, Disability, Children's and SRD R370 grants. Check when each grant is paid this month.`;

  const todayISO = new Date().toISOString().slice(0, 10);
  const datesPassed = [schedule.older_persons.date, schedule.disability.date, schedule.children.date].every(
    (d) => d && d !== "TBC" && d !== "TBA" && d <= todayISO,
  );

  // Only name the grants that are genuinely not yet confirmed, so the banner
  // never implies the already-confirmed dates on the page are uncertain.
  const unconfirmedGrants = grantRows
    .filter((row) => schedule[row].status !== "confirmed")
    .map((row) => creditInfo(schedule, row).grant);
  const confirmedCount = grantRows.length - unconfirmedGrants.length;

  // Adjacent months, in chronological order, for prev/next navigation. Only
  // link to months that actually exist in the forecast data (safe at both ends).
  const monthsByTime = readAll().slice().sort((a, b) => a.year * 12 + a.month - (b.year * 12 + b.month));
  const monthIdx = monthsByTime.findIndex((m) => m.month_key === schedule.month_key);
  const prevMonth = monthIdx > 0 ? monthsByTime[monthIdx - 1] : null;
  const nextMonth = monthIdx >= 0 && monthIdx < monthsByTime.length - 1 ? monthsByTime[monthIdx + 1] : null;

  const faqs = [
    { q: `What is the SRD R370 payment date for ${schedule.label}?`, a: `For ${schedule.label}, the SRD R370 grant is ${schedule.srd.status === "confirmed" ? `paid in batches in the last week of the month on ${schedule.srd.day}` : "expected to be paid in the last week of the month, but SASSA has not yet officially confirmed the exact date"}. Check the official SRD portal (srd.sassa.gov.za) for your own 'Pay Day' date — it is more reliable than any general schedule.` },
    { q: "Why is the SRD payment date different from the permanent grants?", a: "Unlike permanent grants which are paid in the first week of each month, the SRD R370 is paid in batches during the last week of the month. Beneficiaries are not all paid on the same day — your personal 'Pay Day' appears on your status check." },
    { q: "Can my payment date change after it appears?", a: "Yes. Payment dates can shift between batches or if your application needs additional verification. Check your status again after the 15th of the month, and use the official SRD portal as your source of truth." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(title, description, `/dates/${schedule.month_key}`, "Lucky Cungwa", schedule.governance?.lastVerified || "2026-09-24")} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Payment Calendar", slug: "/payment-calendar" },
        { name: schedule.label, slug: `/dates/${schedule.month_key}` },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={paymentScheduleSchema(
          grantRows.map((row) => {
            const info = creditInfo(schedule, row);
            return {
              label: schedule.label,
              grant: info.grant,
              date: info.date,
              status: info.status,
              sourceURL: schedule.governance?.sourceURL,
              pageURL: `${SITE_CONFIG.url}/dates/${schedule.month_key}`,
            };
          })
        )}
      />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <a href="/payment-calendar" className="hover:text-primary-gold">Payment Calendar</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{schedule.label}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">Payment Dates</Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
          <EditorialMeta lastVerified={schedule.governance?.lastVerified || "2026-08-31"} author="Lucky Cungwa" />
          {unconfirmedGrants.length > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 text-sm text-amber-800 dark:text-amber-200">
              <FaLink className="text-amber-500 mt-0.5 shrink-0" />
              <p>
                <strong>{unconfirmedGrants.join(", ")}</strong> {unconfirmedGrants.length === 1 ? "is" : "are"} not yet officially confirmed by SASSA.{" "}
                {confirmedCount > 0 && `The other ${confirmedCount} date${confirmedCount === 1 ? "" : "s"} on this page ${confirmedCount === 1 ? "is" : "are"} confirmed. `}
                Always confirm with the official <a href="https://srd.sassa.gov.za" className="font-bold underline">SRD portal</a> or SASSA helpline before relying on them.
              </p>
            </div>
          )}
          {datesPassed && (
            <div className="flex items-start gap-3 p-4 rounded-2xl border-2 border-rose-200 dark:border-rose-700/50 bg-rose-50 dark:bg-rose-900/10 text-sm text-rose-800 dark:text-rose-200">
              <FaExclamationTriangle className="text-rose-500 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p>
                  <strong>These payment days have already passed.</strong> If your money has not arrived yet, do not panic &mdash; most payments reflect within a few business days. Check what to do next:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Check your status &mdash; does it show <strong>Approved</strong> or <strong>Paid</strong>?</li>
                  <li>Give it a few business days for the payment to reflect in your bank account.</li>
                  <li>Still nothing? Use our <a href="/tools/payment-troubleshooter" className="font-bold underline">payment troubleshooter</a> or phone the SASSA helpline on <strong>0800 60 10 11</strong>.</li>
                </ul>
              </div>
            </div>
          )}
        </header>

        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaCalendarCheck className="text-primary-gold" /> {schedule.label} Payment Schedule
          </h2>
          <div className="space-y-3">
            {grantRows.map((row) => {
              const info = creditInfo(schedule, row);
              return (
                <div key={row} className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="font-bold">{info.grant}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{info.day}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-primary-gold">{info.date}</p>
                    <Chip size="sm" variant="flat" color={info.status === "confirmed" ? "success" : "warning"} className="font-bold uppercase text-[10px]">
                      {rowStatusLabel(info.date, info.status)}
                    </Chip>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">{schedule.note}</p>
          {schedule.governance && (
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>
                <span className="font-bold">Source:</span>{" "}
                {schedule.governance.sourceURL ? (
                  <a href={schedule.governance.sourceURL} target="_blank" rel="noopener noreferrer" className="text-primary-gold font-semibold underline">{schedule.governance.source}</a>
                ) : (
                  schedule.governance.source
                )}
              </p>
              <p><span className="font-bold">Last verified:</span> {schedule.governance.lastVerified}</p>
            </div>
          )}
          {schedule.governance?.notes && (
            <p className="text-xs italic text-amber-700 dark:text-amber-300 mt-2">Note: {schedule.governance.notes}</p>
          )}
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Why Dates Matter & How to Confirm Yours</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>Permanent grants (Older Persons, Disability, Children's) are paid in the first week of the month.</li>
            <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>The SRD R370 grant is paid in batches in the last week of the month — not everyone is paid on the same day.</li>
            <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>Your personal 'Pay Day' date on the SRD portal is the most reliable way to know when you will be paid.</li>
            <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>If your Pay Day has passed and no money has arrived, allow 1 to 3 business days for bank reflection before acting.</li>
          </ul>
        </section>

        {faqs.length > 0 && (
          <>
            <Divider />
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaQuestionCircle className="text-primary-gold" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-3 text-primary-gold">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <AdNetworkLoader />

        <NextStepCard
          pagePath={`/dates/${schedule.month_key}`}
          items={[
            { title: "View the full payment calendar", url: "/payment-calendar" },
            { title: "What 'Approved' means & when you'll be paid", url: "/status/approved" },
            { title: "Payment troubleshooting", url: "/tools/payment-troubleshooter" },
            { title: "Missing grant payment?", url: "/guides/missing-grant-payment-guide" },
            { title: "Choose how to receive your payment", url: "/banking/bank-transfer" },
          ]}
        />

        <EntityLinks
          links={[
            { title: "How to check your SRD status & pay day", url: "/status-check" },
            { title: "What 'Paid' means", url: "/status/paid" },
            { title: "Banking & payment methods", url: "/banking" },
          ]}
          title="When your grant arrives"
          pagePath={`/dates/${schedule.month_key}`}
        />

        {(prevMonth || nextMonth) && (
          <nav aria-label="Payment dates by month" className="flex flex-col sm:flex-row gap-3">
            {prevMonth && (
              <NextLink
                href={`/dates/${prevMonth.month_key}`}
                className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 hover:border-primary-gold transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">&larr; Previous month</span>
                <span className="block font-bold text-gray-900 dark:text-white">{prevMonth.label} Payment Dates</span>
              </NextLink>
            )}
            {nextMonth && (
              <NextLink
                href={`/dates/${nextMonth.month_key}`}
                className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 hover:border-primary-gold transition-colors sm:text-right"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Next month &rarr;</span>
                <span className="block font-bold text-gray-900 dark:text-white">{nextMonth.label} Payment Dates</span>
              </NextLink>
            )}
          </nav>
        )}

        <Divider />
        <EditorialFooter lastUpdated={schedule.governance?.lastVerified || "2026-09-24"} author="Lucky Cungwa" />
      </article>
    </div>
  );
}
