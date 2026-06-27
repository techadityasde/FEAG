'use client';
import React, { useState } from "react";
import { Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  errors: {
    name: string;
    email: string;
    phone: string;
  };
};

const initialContactFormState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  errors: {
    name: "",
    email: "",
    phone: "",
  },
};

const emptyErrors: ContactFormState["errors"] = {
  name: "",
  email: "",
  phone: "",
};

const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

const validateName = (name: string) => {
  if (!name.trim()) return "Name is required.";
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return "Name should only contain letters and spaces.";
  }
  return "";
};

const validateEmail = (email: string) => {
  if (!email.trim()) return "Email address is required.";
  if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

const validatePhone = (phone: string) => {
  if (!phone.trim()) return "Phone number is required.";
  if (!/^\d+$/.test(phone)) {
    return "Phone number should only contain numbers.";
  }
  return "";
};

const getEmailSuggestions = (email: string) => {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || trimmedEmail.includes(" ")) return [];

  const [localPart, domainPart = ""] = trimmedEmail.split("@");
  if (!localPart || trimmedEmail.includes("@") && trimmedEmail.split("@").length > 2) return [];

  if (!trimmedEmail.includes("@")) {
    return emailDomains.map((domain) => `${localPart}@${domain}`);
  }

  if (!domainPart) {
    return emailDomains.map((domain) => `${localPart}@${domain}`);
  }

  return emailDomains
    .filter((domain) => domain.startsWith(domainPart.toLowerCase()) && domain !== domainPart.toLowerCase())
    .map((domain) => `${localPart}@${domain}`);
};

export default function ContactForm() {
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContactFormState);
  const errors = contactForm.errors ?? emptyErrors;
  const emailSuggestions = getEmailSuggestions(contactForm.email);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = {
      name: validateName(contactForm.name),
      email: validateEmail(contactForm.email),
      phone: validatePhone(contactForm.phone),
    };

    if (errors.name || errors.email || errors.phone) {
      setContactForm((current) => ({
        ...current,
        errors,
      }));
      return;
    }

    toast.success("Your message has been submitted.");
    setContactForm(initialContactFormState);
  };

  const updateField = (field: "name" | "email" | "phone" | "message") => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setContactForm((current) => ({
      ...current,
      [field]: value,
      errors: {
        ...(current.errors ?? emptyErrors),
        [field]:
          field === "name"
            ? validateName(value)
            : field === "email"
              ? validateEmail(value)
              : field === "phone"
                ? validatePhone(value)
                : "",
      },
    }));
  };

  const applyEmailSuggestion = (email: string) => {
    setContactForm((current) => ({
      ...current,
      email,
      errors: {
        ...(current.errors ?? emptyErrors),
        email: validateEmail(email),
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 sm:p-6 border border-border/60 shadow-sm space-y-4">
      <label className="block">
        <span className="text-xs sm:text-sm font-bold text-[#2E2215]">Name</span>
        <div className="mt-2 flex items-center rounded-lg border border-border bg-background focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
          <User className="size-4 text-muted-foreground ml-3 shrink-0" />
          <input
            type="text"
            value={contactForm.name}
            onChange={updateField("name")}
            placeholder="Enter your name"
            required
            // aria-invalid={Boolean(errors.name)}
            className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        {errors.name && (
          <p className="mt-1.5 text-[11px] sm:text-xs text-destructive">{errors.name}</p>
        )}
      </label>

      <label className="block">
        <span className="text-xs sm:text-sm font-bold text-[#2E2215]">Email Address</span>
        <div className="mt-2 flex items-center rounded-lg border border-border bg-background focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
          <Mail className="size-4 text-muted-foreground ml-3 shrink-0" />
          <input
            type="email"
            value={contactForm.email}
            onChange={updateField("email")}
            placeholder="Ex: john@example.com"
            required
            // aria-invalid={Boolean(errors.email)}
            className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-[11px] sm:text-xs text-destructive">{errors.email}</p>
        )}
        {emailSuggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {emailSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => applyEmailSuggestion(suggestion)}
                className="rounded-full border border-border bg-background px-3 py-1 text-[11px] sm:text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </label>

      <label className="block">
        <span className="text-xs sm:text-sm font-bold text-[#2E2215]">Phone Number</span>
        <div className="mt-2 flex items-center rounded-lg border border-border bg-background focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
          <Phone className="size-4 text-muted-foreground ml-3 shrink-0" />
          <input
            type="text"
            inputMode="numeric"
            value={contactForm.phone}
            onChange={updateField("phone")}
            placeholder="Ex: (+91) 4"
            required
            // aria-invalid={Boolean(errors.phone)}
            className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        {errors.phone && (
          <p className="mt-1.5 text-[11px] sm:text-xs text-destructive">{errors.phone}</p>
        )}
      </label>

      <label className="block">
        <span className="text-xs sm:text-sm font-bold text-[#2E2215]">Message</span>
        <div className="mt-2 flex items-start rounded-lg border border-border bg-background focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
          <MessageSquare className="size-4 text-muted-foreground ml-3 mt-3.5 shrink-0" />
          <textarea
            value={contactForm.message}
            onChange={updateField("message")}
            placeholder="Write your problem or query here..."
            required
            rows={5}
            className="w-full resize-none bg-transparent px-3 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </label>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/95 text-white font-semibold h-9 cursor-pointer">
        Submit
        <Send className="size-4" />
      </Button>
    </form>
  );
}
