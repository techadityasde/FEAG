"use client";

import { useState } from "react";
import { PackagePricing, FSPAResult } from "../types";
import { calculateFSPA } from "../utils/fspa";

interface Props {
  onCalculate: (result: FSPAResult) => void;
}

export default function PricingForm({
  onCalculate,
}: Props) {
  const [pricing, setPricing] = useState<PackagePricing>({
    oneHour: 1500,
    twoHour: 2800,
    threeHour: 4000,
  });

  const [error, setError] = useState("");

  const updateValue = (
    key: keyof PackagePricing,
    value: string
  ) => {
    setPricing({
      ...pricing,
      [key]: Number(value),
    });
  };

  const handleCalculate = () => {
    setError("");

    if (
      pricing.oneHour <= 0 ||
      pricing.twoHour <= 0 ||
      pricing.threeHour <= 0
    ) {
      setError("All package prices must be greater than zero.");
      return;
    }

    if (pricing.twoHour <= pricing.oneHour) {
      setError(
        "2 Hour package should be greater than 1 Hour package."
      );
      return;
    }

    if (pricing.threeHour <= pricing.twoHour) {
      setError(
        "3 Hour package should be greater than 2 Hour package."
      );
      return;
    }

    const result = calculateFSPA(pricing);

    onCalculate(result);
  };

  return (
    <div className="rounded-3xl bg-white shadow-xl border border-gray-200 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          FEAG Smart Pricing Algorithm
        </h1>

        <p className="text-gray-500 mt-2">
          Enter creator's package pricing and
          calculate dynamic pricing using FSPA.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* 1 Hour */}

        <div>
          <label className="font-semibold block mb-2">
            1 Hour Package
          </label>

          <div className="relative">

            <span className="absolute left-4 top-3 text-gray-400">
              ₹
            </span>

            <input
              type="number"
              value={pricing.oneHour}
              onChange={(e) =>
                updateValue(
                  "oneHour",
                  e.target.value
                )
              }
              className="w-full border rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 2 Hour */}

        <div>
          <label className="font-semibold block mb-2">
            2 Hour Package
          </label>

          <div className="relative">

            <span className="absolute left-4 top-3 text-gray-400">
              ₹
            </span>

            <input
              type="number"
              value={pricing.twoHour}
              onChange={(e) =>
                updateValue(
                  "twoHour",
                  e.target.value
                )
              }
              className="w-full border rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 3 Hour */}

        <div>
          <label className="font-semibold block mb-2">
            3 Hour Package
          </label>

          <div className="relative">

            <span className="absolute left-4 top-3 text-gray-400">
              ₹
            </span>

            <input
              type="number"
              value={pricing.threeHour}
              onChange={(e) =>
                updateValue(
                  "threeHour",
                  e.target.value
                )
              }
              className="w-full border rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 border border-red-300 p-4 text-red-600">
          {error}
        </div>
      )}

      <button
        onClick={handleCalculate}
        className="mt-8 w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-4"
      >
        Calculate FSPA
      </button>

    </div>
  );
}