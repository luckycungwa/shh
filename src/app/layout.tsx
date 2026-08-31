import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../index.css";
import { Providers } from "./providers";
import NavbarComponent from "../components/Layout/Navbar";
import FooterComponent from "../components/Layout/Footer";
import AlertBanner from "../components/Layout/AlertBanner";
import PageLoadingBar from "../components/Layout/PageLoadingBar";
import CookieConsent from "../components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "SASSA Help Hub — 2026 Payment Dates, SRD R370 Status Check & Grant Guides",
    template: "%s | SASSA Help Hub",
  },
  description:
    "Independent, unofficial SASSA guides for South Africans: 2026 grant payment dates, SRD R370 status checks, application steps, appeal help, and scam alerts — simplified and free.",
  keywords: [
    "SASSA news 2026",
    "SASSA payment dates 2026",
    "avoid SASSA scams",
    "SASSA grant application",
    "South African social security",
    "SASSA status check",
  ],
  authors: [{ name: "SASSA Help Hub Editorial Team" }],
  verification: {
    google: "SKlM_MFnb6YY5C-1Ma3k5ETqJBwJSnicqxaqTYzp7HU",
  },
  other: {
    "google-adsense-account": "ca-pub-8180440849942257",
  },
  openGraph: {
    title: "SASSA Help Hub - Your Unofficial SASSA Resource",
    description:
      "SASSA Help Hub - Your independent unofficial guide for SASSA beneficiaries. Get 2026 payment dates, SRD R370 news, application help, and scam alerts.",
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
      "SASSA Help Hub - Your independent unofficial guide for SASSA beneficiaries. Get 2026 payment dates, SRD R370 news, application help, and scam alerts.",
    images: ["https://www.sassahelphub.co.za/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://www.sassahelphub.co.za",
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
            description: "Your independent unofficial guide to SASSA grants, payment dates, and applications in South Africa.",
          }),
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SASSA Help Hub",
            url: "https://www.sassahelphub.co.za",
            description: "Independent unofficial guide to SASSA grants, payment dates, and applications in South Africa.",
          }),
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            try {
              var c = localStorage.getItem("cookie-consent");
              if (c === "granted") {
                gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted', personalization_storage: 'granted' });
              }
            } catch(e) {}
          `,
        }} />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8180440849942257"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true, page_path: location.pathname });
                `,
              }}
            />
          </>
        ) : null}
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
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
