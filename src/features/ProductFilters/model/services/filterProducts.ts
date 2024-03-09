import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FilterRequest,
  GetIdsResult,
} from "features/ProductFilters/types/productFilters";
import axiosInstance from "shared/api/api";

export const filterProducts = createAsyncThunk<
  GetIdsResult,
  FilterRequest
>("filterProducts", async (filters) => {
  const response = await axiosInstance.post("", {
    action: "filter",
    params: filters,
  });
  return await response.data;
});
