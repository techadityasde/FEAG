"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FAQSectionProps } from "../types";

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-white border border-border/50 rounded-2xl p-2 sm:p-8 shadow-sm space-y-6">
      <h2 className="text-xl font-extrabold text-foreground tracking-tight">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all duration-300 bg-[#FDFBF7] ${isOpen
                  ? "border-primary/40 shadow-sm"
                  : "border-border/50 hover:border-primary/20"
                }`}
            >
              <div className="w-full flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground text-left">
                  <HelpCircle className="size-4 text-primary shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <Button
                  variant="ghost"
                  type="button"
                  size="icon-xs"
                  onClick={() => toggleFAQ(idx)}
                  className="size-7 rounded-full shrink-0 cursor-pointer text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                  />
                </Button>
              </div>

              {/* Smooth Animated Answer Block */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: 12 },
                      collapsed: { opacity: 0, height: 0, marginTop: 0 },
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium pl-6 border-l border-primary/20">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
