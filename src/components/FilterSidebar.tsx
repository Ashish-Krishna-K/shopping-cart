import PropTypes, { InferProps } from "prop-types";
import { useEffect, useState } from "react";

const useFetchCategories = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategory] = useState<ApiCategoryData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
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
        setCategory(convertedData);
        setError("");
      } catch (error: unknown) {
        if (typeof error === "string") {
          setError(error);
          setCategory([]);
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return { isLoading, categories, error };
};

const FilterSidebarPropTypes = {
  handleCategorySelection: PropTypes.func.isRequired,
};

const FilterSidebar = ({
  handleCategorySelection,
}: InferProps<typeof FilterSidebarPropTypes>) => {
  const { isLoading, categories, error } = useFetchCategories();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {categories.map((item) => (
        <li key={item.id} onClick={() => handleCategorySelection(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

FilterSidebar.propTypes = FilterSidebarPropTypes;

export default FilterSidebar;
