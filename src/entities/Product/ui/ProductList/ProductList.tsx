import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.scss";
import { Product } from "entities/Product/model/types/product";

interface ProductListProps {
  products: Product[] | null;
}
const ProductList = (props: ProductListProps) => {

  const { products } = props;
  return (
    <div className={"ProductList"}>
      {products?.length ? (
        products.map((product) => (
          <div className={"listItem"} key={product.id}>
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
