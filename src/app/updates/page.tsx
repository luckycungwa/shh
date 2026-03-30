import fs from "fs";
import path from "path";
import React from "react";
import { Card, CardHeader, CardBody, Button, Chip, Divider } from "@nextui-org/react";
import { FaNewspaper, FaClock, FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";

interface Update {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: string;
  urgent: boolean;
}

export default function UpdatesListPage() {
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const updates: Update[] = JSON.parse(fs.readFileSync(updatesPath, "utf8"));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black tracking-tight">SASSA News & Updates 2026</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay informed with the latest official announcements, grant increases, and system updates.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {updates.map((update) => (
          <Card key={update.id} className="p-0 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-2xl transition-all h-full flex flex-col">
            <CardHeader className="bg-primary-black text-white p-6 relative">
               <Chip color={update.type === "alert" ? "danger" : "primary"} className="absolute top-4 right-4 font-bold uppercase text-[10px]">
                  {update.type}
               </Chip>
               <h3 className="text-xl font-bold leading-tight mt-4">{update.title}</h3>
            </CardHeader>
            <CardBody className="p-8 flex-grow">
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">{update.summary}</p>
               <div className="flex items-center justify-between text-xs font-bold text-secondary-gray mt-auto">
                  <p className="flex items-center gap-1"><FaClock /> {new Date(update.date).toLocaleDateString()}</p>
                  <Button as={NextLink} href={`/updates/${update.id}`} size="sm" color="primary" variant="flat">
                    Read More
                  </Button>
               </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
