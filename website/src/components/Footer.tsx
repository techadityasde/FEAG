import React from "react";
import Link from "next/link";

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
            <li><Link href="/#services" className="hover:text-foreground transition-colors">Photography</Link></li>
            <li><Link href="/#services" className="hover:text-foreground transition-colors">Videography</Link></li>
            <li><Link href="/#services" className="hover:text-foreground transition-colors">Live Music</Link></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#2E2215] text-sm">Quick Links</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            <li><Link href="/join-as-a-professional" className="hover:text-foreground transition-colors">Join as a Professional</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#2E2215] text-sm">Legal</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="hover:text-foreground transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/cancellation-and-refund-policy"
                className="hover:text-foreground transition-colors"
              >
                Cancellation &amp; Refund Policy
              </Link>
            </li>
            <li>
              <Link
                href="/cyber-security"
                className="hover:text-foreground transition-colors"
              >
                Cyber Security
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[#6D5F52]/20 text-center">
        <span className="text-[10px] sm:text-xs text-[#6D5F52]">
          &copy; {new Date().getFullYear()} FEAG Services. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
