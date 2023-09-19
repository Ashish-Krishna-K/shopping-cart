import { type ProductsDisplayLoaderTypes } from "../../appTypes";
import { useLoaderData } from "react-router-dom";
import ProductItem from "../productItem/ProductItem";

const ProductsDisplay = () => {
  const { data } = useLoaderData() as ProductsDisplayLoaderTypes;

  return (
    <ul>
      {data.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default ProductsDisplay;
