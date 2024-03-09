import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetFieldResult } from "features/ProductFilters/types/productFilters";
import axiosInstance from "shared/api/api";

export const fetchPrices = createAsyncThunk<GetFieldResult>(
  "getPrices",
  async () => {
    const response = await axiosInstance.post("", {
      action: "get_fields",
      params: { field: "price" },
    });
    return await response.data;
  }
);
