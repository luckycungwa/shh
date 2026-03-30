"use client";

import Head from "next/head";
import React from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
}) => {
  const siteUrl = "https://www.sassahelphub.co.za";

  return (
    <>
      <title>{`${title} | SASSA Help Hub`}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={`${siteUrl}${canonical || ""}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage || `${siteUrl}/logo.png`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage || `${siteUrl}/logo.png`} />
    </>
  );
};

export default SEOHead;
