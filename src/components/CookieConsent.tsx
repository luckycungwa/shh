"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FaCookieBite, FaCheck, FaTimes } from "react-icons/fa";

type ConsentChoice = "granted" | "denied";

function applyConsent(consent: ConsentChoice) {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
    };
    if (typeof w.gtag === "function") {
      w.gtag("consent", "update", {
        ad_storage: consent,
        ad_user_data: consent,
        ad_personalization: consent,
        analytics_storage: consent,
        functionality_storage: "granted",
        personalization_storage: consent,
        security_storage: "granted",
      });
    }
  } catch (e) {
    /* noop */
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookie-consent");
      if (stored === "granted" || stored === "denied") {
        applyConsent(stored);
      } else {
        setVisible(true);
      }
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (consent: ConsentChoice) => {
    try {
      localStorage.setItem("cookie-consent", consent);
    } catch (e) {
      /* noop */
    }
    applyConsent(consent);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: consent }));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[150] sm:left-6 sm:right-auto sm:max-w-md">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <FaCookieBite className="text-primary-gold text-2xl flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg">We use cookies</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We use cookies to measure how visitors use our site and to display ads. You can choose to allow or block
              advertising cookies. Read our{" "}
              <a href="/privacy-policy" className="text-primary-gold font-semibold underline">
                Privacy Policy
              </a>{" "}
              to learn more.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            size="md"
            className="flex-1 bg-primary-gold text-primary-black font-bold"
            startContent={<FaCheck />}
            onPress={() => handleChoice("granted")}
          >
            Accept All
          </Button>
          <Button
            size="md"
            variant="bordered"
            className="flex-1 font-bold"
            startContent={<FaTimes />}
            onPress={() => handleChoice("denied")}
          >
            Essential Only
          </Button>
        </div>
      </div>
    </div>
  );
}
