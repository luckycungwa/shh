import React from "react";
import NextLink from "next/link";

interface EditorialFooterProps {
  lastUpdated: string;
  author: string;
}

export default function EditorialFooter({ lastUpdated, author }: EditorialFooterProps) {
  return (
    <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Editorial note:</strong> SASSA Help Hub is an independent, unofficial information resource and is not affiliated with the South African Social Security Agency.
        This page was last reviewed on <strong>{lastUpdated}</strong> by <strong><NextLink href="/authors" className="hover:text-primary-gold transition-colors">{author}</NextLink></strong>.
        See our <NextLink href="/editorial-policy" className="text-primary-gold underline">Editorial Policy</NextLink>,{" "}
        <NextLink href="/fact-checking-policy" className="text-primary-gold underline">Fact-Checking Policy</NextLink>, and{" "}
        <NextLink href="/sources-policy" className="text-primary-gold underline">Sources Policy</NextLink>.
        Found an error? <NextLink href="/corrections-policy" className="text-primary-gold underline">Report it</NextLink>.
      </p>
    </div>
  );
}
