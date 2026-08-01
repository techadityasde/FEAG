"use client";

import React, { useState, useEffect } from "react";
import { User, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/lib/store/authSlice";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface NewUserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mobile?: string;
  prefilledEmail?: string;
  onSuccess?: () => void;
}

export default function NewUserRegistrationModal({
  isOpen,
  onClose,
  mobile = "",
  prefilledEmail = "",
  onSuccess,
}: NewUserRegistrationModalProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: prefilledEmail,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (prefilledEmail) {
      setFormValues((prev) => ({ ...prev, email: prefilledEmail }));
    }
  }, [prefilledEmail]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrs: { [key: string]: string } = {};
    if (!formValues.firstName.trim()) {
      newErrs.firstName = "First name is required";
    }
    if (!formValues.lastName.trim()) {
      newErrs.lastName = "Last name is required";
    }
    if (!formValues.email.trim()) {
      newErrs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      newErrs.email = "Enter a valid email address";
    }

    if (Object.keys(newErrs).length > 0) {
      setFormErrors(newErrs);
      toast.error("Please fill in all required fields.");
      return;
    }

    const fullName = `${formValues.firstName.trim()} ${formValues.lastName.trim()}`;
    const newUserData = {
      mobile,
      email: formValues.email.trim(),
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      fullName,
      name: fullName,
      role: "customer", // Default role customer stored to auth slice
      category: "",
      location: "",
      profileImage: "",
      isProfileDone: true,
      isVerified: true,
    };

    dispatch(login(newUserData as any));
    onClose();
    toast.success("Account created successfully! Welcome to FEAG.");

    if (onSuccess) {
      onSuccess();
    }
    router.push("/my-account");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-border/80 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="size-4.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#2E2215]">Account Not Found</h3>
              <p className="text-[11px] text-muted-foreground">Register yourself to start booking creative talent.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted cursor-pointer transition-colors"
          >
            <X className="size-4.5" />
          </button>
        </div>

        {/* Registration Notice Banner */}
        <div className="mb-3.5 rounded-lg border border-amber-200 bg-amber-50/80 p-2.5 text-xs text-amber-900 flex items-start gap-2">
          <span className="text-sm shrink-0">⚠️</span>
          <p className="leading-snug">
            <strong className="font-bold">You have not registered yet!</strong> Please complete your registration below to start booking professionals.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* First Name & Last Name Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="modal-firstName" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
                First Name <span className="text-destructive">*</span>
              </label>
              <input
                id="modal-firstName"
                type="text"
                placeholder="First name"
                value={formValues.firstName}
                onChange={(e) => {
                  setFormValues((prev) => ({ ...prev, firstName: e.target.value }));
                  setFormErrors((prev) => ({ ...prev, firstName: "" }));
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs sm:text-sm shadow-xs placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
              />
              {formErrors.firstName && (
                <span className="text-[10px] font-semibold text-destructive">{formErrors.firstName}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="modal-lastName" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
                Last Name <span className="text-destructive">*</span>
              </label>
              <input
                id="modal-lastName"
                type="text"
                placeholder="Last name"
                value={formValues.lastName}
                onChange={(e) => {
                  setFormValues((prev) => ({ ...prev, lastName: e.target.value }));
                  setFormErrors((prev) => ({ ...prev, lastName: "" }));
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs sm:text-sm shadow-xs placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
              />
              {formErrors.lastName && (
                <span className="text-[10px] font-semibold text-destructive">{formErrors.lastName}</span>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1">
            <label htmlFor="modal-email" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
              Email Address <span className="text-destructive">*</span>
            </label>
            <input
              id="modal-email"
              type="email"
              placeholder="e.g. name@example.com"
              value={formValues.email}
              onChange={(e) => {
                setFormValues((prev) => ({ ...prev, email: e.target.value }));
                setFormErrors((prev) => ({ ...prev, email: "" }));
              }}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs sm:text-sm shadow-xs placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
            />
            {formErrors.email && (
              <span className="text-[10px] font-semibold text-destructive">{formErrors.email}</span>
            )}
          </div>

          {/* Small link above button to join as professional */}
          <div className="text-center mt-1">
            <p className="text-[11px] text-muted-foreground font-medium">
              Are you a creative talent?{" "}
              <Link
                href="/professional"
                onClick={onClose}
                className="font-bold text-primary hover:text-primary/90 underline inline-flex items-center gap-0.5 transition-colors"
              >
                <Sparkles className="size-3 text-primary inline" />
                Join as a Professional
              </Link>
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/95 text-white font-semibold h-10 cursor-pointer shadow-sm"
          >
            Complete Account & Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
