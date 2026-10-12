import React from "react";
import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd";
import ToolShell from "../../../components/tools/ui/ToolShell";
import MeansTestCalculator from "../../../components/tools/MeansTestCalculator";
import { buildMetadata } from "../../../lib/seo";
import { breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { getFact } from "../../../lib/canonical-facts";

// Thresholds are read from canonical-facts.json so this page, the calculator
// and the grant guides can never disagree; a missing fact drops the sentence
// rather than surfacing a placeholder.
const factOrNull = (key: string): string | null => {
  const raw = getFact(key);
  return raw.startsWith("{{") || raw.trim() === "" ? null : raw;
};

const SRD_LIMIT = factOrNull("srd_income_limit");
const OLD_SINGLE_INCOME = factOrNull("old_age_income_threshold_single");
const OLD_MARRIED_INCOME = factOrNull("old_age_income_threshold_married");
const OLD_SINGLE_ASSETS = factOrNull("old_age_asset_threshold_single");
const OLD_MARRIED_ASSETS = factOrNull("old_age_asset_threshold_married");

export const metadata: Metadata = buildMetadata({
  title: "SASSA Means Test Calculator (2026)",
  description:
    "Compare your income and assets against the published SASSA means-test thresholds for each grant. Free, independent tool — nothing you enter leaves your browser.",
  path: "/tools/means-test-calculator",
});

const faqs = [
  {
    q: "What does a means test check?",
    a: "A means test compares your income and, for most grants, the total value of your assets against thresholds published by the government. Sitting under the thresholds means you pass that one requirement — you must still meet the age, citizenship, household and documentation rules for the grant, and SASSA makes the final decision.",
  },
  {
    q: "What is the income limit for the SRD R370 grant?",
    a: SRD_LIMIT
      ? `Your total monthly income must be below ${SRD_LIMIT}. SASSA checks this every month through automated bank verification, so deposits from any source — salary, family transfers, stokvel payouts — count toward the limit.`
      : "The SRD grant has a monthly income limit that SASSA checks automatically through bank verification. Confirm the current figure on the official SRD portal before relying on any number.",
  },
  {
    q: "What is the income threshold for the Older Persons Grant?",
    a:
      OLD_SINGLE_INCOME && OLD_MARRIED_INCOME
        ? `The published monthly income threshold is ${OLD_SINGLE_INCOME} if you are single and ${OLD_MARRIED_INCOME} if you are married.${
            OLD_SINGLE_ASSETS && OLD_MARRIED_ASSETS
              ? ` The asset threshold is ${OLD_SINGLE_ASSETS} if you are single and ${OLD_MARRIED_ASSETS} if you are married.`
              : ""
          }`
        : "The Older Persons Grant has published income and asset thresholds that differ for single and married applicants. Use the calculator above to compare your figures against the current verified thresholds.",
  },
  {
    q: "Do all SASSA grants have a means test?",
    a: "Most do, and each grant has its own thresholds. The official means-test leaflet records no income or asset test for the Foster Child Grant and for Grant-in-Aid, which is recorded as N/A — those grants are assessed on their own qualifying rules instead.",
  },
];

export default function MeansTestCalculatorPage() {
  return (
    <ToolShell
      title="Means Test Calculator"
      intro={
        <>
          Compare your income and assets against the thresholds published for each SASSA grant. It
          is free, independent, and nothing you enter leaves your browser.
        </>
      }
      path="/tools/means-test-calculator"
      schema={
        <>
          <JsonLd
            data={breadcrumbSchema([
              { name: "Home", slug: "/" },
              { name: "Tools", slug: "/tools" },
              { name: "Means Test Calculator", slug: "/tools/means-test-calculator" },
            ])}
          />
          <JsonLd data={faqPageSchema(faqs)} />
        </>
      }
      nextSteps={[
        {
          title: "Check full grant eligibility",
          url: "/eligibility-check",
          description: "Age, income, citizenship and the other requirements in one checker.",
        },
        {
          title: "Read the grant guides",
          url: "/grants",
          description: "What each grant pays, who qualifies and what documents to bring.",
        },
      ]}
    >
      <MeansTestCalculator />
    </ToolShell>
  );
}
