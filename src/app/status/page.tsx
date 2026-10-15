import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { Chip, Card, CardBody, Divider, Button } from "@nextui-org/react";
import { FaExternalLinkAlt, FaQuestionCircle, FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaSearch, FaClock, FaBan } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString } from "../../lib/config";
import { faqPageSchema, breadcrumbSchema } from "../../lib/schema";

const curYear = getCurrentYearString();

export const metadata: Metadata = buildMetadata({
  title: "SASSA Grant Status Meanings: Complete Guide to Every Status",
  description: "Understand every SASSA SRD grant status: Application Complete, Pending, Bank Details Pending, Identity Verification, Referred, Means Test Failed, Approved, Declined, Appeal Pending, and Paid.",
  path: "/status",
});

interface StatusRecord {
  slug: string;
  status_label: string;
  title: string;
  description: string;
  what_it_means: string;
  how_long: string;
}

function readStatuses(): StatusRecord[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/status-meanings.json"), "utf8"));
  } catch {
    return [];
  }
}

const statusMeta: Record<string, { name: string; desc: string; action: string }> = {
  "application-complete": { name: "Application Complete", desc: "Your application has been received and is in the queue for processing.", action: "Wait for verification. Check back after the 15th." },
  pending: { name: "Pending", desc: "SASSA is verifying your information. Most common status — wait 1–4 weeks.", action: "Check back weekly. Ensure your phone number is active for OTPs." },
  "bank-details-pending": { name: "Bank Details Pending", desc: "Approved but payment blocked — needs valid banking information.", action: "Update bank details on the SRD portal immediately." },
  "identity-verification": { name: "Identity Verification", desc: "SASSA needs to confirm your identity via biometrics or document check.", action: "Check your SMS for a biometric verification link. Complete within 72 hours." },
  referred: { name: "Referred", desc: "Flagged for manual human review. Takes 2–6 weeks.", action: "Contact SASSA if no update after 4 weeks." },
  "means-test-failed": { name: "Means Test Failed", desc: "Income or assets above the threshold. You can appeal.", action: "Lodge an appeal via the ITSAA portal within 90 days." },
  approved: { name: "Approved", desc: "Your application passed all checks. Awaiting a Pay Day date.", action: "Check for a 'Pay Day' date. Funds arrive within 1–3 days of that date." },
  declined: { name: "Declined", desc: "Application not approved for this month. You have 90 days to appeal.", action: "Check the decline reason and appeal on srd-appeals.dsd.gov.za." },
  "appeal-pending": { name: "Appeal Pending", desc: "Your appeal has been received by ITSAA and is under review.", action: "Wait 60–90 days for a decision. Keep your reference number." },
  paid: { name: "Paid", desc: "Payment has been released. Money reflects within 1–3 business days.", action: "Check your bank account or collection point. Save the SMS confirmation." },
  "under-review": { name: "Under Review", desc: "Your application is being re-examined before a final decision.", action: "Wait for the review to complete. Check your status after the 15th." },
  cancelled: { name: "Cancelled", desc: "Your grant was cancelled. You can reapply at any time.", action: "Reapply on the SRD portal or appeal if it was an error." },
  suspended: { name: "Suspended", desc: "Your grant was suspended, often after months of not collecting.", action: "Contact SASSA or reapply to restore your grant." },
  "reapplication-required": { name: "Reapplication Required", desc: "SASSA needs you to submit a fresh application to continue.", action: "Reapply on the SRD portal with your ID number." },
  "alternative-income-detected": { name: "Alternative Income Detected", desc: "SASSA found income from another source above the threshold.", action: "Appeal with proof that the deposits were not income." },
  "uif-registered": { name: "UIF Registered", desc: "You appear on the UIF database, which blocks the SRD grant.", action: "Request UIF deregistration and appeal with proof." },
  "nsfas-registered": { name: "NSFAS Registered", desc: "You appear on the NSFAS student funding database.", action: "Get a clearance letter from your university and appeal." },
  "source-limit-exceeded": { name: "Source Limit Exceeded", desc: "Your deposits across all sources exceeded the allowed limit.", action: "Review deposits and appeal within 90 days." },
  "application-invalid": { name: "Application Invalid", desc: "Your application was missing required or correct information.", action: "Correct your details or submit a new application." },
  "no-status": { name: "Null / No Status", desc: "No status is showing, often due to a data error or new application.", action: "Wait 24–48 hours, then check again or contact SASSA." },
};

const positiveSlugs = ["approved", "paid"];
const dangerSlugs = ["bank-details-pending", "means-test-failed", "declined", "alternative-income-detected", "uif-registered", "nsfas-registered", "source-limit-exceeded", "application-invalid"];

const allStatuses = readStatuses();

const statuses = allStatuses
  .filter((s) => statusMeta[s.slug])
  .map((s) => {
    const meta = statusMeta[s.slug];
    const color = (positiveSlugs.includes(s.slug) ? "success" : dangerSlugs.includes(s.slug) ? "danger" : "warning") as "success" | "danger" | "warning";
    return { slug: s.slug, name: meta.name, desc: meta.desc, color, action: meta.action };
  });

