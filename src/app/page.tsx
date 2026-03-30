import fs from "fs";
import path from "path";
import React from "react";
import { Button, Card, CardBody, CardHeader, Divider, Link, Chip, Avatar } from "@nextui-org/react";
import { FaShieldAlt, FaNewspaper, FaCalendarAlt, FaQuestionCircle, FaArrowRight, FaCreditCard, FaMobileAlt as FaSmartphone, FaFileSignature, FaUserCheck, FaCheckCircle, FaUsers, FaMapMarkerAlt, FaClock, FaChartLine } from "react-icons/fa";
import NextLink from "next/link";

interface Update {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: string;
  urgent: boolean;
}

export default function HomePage() {
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const updates: Update[] = JSON.parse(fs.readFileSync(updatesPath, "utf8")).slice(0, 3);

  const paymentDatesPath = path.join(process.cwd(), "public/data/paymentDates.json");
  const paymentDates: { grant: string; date: string; day: string }[] = JSON.parse(fs.readFileSync(paymentDatesPath, "utf8"));

  const tools = [
    {
      title: "Change Banking Details",
      description: "Update your bank account for SRD R370 payments to avoid delays.",
      icon: <FaCreditCard className="text-2xl" />,
      link: "/guides/change-banking-details",
      color: "blue"
    },
    {
      title: "Change Phone Number",
      description: "Lost your registered number? Follow our guide to update it safely.",
      icon: <FaSmartphone className="text-2xl" />,
      link: "/guides/srd-grant",
      color: "green"
    },
    {
      title: "Lodge an Appeal",
      description: "If your grant was declined, you must submit an appeal within 90 days.",
      icon: <FaFileSignature className="text-2xl" />,
      link: "/guides/appeal-guide",
      color: "red"
    },
    {
      title: "Biometric Verification",
      description: "New for 2026: Complete your facial recognition for enhanced security.",
      icon: <FaUserCheck className="text-2xl" />,
      link: "/guides/biometric-verification-guide",
      color: "yellow"
    }
  ];

  const stats = [
    { label: "Beneficiaries Helped", value: "2000+", icon: <FaUsers /> },
    { label: "Scams Prevented", value: "100+", icon: <FaShieldAlt /> },
    { label: "SASSA Offices", value: "200+", icon: <FaMapMarkerAlt /> },
    { label: "Updated Daily", value: "2026", icon: <FaClock /> }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-primary-black py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Chip color="primary" variant="flat" className="mb-6 font-bold uppercase tracking-widest px-4 py-2 border border-primary-gold/30">
             Updated for March 2026
          </Chip>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tighter leading-tight">
            Navigate SASSA with <span className="text-primary-gold underline underline-offset-8">Clarity</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary-gray mb-12 max-w-3xl mx-auto leading-relaxed">
            Your friendly, independent guide to South African social grants, payment dates, and fraud protection.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <Button as={NextLink} href="/guides/how-to-apply" color="primary" size="lg" className="font-bold px-10 py-8 text-xl shadow-xl hover:scale-105 transition-transform">
                Get Started Now <FaArrowRight className="ml-2" />
             </Button>
             <Button as={NextLink} href="/updates" variant="bordered" size="lg" className="text-white border-white/30 font-bold px-10 py-8 text-xl hover:bg-white/10 transition-colors">
                Latest News
             </Button>
          </div>
        </div>
      </section>

      {/* Payment Dates Highlight */}
      <section className="bg-primary-gold py-12 border-y border-primary-gold/50 shadow-inner">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 flex flex-col justify-center">
               <h2 className="text-2xl font-black text-primary-black uppercase tracking-tight leading-none mb-2 italic">March 2026</h2>
               <p className="text-primary-black font-bold opacity-80 uppercase text-xs tracking-widest flex items-center gap-2">
                  <FaCalendarAlt /> Confirmed Payment Schedule
               </p>
            </div>
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
               {paymentDates.map((p, i) => (
                 <div key={i} className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col items-center text-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-primary-black opacity-60 mb-1">{p.grant}</p>
                    <p className="text-xl font-black text-primary-black leading-none">{new Date(p.date).getDate()}</p>
                    <p className="text-[10px] font-bold text-primary-black opacity-80 uppercase tracking-tighter">{p.day}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 dark:bg-gray-900/80 py-8 border-b border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
                 <div className="text-2xl opacity-50">{stat.icon}</div>
                 <div>
                   <p className="text-xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">{stat.label}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Trust Callout */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
         <Card className="bg-white dark:bg-gray-800 p-8 shadow-2xl border border-gray-100 dark:border-gray-800">
            <CardBody className="flex flex-col md:flex-row items-center gap-8 md:text-left text-center">
               <div className="bg-primary-gold/10 p-6 rounded-full text-4xl text-primary-gold">
                  <FaShieldAlt />
               </div>
               <div className="flex-grow space-y-2">
                 <h2 className="text-3xl font-bold">100% Unofficial & Independent</h2>
                 <p className="text-lg text-gray-600 dark:text-gray-400">
                   We are South Africans helping South Africans. Our goal is to simplify grant information so you never miss a payment.
                 </p>
               </div>
               <Button as={NextLink} href="/about" variant="flat" color="primary" className="font-bold py-6 px-8 text-lg">
                  Learn Our Story
               </Button>
            </CardBody>
         </Card>
      </section>

      {/* Essential Tools 2026 */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
         <div className="text-center mb-16 space-y-4">
           <h2 className="text-4xl font-bold tracking-tight">Essential SASSA Online Tools 2026</h2>
           <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
             Quickly access the most important SASSA services using our high-quality step-by-step guides.
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, i) => (
              <Card key={i} isPressable as={NextLink} href={tool.link} className="p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                <CardHeader className="justify-center pb-8">
                   <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl group-hover:bg-primary-gold group-hover:text-primary-black transition-colors">
                      {tool.icon}
                   </div>
                </CardHeader>
                <CardBody className="text-center space-y-4">
                   <h3 className="text-xl font-bold">{tool.title}</h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{tool.description}</p>
                </CardBody>
                <Divider className="my-4 opacity-50" />
                <div className="flex items-center justify-center gap-2 text-primary-gold font-bold group-hover:gap-4 transition-all">
                   Open Guide <FaArrowRight />
                </div>
              </Card>
            ))}
         </div>
      </section>

      {/* Latest News */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-24 w-full">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
               <div className="md:text-left text-center">
                 <h2 className="text-4xl font-bold flex items-center gap-3 justify-center md:justify-start">
                    <FaNewspaper className="text-primary-gold" /> Latest News & Updates
                 </h2>
                 <p className="text-gray-600 mt-2">Stay informed with the latest SASSA announcements for 2026.</p>
               </div>
               <Button as={NextLink} href="/updates" variant="bordered" className="font-bold border-primary-gold text-primary-gold">
                  View All Updates
               </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {updates.map((update) => (
                 <Card key={update.id} className="p-0 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-2xl transition-all h-full flex flex-col">
                    <CardHeader className="bg-primary-black text-white p-6 relative">
                       <Chip color={update.type === "alert" ? "danger" : "primary"} className="absolute top-4 right-4 font-bold uppercase text-[10px]">
                          {update.type}
                       </Chip>
                       <h3 className="text-xl font-bold leading-tight mt-4">{update.title}</h3>
                    </CardHeader>
                    <CardBody className="p-8 flex-grow">
                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{update.summary}</p>
                       <div className="flex items-center justify-between text-xs font-bold text-secondary-gray mt-auto">
                          <p className="flex items-center gap-1"><FaClock /> {new Date(update.date).toLocaleDateString()}</p>
                          <Link as={NextLink} href={`/updates/${update.id}`} className="text-primary-gold hover:underline">Read Full Story</Link>
                       </div>
                    </CardBody>
                 </Card>
               ))}
            </div>
         </div>
      </section>

      {/* Help CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center space-y-12">
          <div className="bg-primary-gold/10 p-12 rounded-[3rem] border border-primary-gold/20 shadow-2xl">
             <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Still Need Assistance?</h2>
             <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
               Explore our comprehensive FAQ database or get in touch with our team for guidance on your grant application.
             </p>
             <div className="flex flex-wrap justify-center gap-6">
                <Button as={NextLink} href="/faq" color="primary" size="lg" className="font-bold px-10 py-8 text-xl">
                   Browse FAQs <FaQuestionCircle className="ml-2" />
                </Button>
                <Button as={NextLink} href="/contact" variant="bordered" size="lg" className="font-bold px-10 py-8 text-xl border-primary-gold text-primary-gold">
                   Contact Our Team
                </Button>
             </div>
          </div>
      </section>
    </div>
  );
}
