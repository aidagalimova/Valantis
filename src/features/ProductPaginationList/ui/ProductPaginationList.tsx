import { RootState } from "app/store/store";
import { ProductList } from "entities/Product";
import { fetchProducts } from "entities/Product/model/services/fetchProducts";
import { clearProducts } from "entities/Product/model/slices/slice";
import { fetchProductIds } from "features/ProductFilters/model/services/fetchProductIds";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useEffect } from "react";
import { Loader } from "shared/ui";

const ProductPaginationList = () => {
  const { ids, isLoading: isIdsLoading } = useAppSelector(
    (state: RootState) => state.productFilters
  );
  const { products, isLoading } = useAppSelector(
    (state: RootState) => state.product
  );
  const { offset, limit } = useAppSelector(
    (state: RootState) => state.productPagination
  );
  const dispatch = useAppDispatch();

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
        <div>
          <ProductList products={products ? Object.values(products) : null} />
        </div>
      ) : (
        <div className="loaderContainer">
          <Loader />
        </div>
      )}
    </div>
  );
};
export default ProductPaginationList;
