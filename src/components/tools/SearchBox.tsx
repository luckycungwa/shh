"use client";

import React from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";
import { Input, Chip } from "@nextui-org/react";
import type { SearchRecord } from "../../lib/search";
import { searchIndex } from "../../lib/search";

interface SearchBoxProps {
  index: SearchRecord[];
}

export default function SearchBox({ index }: SearchBoxProps) {
  const [query, setQuery] = React.useState("");
  const results = React.useMemo(() => searchIndex(query, index), [query, index]);

  return (
    <div className="space-y-6">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="lg"
        radius="full"
        placeholder="Try 'appeal', 'bank details', 'payment date', 'SRD', 'WhatsApp'…"
        startContent={<FaSearch className="text-primary-gold" />}
        aria-label="Search SASSA Help Hub"
        className="max-w-2xl"
      />

      {query.trim().length > 1 ? (
        <div className="space-y-3">
          {results.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No results for &ldquo;{query}&rdquo;. Try a different word.
            </p>
          ) : (
            results.map((r, i) => (
              <NextLink
                key={`${r.url}-${i}`}
                href={r.url}
                className="group flex items-start justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-gold/40 transition-colors"
              >
                <span>
                  <span className="block">
                    <Chip size="sm" variant="flat" color="primary" className="font-bold uppercase text-[10px] mr-2">
                      {r.category}
                    </Chip>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{r.title}</span>
                  </span>
                  {r.description && (
                    <span className="block text-xs text-gray-500 mt-1 line-clamp-2">{r.description}</span>
                  )}
                </span>
                <FaArrowRight className="text-primary-gold text-sm mt-1 group-hover:translate-x-1 transition-transform shrink-0" />
              </NextLink>
            ))
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Type at least 2 characters to search across {index.length} articles, guides, statuses and FAQs.
        </p>
      )}
    </div>
  );
}
