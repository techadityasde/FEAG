"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, X, Heart, Receipt, LogOut, PackageOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout } from "@/lib/store/authSlice";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const orders = useSelector((state: RootState) => state.orders?.orders || []);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const isCustomer = isAuthenticated && user?.role === "customer";
  const activeOrdersCount = orders.filter(order => order.status === "active").length;

  const navLinks = [
    { name: "Home", href: "/" },
    // { name: "Discover", href: "/discover" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

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
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative text-foreground py-2 transition-colors hover:text-primary",
                  isActive && "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {isCustomer ? (
            <>
              {/* Active Orders Icon */}
              {/* <Link href="/orders" className="relative p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center mr-1">
                <PackageOpen className="size-5 text-foreground/80 hover:text-foreground transition-colors" />
                {activeOrdersCount > 0 && (
                  <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-white shadow-sm border-2 border-background">
                    {activeOrdersCount}
                  </span>
                )}
              </Link> */}

              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer py-1 px-3 rounded-full border border-border/50 hover:bg-muted transition-colors bg-white shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs uppercase">
                    {user?.name?.charAt(0) || <User className="size-3.5" />}
                  </div>
                  <span className="text-sm font-bold text-foreground max-w-[100px] truncate">
                    {user?.name}
                  </span>
                </div>

                {/* Dropdown Popover */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50 min-w-[200px]">
                  <div className="bg-card border border-border rounded-xl shadow-xl py-2 flex flex-col overflow-hidden">
                    <div className="px-4 py-2 border-b border-border mb-1">
                      <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email || user?.mobile}</p>
                    </div>
                    <Link href="/my-account" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-2 transition-colors">
                      <User className="size-4" />
                      My Account
                    </Link>
                    <Link href="/transactions" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-2 transition-colors">
                      <Receipt className="size-4" />
                      Transactions
                    </Link>
                    <Link href="/wishlist" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-2 transition-colors">
                      <Heart className="size-4" />
                      Wishlist
                    </Link>
                    <Link href="/orders" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-2 transition-colors">
                      <PackageOpen className="size-4" />
                      Orders
                    </Link>
                    <div className="h-px bg-border my-1 mx-2" />
                    <button
                      onClick={() => dispatch(logout())}
                      className="px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/10 flex items-center gap-2 text-left w-full cursor-pointer transition-colors"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm" className="gap-2 text-xs font-semibold py-1 h-8 border-border hover:bg-muted text-foreground cursor-pointer shadow-sm rounded-full px-4">
                <Link href="/login">
                  <User className="size-3.5" />
                  Login
                </Link>
              </Button>
              <Button asChild size="sm" className="text-xs font-semibold py-1 h-8 text-white bg-primary hover:bg-primary/95 shadow-sm cursor-pointer rounded-full px-5">
                <Link href="/join-us">Join Us</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md hover:bg-muted text-foreground transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-border flex flex-col gap-2">
            {isCustomer ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-2 py-3 bg-muted/50 rounded-lg mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg uppercase shadow-sm">
                    {user?.name?.charAt(0) || <User className="size-5" />}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-foreground truncate">{user?.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email || user?.mobile}</span>
                  </div>
                </div>
                <Link href="/my-account" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors">
                  <User className="size-4" />
                  My Account
                </Link>
                <Link href="/transactions" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors">
                  <Receipt className="size-4" />
                  Transactions
                </Link>
                <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors">
                  <Heart className="size-4" />
                  Wishlist
                </Link>
                <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-3">
                    <PackageOpen className="size-4" />
                    Orders
                  </div>
                  {activeOrdersCount > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-extrabold text-white shadow-sm">
                      {activeOrdersCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout());
                    setMobileMenuOpen(false);
                  }}
                  className="mt-3 px-4 py-2.5 w-full rounded-lg text-sm font-bold text-destructive bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button asChild variant="outline" size="sm" className="w-full justify-center py-2 h-10 border-border text-foreground hover:bg-muted text-sm font-bold cursor-pointer rounded-lg shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/login">
                    <User className="size-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild size="sm" className="w-full justify-center py-2 h-10 text-white bg-primary hover:bg-primary/95 text-sm font-bold shadow-sm cursor-pointer rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/join-us">Join Us</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
