import type { Metadata } from "next";
import EligibilityContent from "./EligibilityContent";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString } from "../../lib/config";

export const metadata: Metadata = buildMetadata({
  title: "SASSA Grant Eligibility Checker — Do You Qualify?",
  description: `Check if you qualify for SASSA grants in ${getCurrentYearString()} including SRD R370, Old Age Pension, Disability Grant, and Child Support Grant.`,
  path: "/eligibility-check",
});

export default function EligibilityPage() {
  return <EligibilityContent />;
}
