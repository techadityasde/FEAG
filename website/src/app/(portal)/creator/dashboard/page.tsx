"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  ArrowUpRight,
  Clock,
  BarChart3,
  Star,
  Sparkles,
  Calendar,
  Plus,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  Briefcase,
  Eye,
  Zap,
  TrendingUp,
  ShieldCheck,
  Wallet,
} from "lucide-react";

interface BookingItem {
  id: string;
  clientName: string;
  avatar: string;
  service: string;
  date: string;
  amount: string;
  status: "Confirmed" | "In-Progress" | "Pending";
}

const recentBookings: BookingItem[] = [
  {
    id: "BK-8041",
    clientName: "Ananya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    service: "Pre-Wedding Shoot (2 Days)",
    date: "Jul 28, 2026",
    amount: "₹35,000",
    status: "Confirmed",
  },
  {
    id: "BK-8039",
    clientName: "Rohan Kapoor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    service: "Commercial Product Shoot",
    date: "Aug 02, 2026",
    amount: "₹18,500",
    status: "In-Progress",
  },
  {
    id: "BK-8032",
    clientName: "Sneha Verma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    service: "Fashion Portfolio Coverage",
    date: "Aug 10, 2026",
    amount: "₹24,000",
    status: "Pending",
  },
];

const monthlyData = [
  { month: "Feb", revenue: 42000, height: "45%" },
  { month: "Mar", revenue: 58000, height: "60%" },
  { month: "Apr", revenue: 75000, height: "78%" },
  { month: "May", revenue: 64000, height: "65%" },
  { month: "Jun", revenue: 92000, height: "90%" },
  { month: "Jul", revenue: 128450, height: "100%" },
];

