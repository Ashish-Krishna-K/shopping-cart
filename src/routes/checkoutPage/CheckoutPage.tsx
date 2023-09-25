import { useContext, useState } from "react";
import { CartContext } from "../mainLayoutPage/App";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { cart, deleteCartItem } = useContext(CartContext)!;
  const [isBuyClicked, setIsBuyClicked] = useState<boolean>(false);
  if (navigation.state === "loading") return <LoadingSpinner></LoadingSpinner>;
  if (cart.length < 1)
    return (
      <section className={styles.emptyCart}>
        <p>Your cart is Empty!</p>
        <p>
          Visit the{" "}
          <NavLink
            to={"/shop"}
            className={({ isActive, isPending }) =>
              isActive ? styles.activeLink : isPending ? styles.pendingLink : ""
            }
          >
            Store
          </NavLink>{" "}
          to add items to your cart.
        </p>
      </section>
    );
  if (isBuyClicked)
    return (
      <section className={styles.disclaimer}>
        <h2>
          Oops! This is a fake store &#40;did you forget?&#41; you can't buy
          anything here!
        </h2>
        <button
          className={styles.backBtn}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </section>
    );
  return (
    <section className={styles.checkoutPage}>
      <div className={styles.nonEmptyCart}>
        <ul className={styles.cartItems}>
          {cart.map((cartItem) => (
            <li key={cartItem.id} className={styles.productItem}>
              <img
                src={cartItem.image}
                alt={cartItem.title}
                width={50}
                height={50}
              />
              <div>
                <h3>{cartItem.title}</h3>
                <p>Quantity Added: {cartItem.quantity}</p>
                <p>
                  Item Total: $
                  <strong>
                    {parseFloat(
                      (cartItem.quantity * cartItem.price).toString(),
                    ).toFixed(2)}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => {
                  deleteCartItem(cartItem.id);
                }}
              >
                <span className={styles.visuallyHidden}>remove item</span>
                <Icon path={mdiDelete} size={2} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.cartTotal}>
          <p>
            <strong>
              <span>Your total: $</span>
              <span>
                {parseFloat(
                  cart
                    .map((item) => item.quantity * item.price)
                    .reduce((a, b) => a + b, 0)
                    .toString(),
                ).toFixed(2)}
              </span>
            </strong>
          </p>
          <button
            onClick={() => {
              setIsBuyClicked(!isBuyClicked);
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
