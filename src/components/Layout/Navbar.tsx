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
import { FaHome, FaInfoCircle, FaNewspaper, FaQuestionCircle, FaShieldAlt, FaPhoneAlt, FaFileAlt, FaMapMarkerAlt, FaCalendarAlt, FaUserCheck, FaCheckCircle, FaCoins } from "react-icons/fa";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string, altPaths?: string[]) => {
    if (href === "/") return pathname === "/";
    if (altPaths?.some(p => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?"))) return true;
    return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "?");
  };

  const linkClass = (href: string) =>
    isActive(href)
      ? "text-primary-gold font-bold"
      : "text-foreground";

  type MenuItem = { name: string; href: string; icon: React.ReactNode; altPaths?: string[] };
  const menuItems: MenuItem[] = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Status Check", href: "/status-check", icon: <FaUserCheck />, altPaths: ["/status"] },
    { name: "Payment Dates", href: "/payment-calendar", icon: <FaCalendarAlt /> },
    { name: "Grants", href: "/grants", icon: <FaCoins /> },
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
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      maxWidth="xl"
      className="bg-white/80 dark:bg-primary-dark/80 backdrop-blur-xl backdrop-saturate-150 border-b border-primary-gold/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SASSA Help Hub Logo" width={32} height={32} className="rounded ring-2 ring-primary-gold/20" />
            <p className="font-bold text-inherit hidden sm:block">
              <span className="text-primary-black dark:text-white">SASSA</span>
              <span className="text-primary-gold"> Help Hub</span>
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-1" justify="center">
        <NavbarItem>
          <Link as={NextLink} href="/" aria-current={isActive("/") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/status-check" aria-current={isActive("/status-check", ["/status"]) ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/status-check", ["/status"]) ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            Status Check
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/payment-calendar" aria-current={isActive("/payment-calendar") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/payment-calendar") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            Payment Dates
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/updates" aria-current={isActive("/updates") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/updates") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            News
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/guides" aria-current={isActive("/guides") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/guides") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            Guides
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/grants" aria-current={isActive("/grants") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/grants") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            Grants
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/resources" aria-current={isActive("/resources") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/resources") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            Offices
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link as={NextLink} href="/about" aria-current={isActive("/about") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/about") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={NextLink} color="primary" href="/contact" variant="flat" className="font-semibold bg-primary-gold/10 text-primary-gold hover:bg-primary-gold/20 border border-primary-gold/20">
            Contact
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-white/95 dark:bg-primary-dark/95 backdrop-blur-xl">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              as={NextLink}
              aria-current={isActive(item.href, item.altPaths) ? "page" : undefined}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive(item.href, item.altPaths)
                  ? "bg-primary-gold/10 text-primary-gold font-bold"
                  : "text-foreground hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
              href={item.href}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={`text-lg ${isActive(item.href, item.altPaths) ? "text-primary-gold" : "text-secondary-gray"}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
