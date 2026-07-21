"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Check if we are on any creator route
  const isCreatorRoute = pathname?.startsWith("/creator");

  return (
    <>
      {!isCreatorRoute && <Navbar />}
      {children}
      {!isCreatorRoute && <Footer />}
    </>
  );
}
