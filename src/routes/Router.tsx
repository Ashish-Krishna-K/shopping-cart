import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./homePage/HomePage";
import StorePage from "./storePage/StorePage";

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
          path: "/shop",
          element: <StorePage />,
        },
        {
          path: "/product/:productId",
          element: <h1>Product</h1>,
        },
        {
          path: "/checkout",
          element: <h1>Checkout</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
