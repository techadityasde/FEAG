"use client";

import React, { use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { notFound } from "next/navigation";
import { PackageOpen, MapPin, CheckCircle2, Clock, Calendar, ArrowLeft, Loader2, CircleDashed } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const OrderTrackingContent = ({ id }: { id: string }) => {
  const order = useSelector((state: RootState) => 
    state.orders.orders.find(o => o.orderId === id)
  );
  const location = useSelector((state: RootState) => state.location);

  if (!order) {
    return notFound();
  }

  const steps = [
    {
      title: "Order Placed",
      description: "We have received your order securely.",
      icon: PackageOpen,
      completed: true,
    },
    {
      title: "Processing",
      description: "Professional is reviewing your requirements.",
      icon: Clock,
      completed: order.status === "active" || order.status === "completed",
    },
    {
      title: "Delivered",
      description: "Service has been delivered successfully.",
      icon: CheckCircle2,
      completed: order.status === "completed",
    }
  ];

  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/orders" className="p-2.5 bg-card hover:bg-muted border border-border rounded-xl transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              Track Order
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              ID: {order.orderId}
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Professional</p>
            <p className="font-semibold text-lg">{order.professionalName}</p>
            <Link href={`/portfolio/${encodeURIComponent(order.professionalName)}`} className="text-xs text-primary font-bold hover:underline">
              View Portfolio
            </Link>
          </div>
          
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Package & Date</p>
            <div className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-muted text-foreground uppercase tracking-wider mb-1">
              {order.selectedPackage} Package
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {new Date(order.date).toLocaleDateString()}
            </div>
          </div>
          
          <div className="space-y-1.5 md:text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Amount</p>
            <p className="font-black text-2xl text-primary">
              ₹ {order.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border mt-1",
              order.status === "active" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
              order.status === "completed" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
              "bg-red-500/10 text-red-600 border-red-500/20"
            )}>
              {order.status === "active" ? <CircleDashed className="h-3 w-3 animate-[spin_3s_linear_infinite]" /> : <CheckCircle2 className="h-3 w-3" />}
              <span className="capitalize">{order.status}</span>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Tracking Status
            </h3>
            
            {location.address && (
              <div className="bg-muted/30 p-3 rounded-xl border border-border/50 text-sm md:max-w-xs w-full text-left">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Delivery Address</p>
                <p className="font-semibold text-foreground line-clamp-2">{location.address}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Icon */}
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-4 border-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 transition-colors duration-500",
                  step.completed ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {step.completed && idx === 1 && order.status === "active" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/50 bg-background/50 group-hover:border-border transition-colors">
                  <h4 className={cn("text-base font-bold", step.completed ? "text-foreground" : "text-muted-foreground")}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <OrderTrackingContent id={id} />
    </ProtectedRoute>
  );
}
