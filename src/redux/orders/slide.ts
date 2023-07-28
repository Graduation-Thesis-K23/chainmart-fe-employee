import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, OrderStatus } from "~/shared";
import instance from "~/services/axios-instance";
export interface OrdersType {
  id: string;
  name: string;
  phone: string;
  branchId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
}

export interface OrdersRender extends OrdersType {
  created_at: Date;
  user: User;
  estimated_shipped_date: Date;
  approved_date: Date;
  cancelled_date: Date;
  shipping_date: Date;
  status: OrderStatus;
  total: number;
  payment: string;
  address: {
    id: string;
    name: string;
    phone: string;
    street: string;
    district: string;
    city: string;
    ward: string;
  };
  products: {
    id: string;
    name: string;
    price: number;
    sale: number;
    quantity: number;
    image: string;
  }[];
}

/* id: "5",
      create_at: Date.now(),
      address: {
        id: "1",
        name: "Nguyễn Văn A",
        phone: "0123456789",
        street: "123 Đường ABC",
        district: "Quận XYZ",
        city: "TP. HCM",
        ward: "Phường 123",
      },
      cancelled_date: Date.now(),
      status: OrderStatus.Cancelled,
      payment: Payment.Cash,
      products: [
        {
          id: "1",
          name: "Áo thun nam",
          price: 100000,
          sale: 0,
          quantity: 1,
          image: "2ba48c4c",
        },
        {
          id: "2",
          name: "Áo thun nam 1",
          price: 1000000,
          sale: 2,
          quantity: 2,
          image: "2ba48c4c",
        },
      ], */

export interface OrdersState {
  data: OrdersRender[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}
const initialState: OrdersState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const ordersState = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchOrder.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = payload;
    });
    builder.addCase(fetchOrder.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(approveOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(approveOrder.fulfilled, (state, { payload }) => {
      const { id, status, approved_date } = payload;
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.map((order) => {
        if (order.id === id) {
          order.status = status;
          order.approved_date = approved_date;
        }
        return order;
      });
    });
    builder.addCase(approveOrder.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(rejectOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(rejectOrder.fulfilled, (state, { payload }) => {
      const { id, status, cancelled_date } = payload;
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.map((order) => {
        if (order.id === id) {
          order.status = status;
          order.cancelled_date = cancelled_date;
        }
        return order;
      });
    });
    builder.addCase(rejectOrder.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(beginShipOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(beginShipOrder.fulfilled, (state, { payload }) => {
      const { id, status, shipping_date } = payload;
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.map((order) => {
        if (order.id === id) {
          order.status = status;
          order.shipping_date = shipping_date;
        }
        return order;
      });
    });
    builder.addCase(beginShipOrder.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (
    payload: {
      status: OrderStatus | "all";
      search: string;
    },
    thunkApi
  ) => {
    const params = new URLSearchParams({
      status: payload.status,
      search: payload.search,
    }).toString();

    const response: OrdersRender[] | ErrorPayload = await instance.get(
      "/api/orders/employee?" + params
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const approveOrder = createAsyncThunk(
  "orders/approveOrder",
  async (id: string, thunkApi) => {
    const response: OrdersRender | ErrorPayload = await instance.patch(
      `/api/orders/${id}/approve`
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const rejectOrder = createAsyncThunk(
  "orders/rejectOrder",
  async (id: string, thunkApi) => {
    const response: OrdersRender | ErrorPayload = await instance.patch(
      `/api/orders/${id}/reject`
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const beginShipOrder = createAsyncThunk(
  "orders/beginShipOrder",
  async (id: string, thunkApi) => {
    const response: OrdersRender | ErrorPayload = await instance.patch(
      `/api/orders/${id}/begin-ship`
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default ordersState.reducer;
