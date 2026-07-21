"use client";

import { FSPAResult } from "../types";
import { Package, Clock3, IndianRupee } from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function Step1Packages({ result }: Props) {
  const { packagePricing } = result;

  const packages = [
    {
      hour: "1 Hour Package",
      price: packagePricing.oneHour,
    },
    {
      hour: "2 Hour Package",
      price: packagePricing.twoHour,
    },
    {
      hour: "3 Hour Package",
      price: packagePricing.threeHour,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Package size={26} />
          </div>

          <div>
            <p className="uppercase tracking-widest text-sm text-blue-100">
              STEP 1
            </p>

            <h2 className="text-2xl font-bold">
              Creator Package Pricing
            </h2>
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8">

        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5 mb-8">

          <p className="text-slate-700 leading-7">
            The creator only provides pricing for
            predefined packages. These package prices
            are the starting point of the FEAG Smart
            Pricing Algorithm (FSPA).
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {packages.map((item) => (
            <div
              key={item.hour}
              className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition"
            >

              <div className="flex justify-between items-center mb-5">

                <div className="flex items-center gap-2">

                  <Clock3
                    className="text-blue-600"
                    size={20}
                  />

                  <span className="font-semibold">
                    {item.hour}
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-1 text-4xl font-bold text-blue-700">

                <IndianRupee size={30} />

                {item.price.toLocaleString()}

              </div>

            </div>
          ))}

        </div>

        {/* Explanation */}

        <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200 p-6">

          <h3 className="font-bold text-lg mb-4">
            Why is this important?
          </h3>

          <p className="text-slate-600 leading-8">

            These package prices do not directly tell us
            the price of each individual hour.

            <br />
            <br />

            The FEAG Smart Pricing Algorithm first
            converts these package prices into the cost
            of each additional hour.

            <br />
            <br />

            That becomes the foundation for calculating
            dynamic prices for custom bookings such as
            <strong> 4 Hours</strong>,
            <strong> 4.5 Hours</strong>,
            <strong> 5 Hours</strong>,
            <strong> 8 Hours</strong> or even
            <strong> 12 Hours</strong>.
          </p>

        </div>

      </div>

    </section>
  );
}