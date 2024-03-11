import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetProductsResult, ProductSchema } from "../types/product";
import { fetchProducts } from "../services/fetchProducts";

const initialState: ProductSchema = {
  ids: null,
  products: null,
  isLoading: false,
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = {};
    },
  },
  extraReducers: (builder) => {
    // GET PRODUCTS
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<GetProductsResult>) => {
        const res = action.payload.result.reduce(
          (arr, value) => ({ ...arr, [value.id]: value }),
          {}
        );
        state.products = { ...state.products, ...res };
        state.isLoading = false;
      }
    );
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log(action.error.message);
      state.isLoading = false;
    });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
