import { LoaderFunction } from "react-router-dom";
import { type ApiProductData } from "../../appTypes";

const loader: LoaderFunction = async ({ params }) => {
  // Simply if there's no category we'll grab all the products from the API
  // and if a category is available we'll grab only those products.
  const url = params.category
    ? `https://fakestoreapi.com/products/category/${params.category}?limit=10`
    : `https://fakestoreapi.com/products`;
  const response = await fetch(url, { mode: "cors" });
  // Fetch doesn't consider error responses from the API as an error hence
  // if the response is not "ok" we'll throw error manually
  if (!response.ok) throw new Error(response.statusText);
  const data = (await response.json()) as ApiProductData[];
  return { data };
};

export { loader };
