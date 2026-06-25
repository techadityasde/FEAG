import type { Metadata } from "next";
import AboutUs from "@/components/pages/AboutUs";

export const metadata: Metadata = {
  title: "About Us - FEAG",
  description:
    "Learn how FEAG connects customers with verified creative professionals for photography, videography, live music, and event services.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <AboutUs />
    </main>
  );
}
