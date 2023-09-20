import { LoaderFunction } from "react-router-dom";

const loader: LoaderFunction = async () => {
  const url = "https://fakestoreapi.com/products/categories";
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(response.statusText);
    const data = (await response.json()) as string[];
    const convertedData = data.map((name) => {
      return {
        id: crypto.randomUUID(),
        name,
      };
    });
    return { categories: convertedData };
  } catch (error: unknown) {
    console.error(error);
  }
};

export { loader };
