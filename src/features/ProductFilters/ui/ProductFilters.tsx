import { SearchInput, RangeInput, SelectorInput, Button } from "shared/ui";
import "./ProductFilters.scss";
import { useAppSelector } from "hooks/useAppSelector";
import { RootState } from "app/store/store";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { fetchBrands } from "../model/services/fetchBrands";
import { filterProducts } from "../model/services/filterProducts";
import { fetchPrices } from "../model/services/fetchPrices";
import { SelectedPrice } from "../types/productFilters";
import { fetchProductIds } from "../model/services/fetchProductIds";
import { setIsFiltered } from "../model/slices/slice";
const ProductFilters = () => {
  const { brands, prices } = useAppSelector(
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
    if (!selectedBrand && !selectedName && !selectedPrice?.value) {
      dispatch(setIsFiltered(false));
      dispatch(fetchProductIds({ offset: 0, limit: 50 }));
    } else {
      dispatch(
        filterProducts({
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
