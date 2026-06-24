import React from "react";
import { Controller, useWatch } from "react-hook-form";
import { Sparkles, Users } from "lucide-react";

import { Step3Props } from "../types";

export default function Step3Category({ control, errors, setValue, clearErrors }: Step3Props) {
  const selectedRole = useWatch({
    control,
    name: "role",
  });

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-[#2E2215]">What brings you to FEAG?</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Choose your primary account objective to proceed.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
          Select Your Role
        </label>
        <Controller
          name="role"
          control={control}
          rules={{ required: "Role selection is mandatory" }}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {/* Creator Card */}
              <button
                type="button"
                onClick={() => {
                  field.onChange("creator");
                  clearErrors("role");
                }}
                className={`flex flex-col items-center gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-xl border-2 transition-all duration-300 text-center select-none cursor-pointer ${
                  selectedRole === "creator"
                    ? "bg-primary/5 border-primary ring-4 ring-primary/10"
                    : "bg-white border-border/60 hover:border-border hover:bg-muted/50"
                }`}
              >
                <div className={`p-2 sm:p-2.5 rounded-full transition-colors ${
                  selectedRole === "creator" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  <Sparkles className="size-4 sm:size-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#2E2215]">Showcase My Talent</h3>
                  <p className="text-[9px] sm:text-xs text-muted-foreground mt-1 leading-normal max-w-[180px]">
                    I am a Photographer, Videographer, Singer, or Creative.
                  </p>
                </div>
              </button>

              {/* Customer Card */}
              <button
                type="button"
                onClick={() => {
                  field.onChange("customer");
                  setValue("category", "");
                  clearErrors(["role", "category"]);
                }}
                className={`flex flex-col items-center gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-xl border-2 transition-all duration-300 text-center select-none cursor-pointer ${
                  selectedRole === "customer"
                    ? "bg-primary/5 border-primary ring-4 ring-primary/10"
                    : "bg-white border-border/60 hover:border-border hover:bg-muted/50"
                }`}
              >
                <div className={`p-2 sm:p-2.5 rounded-full transition-colors ${
                  selectedRole === "customer" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  <Users className="size-4 sm:size-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#2E2215]">Hire Creative Talent</h3>
                  <p className="text-[9px] sm:text-xs text-muted-foreground mt-1 leading-normal max-w-[180px]">
                    I want to search, book, and hire creative professionals.
                  </p>
                </div>
              </button>
            </div>
          )}
        />
        {errors.role && (
          <span className="text-xs font-medium text-destructive">{errors.role.message}</span>
        )}
      </div>

      {selectedRole === "creator" && (
        <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
          <label htmlFor="category" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
            Talent Category
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category selection is mandatory" }}
            render={({ field }) => (
              <select
                {...field}
                id="category"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
              >
                <option value="" disabled>Select category option</option>
                <option value="Videographer">Videographer</option>
                <option value="Photographer">Photographer</option>
                <option value="Singer">Singer</option>
              </select>
            )}
          />
          {errors.category && (
            <span className="text-xs font-medium text-destructive">{errors.category.message}</span>
          )}
        </div>
      )}
    </div>
  );
}

