import { ProductFilters } from "features/ProductFilters";
import "./CatalogPage.scss";
import { ProductPaginationList } from "features/ProductPaginationList";
const CatalogPage = () => {
  return (
    <div className="CatalogPage">
      <h1 className="catalog-title">Каталог товаров</h1>
      <ProductFilters />
      <ProductPaginationList />
    </div>
  );
};

export default CatalogPage;
