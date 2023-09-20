import { LoaderFunctionArgs, createMemoryRouter } from "react-router-dom";
import App from "./routes/mainLayoutPage/App";
import HomePage from "./routes/homePage/HomePage";
import StorePage from "./routes/storePage/StorePage";
import ProductsDisplay from "./components/products/ProductsDisplay";
import { ReactNode } from "react";
import { ApiCategoryData, ApiProductData, CartItem } from "./appTypes";
import { CartContext } from "./routes/mainLayoutPage/App";
import { Mock } from "vitest";
import CheckoutPage from "./routes/checkoutPage/CheckoutPage";

const fakeCategoryData: ApiCategoryData[] = [
  {
    id: "0",
    name: "fakeCategory1",
  },
  {
    id: "1",
    name: "fakeCategory2",
  },
  {
    id: "2",
    name: "fakeCategory3",
  },
];

const fakeProductData: ApiProductData[] = [
  {
    id: 0,
    title: "fake product 1",
    price: 999,
    category: "fakeCategory1",
    description: "fake description 1",
    image: "fake_image_url",
  },
  {
    id: 1,
    title: "fake product 2",
    price: 999,
    category: "fakeCategory2",
    description: "fake description 2",
    image: "fake_image_url",
  },
  {
    id: 2,
    title: "fake product 3",
    price: 999,
    category: "fakeCategory3",
    description: "fake description 3",
    image: "fake_image_url",
  },
  {
    id: 3,
    title: "fake product 4",
    price: 999,
    category: "fakeCategory1",
    description: "fake description 4",
    image: "fake_image_url",
  },
  {
    id: 4,
    title: "fake product 5",
    price: 999,
    category: "fakeCategory2",
    description: "fake description 5",
    image: "fake_image_url",
  },
  {
    id: 5,
    title: "fake product 6",
    price: 999,
    category: "fakeCategory3",
    description: "fake description 6",
    image: "fake_image_url",
  },
  {
    id: 6,
    title: "fake product 7",
    price: 999,
    category: "fakeCategory1",
    description: "fake description 7",
    image: "fake_image_url",
  },
  {
    id: 7,
    title: "fake product 8",
    price: 999,
    category: "fakeCategory2",
    description: "fake description 8",
    image: "fake_image_url",
  },
  {
    id: 8,
    title: "fake product 9",
    price: 999,
    category: "fakeCategory3",
    description: "fake description 9",
    image: "fake_image_url",
  },
];

const routes = [
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
        loader: () => {
          return { categories: fakeCategoryData };
        },
        children: [
          {
            index: true,
            element: <ProductsDisplay />,
            loader: () => {
              return { data: fakeProductData };
            },
          },
          {
            path: ":category",
            element: <ProductsDisplay />,
            loader: ({ params }: LoaderFunctionArgs) => {
              return {
                data: fakeProductData.filter(
                  (item) => item.category === params.category,
                ),
              };
            },
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
];

const allRouter = createMemoryRouter(routes);

const shopRouter = createMemoryRouter(routes, {
  initialEntries: ["/", "/shop"],
  initialIndex: 1,
});

const checkoutRouter = createMemoryRouter(routes, {
  initialEntries: ["/", "/checkout"],
  initialIndex: 1,
});

interface fakeProps {
  cart: CartItem[];
  addCartItem: Mock<[item: any], number> | (() => void);
  updateCartItem: () => void;
  deleteCartItem: () => void;
  children?: ReactNode | undefined;
}

const FakeContextProvider = ({
  cart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  children,
}: fakeProps) => {
  return (
    <CartContext.Provider
      value={{ cart, addCartItem, updateCartItem, deleteCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

const returnWithContext = (
  cart: CartItem[],
  addFn: Mock<[item: any], number> | (() => void),
  updateFn: () => void,
  deleteFn: () => void,
  children: ReactNode,
) => {
  return (
    <FakeContextProvider
      cart={cart}
      addCartItem={addFn}
      updateCartItem={updateFn}
      deleteCartItem={deleteFn}
    >
      {children}
    </FakeContextProvider>
  );
};

export {
  allRouter,
  shopRouter,
  checkoutRouter,
  FakeContextProvider,
  fakeProductData,
  returnWithContext,
};
