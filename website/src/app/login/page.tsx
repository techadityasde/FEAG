"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex-1 w-full max-w-md mx-auto px-4 py-8 sm:py-16 flex flex-col justify-center">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/60 shadow-sm flex flex-col gap-5">
        <LoginForm />
      </div>
    </main>
  );
}
