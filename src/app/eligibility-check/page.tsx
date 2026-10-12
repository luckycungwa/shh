import type { Metadata } from "next";
import EligibilityContent from "./EligibilityContent";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString } from "../../lib/config";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "../../lib/schema";
import { eligibilityFaqs } from "./faq";

export const metadata: Metadata = buildMetadata({
  title: "SASSA Grant Eligibility Checker \u2014 Do You Qualify?",
  description: `Quick SRD R370 eligibility check for ${getCurrentYearString()}, plus guidance on which other SASSA grants (Old Age Pension, Disability Grant, Child Support Grant) may apply to your age group.`,
  path: "/eligibility-check",
});

export default function EligibilityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Eligibility Check", slug: "/eligibility-check" },
      ])} />
      <JsonLd data={faqPageSchema(eligibilityFaqs)} />
      <EligibilityContent />
    </>
  );
}
