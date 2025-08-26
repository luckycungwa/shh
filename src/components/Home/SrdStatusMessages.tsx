"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle, Clock, AlertTriangle, XCircle, CreditCard, User } from "lucide-react"

interface SrdStatus {
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

const srdStatuses: SrdStatus[] = [
  {
    id: "approved",
    title: "Approved",
    description: "Your SASSA SRD R370 grant application has been approved. You will receive payments on scheduled dates.",
    icon: <CheckCircle className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Approved",
      details: "Your SRD R370 grant is approved. Next payment: 25-31 August 2025. Reference ID: APP123456.",
      code: "APP001",
    },
  },
  {
    id: "pending",
    title: "Pending",
    description: "Your SASSA SRD status is pending verification. This may take up to 3 months; check regularly.",
    icon: <Clock className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Pending",
      details: "Your SRD R370 grant application is under review. Please update banking details if needed.",
      code: "PEN001",
    },
  },
  {
    id: "declined-income",
    title: "Declined - Income Threshold",
    description: "SASSA SRD R370 grant declined due to income exceeding R624/month. Appeal if incorrect.",
    icon: <CreditCard className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Declined",
      details: "Income above threshold for SRD R370 grant. Means test identified alternative source.",
      code: "DEC001",
    },
  },
  {
    id: "declined-identity",
    title: "Declined - Identity Verification",
    description: "SASSA SRD status check failed identity verification with Home Affairs. Visit office with ID.",
    icon: <User className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Declined",
      details: "Identity verification failed for SRD R370 grant. Please verify at nearest SASSA office.",
      code: "DEC002",
    },
  },
  {
    id: "declined-existing",
    title: "Declined - Existing Grant",
    description: "Cannot receive SRD R370 if already on another SASSA grant or UIF/NSFAS benefits.",
    icon: <AlertTriangle className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Declined",
      details: "You are receiving another grant/UIF. Ineligible for SRD R370.",
      code: "DEC003",
    },
  },
  {
    id: "cancelled",
    title: "Cancelled",
    description: "Your SASSA SRD R370 grant has been cancelled due to changes in circumstances or non-collection.",
    icon: <XCircle className="w-6 h-6" />,
    phoneMessage: {
      title: "Grant Cancelled",
      details: "SRD R370 grant cancelled. Reapply if circumstances have changed.",
      code: "CAN001",
    },
  },
]

export default function SrdStatusMessages() {
  const [selectedStatus, setSelectedStatus] = useState<SrdStatus>(srdStatuses[0])

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Understanding SASSA SRD R370 Status Messages</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Learn about common SASSA SRD status check results for your R370 grant application. Stay informed on approval, payments, and what to do if declined.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left side status messages */}
          <div className="space-y-4">
            {srdStatuses.slice(0, 3).map((status) => (
              <div
                key={status.id}
                onClick={() => setSelectedStatus(status)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedStatus.id === status.id
                    ? "bg-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-900 hover:bg-yellow-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${selectedStatus.id === status.id ? "bg-yellow-500" : "bg-yellow-300"}`}>
                    {status.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{status.title}</h3>
                    <p className={`text-sm ${selectedStatus.id === status.id ? "text-yellow-100" : "text-gray-600"}`}>
                      {status.description}
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
                    <div className="text-white text-sm">SASSA SRD Portal</div>
                  </div>

                  {/* Phone content */}
                  <div className="flex-1 bg-white rounded-2xl flex flex-col">
                    <div className="p-4 flex flex-col">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          {selectedStatus.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedStatus.phoneMessage.title}</h3>
                        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                          Code: {selectedStatus.phoneMessage.code}
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-gray-700 text-center leading-relaxed">{selectedStatus.phoneMessage.details}</p>
                      </div>

                      <div className="mt-6 space-y-3">
                        <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium">
                          Check Payment Dates
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium">
                          Appeal Decision
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex overflow-hidden w-full bottom-0 rounded-full mt-1">
                    <div className="flex-1 h-1.5 bg-yellow-600"></div>
                    <div className="flex-1 h-1.5 bg-red-600"></div>
                    <div className="flex-1 h-1.5 bg-green-600"></div>
                    <div className="flex-1 h-1.5 bg-black/95"></div>
                    <div className="flex-1 h-1.5 bg-blue-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side status messages */}
          <div className="space-y-4">
            {srdStatuses.slice(3, 6).map((status) => (
              <div
                key={status.id}
                onClick={() => setSelectedStatus(status)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedStatus.id === status.id
                    ? "bg-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-900 hover:bg-yellow-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${selectedStatus.id === status.id ? "bg-yellow-500" : "bg-yellow-100"}`}>
                    {status.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{status.title}</h3>
                    <p className={`text-sm ${selectedStatus.id === status.id ? "text-yellow-100" : "text-gray-600"}`}>
                      {status.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need help with your SASSA SRD R370 grant status? Contact SASSA support for assistance.</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Call 0800 60 10 11
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Find SASSA Offices
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
