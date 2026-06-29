"use client";

import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      if (user?.role && allowedRoles.includes(user.role)) {
        setIsAuthorized(true);
      } else {
        // Redirect to appropriate dashboard based on role if they try to access unauthorized route
        if (user?.role === "professional" || user?.role === "creator") {
          router.push("/"); // Adjust default creator route when created
        } else {
          router.push("/my-account"); // Adjust default customer route
        }
      }
    } else {
      setIsAuthorized(true);
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  if (!isAuthenticated || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};
