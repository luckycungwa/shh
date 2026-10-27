"use client";

// Keep context-dependent NextUI components behind a client boundary.
export {
  Accordion,
  AccordionItem,
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";

import NextLink from "next/link";
import { Button, Card, type ButtonProps, type CardProps } from "@nextui-org/react";
import type { ComponentProps } from "react";

type NavigationProps = Pick<ComponentProps<typeof NextLink>, "prefetch" | "replace" | "scroll"> & {
  href: string;
  target?: string;
  rel?: string;
};

// Resolve the component-valued `as` prop on the client, not across the RSC boundary.
export function LinkButton(props: Omit<ButtonProps, "as" | "href"> & NavigationProps) {
  return <Button {...props} as={NextLink} />;
}

export function LinkCard(props: Omit<CardProps, "as" | "href"> & NavigationProps) {
  return <Card {...props} as={NextLink} />;
}
