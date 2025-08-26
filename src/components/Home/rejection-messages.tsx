"use client"

import type React from "react"
import { useState } from "react"
import { AlertTriangle, FileX, CreditCard, User, Phone } from "lucide-react"

interface RejectionReason {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  phoneMessage: {
    title: string
    details: string
    code: string
  }
}

const rejectionReasons: RejectionReason[] = [
  {
    id: "incomplete-docs",
    title: "Incomplete Documentation",
    description: "Missing required documents or information in your application",
    icon: <FileX className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Rejected",
      details: "Your application is missing required documents. Please submit all required documentation and reapply.",
      code: "REJ001",
    },
  },
  {
    id: "income-threshold",
    title: "Income Above Threshold",
    description: "Your declared income exceeds the maximum allowed for this grant",
    icon: <CreditCard className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Rejected",
      details: "Your monthly income of R2,500 exceeds the R350 threshold for SRD grant eligibility.",
      code: "REJ002",
    },
  },
  {
    id: "age-requirement",
    title: "Age Requirement Not Met",
    description: "Applicant does not meet the minimum age requirement for this grant",
    icon: <User className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Rejected",
      details: "You must be between 18-59 years old to qualify for the Social Relief of Distress grant.",
      code: "REJ003",
    },
  },
  {
    id: "duplicate-application",
    title: "Duplicate Application",
    description: "Multiple applications detected for the same grant period",
    icon: <AlertTriangle className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Rejected",
      details: "Our system detected multiple applications. Only one application per person is allowed.",
      code: "REJ004",
    },
  },
  {
    id: "verification-failed",
    title: "Identity Verification Failed",
    description: "Unable to verify your identity with Home Affairs database",
    icon: <User className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Rejected",
      details: "We could not verify your identity. Please visit your nearest SASSA office with your ID document.",
      code: "REJ005",
    },
  },
  {
    id: "contact-details",
    title: "Invalid Contact Details",
    description: "Phone number or address could not be verified",
    icon: <Phone className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Rejected",
      details: "The contact details provided could not be verified. Please update your information.",
      code: "REJ006",
    },
  },
]

export default function RejectionMessages() {
  const [selectedReason, setSelectedReason] = useState<RejectionReason>(rejectionReasons[0])

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Understanding Application Rejections</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Learn about common reasons why SASSA grant applications are rejected and what each rejection message means.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left side rejection reasons */}
          <div className="space-y-4">
            {rejectionReasons.slice(0, 3).map((reason) => (
              <div
                key={reason.id}
                onClick={() => setSelectedReason(reason)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedReason.id === reason.id
                    ? "bg-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-900 hover:bg-yellow-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${selectedReason.id === reason.id ? "bg-yellow-500" : "bg-yellow-300"}`}>
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                    <p className={`text-sm ${selectedReason.id === reason.id ? "text-yellow-100" : "text-gray-600"}`}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 flex h-[600px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-[2.5rem] p-4 flex flex-col">
                  {/* Phone header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm">SASSA Portal</div>
                  </div>

                  {/* Phone content */}
                  <div className="flex-1 bg-white rounded-2xl flex flex-col">
                  <div className="p-4 flex flex-col">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedReason.phoneMessage.title}</h3>
                      <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                        Code: {selectedReason.phoneMessage.code}
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-700 text-center leading-relaxed">{selectedReason.phoneMessage.details}</p>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium">
                        View Full Details
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium">
                        Contact Support
                      </button>
                    </div>
                   
                  </div>
                  </div>
                  
                   <div className="flex overflow-hidden w-full bottom-0 rounded-full mt-1">
                      <div className="flex-1 h-1.5 bg-yellow-600 "></div>
                      <div className="flex-1 h-1.5 bg-red-600"></div>
                      <div className="flex-1 h-1.5 bg-green-600"></div>
                      <div className="flex-1 h-1.5 bg-black/95"></div>
                      <div className="flex-1 h-1.5 bg-blue-600 "></div>
                    </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Right side rejection reasons */}
          <div className="space-y-4">
            {rejectionReasons.slice(3, 6).map((reason) => (
              <div
                key={reason.id}
                onClick={() => setSelectedReason(reason)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedReason.id === reason.id
                    ? "bg-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-900 hover:bg-yellow-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${selectedReason.id === reason.id ? "bg-yellow-500" : "bg-yellow-100"}`}>
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                    <p className={`text-sm ${selectedReason.id === reason.id ? "text-yellow-100" : "text-gray-600"}`}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need help with your application? Contact SASSA support for assistance.</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Call 0800 60 10 11
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Find Offices
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
