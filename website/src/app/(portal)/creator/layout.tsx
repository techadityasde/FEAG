"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sidebar from "@/components/creator/Sidebar";
import Navbar from "@/components/creator/Navbar";
import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import VerificationPending from "@/components/creator/VerificationPending";
import ProfileSetup from "@/components/creator/ProfileSetup";

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("user", user?.isProfileDone)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["creator"]}>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navbar */}
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-6 bg-muted/20">
            <div className="max-w-7xl mx-auto w-full">
              {!user?.isVerified ? (
                <VerificationPending />
              ) : !user?.isProfileDone ? (
                <ProfileSetup />
              ) : (
                children
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
