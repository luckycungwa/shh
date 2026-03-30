"use client";

import React, { useState, useEffect } from "react";
import { Alert } from "@nextui-org/react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function AlertBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("alert-banner-dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("alert-banner-dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full">
      <Alert
        color="warning"
        icon={<FaExclamationTriangle />}
        title="Unofficial Resource"
        description="This is an independent help hub. Not affiliated with SASSA or the South African government."
        onClose={handleDismiss}
        variant="faded"
      />
    </div>
  );
}
