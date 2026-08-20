"use client";

import { ChevronDown, ChevronRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

type SecuritySection = {
  title: string;
  paragraphs?: string[];
  intro?: string;
  items?: string[];
  contact?: { label: string; email: string };
};

const sections: SecuritySection[] = [
  {
    title: "Our Commitment",
    paragraphs: [
      "We continuously work to safeguard user data and platform integrity by implementing industry-standard security practices and monitoring our systems for potential threats.",
    ],
  },
  {
    title: "Account Security",
    intro: "We encourage all users to help protect their accounts by:",
    items: [
      "Keeping your One-Time Password (OTP) confidential and never sharing it with anyone.",
      "Ensuring your registered mobile number and email address remain secure and accessible only to you.",
      "Keeping login credentials confidential",
      "Logging out from shared or public devices",
      "Reporting any suspicious account activity immediately",
    ],
  },
  {
    title: "Data Protection",
    paragraphs: [
      "We take reasonable measures to protect the personal information you share with us. Access to user information is restricted to authorized personnel and is handled in accordance with our Privacy Policy.",
    ],
  },
  {
    title: "Secure Communication",
    paragraphs: [
      "All communication through the FEAG platform should remain professional and respectful. Users should avoid sharing sensitive personal or financial information unless necessary.",
    ],
  },
  {
    title: "Payment Security",
    paragraphs: [
      "Payments made through FEAG are processed using secure payment technologies provided by trusted third-party payment partners. FEAG does not encourage users to share payment information directly with other users outside the platform.",
    ],
  },
  {
    title: "Fraud Prevention",
    intro: "To help maintain a trusted community, FEAG may:",
    items: [
      "Monitor suspicious activities",
      "Review reported accounts or content",
      "Suspend or terminate accounts involved in fraudulent or malicious behavior",
      "Cooperate with law enforcement where required by law",
    ],
  },
  {
    title: "Responsible Disclosure",
    paragraphs: [
      "If you discover a security vulnerability or believe you've identified a potential weakness in our platform, we encourage you to report it responsibly.",
      "We appreciate responsible disclosures and will investigate all legitimate reports promptly.",
    ],
    contact: { label: "Please contact us at", email: "security@feag.in" },
  },
  {
    title: "User Responsibilities",
    intro: "All users are expected to:",
    items: [
      "Keep their account information secure",
      "Use the platform lawfully",
      "Avoid phishing, impersonation, or fraudulent activities",
      "Report suspicious messages or users",
      "Respect the privacy of others",
    ],
  },
  {
    title: "Security Best Practices",
    intro: "To stay safe while using FEAG:",
    items: [
      "Verify professional profiles before making bookings.",
      "Communicate through official FEAG channels whenever possible.",
      "Never share OTPs, passwords, or banking credentials.",
      "Be cautious of unsolicited requests for payments outside the platform.",
      "Report suspicious behavior immediately.",
    ],
  },
  {
    title: "Reporting Security Concerns",
    paragraphs: [
      "If you suspect unauthorized access, account compromise, phishing attempts, or any other security-related issue, please contact our support team immediately.",
    ],
    contact: { label: "Email", email: "support@feag.in" },
  },
];

export default function CyberSecurityContent() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  return (
    <main className="flex-1 bg-[#FAF0E6]">
      <section className="relative isolate overflow-hidden px-3 pb-1 pt-3 min-[360px]:px-4 sm:px-6 sm:pb-2 sm:pt-8 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#E29A26]/35 blur-[130px]" />
        <div className="absolute right-[-12rem] top-[18%] h-[28rem] w-[28rem] rounded-full bg-white blur-[100px]" />
        <div className="absolute -bottom-48 -right-32 h-[38rem] w-[38rem] rounded-full bg-[#C88319]/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,154,38,0.24),rgba(255,255,255,0.68)_46%,rgba(200,131,25,0.18))]" />
      </div>

        <header className="mx-auto max-w-4xl px-6 py-4 text-center sm:px-12 sm:py-6">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-[#A95300]">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#A95300] sm:mt-4">
            FEAG Legal
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2E2215] sm:text-5xl">
            Cyber Security
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#6D5F52] sm:mt-4 sm:text-base">
            Protecting the security and privacy of our users is a priority.
            Explore how we help customers and creative professionals connect
            with confidence.
          </p>
        </header>
      </section>

      <section className="mx-auto mt-2 max-w-4xl px-3 pb-3 pt-0 min-[360px]:px-4 sm:mt-3 sm:px-6 sm:pb-5 sm:pt-0 lg:px-8">
        <div className="space-y-3 sm:space-y-4">
          {sections.map((section) => {
            const isOpen = openSection === section.title;
            const contentId = `security-section-${section.title.toLowerCase().replaceAll(" ", "-")}`;

            return (
              <section
                key={section.title}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#D97706]/35 bg-white shadow-[0_16px_42px_rgba(160,82,0,0.15)]"
                    : "border-[#6D5F52]/20 bg-white shadow-[0_8px_24px_rgba(96,58,18,0.07)] hover:bg-[#FFF9F2]"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3 text-left sm:px-5 sm:py-4"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => setOpenSection(isOpen ? null : section.title)}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isOpen ? "bg-[#F59E0B]/20 text-[#A95300]" : "bg-[#6D5F52]/10 text-[#6D5F52]"}`}
                  >
                    <ShieldCheck className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1 font-sans text-lg font-bold leading-tight text-[#2E2215] sm:text-xl">
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </span>
                  {isOpen ? (
                    <ChevronDown
                      className="size-4 text-[#A95300]"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronRight
                      className="size-4 text-[#6D5F52]"
                      aria-hidden="true"
                    />
                  )}
                </button>

                {isOpen ? (
                  <div
                    id={contentId}
                    className="border-t border-[#A95300]/10 px-5 pb-6 pt-5 sm:px-6"
                  >
                    <div className="space-y-4 text-sm leading-relaxed text-[#5D5045] sm:text-base">
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.intro ? <p>{section.intro}</p> : null}
                      {section.items ? (
                        <ul className="list-disc space-y-2 pl-5 marker:text-[#D97706]">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      {section.contact ? (
                        <p>
                          {section.contact.label}:{" "}
                          <a
                            href={`mailto:${section.contact.email}`}
                            className="font-semibold text-[#A95300] hover:text-[#6D3600]"
                          >
                            {section.contact.email}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
