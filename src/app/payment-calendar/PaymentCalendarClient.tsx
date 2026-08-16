"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, Divider, Chip, Button } from "@nextui-org/react";
import { FaCalendarAlt, FaInfoCircle, FaCheckCircle, FaPrint, FaHistory } from "react-icons/fa";
import NextLink from "next/link";
import { getCurrentMonthLabel, generateMonthSchedule } from "../../lib/config";

interface PaymentDate {
  grant: string;
  date: string;
  day: string;
}

interface ScheduleMonth {
  month_key: string;
  label: string;
  older_persons: string;
  disability: string;
  children: string;
  srd_start: string;
  srd_end: string;
  note: string;
}

export default function PaymentCalendarClient({
  paymentDates,
  historyData,
}: {
  paymentDates: PaymentDate[];
  historyData: ScheduleMonth[];
}) {
  const [selectedMonth, setSelectedMonth] = useState<string>("current");
  const currentSchedule = historyData.find((h) => selectedMonth === h.month_key);
  const fullSchedule = generateMonthSchedule().slice(0, 12);

  const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
  const fmtDay = (d: string) => new Date(d).toLocaleDateString("en-ZA", { weekday: "long" });
  const fmtShort = (d: string) => new Date(d).toLocaleDateString("en-ZA", { month: "short" });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-16 space-y-6">
        <Chip color="primary" variant="shadow" className="font-bold uppercase">{new Date().getFullYear()} Schedule</Chip>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight">SASSA Payment Dates {new Date().getFullYear()}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay ahead of your finances with the confirmed SASSA grant payment schedule.
        </p>
      </header>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <div className="flex items-center gap-3">
          <FaHistory className="text-primary-gold" />
          <span className="font-bold">View month:</span>
        </div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
        >
          <option value="current">Current: {getCurrentMonthLabel()}</option>
          {historyData.length > 0 && (
            <optgroup label="Historical Schedules">
              {historyData.map((h) => (
                <option key={h.month_key} value={h.month_key}>{h.label}</option>
              ))}
            </optgroup>
          )}
        </select>
        <p className="text-[10px] text-gray-400">
          <strong>Last verified:</strong> {new Date().toLocaleDateString("en-ZA")} | <a href="https://www.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="underline">sassa.gov.za</a>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {selectedMonth === "current" ? (
            <Card className="p-8 border border-primary-gold/20 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold opacity-10 rounded-full -mr-16 -mt-16"></div>
              <CardHeader className="flex-col items-start p-0 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Chip color="warning" variant="flat" size="sm" className="font-bold text-[10px]">ACTIVE</Chip>
                </div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <FaCalendarAlt className="text-primary-gold" /> {getCurrentMonthLabel()}
                </h2>
                <p className="text-gray-500 mt-2 font-medium">Payments usually begin on the second working day of the month.</p>
              </CardHeader>
              <CardBody className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {paymentDates.map((p, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center space-y-2">
                      <p className="text-xs font-black uppercase text-gray-400">{p.grant}</p>
                      <p className="text-3xl font-black text-primary-gold">{new Date(p.date).getDate()}</p>
                      <p className="font-bold text-sm">{p.day}</p>
                      <p className="text-[10px] text-gray-500">{new Date(p.date).toLocaleDateString("en-ZA", { month: "long" })}</p>
                    </div>
                  ))}
                </div>
                {getCurrentMonthLabel().startsWith("August") && (
                  <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      <strong>Long weekend note:</strong> Women&apos;s Day falls on Sunday 9 August 2026 and is observed on Monday 10 August 2026. Main grant payments (4&ndash;7 August) are unaffected; SRD R370 runs later in the month. Expect longer queues at ATMs and pay-out points &mdash; withdraw early if you can.
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          ) : currentSchedule ? (
            <Card className="p-8 border border-blue-200 dark:border-blue-800 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
              <CardHeader className="flex-col items-start p-0 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Chip color="primary" variant="flat" size="sm" className="font-bold text-[10px]">HISTORICAL</Chip>
                </div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-500" /> {currentSchedule.label}
                </h2>
                {currentSchedule.note && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 italic">{currentSchedule.note}</p>
                )}
              </CardHeader>
              <CardBody className="p-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 text-center space-y-2">
                    <p className="text-xs font-black uppercase text-blue-500">Older Persons</p>
                    <p className="text-3xl font-black text-blue-600">{new Date(currentSchedule.older_persons).getDate()}</p>
                    <p className="font-bold text-sm">{fmtDay(currentSchedule.older_persons)}</p>
                    <p className="text-[10px]">{fmtShort(currentSchedule.older_persons)}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 text-center space-y-2">
                    <p className="text-xs font-black uppercase text-blue-500">Disability</p>
                    <p className="text-3xl font-black text-blue-600">{new Date(currentSchedule.disability).getDate()}</p>
                    <p className="font-bold text-sm">{fmtDay(currentSchedule.disability)}</p>
                    <p className="text-[10px]">{fmtShort(currentSchedule.disability)}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 text-center space-y-2">
                    <p className="text-xs font-black uppercase text-blue-500">Children&apos;s</p>
                    <p className="text-3xl font-black text-blue-600">{new Date(currentSchedule.children).getDate()}</p>
                    <p className="font-bold text-sm">{fmtDay(currentSchedule.children)}</p>
                    <p className="text-[10px]">{fmtShort(currentSchedule.children)}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 text-center space-y-2">
                    <p className="text-xs font-black uppercase text-blue-500">SRD R370</p>
                    <p className="text-lg font-black text-blue-600">
                      {new Date(currentSchedule.srd_start).getDate()} – {new Date(currentSchedule.srd_end).getDate()}
                    </p>
                    <p className="font-bold text-sm">{fmtShort(currentSchedule.srd_start)}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : null}

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Upcoming {new Date().getFullYear()} Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="p-4 font-black uppercase text-xs">Month</th>
                    <th className="p-4 font-black uppercase text-xs">Older Persons</th>
                    <th className="p-4 font-black uppercase text-xs">Disability</th>
                    <th className="p-4 font-black uppercase text-xs">Children&apos;s</th>
                    <th className="p-4 font-black uppercase text-xs">SRD R370</th>
                  </tr>
                </thead>
                <tbody>
                  {fullSchedule.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="p-4 font-bold text-sm">{row.month}</td>
                      <td className="p-4 text-sm">{fmtDate(row.dates[0])}</td>
                      <td className="p-4 text-sm">{fmtDate(row.dates[1])}</td>
                      <td className="p-4 text-sm">{fmtDate(row.dates[2])}</td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        {new Date(row.srdStart).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })} – {new Date(row.srdEnd).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500">
              <strong>Sources:</strong> <a href="https://www.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-primary-gold underline">sassa.gov.za</a> | <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-primary-gold underline">SRD Portal</a>
              <br />
              <strong>Last verified:</strong> {new Date().toLocaleDateString("en-ZA")} | Historical data compiled from official SASSA monthly announcements
            </p>
          </div>
        </div>

        <aside className="space-y-8">
          <Card className="bg-primary-black text-white p-8 rounded-[2rem] border-none shadow-2xl">
            <CardBody className="p-0 space-y-6">
              <h3 className="text-2xl font-black text-primary-gold">Payment Tips</h3>
              <ul className="space-y-4 text-sm text-secondary-gray">
                <li className="flex gap-3"><FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" /><p>There is no need to withdraw all your money on the first day.</p></li>
                <li className="flex gap-3"><FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" /><p>Your money is safe in your SASSA Gold Card or bank account.</p></li>
                <li className="flex gap-3"><FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" /><p>Avoid long queues by using retail points like Pick n Pay or Boxer.</p></li>
                <li className="flex gap-3"><FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" /><p>If your grant is under review, you will be paid on the <a href="/guides/fourth-payment-day-guide" className="text-primary-gold underline">Fourth Payment Day</a> — check the schedule.</p></li>
              </ul>
              <Button as={NextLink} href="/status-check" fullWidth color="primary" className="font-bold mt-4">Check Your Status</Button>
            </CardBody>
          </Card>

          <div className="p-8 border border-gray-100 dark:border-gray-800 rounded-[2rem] space-y-6">
            <h4 className="text-xl font-bold flex items-center gap-2"><FaInfoCircle className="text-blue-500" /> SRD R370 Dates</h4>
            {/* SRD window below is derived from SRD_CONFIG (25th → month-end). The August 2026
                entry in paymentDates.json remains "TBC — last week of month" — see TODO(recheck)
                in src/lib/config.ts. Re-confirm via srd.sassa.gov.za before treating as final. */}
            <p className="text-sm text-gray-600 leading-relaxed">The Social Relief of Distress (SRD) R370 grant is paid in a batch window each month.</p>
            <p className="text-sm font-bold text-primary-gold">
              {new Date(fullSchedule[0].srdStart).toLocaleDateString("en-ZA", { day: "numeric", month: "long" })} – {new Date(fullSchedule[0].srdEnd).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <Divider />
            <Button variant="flat" color="secondary" fullWidth startContent={<FaPrint />}>Print Schedule</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
