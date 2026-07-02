import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - FEAG",
  description:
    "Read FEAG's Privacy Policy to understand how personal, professional, payment, device, and usage information is collected, used, shared, retained, and protected.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        heading: "Personal Information",
        items: [
          "Full name",
          "Email address",
          "Phone number",
          "Profile photograph",
          "Date of birth (if required)",
          "Location (city, state, country)",
          "Government-issued ID for verification (only where applicable)",
          "Social media profile links",
        ],
      },
      {
        heading: "Professional Information (For Service Providers)",
        items: [
          "Portfolio images and videos",
          "Business name",
          "Services offered",
          "Pricing information",
          "Experience",
          "Certifications",
          "Availability schedule",
          "Work location",
        ],
      },
      {
        heading: "Payment Information",
        paragraphs: [
          "When payments are processed through third-party payment gateways, we do not store your debit card, credit card, UPI PIN, CVV, or banking passwords.",
          "Payment processors securely handle this information in accordance with their own privacy policies.",
        ],
      },
      {
        heading: "Device & Technical Information",
        intro: "We may automatically collect:",
        items: [
          "IP address",
          "Browser type",
          "Device information",
          "Operating system",
          "Log files",
          "Cookies",
          "Analytics data",
          "Crash reports",
        ],
      },
      {
        heading: "Usage Information",
        intro: "We collect information about how you interact with FEAG, including:",
        items: [
          "Pages visited",
          "Search history",
          "Profiles viewed",
          "Bookings",
          "Messages",
          "Reviews",
          "Favorites",
          "Time spent on pages",
        ],
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    intro: "We use your information to:",
    items: [
      "Create and manage accounts",
      "Verify professional identities",
      "Facilitate bookings",
      "Process transactions",
      "Improve platform performance",
      "Personalize recommendations",
      "Respond to customer support requests",
      "Detect fraud and abuse",
      "Prevent unauthorized access",
      "Send important account notifications",
      "Send promotional emails (only where permitted)",
      "Comply with legal obligations",
    ],
  },
  {
    title: "3. Profile Visibility",
    intro: "Some information you provide is intended to be publicly visible on FEAG, including:",
    items: [
      "Name or business name",
      "Portfolio",
      "Services",
      "Ratings",
      "Reviews",
      "Experience",
      "City",
      "Availability",
    ],
    paragraphs: [
      "Please avoid uploading confidential or sensitive information that you do not wish to make public.",
    ],
  },
  {
    title: "4. Cookies & Tracking Technologies",
    intro: "FEAG uses cookies and similar technologies to:",
    items: [
      "Remember login sessions",
      "Improve website performance",
      "Analyze traffic",
      "Understand user behavior",
      "Enhance security",
      "Personalize user experience",
    ],
    paragraphs: [
      "You may disable cookies in your browser settings, although some features of FEAG may not function properly.",
    ],
  },
  {
    title: "5. Information Sharing",
    paragraphs: ["We do not sell your personal information."],
    intro: "We may share information with:",
    items: [
      "Verified clients and professionals to facilitate bookings",
      "Payment service providers",
      "Cloud hosting providers",
      "Analytics providers",
      "Customer support services",
      "Legal authorities when required by law",
    ],
    closing:
      "All third parties are expected to maintain appropriate safeguards for personal information.",
  },
  {
    title: "6. User Communications",
    intro: "When you communicate through FEAG:",
    items: [
      "Messages may be stored to improve support and investigate disputes.",
      "We may monitor communications to detect spam, fraud, abuse, or illegal activity.",
    ],
    paragraphs: [
      "Private communications are not publicly displayed unless you choose to post reviews or comments.",
    ],
  },
  {
    title: "7. Data Security",
    intro:
      "We implement reasonable administrative, technical, and organizational measures to protect your information, including:",
    items: [
      "Encrypted connections (HTTPS)",
      "Secure authentication",
      "Access controls",
      "Regular security monitoring",
      "Protected databases",
    ],
    paragraphs: [
      "However, no method of transmission or electronic storage is completely secure. We cannot guarantee absolute security.",
    ],
  },
  {
    title: "8. Data Retention",
    intro: "We retain your information only for as long as necessary to:",
    items: [
      "Provide our services",
      "Meet legal obligations",
      "Resolve disputes",
      "Enforce our agreements",
    ],
    paragraphs: [
      "When no longer required, data will be securely deleted or anonymized where appropriate.",
    ],
  },
  {
    title: "9. Your Rights",
    intro: "Depending on applicable law, you may have the right to:",
    items: [
      "Access your personal information",
      "Correct inaccurate information",
      "Delete your account and associated data",
      "Withdraw consent where processing is based on consent",
      "Request a copy of your data",
      "Restrict or object to certain processing activities",
    ],
    paragraphs: [
      "To exercise these rights, please contact us using the details provided below.",
    ],
  },
  {
    title: "10. Account Deletion",
    paragraphs: ["You may request deletion of your FEAG account at any time."],
    intro: "Upon receiving your request:",
    items: [
      "Your public profile will be removed.",
      "Personal information will be deleted or anonymized, except where retention is required by law, fraud prevention, dispute resolution, or legitimate business purposes.",
    ],
  },
  {
    title: "11. Children's Privacy",
    paragraphs: [
      "FEAG is not intended for individuals under the age of 18.",
      "We do not knowingly collect personal information from children. If we become aware that such information has been collected, we will take appropriate steps to remove it.",
    ],
  },
  {
    title: "12. Third-Party Services",
    paragraphs: [
      "Our Platform may contain links to third-party websites, payment providers, or social media platforms.",
      "We are not responsible for the privacy practices or content of those third parties. We encourage users to review their privacy policies before providing personal information.",
    ],
  },
  {
    title: "13. International Data Transfers",
    paragraphs: [
      "Your information may be processed or stored on servers located in different jurisdictions. Where applicable, we take appropriate measures to ensure that your personal information receives an adequate level of protection.",
    ],
  },
  {
    title: "14. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time.",
      "Any changes will become effective upon posting the revised version on FEAG. Continued use of the Platform after changes are posted constitutes acceptance of the updated Privacy Policy.",
    ],
  },
  {
    title: "15. Contact Us",
    paragraphs: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy, you may contact us at:",
    ],
    contact: true,
  },
  {
    title: "16. Consent",
    paragraphs: [
      "By creating an account or using FEAG, you acknowledge that you have read, understood, and agree to this Privacy Policy.",
    ],
  },
];

