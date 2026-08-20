"use client";

import { ChevronDown, ChevronRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

type PolicySection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
  contact?: boolean;
  qualityNote?: boolean;
};

const sections: PolicySection[] = [
  { title: "1. Introduction", paragraphs: ["This Cancellation and Refund Policy (\"Policy\") governs cancellations, refunds, and rescheduling of services booked through the FEAG platform (\"Platform\").", "FEAG is a technology platform that connects customers (\"Users\") with independent creative professionals (\"Creators\"), including but not limited to photographers, videographers, cinematographers, editors, drone operators, makeup artists, designers, and other creative service providers.", "FEAG acts solely as an intermediary facilitating bookings between Users and Creators and does not directly provide creative services. By making a booking on FEAG, you agree to this Cancellation and Refund Policy."] },
  { title: "2. Booking Categories", intro: "FEAG currently offers the following booking types:", paragraphs: ["A. Scheduled Bookings - Creative services booked for a future date and time, including weddings, events, birthdays, corporate shoots, personal shoots, music videos, commercial projects, and similar services.", "B. Custom Project Bookings - Projects requiring customized quotations, multiple shooting days, editing, travel, or additional deliverables."] },
  { title: "3. User Cancellation Policy", paragraphs: ["A. Cancellation More Than 72 Hours Before the Service - If a User cancels at least 72 hours before the scheduled booking, 100% of the booking amount will be refunded. Platform convenience fees (if any) may be non-refundable.", "B. Cancellation Between 24 and 72 Hours Before the Service - If cancelled between 24 and 72 hours before the scheduled booking, 50% of the booking amount will be refunded. The remaining amount will compensate the Creator for reserving the booking slot.", "C. Cancellation Less Than 24 Hours Before the Service - If cancelled within 24 hours before the scheduled service, no refund will be issued. This is because Creators reserve their schedules exclusively for confirmed bookings and may be unable to accept alternative work.", "D. No-Show by User - If the User does not arrive, cannot be contacted, refuses to proceed without a valid reason, or is unavailable at the agreed location, the booking shall be considered completed and no refund shall be provided."] },
  { title: "4. Creator Cancellation Policy", intro: "If a Creator cancels a confirmed booking:", items: ["FEAG will make reasonable efforts to arrange a suitable replacement Creator.", "If a replacement cannot be arranged, the User will receive a 100% refund.", "FEAG may also provide promotional credits or discounts for future bookings at its discretion."], paragraphs: ["Repeated cancellations by Creators may result in suspension or permanent removal from the Platform."] },
  { title: "5. Rescheduling Policy", intro: "Users may request to reschedule a booking. Rescheduling requests:", items: ["More than 72 hours before the booking are generally free, subject to Creator availability.", "Within 72 hours are subject to Creator approval.", "Within 24 hours may be treated as a cancellation."], paragraphs: ["Creators may also request rescheduling due to emergencies. FEAG will assist both parties in finding a mutually convenient alternative."] },
  { title: "6. Refund Eligibility", intro: "Refunds may be approved in the following situations:", items: ["Creator fails to appear.", "Creator cancels the booking.", "FEAG is unable to provide a replacement Creator.", "Duplicate payment.", "Incorrect payment due to technical issues.", "Booking charged despite confirmed cancellation.", "Other exceptional situations reviewed by FEAG."], paragraphs: ["Refunds will not be issued for: Change of mind after the cancellation deadline; dissatisfaction based solely on personal artistic preference when services match the agreed deliverables; delays caused by weather, traffic, venue restrictions, or events beyond reasonable control; or failure to cooperate during the shoot."] },
  { title: "7. Service Quality Concerns", paragraphs: ["If you are dissatisfied with the quality of the delivered service, you must notify FEAG within 48 hours after the completion of the booking."], intro: "Depending on the circumstances, FEAG may offer:", items: ["Partial refund", "Full refund", "Complimentary re-service (where feasible)", "Service credits", "Mediation between User and Creator"], qualityNote: true },
  { title: "8. Deliverable Disputes", paragraphs: ["Creative work is subjective. Minor differences in editing style, color grading, composition, or artistic interpretation shall not automatically qualify for a refund."], intro: "Refunds relating to deliverables will only be considered where:", items: ["Agreed deliverables were not provided", "Substantial portions of the service were incomplete", "The Creator failed to perform the agreed scope of work"] },
  { title: "9. Refund Processing", paragraphs: ["Approved refunds will be processed to the original payment method.", "Refund processing may take upto 7 to 14 working business days, depending on your payment provider or bank."] },
  { title: "10. Promotional Offers", intro: "Bookings made using discount coupons, promotional offers, referral credits, or wallet credits may receive refunds only for the amount actually paid.", paragraphs: ["Promotional credits may be reinstated instead of refunded in cash."] },
  { title: "11. Force Majeure", intro: "Neither FEAG nor the Creator shall be liable for cancellations or delays caused by events beyond reasonable control, including but not limited to:", items: ["Natural disasters", "Floods", "Earthquakes", "Pandemics", "Government restrictions", "Civil unrest", "War", "Terrorism", "Strikes", "Power failures", "Internet outages", "Venue closures", "Severe weather conditions"], paragraphs: ["Where possible, FEAG will assist both parties in rescheduling the booking."] },
  { title: "12. Fraud & Misuse", intro: "FEAG reserves the right to refuse refunds or suspend accounts where it reasonably believes that:", items: ["Fraudulent claims are being made", "Repeated abuse of the cancellation policy occurs", "False disputes are raised", "Payments are unauthorized"] },
  { title: "13. Contact Us", paragraphs: ["For questions regarding cancellations or refunds, please contact FEAG Support.", "FEAG will make reasonable efforts to respond to all cancellation and refund requests within 2 to 3 business days."], contact: true },
];

