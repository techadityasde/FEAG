import type { Metadata } from "next";
import CyberSecurityContent from "./CyberSecurityContent";

export const metadata: Metadata = {
  title: "Cyber Security - FEAG",
  description:
    "Learn how FEAG promotes account security, responsible reporting, fraud prevention, and safer use of the platform.",
};

export default function CyberSecurityPage() {
  return <CyberSecurityContent />;
}
