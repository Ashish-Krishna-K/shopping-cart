import { useState } from "react";
import FilterSidebar from "../../components/FilterSidebar";
import {
  type ApiCategoryData,
  type CategorySelectionHandler,
} from "../../appTypes";
import ProductsDisplay from "../../components/products/ProductsDisplay";

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ApiCategoryData>({
    id: "",
    name: "",
  });
  const handleCategorySelection: CategorySelectionHandler = (
    item: ApiCategoryData,
  ) => {
    setSelectedCategory(item);
  };
  return (
    <>
      <h1>Shop Page</h1>
      <FilterSidebar handleCategorySelection={handleCategorySelection} />
      <ProductsDisplay category={selectedCategory.name} />
    </>
  );
};

export default StorePage;
