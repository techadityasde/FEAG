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

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const router = useRouter();
  const pathname = usePathname();

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Role check
    if (
      allowedRoles &&
      allowedRoles.length > 0 &&
      (!user?.role || !allowedRoles.includes(user.role))
    ) {
      if (user?.role === "customer") {
        router.replace("/my-account");
      } else {
        router.replace("/");
      }

      return;
    }

    setIsAuthorized(true);
  }, [
    isAuthenticated,
    user,
    allowedRoles,
    pathname,
    router,
  ]);

  if (!isAuthenticated || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};