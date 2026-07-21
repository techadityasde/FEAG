"use client";

import React from "react";
import { Menu, LogOut, User } from "lucide-react";
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
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="size-full object-cover" />
            ) : (
              <User className="size-4 text-primary" />
            )}
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-bold text-foreground leading-none">{user?.fullName}</span>
            <span className="text-[10px] text-muted-foreground mt-1 ml-1 capitalize">{user?.username}</span>
          </div>

        </div>

        <div className="h-6 w-px bg-border mx-1" />

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            dispatch(logout());
            window.location.href = "/login";
          }}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 font-semibold"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
