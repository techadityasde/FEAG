"use client";

import { ChevronDown, ChevronRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

type TermsSection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
  contact?: boolean;
};

const sections: TermsSection[] = [
  { title: "1. Acceptance of Terms", paragraphs: ["By accessing or using FEAG, you agree to be bound by these Terms & Conditions. If you do not agree with these terms, please do not use the Platform.", "These terms apply to all users, including customers, service providers, professionals, creators, and visitors."] },
  { title: "2. About FEAG", paragraphs: ["FEAG operates a technology-driven platform that connects customers seeking creative and event-related services with skilled professionals who offer such services.", "FEAG may facilitate discovery, booking, communication, and payment support, but the services are performed by independent professionals unless expressly stated otherwise."] },
  { title: "3. User Accounts", intro: "To use certain features, you may need to create an account. You agree to:", items: ["Provide accurate and complete information", "Keep your login details secure", "Update your account information when needed", "Accept responsibility for activity under your account", "Notify FEAG of unauthorized access or suspicious activity"] },
  { title: "4. Customer Responsibilities", intro: "Customers using FEAG agree to:", items: ["Provide accurate booking details", "Communicate event requirements clearly", "Make payments on time through approved payment methods", "Treat professionals respectfully", "Avoid misuse, fraud, harassment, or unlawful activity"] },
  { title: "5. Professional/Creator Responsibilities", intro: "Service providers and professionals/creators agree to:", items: ["Provide accurate profile, portfolio, pricing, and availability information", "Deliver services with high quality skills, care, and professionalism", "Follow with applicable laws and regulations", "Respect customer privacy and event details", "Avoid uploading false, misleading, infringing, or inappropriate content"] },
  { title: "6. Third-Party Services", paragraphs: ["FEAG may include links or integrations with third-party websites, payment providers, social platforms, analytics tools, or other services.", "FEAG is not responsible for third-party content, terms, privacy practices, availability, or service quality."] },
  { title: "7. Bookings and Service Delivery", paragraphs: ["Bookings made through FEAG are subject to the details, availability, pricing, and terms shown at the time of booking.", "Users are responsible for reviewing booking details before confirming. Any changes to dates, locations, services, or requirements should be communicated promptly through approved channels."] },
  { title: "8. Payments", paragraphs: ["Payments may be processed through third-party payment gateways. FEAG does not store sensitive banking credentials such as card PINs, CVV, UPI PINs, or banking passwords.", "By making a payment, you agree to the applicable payment provider terms and authorize the transaction for the selected service."] },
  { title: "9. Cancellations and Refunds", paragraphs: ["Cancellation and refund eligibility may vary depending on the service, timing, provider policy, and booking details.", "Where applicable, refunds will be processed through the original payment method or another approved method, subject to payment gateway timelines and deductions permitted by policy."] },
  { title: "10. User Content", paragraphs: ["Users may upload or submit content such as profile details, portfolio images, reviews, messages, and service information.", "You retain ownership of your content, but grant FEAG permission to use, display, reproduce, and distribute it as needed to operate, promote, and improve the Platform."] },
  { title: "11. Prohibited Activities", intro: "You agree not to:", items: ["Use FEAG for illegal, fraudulent, harmful, or abusive purposes", "Impersonate another person or business", "Post false, misleading, offensive, or infringing content", "Attempt to bypass platform security or payment systems", "Scrape, copy, or misuse platform data without permission", "Interfere with platform operation or user experience"] },
  { title: "12. Reviews and Ratings", paragraphs: ["Reviews and ratings should be honest, relevant, and based on genuine experiences.", "FEAG may remove reviews that are fake, abusive, defamatory, discriminatory, promotional, or otherwise violate these terms."] },
  { title: "13. Intellectual Property", paragraphs: ["The FEAG name, branding, interface, design, software, text, graphics, and related platform materials are owned by FEAG or its licensors.", "You may not copy, modify, distribute, sell, or exploit platform materials without prior written permission."] },
  { title: "14. Limitation of Liability", paragraphs: ["To the fullest extent permitted by law, FEAG will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.", "FEAG does not guarantee uninterrupted access, error-free operation, specific service outcomes, or the conduct of users and independent professionals."] },
  { title: "15. Account Suspension or Termination", paragraphs: ["FEAG may suspend or terminate access to the Platform if a user violates these terms, creates risk for other users, engages in fraud or abuse, or uses the Platform unlawfully.", "Users may stop using FEAG at any time and may request account deletion where supported by applicable law and platform policy."] },
  { title: "16. Changes to These Terms", paragraphs: ["FEAG may update these Terms & Conditions from time to time.", "Any changes will become effective when posted on the Platform. Continued use of FEAG after changes are posted means you accept the updated terms."] },
  { title: "17. Contact Us", paragraphs: ["If you have any questions, concerns, or requests regarding these Terms & Conditions, you may contact us at:"], contact: true },
];

