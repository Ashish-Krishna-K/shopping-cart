import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./mainLayoutPage/App";
import HomePage from "./homePage/HomePage";
import StorePage from "./storePage/StorePage";
import { loader as categoryLoader } from "./storePage/StorePageLoader";
import ProductsDisplay from "../components/products/ProductsDisplay";
import { loader as productsLoader } from "../components/products/ProductsDisplayLoader";

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
          element: <h1>Checkout</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
