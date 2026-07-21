"use client";

import React, { useState } from "react";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Info, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateFSPACustomPrice } from "@/lib/fspa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setPackages } from "@/lib/store/packageSlice";
import { markProfileDone } from "@/lib/store/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PackageState {
  enabled: boolean;
  price: number | "";
}

// Helper toggle component hoisted outside
const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${enabled ? "bg-primary" : "bg-muted-foreground/30"}`}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-4" : "translate-x-0"}`}
    />
  </button>
);

const PackageConfigurator = ({
  title,
  duration,
  features,
  state,
  setState,
  error,
  setError,
}: {
  title: string;
  duration: string;
  features: string[];
  state: PackageState;
  setState: React.Dispatch<React.SetStateAction<PackageState>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 pb-2 border-b border-border">
      <div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary mt-2">
          <Clock className="size-3.5" />
          <span className="text-xs font-bold uppercase tracking-wider">{duration}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full mt-2 sm:mt-0">
        <span className="text-xs font-bold text-secondary-foreground uppercase tracking-wider">Enable</span>
        <Toggle enabled={state.enabled} onChange={() => setState({ ...state, enabled: !state.enabled })} />
      </div>
    </div>

    <div className="grid sm:grid-cols-2 gap-6 pt-1">
      {/* Features (Read-only) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Included Features</h3>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm font-medium text-foreground">
              <Check className="size-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing Config */}
      <div className="space-y-4">
        <div className={`transition-opacity ${state.enabled ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <label className="block text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Your Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground font-semibold">₹</span>
            <input
              type="number"
              value={state.price}
              onChange={(e) => {
                setState({ ...state, price: e.target.value ? Number(e.target.value) : "" });
                if (error) setError("");
              }}
              className={`w-full pl-8 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${error ? "border-destructive focus:ring-destructive" : "border-border"}`}
              placeholder="Enter amount"
            />
          </div>
          {error ? (
            <p className="text-xs text-destructive font-medium mt-2">{error}</p>
          ) : (
            <p className="text-xs text-muted-foreground mt-2">
              This is the amount customers will pay for this package.
            </p>
          )}
        </div>
      </div>
    </div>

    <div className="bg-secondary/50 border border-border rounded-xl p-3 flex gap-3 text-left mt-4">
      <Info className="size-5 shrink-0 mt-0.5 text-primary" />
      <p className="text-sm text-foreground">
        Package details are managed by FEAG. Only pricing and availability can be customized.
      </p>
    </div>
  </div>
);

const SummaryRow = ({ title, duration, state }: { title: string; duration: string; state: PackageState }) => (
  <div className={`flex flex-col sm:flex-row items-center justify-between px-3 py-2 rounded-xl border ${state.enabled ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/20"}`}>
    <div className="flex items-center gap-4 w-full sm:w-auto mb-2 sm:mb-0">
      {state.enabled ? (
        <CheckCircle2 className="size-6 text-primary shrink-0" />
      ) : (
        <XCircle className="size-6 text-muted-foreground shrink-0" />
      )}
      <div>
        <h4 className="font-bold text-foreground text-md">{title} Package</h4>
        {state.enabled && <p className="text-sm text-muted-foreground">Duration: {duration}</p>}
      </div>
    </div>
    <div className="text-left sm:text-right w-full sm:w-auto">
      {state.enabled ? (
        <>
          <div className="font-bold text-md text-foreground">₹{state.price}</div>
          <div className="text-xs font-semibold text-primary uppercase tracking-wider">Enabled</div>
        </>
      ) : (
        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-1">Disabled</div>
      )}
    </div>
  </div>
);

const categoryFeatures = {
  photographer: {
    basic: ["High Resolution Files", "Digital Delivery"],
    professional: ["High Resolution Files", "Digital Delivery", "Priority Delivery", "Advanced Retouching"],
    premium: ["All Pro Features", "Raw Files Included", "Premium Retouching", "Photo Album"],
  },
  videographer: {
    basic: ["1080p Video", "Digital Delivery", "Basic Editing"],
    professional: ["4K Video", "Digital Delivery", "Priority Delivery", "Color Grading"],
    premium: ["All Pro Features", "Raw Footage", "Cinematic Highlight Reel", "Drone Shots (if applicable)"],
  },
  singer: {
    basic: ["Standard Performance", "Own Equipment"],
    professional: ["Extended Performance", "Custom Song Requests", "Premium Audio Setup"],
    premium: ["All Pro Features", "Full Band Setup", "Studio Recording Quality"],
  },
  cinematic: {
    basic: ["Cinematic Short Film", "Basic Color Grading"],
    professional: ["Extended Cinematic Film", "Advanced Color Grading", "Drone Footage"],
    premium: ["All Pro Features", "Raw Footage", "Director's Cut", "Multi-Camera Setup"],
  },
  default: {
    basic: ["High Resolution Files", "Digital Delivery"],
    professional: ["High Resolution Files", "Digital Delivery", "Priority Delivery"],
    premium: ["All Pro Features", "Raw Files Included", "Cinematic Highlight Reel"],
  }
};

export default function PackageSetupStepper() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);

  const [basic, setBasic] = useState<PackageState>({ enabled: true, price: 1500 });
  const [pro, setPro] = useState<PackageState>({ enabled: true, price: 2800 });
  const [premium, setPremium] = useState<PackageState>({ enabled: true, price: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [fspaAgreed, setFspaAgreed] = useState(false);

  const userCategory = useSelector((state: RootState) => state.auth.user?.category)?.toLowerCase();
  const currentFeatures = categoryFeatures[userCategory as keyof typeof categoryFeatures] || categoryFeatures.default;

  const pricing = {
    oneHourPrice: Number(basic.price) || 0,
    twoHourPrice: Number(pro.price) || 0,
    threeHourPrice: Number(premium.price) || 0,
  };

  const hasAllPrices = basic.enabled && pro.enabled && premium.enabled && pricing.oneHourPrice > 0 && pricing.twoHourPrice > 0 && pricing.threeHourPrice > 0;

  const handleNextStep = () => {
    let currentState;
    if (currentStep === 1) currentState = basic;
    else if (currentStep === 2) currentState = pro;
    else if (currentStep === 3) currentState = premium;

    if (currentState && currentState.enabled && (currentState.price === "" || currentState.price <= 0)) {
      setErrorMsg("Price is required to enable this package.");
      return;
    }

    // Price validation: Each package should cost more than the previous enabled one
    if (currentStep === 2 && pro.enabled) {
      const prevPrice = basic.enabled ? Number(basic.price) : 0;
      if (Number(pro.price) <= prevPrice) {
        setErrorMsg(`Price must be strictly greater than the Basic package price (₹${prevPrice}).`);
        return;
      }
    }

    if (currentStep === 3 && premium.enabled) {
      let prevPrice = 0;
      let prevPkgName = "";
      if (pro.enabled) {
        prevPrice = Number(pro.price);
        prevPkgName = "Professional";
      } else if (basic.enabled) {
        prevPrice = Number(basic.price);
        prevPkgName = "Basic";
      }
      
      if (prevPrice > 0 && Number(premium.price) <= prevPrice) {
        setErrorMsg(`Price must be strictly greater than the ${prevPkgName} package price (₹${prevPrice}).`);
        return;
      }
    }

    setErrorMsg("");
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const steps = [
    { id: 1, name: "Basic" },
    { id: 2, name: "Professional" },
    { id: 3, name: "Premium" },
    { id: 4, name: "Review" },
  ];

  const handleComplete = () => {
    const packages = [
      {
        id: "basic",
        title: "Basic",
        duration: "1 Hour",
        price: Number(basic.price) || 0,
        features: currentFeatures.basic,
        enabled: basic.enabled,
      },
      {
        id: "professional",
        title: "Professional",
        duration: "2 Hours",
        price: Number(pro.price) || 0,
        features: currentFeatures.professional,
        enabled: pro.enabled,
      },
      {
        id: "premium",
        title: "Premium",
        duration: "3 Hours",
        price: Number(premium.price) || 0,
        features: currentFeatures.premium,
        enabled: premium.enabled,
      },
    ];
    dispatch(setPackages(packages));
    dispatch(markProfileDone());

    // TODO: Send data to API
    toast.success("Your pricing setup has been done. Please complete your profile also.", {
      duration: 4000,
    });
    router.push("/creator/profile");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PackageConfigurator
            title="Basic Package"
            duration="1 Hour"
            features={currentFeatures.basic}
            state={basic}
            setState={setBasic}
            error={errorMsg}
            setError={setErrorMsg}
          />
        );
      case 2:
        return (
          <PackageConfigurator
            title="Professional Package"
            duration="2 Hours"
            features={currentFeatures.professional}
            state={pro}
            setState={setPro}
            error={errorMsg}
            setError={setErrorMsg}
          />
        );
      case 3:
        return (
          <PackageConfigurator
            title="Premium Package"
            duration="3 Hours"
            features={currentFeatures.premium}
            state={premium}
            setState={setPremium}
            error={errorMsg}
            setError={setErrorMsg}
          />
        );
      case 4:
        let suggestions: { hours: number; price: number }[] = [];
        if (hasAllPrices) {
          suggestions = [
            { hours: 4, price: calculateFSPACustomPrice(pricing, 4).totalPrice },
            { hours: 5, price: calculateFSPACustomPrice(pricing, 5).totalPrice },
            { hours: 8, price: calculateFSPACustomPrice(pricing, 8).totalPrice },
          ];
        }

        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-3">
              <SummaryRow title="Basic" duration="1 Hour" state={basic} />
              <SummaryRow title="Professional" duration="2 Hours" state={pro} />
              <SummaryRow title="Premium" duration="3 Hours" state={premium} />
            </div>

            {hasAllPrices && (
              <div className="border border-primary/20 rounded-xl overflow-hidden mt-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-primary/5 px-3 py-2.5 border-b border-primary/20">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    Smart Custom Pricing (FSPA)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Our algorithm automatically calculates fair pricing for custom bookings longer than 3 hours based on your packages.
                  </p>
                </div>

                <div className="p-2 bg-card grid grid-cols-3 gap-4">
                  {suggestions.map((s) => (
                    <div key={s.hours} className="text-center p-2 rounded-lg bg-secondary/30">
                      <div className="text-xs font-semibold text-muted-foreground uppercase">{s.hours} Hours</div>
                      <div className="font-bold text-lg text-foreground mt-1">₹{s.price}</div>
                    </div>
                  ))}
                </div>

                <div
                  className="p-3 bg-secondary/10 border-t border-primary/10 flex items-start gap-3 cursor-pointer hover:bg-secondary/20 transition-colors"
                  onClick={() => setFspaAgreed(!fspaAgreed)}
                >
                  <div className={`mt-0.5 shrink-0 size-5 rounded border flex items-center justify-center transition-colors ${fspaAgreed ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground bg-background"}`}>
                    {fspaAgreed && <Check className="size-3.5" />}
                  </div>
                  <p className="text-sm font-medium text-foreground select-none">
                    I agree to the FSPA calculated rates for any custom bookings longer than my set packages.
                  </p>
                </div>
              </div>
            )}

            {!hasAllPrices && (
              <div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 rounded-xl p-4 flex gap-3 text-left">
                <Info className="size-5 shrink-0 mt-0.5 text-primary" />
                <p className="text-sm text-foreground">
                  These packages will be visible to customers on your profile after saving.
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Card className="rounded-[18px] border-border bg-card shadow-sm overflow-hidden">
        {/* Stepper Header */}
        <div className="px-6 sm:px-8 pt-3 pb-6 border-b border-border bg-secondary/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-foreground">Package Setup</h2>
            <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
              Step {currentStep} of 4
            </span>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2 z-0"></div>
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>

            <div className="relative z-10 flex justify-between">
              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                const label = step.id === 2 ? "Pro" : step.name;

                return (
                  <div key={step.id} className="relative flex flex-col items-center justify-center">
                    <div
                      className={`size-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${isActive
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : isCompleted
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border-2 border-border text-muted-foreground"
                        }`}
                    >
                      {isCompleted ? <Check className="size-3" /> : step.id}
                    </div>
                    <span
                      className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="px-6 sm:px-8 py-5">
          {renderStepContent()}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 sm:px-8 py-3 border-t border-border bg-secondary/10 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            size="sm"
            className="gap-2 rounded-xl font-semibold border-border text-foreground hover:bg-secondary/50 text-xs"
          >
            <ChevronLeft className="size-3.5" /> Previous
          </Button>

          {currentStep < 4 ? (
            <Button size="sm" onClick={handleNextStep} className="gap-2 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-6 text-xs">
              Next <ChevronRight className="size-3.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleComplete}
              disabled={hasAllPrices && !fspaAgreed}
              className="gap-2 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-6 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="size-3.5" /> Complete Setup
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
