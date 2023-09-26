import { type ProductsDisplayLoaderTypes } from "../../appTypes";
import { useLoaderData } from "react-router-dom";
import ProductItem from "../productItem/ProductItem";
import styles from "./ProductsDisplay.module.css";

// I know it's weird that this is an whole component in itself,
// it's just the PrductItem is just a big component so I thought
// it's ideal to extract it into a seperate componenet but on
// hindsight I could've structured it better.
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
