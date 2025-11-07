import { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { LetsConnectCard } from "@/components/contact/lets-connect-card";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.contact.metadata.title,
  description: pagesConfig.contact.metadata.description,
};

export default function ContactPage() {
  return (
    <div className="contact-page-wrapper w-full min-h-full flex flex-col items-center px-4 pt-4 md:pt-8 pb-4">
      {/* Unified Header */}
      <div className="w-full max-w-7xl mb-6 mt-8 md:mt-12">
        <h1 
          className="text-3xl md:text-4xl font-semibold text-foreground text-center"
          style={{
            fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Get in Touch
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-7xl flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Left side - Form */}
        <div className="flex items-center min-h-0">
          <ContactForm />
        </div>

        {/* Right side - Let's Connect Card */}
        <div className="flex items-center min-h-0">
          <LetsConnectCard />
        </div>
      </div>
    </div>
  );
}
