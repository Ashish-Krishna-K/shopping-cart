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
    <nav className={`${styles.nav} ${showCart ? styles.alignRight : ""}`}>
      <NavLink to={"/"}>
        <h1 className={styles.siteName}>Fake Store</h1>
      </NavLink>
      <ul className={styles.navList}>
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
        {location.pathname !== "/checkout" && (
          <li>
            <button onClick={handleShowCartClick} className={styles.cartBtn}>
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
