import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchBrands } from "../services/fetchBrands";
import {
  GetFieldResult,
  GetIdsResult,
  ProductFiltersSchema,
} from "features/ProductFilters/types/productFilters";
import { fetchPrices } from "../services/fetchPrices";
import { filterProducts } from "../services/filterProducts";
import { fetchProductIds } from "../services/fetchProductIds";

const initialState: ProductFiltersSchema = {
  brands: null,
  prices: [],
  ids: null,
  isLoading: false,
  error: "",
  offset: 0,
  limit: 51,
};

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {},
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
    // GET FILTERED PRODUCTS
    builder.addCase(
      filterProducts.fulfilled,
      (state, action: PayloadAction<GetIdsResult>) => {
        state.ids = new Set(action.payload.result);
      }
    );

    builder.addCase(filterProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
    // GET ID
    builder.addCase(
      fetchProductIds.fulfilled,
      (state, action: PayloadAction<GetIdsResult>) => {
        state.ids = new Set(action.payload.result);
        state.isLoading = false;
      }
    );
    builder.addCase(fetchProductIds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductIds.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addMatcher(
      isAnyOf(
        fetchProductIds.rejected,
        fetchBrands.rejected,
        fetchPrices.rejected,
        filterProducts.rejected,
        fetchProductIds.rejected
      ),
      (state, action) => {
        console.log(action.error.message);
      }
    );
  },
});

export default productFiltersSlice.reducer;
