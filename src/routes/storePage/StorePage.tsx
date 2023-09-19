import { type ApiCategoryData } from "../../appTypes";
import FilterSidebar from "../../components/filterSidebar/FilterSidebar";
import { Outlet, useLoaderData } from "react-router-dom";

const StorePage = () => {
  const { categories } = useLoaderData() as { categories: ApiCategoryData[] };
  return (
    <>
      <h1>Shop Page</h1>
      {categories && <FilterSidebar data={categories} />}
      <Outlet />
    </>
  );
};

export default StorePage;
