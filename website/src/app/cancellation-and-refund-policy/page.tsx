import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy - FEAG",
  description:
    "Read FEAG's Cancellation & Refund Policy for booking cancellations, rescheduling, refund eligibility, disputes, and processing timelines.",
};

type PolicySection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
};

const sections: PolicySection[] = [
  {
    title: "2. Booking Categories",
    intro: "FEAG currently offers the following booking types:",
    paragraphs: [
      "A. Scheduled Bookings — Creative services booked for a future date and time, including weddings, events, birthdays, corporate shoots, personal shoots, music videos, commercial projects, and similar services.",
      "B. Custom Project Bookings — Projects requiring customized quotations, multiple shooting days, editing, travel, or additional deliverables.",
    ],
  },
  {
    title: "3. User Cancellation Policy",
    paragraphs: [
      "A. Cancellation More Than 72 Hours Before the Service — If a User cancels at least 72 hours before the scheduled booking, 100% of the booking amount will be refunded. Platform convenience fees (if any) may be non-refundable.",
      "B. Cancellation Between 24 and 72 Hours Before the Service — If cancelled between 24 and 72 hours before the scheduled booking, 50% of the booking amount will be refunded. The remaining amount will compensate the Creator for reserving the booking slot.",
      "C. Cancellation Less Than 24 Hours Before the Service — If cancelled within 24 hours before the scheduled service, no refund will be issued. This is because Creators reserve their schedules exclusively for confirmed bookings and may be unable to accept alternative work.",
      "D. No-Show by User — If the User does not arrive, cannot be contacted, refuses to proceed without a valid reason, or is unavailable at the agreed location, the booking shall be considered completed and no refund shall be provided.",
    ],
  },
  {
    title: "4. Creator Cancellation Policy",
    intro: "If a Creator cancels a confirmed booking:",
    items: [
      "FEAG will make reasonable efforts to arrange a suitable replacement Creator.",
      "If a replacement cannot be arranged, the User will receive a 100% refund.",
      "FEAG may also provide promotional credits or discounts for future bookings at its discretion.",
    ],
    paragraphs: [
      "Repeated cancellations by Creators may result in suspension or permanent removal from the Platform.",
    ],
  },
  {
    title: "5. Rescheduling Policy",
    intro: "Users may request to reschedule a booking. Rescheduling requests:",
    items: [
      "More than 72 hours before the booking are generally free, subject to Creator availability.",
      "Within 72 hours are subject to Creator approval.",
      "Within 24 hours may be treated as a cancellation.",
    ],
    paragraphs: [
      "Creators may also request rescheduling due to emergencies. FEAG will assist both parties in finding a mutually convenient alternative.",
    ],
  },
  {
    title: "6. Refund Eligibility",
    intro: "Refunds may be approved in the following situations:",
    items: [
      "Creator fails to appear.",
      "Creator cancels the booking.",
      "FEAG is unable to provide a replacement Creator.",
      "Duplicate payment.",
      "Incorrect payment due to technical issues.",
      "Booking charged despite confirmed cancellation.",
      "Other exceptional situations reviewed by FEAG.",
    ],
    paragraphs: ["Refunds will not be issued for: Change of mind after the cancellation deadline; dissatisfaction based solely on personal artistic preference when services match the agreed deliverables; delays caused by weather, traffic, venue restrictions, or events beyond reasonable control; or failure to cooperate during the shoot."],
  },
  {
    title: "7. Service Quality Concerns",
    paragraphs: [
      "If you are dissatisfied with the quality of the delivered service, you must notify FEAG within 48 hours after the completion of the booking.",
    ],
    intro: "Depending on the circumstances, FEAG may offer:",
    items: ["Partial refund", "Full refund", "Complimentary re-service (where feasible)", "Service credits", "Mediation between User and Creator"],
  },
  {
    title: "8. Deliverable Disputes",
    paragraphs: [
      "Creative work is subjective. Minor differences in editing style, color grading, composition, or artistic interpretation shall not automatically qualify for a refund.",
    ],
    intro: "Refunds relating to deliverables will only be considered where:",
    items: ["Agreed deliverables were not provided", "Substantial portions of the service were incomplete", "The Creator failed to perform the agreed scope of work"],
  },
  {
    title: "9. Refund Processing",
    paragraphs: [
      "Approved refunds will be processed to the original payment method.",
      "Refund processing may take 7–14 business days, depending on your payment provider or bank.",
    ],
  },
  {
    title: "10. Promotional Offers",
    intro: "Bookings made using discount coupons, promotional offers, referral credits, or wallet credits may receive refunds only for the amount actually paid.",
    paragraphs: ["Promotional credits may be reinstated instead of refunded in cash."],
  },
  {
    title: "11. Force Majeure",
    intro: "Neither FEAG nor the Creator shall be liable for cancellations or delays caused by events beyond reasonable control, including but not limited to:",
    items: ["Natural disasters", "Floods", "Earthquakes", "Pandemics", "Government restrictions", "Civil unrest", "War", "Terrorism", "Strikes", "Power failures", "Internet outages", "Venue closures", "Severe weather conditions"],
    paragraphs: ["Where possible, FEAG will assist both parties in rescheduling the booking."],
  },
  {
    title: "12. Fraud & Misuse",
    intro: "FEAG reserves the right to refuse refunds or suspend accounts where it reasonably believes that:",
    items: ["Fraudulent claims are being made", "Repeated abuse of the cancellation policy occurs", "False disputes are raised", "Payments are unauthorized"],
  },
];

function BulletList({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base leading-relaxed text-[#6D5F52]">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export default function CancellationAndRefundPolicyPage() {
  return (
    <main className="flex-1 w-full bg-[#FAF0E6]">
      <section className="w-full max-w-[1100px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-10 border-b border-[#6D5F52]/20 pb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Legal</p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2E2215]">Cancellation &amp; Refund Policy</h1>
          <p className="mt-5 text-sm sm:text-base text-[#6D5F52]"><span className="font-bold text-[#2E2215]">Last Updated:</span> [Insert Date]</p>
        </div>

        <article className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E2215]">1. Introduction</h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">This Cancellation and Refund Policy (&quot;Policy&quot;) governs cancellations, refunds, and rescheduling of services booked through the FEAG platform (&quot;Platform&quot;).</p>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">FEAG is a technology platform that connects customers (&quot;Users&quot;) with independent creative professionals (&quot;Creators&quot;), including but not limited to photographers, videographers, cinematographers, editors, drone operators, makeup artists, designers, and other creative service providers.</p>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">FEAG acts solely as an intermediary facilitating bookings between Users and Creators and does not directly provide creative services. By making a booking on FEAG, you agree to this Cancellation and Refund Policy.</p>
          </section>

          {sections.map((section) => <section key={section.title} className="border-t border-[#6D5F52]/20 pt-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2215]">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">{paragraph}</p>)}
            {section.intro ? <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">{section.intro}</p> : null}
            {section.items ? <BulletList items={section.items} /> : null}
            {section.title === "7. Service Quality Concerns" ? <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">Each request will be reviewed individually.</p> : null}
          </section>)}

          <section className="border-t border-[#6D5F52]/20 pt-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2215]">13. Contact Us</h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">For questions regarding cancellations or refunds, please contact FEAG Support.</p>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">Email: <a href="mailto:support@feag.in" className="font-semibold text-primary hover:text-[#2E2215]">support@feag.in</a></p>
            <p className="text-sm sm:text-base leading-relaxed text-[#6D5F52]">FEAG will make reasonable efforts to respond to all cancellation and refund requests within 2–3 business days.</p>
          </section>
        </article>
      </section>
    </main>
  );
}
