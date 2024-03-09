
export interface ProductFiltersSchema {
  brands: { [key: string]: string } | null;
  prices: number[];
  ids: Set<number> | null;
  offset: number;
  limit: number;
  isLoading: boolean;
  error: string;
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
