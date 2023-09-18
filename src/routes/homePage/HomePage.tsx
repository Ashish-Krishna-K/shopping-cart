import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Welcome to Fake store!</h1>
      <p>
        Fake store is a fake store! There is nothing to buy here, but you're
        welcome to pretent like you're buying something.
      </p>
      <Link to={"/shop"}>Shop Now</Link>
    </>
  );
};

export default HomePage;
