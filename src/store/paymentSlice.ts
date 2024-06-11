import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface IPaymentChoose {
  id: number
  type: string;
  name: string;
  code: string;
  icon_url?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface IPaymentCard {
  id: number
  name: string;
  code: string;
  icon_url?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface IPayment {
  id: number
  name: string;
  icon_url?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  channels: IPaymentCard[]
}

export interface IPaymentList {
  items?: IPayment[]
}

export interface IPaymentState {
  loadingList: boolean;
  dataList?: IPaymentList;
  choose?: IPaymentChoose
}

const initialState: IPaymentState = {
  loadingList: false,
  dataList: {} as IPaymentList,
  choose: {} as IPaymentChoose
};

export const host = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  }
});

export const getPaymentList = createAsyncThunk(`get/paymentList`, async () => {
  const response = await host.get(`/v1/payment?status=0`)
  return response.data
})

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentChoose: (state, action: PayloadAction<IPaymentChoose>) => {
      state.choose = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPaymentList.pending, (state, action) => {
        state.loadingList = true
        state.dataList = {}
      })
      .addCase(getPaymentList.fulfilled, (state, action) => {
        state.loadingList = false
        state.dataList = action.payload
      })
  }
});

export const { setPaymentChoose } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