type ContentBlock = {
  heading?: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base leading-relaxed text-[#6D5F52]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">
          {paragraph}
        </p>
      ))}
    </>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  return (
    <div className="space-y-3">
      {block.heading ? (
        <h3 className="text-base sm:text-lg font-bold text-[#2E2215]">{block.heading}</h3>
      ) : null}
      {block.intro ? (
        <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">{block.intro}</p>
      ) : null}
      {block.paragraphs ? <Paragraphs paragraphs={block.paragraphs} /> : null}
      {block.items ? <BulletList items={block.items} /> : null}
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 w-full bg-[#FAF0E6]">
      <section className="w-full max-w-[1100px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-10 border-b border-[#6D5F52]/20 pb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Legal</p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2E2215]">
            Privacy Policy
          </h1>
          <div className="mt-5 space-y-1 text-sm sm:text-base text-[#6D5F52]">
            <p>
              <span className="font-bold text-[#2E2215]">Effective Date:</span> [Insert Date]
            </p>
            <p>
              <span className="font-bold text-[#2E2215]">Last Updated:</span> [Insert Date]
            </p>
          </div>
        </div>

        <article className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E2215]">
              Privacy Policy for FEAG
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">
              At FEAG, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and related services (collectively, the &quot;Platform&quot;).
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">
              By accessing or using FEAG, you agree to the practices described in this Privacy Policy.
            </p>
          </section>

          {sections.map((section) => (
            <section
              key={section.title}
              className="border-t border-[#6D5F52]/20 pt-8 space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2215]">
                {section.title}
              </h2>
              {"content" in section && section.content ? (
                <div className="space-y-6">
                  {section.content.map((block) => (
                    <ContentBlockView key={block.heading} block={block} />
                  ))}
                </div>
              ) : null}
              {"paragraphs" in section && section.paragraphs ? (
                <Paragraphs paragraphs={section.paragraphs} />
              ) : null}
              {"intro" in section && section.intro ? (
                <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">
                  {section.intro}
                </p>
              ) : null}
              {"items" in section && section.items ? <BulletList items={section.items} /> : null}
              {"closing" in section && section.closing ? (
                <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">
                  {section.closing}
                </p>
              ) : null}
              {"contact" in section && section.contact ? (
                <div className="space-y-2 text-sm sm:text-base leading-relaxed text-[#6D5F52]">
                  <p>
                    <strong className="text-[#2E2215]">FEAG</strong>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:privacy@feag.com"
                      className="font-semibold text-primary hover:text-[#2E2215]"
                    >
                      privacy@feag.com
                    </a>{" "}
                    <span>(Replace with your official email)</span>
                  </p>
                  <p>
                    Website:{" "}
                    <a
                      href="https://feag.com"
                      className="font-semibold text-primary hover:text-[#2E2215]"
                    >
                      https://feag.com
                    </a>{" "}
                    <span>(Replace with your official website)</span>
                  </p>
                </div>
              ) : null}
            </section>
          ))}
        </article>
      </section>
    </main>
  );
}