function BulletList({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-[#D97706]">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export default function CancellationAndRefundPolicyContent() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <main className="flex-1 bg-[#FAF0E6]">
      <section className="relative isolate overflow-hidden px-3 pb-1 pt-3 min-[360px]:px-4 sm:px-6 sm:pb-2 sm:pt-8 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#E29A26]/35 blur-[130px]" />
        <div className="absolute right-[-12rem] top-[18%] h-[28rem] w-[28rem] rounded-full bg-white blur-[100px]" />
        <div className="absolute -bottom-48 -right-32 h-[38rem] w-[38rem] rounded-full bg-[#C88319]/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,154,38,0.24),rgba(255,255,255,0.68)_46%,rgba(200,131,25,0.18))]" />
      </div>

        <header className="mx-auto max-w-4xl px-6 py-4 text-center sm:px-12 sm:py-6">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-[#A95300]"><ShieldCheck className="size-6" aria-hidden="true" /></div>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#A95300] sm:mt-4">FEAG Legal</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2E2215] sm:text-5xl">Cancellation &amp; Refund Policy</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#6D5F52] sm:mt-4 sm:text-base">Review booking cancellations, rescheduling, refund eligibility, disputes, and processing timelines.</p>
          <p className="mt-4 text-xs font-medium text-[#6D5F52]">Last Updated: [Insert Date]</p>
        </header>
      </section>

      <section className="mx-auto mt-2 max-w-4xl px-3 pb-3 pt-0 min-[360px]:px-4 sm:mt-3 sm:px-6 sm:pb-5 sm:pt-0 lg:px-8">
        <div className="space-y-3 sm:space-y-4">
          {sections.map((section) => {
            const isOpen = openSection === section.title;
            const contentId = `cancellation-section-${section.title.split(".")[0]}`;
            return (
              <section key={section.title} className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "border-[#D97706]/35 bg-white shadow-[0_16px_42px_rgba(160,82,0,0.15)]" : "border-[#6D5F52]/20 bg-white shadow-[0_8px_24px_rgba(96,58,18,0.07)] hover:bg-[#FFF9F2]"}`}>
                <button type="button" className="flex w-full items-center gap-3 px-4 py-3 text-left sm:px-5 sm:py-4" aria-expanded={isOpen} aria-controls={contentId} onClick={() => setOpenSection(isOpen ? null : section.title)}>
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isOpen ? "bg-[#F59E0B]/20 text-[#A95300]" : "bg-[#6D5F52]/10 text-[#6D5F52]"}`}><ShieldCheck className="size-4" aria-hidden="true" /></span>
                  <span className="flex-1 font-sans text-lg font-bold leading-tight text-[#2E2215] sm:text-xl">{section.title.replace(/^\d+\.\s*/, "")}</span>
                  {isOpen ? <ChevronDown className="size-4 text-[#A95300]" aria-hidden="true" /> : <ChevronRight className="size-4 text-[#6D5F52]" aria-hidden="true" />}
                </button>
                {isOpen ? <div id={contentId} className="border-t border-[#A95300]/10 px-5 pb-6 pt-5 sm:px-6"><div className="space-y-4 text-sm leading-relaxed text-[#5D5045] sm:text-base">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.intro ? <p>{section.intro}</p> : null}
                  {section.items ? <BulletList items={section.items} /> : null}
                  {section.qualityNote ? <p>Each request will be reviewed individually.</p> : null}
                  {section.contact ? <p>Email: <a href="mailto:support@feag.in" className="font-semibold text-[#A95300] hover:text-[#6D3600]">support@feag.in</a></p> : null}
                </div></div> : null}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
