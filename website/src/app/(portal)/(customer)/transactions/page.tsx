import React from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import CustomerTransactions from "@/components/pages/customer/CustomerTransactions";

export default function CustomerTransactionsPage() {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <CustomerTransactions />
    </ProtectedRoute>
  );
}
