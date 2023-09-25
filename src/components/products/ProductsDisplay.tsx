import { type ProductsDisplayLoaderTypes } from "../../appTypes";
import { useLoaderData } from "react-router-dom";
import ProductItem from "../productItem/ProductItem";
import styles from "./ProductsDisplay.module.css";

const ProductsDisplay = () => {
  const { data } = useLoaderData() as ProductsDisplayLoaderTypes;

  return (
    <ul className={styles.productsList}>
      {data.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default ProductsDisplay;
