import { LoaderFunction } from "react-router-dom";
import { type ApiProductData } from "../../appTypes";

const loader: LoaderFunction = async ({ params }) => {
  const url = params.category
    ? `https://fakestoreapi.com/products/category/${params.category}?limit=10`
    : `https://fakestoreapi.com/products`;
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) throw new Error(response.statusText);
  const data = (await response.json()) as ApiProductData[];
  return { data };
};

export { loader };
