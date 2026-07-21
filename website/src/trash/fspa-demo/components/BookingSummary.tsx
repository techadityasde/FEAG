"use client";

import { FSPAResult } from "../types";
import {
  BadgeCheck,
  BadgeIndianRupee,
  CalendarClock,
  Clock3,
  Sparkles,
  TrendingDown,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function BookingSummary({
  result,
}: Props) {
  const generatedHours = result.futureHours.length;

  const lastGeneratedHour =
    generatedHours > 0
      ? result.futureHours[result.futureHours.length - 1].hour
      : 3;

  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <BadgeCheck size={30} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-emerald-100">
              STEP 6.3
            </p>

            <h2 className="text-3xl font-bold">
              Booking Summary
            </h2>

            <p className="text-emerald-100 mt-1">
              Complete overview of the FEAG Smart Pricing Algorithm
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8">

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Multiplier */}

          <SummaryCard
            icon={<TrendingDown className="text-green-600" size={28} />}
            title="Smart Pricing Multiplier"
            value={`${result.geometricMean.toFixed(2)}%`}
            subtitle="Calculated using Geometric Mean"
          />

          {/* Generated Hours */}

          <SummaryCard
            icon={<Clock3 className="text-blue-600" size={28} />}
            title="Future Hours Generated"
            value={`${generatedHours}`}
            subtitle={`Hour 4 → Hour ${lastGeneratedHour}`}
          />

          {/* 5 Hours */}

          <SummaryCard
            icon={<BadgeIndianRupee className="text-purple-600" size={28} />}
            title="5 Hour Booking"
            value={`₹${result.totalFiveHourPrice.toFixed(0)}`}
            subtitle="Complete booking price"
          />

          {/* 4.5 Hours */}

          <SummaryCard
            icon={<CalendarClock className="text-orange-600" size={28} />}
            title="4.5 Hour Booking"
            value={`₹${result.totalFourHalfHourPrice.toFixed(2)}`}
            subtitle="Supports fractional durations"
          />

        </div>

        {/* Features */}

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles
              className="text-amber-500"
              size={30}
            />

            <h3 className="text-2xl font-bold">

              FEAG Smart Pricing Achievements

            </h3>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <Feature text="Creator defines only 1H, 2H and 3H packages." />

            <Feature text="System derives individual hourly prices automatically." />

            <Feature text="Discount trend is analysed mathematically." />

            <Feature text="Geometric Mean creates a smooth pricing multiplier." />

            <Feature text="Unlimited future hours are generated automatically." />

            <Feature text="Supports any custom booking duration." />

            <Feature text="Supports fractional bookings like 4.5 or 7.25 hours." />

            <Feature text="No manual pricing is required after setup." />

          </div>

        </div>

        {/* Success */}

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-10 text-center">

          <BadgeCheck
            className="mx-auto mb-5"
            size={60}
          />

          <h2 className="text-4xl font-black">

            Algorithm Completed Successfully

          </h2>

          <p className="mt-5 text-lg text-green-100 max-w-3xl mx-auto leading-8">

            Starting with only three package prices,
            FEAG can now calculate fair pricing for
            any booking duration while preserving
            the creator's original pricing strategy.

          </p>

        </div>

      </div>

    </section>
  );
}

/* ---------------------------------------------------------------- */

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-4 mb-5">

        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
          {icon}
        </div>

        <h3 className="font-bold text-lg">
          {title}
        </h3>

      </div>

      <h2 className="text-4xl font-black text-slate-800">
        {value}
      </h2>

      <p className="mt-3 text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white p-4 border">

      <BadgeCheck
        className="text-green-600 mt-0.5"
        size={20}
      />

      <p className="text-slate-700">
        {text}
      </p>

    </div>
  );
}