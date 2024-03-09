import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetFieldResult } from "features/ProductFilters/types/productFilters";
import axiosInstance from "shared/api/api";

export const fetchBrands = createAsyncThunk<GetFieldResult>(
  "getBrand",
  async () => {
    const response = await axiosInstance.post("", {
      action: "get_fields",
      params: { field: "brand" },
    });
    return await response.data;
  }
);
