"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "../lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
