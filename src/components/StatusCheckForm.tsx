"use client";

import React, { useState } from "react";
import { Button, Chip, Spinner } from "@nextui-org/react";
import {
  FaExternalLinkAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";

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

function maskId(id: string): string {
  if (id.length < 4) return "•••••••••••••";

  return `•••••••••${id.slice(-4)}`;
}

function maskPhone(phone: string): string {
  const normalized = normalizePhone(phone);

  if (normalized.length < 4) return "••••••••••";

  return `••••••${normalized.slice(-4)}`;
}

export default function StatusCheckForm() {
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");

  const [idError, setIdError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const idErr = validateId(idNumber);
    const phErr = validatePhone(phone);

    setIdError(idErr);
    setPhoneError(phErr);

    if (idErr || phErr) return;

    /*
     * Important:
     * This form does NOT send the user's details to our server.
     * The values remain in React/browser memory only.
     */
    setLoading(true);

    // No fake API request or artificial delay.
    setSubmitted(true);
    setLoading(false);
  };

  const resetForm = () => {
    setIdNumber("");
    setPhone("");
    setIdError(null);
    setPhoneError(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <FaCheckCircle className="text-3xl text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h3 className="text-2xl font-black mb-2">
            Ready to Check Your Status
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Your details have only been used on this page. Continue to the
            official SASSA website to perform your actual status check.
          </p>
        </div>

        {/* Masked details */}
        <div className="max-w-sm mx-auto space-y-3">
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <span className="text-xs font-bold text-gray-400 uppercase">
              ID Number
            </span>

            <span className="font-mono font-bold text-base tracking-wide">
              {maskId(idNumber)}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Cellphone
            </span>

            <span className="font-mono font-bold text-base tracking-wide">
              {maskPhone(phone)}
            </span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="space-y-3 pt-2">
          <Button
            as="a"
            href="https://srd.sassa.gov.za"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            size="lg"
            className="w-full h-14 font-bold text-base shadow-lg"
            endContent={<FaExternalLinkAlt className="text-sm" />}
          >
            Continue to SASSA Status Check
          </Button>

          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
            The official SASSA website will open in a new tab. You will enter
            your details directly on the official portal.
          </p>

          <Button
            variant="light"
            size="sm"
            onPress={resetForm}
            className="font-bold"
          >
            Start Over
          </Button>
        </div>

        {/* Alternative contact methods */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
            <FaPhoneAlt className="text-blue-500 text-base flex-shrink-0" />

            <div className="text-left">
              <p className="font-bold text-[11px]">SASSA Helpline</p>
              <p className="text-xs font-bold">0800 60 10 11</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800">
            <FaMobileAlt className="text-green-500 text-base flex-shrink-0" />

            <div className="text-left">
              <p className="font-bold text-[11px]">USSD</p>
              <p className="text-xs font-bold">*120*69277#</p>
            </div>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800 text-left">
          <FaShieldAlt className="text-green-600 mt-0.5 flex-shrink-0" />

          <div>
            <p className="font-bold text-sm text-green-800 dark:text-green-300 mb-1">
              Your information stays on this page
            </p>

            <p className="text-xs text-green-700 dark:text-green-400 leading-relaxed">
              This form does not send your ID number or cellphone number to our
              servers. Your information is only held in your browser while
              using this form.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          isDisabled={loading}
          className="w-full h-14 font-bold text-base shadow-lg"
          endContent={
            !loading ? <FaCheckCircle className="text-sm" /> : undefined
          }
        >
          {loading ? (
            <Spinner size="sm" color="current" />
          ) : (
            "Continue to Status Check"
          )}
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
