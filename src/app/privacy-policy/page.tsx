import React from 'react';
import type { Metadata } from "next";
import PrivacyPolicyContent from './PrivacyPolicyContent';
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Learn how SASSA Help Hub protects your data and handles your privacy while using our informational resource.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
