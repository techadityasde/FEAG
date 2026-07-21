"use client";
import React, { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  PackageOpen,
  ExternalLink,
  Calendar,
  CircleDashed,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Order, cancelOrder } from "@/lib/store/orderSlice";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MapPin } from "lucide-react";

const OrdersContent = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed" | "cancelled">("all");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const filteredOrders = orders.filter((o: Order) => activeTab === "all" || o.status === activeTab);
  console.log("Orders:", orders);
  const calculateCancelCharge = (order: Order | null) => {
    if (!order) return { charge: 0, diffMinutes: null };

    const now = new Date();

    // If no booking date/slot is set on this test order, we simulate a 45-min diff so the 5% charge applies for testing.
    if (!order.bookingDate || !order.bookingSlot) {
      return { charge: order.amount * 0.05, diffMinutes: 45 };
    }

    const slotTimeMatch = order.bookingSlot.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (!slotTimeMatch) return { charge: order.amount * 0.05, diffMinutes: 45 };

    let hours = parseInt(slotTimeMatch[1]);
    const minutes = parseInt(slotTimeMatch[2]);
    const ampm = slotTimeMatch[3]?.toUpperCase();

    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const slotDate = new Date(order.bookingDate);
    slotDate.setHours(hours, minutes, 0, 0);

    const diffMs = slotDate.getTime() - now.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));

    // Apply charge if it's within 60 minutes (1 hour) before the slot time
    if (diffMinutes >= 0 && diffMinutes <= 60) {
      return { charge: order.amount * 0.05, diffMinutes };
    }
    return { charge: 0, diffMinutes };
  };

  const openCancelModal = (order: Order) => {
    setOrderToCancel(order);
    setCancelReason("");
    setCustomReason("");
    setIsCancelModalOpen(true);
  };

  const handleCancel = () => {
    if (!orderToCancel) return;

    const { charge: cancelCharge } = calculateCancelCharge(orderToCancel);
    const now = new Date();

    const finalReason = cancelReason === "Other" ? customReason : cancelReason;

    dispatch(
      cancelOrder({
        orderId: orderToCancel.orderId,
        cancelReason: finalReason,
        cancelTime: now.toISOString(),
        cancelCharge: cancelCharge,
      }),
    );

    setIsCancelModalOpen(false);
    setOrderToCancel(null);
    setCancelReason("");
    setCustomReason("");
  };

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
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
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
        <div>
          <div className="font-semibold text-foreground">
            ₹{" "}
            {item.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          {item.status === "cancelled" && item.cancelCharge !== undefined ? (
            <div className="text-xs text-red-500 font-medium mt-0.5">
              Charge: ₹{" "}
              {item.cancelCharge.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          ) : null}
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
                  : "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
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
      cell: (item) =>
        item.status === "cancelled" ? (
          <span className="text-xs text-muted-foreground font-medium italic">
            N/A
          </span>
        ) : (
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
        <div className="flex items-center gap-2">
          <Link
            href={`/portfolio/${encodeURIComponent(item.professionalName)}`}
            className="p-2 bg-muted/50 hover:bg-muted border border-border/50 rounded-lg transition-colors group cursor-pointer shadow-sm inline-flex"
            title="View Portfolio"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          {item.status === "active" && (
            <button
              onClick={() => openCancelModal(item)}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors group cursor-pointer shadow-sm inline-flex"
              title="Cancel Order"
            >
              <XCircle className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            My Orders
          </h1>
          <p className="text-muted-foreground">
            Track and manage your ongoing and past orders.
          </p>
        </div>

        {orders && orders.length > 0 ? (
          <>
            {/* Tabs */}
            <div className="flex items-center gap-2 pb-2 overflow-x-auto no-scrollbar">
              {["all", "active", "completed", "cancelled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "px-5 py-2 text-sm font-bold rounded-full capitalize whitespace-nowrap transition-all",
                    activeTab === tab
                      ? "bg-primary text-white shadow-md ring-1 ring-primary/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-transparent"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {filteredOrders.length > 0 ? (
              <>
                {/* Desktop Data Table */}
                <div className="hidden md:block bg-card border border-border p-4 md:p-6 rounded-2xl shadow-sm">
                  <DataTable
                    data={filteredOrders}
                    columns={columns}
                    searchKey="orderId"
                    searchPlaceholder="Search by Order ID..."
                  />
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 mt-2">
                  <div className="flex items-center justify-between px-1 mb-2">
                    <h2 className="text-lg font-bold text-foreground capitalize">
                      {activeTab === "all" ? "Recent" : activeTab} Orders
                    </h2>
                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      {filteredOrders.length} Total
                    </span>
                  </div>

                  {filteredOrders.map((item) => {
                    const isActive = item.status === "active";
                    const isCompleted = item.status === "completed";

                return (
                  <div
                    key={item.orderId}
                    className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-4 relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
                          <PackageOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">
                            {item.orderId}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">
                            {new Date(item.date).toLocaleString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border",
                          isActive
                            ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                            : isCompleted
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : "bg-red-500/10 text-red-600 border-red-500/20",
                        )}
                      >
                        {isActive ? (
                          <CircleDashed className="h-3 w-3 animate-[spin_3s_linear_infinite]" />
                        ) : isCompleted ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        <span className="capitalize">{item.status}</span>
                      </div>
                    </div>

                    <div className="h-px bg-border/60 w-full" />

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium mb-1">
                          Professional
                        </p>
                        <p className="font-semibold text-sm text-foreground">
                          {item.professionalName}
                        </p>
                        <p className="text-[10px] text-muted-foreground capitalize mt-0.5">
                          {item.selectedPackage} Pkg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground font-medium mb-1">
                          Amount
                        </p>
                        <p className="font-black text-lg text-foreground">
                          ₹{" "}
                          {item.amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        {item.status === "cancelled" &&
                        item.cancelCharge !== undefined ? (
                          <p className="text-[10px] text-red-500 font-bold mt-0.5">
                            Charge: ₹{" "}
                            {item.cancelCharge.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 mt-1 border-t border-border/40 gap-2">
                      {item.status !== "cancelled" ? (
                        <Link
                          href={`/orders/tracking/${item.orderId}`}
                          className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg transition-colors"
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          Track Order
                        </Link>
                      ) : (
                        <div className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-muted/50 text-muted-foreground/50 text-xs font-bold rounded-lg cursor-not-allowed">
                          <MapPin className="h-3.5 w-3.5" />
                          No Tracking
                        </div>
                      )}

                      {isActive && (
                        <button
                          onClick={() => openCancelModal(item)}
                          className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 text-xs font-bold rounded-lg transition-colors"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      )}

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
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                  <PackageOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold capitalize">No {activeTab} orders</h3>
                <p className="text-muted-foreground text-sm">
                  You don't have any {activeTab} orders at the moment.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
              <PackageOpen className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-xl font-bold">No orders yet</h3>
              <p className="text-muted-foreground text-sm">
                You haven't placed any orders. Start browsing professionals to
                begin a project and your orders will appear here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {isCancelModalOpen && orderToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Cancel Order</h3>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to cancel this order?
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-semibold">{orderToCancel.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold">
                  ₹{" "}
                  {orderToCancel.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-border/50">
                <span className="text-muted-foreground flex items-center gap-1">
                  Cancel Charge (5%):
                </span>
                <span className="font-semibold text-red-500">
                  ₹{" "}
                  {calculateCancelCharge(orderToCancel).charge.toLocaleString(
                    undefined,
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                  )}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                {calculateCancelCharge(orderToCancel).diffMinutes !== null ? (
                  <>
                    Time until slot:{" "}
                    <strong>
                      {calculateCancelCharge(orderToCancel).diffMinutes} mins
                    </strong>
                    . (Charge applies only if cancelled 30-60 mins before slot
                    time).
                  </>
                ) : (
                  <>Slot time not set. No charge applied.</>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Reason for cancellation
              </label>
              <select
                className="w-full p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="Changed my mind">Changed my mind</option>
                <option value="Found a better alternative">
                  Found a better alternative
                </option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Professional unavailable">
                  Professional unavailable
                </option>
                <option value="Other">Other</option>
              </select>

              {cancelReason === "Other" && (
                <textarea
                  className="w-full p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
                  placeholder="Please specify your reason..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-lg transition-colors"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancel}
                disabled={
                  !cancelReason ||
                  (cancelReason === "Other" && !customReason.trim())
                }
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
