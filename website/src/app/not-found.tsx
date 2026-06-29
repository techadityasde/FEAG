"use client";

import Link from "next/link";
import { MoveLeft, FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 md:p-12 text-center shadow-sm space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground text-sm">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
          >
            <MoveLeft className="h-4 w-4" /> Go Back
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center px-4 py-3 bg-muted text-muted-foreground font-medium rounded-xl hover:bg-muted/80 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
