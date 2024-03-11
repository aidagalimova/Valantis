import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FilterRequest,
  GetIdsResult,
} from "features/ProductFilters/types/productFilters";
import axiosInstance from "shared/api/api";

export const fetchFilterProductsIds = createAsyncThunk<
  GetIdsResult,
  FilterRequest
>("fetchFilterProductsIds", async (filters) => {
  const response = await axiosInstance.post("", {
    action: "filter",
    params: filters,
  });
  return await response.data;
});
