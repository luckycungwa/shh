import React, { useState } from "react";
import { CheckCircle, AlertCircle, RefreshCcw, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  options: { label: string; value: any }[];
}

const questions: Question[] = [
  {
    id: "age",
    text: "How old are you?",
    options: [
      { label: "Under 18", value: "child" },
      { label: "18 - 59", value: "adult" },
      { label: "60 or older", value: "senior" },
    ],
  },
  {
    id: "citizenship",
    text: "What is your residency status?",
    options: [
      { label: "South African Citizen", value: "citizen" },
      { label: "Permanent Resident", value: "resident" },
      { label: "Refugee / Asylum Seeker", value: "refugee" },
      { label: "Other", value: "other" },
    ],
  },
  {
    id: "income",
    text: "What is your monthly income?",
    options: [
      { label: "No income", value: 0 },
      { label: "R1 - R624", value: 500 },
      { label: "R625 - R5000", value: 3000 },
      { label: "More than R5000", value: 6000 },
    ],
  },
  {
    id: "disability",
    text: "Do you have a medically confirmed disability that prevents you from working?",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    id: "children",
    text: "Are you the primary caregiver of any children under 18?",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
];

const EligibilityCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const getRecommendations = () => {
    const recs = [];
    const { age, citizenship, income, disability, children } = answers;

    // SRD R370
    if (age === "adult" && income <= 624 && (citizenship === "citizen" || citizenship === "resident" || citizenship === "refugee")) {
      recs.push({
        name: "SRD R370 Grant",
        reason: "You are within the age range and meet the income threshold for social relief.",
        link: "/guides/srd-grant"
      });
    }

    // Old Age
    if (age === "senior" && income <= 8500 && (citizenship === "citizen" || citizenship === "resident")) {
      recs.push({
        name: "Older Persons Grant (Pension)",
        reason: "You meet the age requirement for the state pension.",
        link: "/guides"
      });
    }

    // Disability
    if (disability === true && age !== "child" && income <= 8500) {
      recs.push({
        name: "Disability Grant",
        reason: "You have a confirmed disability and meet the income means test.",
        link: "/guides"
      });
    }

    // Child Support
    if (children === true && income <= 5500) {
      recs.push({
        name: "Child Support Grant",
        reason: "You are a primary caregiver with an income below the threshold.",
        link: "/guides"
      });
    }

    return recs;
  };

  if (showResult) {
    const recommendations = getRecommendations();
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Results</h2>
          <p className="text-gray-600 dark:text-gray-400">Based on your answers, you may be eligible for:</p>
        </div>

        <div className="space-y-4 mb-8">
          {recommendations.length > 0 ? (
            recommendations.map((rec, i) => (
              <div key={i} className="border-2 border-primary-gold bg-primary-gold bg-opacity-5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{rec.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{rec.reason}</p>
                <Link to={rec.link} className="inline-flex items-center text-primary-gold font-bold hover:underline">
                  View Application Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))
          ) : (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 dark:text-gray-300">We couldn't find a specific grant match based on your answers. However, policies change frequently.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <button onClick={reset} className="flex items-center justify-center gap-2 text-gray-500 hover:text-primary-gold transition-colors">
            <RefreshCcw className="w-4 h-4" /> Start Over
          </button>
          <div className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-4">
            Note: This is an automated tool for guidance only. Official decisions are made by SASSA officials.
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-slide-up">
      <div className="h-2 bg-gray-100 dark:bg-gray-700">
        <div
          className="h-full bg-primary-gold transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <span className="text-xs font-bold text-primary-gold uppercase tracking-widest">Question {currentStep + 1} of {questions.length}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2">{question.text}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-gold hover:bg-primary-gold hover:bg-opacity-5 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary-black group-hover:dark:text-white">{option.label}</span>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-gold" />
              </div>
            </button>
          ))}
        </div>

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mt-8 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Previous Question
          </button>
        )}
      </div>
    </div>
  );
};

export default EligibilityCalculator;
