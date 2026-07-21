"use client";

import React, { useState, useRef } from "react";
import { RootState } from "@/lib/store/store";
import { useSelector, useDispatch } from "react-redux";
import Editprofile from "@/components/pages/Editprofile";


export default function CreatorProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const locationState = useSelector((state: RootState) => state.location);

  if (!user) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center text-muted-foreground animate-pulse">
        Loading profile data...
      </div>
    );
  }

  const displayLocation = locationState.address || user?.location;

  return (
    <>
      <Editprofile />
    </>
  );
}


