import fs from "fs";
import path from "path";
import React from "react";
import { Card, CardHeader, CardBody, Button, Chip, Divider, Input } from "@nextui-org/react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import NextLink from "next/link";

interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  province: string;
}

export default function ResourcesPage() {
  const officesPath = path.join(process.cwd(), "public/data/resources.json");
  const allOffices: Office[] = JSON.parse(fs.readFileSync(officesPath, "utf8"));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black tracking-tight">SASSA Office Locator</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find your nearest SASSA branch or service point across South Africa.
        </p>
      </header>

      <div className="grid gap-12">
        <section className="max-w-3xl mx-auto w-full">
           <Input
              size="lg"
              placeholder="Search by city or province..."
              startContent={<FaSearch className="text-gray-400" />}
              className="shadow-xl"
           />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {allOffices.slice(0, 12).map((office, i) => (
             <Card key={i} className="p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all">
                <CardHeader className="flex-col items-start gap-2 p-0 mb-6">
                   <Chip size="sm" color="primary" variant="flat" className="font-bold uppercase text-[10px]">
                      {office.province}
                   </Chip>
                   <h3 className="text-2xl font-bold leading-tight">{office.name}</h3>
                </CardHeader>
                <CardBody className="p-0 space-y-6">
                   <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="mt-1 text-primary-gold" />
                      <p>{office.address}</p>
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold">
                      <FaPhoneAlt className="text-primary-gold" />
                      <a href={`tel:${office.phone}`} className="hover:underline">{office.phone}</a>
                   </div>
                   <Divider />
                   <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                      <p className="flex items-center gap-1"><FaClock /> 07:30 - 16:00</p>
                      <Button size="sm" color="primary" variant="flat">Get Directions</Button>
                   </div>
                </CardBody>
             </Card>
           ))}
        </div>

        <section className="py-12">
           <Card className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 text-center">
              <CardBody className="space-y-6">
                 <h2 className="text-3xl font-bold">Can't Visit an Office?</h2>
                 <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    Many SASSA services can now be performed online or via WhatsApp. Check our digital application guide first.
                 </p>
                 <Button as={NextLink} href="/guides/how-to-apply" color="primary" variant="solid" className="font-bold px-8 py-6">
                    View Digital Guides <FaExternalLinkAlt className="ml-2 text-xs" />
                 </Button>
              </CardBody>
           </Card>
        </section>
      </div>
    </div>
  );
}
