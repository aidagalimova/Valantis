import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "shared/api/api";
import { GetProductsResult } from "../types/product";

export const fetchProducts = createAsyncThunk<
  GetProductsResult,
  number[]
>("getProducts", async (ids) => {
  const response = await axiosInstance.post("", {
    action: "get_items",
    params: { ids },
  });
  return await response.data;
});
