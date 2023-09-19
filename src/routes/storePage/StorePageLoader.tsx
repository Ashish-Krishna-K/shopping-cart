import { LoaderFunction } from "react-router-dom";

const loader: LoaderFunction = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories",
    );
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
