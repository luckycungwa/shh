import React from "react";
import { Helmet } from "react-helmet-async";
import EligibilityCalculator from "../components/Eligibility/EligibilityCalculator";
import { ShieldCheck, HelpCircle } from "lucide-react";
import AdUnit from "../components/Common/AdUnit";

const Eligibility: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>SASSA Grant Eligibility Calculator 2026 | Check If You Qualify</title>
        <meta name="description" content="Use our interactive SASSA grant eligibility tool to check if you qualify for SRD R370, Old Age, Disability, or Child Support grants. Instant results for 2026." />
        <meta name="keywords" content="SASSA eligibility checker, do I qualify for SASSA, SASSA grant requirements 2026, SRD R370 eligibility" />
        <link rel="canonical" href="https://sassahelphub.co.za/eligibility-check" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Am I Eligible for a SASSA Grant?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Answer a few simple questions to see which South African social grants you may be eligible to apply for in 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <EligibilityCalculator />

            <AdUnit slot="9988776655" />

            {/* Informational Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="bg-primary-gold bg-opacity-10 p-3 rounded-lg h-fit">
                    <ShieldCheck className="w-6 h-6 text-primary-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Private & Secure</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">We do not store your personal information or ID numbers. This tool is for guidance only.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary-gold bg-opacity-10 p-3 rounded-lg h-fit">
                    <HelpCircle className="w-6 h-6 text-primary-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">2026 Criteria</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Our logic is updated with the latest income thresholds and age requirements for 2026.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Eligibility;
