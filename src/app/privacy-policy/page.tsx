import React from 'react';
import type { Metadata } from "next";
import PrivacyPolicyContent from './PrivacyPolicyContent';
import { buildMetadata } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy \u2014 How We Protect Your Data",
  description: "How SASSA Help Hub collects, uses, and protects your data when you use our free informational resource about SASSA grants.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Privacy Policy", slug: "/privacy-policy" },
      ])} />
      <PrivacyPolicyContent />
    </>
  );
}
