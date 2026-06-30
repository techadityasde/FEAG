"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout } from "@/lib/store/authSlice";
import { cn } from "@/lib/utils";
import { LocationModal } from "./LocationModal";
import { professionals } from "@/lib/data/professionals";
import Image from "next/image";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const orders = useSelector((state: RootState) => state.orders?.orders || []);
  const location = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfessionals, setFilteredProfessionals] = useState<any[]>([]);

  const isCustomer = isAuthenticated && user?.role === "customer";
  const activeOrdersCount = orders.filter(
    (order: any) => order.status === "active",
  ).length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered =
      e.target.value.length > 0
        ? professionals.filter((professional) =>
          professional.username
            .toLowerCase()
            .includes(e.target.value.toLowerCase()),
        )
        : [];
    setFilteredProfessionals(filtered);
  };

  const SearchDropdown = () =>
    filteredProfessionals.length > 0 ? (
      <div className="absolute top-full mt-2 left-0 w-full bg-white p-2 rounded-lg border border-border shadow-xl max-h-60 overflow-y-auto z-50">
        {filteredProfessionals.map((professional) => (
          <div
            key={professional.id}
            className="mb-1 flex items-center justify-between gap-2 text-sm min-[360px]:text-base text-muted-foreground p-2 hover:bg-muted rounded-md transition-colors"
          >
            <div className="flex items-center gap-2">
              <Image
                src={professional.profileImage}
                alt={professional.username}
                width={22}
                height={22}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-[12px]">
                  {professional.username}
                </span>
              </div>
            </div>
            <div>
              <span className="text-[8px] min-[360px]:text-xs text-muted-foreground bg-primary/30 px-2 py-0.5 rounded-full font-semibold">
                {professional.category}
              </span>
              <Link
                href={`/portfolio/${professional.username}`}
                onClick={() => {
                  setSearchTerm("");
                  setFilteredProfessionals([]);
                }}
                className="ml-2 text-primary text-[10px] min-[360px]:text-xs font-semibold hover:underline"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    ) : searchTerm ? (
      <div className="absolute top-full mt-2 left-0 w-full bg-white p-4 rounded-lg border border-border shadow-xl z-50 text-center text-sm text-muted-foreground">
        No professionals found
      </div>
    ) : null;

  return (
    <>
      {/* Mobile Top Header (replaces standard header on small screens) */}
      <header className="md:hidden w-full bg-background border-b border-border p-4 sticky top-0 z-40 pb-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setLocationModalOpen(true)}
          >
            <div className="bg-primary/10 rounded-full p-2 flex items-center justify-center">
              <MapPin className="size-4 text-primary" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wide text-foreground">
                In 44 minutes
              </span>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="max-w-[180px] truncate">
                  {location.address || "Select Location"}
                </span>
                <ChevronDown className="size-3 ml-1" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isCustomer && (
              <Link
                href="/login"
                className="text-xs font-semibold bg-muted px-4 py-1.5 rounded-full border border-border text-foreground transition-colors hover:bg-muted/80"
              >
                Login
              </Link>
            )}
            {isCustomer && (
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm uppercase shadow-sm border-2 border-background">
                {user?.name?.charAt(0) || <User className="size-4" />}
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for 'Kitchen cleaning'"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground font-medium text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-all"
          />
          <SearchDropdown />
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex w-full border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-40 transition-all duration-200">
        <div className="max-w-[1400px] w-full mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-black tracking-wider text-primary select-none cursor-pointer mr-6"
            >
              FEAG
            </Link>
          </div>
          <Link
            href="/discover"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Discover
          </Link>
          {/* Desktop Search Center */}
          <div className="flex items-center gap-3 w-[50%] mx-auto">
            <button
              onClick={() => setLocationModalOpen(true)}
              className="flex items-center w-1/2 gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30 hover:bg-muted text-sm font-semibold whitespace-nowrap transition-colors"
            >
              <MapPin className="size-4 text-primary shrink-0" />
              <span className="truncate flex-1 text-left">
                {location.address || "Select Address"}
              </span>
              <ChevronDown className="size-4 text-muted-foreground shrink-0" />
            </button>

            <div className="relative w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search professionals, services..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm font-medium placeholder:font-normal"
              />
              <SearchDropdown />
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="flex items-center  gap-4">
            {isCustomer ? (
              <>
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-border shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1",
              pathname === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <div className="font-extrabold text-[16px] leading-none mb-0.5 px-1 bg-foreground text-background rounded-sm tracking-tighter">
              FEAG
            </div>
            <span className="text-[10px] font-semibold">Home</span>
          </Link>

          <Link
            href="/discover"
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1",
              pathname === "/discover"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Compass className="size-5" />
            <span className="text-[10px] font-semibold">Discover</span>
          </Link>

          <Link
            href="/orders"
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 relative",
              pathname === "/orders"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <div className="relative">
              <PackageOpen className="size-5" />
              {activeOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </div>
            <span className="text-[10px] font-semibold">Orders</span>
          </Link>

          <Link
            href={isCustomer ? "/my-account" : "/login"}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1",
              pathname === "/my-account"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <User className="size-5" />
            <span className="text-[10px] font-semibold">Account</span>
          </Link>
        </div>
      </nav>

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
    </>
  );
}
