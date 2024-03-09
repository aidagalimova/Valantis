import { Product } from "entities/Product/model/types/product";
import "./ProductCard.scss";

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={"ProductCard"}>
      <div className="price">{product.price} ₽</div>
      <div className="title">{product.product}</div>
      <div className="brand">{product.brand}</div>
      <div className="id">ID: {product.id}</div>
    </div>
  );
};

export default ProductCard;
