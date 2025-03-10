import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlertState } from "./programSlice";

export type statusType = 'progress' | 'failed' | 'success' | 'wait_payment'

export interface IPaymentProsesBody {
  amount: number;
  payment_method_id: number;
  payment_channel_id: number;
}

export interface IPaymentStatusBody {
  donation_payment_id: number;
}

export interface IPaymentProsesResponse {
  donation_id?: number;
  program_id?: number;
  program_name?: string;
  customer_id?: string;
  customer_name?: string;
  amount?: number;
  created_at?: string;
  status?: statusType;
  payment_info?: {
    admin_fee: number;
    fees: number;
    total_amount: number;
    donation_payment_id: number;
    payment_method_name: string;
    payment_channel_name: string;
    trans_uuid: string;
    reference_no: string;
    status: number;
    status_name: string;
    amount: number;
    signature_key: string;
    va_number?: string;
    payment_code?: string;
    expired_date: string;
    trx_no?: string;
    payment_date?: any
  }
}

export interface IPaymentChoose {
  id?: number;
  method_id?: number;
  type?: string;
  name?: string;
  code?: string;
  type_code?: string;
  icon_url?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  card_cvn?: string;
  card_account_number?: string;
  card_exp_month?: string;
  card_exp_year?: string;
  customer_id?: string;
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
  code: string;
  icon_url?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  channels: IPaymentCard[]
}

export interface IPaymentList {
  items?: IPayment[],
  admin_fee?: number
}

export interface IPaymentState {
  loadingList: boolean;
  dataList?: IPaymentList;
  choose?: IPaymentChoose;
  value?: number;
  paymentResponse?: IPaymentProsesResponse
  paymentLoading: boolean;
}

const initialState: IPaymentState = {
  loadingList: false,
  dataList: {} as IPaymentList,
  choose: {} as IPaymentChoose,
  value: 0,
  paymentResponse: {} as IPaymentProsesResponse,
  paymentLoading: false
};

export const host = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    "ngrok-skip-browser-warning": "69420",
    "X-User-Id": '2323',
    "X-User-Name": 'reky'
  }
});

export const getPaymentList = createAsyncThunk(`get/paymentList`, async ({ } = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await host.get(`/v1/payment?status=0`)
    return response.data
  } catch (error: any) {
    dispatch(setAlertState({
      type: 'danger',
      header: 'Error',
      description: error?.response?.data?.error?.message || error?.message
    }))
    return rejectWithValue(null)
  }
})

export const prosesPayment = createAsyncThunk(`post/paymentProses`, async ({ id, data }: { id: string, data: IPaymentProsesBody }, { dispatch, rejectWithValue }) => {
  try {
    const response = await host.post(`/v1/program/${id}/donate`, data)
    return response.data
  } catch (error: any) {
    dispatch(setAlertState({
      type: 'danger',
      header: 'Error',
      description: error?.response?.data?.error?.message || error?.message
    }))
    return rejectWithValue(null)
  }
})

export const statusPayment = createAsyncThunk(`post/paymentStatus`, async ({ donation_id, data }: { donation_id: number, data: IPaymentStatusBody }, { dispatch, rejectWithValue }) => {
  try {
    const response = await host.post(`/v1/donation/${donation_id}/status`, data)
    return response.data
  } catch (error: any) {
    dispatch(setAlertState({
      type: 'danger',
      header: 'Error',
      description: error?.response?.data?.error?.message || error?.message
    }))
    return rejectWithValue(null)
  }
})

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentChoose: (state, action: PayloadAction<IPaymentChoose>) => {
      state.choose = action.payload;
    },
    setPaymentValue: (state, action: PayloadAction<{ value: number }>) => {
      state.value = action.payload.value;
    },
    clearStatusProses: (state) => {
      state.paymentResponse = {}
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
      .addCase(prosesPayment.pending, (state, action) => {
        state.paymentLoading = true
      })
      .addCase(prosesPayment.rejected, (state, action) => {
        state.paymentLoading = false
      })
      .addCase(prosesPayment.fulfilled, (state, action) => {
        state.paymentLoading = false
        state.paymentResponse = action.payload?.data || {};
      })
      .addCase(statusPayment.pending, (state, action) => {
        state.paymentLoading = true
      })
      .addCase(statusPayment.rejected, (state, action) => {
        state.paymentLoading = false
      })
      .addCase(statusPayment.fulfilled, (state, action) => {
        state.paymentLoading = false
        state.paymentResponse = action.payload?.data || {};
      })
  }
});

export const { setPaymentChoose, setPaymentValue, clearStatusProses } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
