import { useState } from "react";
import FilterSidebar from "../../components/FilterSidebar";

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ApiCategoryData>({
    id: "",
    name: "",
  });
  const handleCategorySelection = (item: ApiCategoryData) => {
    setSelectedCategory(item);
  };
  console.log(selectedCategory);
  return (
    <>
      <h1>Shop Page</h1>
      <FilterSidebar handleCategorySelection={handleCategorySelection} />
    </>
  );
};

export default StorePage;
