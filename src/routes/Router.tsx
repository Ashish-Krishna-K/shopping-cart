import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./mainLayoutPage/App";
import HomePage from "./homePage/HomePage";
import { loader as homeLoader } from "./homePage/HomePageLoader";
import StorePage from "./storePage/StorePage";
import { loader as categoryLoader } from "./storePage/StorePageLoader";
import ProductsDisplay from "../components/products/ProductsDisplay";
import { loader as productsLoader } from "../components/products/ProductsDisplayLoader";
import CheckoutPage from "./checkoutPage/CheckoutPage";
import { useState } from "react";
import { type CartItem } from "../appTypes";
import { CartContext } from "../routes/mainLayoutPage/App";
import { PropsWithChildren } from "react";
import ErrorPage from "./errorPage/ErrorPage";

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const addCartItem = (newCartItem: CartItem) => {
    // simply adding the provided item to the array
    setCart([...cart, newCartItem]);
  };
  const updateCartItem = (newCartItem: CartItem) => {
    // if item already exists in the cart replace it with provided item
    setCart(
      cart.map((item) => (item.id === newCartItem.id ? newCartItem : item)),
    );
  };
  const deleteCartItem = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };
  return (
    <CartContext.Provider
      value={{ cart, addCartItem, updateCartItem, deleteCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
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
          path: "checkout",
          element: <CheckoutPage />,
        },
      ],
    },
  ]);

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
};

export default Router;
