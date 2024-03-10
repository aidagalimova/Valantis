import { RootState } from "app/store/store";
import { ProductList } from "entities/Product";
import { fetchProducts } from "entities/Product/model/services/fetchProducts";
import { clearProducts } from "entities/Product/model/slices/slice";
import { fetchProductIds } from "features/ProductFilters/model/services/fetchProductIds";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { ReactNode, useEffect, useState } from "react";
import { Loader, Pagination } from "shared/ui";
import { setOffset } from "../model/slices/slice";
import { Product } from "entities/Product/model/types/product";

const ProductPaginationList = () => {
  const {
    ids,
    isLoading: isIdsLoading,
    isFiltered,
  } = useAppSelector((state: RootState) => state.productFilters);
  const { products, isLoading } = useAppSelector(
    (state: RootState) => state.product
  );
  const { offset, limit } = useAppSelector(
    (state: RootState) => state.productPagination
  );
  const dispatch = useAppDispatch();

  const [productsArray, setProductsArray] = useState<Product[] | null>(null);
  useEffect(() => {
    if (products) setProductsArray(Object.values(products));
  }, [products]);
  useEffect(() => {
    dispatch(fetchProductIds({ offset, limit }));
  }, [offset]);

  useEffect(() => {
    if (ids && ids.size !== 0) {
      dispatch(fetchProducts(Array.from(ids)));
    } else {
      dispatch(clearProducts());
    }
  }, [ids]);

  return (
    <div>
      {!isLoading && !isIdsLoading ? (
        <>
          <ProductList products={productsArray?.slice(0, 50)} />
          {productsArray && !isFiltered ? (
            <Pagination
              isLeft={offset !== 0}
              isRight={productsArray?.length > 50}
              onLeft={() => dispatch(setOffset(-50))}
              onRight={() => dispatch(setOffset(50))}
            />
          ) : null}
        </>
      ) : (
        <div className="loaderContainer">
          <Loader />
        </div>
      )}
    </div>
  );
};
export default ProductPaginationList;
