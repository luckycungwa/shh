"use client";

import React, { useState, useEffect } from "react";
import { Alert } from "@nextui-org/react";
import { FaExclamationTriangle, FaCreditCard } from "react-icons/fa";

export default function AlertBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [bannerType, setBannerType] = useState<"info" | "urgent">("urgent");

  useEffect(() => {
    const isDismissed = localStorage.getItem("alert-banner-dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
    const now = new Date();
    const deadline = new Date(2026, 7, 31);
    setBannerType(now < deadline ? "urgent" : "info");
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("alert-banner-dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full">
      {bannerType === "urgent" ? (
        <Alert
          color="warning"
          icon={<FaCreditCard />}
          title="Postbank Black Card Migration: Switch Before 31 August 2026"
          description="Your SASSA Gold Card will STOP WORKING after 31 August 2026. Visit a Postbank service point at Shoprite, Checkers, Pick n Pay, Boxer, or Spar to get your free Black Card replacement. Bring your ID. Your money stays safe in your Postbank account."
          onClose={handleDismiss}
          variant="faded"
        />
      ) : (
        <Alert
          color="warning"
          icon={<FaExclamationTriangle />}
          title="Independent Resource"
          description="This is an independent help hub. Not affiliated with SASSA or the South African government."
          onClose={handleDismiss}
          variant="faded"
        />
      )}
    </div>
  );
}
