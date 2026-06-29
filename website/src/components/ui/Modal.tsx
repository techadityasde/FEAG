import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-xl" }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full ${maxWidth} max-h-[90vh] bg-background rounded-2xl shadow-xl flex flex-col mx-4 animate-in fade-in zoom-in-95 duration-200 overflow-hidden border border-border/50`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/50 bg-muted/10">
            <h2 className="text-lg font-extrabold text-foreground tracking-tight">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/50 bg-background/50"
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/50 bg-background/50 shadow-sm"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        )}
        
        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 relative">
          {children}
        </div>
      </div>
    </div>
  );
}
