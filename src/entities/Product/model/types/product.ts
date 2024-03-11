export interface Product {
  id: string;
  brand?: string;
  product: string;
  price: number;
}

export interface ProductSchema {
  ids: Set<number> | null;
  products: {
    [key: string]: Product;
  } | null;
  isLoading: boolean;
  error: string;
}

export interface GetProductsResult {
  result: Product[];
}
