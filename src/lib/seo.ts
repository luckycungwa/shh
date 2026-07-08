import { SITE_CONFIG } from "./config";
import type { Metadata } from "next";

export function buildMetadata(
  overrides: {
    title?: string;
    description?: string;
    path: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: "website" | "article";
    noTemplate?: boolean;
  }
): Partial<Metadata> {
  const url = `${SITE_CONFIG.url}${overrides.path}`;
  return {
    ...(overrides.title && {
      title: overrides.noTemplate
        ? overrides.title
        : { default: overrides.title, template: "%s | SASSA Help Hub" },
    }),
    ...(overrides.description && { description: overrides.description }),
    alternates: { canonical: url },
    openGraph: {
      title: overrides.ogTitle || overrides.title || SITE_CONFIG.name,
      description: overrides.ogDescription || overrides.description || SITE_CONFIG.description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "en_ZA",
      type: overrides.ogType || "website",
      images: [{ url: `${SITE_CONFIG.url}/logo.png`, width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title: overrides.ogTitle || overrides.title || SITE_CONFIG.name,
      description: overrides.ogDescription || overrides.description || SITE_CONFIG.description,
      images: [`${SITE_CONFIG.url}/logo.png`],
    },
  };
}
