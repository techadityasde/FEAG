"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Menu,
  X,
  Heart,
  Receipt,
  LogOut,
  PackageOpen,
  MapPin,
  Search,
  ChevronDown,
  Compass,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout } from "@/lib/store/authSlice";
import { cn, getDistance } from "@/lib/utils";
import { LocationModal } from "./LocationModal";
import { professionals } from "@/lib/data/professionals";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const professions = [
  "photographer...",
  "videographer...",
  "singer...",
  "cinematic...",
];

const AnimatedPlaceholder = ({ leftClass }: { leftClass: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % professions.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("pointer-events-none absolute inset-y-0 flex items-center overflow-hidden w-[calc(100%-4rem)] text-muted-foreground text-sm font-normal", leftClass, "z-20")}>
      <span className="mr-1">Search</span>
      <div className="flex flex-col justify-center h-full overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="block truncate"
          >
            {professions[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};


export default function Navbar() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const router = useRouter();
  const orders = useSelector((state: RootState) => state.orders?.orders || []);
  const wishlistItems = useSelector((state: RootState) => state.wishlist?.items || []);
  const wishlistCount = wishlistItems.length;
  const location = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isCustomer = isAuthenticated && user?.role === "customer";
  const activeOrdersCount = orders.filter(
    (order: any) => order.status === "active",
  ).length;

  const searchLower = searchTerm.trim().toLowerCase();
  const validCategories = ["photographer", "videographer", "singer", "Cinematic"];
  const matchedCats = validCategories.filter(cat => cat.toLowerCase().includes(searchLower));
  const displayCategories = matchedCats.map(cat => ({
    category: cat,
    count: professionals.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length
  }));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearchFocused(true);
  };

  const SearchDropdown = () =>
    isSearchFocused ? (
      displayCategories.length > 0 ? (
        <div className="absolute top-full mt-2 left-0 w-full bg-white p-2 rounded-lg border border-border shadow-xl max-h-none overflow-y-auto z-50 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {displayCategories.map((item) => (
            <div
              key={item.category}
              className="cursor-pointer flex items-center justify-between gap-2 text-sm min-[360px]:text-base text-muted-foreground py-2.5 px-3 border-b border-border/50 last:border-0 hover:bg-muted rounded-md transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                router.push(`/services/${item.category}`);
                setSearchTerm("");
                setIsSearchFocused(false);
                (document.activeElement as HTMLElement)?.blur();
              }}
            >
              <div className="flex items-center gap-2">
                <Search className="size-4 text-muted-foreground/70" />
                <div className="flex flex-col ml-1">
                  <span className="font-semibold text-sm text-foreground capitalize">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {item.count} {item.count === 1 ? 'user' : 'users'}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-muted-foreground">
                <ArrowRight className="size-4" />
              </div>
            </div>
          ))}
        </div>
      ) : searchTerm ? (
        <div className="absolute top-full mt-2 left-0 w-full bg-white p-4 rounded-lg border border-border shadow-xl z-50 text-center text-sm font-semibold text-muted-foreground">
          No category matched
        </div>
      ) : null
    ) : null;

  return (
    <>
      {/* Mobile Top Header (replaces standard header on small screens) */}
      <header className="md:hidden w-full bg-background border-b border-border p-4 sticky top-0 z-40 pb-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-primary tracking-wider shrink-0">
            <Image
              src="/logo.jpg"
              alt="FEAG Logo"
              width={28}
              height={28}
              className="size-7 object-contain rounded-md"
              priority
            />
            <span>FEAG</span>
          </Link>

          <div
            className="flex items-center gap-1.5 cursor-pointer bg-muted/40 hover:bg-muted/80 px-2.5 py-1.5 rounded-full border border-border/60 transition-colors max-w-[170px] min-[380px]:max-w-[210px] shrink"
            onClick={() => setLocationModalOpen(true)}
          >
            <MapPin className="size-3.5 text-primary shrink-0" fill="currentColor" />
            <span className="text-xs font-semibold text-foreground truncate flex-1">
              {location.address ? location.address.split(',')[0] : "Select Location"}
            </span>
            <ChevronDown className="size-3 text-muted-foreground shrink-0" />
          </div>
          <div className="flex items-center gap-3 relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center p-2 rounded-full bg-muted border border-border"
            >
              {isCustomer ? (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[10px] uppercase">
                  {user?.name?.charAt(0) || <User className="size-3" />}
                </div>
              ) : (
                <Menu className="size-5" />
              )}
            </button>

            {isMobileMenuOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-border rounded-xl shadow-2xl py-2 flex flex-col z-50">
                {isCustomer && (
                  <div className="px-4 py-3 border-b border-border mb-1">
                    <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email || user?.mobile}</p>
                  </div>
                )}

                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors"
                >
                  <Compass className="size-4" />
                  Home
                </Link>

                <Link
                  href="/discover"
                  onClick={closeMobileMenu}
                  className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors"
                >
                  <Search className="size-4" />
                  Discover
                </Link>

                {isCustomer ? (
                  <>
                    <Link
                      href="/orders"
                      onClick={closeMobileMenu}
                      className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors"
                    >
                      <PackageOpen className="size-4" />
                      Orders
                      {activeOrdersCount > 0 && (
                        <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {activeOrdersCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/my-account"
                      onClick={closeMobileMenu}
                      className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors"
                    >
                      <User className="size-4" />
                      My Account
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={closeMobileMenu}
                      className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors"
                    >
                      <Heart className="size-4" />
                      Wishlist
                    </Link>
                    <div className="h-px bg-border my-1 mx-2" />
                    <button
                      onClick={() => {
                        dispatch(logout());
                        closeMobileMenu();
                      }}
                      className="px-4 py-2.5 text-sm font-bold text-destructive hover:bg-destructive/10 flex items-center gap-3 text-left w-full transition-colors"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="h-px bg-border my-1 mx-2" />
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors"
                    >
                      <User className="size-4" />
                      Login
                    </Link>
                    <Link
                      href="/join-us"
                      onClick={closeMobileMenu}
                      className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-3 transition-colors"
                    >
                      <Star className="size-4" />
                      Join Us
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground z-20" />
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={handleSearch}
            onClick={() => setIsSearchFocused(true)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => {
              setSearchTerm("");
              setIsSearchFocused(false);
            }, 200)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground font-medium text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-all relative z-10"
          />
          {!searchTerm && <AnimatedPlaceholder leftClass="left-10" />}
          <SearchDropdown />
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex w-full border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-40 transition-all duration-200">
        <div className="max-w-[1400px] w-full mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-2xl font-black tracking-wider text-primary select-none cursor-pointer mr-6 group"
            >
              <Image
                src="/logo.jpg"
                alt="FEAG Logo"
                width={36}
                height={36}
                className="size-8 sm:size-9 object-contain rounded-lg shadow-2xs group-hover:scale-105 transition-transform"
                priority
              />
              <span>FEAG</span>
            </Link>
          </div>
          <Link
            href="/discover"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors shrink-0"
          >
            Discover
          </Link>
          {/* Desktop Search Center */}
          <div className="flex items-center gap-3 w-[65%] max-w-[720px] mx-auto">
            <button
              onClick={() => setLocationModalOpen(true)}
              className="flex items-center w-[38%] shrink-0 gap-2 px-3.5 py-2 border border-border rounded-xl bg-muted/30 hover:bg-muted text-sm font-semibold whitespace-nowrap transition-colors"
            >
              <MapPin className="size-4 text-primary shrink-0" />
              <span className="truncate flex-1 text-left text-foreground">
                {location.address || "Select Address"}
              </span>
              <ChevronDown className="size-4 text-muted-foreground shrink-0" />
            </button>

            <div className="relative w-[62%] flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground z-20" />
              <input
                type="text"
                placeholder=""
                value={searchTerm}
                onChange={handleSearch}
                onClick={() => setIsSearchFocused(true)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setSearchTerm("");
                    setIsSearchFocused(false);
                  }, 200);
                }}
                className="w-full pl-9 pr-4 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm font-medium relative z-10"
              />
              {!searchTerm && <AnimatedPlaceholder leftClass="left-9" />}
              <SearchDropdown />
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="flex items-center  gap-4">
            {isCustomer ? (
              <>
                <Link
                  href="/wishlist"
                  className="relative p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center"
                >
                  <Heart className="size-5 text-foreground/80 hover:text-foreground transition-colors" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-extrabold text-white shadow-sm border-2 border-background">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/orders"
                  className="relative p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center mr-1"
                >
                  <PackageOpen className="size-5 text-foreground/80 hover:text-foreground transition-colors" />
                  {activeOrdersCount > 0 && (
                    <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-white shadow-sm border-2 border-background">
                      {activeOrdersCount}
                    </span>
                  )}
                </Link>

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
                        <p className="text-sm font-bold text-foreground truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email || user?.mobile}
                        </p>
                      </div>
                      <Link
                        href="/my-account"
                        className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-2 transition-colors"
                      >
                        <User className="size-4" />
                        My Account
                      </Link>
                      <Link
                        href="/transactions"
                        className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-2 transition-colors"
                      >
                        <Receipt className="size-4" />
                        Transactions
                      </Link>
                      <Link
                        href="/wishlist"
                        className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-2 transition-colors"
                      >
                        <Heart className="size-4" />
                        Wishlist
                      </Link>
                      <Link
                        href="/orders"
                        className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary flex items-center gap-2 transition-colors"
                      >
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
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs font-semibold py-1 h-8 border-border hover:bg-muted text-foreground cursor-pointer shadow-sm rounded-full px-4"
                >
                  <Link href="/login">
                    <User className="size-3.5" />
                    Login
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="text-xs font-semibold py-1 h-8 text-white bg-primary hover:bg-primary/95 shadow-sm cursor-pointer rounded-full px-5"
                >
                  <Link href="/join-us">Join Us</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>



      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
    </>
  );
}
