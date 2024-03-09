import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetIdsRequest,
  GetIdsResult,
} from "features/ProductFilters/types/productFilters";
import axiosInstance from "shared/api/api";

export const fetchProductIds = createAsyncThunk<GetIdsResult, GetIdsRequest>(
  "getIds",
  async ({ offset, limit }) => {
    const response = await axiosInstance.post("", {
      action: "get_ids",
      params: { offset, limit },
    });
    return await response.data;
  }
);
