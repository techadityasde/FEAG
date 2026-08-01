import type { Metadata } from "next";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy - FEAG",
  description:
    "Read FEAG's Privacy Policy to understand how personal, professional, payment, device, and usage information is collected, used, shared, retained, and protected.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
