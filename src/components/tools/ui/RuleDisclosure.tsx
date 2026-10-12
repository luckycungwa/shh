import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import type { FactProvenance, GrantId } from "../../../lib/tools/grantRules";
import { grantProvenance, verifiedRange } from "../../../lib/tools/grantRules";

interface RuleDisclosureProps {
  grantId?: GrantId;
  /** Pre-resolved facts. Used when the facts are not tied to a single grant. */
  facts?: FactProvenance[];
  /** Overrides the default "the figures this tool uses" wording. */
  heading?: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Shows where the government figures on a tool came from.
 *
 * Deliberately reports the range of verification dates rather than one date,
 * because the underlying facts were not all checked on the same day. Each figure
 * is listed with its own source and date.
 */
export default function RuleDisclosure({ grantId, facts, heading }: RuleDisclosureProps) {
  const resolved = facts ?? (grantId ? grantProvenance(grantId) : []);
  if (resolved.length === 0) return null;

  const range = verifiedRange(resolved);
  const sources = Array.from(new Set(resolved.map((f) => f.sourceUrl).filter(Boolean)));

  return (
    <details className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 font-bold text-gray-800 dark:text-gray-200 [&::-webkit-details-marker]:hidden">
        <FaInfoCircle className="flex-shrink-0 text-primary-gold" />
        <span>{heading ?? "Where these figures come from"}</span>
      </summary>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
        {range && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {range.earliest === range.latest ? (
              <>
                Checked on <strong className="text-gray-800 dark:text-gray-200">{formatDate(range.latest)}</strong>.
              </>
            ) : (
              <>
                These figures were checked between{" "}
                <strong className="text-gray-800 dark:text-gray-200">{formatDate(range.earliest)}</strong> and{" "}
                <strong className="text-gray-800 dark:text-gray-200">{formatDate(range.latest)}</strong>. They
                are not all confirmed on the same date.
              </>
            )}
          </p>
        )}

        <ul className="space-y-2">
          {resolved.map((f) => (
            <li key={f.key} className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-800 dark:text-gray-200">{f.label}:</span> {f.value}
              <span className="text-gray-400 dark:text-gray-500">
                {" "}
                &middot; effective {formatDate(f.effectiveDate)} &middot; last checked{" "}
                {formatDate(f.verifiedDate)}
              </span>
            </li>
          ))}
        </ul>

        {sources.length > 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Source{sources.length > 1 ? "s" : ""}:{" "}
            {sources.map((url, i) => (
              <React.Fragment key={url}>
                {i > 0 && ", "}
                <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-gold">
                  {hostOf(url)}
                </a>
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
    </details>
  );
}
