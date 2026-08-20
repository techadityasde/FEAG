import type { Metadata } from "next";
import AboutUs from "@/components/pages/AboutUs";

export const metadata: Metadata = {
  title: "About Us - FEAG",
  description:
    "Discover how FEAG brings customers and talented creative professionals together for every important moment.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <AboutUs />
    </main>
  );
}
