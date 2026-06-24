import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ECE0D4] border-t border-border/40 py-12 text-xs sm:text-sm text-muted-foreground">
      <div className="max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="flex flex-col gap-3">
          <span className="text-xl font-extrabold tracking-wider text-primary select-none">FEAG</span>
          <p className="text-xs sm:text-sm leading-relaxed text-[#6D5F52]">
            Bringing expert creative services right to your doorstep with trust and precision.
          </p>
        </div>

        {/* Services Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#2E2215] text-sm">Services</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#services" className="hover:text-foreground transition-colors">Photography</a></li>
            <li><a href="#services" className="hover:text-foreground transition-colors">Videography</a></li>
            <li><a href="#services" className="hover:text-foreground transition-colors">Live Music</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#2E2215] text-sm">Company</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
            <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#2E2215] text-sm">Legal</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
          </ul>
          <span className="text-[10px] sm:text-xs text-[#6D5F52] mt-4 block">
            &copy; {new Date().getFullYear()} FEAG Services. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
