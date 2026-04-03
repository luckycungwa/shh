"use client";

import React from "react";
import { Divider, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { FaPhoneAlt, FaEnvelope, FaExternalLinkAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <NextLink href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SASSA Help Hub Logo" width={40} height={40} className="rounded" />
            <p className="font-bold text-2xl">SASSA Help Hub</p>
          </NextLink>
          <p className="text-secondary-gray text-sm leading-relaxed">
            Your independent guide to SASSA grants and social security in South Africa. We empower citizens with accurate, simplified information for 2026.
          </p>
          <div className="flex gap-4">
             <Link as={NextLink} href="/about" className="text-primary-gold hover:underline">Read our Mission</Link>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-4 text-secondary-gray text-sm">
            <li><Link as={NextLink} href="/status-check" color="foreground">SASSA Status Check</Link></li>
            <li><Link as={NextLink} href="/payment-calendar" color="foreground">2026 Payment Dates</Link></li>
            <li><Link as={NextLink} href="/guides/srd-grant" color="foreground">SRD Grant Guide</Link></li>
            <li><Link as={NextLink} href="/updates" color="foreground">Latest News</Link></li>
            <li><Link as={NextLink} href="/scam-alert" color="foreground">Scam Alerts</Link></li>
            <li><Link as={NextLink} href="/contact" color="foreground">Contact Us</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Legal</h3>
          <ul className="space-y-4 text-secondary-gray text-sm">
            <li><Link as={NextLink} href="/about" color="foreground">About Us</Link></li>
            <li><Link as={NextLink} href="/privacy-policy" color="foreground">Privacy Policy</Link></li>
            <li><Link as={NextLink} href="/terms-of-service" color="foreground">Terms of Service</Link></li>
            <li><Link as={NextLink} href="/disclaimer" color="foreground">Disclaimer</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Official Contacts</h3>
          <ul className="space-y-4 text-secondary-gray text-sm">
            <li className="flex items-start gap-2">
              <FaPhoneAlt className="mt-1 text-primary-gold" />
              <div>
                <p className="font-bold text-white">SASSA Helpline</p>
                <a href="tel:0800601011" className="hover:text-primary-gold">0800 60 10 11</a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <FaEnvelope className="mt-1 text-primary-gold" />
              <div>
                <p className="font-bold text-white">Email</p>
                <a href="mailto:info@sassa.gov.za" className="hover:text-primary-gold">info@sassa.gov.za</a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <FaExternalLinkAlt className="mt-1 text-primary-gold" />
              <div>
                <p className="font-bold text-white">Official Site</p>
                <a href="https://www.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="hover:text-primary-gold">www.sassa.gov.za</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
        <Divider className="bg-gray-800 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-gray">
          <p>© {currentYear} SASSA Help Hub. Unofficial independent resource, not affiliated with SASSA or the South African government.</p>
          <div className="flex gap-4">
             <p className="flex items-center gap-1"><FaMapMarkerAlt /> Johannesburg, Gauteng, South Africa</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
