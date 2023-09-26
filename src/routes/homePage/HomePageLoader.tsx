import { LoaderFunction } from "react-router-dom";
import { type LocalProductCache, type ApiProductData } from "../../appTypes";

// A simple and naive attempt to cache (atleast some) responses from API
const getHomeDataFromLocalStorage = () => {
  const rawData = window.localStorage.getItem("home");
  if (rawData) {
    const data = JSON.parse(rawData) as LocalProductCache;
    // If the data was added to localStorage more than 24 hours ago then 
    // return null so fresh data can be fetched from the API
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
    // there's no cached data(or cache is more than 24 hours old)
    // so fetch new data
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(response.statusText);
    const data = (await response.json()) as ApiProductData[];
    // cache the fetched data
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
