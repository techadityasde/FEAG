import React from "react";
import { AboutSectionProps } from "../types";

export default function AboutSection({
  category,
  description,
  location,
}: AboutSectionProps) {
  return (
    <section className="bg-white border border-border/50 rounded-2xl p-2 sm:p-8 shadow-sm space-y-4">
      <h2 className="text-xl font-extrabold text-foreground tracking-tight capitalize">
        About {category}
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
        {description} Having executed numerous events successfully in {location} and neighboring regions, I bring high passion, technical excellence, and smooth execution to the table.
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
        Every project is custom-tailored to suit the precise design requirements and aesthetic preferences of my clients, backed by professional backups, cutting-edge software suites, and absolute commitment to quality.
      </p>
    </section>
  );
}
