"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ImagePreviewModalProps {
  isOpen: boolean;
  src: string | null;
  title: string;
  onClose: () => void;
}

export default function ImagePreviewModal({
  isOpen,
  src,
  title,
  onClose,
}: ImagePreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] max-w-2xl w-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 bg-muted/20">
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body Image Container */}
        <div className="flex items-center justify-center p-3 bg-black/5 overflow-auto max-h-[75vh]">
          <img
            src={src}
            alt={title}
            className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
