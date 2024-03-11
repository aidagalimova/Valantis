import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchBrands } from "../services/fetchBrands";
import { fetchPrices } from "../services/fetchPrices";
import { fetchFilterProductsIds } from "../services/fetchFilterProductsIds";
import { fetchProductIds } from "../services/fetchProductIds";
import { fetchFilteredProducts } from "../services/fetchFilteredProducts";
import { GetProductsResult } from "entities/Product/model/types/product";
import {
  GetFieldResult,
  GetIdsResult,
  ProductFiltersSchema,
} from "features/ProductFilters/types/productFilters";

const initialState: ProductFiltersSchema = {
  brands: null,
  prices: [],
  ids: null,
  filteredProducts: null,
  isLoading: false,
  isFiltered: false,
  error: "",
  fetchFilterProductsIdsRejected: false,
  fetchProductIdsRejected: false,
  fetchFilteredProductsRejected: false,
};

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    setIsFiltered: (state, action) => {
      state.isFiltered = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET BRANDS
    builder.addCase(
      fetchBrands.fulfilled,
      (state, action: PayloadAction<GetFieldResult>) => {
        state.brands = action.payload.result
          .filter((x: string | null): x is string => x != null)
          .reduce((arr, value) => ({ ...arr, [value]: value }), {});
      }
    );
    // GET PRICES
    builder.addCase(
      fetchPrices.fulfilled,
      (state, action: PayloadAction<GetFieldResult>) => {
        const prices = action.payload.result
          .filter((x: string | null): x is string => x != null)
          .map((el) => parseFloat(el))
          .sort((a, b) => a - b);
        state.prices = [...new Set(prices)];
      }
    );
    // GET FILTERED PRODUCTS IDS
    builder.addCase(
      fetchFilterProductsIds.fulfilled,
      (state, action: PayloadAction<GetIdsResult>) => {
        state.ids = new Set(action.payload.result);
        state.isFiltered = true;
        state.isLoading = false;
        state.fetchFilterProductsIdsRejected = false;
      }
    );

    builder.addCase(fetchFilterProductsIds.rejected, (state) => {
      state.isLoading = false;
      state.fetchFilterProductsIdsRejected = true;
    });

    // GET ID
    builder.addCase(
      fetchProductIds.fulfilled,
      (state, action: PayloadAction<GetIdsResult>) => {
        state.ids = new Set(action.payload.result);
        state.isLoading = false;
        state.fetchProductIdsRejected = false;
      }
    );
    builder.addCase(fetchProductIds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductIds.rejected, (state) => {
      state.isLoading = false;
      state.fetchProductIdsRejected = true;
    });

    // GET FILTERED ITEMS
    builder.addCase(
      fetchFilteredProducts.fulfilled,
      (state, action: PayloadAction<GetProductsResult>) => {
        const res = action.payload.result.reduce(
          (arr, value) => ({ ...arr, [value.id]: value }),
          {}
        );
        state.filteredProducts = res;
        state.isLoading = false;
        state.fetchFilteredProductsRejected = false;
      }
    );
    builder.addCase(fetchFilteredProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFilteredProducts.rejected, (state) => {
      state.isLoading = false;
      state.fetchFilteredProductsRejected = true;
    });

    builder.addMatcher(
      isAnyOf(
        fetchProductIds.rejected,
        fetchBrands.rejected,
        fetchPrices.rejected,
        fetchProductIds.rejected,
        fetchFilteredProducts.rejected,
        fetchFilterProductsIds.rejected
      ),
      (state, action) => {
        console.log(action.error.message);
      }
    );
  },
});

export const { setIsFiltered } = productFiltersSlice.actions;
export default productFiltersSlice.reducer;
