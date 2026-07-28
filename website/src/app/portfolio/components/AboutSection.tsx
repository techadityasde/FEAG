import React from "react";
import { UserCheck } from "lucide-react";
import { AboutSectionProps } from "../types";

export default function AboutSection({
  category,
  description,
  location,
}: AboutSectionProps) {
  return (
    <section className="bg-white border border-border/60 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-3">
      <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight capitalize flex items-center gap-2">
        <UserCheck className="size-5 text-primary shrink-0" />
        About {category}
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
        {description} Having executed numerous assignments successfully in {location} and neighboring regions, I bring high passion, technical excellence, and smooth professional execution to every booking.
      </p>
    </section>
  );
}
