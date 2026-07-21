"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Clock, ShieldAlert, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/lib/store/store";

export default function VerificationPending() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isRefreshing, setIsRefreshing] = useState(false);
  console.log(user)

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // TODO: Integrate API call here to check verification status
      // const response = await checkVerificationStatus();
      // dispatch(updateAuthSlice(response.data));

      // Simulating network delay for now
      await new Promise(resolve => setTimeout(resolve, 1500));
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="size-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
        <Clock className="size-10" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-3">Verification Pending</h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Your creator account is currently under review. Our team is verifying your details. This usually takes 24-48 hours.
      </p>

      <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 flex gap-3 max-w-md mx-auto text-left mb-8">
        <ShieldAlert className="size-5 shrink-0 mt-0.5" />
        <p className="text-sm">
          You will receive an email once your account has been verified and approved for the platform.
        </p>
      </div>

      <Button
        variant="outline"
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="gap-2 font-medium"
      >
        <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin" : ""}`} />
        {isRefreshing ? "Checking Status..." : "Refresh Status"}
      </Button>
    </div>
  );
}
