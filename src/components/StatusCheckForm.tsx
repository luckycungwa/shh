"use client";

import React, { useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaExternalLinkAlt, FaShieldAlt } from "react-icons/fa";

const OFFICIAL_STATUS_URL = "https://srd.sassa.gov.za";

function validateId(id: string): string | null {
  if (!/^\d{13}$/.test(id)) {
    return "Enter your 13-digit South African ID number";
  }

  return null;
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  // Convert +27XXXXXXXXX to 0XXXXXXXXX
  if (digits.startsWith("27") && digits.length === 11) {
    return `0${digits.slice(2)}`;
  }

  return digits;
}

function validatePhone(phone: string): string | null {
  const normalized = normalizePhone(phone);

  if (!/^0[6-8]\d{8}$/.test(normalized)) {
    return "Enter a valid South African cellphone number";
  }

  return null;
}

export default function StatusCheckForm() {
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");

  const [idError, setIdError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const idErr = validateId(idNumber);
    const phErr = validatePhone(phone);

    setIdError(idErr);
    setPhoneError(phErr);

    if (idErr || phErr) return;

    /*
     * Important:
     * This form does NOT send the user's details to our server. The values
     * remain in React/browser memory only. A valid entry simply hands the
     * user straight to the official SASSA portal to run the real check.
     */
    window.open(OFFICIAL_STATUS_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      {/* Trust indicators */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Chip
          size="sm"
          color="success"
          variant="flat"
          className="font-bold text-[10px] uppercase"
        >
          Stays in your browser
        </Chip>

        <Chip
          size="sm"
          color="primary"
          variant="flat"
          className="font-bold text-[10px] uppercase"
        >
          No server submission
        </Chip>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
        Enter the ID number and cellphone number you use for your SASSA
        application. We use them only to help you prepare for the official
        status check.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 m-0">
        {/* ID Number */}
        <div>
          <label
            htmlFor="sassa-id-number"
            className="block text-sm font-bold mb-1.5"
          >
            South African ID Number
          </label>

          <input
            id="sassa-id-number"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={13}
            placeholder="Enter your 13-digit ID number"
            value={idNumber}
            onChange={(e) => {
              setIdNumber(
                e.target.value.replace(/\D/g, "").slice(0, 13)
              );
              setIdError(null);
            }}
            aria-invalid={!!idError}
            aria-describedby={idError ? "id-error" : undefined}
            className={`w-full px-5 py-4 rounded-2xl border-2 text-lg font-mono font-bold bg-white dark:bg-gray-800 outline-none transition-all ${
              idError
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 dark:border-gray-700 focus:border-primary-gold"
            }`}
          />

          {idError && (
            <p
              id="id-error"
              className="text-red-500 text-xs font-bold mt-1.5"
            >
              {idError}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="sassa-phone-number"
            className="block text-sm font-bold mb-1.5"
          >
            Registered Cellphone Number
          </label>

          <input
            id="sassa-phone-number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={15}
            placeholder="e.g. 082 123 4567"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.slice(0, 15));
              setPhoneError(null);
            }}
            aria-invalid={!!phoneError}
            aria-describedby={phoneError ? "phone-error" : undefined}
            className={`w-full px-5 py-4 rounded-2xl border-2 text-lg font-bold bg-white dark:bg-gray-800 outline-none transition-all ${
              phoneError
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 dark:border-gray-700 focus:border-primary-gold"
            }`}
          />

          {phoneError && (
            <p
              id="phone-error"
              className="text-red-500 text-xs font-bold mt-1.5"
            >
              {phoneError}
            </p>
          )}
        </div>

        {/* Main CTA */}
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="w-full h-14 font-bold text-base shadow-lg text-black dark:text-white"
          endContent={<FaExternalLinkAlt className="text-sm" />}
        >
          Go to Official SASSA Status Check
        </Button>

        {/* Privacy notice */}
        <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-800 text-xs text-green-700 dark:text-green-300">
          <FaShieldAlt className="mt-0.5 flex-shrink-0" />

          <p className="leading-relaxed">
            <strong>Your privacy matters.</strong> This form does not send
            your ID number or cellphone number to our servers. Your details
            remain in your browser while you use this form.
          </p>
        </div>

        {/* Explanation */}
        <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center leading-relaxed">
          This website does not perform the SASSA status lookup itself. You
          will be directed to the official SASSA portal to check your status.
        </p>
      </form>
    </div>
  );
}
