import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetProductsResult } from "entities/Product/model/types/product";
import axiosInstance from "shared/api/api";

export const fetchFilteredProducts = createAsyncThunk<
  GetProductsResult,
  number[]
>("getFilteredProducts", async (ids) => {
  const response = await axiosInstance.post("", {
    action: "get_items",
    params: { ids },
  });
  return await response.data;
});
