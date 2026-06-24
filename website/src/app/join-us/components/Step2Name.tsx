import React from "react";
import { Controller } from "react-hook-form";

import { Step2Props } from "../types";

export default function Step2Name({ control, errors }: Step2Props) {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-[#2E2215]">What's your name?</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Please share your official name details.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
          Full Name
        </label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Full Name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only alphabetic characters and spaces are allowed",
            }
          }}
          render={({ field }) => (
            <input
              {...field}
              id="name"
              type="text"
              placeholder="Enter your name"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
            />
          )}
        />
        {errors.name && (
          <span className="text-xs font-medium text-destructive">{errors.name.message}</span>
        )}
      </div>
    </div>
  );
}
