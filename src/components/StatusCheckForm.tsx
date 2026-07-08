"use client";
import React, { useState } from "react";
import { Button, Chip, Spinner } from "@nextui-org/react";
import { FaExternalLinkAlt, FaCheckCircle, FaPhoneAlt, FaMobileAlt, FaExclamationTriangle } from "react-icons/fa";

function validateId(id: string): string | null {
  if (!/^\d{13}$/.test(id)) return "Must be exactly 13 digits";
  return null;
}

function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return "Enter a valid SA mobile number";
  return null;
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
    if (!idErr && !phErr) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 800);
    }
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
      <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <FaCheckCircle className="text-4xl text-green-600" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-black mb-2">Your Details Are Ready</h3>
          <p className="text-gray-500">Prepare to enter these on the official SASSA portal.</p>
        </div>
        <div className="max-w-sm mx-auto space-y-3">
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <span className="text-sm font-bold text-gray-400 uppercase">ID Number</span>
            <span className="font-mono font-bold text-lg">{idNumber.replace(/(\d{6})(\d{4})(\d{3})/, "$1 $2 $3")}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <span className="text-sm font-bold text-gray-400 uppercase">Phone Number</span>
            <span className="font-bold text-lg">{phone}</span>
          </div>
        </div>
        <div className="space-y-4 pt-4">
          <Button
            as="a"
            href="https://srd.sassa.gov.za"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            size="lg"
            className="font-bold py-8 text-xl shadow-xl hover:scale-105 transition-transform w-full"
          >
            Check Status on Official Portal <FaExternalLinkAlt className="ml-3 text-sm" />
          </Button>
          <p className="text-xs text-gray-400">You will enter your ID and phone number on the official srd.sassa.gov.za site.</p>
          <Button variant="flat" size="sm" onPress={resetForm} className="font-bold">
            Start Over
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
            <FaPhoneAlt className="text-blue-500 text-lg" />
            <div className="text-left">
              <p className="font-bold text-xs">Helpline</p>
              <p className="text-sm font-bold">0800 60 10 11</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800">
            <FaMobileAlt className="text-green-500 text-lg" />
            <div className="text-left">
              <p className="font-bold text-xs">USSD</p>
              <p className="text-sm font-bold">*120*69277#</p>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-800 text-left text-sm">
          <FaExclamationTriangle className="text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-800 dark:text-yellow-300">
            We do not store or send your details anywhere. This form prepares you for the official SASSA portal only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Chip size="sm" color="success" variant="flat" className="font-bold text-[10px] uppercase">No data collected</Chip>
        <Chip size="sm" color="warning" variant="flat" className="font-bold text-[10px] uppercase">Client-side only</Chip>
      </div>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Enter your details below to prepare for the official SASSA status check. Your information stays on your device — we never see or store it.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold mb-1.5">SA ID Number</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={13}
            placeholder="Enter your 13-digit ID number"
            value={idNumber}
            onChange={(e) => { setIdNumber(e.target.value.replace(/\D/g, "").slice(0, 13)); setIdError(null); }}
            className={`w-full px-5 py-4 rounded-2xl border-2 text-lg font-mono font-bold bg-white dark:bg-gray-800 outline-none transition-all ${
              idError ? "border-red-400 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-primary-gold"
            }`}
          />
          {idError && <p className="text-red-500 text-xs font-bold mt-1.5">{idError}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5">Registered Phone Number</label>
          <input
            type="tel"
            maxLength={15}
            placeholder="e.g. 082 123 4567"
            value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setPhoneError(null); }}
            className={`w-full px-5 py-4 rounded-2xl border-2 text-lg font-bold bg-white dark:bg-gray-800 outline-none transition-all ${
              phoneError ? "border-red-400 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-primary-gold"
            }`}
          />
          {phoneError && <p className="text-red-500 text-xs font-bold mt-1.5">{phoneError}</p>}
        </div>
        <Button
          type="submit"
          color="primary"
          size="lg"
          isDisabled={loading}
          className="font-bold py-8 text-xl shadow-xl hover:scale-[1.02] transition-transform w-full"
        >
          {loading ? <Spinner size="sm" color="current" /> : "Prepare My Status Check"}
        </Button>
        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300">
          <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
          <p>We do not store, send, or share your information. Everything stays on your device. This form only prepares you for the official SASSA portal.</p>
        </div>
      </form>
    </div>
  );
}
