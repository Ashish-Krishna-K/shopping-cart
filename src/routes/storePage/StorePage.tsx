import { type ApiCategoryData } from "../../appTypes";
import FilterSidebar from "../../components/filterSidebar/FilterSidebar";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import styles from "./StorePage.module.css";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const StorePage = () => {
  const { categories } = useLoaderData() as { categories: ApiCategoryData[] };
  const navigation = useNavigation();

  if (navigation.state === "loading") return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className={styles.storePage}>
      {categories && <FilterSidebar data={categories} />}
      <Outlet />
    </section>
  );
};

export default StorePage;
