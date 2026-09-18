"use client";

import React, { useState } from "react";
import { FaBookOpen, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";

interface StatusInfo {
  slug: string;
  label: string;
  meaning: string;
  action: string;
}

const STATUSES: StatusInfo[] = [
  {
    slug: "approved",
    label: "Approved",
    meaning: "You qualified for this month's payment.",
    action: "Check your Pay Day date on the portal. Payment usually lands in the last week of the month.",
  },
  {
    slug: "pending",
    label: "Pending",
    meaning: "SASSA is still verifying your details for the current month.",
    action: "No action needed unless it has been pending for more than 30 days — then contact SASSA on 0800 60 10 11.",
  },
  {
    slug: "declined",
    label: "Declined",
    meaning: "Your application did not pass the check for this month (often the income threshold).",
    action: "You can appeal within 90 days of the decline on the official ITSAA appeals portal (srd-appeals.dsd.gov.za) if you disagree — act within the first 30 days if you can.",
  },
  {
    slug: "bank-details-pending",
    label: "Bank Details Pending",
    meaning: "SASSA cannot pay you because your banking details are unverified or rejected.",
    action: "Update your banking details on srd.sassa.gov.za and wait for verification before the next payment run.",
  },
  {
    slug: "referred",
    label: "Referred",
    meaning: "Your application was sent for manual review.",
    action: "Wait for the review to complete. Keep your registered phone number active for SMS updates.",
  },
  {
    slug: "identity-verification",
    label: "Identity Verification Required",
    meaning: "SASSA must confirm your ID against Home Affairs records.",
    action: "Complete the verification via the SRD portal or visit a SASSA office with your ID.",
  },
  {
    slug: "appeal-pending",
    label: "Appeal Pending",
    meaning: "Your appeal against a decline is being considered.",
    action: "Wait for the outcome. You can track it on the official appeals portal.",
  },
  {
    slug: "paid",
    label: "Paid",
    meaning: "SASSA has released your payment.",
    action: "Allow 1 to 3 business days for your bank or Postbank to reflect the money.",
  },
  {
    slug: "means-test-failed",
    label: "Means Test Failed",
    meaning: "SASSA found income above the threshold linked to your ID.",
    action: "If the money was not yours (e.g. a family gift), appeal and explain with proof.",
  },
  {
    slug: "application-complete",
    label: "Application Complete",
    meaning: "Your application was received successfully.",
    action: "Wait for it to move to Pending, Approved, or another status as verification begins.",
  },
];

export default function StatusMeaningExplorer() {
  const [slug, setSlug] = useState("");
  const selected = STATUSES.find((s) => s.slug === slug) || null;

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary-gold/10 p-2 rounded-xl">
          <FaBookOpen className="text-primary-gold text-xl" />
        </div>
        <h2 className="text-xl font-black text-gray-900 dark:text-white">What Does My Status Mean?</h2>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        Select the status you see on the SRD portal to get a plain-English explanation and what to do next.
      </p>

      <select
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-gold"
      >
        <option value="">Choose a status…</option>
        {STATUSES.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.label}
          </option>
        ))}
      </select>

      {selected && (
        <div className="p-4 rounded-2xl border border-primary-gold/30 bg-primary-gold/5 space-y-3">
          <p className="font-black text-lg text-gray-900 dark:text-white">{selected.label}</p>
          <div>
            <p className="text-xs font-bold uppercase text-gray-400 mb-1">What it means</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{selected.meaning}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-gray-400 mb-1">What to do</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{selected.action}</p>
          </div>
          <NextLink
            href={`/status/${selected.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-gold hover:underline"
          >
            Full guide for this status <FaArrowRight className="text-xs" />
          </NextLink>
        </div>
      )}

      {selected && (
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <FaCheckCircle /> This tool explains common statuses only. Always confirm your live status on the
          official SRD portal.
        </p>
      )}
    </div>
  );
}
