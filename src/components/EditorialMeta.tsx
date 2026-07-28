import React from "react";
import { FaUserEdit, FaCalendarCheck } from "react-icons/fa";
import NextLink from "next/link";

interface EditorialMetaProps {
  lastVerified: string;
  author?: string;
}

export default function EditorialMeta({ lastVerified, author = "Lucky Cungwa" }: EditorialMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 px-5 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-xs text-gray-500">
      <div className="flex items-center gap-2">
        <FaUserEdit className="text-primary-gold" />
        <span>Written by{" "}
          <strong className="text-gray-900 dark:text-white">
            <NextLink href="/authors" className="hover:text-primary-gold transition-colors">{author}</NextLink>
          </strong>
        </span>
      </div>
      <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
      <div className="flex items-center gap-2">
        <FaCalendarCheck className="text-primary-gold" />
        <span>Fact-checked & last verified:{" "}
          <strong className="text-gray-900 dark:text-white">{lastVerified}</strong>
        </span>
      </div>
    </div>
  );
}