function BulletList({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-[#D97706]">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export default function TermsAndConditionsContent() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <main className="relative isolate flex-1 overflow-hidden bg-[#FFF9F2] px-3 py-10 min-[360px]:px-4 sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#F59E0B]/35 blur-[130px]" />
        <div className="absolute right-[-12rem] top-[18%] h-[28rem] w-[28rem] rounded-full bg-white blur-[100px]" />
        <div className="absolute -bottom-48 -right-32 h-[38rem] w-[38rem] rounded-full bg-[#E76F00]/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,185,77,0.22),rgba(255,255,255,0.68)_46%,rgba(230,108,0,0.17))]" />
      </div>

      <section className="mx-auto max-w-4xl">
        <header className="rounded-[2rem] border border-white/70 bg-white/55 px-6 py-10 text-center shadow-[0_20px_60px_rgba(152,82,0,0.12)] backdrop-blur-xl sm:px-12 sm:py-14">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-[#A95300]"><ShieldCheck className="size-6" aria-hidden="true" /></div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#A95300]">FEAG Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#2E2215] sm:text-5xl">Terms &amp; Conditions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#6D5F52] sm:text-base">Review the rules for accessing and using FEAG&apos;s website, mobile application, and related services.</p>
          <p className="mt-4 text-xs font-medium text-[#6D5F52]">Effective Date: [Insert Date] &nbsp;•&nbsp; Last Updated: [Insert Date]</p>
        </header>

        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {sections.map((section) => {
            const isOpen = openSection === section.title;
            const contentId = `terms-section-${section.title.split(".")[0]}`;
            return (
              <section key={section.title} className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "border-[#D97706]/35 bg-white/85 shadow-[0_16px_42px_rgba(160,82,0,0.15)]" : "border-white/80 bg-white/60 shadow-[0_8px_24px_rgba(96,58,18,0.07)] hover:bg-white/80"}`}>
                <button type="button" className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6" aria-expanded={isOpen} aria-controls={contentId} onClick={() => setOpenSection(isOpen ? null : section.title)}>
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${isOpen ? "bg-[#F59E0B]/20 text-[#A95300]" : "bg-[#6D5F52]/10 text-[#6D5F52]"}`}><ShieldCheck className="size-[18px]" aria-hidden="true" /></span>
                  <span className="flex-1 text-[1.15rem] font-extrabold leading-tight tracking-[-0.035em] text-[#2E2215] sm:text-[1.35rem]">{section.title.replace(/^\d+\.\s*/, "")}</span>
                  {isOpen ? <ChevronDown className="size-5 text-[#A95300]" aria-hidden="true" /> : <ChevronRight className="size-5 text-[#6D5F52]" aria-hidden="true" />}
                </button>
                {isOpen ? <div id={contentId} className="border-t border-[#A95300]/10 px-5 pb-6 pt-5 sm:px-6"><div className="space-y-4 text-sm leading-relaxed text-[#5D5045] sm:text-base">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.intro ? <p>{section.intro}</p> : null}
                  {section.items ? <BulletList items={section.items} /> : null}
                  {section.contact ? <div className="space-y-1"><p className="font-bold text-[#2E2215]">FEAG</p><p>Email: <a href="mailto:support@feag.com" className="font-semibold text-[#A95300] hover:text-[#6D3600]">support@feag.com</a> <span>(Replace with your official email)</span></p><p>Website: <a href="https://feag.com" className="font-semibold text-[#A95300] hover:text-[#6D3600]">https://feag.com</a> <span>(Replace with your official website)</span></p></div> : null}
                </div></div> : null}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
