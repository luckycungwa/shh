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
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaHome, FaInfoCircle, FaNewspaper, FaQuestionCircle, FaShieldAlt, FaPhoneAlt, FaFileAlt, FaMapMarkerAlt, FaCalendarAlt, FaUserCheck, FaCheckCircle, FaCoins, FaWhatsapp, FaWrench, FaSearch, FaBookOpen, FaArrowRight, FaBalanceScale } from "react-icons/fa";import NextLink from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import { getActiveTools } from "../../lib/tools/registry";

/** Maps the icon names held in the tool registry onto components. */
const TOOL_ICONS: Record<string, React.ElementType> = {
  FaWrench,
  FaSearch,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowRight,
  FaBalanceScale,
  FaShieldAlt,
};

interface ToolMenuItem {
  key: string;
  title: string;
  path: string;
  icon: string;
}

const ALL_TOOLS_KEY = "all-tools";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const tools = getActiveTools();

  // NextUI's DropdownMenu is a collection component, so it takes `items` plus a
  // render function rather than a mapped list of children.
  const toolMenuItems: ToolMenuItem[] = [
    ...tools.map((t) => ({ key: t.slug, title: t.title, path: t.path, icon: t.icon })),
    { key: ALL_TOOLS_KEY, title: "All tools", path: "/tools", icon: "FaArrowRight" },
  ];

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
    { name: "Search", href: "/search", icon: <FaSearch /> },
    { name: "Status Check", href: "/status-check", icon: <FaUserCheck />, altPaths: ["/status"] },
    { name: "Payment Dates", href: "/payment-calendar", icon: <FaCalendarAlt /> },
    { name: "Grants", href: "/grants", icon: <FaCoins /> },
    { name: "SRD Grant Guide", href: "/grants/srd-r370-grant", icon: <FaFileAlt /> },
    { name: "Tools", href: "/tools", icon: <FaWrench /> },
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
      isBordered
      maxWidth="xl"
      className="bg-white/80 dark:bg-primary-dark/80 backdrop-blur-xl backdrop-saturate-150 border-b border-primary-gold/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onPress={() => setIsMenuOpen((open) => !open)}
          className="lg:hidden"
        />
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SASSA Help Hub Logo" width={32} height={32} className="rounded ring-2 ring-primary-gold/20" />
            {/* <p className="font-bold text-inherit hidden sm:block">
              <span className="text-primary-black dark:text-white">SASSA</span>
              <span className="text-primary-gold"> Help Hub</span>
            </p> */}
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-1" justify="center">
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
            Pay Dates
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
          <Dropdown>
            <DropdownTrigger>
              <span
                aria-current={isActive("/tools") ? "page" : undefined}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                  isActive("/tools")
                    ? "bg-primary-gold/10 text-primary-gold font-bold"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                Tools
              </span>
            </DropdownTrigger>
            <DropdownMenu items={toolMenuItems} className="w-64">
              {(item) => {
                const Icon = TOOL_ICONS[item.icon] ?? FaWrench;
                const isAllTools = item.key === ALL_TOOLS_KEY;
                return (
                  <DropdownItem
                    key={item.key}
                    className={isAllTools ? "font-bold" : undefined}
                  >
                    <Link
                      as={NextLink}
                      href={item.path}
                      className="flex items-center justify-between gap-2 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="text-primary-gold" />
                        <span className={isAllTools ? "text-primary-gold" : undefined}>{item.title}</span>
                      </span>
                      {!isAllTools && isActive(item.path) && (
                        <FaArrowRight className="text-xs text-primary-gold" />
                      )}
                    </Link>
                  </DropdownItem>
                );
              }}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/resources" aria-current={isActive("/resources") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/resources") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            Offices
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link as={NextLink} href="/search" aria-current={isActive("/search") ? "page" : undefined} title="Search the site" className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/search") ? "bg-primary-gold/10 text-primary-gold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            <FaSearch />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link as={NextLink} href="/about" aria-current={isActive("/about") ? "page" : undefined} className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive("/about") ? "bg-primary-gold/10 text-primary-gold font-bold" : "text-foreground hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as="a"
            href="https://whatsapp.com/channel/0029Vb8TJrA5a247M5xFJT1r"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            variant="flat"
            isIconOnly
            className="bg-primary-gold/10 text-primary-gold hover:bg-primary-gold/20 border border-primary-gold/20"
            title="Join WhatsApp Channel"
          >
            <FaWhatsapp />
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
