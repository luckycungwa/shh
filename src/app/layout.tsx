import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../index.css";
import { Providers } from "./providers";
import NavbarComponent from "../components/Layout/Navbar";
import FooterComponent from "../components/Layout/Footer";
import AlertBanner from "../components/Layout/AlertBanner";

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
  authors: [{ name: "SASSA Help Hub Team" }],
  verification: {
    google: "SKlM_MFnb6YY5C-1Ma3k5ETqJBwJSnicqxaqTYzp7HU",
  },
  other: {
    "google-adsense-account": "ca-pub-8180440849942257",
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
    <html lang="en-ZA" className="light">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8180440849942257"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <AlertBanner />
            <NavbarComponent />
            <main className="flex-grow">
              {children}
            </main>
            <FooterComponent />
          </div>
        </Providers>
      </body>
    </html>
  );
}
