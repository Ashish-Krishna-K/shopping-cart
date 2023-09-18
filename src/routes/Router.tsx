import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>Home</h1>,
      errorElement: <h1>Error</h1>
    },
    {
      path: "/shop",
      element: <h1>Shop</h1>
    },
    {
      path: "/product/:productId",
      element: <h1>Product</h1>
    },
    {
      path: "/checkout",
      element: <h1>Checkout</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
