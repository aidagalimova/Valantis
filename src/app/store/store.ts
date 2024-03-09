import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "entities/Product/model/slices/slice";
import productFiltersReducer from "features/ProductFilters/model/slices/slice";
import productPaginationReducer from "features/ProductPaginationList/model/slices/slice";

const rootReducer = combineReducers({
  product: productReducer,
  productFilters: productFiltersReducer,
  productPagination: productPaginationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