const faqs = [
  { q: "What does 'Pending' mean for my SASSA grant?", a: "Pending means SASSA is still cross-referencing your details with government databases including SARS, UIF, Home Affairs, and commercial banks. This status can persist for 1–4 weeks and is the most common status. It does not mean your application has failed." },
  { q: "Why did my status change from 'Approved' to 'Declined'?", a: "SASSA re-evaluates eligibility every month. If new information appears — such as a bank deposit pushing your income over R624 — your status will be updated. You can appeal a declined status." },
  { q: "What should I do if my status is 'Bank Details Pending'?", a: "Update your banking information immediately on srd.sassa.gov.za. Without valid bank details, SASSA cannot process your payment even if your application is approved." },
  { q: "How long does 'Referred' status take?", a: "Referred means your application has been flagged for manual review by a SASSA official. This can take 2–6 weeks. If it takes longer, call the SASSA helpline at 0800 60 10 11." },
  { q: "What happens after my appeal is approved?", a: "If ITSAA approves your appeal, SASSA will process back payment for all the months you were unfairly declined. You will receive a lump sum in your bank account." },
  { q: "Can I check my SASSA status without internet?", a: "Yes. Dial *120*69277# from any cellphone to check your SRD R370 status for free. You do not need data or airtime." },
];

export default function StatusListingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Status Meanings", slug: "/status" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Status Meanings</span>
      </nav>

      <header className="space-y-6 mb-12">
        <Chip color="warning" variant="flat" className="font-bold uppercase text-xs">Status Guide</Chip>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          SASSA Status Meanings
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Every SASSA SRD grant status explained. Find out what each status means, how long it takes, and what to do next.
        </p>
      </header>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaInfoCircle className="text-primary-gold" /> Quick Guide to Status Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800">
            <p className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2"><FaCheckCircle /> Positive Status</p>
            <p className="text-xs text-green-600 dark:text-green-300 mt-1">Approved or Paid — your grant is on track.</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-800">
            <p className="font-bold text-yellow-700 dark:text-yellow-400 flex items-center gap-2"><FaClock /> In Progress</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">Pending, Referred, or Appeal Pending — SASSA is processing.</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-800">
            <p className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2"><FaExclamationTriangle /> Action Needed</p>
            <p className="text-xs text-red-600 dark:text-red-300 mt-1">Bank Details Pending, Declined, or Means Test Failed — you must act.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statuses.map((s, i) => (
          <NextLink key={i} href={`/status/${s.slug}`} className="block group">
            <Card className="p-6 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group-hover:border-primary-gold/30">
              <CardBody className="p-0 space-y-3">
                <div className="flex items-center justify-between">
                  <Chip color={s.color} variant="flat" size="sm" className="font-bold uppercase text-xs">
                    {s.color === "success" ? "Active" : s.color === "danger" ? "Action Needed" : "In Progress"}
                  </Chip>
                  <FaExternalLinkAlt className="text-gray-300 group-hover:text-primary-gold transition-colors text-xs" />
                </div>
                <h2 className="text-xl font-bold group-hover:text-primary-gold transition-colors">{s.name}</h2>
                <p className="text-sm text-gray-500">{s.desc}</p>
                <p className="text-xs font-bold text-primary-gold pt-2 border-t border-gray-50 dark:border-gray-800">What to do: {s.action}</p>
              </CardBody>
            </Card>
          </NextLink>
        ))}
      </div>

      <Divider className="my-16" />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Status Decision Flow</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">Not sure what your status means for your payment? Here is how to interpret each status:</p>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="p-4 text-left font-black uppercase text-xs">Status</th>
                <th className="p-4 text-left font-black uppercase text-xs">Will I be paid?</th>
                <th className="p-4 text-left font-black uppercase text-xs">Timeframe</th>
                <th className="p-4 text-left font-black uppercase text-xs">Action Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100 dark:border-gray-800"><td className="p-4 font-bold">Approved</td><td className="p-4 text-green-600 font-bold">Yes</td><td className="p-4">Within month</td><td className="p-4">Wait for Pay Day</td></tr>
              <tr className="border-t border-gray-100 dark:border-gray-800"><td className="p-4 font-bold">Paid</td><td className="p-4 text-green-600 font-bold">Yes</td><td className="p-4">1–3 business days</td><td className="p-4">Check your account</td></tr>
              <tr className="border-t border-gray-100 dark:border-gray-800"><td className="p-4 font-bold">Pending</td><td className="p-4 text-yellow-600">Maybe</td><td className="p-4">1–4 weeks</td><td className="p-4">Wait and check back</td></tr>
              <tr className="border-t border-gray-100 dark:border-gray-800"><td className="p-4 font-bold">Declined</td><td className="p-4 text-red-600 font-bold">No</td><td className="p-4">N/A</td><td className="p-4">Appeal within 90 days</td></tr>
              <tr className="border-t border-gray-100 dark:border-gray-800"><td className="p-4 font-bold">Bank Details Pending</td><td className="p-4 text-yellow-600">Blocked</td><td className="p-4">Until updated</td><td className="p-4">Update bank details now</td></tr>
              <tr className="border-t border-gray-100 dark:border-gray-800"><td className="p-4 font-bold">Appeal Pending</td><td className="p-4 text-yellow-600">Under Review</td><td className="p-4">60–90 days</td><td className="p-4">Wait for ITSAA decision</td></tr>
            </tbody>
          </table>
        </div>
      </section>

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
            <h2 className="text-3xl font-black">Check Your Status Now</h2>
            <p className="text-secondary-gray max-w-xl mx-auto">Use the official SASSA SRD portal to check your current grant status.</p>
            <Button as={NextLink} href="/status-check" color="primary" className="font-bold px-10 py-7 text-lg">Check SASSA Status</Button>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
