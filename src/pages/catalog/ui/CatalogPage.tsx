import { ProductFilters } from "features/ProductFilters";
import { ProductPaginationList } from "features/ProductPaginationList";
import "./CatalogPage.scss";

const CatalogPage = () => {
  return (
    <div className="CatalogPage">
      <h1 className="catalog-title">{"Каталог товаров"}</h1>
      <ProductFilters />
      <ProductPaginationList />
    </div>
  );
};

export default CatalogPage;
