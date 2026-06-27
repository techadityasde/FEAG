import type { Metadata } from "next";
import { Mail, MessageCircle, PhoneCall } from "lucide-react";

import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - FEAG",
  description:
    "Contact FEAG for support, service questions, booking queries, or platform assistance.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 w-full bg-[#FAF0E6]">
      <section className="w-full max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-primary text-[10px] min-[360px]:text-xs font-bold tracking-wider uppercase border border-primary/10 w-fit mb-5">
              <MessageCircle className="size-3.5" />
              Contact FEAG
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E2215] leading-tight tracking-tight">
              Tell us how we can help.
            </h1>
            <p className="text-xs min-[360px]:text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed max-w-xl">
              Have a booking question, service issue, partnership idea, or platform query? Send us your details and message, and our team will get back to you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-8">
              <div className="bg-white rounded-2xl p-5 border border-border/60 shadow-sm">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Mail className="size-5" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#2E2215]">Share Your Query</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Use the message box to explain your problem, event need, or question in detail.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-border/60 shadow-sm">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <PhoneCall className="size-5" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#2E2215]">We&apos;ll Follow Up</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Add a reachable email and phone number so our team can respond with the right support.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
