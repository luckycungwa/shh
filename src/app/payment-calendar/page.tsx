import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { LinkButton, Chip, Card, CardBody, Divider } from "@/components/ui/nextui";
import { FaCalendarAlt, FaQuestionCircle, FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { breadcrumbSchema, faqPageSchema, paymentScheduleSchema } from "../../lib/schema";
import { SITE_CONFIG } from "../../lib/config";
import { readForecast, srdDisplay, underReviewDisplay, type MonthSchedule } from "../../lib/payment-schedule";

export const revalidate = 900;

export const metadata: Metadata = buildMetadata({
  title: "SASSA Payment Dates November 2026 | Full Grant Calendar",
  description: "Check SASSA November 2026 payment dates for Older Persons, Disability, Children's and SRD R370 grants. See the full 2026/2027 calendar, fourth payment day guidance and what to do if your money is late.",
  path: "/payment-calendar",
  ogImage: {
    url: "/images/sassa-payment-calendar-2026-2027.svg",
    width: 1200,
    height: 630,
    alt: "SASSA Help Hub payment calendar 2026–2027 for Older Persons, Disability, Children's and SRD R370 grants",
  },
});

function readAll(): MonthSchedule[] {
  return readForecast();
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function prettyDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTH_NAMES[month - 1]} ${year}`;
}

const faqs = [
  { q: "When are the SASSA November 2026 payment dates?", a: "SASSA confirmed the November 2026 cycle on 14 October 2026. Older Persons grants are paid on Friday 30 October, Disability grants on Monday 2 November, Children's grants on Tuesday 3 November, and the fourth payment day on Thursday 5 November 2026. The fourth day is for beneficiaries whose grants are under review." },
  { q: "Why were the November 2026 SASSA dates moved earlier?", a: "SASSA brought the November cycle forward ahead of the Local Government Elections so payments would not clash with the election period. National Treasury approved the revised dates, and all eligible beneficiaries are still paid." },
  { q: "Have the SRD R370 dates for November 2026 been announced?", a: "Yes. SASSA has announced SRD R370 processing dates for Monday 23 and Wednesday 25 November 2026. These are batch-processing dates, not a guarantee that every beneficiary will be paid on both days. Check your personal Pay Day on the official SRD portal (srd.sassa.gov.za)." },
  { q: "When are the permanent SASSA grants paid?", a: "Permanent grants — the Older Persons, Disability, War Veterans and Children's grants — are usually paid in the first week of each month, but the exact day depends on the grant type and SASSA can revise a cycle, as it did for November 2026." },
  { q: "Are the dates on this calendar guaranteed?", a: "The Older Persons, Disability and Children's grant dates through March 2027 follow SASSA's published 2026/2027 annual schedule. Additional/exception dates are shown separately. SRD dates are announced monthly, and your personal Pay Day must be checked on the official SRD portal." },
  { q: "Why haven't I been paid even though the date has passed?", a: "Allow 1 to 3 business days for the payment to reflect in your bank account after your Pay Day. If it still hasn't arrived and your status is 'Approved', read our missing grant payment guide or contact the SASSA helpline on 0800 60 10 11." },
];

export default function PaymentCalendarPage() {
  const months = readAll();
  const november = months.find((m) => m.month_key === "november-2026");
  const novSource = november?.governance?.sourceURL;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Payment Calendar", slug: "/payment-calendar" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={paymentScheduleSchema(
          months.flatMap((m) => {
            const rows: MonthSchedule = m;
            const srd = srdDisplay(rows.srd, rows.label);
            const underReview = underReviewDisplay(rows.under_review);
            return (["older_persons", "disability", "children", "under_review", "srd"] as const).map((k) => ({
              label: m.label,
              grant: k === "older_persons" ? "Older Persons Grant" : k === "disability" ? "Disability Grant" : k === "children" ? "Children's Grants" : k === "under_review" ? "Grants Under Review" : "SRD R370 Grant",
              date: k === "srd" ? srd.date : k === "under_review" ? underReview.date : m[k].date,
              status: k === "srd" ? srd.status : k === "under_review" ? underReview.status : m[k].status,
              sourceURL: m.governance?.sourceURL,
              pageURL: `${SITE_CONFIG.url}/dates/${m.month_key}`,
            }));
          })
        )}
      />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Payment Calendar</span>
      </nav>

      <header className="space-y-6 mb-12">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">Payment Calendar</Chip>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          SASSA Payment Calendar 2026: November Dates
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          Check when SASSA pays the Older Persons, Disability, Children's and SRD R370 grants.
          The confirmed November 2026 dates are below, with every other month in one place.
        </p>
        <figure className="mt-8 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white shadow-sm">
          <Image
            src="/images/sassa-payment-calendar-2026-2027.svg"
            alt="SASSA Help Hub 2026–2027 payment calendar guide covering Older Persons, Disability, Children's and SRD R370 grants"
            width={1200}
            height={630}
            priority
            unoptimized
            className="block h-auto w-full"
          />
          <figcaption className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">
            SASSA Help Hub payment calendar — an independent guide. Always confirm your personal payment date through official SASSA channels.
          </figcaption>
        </figure>
      </header>

      {november && (
        <section className="mb-12 bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Chip color="success" variant="flat" size="sm" className="font-bold uppercase text-xs">Confirmed</Chip>
            <span className="text-xs text-gray-500">Last verified: {november.governance?.lastVerified ?? "2026-11-12"}</span>
          </div>
          <h2 className="text-3xl font-black mb-3">November 2026 SASSA payment dates</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-3xl">
            SASSA brought the permanent-grant cycle forward ahead of the Local Government Elections. For SRD R370, SASSA announced processing dates of 23 and 25 November 2026; check your personal Pay Day on the official SRD portal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { grant: "Older Persons Grant", row: november.older_persons },
              { grant: "Disability Grant", row: november.disability },
              { grant: "Children's Grants", row: november.children },
              { grant: "Fourth payment day (grants under review)", row: november.under_review },
            ].map(({ grant, row }) => (
              <div key={grant} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500">{grant}</p>
                <p className="font-bold text-lg">{row.day} {prettyDate(row.date)}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="font-bold">SRD R370 processing:</span> {srdDisplay(november.srd, november.label).day}. These are processing dates, not a guarantee of an individual deposit date. Check your own Pay Day on the{" "}
            <a href="https://srd.sassa.gov.za" className="font-bold text-primary-gold underline">SRD status portal</a>.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <NextLink href="/dates/november-2026" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Full November 2026 schedule</NextLink>
            <NextLink href="/guides/fourth-payment-day-guide" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Fourth payment day explained</NextLink>
            <NextLink href="/status-check" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Check your SASSA status</NextLink>
          </div>
          {novSource && (
            <p className="text-xs text-gray-500 mt-4">
              Source: <a href={novSource} target="_blank" rel="noopener noreferrer" className="underline">SASSA media statement, 14 October 2026</a>
            </p>
          )}
        </section>
      )}

      <section className="mb-12" aria-labelledby="monthly-schedule-heading">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <h2 id="monthly-schedule-heading" className="text-2xl md:text-3xl font-black">Monthly grant payment schedule</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Compare all grant dates in one place. Select a month for payment guidance and status checks.</p>
          </div>
          <span className="text-xs text-gray-500">FY 2026/2027</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {months.map((m) => {
            const rows = [
              { label: "Older Persons", row: m.older_persons },
              { label: "Disability", row: m.disability },
              { label: "Children's Grants", row: m.children },
              { label: "Additional / exception day", row: underReviewDisplay(m.under_review) },
            ];
            const srd = srdDisplay(m.srd, m.label);
            return (
              <NextLink key={m.month_key} href={"/dates/" + m.month_key} className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-gold rounded-2xl">
                <Card className="h-full p-5 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group-hover:border-primary-gold/50">
                  <CardBody className="p-0 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-black group-hover:text-primary-gold transition-colors">{m.label}</h3>
                      <span className="text-xs font-bold text-primary-gold group-hover:underline">Full schedule →</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {rows.map(({ label, row }) => (
                        <div key={label} className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{row.date === "TBC" || row.date === "TBA" ? row.date : prettyDate(row.date)}</p>
                          <p className="text-[11px] text-gray-500">{row.status === "confirmed" ? "SASSA confirmed" : "Awaiting confirmation"}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-primary-gold/10 px-3 py-2 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">SRD R370</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{srd.status === "confirmed" ? srd.day : "Dates announced monthly"}</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-gray-600 dark:text-gray-300">{srd.status === "confirmed" ? "Announced" : "Check later"}</span>
                    </div>
                  </CardBody>
                </Card>
              </NextLink>
            );
          })}
        </div>
      </section>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaCheckCircle className="text-primary-gold" /> How to confirm your personal pay date</h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>Check the official <a href="https://srd.sassa.gov.za" className="font-bold text-primary-gold underline">SRD status portal</a> — it shows your own 'Pay Day' date.</li>
          <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>Dial USSD <span className="font-bold">*120*69277#</span> on any phone to check your status.</li>
          <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>Use the SASSA WhatsApp line on <span className="font-bold">082 601 0111</span> for quick answers.</li>
          <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>If your payment has not arrived 3 business days after your Pay Day, contact SASSA on <span className="font-bold">0800 60 10 11</span>.</li>
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaQuestionCircle className="text-primary-gold" /> What does each SASSA status mean?</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          The date you are paid depends on the status of your application. Understand what each status means and what to do next:
        </p>
        <div className="flex flex-wrap gap-3">
          <NextLink href="/status" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">All status meanings</NextLink>
          <NextLink href="/status/approved" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Approved but no Pay Day</NextLink>
          <NextLink href="/status/pending" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Pending</NextLink>
          <NextLink href="/status/paid" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Paid</NextLink>
          <NextLink href="/status/declined" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Declined</NextLink>
          <NextLink href="/status/bank-details-pending" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Bank details pending</NextLink>
          <NextLink href="/guides/missing-grant-payment-guide" className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">Payment not reflecting</NextLink>
        </div>
      </div>

      <Divider className="my-16" />

      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-black text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-primary-gold flex items-start gap-3">
                <FaQuestionCircle className="mt-1 flex-shrink-0" /> {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-20">
        <Card className="bg-primary-black text-white p-12 rounded-[2rem]">
          <CardBody className="space-y-6">
            <h2 className="text-3xl font-black">Waiting for Your Payment?</h2>
            <p className="text-secondary-gray max-w-xl mx-auto">Check your application status to see if your grant is approved and when you'll be paid.</p>
            <LinkButton href="/status-check" color="primary" className="font-bold px-10 py-7 text-lg">Check SASSA Status</LinkButton>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
