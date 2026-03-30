"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Input, Select, SelectItem, Progress, Divider, Chip } from "@nextui-org/react";
import { FaCheckCircle, FaTimesCircle, FaCalculator, FaArrowRight, FaQuestionCircle } from "react-icons/fa";

export default function EligibilityPage() {
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
    parseInt(answers.income) < 624 &&
    answers.otherGrants === "no";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Grant Eligibility Checker</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
           Find out if you qualify for the SRD R370 or other SASSA grants in 1 minute.
        </p>
      </header>

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
                      <p className="text-xl text-gray-600">Based on your answers, you meet the 2026 criteria for the SRD R370 grant.</p>
                      <Button as="a" href="/guides/srd-grant" color="primary" size="lg" className="font-bold px-12 py-8 text-xl">How to Apply <FaArrowRight className="ml-2" /></Button>
                   </>
                 ) : (
                   <>
                      <FaTimesCircle className="text-8xl text-danger mx-auto" />
                      <h2 className="text-4xl font-black">You May Not Qualify</h2>
                      <p className="text-xl text-gray-600">SASSA has strict thresholds for income (R624) and other social support.</p>
                      <Button variant="bordered" color="primary" size="lg" className="font-bold" onClick={() => setStep(1)}>Try Again</Button>
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
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">The income threshold is monitored via automated bank verification. Even a small deposit from a friend could cause your application to be declined.</p>
             </div>
             <div className="space-y-4">
                <h3 className="text-xl font-bold">Disclaimer</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">This tool provides an unofficial estimate. The final decision is always made by SASSA officials after verifying your documents.</p>
             </div>
          </div>
      </section>
    </div>
  );
}
