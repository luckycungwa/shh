import type { Metadata } from "next";
import EligibilityContent from "./EligibilityContent";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString } from "../../lib/config";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "SASSA Grant Eligibility Checker \u2014 Do You Qualify?",
  description: `Check if you qualify for SASSA grants in ${getCurrentYearString()} including SRD R370, Old Age Pension, Disability Grant, and Child Support Grant.`,
  path: "/eligibility-check",
});

export default function EligibilityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Eligibility Check", slug: "/eligibility-check" },
      ])} />
      <EligibilityContent />
    </>
  );
}
