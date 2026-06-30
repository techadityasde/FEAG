"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import LoginForm from "@/components/auth/LoginForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      disableOutsideClick={true} 
      maxWidth="max-w-md"
    >
      <div className="py-2">
        <LoginForm onSuccess={onClose} showTitle={true} />
      </div>
    </Modal>
  );
}
