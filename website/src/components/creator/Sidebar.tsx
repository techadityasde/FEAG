"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  X,
  Briefcase,
  AlertCircle,
  Star,
  Wallet,
  User,
  ChevronRight,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

const navCategories: NavCategory[] = [
  {
    title: "OVERVIEW",
    items: [
      { href: "/creator/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "PROFILE & SERVICES",
    items: [
      { href: "/creator/profile", label: "Profile", icon: User },
      { href: "/creator/portfolio", label: "Portfolio", icon: Briefcase },
      { href: "/creator/packages", label: "Packages", icon: Package },
    ],
  },
  {
    title: "BUSINESS & BOOKINGS",
    items: [
      { href: "/creator/bookings", label: "Bookings", icon: ShoppingBag },
      { href: "/creator/chat", label: "Chat & Messages", icon: MessageSquare },
      { href: "/creator/review", label: "Reviews", icon: Star },
      { href: "/creator/dispute", label: "Disputes", icon: AlertCircle },
    ],
  },
  {
    title: "FINANCIALS",
    items: [
      { href: "/creator/wallet", label: "Wallet", icon: Wallet },
    ],
  },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay with Backdrop Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modern Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-56 bg-white/95 backdrop-blur-md border-r border-slate-200/80 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-56 flex flex-col shadow-xs select-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header with Logo + FEAG */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 shrink-0">
          <Link
            href="/creator/dashboard"
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
          >
            <div className="relative size-8 rounded-lg overflow-hidden border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform">
              <Image
                src="/logo.jpg"
                alt="FEAG Logo"
                width={32}
                height={32}
                priority
                className="size-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-900">
                FEAG
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                Creator
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setIsOpen(false)}
            className="lg:hidden rounded-lg border-slate-200/80 hover:bg-slate-100 text-slate-500"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Navigation Items Categorized */}
        <div className="flex-1 overflow-y-auto py-1 px-3 space-y-3.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navCategories.map((category) => (
            <div key={category.title} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {category.title}
              </div>

              {category.items.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary/15 via-amber-500/10 to-amber-500/5 text-primary border border-primary/20 font-bold shadow-xs"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "size-4.5 transition-transform duration-200 group-hover:scale-110",
                          isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-700"
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="size-3.5 text-primary/70" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Banner Card */}
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-amber-500/10 border border-primary/15 flex items-center gap-3">
          <div className="size-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="size-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">
              Creator Hub
            </h4>
            <p className="text-[10px] text-slate-500 truncate">
              Manage your services & bookings
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
