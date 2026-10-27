"use client";
import React from "react";
import { Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { FaPhoneAlt, FaEnvelope, FaExternalLinkAlt, FaMapMarkerAlt, FaHeart, FaWhatsapp } from "react-icons/fa";
import AffiliateDisclosure from "../affiliate/AffiliateDisclosure";

const currentYear = new Date().getFullYear();

export default function FooterComponent() {

  return (
    <footer className="w-full bg-primary-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-gold/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <NextLink href="/" className="flex items-center gap-2 group">
              <Image src="/logo.png" alt="SASSA Help Hub Logo" width={40} height={40} className="rounded ring-2 ring-primary-gold/20 group-hover:ring-primary-gold/40 transition-all" />
              <div>
                <p className="font-bold text-xl">
                  <span className="text-white">SASSA</span>
                  <span className="text-primary-gold"> Help Hub</span>
                </p>
              </div>
            </NextLink>
            <p className="text-secondary-gray text-sm leading-relaxed">
               Your independent guide to SASSA grants and social security in South Africa. We empower citizens with accurate, simplified information for {currentYear}.
            </p>
            <div className="flex gap-3">
              <Link as={NextLink} href="/about" className="text-primary-gold text-sm font-semibold hover:gap-2 transition-all flex items-center gap-1">
                Read our Mission <FaHeart className="text-[10px]" />
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary-gold/80">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "SASSA Status Check", href: "/status-check" },
                { label: `${currentYear} Payment Dates`, href: "/payment-calendar" },
                { label: "How to Apply", href: "/guides/apply-sassa-grants" },
                { label: "All SASSA Grants", href: "/grants" },
                { label: "SRD Grant Guide", href: "/grants/srd-r370-grant" },
                { label: "Status Meanings", href: "/status" },
                { label: "Banking & Payment Methods", href: "/banking" },
                { label: "Appeals & Reconsideration", href: "/appeals" },
                { label: "Latest News", href: "/updates" },
                { label: "Scam Alerts", href: "/scam-alert" },
                { label: "Common Problems", href: "/common-problems" },
                { label: "Glossary", href: "/glossary" },
                { label: "Appeal Deadline Calculator", href: "/tools/appeal-deadline" },
                { label: "Payment Troubleshooter", href: "/tools/payment-troubleshooter" },
                { label: "Status Meaning Explorer", href: "/tools/status-explorer" },
                { label: "Means Test Calculator", href: "/tools/means-test-calculator" },
                { label: "Scam Message Checker", href: "/tools/scam-message-checker" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link as={NextLink} href={link.href} className="text-sm text-secondary-gray hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary-gold/80">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Authors", href: "/authors" },
                { label: "Editorial Policy", href: "/editorial-policy" },
                { label: "Fact-Checking Policy", href: "/fact-checking-policy" },
                { label: "Sources Policy", href: "/sources-policy" },
                { label: "Corrections Policy", href: "/corrections-policy" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Disclaimer", href: "/disclaimer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link as={NextLink} href={link.href} className="text-sm text-secondary-gray hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5 pt-6 border-t-2 border-dashed border-white/10">
            <div className="space-y-1">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary-gold/80">SASSA Official Channels</h3>
              <p className="text-[10px] text-secondary-gray/60 uppercase tracking-wider">Not us — these are SASSA's official contacts</p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-gold/10 flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="text-primary-gold text-xs" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">SASSA Helpline</p>
                  <a href="tel:0800601011" className="text-sm text-secondary-gray hover:text-primary-gold transition-colors">0800 60 10 11</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-gold/10 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-primary-gold text-xs" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Email</p>
                  <a href="mailto:info@sassa.gov.za" className="text-sm text-secondary-gray hover:text-primary-gold transition-colors">info@sassa.gov.za</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-gold/10 flex items-center justify-center shrink-0">
                  <FaExternalLinkAlt className="text-primary-gold text-xs" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Government Site</p>
                  <a href="https://www.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-gray hover:text-primary-gold transition-colors">www.sassa.gov.za</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-gold/10 flex items-center justify-center shrink-0">
                  <FaWhatsapp className="text-primary-gold text-xs" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">WhatsApp Channel</p>
                  <a href="https://whatsapp.com/channel/0029Vb8TJrA5a247M5xFJT1r" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-gray hover:text-primary-gold transition-colors">Join our channel</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="mb-6">
            <AffiliateDisclosure compact />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-gray">
            <p>© {currentYear} SASSA Help Hub. Unofficial independent resource, not affiliated with SASSA or the South African government.</p>
            <p className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-primary-gold/60" /> Johannesburg, Gauteng, South Africa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
