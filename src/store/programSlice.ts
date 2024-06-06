import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  program_images: string[];
  program_categories: string[]
}

export interface ItemProgramList {
  page?: number
  limit?: number;
  search?: string;
  total_row?: number;
  total_page?: number;
  items?: ItemProgram[]
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
  loadingListCategory: boolean;
  dataListCategory: ICategoryList;
}

const initialState: IProgramState = {
  loadingList: false,
  dataList: {} as ItemProgramList,
  loadingListCategory: false,
  dataListCategory: {} as ICategoryList,
};

export const host = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  }
});

export const getListProgram = createAsyncThunk(`get/getListProgram`, async () => {
  const response = await host.get(`/v1/program?page=1&limit=10`)
  return response.data
})

export const getListProgramCategories = createAsyncThunk(`get/getListProgramCategories`, async () => {
  const response = await host.get(`/v1/program/categories`)
  return response.data
})

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setProgramState: (state, action: PayloadAction<boolean>) => {
      state.loadingList = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListProgram.pending, (state, action) => {
        state.loadingList = true
      })
      .addCase(getListProgram.fulfilled, (state, action) => {
        state.loadingList = false
        state.dataList = action.payload
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

export const { setProgramState } = programSlice.actions;
export const programReducer = programSlice.reducer;
