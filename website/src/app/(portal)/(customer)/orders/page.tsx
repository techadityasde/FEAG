"use client";
import React from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PackageOpen, ExternalLink, Calendar, CircleDashed, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Order } from "@/lib/store/orderSlice";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MapPin } from "lucide-react";

const OrdersContent = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  const columns: ColumnDef<Order>[] = [
    {
      header: "Order ID",
      accessorKey: "orderId",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <PackageOpen className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{item.orderId}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Calendar className="h-3 w-3" />
              {new Date(item.date).toLocaleString(undefined, { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Professional",
      accessorKey: "professionalName",
      cell: (item) => (
        <div>
          <p className="font-medium">{item.professionalName}</p>
          <div className="inline-flex items-center mt-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-muted text-muted-foreground uppercase tracking-wider">
            {item.selectedPackage}
          </div>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (item) => (
        <div className="font-semibold text-foreground">
          ₹ {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item) => {
        const isActive = item.status === "active";
        const isCompleted = item.status === "completed";
        return (
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm",
              isActive
                ? "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
                : isCompleted
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
            )}
          >
            {isActive ? (
              <CircleDashed className="h-3.5 w-3.5 animate-[spin_3s_linear_infinite]" />
            ) : isCompleted ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <XCircle className="h-3.5 w-3.5" />
            )}
            <span className="capitalize">{item.status}</span>
          </div>
        );
      },
    },
    {
      header: "Tracking",
      cell: (item) => (
        <Link 
          href={`/orders/tracking/${item.orderId}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          <MapPin className="h-3.5 w-3.5" />
          Track
        </Link>
      ),
    },
    {
      header: "Action",
      cell: (item) => (
        <Link 
          href={`/portfolio/${encodeURIComponent(item.professionalName)}`}
          className="p-2 bg-muted/50 hover:bg-muted border border-border/50 rounded-lg transition-colors group cursor-pointer shadow-sm inline-flex"
        >
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your ongoing and past orders.
          </p>
        </div>

        {orders && orders.length > 0 ? (
          <>
            {/* Desktop Data Table */}
            <div className="hidden md:block bg-card border border-border p-4 md:p-6 rounded-2xl shadow-sm">
              <DataTable 
                data={orders} 
                columns={columns} 
                searchKey="orderId" 
                searchPlaceholder="Search by Order ID..."
              />
            </div>
            
            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              <div className="flex items-center justify-between px-1 mb-2">
                <h2 className="text-lg font-bold text-foreground">Recent Orders</h2>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">{orders.length} Total</span>
              </div>
              
              {orders.map((item) => {
                const isActive = item.status === "active";
                const isCompleted = item.status === "completed";
                
                return (
                  <div key={item.orderId} className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-4 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
                          <PackageOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{item.orderId}</p>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">
                            {new Date(item.date).toLocaleString(undefined, { 
                              year: 'numeric', month: 'short', day: 'numeric', 
                              hour: '2-digit', minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border",
                        isActive
                          ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                          : isCompleted
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : "bg-red-500/10 text-red-600 border-red-500/20"
                      )}>
                        {isActive ? <CircleDashed className="h-3 w-3 animate-[spin_3s_linear_infinite]" /> : isCompleted ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        <span className="capitalize">{item.status}</span>
                      </div>
                    </div>

                    <div className="h-px bg-border/60 w-full" />

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium mb-1">Professional</p>
                        <p className="font-semibold text-sm text-foreground">{item.professionalName}</p>
                        <p className="text-[10px] text-muted-foreground capitalize mt-0.5">{item.selectedPackage} Pkg</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground font-medium mb-1">Amount</p>
                        <p className="font-black text-lg text-foreground">
                          ₹ {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 mt-1 border-t border-border/40 gap-2">
                      <Link 
                        href={`/orders/tracking/${item.orderId}`}
                        className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg transition-colors"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        Track Order
                      </Link>
                      
                      <Link 
                        href={`/portfolio/${encodeURIComponent(item.professionalName)}`}
                        className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-lg transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Portfolio
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
              <PackageOpen className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-xl font-bold">No orders yet</h3>
              <p className="text-muted-foreground text-sm">
                You haven't placed any orders. Start browsing professionals to begin a project and your orders will appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function OrdersPage() {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <OrdersContent />
    </ProtectedRoute>
  );
}
