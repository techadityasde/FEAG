"use client";

import React from "react";
import { Check } from "lucide-react";
import { StepConfig } from "../types";

interface StepIndicatorProps {
  steps: StepConfig[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="relative mb-3 sm:mb-4 select-none">
      {/* Background connector line */}
      <div className="absolute left-[8%] right-[8%] sm:left-[10%] sm:right-[10%] top-3.5 sm:top-4 h-0.5 bg-border/60 -z-0">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step items */}
      <div className="relative z-10 flex items-start justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={step.key}
              type="button"
              disabled={!isCompleted && index > currentStep}
              onClick={() => isCompleted && onStepClick?.(index)}
              className={`flex flex-col items-center gap-1 max-w-[65px] sm:max-w-[110px] transition-all text-center group ${
                isCompleted ? "cursor-pointer" : "cursor-default"
              }`}
            >
              {/* Circle Badge */}
              <div
                className={`flex size-7 sm:size-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-xs"
                    : isActive
                    ? "border-primary bg-primary text-white ring-3 ring-primary/20 shadow-sm scale-105"
                    : "border-border bg-white text-muted-foreground group-hover:border-primary/50"
                }`}
              >
                {isCompleted ? (
                  <Check className="size-3.5 sm:size-4 stroke-[3]" />
                ) : (
                  <Icon className="size-3.5 sm:size-4" />
                )}
              </div>

              {/* Step Text Label */}
              <div className="flex flex-col items-center">
                <span
                  className={`text-[9px] sm:text-xs font-bold leading-tight transition-colors ${
                    isActive
                      ? "text-primary font-extrabold"
                      : isCompleted
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{step.shortTitle}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
