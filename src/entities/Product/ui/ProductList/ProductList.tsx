import ProductCard from "../ProductCard/ProductCard";
import { Product } from "entities/Product/model/types/product";
import "./ProductList.scss";

interface ProductListProps {
  products?: Product[] | null;
}
const ProductList = (props: ProductListProps) => {
  const { products } = props;
  return (
    <div className={"ProductList"}>
      {products?.length ? (
        products.map((product) => (
          <div className={"productListItem"} key={product.id}>
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <div className="noProductText">{"Товары отсутствуют"}</div>
      )}
    </div>
  );
};

export default ProductList;
