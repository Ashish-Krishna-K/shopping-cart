import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../../routes/mainLayoutPage/App";

const NavBar = ({
  handleShowCartClick,
}: {
  handleShowCartClick: () => void;
}) => {
  const { cart } = useContext(CartContext)!;
  const location = useLocation();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/shop"}>Store</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to={"/checkout"}>Checkout</NavLink>
        </li>
        {location.pathname !== "/checkout" && (
          <li>
            <button onClick={handleShowCartClick}>
              Cart
              <span>{cart.length}</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
