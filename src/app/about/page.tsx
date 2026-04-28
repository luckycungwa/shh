import React from 'react';
import { Card, CardHeader, CardBody, Divider, Button, Avatar, CardFooter } from "@nextui-org/react";
import { FaShieldAlt, FaHeart, FaUserSecret, FaExternalLinkAlt } from "react-icons/fa";
import NextLink from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn more about the mission and team behind SASSA Help Hub, your trusted unofficial guide to South African social security.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">About SASSA Help Hub</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Empowering South Africans with clear, practical, and reliable information about SASSA grants.
        </p>
      </header>

      <div className="grid gap-12">
        <Card className="border-l-8 border-primary-gold bg-yellow-50 dark:bg-yellow-900/10">
          <CardBody className="p-8">
             <div className="flex items-start gap-4 text-primary-dark dark:text-primary-gold">
               <FaShieldAlt className="text-3xl mt-1 flex-shrink-0" />
               <div className="space-y-4">
                 <h2 className="text-2xl font-bold">Important Information</h2>
                 <p className="text-lg leading-relaxed">
                   <strong>SASSA Help Hub is an independent, unofficial resource</strong> created by South Africans to help others. We are NOT affiliated with, endorsed by, or representing the South African Social Security Agency (SASSA), the Department of Social Development, or any other government department.
                 </p>
               </div>
             </div>
          </CardBody>
        </Card>

        <section className="space-y-8">
           <div className="flex items-center gap-3">
             <FaHeart className="text-primary-gold text-2xl" />
             <h2 className="text-3xl font-bold">Our Mission</h2>
           </div>
           <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
             Navigating social security can be overwhelming. Complex paperwork, technical language, and long queues often prevent the most vulnerable from getting the support they need. Our mission is to bridge this gap by providing simple, human-written guides, real-time payment calendars, and fraud alerts.
           </p>
           <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
             We believe that every South African has the right to access social support with dignity and clarity.
           </p>
        </section>

        <Divider className="my-8" />

        <section className="space-y-8">
           <div className="flex items-center gap-3">
             <FaShieldAlt className="text-primary-gold text-2xl" />
             <h2 className="text-3xl font-bold">Editorial Integrity</h2>
           </div>
           <div className="grid md:grid-cols-2 gap-8">
             <div className="space-y-4">
               <h3 className="text-xl font-bold">Fact-Checking Process</h3>
               <p className="text-gray-700 dark:text-gray-300">
                 Our team cross-references all grant dates, eligibility criteria, and policy changes with official SASSA gazettes and government press releases. We don't publish "leaked" dates; we only share verified schedules to ensure you can plan your finances with confidence.
               </p>
             </div>
             <div className="space-y-4">
               <h3 className="text-xl font-bold">Independent Oversight</h3>
               <p className="text-gray-700 dark:text-gray-300">
                 We maintain strict editorial independence. While we may run advertisements to keep the service free for users, our content is never influenced by third-party sponsors or commercial interests.
               </p>
             </div>
           </div>
        </section>

        <Divider className="my-8" />

        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-gray-600">The dedicated individuals working to keep you informed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="p-4 border border-gray-100 dark:border-gray-800">
                <CardHeader className="flex gap-4">
                  <Avatar name="EL" className="bg-primary-gold text-primary-black font-bold" />
                  <div className="flex flex-col">
                    <p className="text-md font-bold">Editorial Lead</p>
                    <p className="text-small text-default-500">Johannesburg, South Africa</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm">Specializing in policy research and community outreach for social welfare programs.</p>
                </CardBody>
             </Card>

             <Card className="p-4 border border-gray-100 dark:border-gray-800">
                <CardHeader className="flex gap-4">
                  <Avatar name="ZA" className="bg-primary-gold" />
                  <div className="flex flex-col">
                    <p className="text-md font-bold">Content Strategy</p>
                    <p className="text-small text-default-500">Cape Town, South Africa</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm">Ensuring our guides are easy to read and accessible on all devices.</p>
                </CardBody>
             </Card>
          </div>
        </section>

        <Card className="bg-primary-black text-white p-8">
           <CardHeader className="flex-col items-start gap-2">
             <h3 className="text-2xl font-bold text-primary-gold">Need Official Help?</h3>
             <p className="text-secondary-gray text-sm">For personal grant status or account issues, please use official channels.</p>
           </CardHeader>
           <CardFooter className="gap-4 flex-wrap">
              <Button as={NextLink} href="tel:0800601011" color="primary" variant="solid">
                Call SASSA: 0800 60 10 11
              </Button>
              <Button as={NextLink} href="https://srd.sassa.gov.za" target="_blank" color="default" variant="bordered" className="text-white">
                Visit Official Portal <FaExternalLinkAlt className="ml-2 text-xs" />
              </Button>
           </CardFooter>
        </Card>
      </div>
    </div>
  );
}
