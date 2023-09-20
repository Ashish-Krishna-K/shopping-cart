import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../routes/App";

const NavBar = () => {
  const { cart } = useContext(CartContext)!;
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
        <li>
          <button
            onClick={() => {
              console.log("hi");
            }}
          >
            Cart
            <span>{cart.length}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
