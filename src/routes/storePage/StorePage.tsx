import { type ApiCategoryData } from "../../appTypes";
import FilterSidebar from "../../components/filterSidebar/FilterSidebar";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import styles from "./StorePage.module.css";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const StorePage = () => {
  const { categories } = useLoaderData() as { categories: ApiCategoryData[] };
  const navigation = useNavigation();

  // ensuring a loading spinner is shown to the user when they click on a link
  if (navigation.state === "loading") return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className={styles.storePage}>
      {categories && <FilterSidebar data={categories} />}
      <Outlet />
    </section>
  );
};

export default StorePage;
