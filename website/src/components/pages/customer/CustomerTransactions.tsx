"use client";
import { RootState } from "@/lib/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Transaction } from "@/lib/store/transactionSlice";
import { BadgeCheck, Clock, XCircle, Receipt, ArrowUpRight, CheckCircle2, Shield, Banknote, Wallet, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CustomerTransactions = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const auth = useSelector((state: RootState) => state.auth);

  const columns: ColumnDef<Transaction>[] = [
    {
      header: "Transaction ID",
      accessorKey: "transactionId",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Receipt className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{item.transactionId}</p>
            <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (item) => (
        <div className="font-semibold text-foreground">
          {item.currency === "INR" ? "₹" : item.currency} {item.amount.toFixed(2)}
        </div>
      ),
    },
    {
      header: "Professional",
      accessorKey: "professionalName",
      cell: (item) => (
        <div>
          <p className="font-medium">{item.professionalName}</p>
          <p className="text-xs text-muted-foreground capitalize">{item.selectedPackage} Package</p>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item) => {
        const isSuccess = item.status === "success";
        const isPending = item.status === "pending";
        return (
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
              isSuccess
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                : isPending
                  ? "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
                  : "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
            )}
          >
            {isSuccess ? (
              <BadgeCheck className="h-3.5 w-3.5" />
            ) : isPending ? (
              <Clock className="h-3.5 w-3.5" />
            ) : (
              <XCircle className="h-3.5 w-3.5" />
            )}
            <span className="capitalize">{item.status}</span>
          </div>
        );
      },
    },
    {
      header: "Escrow",
      accessorKey: "escrowStatus",
      cell: (item) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {item.escrowStatus === "authorized" && <Clock className="h-3.5 w-3.5" />}
          {item.escrowStatus === "captured" && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
          <span className="capitalize">{item.escrowStatus || "N/A"}</span>
        </div>
      ),
    },
    {
      header: "Action",
      cell: (item) => (
        <Link 
          href={`/portfolio/${encodeURIComponent(item.professionalName)}`}
          className="p-2 hover:bg-muted rounded-full transition-colors group inline-flex"
        >
          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Transactions
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Welcome back{auth.user?.name ? `, ${auth.user.name}` : ""}. View and manage all your payments, escrow statuses, and professional engagements in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
            {[
              {
                title: "In Escrow",
                amount: transactions.reduce((acc, curr) => acc + (curr.escrowStatus === 'authorized' ? curr.amount : 0), 0),
                color: "text-amber-500",
                bg: "bg-amber-500/10",
                icon: Shield
              },
              {
                title: "Captured",
                amount: transactions.reduce((acc, curr) => acc + (curr.escrowStatus === 'captured' ? curr.amount : 0), 0),
                color: "text-primary",
                bg: "bg-primary/10",
                icon: Banknote
              },
              {
                title: "Settled",
                amount: transactions.reduce((acc, curr) => acc + (curr.escrowStatus === 'settled' ? curr.amount : 0), 0),
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
                icon: Wallet
              },
              {
                title: "Total Spent",
                amount: transactions.reduce((acc, curr) => acc + (['authorized', 'captured', 'settled'].includes(curr.escrowStatus) ? curr.amount : 0), 0),
                color: "text-foreground",
                bg: "bg-muted",
                icon: TrendingUp
              }
            ].map((stat, i) => {
              const formatAmount = (value: number) => {
                if (value >= 1000) {
                  return `₹ ${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
                }
                return `₹ ${value.toFixed(2)}`;
              };

              return (
                <div key={i} className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group min-w-[140px] flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider relative z-10">{stat.title}</p>
                    <div className={cn("p-2 rounded-xl relative z-10 transition-transform group-hover:scale-110", stat.bg)}>
                      <stat.icon className={cn("size-4", stat.color)} />
                    </div>
                  </div>
                  <p className={cn("text-2xl font-black relative z-10", stat.color)}>
                    {formatAmount(stat.amount)}
                  </p>
                  
                  {/* Decorative background element */}
                  <div className={cn("absolute -bottom-4 -right-4 size-16 rounded-full opacity-20 blur-xl transition-all group-hover:scale-150 group-hover:opacity-30", stat.bg)} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Data Table */}
        <div className="hidden md:block bg-card border border-border p-4 md:p-6 rounded-2xl shadow-sm">
          <DataTable
            data={transactions}
            columns={columns}
            searchKey="transactionId"
            searchPlaceholder="Search by Transaction ID..."
          />
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">{transactions.length} Total</span>
          </div>
          
          {transactions.map((item) => {
            const isSuccess = item.status === "success";
            const isPending = item.status === "pending";
            
            return (
              <div key={item.transactionId} className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-4 relative overflow-hidden">
                {/* Header: ID & Status */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
                      <Receipt className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{item.transactionId}</p>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border",
                    isSuccess
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : isPending
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        : "bg-red-500/10 text-red-600 border-red-500/20"
                  )}>
                    {isSuccess ? <BadgeCheck className="h-3 w-3" /> : isPending ? <Clock className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span className="capitalize">{item.status}</span>
                  </div>
                </div>

                <div className="h-px bg-border/60 w-full" />

                {/* Body: Professional & Amount */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Professional</p>
                    <p className="font-semibold text-sm text-foreground">{item.professionalName}</p>
                    <p className="text-[10px] text-muted-foreground capitalize mt-0.5">{item.selectedPackage} Pkg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Amount</p>
                    <p className="font-black text-lg text-foreground">
                      {item.currency === "INR" ? "₹" : item.currency} {item.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Footer: Escrow & Action */}
                <div className="flex justify-between items-center pt-3 mt-1 border-t border-border/40">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <span className="text-foreground/40">Escrow:</span>
                    {item.escrowStatus === "authorized" && <Clock className="h-3.5 w-3.5 text-amber-500" />}
                    {item.escrowStatus === "captured" && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                    <span className={cn(
                      "capitalize",
                      item.escrowStatus === "authorized" && "text-amber-600",
                      item.escrowStatus === "captured" && "text-primary",
                      item.escrowStatus === "settled" && "text-emerald-600"
                    )}>{item.escrowStatus || "N/A"}</span>
                  </div>
                  
                  <Link 
                    href={`/portfolio/${encodeURIComponent(item.professionalName)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-lg transition-colors"
                  >
                    View
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CustomerTransactions;
