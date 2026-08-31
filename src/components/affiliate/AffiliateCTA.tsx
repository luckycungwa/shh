"use client";

import React, { useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getAffiliateLink, trackAffiliate, type AffiliateVertical } from "../../lib/affiliate";

interface AffiliateCTAProps {
  vertical: AffiliateVertical;
  slot?: number;
  title: string;
  description: string;
  ctaLabel: string;
  // Distinguishes the placement for analytics (e.g. "comparison_table", "in_content").
  placement?: string;
  pagePath: string;
}

// Renders a commercial CTA ONLY when a verified affiliate link is configured via
// NEXT_PUBLIC_AFFILIATE_* env vars. When no link is set (pre-approval), it shows
// a neutral, link-free editorial note so the page stays complete and honest.
export default function AffiliateCTA({
  vertical,
  slot = 1,
  title,
  description,
  ctaLabel,
  placement = "in_content",
  pagePath,
}: AffiliateCTAProps) {
  const link = getAffiliateLink(vertical, slot);

  useEffect(() => {
    if (link) {
      trackAffiliate({ vertical, slot, page: pagePath, placement, action: "impression" });
    }
  }, [link, vertical, slot, pagePath, placement]);

  if (!link) {
    // Pre-approval placeholder: editorial, no outbound link, no fake URL.
    return (
      <div className="my-10 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/40 p-6">
        <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    );
  }

  const onClick = () => {
    trackAffiliate({ vertical, slot, page: pagePath, placement, action: "click" });
  };

  return (
    <div className="my-10 rounded-3xl border border-primary-gold/30 bg-primary-gold/5 p-6 space-y-4">
      <p className="text-base font-bold text-gray-900 dark:text-white">{title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={onClick}
        className="inline-flex items-center gap-2 bg-primary-black text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors"
      >
        {ctaLabel} <FaExternalLinkAlt className="text-xs" />
      </a>
    </div>
  );
}
