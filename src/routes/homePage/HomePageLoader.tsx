import { LoaderFunction } from "react-router-dom";
import { LocalProductCache, type ApiProductData } from "../../appTypes";

const getHomeDataFromLocalStorage = () => {
  const rawData = window.localStorage.getItem("home");
  if (rawData) {
    const data = JSON.parse(rawData) as LocalProductCache;
    const hoursDiff = Math.abs(data.storedAt - Date.now()) / 36e5;
    if (hoursDiff > 24) return null;
    return data.products;
  }
  return null;
};

const loader: LoaderFunction = async () => {
  const url = `https://fakestoreapi.com/products?limit=5`;
  const cachedData = getHomeDataFromLocalStorage();
  if (cachedData === null) {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(response.statusText);
    const data = (await response.json()) as ApiProductData[];
    const toCache: LocalProductCache = {
      storedAt: Date.now(),
      products: data,
    };
    window.localStorage.setItem("home", JSON.stringify(toCache));
    return { data };
  } else {
    return { data: cachedData };
  }
};
export { loader };
