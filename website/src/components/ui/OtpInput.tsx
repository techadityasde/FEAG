"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export default function OtpInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const targetValue = e.target.value;
    const digit = targetValue.replace(/\D/g, "").slice(-1);

    const newDigits = [...digits];
    newDigits[index] = digit;
    const newValue = newDigits.join("");

    onChange(newValue);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    if (newValue.length === length && onComplete) {
      onComplete(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        focusInput(index - 1);
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (pastedData) {
      onChange(pastedData);
      const focusIndex = Math.min(pastedData.length, length - 1);
      focusInput(focusIndex);

      if (pastedData.length === length && onComplete) {
        onComplete(pastedData);
      }
    }
  };

  return (
    <div className={cn("flex items-center justify-between gap-1.5 sm:gap-2 w-full", className)}>
      {Array.from({ length }).map((_, index) => {
        const digit = digits[index] || "";
        const isFilled = Boolean(digit);

        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "size-10 sm:size-11 rounded-lg border text-center text-base sm:text-lg font-extrabold outline-none transition-all duration-200 select-none shadow-2xs",
              error
                ? "border-destructive text-destructive bg-destructive/5 ring-1 ring-destructive/30"
                : isFilled
                ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                : "border-input bg-transparent text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20",
              disabled && "opacity-50 cursor-not-allowed bg-muted"
            )}
          />
        );
      })}
    </div>
  );
}
