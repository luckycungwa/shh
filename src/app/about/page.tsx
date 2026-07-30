import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  CardFooter,
} from "@nextui-org/react";
import {
  FaShieldAlt,
  FaHeart,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";
import NextLink from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About SASSA Help Hub \u2014 Independent Grant Resource Since 2024",
  description:
    "Learn about the publisher, editorial standards, and free resources behind SASSA Help Hub \u2014 your trusted unofficial guide to South African social security.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "About", slug: "/about" },
      ])} />
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          About SASSA Help Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Empowering South Africans with clear, practical, and reliable
          information about SASSA grants.
        </p>
      </header>

      <div className="grid gap-12">
        <Card className="border-t-2 border-primary-gold bg-yellow-50 dark:bg-yellow-900/10">
          <CardBody className="p-8">
            <div className="flex items-start gap-4 text-primary-dark dark:text-primary-gold">
              <FaShieldAlt className="text-3xl mt-1 flex-shrink-0" />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Important Information</h2>
                <p className="text-lg leading-relaxed">
                  <strong>
                    SASSA Help Hub is an independent, Independent Resource
                  </strong>{" "}
                  created by South Africans to help others. We are NOT
                  affiliated with, endorsed by, or representing the South
                  African Social Security Agency (SASSA), the Department of
                  Social Development, or any other government department.
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
            Navigating social security can be overwhelming. Complex paperwork,
            technical language, and long queues often prevent the most
            vulnerable from getting the support they need. Our mission is to
            bridge this gap by providing simple, human-written guides, real-time
            payment calendars, and fraud alerts.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            We believe that every South African has the right to access social
            support with dignity and clarity.
          </p>
        </section>

        <Divider className="my-8" />

        <section className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Who Publishes This Website
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              SASSA Help Hub is published by{" "}
              <a
                href="https://44tagstudios.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-gold font-semibold hover:underline"
              >
                44Tag Studios
              </a>
              , a South African digital agency specialising in accessible web
              tools, civic information projects, and SEO-driven content. We
              build free resources that help ordinary South Africans navigate
              government services with confidence.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Editorial Standards &amp; Research Process
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Every page on this site is researched using primary sources —
                official SASSA circulars, Government Gazette notices, and
                parliamentary briefings. We cross-check payment date changes,
                grant amount adjustments, and application procedure updates
                before publishing.
              </p>
              <p>
                Content is written in plain English to serve all literacy
                levels. We clearly label any interpretation or opinion as such
                and always link back to official sources where available.
              </p>
              <p className="flex items-start gap-2">
                <FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" />
                <span>
                  <strong>Last updated:</strong>{" "}
                  {new Date().toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>

          <Divider />

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Our Other Free Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border border-gray-100 dark:border-gray-800">
                <CardBody className="p-0 space-y-3">
                  <h3 className="text-xl font-bold">SASSA AI Status Update</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get instant answers about your SASSA grant status using our
                    AI-powered assistant — free, no login required.
                  </p>
                  <Button
                    as={NextLink}
                    href="/status-check"
                    color="primary"
                    variant="flat"
                    size="sm"
                  >
                    Try It Now
                  </Button>
                </CardBody>
              </Card>
              <Card className="p-6 border border-gray-100 dark:border-gray-800">
                <CardBody className="p-0 space-y-3">
                  <h3 className="text-xl font-bold">Payment Calendar</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Plan ahead with our up-to-date SASSA grant payment schedule
                    for the full year.
                  </p>
                  <Button
                    as={NextLink}
                    href="/payment-calendar"
                    color="primary"
                    variant="flat"
                    size="sm"
                  >
                    View Schedule
                  </Button>
                </CardBody>
              </Card>
              <Card className="p-6 border border-gray-100 dark:border-gray-800">
                <CardBody className="p-0 space-y-3">
                  <h3 className="text-xl font-bold">Grant Guides</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step-by-step guides for every SASSA grant; eligibility,
                    documents, and application process.
                  </p>
                  <Button
                    as={NextLink}
                    href="/guides"
                    color="primary"
                    variant="flat"
                    size="sm"
                  >
                    Browse Guides
                  </Button>
                </CardBody>
              </Card>
              <Card className="p-6 border border-gray-100 dark:border-gray-800">
                <CardBody className="p-0 space-y-3">
                  <h3 className="text-xl font-bold">SASSA Office Finder</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Find your nearest SASSA office with addresses, contact
                    details, and service hours.
                  </p>
                  <Button
                    as={NextLink}
                    href="/sassa-offices"
                    color="primary"
                    variant="flat"
                    size="sm"
                  >
                    Find Offices
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>

          <Divider />

          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              44Tag Studios partners with organisations that share our mission
              of making government information accessible. Whether you need
              SEO-optimised content, civic web tools, or digital strategy for
              the South African market, we can help.
            </p>
            <Button
              as={NextLink}
              href="https://44tagstudios.co.za"
              target="_blank"
              color="primary"
              variant="solid"
              endContent={<FaExternalLinkAlt className="text-xs" />}
            >
              Visit 44Tag Studios
            </Button>
          </div>
        </section>

        <Card className="bg-primary-black text-white p-8">
          <CardHeader className="flex-col items-start gap-2">
            <h3 className="text-2xl font-bold text-primary-gold">
              Need Official Help?
            </h3>
            <p className="text-secondary-gray text-sm">
              For personal grant status or account issues, please use official
              channels.
            </p>
          </CardHeader>
          <CardFooter className="gap-4 flex-wrap">
            <Button
              as={NextLink}
              href="tel:0800601011"
              color="primary"
              variant="solid"
            >
              Call SASSA: 0800 60 10 11
            </Button>
            <Button
              as={NextLink}
              href="https://srd.sassa.gov.za"
              target="_blank"
              color="default"
              variant="bordered"
              className="text-white"
            >
              Visit Official Portal{" "}
              <FaExternalLinkAlt className="ml-2 text-xs" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
