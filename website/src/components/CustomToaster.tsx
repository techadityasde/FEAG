"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          padding: '6px 10px',
          fontSize: '11px',
          borderRadius: '6px',
          border: '1px solid #E8DFC7',
          background: '#FDFBF7',
          color: '#2E2215',
          maxWidth: '260px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          fontWeight: '600',
        },
        success: {
          iconTheme: {
            primary: '#E29A26',
            secondary: '#FDFBF7',
          },
        },
        error: {
          iconTheme: {
            primary: '#dc2626',
            secondary: '#FDFBF7',
          },
        },
      }}
    />
  );
}
