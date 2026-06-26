import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onReset: () => void;
  categoryLabel: string;
}

export default function EmptyState({ onReset, categoryLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-card rounded-2xl border border-dashed border-border/80 max-w-lg mx-auto shadow-sm my-8">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center text-primary mb-5 shadow-inner">
        <Search className="size-8" />
      </div>
      <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-2">
        No {categoryLabel}s Found
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
        We couldn't find any {categoryLabel.toLowerCase()}s matching your exact filters. Try adjusting your selections or resetting them.
      </p>
      <Button
        onClick={onReset}
        className="text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 h-9 rounded-lg shadow-md cursor-pointer transition-all active:scale-95"
      >
        Reset Filters
      </Button>
    </div>
  );
}
