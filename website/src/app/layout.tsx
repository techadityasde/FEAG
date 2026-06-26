import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomToaster from "@/components/CustomToaster";
import Providers from "@/components/Providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FEAG - Empowering Ambitious Generation",
  description:
    "FEAG (Empowering Ambitious Generation) and its affiliates (collectively, “FEAG”, “we”, “our”, or “us”) operate a technology-driven platform that connects customers seeking creative and event-related services with skilled professionals who offer such services. Through our web based solutions, customers can discover, book, and hire photographers, videographers, singers, and other creative professionals for personal, social, and business events. FEAG facilitates seamless interactions between customers and service providers, enabling service discovery, booking, communication, and payment management through a secure and user-friendly platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <CustomToaster />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
