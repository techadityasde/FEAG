"use client";

import { ChevronDown, ChevronRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

type ContentBlock = {
  heading?: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
};

type PolicySection = {
  title: string;
  content?: ContentBlock[];
  intro?: string;
  paragraphs?: string[];
  items?: string[];
  closing?: string;
  contact?: boolean;
};

const sections: PolicySection[] = [
  { title: "1. Information We Collect", content: [
    { heading: "Personal Information", items: ["Full name", "Email address", "Phone number", "Profile photograph", "Date of birth (if required)", "Location (city, state, country)", "Government-issued ID for verification (only where applicable)", "Social media profile links"] },
    { heading: "Professional Information (For Service Providers)", items: ["Portfolio images and videos", "Business name", "Services offered", "Pricing information", "Experience", "Certifications", "Availability schedule", "Work location"] },
    { heading: "Payment Information", paragraphs: ["When payments are processed through third-party payment gateways, we do not store your debit card, credit card, UPI PIN, CVV, or banking passwords.", "Payment processors securely handle this information in accordance with their own privacy policies."] },
    { heading: "Device & Technical Information", intro: "We may automatically collect:", items: ["IP address", "Browser type", "Device information", "Operating system", "Log files", "Cookies", "Analytics data", "Crash reports"] },
    { heading: "Usage Information", intro: "We collect information about how you interact with FEAG, including:", items: ["Pages visited", "Search history", "Profiles viewed", "Bookings", "Messages", "Reviews", "Favorites", "Time spent on pages"] },
  ] },
  { title: "2. How We Use Your Information", intro: "We use your information to:", items: ["Create and manage accounts", "Verify professional identities", "Facilitate bookings", "Process transactions", "Improve platform performance", "Personalize recommendations", "Respond to customer support requests", "Detect fraud and abuse", "Prevent unauthorized access", "Send important account notifications", "Send promotional emails (only where permitted)", "Comply with legal obligations"] },
  { title: "3. Profile Visibility", intro: "Some information you provide is intended to be publicly visible on FEAG, including:", items: ["Name or business name", "Portfolio", "Services", "Ratings", "Reviews", "Experience", "City", "Availability"], paragraphs: ["Please avoid uploading confidential or sensitive information that you do not wish to make public."] },
  { title: "4. Cookies & Tracking Technologies", intro: "FEAG uses cookies and similar technologies to:", items: ["Remember login sessions", "Improve website performance", "Analyze traffic", "Understand user behavior", "Enhance security", "Personalize user experience"], paragraphs: ["You may disable cookies in your browser settings, although some features of FEAG may not function properly."] },
  { title: "5. Information Sharing", paragraphs: ["We do not sell your personal information."], intro: "We may share information with:", items: ["Verified clients and professionals to facilitate bookings", "Payment service providers", "Cloud hosting providers", "Analytics providers", "Customer support services", "Legal authorities when required by law"], closing: "All third parties are expected to maintain appropriate safeguards for personal information." },
  { title: "6. User Communications", intro: "When you communicate through FEAG:", items: ["Messages may be stored to improve support and investigate disputes.", "We may monitor communications to detect spam, fraud, abuse, or illegal activity."], paragraphs: ["Private communications are not publicly displayed unless you choose to post reviews or comments."] },
  { title: "7. Data Security", intro: "We implement reasonable administrative, technical, and organizational measures to protect your information, including:", items: ["Encrypted connections (HTTPS)", "Secure authentication", "Access controls", "Regular security monitoring", "Protected databases"], paragraphs: ["However, no method of transmission or electronic storage is completely secure. We cannot guarantee absolute security."] },
  { title: "8. Data Retention", intro: "We retain your information only for as long as necessary to:", items: ["Provide our services", "Meet legal obligations", "Resolve disputes", "Enforce our agreements"], paragraphs: ["When no longer required, data will be securely deleted or anonymized where appropriate."] },
  { title: "9. Your Rights", intro: "Depending on applicable law, you may have the right to:", items: ["Access your personal information", "Correct inaccurate information", "Delete your account and associated data", "Withdraw consent where processing is based on consent", "Request a copy of your data", "Restrict or object to certain processing activities"], paragraphs: ["To exercise these rights, please contact us using the details provided below."] },
  { title: "10. Account Deletion", paragraphs: ["You may request deletion of your FEAG account at any time."], intro: "Upon receiving your request:", items: ["Your public profile will be removed.", "Personal information will be deleted or anonymized, except where retention is required by law, fraud prevention, dispute resolution, or legitimate business purposes."] },
  { title: "11. Children's Privacy", paragraphs: ["FEAG is not intended for individuals under the age of 18.", "We do not knowingly collect personal information from children. If we become aware that such information has been collected, we will take appropriate steps to remove it."] },
  { title: "12. Third-Party Services", paragraphs: ["Our Platform may contain links to third-party websites, payment providers, or social media platforms.", "We are not responsible for the privacy practices or content of those third parties. We encourage users to review their privacy policies before providing personal information."] },
  { title: "13. International Data Transfers", paragraphs: ["Your information may be processed or stored on servers located in different jurisdictions. Where applicable, we take appropriate measures to ensure that your personal information receives an adequate level of protection."] },
  { title: "14. Changes to This Privacy Policy", paragraphs: ["We may update this Privacy Policy from time to time.", "Any changes will become effective upon posting the revised version on FEAG. Continued use of the Platform after changes are posted constitutes acceptance of the updated Privacy Policy."] },
  { title: "15. Contact Us", paragraphs: ["If you have any questions, concerns, or requests regarding this Privacy Policy, you may contact us at:"], contact: true },
  { title: "16. Consent", paragraphs: ["By creating an account or using FEAG, you acknowledge that you have read, understood, and agree to this Privacy Policy."] },
];

function BulletList({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-[#D97706]">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  return (
    <div className="space-y-3">
      {block.heading ? <h3 className="text-base font-extrabold tracking-[-0.02em] text-[#2E2215] sm:text-lg">{block.heading}</h3> : null}
      {block.intro ? <p>{block.intro}</p> : null}
      {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {block.items ? <BulletList items={block.items} /> : null}
    </div>
  );
}

export default function PrivacyPolicyContent() {
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
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#2E2215] sm:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#6D5F52] sm:text-base">Understand how FEAG collects, uses, and protects your information while you use our platform.</p>
          <p className="mt-4 text-xs font-medium text-[#6D5F52]">Effective Date: [Insert Date] &nbsp;•&nbsp; Last Updated: [Insert Date]</p>
        </header>

        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {sections.map((section) => {
            const isOpen = openSection === section.title;
            const contentId = `privacy-section-${section.title.split(".")[0]}`;
            return (
              <section key={section.title} className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "border-[#D97706]/35 bg-white/85 shadow-[0_16px_42px_rgba(160,82,0,0.15)]" : "border-white/80 bg-white/60 shadow-[0_8px_24px_rgba(96,58,18,0.07)] hover:bg-white/80"}`}>
                <button type="button" className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6" aria-expanded={isOpen} aria-controls={contentId} onClick={() => setOpenSection(isOpen ? null : section.title)}>
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${isOpen ? "bg-[#F59E0B]/20 text-[#A95300]" : "bg-[#6D5F52]/10 text-[#6D5F52]"}`}><ShieldCheck className="size-[18px]" aria-hidden="true" /></span>
                  <span className="flex-1 text-[1.15rem] font-extrabold leading-tight tracking-[-0.035em] text-[#2E2215] sm:text-[1.35rem]">{section.title.replace(/^\d+\.\s*/, "")}</span>
                  {isOpen ? <ChevronDown className="size-5 text-[#A95300]" aria-hidden="true" /> : <ChevronRight className="size-5 text-[#6D5F52]" aria-hidden="true" />}
                </button>

                {isOpen ? <div id={contentId} className="border-t border-[#A95300]/10 px-5 pb-6 pt-5 sm:px-6"><div className="space-y-4 text-sm leading-relaxed text-[#5D5045] sm:text-base">
                  {section.content?.map((block) => <ContentBlockView key={block.heading} block={block} />)}
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.intro ? <p>{section.intro}</p> : null}
                  {section.items ? <BulletList items={section.items} /> : null}
                  {section.closing ? <p>{section.closing}</p> : null}
                  {section.contact ? <div className="space-y-1"><p className="font-bold text-[#2E2215]">FEAG</p><p>Email: <a href="mailto:privacy@feag.com" className="font-semibold text-[#A95300] hover:text-[#6D3600]">privacy@feag.com</a> <span>(Replace with your official email)</span></p><p>Website: <a href="https://feag.com" className="font-semibold text-[#A95300] hover:text-[#6D3600]">https://feag.com</a> <span>(Replace with your official website)</span></p></div> : null}
                </div></div> : null}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
