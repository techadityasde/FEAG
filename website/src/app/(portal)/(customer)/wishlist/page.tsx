"use client";
import React from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Heart } from "lucide-react";

const WishlistContent = () => {
  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Wishlist</h1>
          <p className="text-muted-foreground">
            View and manage the professionals you have saved.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
            <p className="text-muted-foreground">
              Explore our professionals and save them to your wishlist to easily find them later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WishlistPage() {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <WishlistContent />
    </ProtectedRoute>
  );
}
