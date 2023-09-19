import { LoaderFunction } from "react-router-dom";
import { type ApiProductData } from "../../appTypes";

const loader: LoaderFunction = async ({ params }) => {
  const url = params.category
    ? `https://fakestoreapi.com/products/category/${params.category}?limit=10`
    : `https://fakestoreapi.com/products?limit=10`;
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(response.statusText);
    const data = (await response.json()) as ApiProductData[];
    return { data };
  } catch (error) {
    console.error(error);
  }
};

export { loader };
