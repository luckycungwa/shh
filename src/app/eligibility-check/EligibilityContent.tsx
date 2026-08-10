"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Input, Progress, Divider, Chip } from "@nextui-org/react";
import { FaCheckCircle, FaTimesCircle, FaArrowRight, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import NextLink from "next/link";
import { getFact } from "../../lib/canonical-facts";

const SRD_LIMIT = parseInt(getFact("srd_income_limit").replace(/[^\d]/g, ""), 10);
const SRD_MIN_AGE = parseInt(getFact("srd_age_range_min"), 10);
const SRD_MAX_AGE = parseInt(getFact("srd_age_range_max"), 10);

export default function EligibilityContent() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    citizenship: "",
    age: "",
    income: "",
    otherGrants: ""
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps + 1));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const isEligible =
    answers.citizenship === "yes" &&
    parseInt(answers.income) < SRD_LIMIT &&
    answers.otherGrants === "no";

  const age = parseInt(answers.age);
  const ageGroup =
    isNaN(age) ? null
    : age >= 60 ? { label: "Older Persons (Old Age) Grant", href: "/grants/old-age-pension" }
    : age >= 18 ? { label: "SRD R370 or a permanent grant", href: "/grants" }
    : { label: "Child Support Grant (if you are a primary caregiver)", href: "/grants/child-support-grant" };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-12 space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Grant Eligibility Checker</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
           Answer four quick questions to check if you meet the SRD R370 criteria for {new Date().getFullYear()}, then find out which other SASSA grants may apply to your age group.
        </p>
      </header>

      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800">
          <h2 className="font-bold text-lg mb-2">SRD R370 income rule</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            Your total monthly income must be below R{SRD_LIMIT}. SASSA checks this automatically every month through bank verification, so deposits from any source count toward the limit.
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800">
          <h2 className="font-bold text-lg mb-2">Age range</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            The SRD R370 grant is for South Africans aged {SRD_MIN_AGE} to {SRD_MAX_AGE}. If you are older, the Old Age Pension (from age 60) may be the right grant for you instead.
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800">
          <h2 className="font-bold text-lg mb-2">No other support</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            You cannot receive the SRD while collecting UIF, NSFAS, or another SASSA grant. Each month SASSA cross-checks its records and automatically flags applicants on other programmes.
          </p>
        </div>
      </section>

      <Card className="p-8 shadow-2xl border border-gray-100 dark:border-gray-800">
         <CardHeader className="flex-col items-start gap-4">
            <div className="w-full flex justify-between items-center">
               <p className="text-xs font-bold text-primary-gold uppercase tracking-widest">Step {step} of {totalSteps}</p>
               <Chip variant="flat" color="primary" size="sm">2026 Criteria</Chip>
            </div>
            <Progress value={progress} color="primary" className="w-full h-2" />
         </CardHeader>

         <CardBody className="py-12">
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                 <h2 className="text-3xl font-bold">Are you a South African citizen, refugee, or special permit holder?</h2>
                 <div className="grid grid-cols-2 gap-6">
                    <Button
                       size="lg"
                       variant={answers.citizenship === "yes" ? "solid" : "bordered"}
                       color="primary"
                       className="font-bold"
                       onClick={() => { setAnswers({...answers, citizenship: "yes"}); handleNext(); }}
                    >Yes</Button>
                    <Button
                       size="lg"
                       variant={answers.citizenship === "no" ? "solid" : "bordered"}
                       color="primary"
                       className="font-bold"
                       onClick={() => { setAnswers({...answers, citizenship: "no"}); handleNext(); }}
                    >No</Button>
                 </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                 <h2 className="text-3xl font-bold">What is your age?</h2>
                 <Input
                    type="number"
                    label="Enter Age"
                    placeholder="e.g. 25"
                    variant="bordered"
                    size="lg"
                    value={answers.age}
                    onChange={(e) => setAnswers({...answers, age: e.target.value})}
                 />
                 <Button fullWidth color="primary" size="lg" className="font-bold" onClick={handleNext}>Continue</Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                 <h2 className="text-3xl font-bold">What is your total monthly income?</h2>
                 <Input
                    type="number"
                    label="Monthly Income (Rand)"
                    placeholder="e.g. 500"
                    variant="bordered"
                    size="lg"
                    startContent={<p className="text-default-400 text-small">R</p>}
                    value={answers.income}
                    onChange={(e) => setAnswers({...answers, income: e.target.value})}
                 />
                 <p className="text-xs text-gray-500 italic">*Include all money entering your bank account this month.</p>
                 <Button fullWidth color="primary" size="lg" className="font-bold" onClick={handleNext}>Continue</Button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-fade-in">
                 <h2 className="text-3xl font-bold">Are you currently receiving any other SASSA grant, UIF, or NSFAS?</h2>
                 <div className="grid grid-cols-2 gap-6">
                    <Button
                       size="lg"
                       variant={answers.otherGrants === "yes" ? "solid" : "bordered"}
                       color="primary"
                       className="font-bold"
                       onClick={() => { setAnswers({...answers, otherGrants: "yes"}); handleNext(); }}
                    >Yes</Button>
                    <Button
                       size="lg"
                       variant={answers.otherGrants === "no" ? "solid" : "bordered"}
                       color="primary"
                       className="font-bold"
                       onClick={() => { setAnswers({...answers, otherGrants: "no"}); handleNext(); }}
                    >No</Button>
                 </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center space-y-8 animate-fade-in">
                  {isEligible ? (
                    <>
                      <FaCheckCircle className="text-8xl text-success mx-auto" />
                      <h2 className="text-4xl font-black">You Likely Qualify!</h2>
                      <p className="text-xl text-gray-600">Based on your answers, you meet the income and eligibility criteria for the SRD R370 grant in 2026.</p>
                      <Button as="a" href="/grants/srd-r370-grant" color="primary" size="lg" className="font-bold px-12 py-8 text-xl">How to Apply <FaArrowRight className="ml-2" /></Button>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-8xl text-danger mx-auto" />
                      <h2 className="text-4xl font-black">You May Not Qualify for SRD</h2>
                      <p className="text-xl text-gray-600">This checker evaluates the SRD R370 criteria only, which require income below R{SRD_LIMIT}/month and no other grant, UIF, or NSFAS support.</p>
                      {ageGroup && (
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl max-w-lg mx-auto">
                          <p className="text-gray-700 dark:text-gray-300">
                            Based on your age, you may still qualify for a different grant. Read the{" "}
                            <a href={ageGroup.href} className="text-primary-gold font-bold hover:underline">{ageGroup.label}</a>{" "}
                            guide to check the criteria.
                          </p>
                        </div>
                      )}
                      <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="bordered" color="primary" size="lg" className="font-bold" onClick={() => setStep(1)}>Try Again</Button>
                        <Button as="a" href="/grants" color="primary" size="lg" className="font-bold">Browse All Grants</Button>
                      </div>
                    </>
                  )}
              </div>
            )}
         </CardBody>

         {step > 1 && step < 5 && (
           <Button variant="light" color="default" className="mt-8 font-bold" onClick={handleBack}>Back</Button>
         )}
      </Card>

      <section className="mt-24 space-y-12">
          <div className="flex items-center gap-3">
             <FaQuestionCircle className="text-primary-gold text-2xl" />
             <h2 className="text-3xl font-bold">Important Notes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <h3 className="text-xl font-bold">Means Test</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">The income threshold is monitored via automated bank verification. Even a small deposit from a friend could cause your application to be declined. If you have been declined for "income source detected", read our guide to appealing that decision.</p>
             </div>
             <div className="space-y-4">
                <h3 className="text-xl font-bold">This Checker Is an Estimate</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">The tool gives you an unofficial estimate based on the rules published by SASSA. The final decision is always made by SASSA officials after verifying your identity, income and documents. Use it to prepare, not as proof of entitlement.</p>
             </div>
             <div className="space-y-4">
                <h3 className="text-xl font-bold">Age Is Not the Only Rule</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Citizenship, income and other support are checked separately from age. A person over 59 who meets the other rules may still qualify for a permanent grant such as the Disability Grant, which has different criteria from the SRD.</p>
             </div>
             <div className="space-y-4">
                <h3 className="text-xl font-bold">What to Do Next</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">If you likely qualify, apply through the official SRD portal at srd.sassa.gov.za, or read our <NextLink href="/grants/srd-r370-grant" className="text-primary-gold font-bold hover:underline">step-by-step SRD application guide</NextLink>. If you are unsure about any rule, check the full <NextLink href="/grants" className="text-primary-gold font-bold hover:underline">eligibility requirements for every grant</NextLink> before you apply.</p>
             </div>
          </div>
      </section>

      <section className="mt-12 space-y-4">
         <div className="flex items-center gap-3">
            <FaQuestionCircle className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
         </div>
         <div className="space-y-3">
            <details className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
               <summary className="flex items-center gap-3 p-4 cursor-pointer list-none font-bold hover:bg-gray-50 dark:hover:bg-gray-800/50 [&::-webkit-details-marker]:hidden">
                  <FaQuestionCircle className="text-primary-gold flex-shrink-0" />
                  <span>What counts as income for the SRD R370 grant?</span>
               </summary>
               <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                  <p className="text-gray-600 dark:text-gray-400">SASSA counts every deposit into bank accounts linked to your ID, including salaries, family transfers, stokvel payouts, e-wallet deposits and refunds. If your total monthly deposits reach R{SRD_LIMIT} or more, the system flags you for "income source detected".</p>
               </div>
            </details>
            <details className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
               <summary className="flex items-center gap-3 p-4 cursor-pointer list-none font-bold hover:bg-gray-50 dark:hover:bg-gray-800/50 [&::-webkit-details-marker]:hidden">
                  <FaQuestionCircle className="text-primary-gold flex-shrink-0" />
                  <span>I am over {SRD_MAX_AGE}. Which grant should I check instead?</span>
               </summary>
               <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                  <p className="text-gray-600 dark:text-gray-400">The SRD R370 grant is only available to applicants aged {SRD_MIN_AGE} to {SRD_MAX_AGE}. From age 60, apply for the Old Age Pension instead, which pays more and is a permanent grant. The Disability Grant and War Veterans Grant also have their own age rules.</p>
               </div>
            </details>
            <details className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
               <summary className="flex items-center gap-3 p-4 cursor-pointer list-none font-bold hover:bg-gray-50 dark:hover:bg-gray-800/50 [&::-webkit-details-marker]:hidden">
                  <FaQuestionCircle className="text-primary-gold flex-shrink-0" />
                  <span>Why does SASSA check my bank account every month?</span>
               </summary>
               <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                  <p className="text-gray-600 dark:text-gray-400">The SRD is a means-tested grant, so SASSA runs automated bank verification each month to confirm you still earn under R{SRD_LIMIT} and are not receiving UIF or NSFAS. This is why you must re-qualify every month rather than once.</p>
               </div>
            </details>
         </div>
      </section>

      <section className="mt-12 p-8 bg-primary-gold/5 rounded-3xl border border-primary-gold/10 space-y-4">
         <div className="flex items-center gap-3">
            <FaInfoCircle className="text-primary-gold text-2xl" />
            <h2 className="text-2xl font-bold">Ready to Apply?</h2>
         </div>
         <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Use the official SASSA SRD portal to submit your application, and keep your ID number and cellphone number handy. For help with the application itself, see our guides on applying for the SRD R370 grant and for permanent grants.
         </p>
      </section>
    </div>
  );
}
