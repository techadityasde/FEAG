"use client";

import React, { useState } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/pages/Hero";
import Services from "@/components/pages/Services";
import Process from "@/components/pages/Process";
import Testimonials from "@/components/pages/Testimonials";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <Hero />
      <Services />
      <Process />
      <Testimonials />
    </main>
  );
}
