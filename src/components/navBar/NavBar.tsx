import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/shop"}>Store</NavLink></li>
        <li><NavLink to={"/about"}>About</NavLink></li>
      </ul>
      <ul>
        <li><NavLink to={"/about"}>Checkout</NavLink></li>
        <li><button>Cart</button></li>
      </ul>
    </nav>
  )
}

export default NavBar;