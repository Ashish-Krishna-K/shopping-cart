import { type ApiCategoryData } from "../../appTypes";
import { NavLink } from "react-router-dom";

const FilterSidebar = ({ data }: { data: ApiCategoryData[] }) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <NavLink to={`/shop/${item.name}`}>{item.name}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default FilterSidebar;
