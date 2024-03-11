import { useEffect, useState } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { RootState } from "app/store/store";
import { fetchBrands } from "../model/services/fetchBrands";
import { fetchPrices } from "../model/services/fetchPrices";
import { fetchProductIds } from "../model/services/fetchProductIds";
import { setIsFiltered } from "../model/slices/slice";
import { fetchFilterProductsIds } from "../model/services/fetchFilterProductsIds";
import { SelectedPrice } from "../types/productFilters";
import { SearchInput, RangeInput, SelectorInput, Button } from "shared/ui";
import "./ProductFilters.scss";
import { resetOffset } from "features/ProductPaginationList/model/slices/slice";

const ProductFilters = () => {
  const { brands, prices, fetchFilterProductsIdsRejected } = useAppSelector(
    (state: RootState) => state.productFilters
  );
  const dispatch = useAppDispatch();

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<SelectedPrice | null>(
    null
  );
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    dispatch(fetchPrices());
    dispatch(fetchBrands());
  }, []);

  // Если запрос вернул ошибку, делаем новый запрос (необходимо по заданию)
  useEffect(() => {
    if (fetchFilterProductsIdsRejected) {
      dispatch(
        fetchFilterProductsIds({
          price: selectedPrice?.value || undefined,
          brand: selectedBrand || undefined,
          product: selectedName || undefined,
        })
      );
    }
  }, [fetchFilterProductsIdsRejected]);

  const handleBrandSelect = (value: string) => {
    setSelectedBrand(value);
  };

  const handlePriceSelect = (value: SelectedPrice | null) => {
    setSelectedPrice(value);
  };

  const handleNameInput = (value: string) => {
    setSelectedName(value);
  };

  const handleProductsFilter = () => {
    dispatch(resetOffset());
    //Если фильтры не выбраны запросить общий список
    if (!selectedBrand && !selectedName && !selectedPrice?.value) {
      dispatch(setIsFiltered(false));
      dispatch(fetchProductIds({ offset: 0, limit: 100 }));
    } else {
      dispatch(
        fetchFilterProductsIds({
          price: selectedPrice?.value || undefined,
          brand: selectedBrand || undefined,
          product: selectedName || undefined,
        })
      );
    }
  };

  return (
    <div className="FiltersContainer">
      <div className="filtersForm">
        <div className="filters">
          <div className="nameInputContainer">
            <SearchInput
              value={selectedName}
              onChange={(value) => handleNameInput(value)}
              className="nameInput"
              placeholder="Поиск по названию"
            />
          </div>
          <div className="filtersContainer">
            <div className="brandInputContainer">
              <SelectorInput
                value={selectedBrand}
                values={brands}
                onChange={(value) => handleBrandSelect(value)}
                placeholder="Название бренда"
                className="brandSelector"
              />
            </div>
            <div className="priceInputContainer">
              <RangeInput
                values={prices}
                min={0}
                max={prices.length - 1}
                selectedItem={selectedPrice}
                onChange={handlePriceSelect}
                placeholder={"Введите цену"}
              />
            </div>
          </div>
        </div>
        <div className="btnContainer">
          <Button onClick={handleProductsFilter}>Применить</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
