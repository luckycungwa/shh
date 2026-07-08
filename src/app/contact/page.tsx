import React from 'react';
import type { Metadata } from "next";
import ContactContent from './ContactContent';
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with the SASSA Help Hub team for inquiries, feedback, or content suggestions regarding social grants in South Africa.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
