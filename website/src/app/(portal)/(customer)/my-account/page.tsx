"use client";
import React from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { User, Mail, Phone, MapPin } from "lucide-react";

const MyAccountContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Account</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-6 mb-8">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user.name || "User"}</h2>
              <div className="inline-flex items-center mt-2 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase tracking-wider">
                {user.role || "Customer"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </label>
              <p className="text-foreground p-3 bg-muted/50 rounded-lg border border-border/50">
                {user.email || "Not provided"}
              </p>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone
              </label>
              <p className="text-foreground p-3 bg-muted/50 rounded-lg border border-border/50">
                {user.mobile || "Not provided"}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location
              </label>
              <p className="text-foreground p-3 bg-muted/50 rounded-lg border border-border/50">
                {user.location || "Not provided"} {user.pincode ? `- ${user.pincode}` : ""}
              </p>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Category
              </label>
              <p className="text-foreground p-3 bg-muted/50 rounded-lg border border-border/50 capitalize">
                {user.category || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MyAccountPage() {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <MyAccountContent />
    </ProtectedRoute>
  );
}
