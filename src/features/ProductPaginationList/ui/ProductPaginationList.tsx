import { useEffect, useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { RootState } from "app/store/store";
import { setOffset } from "../model/slices/slice";
import { ProductList } from "entities/Product";
import { fetchProducts } from "entities/Product/model/services/fetchProducts";
import { clearProducts } from "entities/Product/model/slices/slice";
import { fetchProductIds } from "features/ProductFilters/model/services/fetchProductIds";
import { fetchFilteredProducts } from "features/ProductFilters/model/services/fetchFilteredProducts";
import { Product } from "entities/Product/model/types/product";
import { Loader, Pagination } from "shared/ui";

const ProductPaginationList = () => {
  const dispatch = useAppDispatch();
  const {
    ids,
    isLoading: isIdsLoading,
    isFiltered,
    filteredProducts,
    fetchProductIdsRejected,
    fetchFilteredProductsRejected,
  } = useAppSelector((state: RootState) => state.productFilters);

  const { products, isLoading, fetchProductsRejected } = useAppSelector(
    (state: RootState) => state.product
  );

  const { offset, limit } = useAppSelector(
    (state: RootState) => state.productPagination
  );

  const [productsArray, setProductsArray] = useState<Product[] | null>(null);

  useEffect(() => {
    dispatch(fetchProductIds({ offset, limit }));
  }, []);

  // Если запрос вернул ошибку, делаем новый запрос (необходимо по заданию)
  useEffect(() => {
    if (fetchProductIdsRejected) {
      dispatch(fetchProductIds({ offset, limit }));
    }
  }, [fetchProductIdsRejected]);

  useEffect(() => {
    if (fetchFilteredProductsRejected && ids && ids.size !== 0) {
      dispatch(fetchFilteredProducts(Array.from(ids)));
    }
  }, [fetchFilteredProductsRejected]);
  useEffect(() => {
    if (fetchProductsRejected && ids && ids.size !== 0) {
      dispatch(fetchProducts(Array.from(ids)));
    }
  }, [fetchProductsRejected]);

  //Выбрать товары из общего списка
  useEffect(() => {
    if (products && !isFiltered) setProductsArray(Object.values(products));
  }, [products]);

  //Выбрать товары из отфильтрованного списка
  useEffect(() => {
    if (filteredProducts && isFiltered) {
      setProductsArray(Object.values(filteredProducts));
    }
  }, [filteredProducts]);

  useEffect(() => {
    if (ids && ids.size !== 0) {
      if (!isFiltered) {
        dispatch(fetchProducts(Array.from(ids)));
      } else {
        dispatch(fetchFilteredProducts(Array.from(ids)));
      }
    } else {
      dispatch(clearProducts());
    }
  }, [ids]);

  const onLeftHandler = () => {
    dispatch(setOffset(-50));
  };

  const onRightHandler = () => {
    // Если не применены фильтры и если след. страница не была уже загружена, получить товары для след.страницы
    if (
      !isFiltered &&
      productsArray?.slice(offset + 50, offset + 100).length !== 50
    ) {
      dispatch(fetchProductIds({ offset: offset + 50, limit }));
    }
    dispatch(setOffset(50));
  };

  return (
    <div>
      {!isLoading && !isIdsLoading ? (
        <>
          <ProductList products={productsArray?.slice(offset, offset + 50)} />
          {productsArray ? (
            <Pagination
              isLeft={offset !== 0}
              isRight={productsArray?.slice(offset, offset + 50).length >= 50}
              onLeft={onLeftHandler}
              onRight={onRightHandler}
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
