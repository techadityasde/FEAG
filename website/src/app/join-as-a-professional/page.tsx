"use client";

import { useState } from "react";
import { Controller, useForm, useWatch, type Control, type FieldErrors, type RegisterOptions } from "react-hook-form";
import toast from "react-hot-toast";
import { Check, ChevronLeft, MapPin, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProfessionalForm = {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other" | "";
  phone: string;
  email: string;
  otp: string;
  category: string;
  address: string;
  landmark: string;
  locality: string;
  pincode: string;
};

const inputClass = "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary";

export default function JoinAsAProfessional() {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);
  const { control, trigger, getValues, setValue, formState: { errors } } = useForm<ProfessionalForm>({
    mode: "onChange",
    defaultValues: { firstName: "", lastName: "", gender: "", phone: "", email: "", otp: "", category: "", address: "", landmark: "", locality: "", pincode: "" },
  });
  const values = useWatch({ control });
  const canSendOtp = Boolean(values.firstName && values.lastName && values.gender && /^\d{10}$/.test(values.phone || "") && /^\S+@\S+\.\S+$/.test(values.email || ""));
  const canSubmit = Boolean(values.category && values.address && values.landmark && values.locality && /^\d{6}$/.test(values.pincode || ""));

  const sendOtp = async () => {
    if (!await trigger(["firstName", "lastName", "gender", "phone", "email"])) {
      toast.error("Please complete all required personal details.");
      return;
    }
    setOtpSent(true);
    toast.success("Verification OTP sent. Use 12345 for now.");
  };

  const verifyOtp = async () => {
    if (!await trigger("otp")) return;
    if (getValues("otp") !== "12345") {
      toast.error("Incorrect OTP. Please enter 12345.");
      return;
    }
    setOtpVerified(true);
    toast.success("Phone number verified.");
    setStep(1);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location access is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setValue("address", `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`, { shouldValidate: true });
        setLocating(false);
        toast.success("Current location added. Please complete the address details.");
      },
      () => { setLocating(false); toast.error("We could not access your current location."); },
      { enableHighAccuracy: true },
    );
  };

  const submit = async () => {
    if (!await trigger(["category", "address", "landmark", "locality", "pincode"])) {
      toast.error("Please complete all required details.");
      return;
    }
    setSubmitted(true);
    toast.success("Your professional application has been submitted!");
  };

  if (submitted) return (
    <main className="flex min-h-[70vh] w-full max-w-lg mx-auto flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-emerald-600"><Check className="size-8 stroke-[3]" /></div>
      <h1 className="mb-3 text-2xl font-extrabold text-[#2E2215]">Application Submitted!</h1>
      <p className="text-sm text-muted-foreground">Thanks for joining FEAG as a professional. We’ll review your details shortly.</p>
    </main>
  );

  return (
    <main className="w-full max-w-2xl mx-auto px-4 py-3 sm:py-4">
      <div className="mb-2.5 text-center">
        <h1 className="mb-1 text-2xl font-extrabold tracking-[0.14em] text-[#2E2215] sm:text-3xl">JOIN AS A PROFESSIONAL</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">Create your profile and connect with clients looking for your talent.</p>
      </div>
      <div className="relative mb-6 flex items-center justify-between select-none">
        <div className="absolute left-[15%] right-[15%] top-4 h-0.5 bg-border/40"><div className="h-full bg-primary transition-all duration-500" style={{ width: step ? "100%" : "0%" }} /></div>
        {[{ label: "Your Details", icon: UserRound }, { label: "Select Talent Category", icon: Sparkles }].map((item, index) => {
          const Icon = item.icon; const active = index === step; const complete = index < step;
          return <div key={item.label} className="relative z-10 flex flex-col items-center gap-1"><div className={`flex size-8 items-center justify-center rounded-full border-2 sm:size-9 ${complete ? "border-emerald-500 bg-emerald-500 text-white" : active ? "border-primary bg-primary text-white ring-4 ring-primary/20" : "border-border/80 bg-white text-muted-foreground"}`}>{complete ? <Check className="size-4 stroke-[3]" /> : <Icon className="size-4" />}</div><span className={`text-[10px] font-semibold sm:text-xs ${active ? "text-primary" : "text-muted-foreground"}`}>{item.label}</span></div>;
        })}
      </div>

      <form autoComplete="on" onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-white p-4 shadow-sm sm:p-6">
        {step === 0 ? <>
          <div><h2 className="text-lg font-bold text-[#2E2215]">Tell us about yourself</h2><p className="mt-0.5 text-xs text-muted-foreground">Verify your contact details to start your professional profile.</p></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field control={control} name="firstName" label="First Name" rules={{ required: "First name is required", pattern: { value: /^[A-Za-z]+$/, message: "Use letters only" } }} placeholder="Enter first name" errors={errors} autoComplete="given-name" />
            <Field control={control} name="lastName" label="Last Name" rules={{ required: "Last name is required", pattern: { value: /^[A-Za-z]+$/, message: "Use letters only" } }} placeholder="Enter last name" errors={errors} autoComplete="family-name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-foreground/80">Gender</label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Please select a gender" }}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {["male", "female", "other"].map((option) => (
                    <label
                      key={option}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full px-2 py-1.5 text-xs font-semibold capitalize text-foreground transition-colors hover:bg-muted/50"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={field.value === option}
                        onChange={() => field.onChange(option)}
                        className="sr-only"
                      />
                      <span className={`flex size-5 items-center justify-center rounded-full transition-colors ${field.value === option ? "bg-primary" : "bg-[#6D5F52]/50"}`}>
                        <span className="size-2.5 rounded-full bg-white" />
                      </span>
                      {option}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.gender && <Error message={errors.gender.message} />}
          </div>
          <Field control={control} name="phone" label="Phone Number" rules={{ required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Enter a valid 10-digit number" } }} placeholder="Enter 10-digit number" errors={errors} numeric prefix="+91" autoComplete="tel-national" />
          <Field control={control} name="email" label="Email Address" rules={{ required: "Email address is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } }} placeholder="you@example.com" errors={errors} type="email" autoComplete="email" />
          {!otpSent ? <Button type="button" onClick={sendOtp} disabled={!canSendOtp} className="w-full bg-primary text-white hover:bg-primary/95">Send Verification OTP</Button> : <div className="flex flex-col gap-3 border-t border-border/40 pt-5"><div className="flex items-center justify-between"><label className="text-xs font-bold uppercase tracking-wide text-foreground/80">Verification OTP</label><span className="text-[10px] text-muted-foreground">Test OTP: <strong className="text-primary">12345</strong></span></div><Field control={control} name="otp" label="" rules={{ required: "OTP is required", pattern: { value: /^\d{5}$/, message: "OTP must be 5 digits" } }} placeholder="Enter 5-digit OTP" errors={errors} numeric /><div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setOtpSent(false)} className="flex-1">Change details</Button><Button type="button" onClick={verifyOtp} disabled={otpVerified} className="flex-1 bg-primary text-white hover:bg-primary/95">{otpVerified ? "Verified" : "Verify OTP"}</Button></div></div>}
        </> : <>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><h2 className="text-lg font-bold text-[#2E2215]">Select talent category</h2><p className="mt-0.5 text-xs text-muted-foreground">Tell clients about your specialty and service area.</p></div><button type="button" onClick={useCurrentLocation} disabled={locating} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 disabled:opacity-50"><MapPin className="size-3.5" />{locating ? "Finding location..." : "Use Current Location"}</button></div>
          <div className="flex flex-col gap-1.5"><label className="text-xs font-bold uppercase tracking-wide text-foreground/80">Talent Category</label><Controller name="category" control={control} rules={{ required: "Talent category is required" }} render={({ field }) => <select {...field} className={inputClass}><option value="" disabled>Select talent category</option><option value="Videographer">Videographer</option><option value="Photographer">Photographer</option><option value="Singer">Singer</option></select>} />{errors.category && <Error message={errors.category.message} />}</div>
          <Field control={control} name="address" label="Address" rules={{ required: "Address is required" }} placeholder="House, building, street" errors={errors} />
          <Field control={control} name="landmark" label="Landmark" rules={{ required: "Landmark is required" }} placeholder="Nearby landmark" errors={errors} />
          <Field control={control} name="locality" label="Locality" rules={{ required: "Locality is required" }} placeholder="Area, city" errors={errors} />
          <Field control={control} name="pincode" label="PIN Code" rules={{ required: "PIN Code is required", pattern: { value: /^\d{6}$/, message: "PIN Code must be 6 digits" } }} placeholder="Enter 6-digit PIN Code" errors={errors} numeric />
          <div className="flex items-center justify-between border-t border-border/40 pt-4"><button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"><ChevronLeft className="size-4" />Back</button><Button type="button" onClick={submit} disabled={!canSubmit} className="bg-primary text-white hover:bg-primary/95">Submit</Button></div>
        </>}
      </form>
    </main>
  );
}

function Error({ message }: { message?: string }) { return <span className="text-xs font-medium text-destructive">{message}</span>; }

type FieldProps = {
  control: Control<ProfessionalForm>;
  name: keyof ProfessionalForm;
  label: string;
  rules: RegisterOptions<ProfessionalForm>;
  placeholder: string;
  errors: FieldErrors<ProfessionalForm>;
  numeric?: boolean;
  prefix?: string;
  type?: string;
  autoComplete?: string;
};

function Field({ control, name, label, rules, placeholder, errors, numeric, prefix, type = "text", autoComplete }: FieldProps) {
  return <div className="flex flex-col gap-1.5">{label && <label htmlFor={name} className="text-xs font-bold uppercase tracking-wide text-foreground/80">{label}</label>}<div className={prefix ? "flex overflow-hidden rounded-md border border-input shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-ring" : ""}>{prefix && <span className="border-r border-input bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">{prefix}</span>}<Controller name={name} control={control} rules={rules} render={({ field }) => <input {...field} id={name} type={type} autoComplete={autoComplete} maxLength={numeric ? (name === "pincode" ? 6 : name === "otp" ? 5 : 10) : undefined} placeholder={placeholder} className={prefix ? "w-full bg-transparent px-3 py-2 text-sm outline-none" : inputClass} onChange={(event) => field.onChange(numeric ? event.target.value.replace(/\D/g, "") : event.target.value)} />} /></div>{errors[name] && <Error message={errors[name].message} />}</div>;
}
