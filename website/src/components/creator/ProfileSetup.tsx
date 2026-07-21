"use client";

import React, { useState } from "react";
import { UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import PackageSetupStepper from "./PackageSetupStepper";
import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";

export default function ProfileSetup() {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("user", user);

  if (isSettingUp) {
    return <PackageSetupStepper />;
  }

  return (
    <div className="min-h-[74vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
      <div className="size-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
        <UserCog className="size-10" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-3">
        Complete Your Profile
      </h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        You need to set up your profile details before you can start managing
        packages and receiving orders. Let's get everything ready!
      </p>
      <Button
        className="font-semibold px-8"
        size="lg"
        onClick={() => setIsSettingUp(true)}
      >
        Setup Profile Now
      </Button>
    </div>
  );
}
