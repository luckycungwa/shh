import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bell, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import AdUnit from '../components/Common/AdUnit';
import SrdStatusMessages from '../components/Home/SrdStatusMessages';
import StatusCheckMethods from '../components/Home/StatusCheckMethods';
import RejectionMessages from '../components/Home/rejection-messages';
interface HomeContent {
  statusCheckMethods: {
    title: string;
    intro: string;
    methods: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  };
}

interface PaymentDate {
  date: string;
  grantType: string;
  amount: number;
  notes?: string;
}

interface MonthlyPayments {
  month: string;
  grants: Array<{
    type: string;
    dates: string[];
    amount: number;
    notes?: string;
  }>;
}

interface CalendarContent {
  title: string;
  intro: {
    heading: string;
    paragraphs: string[];
  };
  paymentSchedule: {
    heading: string;
    months: Array<{
      month: string;
      olderPersons: string;
      disability: string;
      childrens: string;
    }>;
  };
  paymentMethods: {
    heading: string;
    methods: Array<{
      name: string;
      description: string;
    }>;
  };
  faqs: {
    heading: string;
    questions: Array<{
      q: string;
      a: string;
    }>;
  };
}

const PaymentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [payments, setPayments] = useState<MonthlyPayments[]>([]);
  const [extraContent, setExtraContent] = useState<CalendarContent | null>(null);
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [emailReminder, setEmailReminder] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsResponse, contentResponse, homeContentResponse] = await Promise.all([
          fetch('/data/payments.json'),
          fetch('/data/paymentCalendarContent.json'),
          fetch('/data/homeContent.json')
        ]);

        if (!paymentsResponse.ok) throw new Error('Failed to fetch payment data');
        if (!contentResponse.ok) throw new Error('Failed to fetch calendar content');
        if (!homeContentResponse.ok) throw new Error('Failed to fetch home content');

        const paymentsData = await paymentsResponse.json();
        const contentData = await contentResponse.json();
        const homeContentData = await homeContentResponse.json();

        setPayments(paymentsData);
        setExtraContent(contentData);
        setHomeContent(homeContentData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getCurrentMonthPayments = () => {
    const currentMonthKey = format(currentDate, 'yyyy-MM');
    return payments.find(p => p.month === currentMonthKey);
  };

  const getPaymentForDate = (date: Date): PaymentDate[] => {
    const monthPayments = getCurrentMonthPayments();
    if (!monthPayments) return [];

    const dateStr = format(date, 'yyyy-MM-dd');
    const dayPayments: PaymentDate[] = [];

    monthPayments.grants.forEach(grant => {
      if (grant.dates.includes(dateStr)) {
        dayPayments.push({
          date: dateStr,
          grantType: grant.type,
          amount: grant.amount,
          notes: grant.notes
        });
      }
    });

    return dayPayments;
  };

  const handleEmailReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailReminder.trim()) return;

    // In production, this would use EmailJS
    console.log('Setting up email reminder for:', emailReminder);
    alert('Email reminder set up successfully! (Demo mode)');
    setEmailReminder('');
    setShowEmailForm(false);
  };

  const exportToCalendar = () => {
    const monthPayments = getCurrentMonthPayments();
    if (!monthPayments) return;

    // Create ICS file content
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//SASSA AI Status Update//Payment Calendar//EN\n';
    
    monthPayments.grants.forEach(grant => {
      grant.dates.forEach(dateStr => {
        const date = new Date(dateStr);
        const dateFormatted = format(date, 'yyyyMMdd');
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `DTSTART:${dateFormatted}\n`;
        icsContent += `DTEND:${dateFormatted}\n`;
        icsContent += `SUMMARY:${grant.type} Payment - R${grant.amount}\n`;
        icsContent += `DESCRIPTION:SASSA ${grant.type} payment of R${grant.amount}${grant.notes ? '. ' + grant.notes : ''}\n`;
        icsContent += `END:VEVENT\n`;
      });
    });
    
    icsContent += 'END:VCALENDAR';

    // Download the file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sassa-payments-${format(currentDate, 'yyyy-MM')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading payment calendar..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Calendar</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>SASSA Payment {format(currentDate, 'MMMM yyyy')} | SASSA AI Status Update</title>
        <meta name="description" content="View SASSA payment dates for 2026. Get SRD Grant, Old Age Grant, Disability Grant, and Child Support Grant payment schedules with email reminders." />
        <meta name="keywords" content="SASSA payment dates 2026, SASSA calendar, grant payment schedule, SASSA payment times" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SASSA Payment Dates {format(currentDate, 'MMMM yyyy')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              View upcoming SASSA payment dates and set up email reminders for your grants.
            </p>
          </div>

          {/* Calendar Controls */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <h2 className="text-2xl font-semibold text-gray-900">
                {format(currentDate, 'MMMM ')} Grant Dates
              </h2>
              
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowEmailForm(true)}
                className="inline-flex items-center px-4 py-2 bg-primary-gold text-primary-black font-medium rounded-lg hover:bg-primary-gold transition-colors duration-200"
              >
                <Bell className="w-4 h-4 mr-2" />
                Set Email Reminder
              </button>
              
              <button
                onClick={exportToCalendar}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to Calendar
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {monthDays.map((day) => {
                const dayPayments = getPaymentForDate(day);
                const hasPayments = dayPayments.length > 0;
                const isSelected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`p-2 min-h-[80px] border-b border-r border-gray-200 text-left hover:bg-gray-50 transition-colors duration-200 ${
                      !isSameMonth(day, currentDate) ? 'text-gray-400 bg-gray-50' : ''
                    } ${isSelected ? 'bg-primary-gold bg-opacity-20' : ''}`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {format(day, 'd')}
                    </div>
                    {hasPayments && (
                      <div className="space-y-1">
                        {dayPayments.map((payment, index) => (
                          <div
                            key={index}
                            className="text-xs bg-primary-gold text-primary-black px-1 py-0.5 rounded truncate"
                          >
                            {payment.grantType.split(' ')[0]} - R{payment.amount}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date Details */}
          {selectedDate && (
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              
              {getPaymentForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getPaymentForDate(selectedDate).map((payment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{payment.grantType}</h4>
                        <span className="text-lg font-semibold text-primary-gold/50">
                          R{payment.amount}
                        </span>
                      </div>
                      {payment.notes && (
                        <p className="text-sm text-gray-600">{payment.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No payments scheduled for this date.</p>
              )}
            </div>
          )}

          {/* Email Reminder Form */}
          {showEmailForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Set Email Reminder
                </h3>
                <form onSubmit={handleEmailReminder}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={emailReminder}
                      onChange={(e) => setEmailReminder(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-gold text-primary-black py-2 px-4 rounded-lg font-medium hover:bg-primary-gold transition-colors duration-200"
                    >
                      Set Reminder
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Payment Legend */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{format(currentDate, 'MMMM ')  } Payment Schedule Legend</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Old Age Grant - R2,090</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span className="text-sm">Disability Grant - R2,090</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">Child Support Grant - R510</span>
              </div>
              {/*SRD Grant */}
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">SRD Grant - R370</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              * Payment dates may change due to weekends, public holidays, or technical issues.
              Always verify with SASSA at 0800 60 10 11.
            </p>
          </div>
        </div>

        {extraContent && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            {/* Introduction Section */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{extraContent.intro.heading}</h2>
              {extraContent.intro.paragraphs.map((p, index) => (
                <p key={index} className="text-gray-700 mb-4">{p}</p>
              ))}
            </div>

            {/* Payment Schedule Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 p-6">{extraContent.paymentSchedule.heading}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-sm font-medium text-gray-600">Month</th>
                      <th className="p-4 text-sm font-medium text-gray-600">Older Persons Grant</th>
                      <th className="p-4 text-sm font-medium text-gray-600">Disability Grant</th>
                      <th className="p-4 text-sm font-medium text-gray-600">Children's Grants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extraContent.paymentSchedule.months.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-4 font-medium text-gray-900">{item.month}</td>
                        <td className="p-4 text-gray-700">{item.olderPersons}</td>
                        <td className="p-4 text-gray-700">{item.disability}</td>
                        <td className="p-4 text-gray-700">{item.childrens}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{extraContent.paymentMethods.heading}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {extraContent.paymentMethods.methods.map((method, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{method.name}</h3>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{extraContent.faqs.heading}</h2>
              <div className="space-y-4">
                {extraContent.faqs.questions.map((faq, index) => (
                  <div key={index} className="border-b last:border-b-0 pb-4">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full text-left flex justify-between items-center"
                    >
                      <h3 className="text-lg font-medium text-gray-800">{faq.q}</h3>
                      <ChevronRight className={`w-5 h-5 transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedFaq === index && (
                      <div className="mt-2 text-gray-600">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {homeContent && <StatusCheckMethods content={homeContent.statusCheckMethods} />}
        {/* <StatusCheckMethods content={content?.statusCheckMethods} /> */}
        <SrdStatusMessages/>
        <RejectionMessages/>
        <AdUnit slot="2468135790" />
      </div>
    </>
  );
};

export default PaymentCalendar;