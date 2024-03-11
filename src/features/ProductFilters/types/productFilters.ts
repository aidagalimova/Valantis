import { Product } from "entities/Product/model/types/product";

export interface ProductFiltersSchema {
  brands: { [key: string]: string } | null;
  prices: number[];
  ids: Set<number> | null;
  isLoading: boolean;
  isFiltered: boolean;
  error: string;
  filteredProducts: {
    [key: string]: Product;
  } | null;
  fetchFilterProductsIdsRejected: boolean;
  fetchProductIdsRejected: boolean;
  fetchFilteredProductsRejected: boolean;
  fetchPricesRejected: boolean;
  fetchBrandsRejected: boolean;
}
export interface GetFieldResult {
  result: (string | null)[];
}

export interface GetIdsResult {
  result: number[];
}

export interface SelectedPrice {
  index: number;
  value: number;
}

export interface GetIdsRequest {
  limit?: number;
  offset?: number;
}

export interface FilterRequest {
  price?: number;
  brand?: string;
  product?: string;
}
