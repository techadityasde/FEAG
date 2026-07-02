import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - FEAG",
  description:
    "Read FEAG's Terms & Conditions for using the platform, booking services, provider obligations, payments, cancellations, content, and account rules.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing or using FEAG, you agree to be bound by these Terms & Conditions. If you do not agree with these terms, please do not use the Platform.",
      "These terms apply to all users, including customers, service providers, professionals, creators, and visitors.",
    ],
  },
  {
    title: "2. About FEAG",
    paragraphs: [
      "FEAG operates a technology-driven platform that connects customers seeking creative and event-related services with skilled professionals who offer such services.",
      "FEAG may facilitate discovery, booking, communication, and payment support, but the services are performed by independent professionals unless expressly stated otherwise.",
    ],
  },
  {
    title: "3. User Accounts",
    intro: "To use certain features, you may need to create an account. You agree to:",
    items: [
      "Provide accurate and complete information",
      "Keep your login details secure",
      "Update your account information when needed",
      "Accept responsibility for activity under your account",
      "Notify FEAG of unauthorized access or suspicious activity",
    ],
  },
  {
    title: "4. Customer Responsibilities",
    intro: "Customers using FEAG agree to:",
    items: [
      "Provide accurate booking details",
      "Communicate event requirements clearly",
      "Make payments on time through approved payment methods",
      "Treat professionals respectfully",
      "Avoid misuse, fraud, harassment, or unlawful activity",
    ],
  },
  {
    title: "5. Professional Responsibilities",
    intro: "Service providers and professionals agree to:",
    items: [
      "Provide accurate profile, portfolio, pricing, and availability information",
      "Deliver services with reasonable skill, care, and professionalism",
      "Comply with applicable laws and regulations",
      "Respect customer privacy and event details",
      "Avoid uploading false, misleading, infringing, or inappropriate content",
    ],
  },
  {
    title: "6. Bookings and Service Delivery",
    paragraphs: [
      "Bookings made through FEAG are subject to the details, availability, pricing, and terms shown at the time of booking.",
      "Users are responsible for reviewing booking details before confirming. Any changes to dates, locations, services, or requirements should be communicated promptly through approved channels.",
    ],
  },
  {
    title: "7. Payments",
    paragraphs: [
      "Payments may be processed through third-party payment gateways. FEAG does not store sensitive banking credentials such as card PINs, CVV, UPI PINs, or banking passwords.",
      "By making a payment, you agree to the applicable payment provider terms and authorize the transaction for the selected service.",
    ],
  },
  {
    title: "8. Cancellations and Refunds",
    paragraphs: [
      "Cancellation and refund eligibility may vary depending on the service, timing, provider policy, and booking details.",
      "Where applicable, refunds will be processed through the original payment method or another approved method, subject to payment gateway timelines and deductions permitted by policy.",
    ],
  },
  {
    title: "9. User Content",
    paragraphs: [
      "Users may upload or submit content such as profile details, portfolio images, reviews, messages, and service information.",
      "You retain ownership of your content, but grant FEAG permission to use, display, reproduce, and distribute it as needed to operate, promote, and improve the Platform.",
    ],
  },
  {
    title: "10. Prohibited Activities",
    intro: "You agree not to:",
    items: [
      "Use FEAG for illegal, fraudulent, harmful, or abusive purposes",
      "Impersonate another person or business",
      "Post false, misleading, offensive, or infringing content",
      "Attempt to bypass platform security or payment systems",
      "Scrape, copy, or misuse platform data without permission",
      "Interfere with platform operation or user experience",
    ],
  },
  {
    title: "11. Reviews and Ratings",
    paragraphs: [
      "Reviews and ratings should be honest, relevant, and based on genuine experiences.",
      "FEAG may remove reviews that are fake, abusive, defamatory, discriminatory, promotional, or otherwise violate these terms.",
    ],
  },
  {
    title: "12. Intellectual Property",
    paragraphs: [
      "The FEAG name, branding, interface, design, software, text, graphics, and related platform materials are owned by FEAG or its licensors.",
      "You may not copy, modify, distribute, sell, or exploit platform materials without prior written permission.",
    ],
  },
  {
    title: "13. Third-Party Services",
    paragraphs: [
      "FEAG may include links or integrations with third-party websites, payment providers, social platforms, analytics tools, or other services.",
      "FEAG is not responsible for third-party content, terms, privacy practices, availability, or service quality.",
    ],
  },
  {
    title: "14. Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, FEAG will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.",
      "FEAG does not guarantee uninterrupted access, error-free operation, specific service outcomes, or the conduct of users and independent professionals.",
    ],
  },
  {
    title: "15. Account Suspension or Termination",
    paragraphs: [
      "FEAG may suspend or terminate access to the Platform if a user violates these terms, creates risk for other users, engages in fraud or abuse, or uses the Platform unlawfully.",
      "Users may stop using FEAG at any time and may request account deletion where supported by applicable law and platform policy.",
    ],
  },
  {
    title: "16. Changes to These Terms",
    paragraphs: [
      "FEAG may update these Terms & Conditions from time to time.",
      "Any changes will become effective when posted on the Platform. Continued use of FEAG after changes are posted means you accept the updated terms.",
    ],
  },
  {
    title: "17. Contact Us",
    paragraphs: [
      "If you have any questions, concerns, or requests regarding these Terms & Conditions, you may contact us at:",
    ],
    contact: true,
  },
];

type TermsSection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
  contact?: boolean;
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

export default function TermsAndConditionsPage() {
  return (
    <main className="flex-1 w-full bg-[#FAF0E6]">
      <section className="w-full max-w-[1100px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-10 border-b border-[#6D5F52]/20 pb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Legal</p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2E2215]">
            Terms &amp; Conditions
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
              Terms &amp; Conditions for FEAG
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">
              These Terms &amp; Conditions explain the rules for accessing and using FEAG&apos;s website, mobile application, and related services (collectively, the &quot;Platform&quot;).
            </p>
          </section>

          {sections.map((section: TermsSection) => (
            <section
              key={section.title}
              className="border-t border-[#6D5F52]/20 pt-8 space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2215]">
                {section.title}
              </h2>
              {section.paragraphs ? <Paragraphs paragraphs={section.paragraphs} /> : null}
              {section.intro ? (
                <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">
                  {section.intro}
                </p>
              ) : null}
              {section.items ? <BulletList items={section.items} /> : null}
              {section.contact ? (
                <div className="space-y-2 text-sm sm:text-base leading-relaxed text-[#6D5F52]">
                  <p>
                    <strong className="text-[#2E2215]">FEAG</strong>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:support@feag.com"
                      className="font-semibold text-primary hover:text-[#2E2215]"
                    >
                      support@feag.com
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
