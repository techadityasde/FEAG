import React from "react";
import { Controller } from "react-hook-form";

import { Step2Props } from "../types";

export default function Step2Name({ control, errors, isEmailEditable = true, mobile }: Step2Props) {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-[#2E2215]">Tell us about yourself</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Please share your official name and contact email details.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* First Name Input */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor="firstName" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
            First Name
          </label>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "First Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only alphabetic characters",
              }
            }}
            render={({ field }) => (
              <input
                {...field}
                id="firstName"
                type="text"
                placeholder="First name"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
              />
            )}
          />
          {errors.firstName && (
            <span className="text-xs font-medium text-destructive">{errors.firstName.message}</span>
          )}
        </div>

        {/* Last Name Input */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor="lastName" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
            Last Name
          </label>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: "Last Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only alphabetic characters",
              }
            }}
            render={({ field }) => (
              <input
                {...field}
                id="lastName"
                type="text"
                placeholder="Last name"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
              />
            )}
          />
          {errors.lastName && (
            <span className="text-xs font-medium text-destructive">{errors.lastName.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Phone Number Display (Disabled) */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor="mobile" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
            Phone Number
          </label>
          <div className="flex items-center h-10 rounded-md border border-input bg-transparent overflow-hidden shadow-sm opacity-70">
            <span className="bg-muted text-muted-foreground h-full flex items-center px-3 text-sm border-r border-input font-medium select-none">
              +91
            </span>
            <input
              id="mobile"
              type="text"
              disabled
              value={mobile || ""}
              className="w-full bg-transparent px-3 py-2 text-sm text-foreground outline-none border-none cursor-not-allowed"
            />
          </div>
        </div>

        {/* Email Address Input */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor="email" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
            Email Address
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email",
              }
            }}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                disabled={!isEmailEditable}
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
              />
            )}
          />
          {errors.email && (
            <span className="text-xs font-medium text-destructive">{errors.email.message}</span>
          )}
        </div>
      </div>

      {/* Gender Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
          Gender
        </label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <div className="flex items-center gap-6 h-9">
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                <input
                  type="radio"
                  value="male"
                  checked={field.value === "male"}
                  onChange={field.onChange}
                  className="accent-primary size-4 cursor-pointer"
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                <input
                  type="radio"
                  value="female"
                  checked={field.value === "female"}
                  onChange={field.onChange}
                  className="accent-primary size-4 cursor-pointer"
                />
                Female
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                <input
                  type="radio"
                  value="others"
                  checked={field.value === "others"}
                  onChange={field.onChange}
                  className="accent-primary size-4 cursor-pointer"
                />
                Others
              </label>
            </div>
          )}
        />
        {errors.gender && (
          <span className="text-xs font-medium text-destructive">{errors.gender.message}</span>
        )}
      </div>
    </div>
  );
}
