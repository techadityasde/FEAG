"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, LogOut, User, Bell, MessageSquare } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout } from "@/lib/store/authSlice";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 shadow-xs">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden size-9 rounded-xl border-slate-200/80 hover:bg-slate-100 text-slate-600 cursor-pointer"
          aria-label="Toggle Menu"
        >
          <Menu className="size-5" />
        </Button>

        {/* Mobile Brand Logo */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="relative size-7 rounded-lg overflow-hidden border border-slate-200">
            <Image
              src="/logo.jpg"
              alt="FEAG Logo"
              width={28}
              height={28}
              priority
              className="size-full object-cover"
            />
          </div>
          <span className="text-base font-black tracking-tight text-slate-900">
            FEAG
          </span>
        </div>

        {/* Desktop Greeting Header */}
        <div className="hidden lg:flex flex-col">
          <h2 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
            Creator Panel
          </h2>
          <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
            Welcome back, {user?.fullName || "Creator"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Chat / Messages Button */}
        <Button
          asChild
          variant="outline"
          size="icon"
          className="relative size-9 rounded-full border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer group"
          title="Messages"
          aria-label="Messages"
        >
          <Link href="/creator/chat">
            <MessageSquare className="size-4.5 transition-transform group-hover:scale-105" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-primary ring-2 ring-white animate-pulse" />
          </Link>
        </Button>

        {/* Notifications Button */}
        <Button
          variant="outline"
          size="icon"
          className="relative size-9 rounded-full border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer group"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="size-4.5 transition-transform group-hover:scale-105" />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </Button>

        <div className="h-5 w-px bg-slate-200" />

        {/* Profile Info Badge */}
        <div className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/60 transition-colors">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="size-full object-cover"
              />
            ) : (
              <User className="size-4 text-primary" />
            )}
          </div>
          <div className="hidden sm:flex flex-col items-start min-w-0">
            <span className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[130px]">
              {user?.fullName || "Creator User"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium leading-none capitalize truncate max-w-[130px]">
              {user?.username ? `@${user.username}` : "Creator"}
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200" />

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            dispatch(logout());
            window.location.href = "/login";
          }}
          className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 gap-1.5 font-semibold text-xs rounded-xl px-2.5 sm:px-3 border border-transparent hover:border-rose-200/60 transition-all cursor-pointer"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
