import type { Metadata } from "next";
import CancellationAndRefundPolicyContent from "./CancellationAndRefundPolicyContent";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy - FEAG",
  description:
    "Read FEAG's Cancellation & Refund Policy for booking cancellations, rescheduling, refund eligibility, disputes, and processing timelines.",
};

export default function CancellationAndRefundPolicyPage() {
  return <CancellationAndRefundPolicyContent />;
}
