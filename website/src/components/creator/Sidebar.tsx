"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, X, Briefcase, AlertCircle, Star, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { href: "/creator/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/creator/profile", label: "Profile", icon: User },
  { href: "/creator/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/creator/packages", label: "Packages", icon: Package },
  { href: "/creator/bookings", label: "Bookings", icon: ShoppingBag },
  { href: "/creator/dispute", label: "Dispute", icon: AlertCircle },
  { href: "/creator/review", label: "Review", icon: Star },
  { href: "/creator/wallet", label: "Wallet", icon: Wallet },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-56 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-56 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border shrink-0">
          <Link href="/creator/dashboard" className="px-3 flex items-baseline gap-1.5 transition-opacity hover:opacity-90">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
              FEAG
            </span>
            {/* <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Creator
            </span> */}
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-muted text-muted-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">

          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("size-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
