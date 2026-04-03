"use client";

import React from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { FaHome, FaInfoCircle, FaNewspaper, FaQuestionCircle, FaShieldAlt, FaPhoneAlt, FaFileAlt, FaMapMarkerAlt, FaCalendarAlt, FaUserCheck, FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Status Check", href: "/status-check", icon: <FaUserCheck /> },
    { name: "Payment Dates", href: "/payment-calendar", icon: <FaCalendarAlt /> },
    { name: "SRD Grant Guide", href: "/guides/srd-grant", icon: <FaFileAlt /> },
    { name: "News & Updates", href: "/updates", icon: <FaNewspaper /> },
    { name: "Eligibility", href: "/eligibility-check", icon: <FaCheckCircle /> },
    { name: "FAQ", href: "/faq", icon: <FaQuestionCircle /> },
    { name: "Offices", href: "/resources", icon: <FaMapMarkerAlt /> },
    { name: "Scam Alerts", href: "/scam-alert", icon: <FaShieldAlt /> },
    { name: "About", href: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", href: "/contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SASSA Help Hub Logo" width={32} height={32} className="rounded" />
            <p className="font-bold text-inherit hidden sm:block">SASSA Help Hub</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link as={NextLink} href="/status-check" color="primary" className="font-bold">Status Check</Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/payment-calendar" color="foreground">Payment Dates</Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/updates" color="foreground">News</Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/guides" color="foreground">Guides</Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/resources" color="foreground">Offices</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link as={NextLink} href="/about">About</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={NextLink} color="primary" href="/contact" variant="flat">
            Contact
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              as={NextLink}
              className="w-full flex items-center gap-2 py-2"
              color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
              href={item.href}
              size="lg"
            >
              {item.icon}
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
