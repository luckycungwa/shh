import React from "react";
import { FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";

// Site-wide affiliate disclosure. Placed in the footer and above any commercial
// recommendation. Kept honest and explicit per the owner's compliance rules.
export default function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-[11px] text-secondary-gray/70 leading-relaxed">
        Some links on this site are affiliate links. We may earn a commission at no
        extra cost to you. This never affects our editorial content or the information
        we publish. SASSA Help Hub is independent and not affiliated with SASSA.
      </p>
    );
  }
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 flex items-start gap-3">
      <FaInfoCircle className="text-primary-gold mt-0.5 shrink-0" />
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        <span className="font-bold text-gray-700 dark:text-gray-300">Affiliate disclosure:</span>{" "}
        This site contains links to products or services from companies we may earn a
        commission from, at no additional cost to you. This does not affect the
        information we provide, the price you pay, or our editorial independence. SASSA
        Help Hub is an independent, unofficial resource and is not affiliated with SASSA
        or the South African government.
      </p>
    </div>
  );
}
