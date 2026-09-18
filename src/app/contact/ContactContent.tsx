"use client";

import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardBody, Input, Textarea, Select, SelectItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaShieldAlt } from "react-icons/fa";

export default function ContactContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [honeypot, setHoneypot] = useState("");
  const [submittedAt] = useState(() => Date.now());
  const [sending, setSending] = useState(false);

  const subjects = [
    { label: "General Inquiry", value: "general" },
    { label: "Report a Scam", value: "scam" },
    { label: "Content Suggestion", value: "content" },
    { label: "Technical Issue", value: "technical" },
    { label: "Legal/Privacy", value: "legal" }
  ];

  const SUPPORT_EMAIL = "support@sassahelphub.co.za";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot check — bots fill hidden fields
    if (honeypot) return;
    // Rate limit — less than 3 seconds is bot-like
    if (Date.now() - submittedAt < 3000) return;
    // This site has no backend: compose a pre-addressed email in the
    // visitor's own email app. Nothing is transmitted by this site itself,
    // so we never claim a message was "received".
    const subjectLabel = subjects.find((s) => s.value === formData.subject)?.label || "General Inquiry";
    const subject = `[SHH Contact: ${subjectLabel}] ${formData.name}`.slice(0, 200);
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${subjectLabel}\n\n${formData.message}`;
    setSending(true);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSending(false);
    onOpen();
    setFormData({ name: "", email: "", subject: "", message: "" });
    setHoneypot("");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              I'm dedicated to providing the best unofficial SASSA resource for South Africans.
            </p>
          </section>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary-gold/10 p-4 rounded-xl">
                <FaPhoneAlt className="text-2xl text-primary-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold">SASSA Help Hub Team</h3>
                <p className="text-gray-600 dark:text-gray-400">Based in South Africa</p>
                <p className="text-sm font-medium mt-1">Johannesburg, Gauteng, ZA</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary-gold/10 p-4 rounded-xl">
                <FaEnvelope className="text-2xl text-primary-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Direct Support</h3>
                <a href="mailto:support@sassahelphub.co.za" className="text-primary-gold hover:underline">support@sassahelphub.co.za</a>
                <p className="text-xs text-gray-500 mt-1">We typically reply within 2 business days.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary-gold/10 p-4 rounded-xl">
                <FaMapMarkerAlt className="text-2xl text-primary-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Johannesburg, South Africa</p>
              </div>
            </div>
          </div>

          <Card className="bg-red-50 dark:bg-red-900/10 border-l-8 border-red-500 p-6">
             <CardBody className="space-y-2">
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Need Official Help?</h3>
                <p className="text-sm">For official grant matters, call <strong>0800 60 10 11</strong> or visit <strong>sassa.gov.za</strong>. We cannot process applications or check grant status for you.</p>
             </CardBody>
          </Card>
        </div>

        <div>
          <Card className="p-8 shadow-2xl border border-gray-100 dark:border-gray-800">
             <CardHeader>
               <h3 className="text-2xl font-bold">Send a Message</h3>
             </CardHeader>
             <CardBody>
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ height: 0, overflow: "hidden" }}>
                       <input
                         tabIndex={-1}
                         autoComplete="off"
                         value={honeypot}
                         onChange={(e) => setHoneypot(e.target.value)}
                       />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                         isRequired
                         label="Full Name"
                         placeholder="Enter your name"
                         variant="bordered"
                         labelPlacement="outside"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <Input
                         isRequired
                         label="Email Address"
                         placeholder="you@example.com"
                         variant="bordered"
                         type="email"
                         labelPlacement="outside"
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                   <Select
                      isRequired
                      label="Subject"
                      placeholder="Select an inquiry type"
                      variant="bordered"
                      labelPlacement="outside"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                   >
                     {subjects.map((sub) => (
                       <SelectItem key={sub.value} value={sub.value}>
                         {sub.label}
                       </SelectItem>
                     ))}
                   </Select>
                   <Textarea
                      isRequired
                      label="Your Message"
                      placeholder="How can we help?"
                      variant="bordered"
                      minRows={6}
                      labelPlacement="outside"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                   />
                     <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        isDisabled={sending}
                        className="font-bold py-6 text-lg"
                        endContent={sending ? undefined : <FaPaperPlane />}
                     >
                        {sending ? <Spinner size="sm" color="current" /> : "Send via Email"}
                     </Button>
                     <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                       This opens your own email app with a message pre-addressed to {SUPPORT_EMAIL}.
                       Nothing is sent automatically — your message only goes to us if you press Send in your email app.
                     </p>
                </form>
             </CardBody>
          </Card>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
               <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">Check your email app</ModalHeader>
               <ModalBody>
                 <p className="text-lg">We have opened a pre-addressed email to {SUPPORT_EMAIL} in your email app with your message included. Nothing has been sent yet — press Send there to reach us, and we will reply within 2 business days. If no email app opened, email us directly at {SUPPORT_EMAIL}.</p>
               </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} className="font-bold">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
