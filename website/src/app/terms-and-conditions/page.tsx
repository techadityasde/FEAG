import type { Metadata } from "next";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions - FEAG",
  description:
    "Read FEAG's Terms & Conditions for using the platform, booking services, provider obligations, payments, cancellations, content, and account rules.",
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsContent />;
}
