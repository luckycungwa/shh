import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getAffiliateLink, type AffiliateVertical } from "../../lib/affiliate";

export interface ComparisonRow {
  label: string;
  values: string[];
  // Optional affiliate slot for this specific row (e.g. "Open account").
  affiliateVertical?: AffiliateVertical;
  affiliateSlot?: number;
  affiliateLabel?: string;
}

interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
  pagePath: string;
}

// Reusable, affiliate-aware comparison table. Any row with an affiliateVertical
// renders an outbound CTA ONLY when that vertical's NEXT_PUBLIC_ link is set;
// otherwise the cell is omitted so no fake link is ever shown.
export default function ComparisonTable({ columns, rows, pagePath }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-8 rounded-2xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            {columns.map((col, i) => (
              <th key={i} className="p-4 font-black uppercase text-xs text-gray-500">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-gray-100 dark:border-gray-800">
              <td className="p-4 font-bold text-sm text-gray-900 dark:text-white">{row.label}</td>
              {row.values.map((v, vi) => (
                <td key={vi} className="p-4 text-sm text-gray-600 dark:text-gray-400">{v}</td>
              ))}
              {row.affiliateVertical && (
                <td className="p-4">
                  <AffiliateCell
                    vertical={row.affiliateVertical}
                    slot={row.affiliateSlot ?? 1}
                    label={row.affiliateLabel ?? "Visit"}
                    pagePath={pagePath}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AffiliateCell({
  vertical,
  slot,
  label,
  pagePath,
}: {
  vertical: AffiliateVertical;
  slot: number;
  label: string;
  pagePath: string;
}) {
  const link = getAffiliateLink(vertical, slot);
  if (!link) return <span className="text-xs text-gray-400">—</span>;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex items-center gap-1 text-sm font-bold text-primary-gold hover:underline"
    >
      {label} <FaExternalLinkAlt className="text-[10px]" />
    </a>
  );
}
