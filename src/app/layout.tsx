import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../index.css";
import { Providers } from "./providers";
import NavbarComponent from "../components/Layout/Navbar";
import FooterComponent from "../components/Layout/Footer";
import AlertBanner from "../components/Layout/AlertBanner";
import PageLoadingBar from "../components/Layout/PageLoadingBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SASSA Help Hub - Your Unofficial SASSA Resource",
    template: "%s | SASSA Help Hub",
  },
  description:
    "SASSA Help Hub - Your trusted unofficial guide for SASSA beneficiaries. Get daily updates for 2026, payment dates, SRD R370 news, and scam alerts.",
  keywords: [
    "SASSA news 2026",
    "SASSA payment dates 2026",
    "avoid SASSA scams",
    "SASSA grant application",
    "South African social security",
    "SASSA status check",
  ],
  authors: [{ name: "Lucky Cungwa" }],
  verification: {
    google: "SKlM_MFnb6YY5C-1Ma3k5ETqJBwJSnicqxaqTYzp7HU",
  },
  other: {
    "google-adsense-account": "ca-pub-8180440849942257",
  },
  openGraph: {
    title: "SASSA Help Hub - Your Unofficial SASSA Resource",
    description:
      "SASSA Help Hub - Your trusted unofficial guide for SASSA beneficiaries. Get daily updates for 2026, payment dates, SRD R370 news, and scam alerts.",
    url: "https://www.sassahelphub.co.za",
    siteName: "SASSA Help Hub",
    locale: "en_ZA",
    type: "website",
    images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SASSA Help Hub - Your Unofficial SASSA Resource",
    description:
      "SASSA Help Hub - Your trusted unofficial guide for SASSA beneficiaries. Get daily updates for 2026, payment dates, SRD R370 news, and scam alerts.",
    images: ["https://www.sassahelphub.co.za/logo.png"],
  },
  alternates: {
    canonical: "https://www.sassahelphub.co.za",
    languages: {
      "en-ZA": "https://www.sassahelphub.co.za",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5D10D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              var t = localStorage.getItem("theme");
              if (!t) t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
              document.documentElement.classList.toggle("dark", t === "dark");
            } catch(e) {}
          `,
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SASSA Help Hub",
            url: "https://www.sassahelphub.co.za",
            description: "Your independent guide to SASSA grants, payment dates, and applications in South Africa.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://www.sassahelphub.co.za/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SASSA Help Hub",
            url: "https://www.sassahelphub.co.za",
            description: "Independent guide to SASSA grants, payment dates, and applications in South Africa.",
            founder: {
              "@type": "Person",
              name: "Lucky Cungwa",
            },
          }),
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Lucky Cungwa",
            url: "https://www.sassahelphub.co.za/authors",
            jobTitle: "South African Benefit Specialist",
            description: "Independent SASSA benefits specialist and researcher, providing accurate, accessible information to South African social grant beneficiaries.",
            sameAs: [],
          }),
        }} />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8180440849942257"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-primary-gold focus:text-primary-black focus:font-bold focus:rounded-xl focus:shadow-xl focus:outline-none">
          Skip to main content
        </a>
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <PageLoadingBar />
            <AlertBanner />
            <NavbarComponent />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <FooterComponent />
          </div>
        </Providers>
      </body>
    </html>
  );
}
