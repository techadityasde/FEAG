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
          <div className="mt-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#A95300]">Social Links</h4>
            <div className="mt-3 flex items-center gap-4">
              <a href="https://www.facebook.com/share/1VZYix369n/" target="_blank" rel="noreferrer" aria-label="Follow FEAG on Facebook" className="flex size-9 items-center justify-center rounded-full bg-[#F59E0B]/15 text-[#A95300] transition-all hover:-translate-y-0.5 hover:bg-[#A95300] hover:text-white"><svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.75l.41-3.2H13.5V8.76c0-.93.26-1.56 1.59-1.56h1.7V4.34A22.7 22.7 0 0 0 14.31 4C11.86 4 10.18 5.5 10.18 8.25v2.55H7.43V14h2.75v8h3.32Z" /></svg></a>
              <a href="https://x.com/FEAG_2026" target="_blank" rel="noreferrer" aria-label="Follow FEAG on X" className="flex size-9 items-center justify-center rounded-full bg-[#F59E0B]/15 text-[#A95300] transition-all hover:-translate-y-0.5 hover:bg-[#A95300] hover:text-white"><svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.24l-4.89-7.46L5.54 22H2.42l7.24-8.28L2 2h6.4l4.42 6.8L18.9 2Zm-1.1 18h1.72L7.47 3.9H5.62L17.8 20Z" /></svg></a>
              <a href="https://www.instagram.com/feag_2026?igsh=MXR1OHMyNDh5ano5dw==" target="_blank" rel="noreferrer" aria-label="Follow FEAG on Instagram" className="flex size-9 items-center justify-center rounded-full bg-[#F59E0B]/15 text-[#A95300] transition-all hover:-translate-y-0.5 hover:bg-[#A95300] hover:text-white"><svg className="size-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" /></svg></a>
              <a href="https://www.linkedin.com/company/feag-engg/" target="_blank" rel="noreferrer" aria-label="Follow FEAG on LinkedIn" className="flex size-9 items-center justify-center rounded-full bg-[#F59E0B]/15 text-[#A95300] transition-all hover:-translate-y-0.5 hover:bg-[#A95300] hover:text-white"><svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.35 3.5A1.85 1.85 0 1 1 5.35 7.2a1.85 1.85 0 0 1 0-3.7ZM3.75 8.65h3.2V20h-3.2V8.65ZM9 8.65h3.07v1.55h.04c.43-.81 1.47-1.66 3.02-1.66 3.23 0 3.83 2.12 3.83 4.88V20h-3.2v-5.82c0-1.39-.03-3.17-1.93-3.17-1.93 0-2.23 1.51-2.23 3.07V20H8.4V8.65H9Z" /></svg></a>
            </div>
          </div>
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
            <li><Link href="/professional" className="hover:text-foreground transition-colors">Join as a Professional</Link></li>
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
