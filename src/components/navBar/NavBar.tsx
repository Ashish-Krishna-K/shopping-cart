import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../../routes/mainLayoutPage/App";
import styles from "./NavBar.module.css";
import Icon from "@mdi/react";
import { mdiCart } from "@mdi/js";

const NavBar = ({
  showCart,
  handleShowCartClick,
}: {
  showCart: boolean;
  handleShowCartClick: () => void;
}) => {
  const { cart } = useContext(CartContext)!;
  const location = useLocation();
  return (
    // the conditional classname assignment ensures the cart button is
    // pushed to the rigt end of the nav bar when cart is open.
    <nav className={`${styles.nav} ${showCart ? styles.alignRight : ""}`}>
      <NavLink to={"/"}>
        <h1 className={styles.siteName}>Fake Store</h1>
      </NavLink>
      <ul className={styles.navList}>
        {/* 
            Only rendering the links to home, store, checkout pages 
            when the cart is closed, this is to avoid the user clicking
            on a different page but still showing the cart to the user
            confusing the user.
          */}
        {!showCart && (
          <>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive, isPending }) =>
                  isActive
                    ? styles.activeLink
                    : isPending
                    ? styles.pendingLink
                    : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop"}
                className={({ isActive, isPending }) =>
                  isActive
                    ? styles.activeLink
                    : isPending
                    ? styles.pendingLink
                    : ""
                }
              >
                Store
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/checkout"}
                className={({ isActive, isPending }) =>
                  isActive
                    ? styles.activeLink
                    : isPending
                    ? styles.pendingLink
                    : ""
                }
              >
                Checkout
              </NavLink>
            </li>
          </>
        )}
        {/* 
            We don't want to show the open cart button at the checkout screen 
            because that's just redundant.
          */}
        {location.pathname !== "/checkout" && (
          <li>
            <button onClick={handleShowCartClick} className={styles.cartBtn}>
              {/* visually hiding the cart label as it's only needed for screen readers */}
              <span className={styles.visuallyHidden}>Cart</span>
              <Icon path={mdiCart} size={1.5} aria-hidden={true} />
              {cart.length > 0 && (
                <span className={styles.cartIndicator}>{cart.length}</span>
              )}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
