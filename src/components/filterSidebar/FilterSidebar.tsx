import { type ApiCategoryData } from "../../appTypes";
import { NavLink } from "react-router-dom";
import styles from "./FilterSidebar.module.css";

const capitalize = (input: string): string => {
  return input[0].toUpperCase() + input.slice(1);
};

const FilterSidebar = ({ data }: { data: ApiCategoryData[] }) => {
  return (
    <ul className={styles.categorySelector}>
      <li>
        <NavLink
          to={"/shop"}
          className={({ isActive, isPending }) =>
            isActive ? styles.activeLink : isPending ? styles.pendingLink : ""
          }
          end
        >
          All
        </NavLink>
      </li>
      {data.map((item) => (
        <li key={item.id}>
          <NavLink
            to={`/shop/${item.name}`}
            className={({ isActive, isPending }) =>
              isActive ? styles.activeLink : isPending ? styles.pendingLink : ""
            }
          >
            {capitalize(item.name)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default FilterSidebar;
