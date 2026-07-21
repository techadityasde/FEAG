import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  orderId: string;
  transactionId: string;
  professionalId: string;
  professionalName: string;
  professionalUsername?: string;
  professionalLocation?: string;
  professionalImage?: string;
  professionalCategory?: string;
  selectedPackage: string;
  amount: number;
  date: string;
  bookingDate?: string;
  bookingSlot?: string;
  status: "active" | "completed" | "cancelled";
  cancelReason?: string;
  cancelTime?: string;
  cancelCharge?: number;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string, status: Order["status"] }>) => {
      const order = state.orders.find(o => o.orderId === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    },
    cancelOrder: (state, action: PayloadAction<{ orderId: string, cancelReason: string, cancelTime: string, cancelCharge: number }>) => {
      const order = state.orders.find(o => o.orderId === action.payload.orderId);
      if (order) {
        order.status = "cancelled";
        order.cancelReason = action.payload.cancelReason;
        order.cancelTime = action.payload.cancelTime;
        order.cancelCharge = action.payload.cancelCharge;
      }
    },
    clearOrders: (state) => {
      state.orders = [];
    }
  },
});

export const { addOrder, updateOrderStatus, cancelOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