export default function CreatorDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [timeRange, setTimeRange] = useState<"month" | "quarter" | "year">("month");

  return (
    <div className="space-y-6 pb-6 select-none">
      {/* ================= HERO WELCOME BANNER ================= */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 overflow-hidden shadow-xl border border-slate-700/50">
        {/* Glow backdrop decorative lighting */}
        <div className="absolute -top-12 -right-12 size-64 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 size-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-amber-300 border border-primary/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="size-3.5 text-amber-400" /> Creator Dashboard
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                <ShieldCheck className="size-3 text-emerald-400" /> Verified Pro
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400">{user?.fullName?.split(" ")[0] || "Creator"}</span>! 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Your profile is performing great this month! You have <strong className="text-white">3 upcoming shoot bookings</strong> and <strong className="text-white">2 new client inquiries</strong> waiting for your review.
            </p>
          </div>

          {/* Action Button Group */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              asChild
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 border border-amber-300/60 hover:scale-[1.02] cursor-pointer rounded-xl h-10 px-4"
            >
              <Link href="/creator/wallet">
                <Wallet className="size-4 text-slate-950" />
                <span>Wallet</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border-white/15 h-10 px-4 rounded-xl cursor-pointer"
            >
              <Link href="/creator/chat">
                <MessageSquare className="size-4 text-amber-300" />
                <span>Messages</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ================= 4 STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Earnings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Earnings
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-primary flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
              <IndianRupee className="size-4.5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ₹1,28,450
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px]">
                <ArrowUpRight className="size-3" /> +18.4%
              </span>
              <span className="text-slate-400 font-normal text-[11px]">vs last month</span>
            </div>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active Bookings
            </span>
            <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-200 group-hover:scale-110 transition-transform">
              <Clock className="size-4.5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              6 <span className="text-xs font-bold text-slate-500 font-normal">Shoots</span>
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px]">2 In Progress, 4 Scheduled</span>
            </div>
          </div>
        </div>

        {/* Profile Views */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Profile Views
            </span>
            <div className="size-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center border border-purple-200 group-hover:scale-110 transition-transform">
              <Eye className="size-4.5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              3,840
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px]">
                <ArrowUpRight className="size-3" /> +24.5%
              </span>
              <span className="text-slate-400 font-normal text-[11px]">30 days impressions</span>
            </div>
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Client Rating
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform">
              <Star className="size-4.5 fill-amber-400" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                4.9
              </h3>
              <span className="text-xs font-bold text-slate-400">/ 5.0</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Based on <strong className="text-slate-700 font-bold">48 verified reviews</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT SECTION (CHARTS & UPCOMING BOOKINGS) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Revenue Analytics Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="size-4.5 text-primary" />
                  Revenue & Shoot Performance
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Analytics
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Track your monthly client earnings and booking growth rate
              </p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
              {(["month", "quarter", "year"] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={timeRange === tab ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange(tab)}
                  className={`text-xs font-bold rounded-lg capitalize ${
                    timeRange === tab
                      ? "bg-white text-slate-900 shadow-2xs hover:bg-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab === "month" ? "6 Months" : tab === "quarter" ? "Quarter" : "Year"}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Header Row */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Period</span>
              <span className="text-sm sm:text-base font-black text-slate-900">₹4,59,450</span>
            </div>
            <div className="space-y-0.5 border-x border-slate-200/80 px-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Shoot Payout</span>
              <span className="text-sm sm:text-base font-black text-slate-900">₹21,400</span>
            </div>
            <div className="space-y-0.5 pl-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completion Rate</span>
              <span className="text-sm sm:text-base font-black text-emerald-600">98.4%</span>
            </div>
          </div>

          {/* High-End Visual Bar Chart Render with Horizontal Gridlines */}
          <div className="relative h-60 w-full pt-4 pb-2 px-2">
            {/* Background Dashed Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-4">
              <div className="border-b border-dashed border-slate-200/80 flex justify-between text-[9px] font-bold text-slate-300">
                <span>₹120k</span>
              </div>
              <div className="border-b border-dashed border-slate-200/80 flex justify-between text-[9px] font-bold text-slate-300">
                <span>₹80k</span>
              </div>
              <div className="border-b border-dashed border-slate-200/80 flex justify-between text-[9px] font-bold text-slate-300">
                <span>₹40k</span>
              </div>
              <div className="border-b border-slate-200 flex justify-between text-[9px] font-bold text-slate-300">
                <span>₹0</span>
              </div>
            </div>

            {/* Bars Overlay */}
            <div className="relative z-10 h-full w-full flex items-end justify-between gap-3 sm:gap-6 pb-6">
              {monthlyData.map((d) => {
                const isPeak = d.month === "Jul";
                return (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative"
                  >
                    {/* Hover Floating Card Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -top-12 z-30 transition-all duration-200 transform -translate-y-1 group-hover:translate-y-0 bg-slate-900 text-white p-2 rounded-xl text-center shadow-lg min-w-[70px]">
                      <div className="text-[11px] font-black">₹{d.revenue.toLocaleString()}</div>
                      <div className="text-[9px] text-amber-300 font-semibold">{d.month} Shoot Revenue</div>
                    </div>

                    {/* Peak Month Badge */}
                    {isPeak && (
                      <span className="text-[9px] font-extrabold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full mb-1 animate-bounce">
                        Peak 🔥
                      </span>
                    )}

                    {/* Glowing Bar */}
                    <div className="w-full max-w-[44px] relative flex flex-col justify-end h-full">
                      <div
                        style={{ height: d.height }}
                        className={`w-full rounded-t-2xl transition-all duration-300 relative group-hover:scale-y-[1.03] origin-bottom shadow-sm ${
                          isPeak
                            ? "bg-gradient-to-t from-primary via-amber-500 to-amber-300 shadow-md shadow-primary/25"
                            : "bg-gradient-to-t from-slate-200 via-primary/70 to-primary group-hover:from-primary group-hover:to-amber-400"
                        }`}
                      >
                        {/* Top Cap Light Pill */}
                        <div className="h-1.5 w-full bg-white/40 rounded-t-2xl" />
                      </div>
                    </div>

                    <span className={`text-xs font-bold transition-colors ${
                      isPeak ? "text-primary font-black" : "text-slate-500 group-hover:text-slate-900"
                    }`}>
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Target Progress Footer */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700">Monthly Revenue Goal</span>
                <span className="text-primary font-extrabold">₹1,28,450 / ₹1,50,000 (85%)</span>
              </div>
              {/* Progress Bar Track */}
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full w-[85%] transition-all duration-1000" />
              </div>
            </div>

            <span className="text-[11px] font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs shrink-0 self-start sm:self-center">
              Target almost reached 🎉
            </span>
          </div>
        </div>

        {/* Right 1-Col: Upcoming Shoot Bookings */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="size-4.5 text-primary" />
              Upcoming Shoots
            </h3>
            <Button asChild variant="link" size="sm" className="text-xs font-bold text-primary hover:underline p-0 h-auto">
              <Link href="/creator/bookings">
                <span>View all</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          {/* Bookings List */}
          <div className="space-y-3 flex-1">
            {recentBookings.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={b.avatar}
                      alt={b.clientName}
                      className="size-9 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {b.clientName}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {b.service}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${
                      b.status === "Confirmed"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : b.status === "In-Progress"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] border-t border-slate-100 text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Clock className="size-3 text-slate-400" /> {b.date}
                  </span>
                  <span className="font-bold text-slate-900">{b.amount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <Button
            asChild
            variant="outline"
            className="w-full h-10 rounded-xl border-slate-200/80 hover:bg-slate-50 text-slate-700 text-xs font-bold gap-1.5 cursor-pointer"
          >
            <Link href="/creator/bookings">
              <span>Manage Calendar & Availability</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ================= BOTTOM ROW: PROFILE HEALTH & QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Health Bar */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-primary/5 to-orange-500/10 border border-primary/20 flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
            <Zap className="size-6" />
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Profile Health Score
              </h4>
              <span className="text-xs font-black text-primary">92% High</span>
            </div>
            <p className="text-[11px] text-slate-600 truncate">
              Your profile is optimized for top client search results
            </p>
          </div>
        </div>

        {/* Direct Messages Quick Widget */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
              <MessageSquare className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Unread Client Messages</h4>
              <p className="text-[11px] text-slate-500">2 active client conversations</p>
            </div>
          </div>
          <Button asChild variant="secondary" size="sm" className="rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold shrink-0">
            <Link href="/creator/chat">
              Reply
            </Link>
          </Button>
        </div>

        {/* Portfolio Showcase Quick Widget */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
              <Briefcase className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Portfolio Work</h4>
              <p className="text-[11px] text-slate-500">24 Media items published</p>
            </div>
          </div>
          <Button asChild size="sm" className="rounded-xl text-xs font-bold shrink-0">
            <Link href="/creator/portfolio">
              Add Work
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
