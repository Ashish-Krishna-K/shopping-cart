import { LoaderFunctionArgs, createMemoryRouter } from "react-router-dom";
import App from "./routes/mainLayoutPage/App";
import HomePage from "./routes/homePage/HomePage";
import StorePage from "./routes/storePage/StorePage";
import ProductsDisplay from "./components/products/ProductsDisplay";
import {
  type ApiCategoryData,
  type ApiProductData,
  type fakeProps,
} from "./appTypes";
import { CartContext } from "./routes/mainLayoutPage/App";
import CheckoutPage from "./routes/checkoutPage/CheckoutPage";
import ErrorPage from "./routes/errorPage/ErrorPage";

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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: () => {
          return { data: fakeProductData };
        },
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

export {
  fakeCategoryData,
  allRouter,
  shopRouter,
  checkoutRouter,
  FakeContextProvider,
  fakeProductData,
};
