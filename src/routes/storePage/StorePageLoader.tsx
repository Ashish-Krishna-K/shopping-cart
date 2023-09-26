import { LoaderFunction } from "react-router-dom";
import { type LocalCategoryCache } from "../../appTypes";

// same as the homePageLoader.tsx

const getCategoryDataFromLocalStorage = () => {
  const rawData = window.localStorage.getItem("categories");
  if (rawData) {
    const data = JSON.parse(rawData) as LocalCategoryCache;
    const hoursDiff = Math.abs(data.storedAt - Date.now()) / 36e5;
    if (hoursDiff > 24) return null;
    return data.categories;
  }
  return null;
};

const loader: LoaderFunction = async () => {
  const url = "https://fakestoreapi.com/products/categories";
  const cachedData = getCategoryDataFromLocalStorage();
  if (cachedData === null) {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(response.statusText);
    const data = (await response.json()) as string[];
    const convertedData = data.map((name) => {
      return {
        id: crypto.randomUUID(),
        name,
      };
    });
    const toCache: LocalCategoryCache = {
      storedAt: Date.now(),
      categories: convertedData,
    };
    window.localStorage.setItem("categories", JSON.stringify(toCache));
    return { categories: convertedData };
  } else {
    return { categories: cachedData };
  }
};

export { loader };
