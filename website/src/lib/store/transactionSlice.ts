// store/slices/transactionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EscrowStatus =
  | "authorized"   // money held by razorpay (escrow starts)
  | "captured"     // client approved work (escrow released)
  | "settled"      // artist paid
  | "refunded"     // dispute resolved
  | "failed";      // payment failed

export interface Transaction {
  transactionId: string;
  orderId: string;
  amount: number;
  currency: string;
  date: string;
  status: "success" | "failed" | "pending";  // keep your existing field
  escrowStatus: EscrowStatus;                 // new escrow tracking
  professionalId: string;
  professionalName: string;
  selectedPackage: string;
  platformFee: number;                        // FEAG cut (e.g. 10%)
  artistPayout: number;                       // amount - platformFee
  timeline: {
    authorizedAt: string | null;
    capturedAt: string | null;
    settledAt: string | null;
    refundedAt: string | null;
  };
  userDetails: {
    name: string;
    email: string;
    phone?: string;
  };
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const PLATFORM_FEE_PERCENT = 10; // 10% FEAG platform fee

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {

    // ── replaces your addTransaction ──
    addTransaction: (state, action: PayloadAction<Omit<Transaction,
      "escrowStatus" | "platformFee" | "artistPayout" | "timeline"
    >>) => {
      const platformFee = Math.round(action.payload.amount * PLATFORM_FEE_PERCENT / 100);
      const artistPayout = action.payload.amount - platformFee;

      // prevent duplicate
      const exists = state.transactions.find(
        t => t.transactionId === action.payload.transactionId
      );
      if (exists) return;

      state.transactions.push({
        ...action.payload,
        escrowStatus: "authorized",   // always starts as held
        platformFee,
        artistPayout,
        timeline: {
          authorizedAt: new Date().toISOString(),
          capturedAt: null,
          settledAt: null,
          refundedAt: null,
        },
      });
    },

    // ── client approves work → release escrow ──
    captureTransaction: (state, action: PayloadAction<{ transactionId: string }>) => {
      const tx = state.transactions.find(
        t => t.transactionId === action.payload.transactionId
      );
      if (tx && tx.escrowStatus === "authorized") {
        tx.escrowStatus = "captured";
        tx.status = "success";
        tx.timeline.capturedAt = new Date().toISOString();
      }
    },

    // ── artist paid → fully settled ──
    settleTransaction: (state, action: PayloadAction<{ transactionId: string }>) => {
      const tx = state.transactions.find(
        t => t.transactionId === action.payload.transactionId
      );
      if (tx && tx.escrowStatus === "captured") {
        tx.escrowStatus = "settled";
        tx.timeline.settledAt = new Date().toISOString();
      }
    },

    // ── dispute raised → refund ──
    refundTransaction: (state, action: PayloadAction<{ transactionId: string }>) => {
      const tx = state.transactions.find(
        t => t.transactionId === action.payload.transactionId
      );
      if (tx && ["authorized", "captured"].includes(tx.escrowStatus)) {
        tx.escrowStatus = "refunded";
        tx.status = "failed";
        tx.timeline.refundedAt = new Date().toISOString();
      }
    },

    // ── payment failed ──
    failTransaction: (state, action: PayloadAction<{ transactionId: string }>) => {
      const tx = state.transactions.find(
        t => t.transactionId === action.payload.transactionId
      );
      if (tx) {
        tx.escrowStatus = "failed";
        tx.status = "failed";
      }
    },

    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const {
  addTransaction,
  captureTransaction,
  settleTransaction,
  refundTransaction,
  failTransaction,
  clearTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;