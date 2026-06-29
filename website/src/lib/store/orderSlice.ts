import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  orderId: string;
  transactionId: string;
  professionalId: string;
  professionalName: string;
  selectedPackage: string;
  amount: number;
  date: string;
  status: "active" | "completed" | "cancelled";
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
    clearOrders: (state) => {
      state.orders = [];
    }
  },
});

export const { addOrder, updateOrderStatus, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
