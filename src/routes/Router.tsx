import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./mainLayoutPage/App";
import HomePage from "./homePage/HomePage";
import {loader as homeLoader} from "./homePage/HomePageLoader";
import StorePage from "./storePage/StorePage";
import { loader as categoryLoader } from "./storePage/StorePageLoader";
import ProductsDisplay from "../components/products/ProductsDisplay";
import { loader as productsLoader } from "../components/products/ProductsDisplayLoader";
import CheckoutPage from "./checkoutPage/CheckoutPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <h1>Error</h1>,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: homeLoader,
        },
        {
          path: "shop",
          element: <StorePage />,
          loader: categoryLoader,
          children: [
            {
              index: true,
              element: <ProductsDisplay />,
              loader: productsLoader,
            },
            {
              path: ":category",
              element: <ProductsDisplay />,
              loader: productsLoader,
            },
          ],
        },
        {
          path: "about",
          element: <h1>About</h1>,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
