import { NavLink, useLoaderData, useNavigation } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import { type ProductsDisplayLoaderTypes } from "../../appTypes";
import styles from "./HomePage.module.css";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const HomePage = () => {
  const { data } = useLoaderData() as ProductsDisplayLoaderTypes;
  const navigation = useNavigation();

  // showing a loading spinner when user clicks on the shop page as there's a short
  // delay before the page is loaded
  if (navigation.state === "loading") return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className={styles.homePage}>
      <div className={styles.homeHeader}>
        <h2>Welcome to Fake store!</h2>
        <p>
          Fake store is a fake store! There is nothing to buy here, but you're
          welcome to pretent like you're buying something.
          <NavLink
            to={"/shop"}
            className={({ isActive, isPending }) =>
              isActive
                ? styles.activeLink
                : isPending
                ? styles.pendingLink
                : styles.cta
            }
          >
            Shop Now
          </NavLink>
        </p>
      </div>
      {data && <Carousel products={data} />}
    </section>
  );
};

export default HomePage;
