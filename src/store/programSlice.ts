import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type AlertProp = {
  header?: string | React.ReactNode,
  description?: string | React.ReactNode,
  type?: 'warning' | 'danger'
}

export interface ItemProgramInfo {
  name: string
  description: string;
  sort_order: number
}

export interface ItemProgram {
  id: number;
  name: string;
  description: string;
  has_target: number;
  current_progress: number;
  period_start_date: string;
  period_end_date: string;
  status: number;
  created_at: string;
  updated_at: string;
  donation_sum?: number;
  donation_count?: number;
  program_images: string[];
  program_categories: string[]
  program_info?: ItemProgramInfo[]
}

export interface ItemProgramList {
  page: number
  limit?: number;
  search?: string;
  total_row?: number;
  total_page: number;
  items?: ItemProgram[]
}

export interface ItemProgramDetail {
  data?: ItemProgram
}

export interface ICategory {
  id: number,
  name: string
}

export interface ICategoryList {
  items: ICategory[]
}

export interface IProgramState {
  loadingList: boolean;
  dataList: ItemProgramList;
  loadingDetail: boolean,
  dataDetail: ItemProgramDetail;
  loadingListCategory: boolean;
  dataListCategory: ICategoryList;
  alert: any;
}

const initialState: IProgramState = {
  loadingList: false,
  dataList: {} as ItemProgramList,
  loadingDetail: false,
  dataDetail: {} as ItemProgramDetail,
  loadingListCategory: false,
  dataListCategory: {} as ICategoryList,
  alert: {}
};

export const host = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  }
});

export const getListProgram = createAsyncThunk(`get/getListProgram`, async ({ page, limit, category, more }: { page: number, limit: number, category?: number, more?: boolean }, { dispatch, rejectWithValue }) => {
  try {
    const response = await host.get(`/v1/program?page=${page}&limit=${limit}${category ? `&category=${category}` : ''}`)
    return response.data
  } catch (error: any) {
    console.log(error)
    dispatch(setAlertState({
      type: 'danger',
      header: 'Error',
      description: error?.response?.data?.error?.message || error?.message
    }))
    return rejectWithValue(null)
  }
})

export const getListProgramDetail = createAsyncThunk(`get/getListProgramDetail`, async (id: string, { dispatch, rejectWithValue }) => {
  try {
    const response = await host.get(`/v1/program/${id}`)
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

export const getListProgramCategories = createAsyncThunk(`get/getListProgramCategories`, async ({ } = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await host.get(`/v1/program/categories`)
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

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setProgramState: (state, action: PayloadAction<boolean>) => {
      // state.loadingList = action.payload;
    },
    setAlertState: (state, action: PayloadAction<AlertProp>) => {
      state.alert = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListProgram.pending, (state, action) => {
        state.loadingList = !action.meta?.arg?.more
      })
      .addCase(getListProgram.fulfilled, (state, action) => {
        state.loadingList = false
        if (action.meta?.arg?.more) {
          const data = action.payload.items
          state.dataList = { ...action.payload, items: [...(state.dataList.items || []), ...(data || [])] }
        } else {
          state.dataList = action.payload
        }
      })
      .addCase(getListProgramDetail.pending, (state, action) => {
        state.loadingDetail = true
        state.dataDetail = {}
      })
      .addCase(getListProgramDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.dataDetail = action.payload
      })
      .addCase(getListProgramCategories.pending, (state, action) => {
        state.loadingListCategory = true
      })
      .addCase(getListProgramCategories.fulfilled, (state, action) => {
        state.loadingListCategory = false
        state.dataListCategory = action.payload
      })
  }
});

export const { setProgramState, setAlertState } = programSlice.actions;
export const programReducer = programSlice.reducer;
