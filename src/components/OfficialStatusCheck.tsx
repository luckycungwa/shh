import React from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaExternalLinkAlt, FaShieldAlt } from "react-icons/fa";

const OFFICIAL_STATUS_URL = "https://srd.sassa.gov.za/sc19/status";

const STEPS = [
  {
    title: "Open the official SRD portal",
    body: "The status check is done on the government website srd.sassa.gov.za. Use the button below to open it.",
  },
  {
    title: "Enter your ID and registered cellphone",
    body: "You type your 13-digit ID number and the cellphone number linked to your SASSA application directly on that official page.",
  },
  {
    title: "Read your status and Pay Day",
    body: "You will see whether your R370 grant is approved and, once a batch is assigned, your personal Pay Day date for the month.",
  },
];

export default function OfficialStatusCheck() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Chip
          size="sm"
          color="success"
          variant="flat"
          className="font-bold text-[10px] uppercase"
        >
          Step-by-step
        </Chip>

        <Chip
          size="sm"
          color="primary"
          variant="flat"
          className="font-bold text-[10px] uppercase"
        >
          Official: srd.sassa.gov.za
        </Chip>
      </div>

      <ol className="space-y-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-gold/15 text-primary-gold font-black text-sm flex items-center justify-center">
              {i + 1}
            </span>

            <div>
              <p className="font-bold text-sm">{step.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="space-y-3 pt-1">
        <Button
          as="a"
          href={OFFICIAL_STATUS_URL}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          size="lg"
          className="w-full h-14 font-bold text-base shadow-lg text-black dark:text-white"
          endContent={<FaExternalLinkAlt className="text-sm" />}
        >
          Check Your Status on srd.sassa.gov.za
        </Button>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center leading-relaxed">
          Opens the official SASSA SRD portal in a new tab.
        </p>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 text-left">
        <FaShieldAlt className="text-blue-500 mt-0.5 flex-shrink-0" />

        <div>
          <p className="font-bold text-sm text-blue-800 dark:text-blue-300 mb-1">
            Stay safe while you check
          </p>

          <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
            SASSA will never ask you to pay a fee to see your status, and will
            never ask for your bank PIN, password, or the OTP sent to your
            phone. Treat any page that does as a scam and check your status
            through the official portal instead.
          </p>
        </div>
      </div>
    </div>
  );
}
