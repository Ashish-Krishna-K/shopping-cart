import { useEffect, useState } from "react";
import { ApiProductData, type ProductsDisplayPropTypes } from "../../appTypes";

const useFetchData = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ApiProductData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, { mode: "cors" });
        if (!response.ok) throw new Error(response.statusText);
        const data = (await response.json()) as ApiProductData[];
        setError("");
        setData(data);
      } catch (error) {
        console.error(error);
        setData([]);
        if (typeof error === "string") setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!ignore) void fetchData();
    return () => {
      ignore = true;
    };
  }, [url]);

  return {
    isLoading,
    data,
    error,
  };
};

const ProductItem = ({ item }: { item: ApiProductData }) => {
  return (
    <li>
      <h3>{item.title}</h3>
      <img src={item.image} alt={item.title} />
      <p>
        <strong>{item.price}</strong>
      </p>
      <p>
        <em>{item.category}</em>
      </p>
      <p>{item.description}</p>
    </li>
  );
};

const ProductsDisplay = ({ category }: ProductsDisplayPropTypes) => {
  const fetchUrl = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : `https://fakestoreapi.com/products?limit=10`;
  const { isLoading, data, error } = useFetchData(fetchUrl);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {data.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default ProductsDisplay;
