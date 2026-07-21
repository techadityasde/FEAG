"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { 
  BarChart3, 
  Users, 
  IndianRupee, 
  ArrowUpRight,
  Clock
} from "lucide-react";

export default function CreatorDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || "Creator"}!
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Here's what's happening with your profile today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Cards placeholder */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Total Earnings</span>
            <div className="size-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <IndianRupee className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black">₹45,200</span>
            <span className="text-xs font-semibold text-emerald-500 flex items-center">
              <ArrowUpRight className="size-3" /> +12.5%
            </span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Active Bookings</span>
            <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black">4</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Profile Views</span>
            <div className="size-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <BarChart3 className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black">1,245</span>
            <span className="text-xs font-semibold text-emerald-500 flex items-center">
              <ArrowUpRight className="size-3" /> +5.2%
            </span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">New Inquiries</span>
            <div className="size-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Users className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black">12</span>
          </div>
        </div>
      </div>

      {/* Main Content Area Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground font-medium">Recent Activity Chart Placeholder</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
          <h3 className="font-bold text-foreground mb-4">Upcoming Bookings</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
            <p className="text-sm text-muted-foreground font-medium">No upcoming bookings this week.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
