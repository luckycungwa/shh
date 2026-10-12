"use client";

import React from "react";

interface QuestionStepProps {
  /** Position in the flow, 1-based. Omit when the tool is a single question. */
  step?: number;
  totalSteps?: number;
  question: React.ReactNode;
  /** Short guidance shown under the question. */
  help?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * One step of a multi-question tool flow. Presentational only: it renders the
 * question and whatever control the tool passes as children.
 */
export default function QuestionStep({ step, totalSteps, question, help, children }: QuestionStepProps) {
  return (
    <div className="space-y-5">
      {typeof step === "number" && typeof totalSteps === "number" && (
        <p className="text-xs font-bold uppercase text-gray-400">
          Step {step} of {totalSteps}
        </p>
      )}

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{question}</h2>

      {help && <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{help}</p>}

      {children}
    </div>
  );
}
