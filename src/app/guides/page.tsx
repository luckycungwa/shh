import fs from "fs";
import path from "path";
import React from "react";
import { Card, CardHeader, CardBody, Button, Chip, Divider } from "@nextui-org/react";
import { FaBook, FaClock, FaArrowRight, FaGraduationCap } from "react-icons/fa";
import NextLink from "next/link";

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
}

export default function GuidesListPage() {
  const guidesPath = path.join(process.cwd(), "public/data/guides.json");
  const guides: Guide[] = JSON.parse(fs.readFileSync(guidesPath, "utf8"));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black tracking-tight">SASSA Application Guides</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Simplified, step-by-step instructions to help you navigate the SASSA ecosystem in 2026.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <Card key={guide.id} className="p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all h-full">
            <CardHeader className="flex-col items-start gap-2 p-0 mb-6">
               <Chip size="sm" variant="flat" color="secondary" className="font-bold uppercase text-[10px]">
                  {guide.category}
               </Chip>
               <h3 className="text-2xl font-bold leading-tight">{guide.title}</h3>
            </CardHeader>
            <CardBody className="p-0 flex-grow">
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed line-clamp-3">{guide.description}</p>
               <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                     <p className="flex items-center gap-1"><FaClock /> {guide.estimatedTime}</p>
                     <p className="flex items-center gap-1"><FaGraduationCap /> {guide.difficulty}</p>
                  </div>
                  <Button as={NextLink} href={`/guides/${guide.id}`} color="primary" variant="solid" className="font-bold">
                    Start Guide
                  </Button>
               </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
