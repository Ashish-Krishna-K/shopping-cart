import { NavLink, useLoaderData } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import { ProductsDisplayLoaderTypes } from "../../appTypes";

const HomePage = () => {
  const { data } = useLoaderData() as ProductsDisplayLoaderTypes;
  return (
    <>
      <h1>Welcome to Fake store!</h1>
      <p>
        Fake store is a fake store! There is nothing to buy here, but you're
        welcome to pretent like you're buying something.
      </p>
      {data && <Carousel products={data} />}
      <NavLink to={"/shop"}>Shop Now</NavLink>
    </>
  );
};

export default HomePage;
