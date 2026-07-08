import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { Card, CardHeader, CardBody, Divider, Chip, Button } from "@nextui-org/react";
import { FaCalendarAlt, FaInfoCircle, FaCheckCircle, FaPrint } from "react-icons/fa";
import NextLink from "next/link";
import { getCurrentMonthLabel, getCurrentYearString, generateMonthSchedule, getCurrentMonthYearKey } from "../../lib/config";
import { buildMetadata } from "../../lib/seo";

const curYear = getCurrentYearString();

export const metadata: Metadata = buildMetadata({
  title: `SASSA Payment Dates ${curYear} — Independent Grant Payment Schedule`,
  description: `View the SASSA grant payment schedule for ${curYear} including SRD R370, Old Age Pension, Disability Grant, and Child Support Grant payment dates. Independent guide.`,
  path: "/payment-calendar",
});

export default function PaymentCalendarPage() {
  const paymentDatesPath = path.join(process.cwd(), "public/data/paymentDates.json");
  const paymentDates: { grant: string; date: string; day: string }[] = JSON.parse(fs.readFileSync(paymentDatesPath, "utf8"));

  const fullSchedule = generateMonthSchedule().slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-16 space-y-6">
        <Chip color="primary" variant="shadow" className="font-bold uppercase">Official {curYear} Schedule</Chip>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight">SASSA Payment Dates {curYear}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay ahead of your finances with the confirmed SASSA grant payment schedule for {curYear}.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
           <Card className="p-8 border border-primary-gold/20 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold opacity-10 rounded-full -mr-16 -mt-16"></div>
              <CardHeader className="flex-col items-start p-0 mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                     <FaCalendarAlt className="text-primary-gold" /> Current Month: {getCurrentMonthLabel()}
                  </h2>
                 <p className="text-gray-500 mt-2 font-medium">Payments usually begin on the second working day of the month.</p>
              </CardHeader>
              <CardBody className="p-0">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {paymentDates.map((p, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 text-center space-y-2">
                         <p className="text-xs font-black uppercase text-gray-400">{p.grant}</p>
                         <p className="text-4xl font-black text-primary-gold">{new Date(p.date).getDate()}</p>
                         <p className="font-bold">{p.day}</p>
                          <p className="text-[10px] text-gray-500">{getCurrentMonthYearKey()}</p>
                      </div>
                    ))}
                 </div>
              </CardBody>
           </Card>

           <div className="space-y-6">
               <h3 className="text-2xl font-bold">Upcoming {curYear} Schedule</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm">
                   <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                         <th className="p-4 font-black uppercase text-xs">Month</th>
                          <th className="p-4 font-black uppercase text-xs">Older Persons</th>
                          <th className="p-4 font-black uppercase text-xs">Disability</th>
                          <th className="p-4 font-black uppercase text-xs">Children's</th>
                          <th className="p-4 font-black uppercase text-xs">SRD R370</th>
                      </tr>
                   </thead>
                   <tbody>
                      {fullSchedule.map((row, i) => (
                          <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                             <td className="p-4 font-bold text-sm">{row.month}</td>
                             <td className="p-4 text-sm">{new Date(row.dates[0]).toLocaleDateString()}</td>
                             <td className="p-4 text-sm">{new Date(row.dates[1]).toLocaleDateString()}</td>
                             <td className="p-4 text-sm">{new Date(row.dates[2]).toLocaleDateString()}</td>
                             <td className="p-4 text-sm whitespace-nowrap">
                               {new Date(row.srdStart).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })} – {new Date(row.srdEnd).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
                             </td>
                          </tr>
                      ))}
                   </tbody>
                </table>
              </div>
           </div>
        </div>

        <aside className="space-y-8">
           <Card className="bg-primary-black text-white p-8 rounded-[2rem] border-none shadow-2xl">
              <CardBody className="p-0 space-y-6">
                 <h3 className="text-2xl font-black text-primary-gold">Payment Tips</h3>
                 <ul className="space-y-4 text-sm text-secondary-gray">
                    <li className="flex gap-3">
                       <FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" />
                       <p>There is no need to withdraw all your money on the first day.</p>
                    </li>
                    <li className="flex gap-3">
                       <FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" />
                       <p>Your money is safe in your SASSA Gold Card or bank account.</p>
                    </li>
                    <li className="flex gap-3">
                       <FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" />
                       <p>Avoid long queues by using retail points like Pick n Pay or Boxer.</p>
                    </li>
                 </ul>
                 <Button as={NextLink} href="/status-check" fullWidth color="primary" className="font-bold mt-4">
                    Check Your Status
                 </Button>
              </CardBody>
           </Card>

           <div className="p-8 border border-gray-100 dark:border-gray-800 rounded-[2rem] space-y-6">
               <h4 className="text-xl font-bold flex items-center gap-2">
                  <FaInfoCircle className="text-blue-500" /> SRD R370 Dates
               </h4>
               <p className="text-sm text-gray-600 leading-relaxed">
                  The Social Relief of Distress (SRD) R370 grant is paid in a batch window each month.
               </p>
               <p className="text-sm font-bold text-primary-gold">
                  Current batch: {new Date(fullSchedule[0].srdStart).toLocaleDateString("en-ZA", { day: "numeric", month: "long" })} – {new Date(fullSchedule[0].srdEnd).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
               </p>
              <Divider />
              <Button variant="flat" color="secondary" fullWidth startContent={<FaPrint />}>Print Schedule</Button>
           </div>
        </aside>
      </div>
    </div>
  );
}
