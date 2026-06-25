"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 transition-all duration-200">
      <div className="max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-extrabold tracking-wider text-primary select-none cursor-pointer">
            FEAG
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors py-2">
            About Us
          </Link>
          <Link href="/#services" className="relative text-foreground py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary">
            Services
          </Link>
          <Link href="/#history" className="text-muted-foreground hover:text-foreground transition-colors py-2">
            History
          </Link>
          <Link href="/#support" className="text-muted-foreground hover:text-foreground transition-colors py-2">
            Support
          </Link>
        </nav>

        {/* Right side: Login & Register */}
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2 text-xs font-semibold py-1 h-7 border-border hover:bg-muted text-foreground cursor-pointer">
            <Link href="/login">
              <User className="size-3.5" />
              Login
            </Link>
          </Button>
          <Button asChild size="sm" className="text-xs font-semibold py-1 h-7 text-white bg-primary hover:bg-primary/95 shadow-sm cursor-pointer">
            <Link href="/join-us">Join Us</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md hover:bg-muted text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-foreground hover:bg-muted text-sm font-medium"
          >
            About Us
          </Link>
          <Link
            href="/#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md bg-muted text-primary text-sm font-medium"
          >
            Services
          </Link>
          <Link
            href="/#history"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-foreground hover:bg-muted text-sm font-medium"
          >
            History
          </Link>
          <Link
            href="/#support"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-foreground hover:bg-muted text-sm font-medium"
          >
            Support
          </Link>
          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <Button asChild size="sm" className="w-full justify-center py-1 h-7 text-white bg-primary hover:bg-primary/95 text-xs font-semibold shadow-sm cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
              <Link href="/join-us">Join Us</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full gap-2 justify-center py-1 h-7 border-border text-foreground hover:bg-muted text-xs font-semibold cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
              <Link href="/login">
                <User className="size-3.5" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
