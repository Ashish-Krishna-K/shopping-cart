import { ForwardedRef, forwardRef, useContext } from "react";
import { CartContext } from "../../routes/mainLayoutPage/App";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

const Cart = forwardRef(function Cart(
  {
    toggleCart,
  }: {
    toggleCart: () => void;
  },
  ref: ForwardedRef<HTMLElement>,
) {
  const navigate = useNavigate();
  const { cart, deleteCartItem } = useContext(CartContext)!;
  const isCartEmpty = cart.length < 1;
  return (
    // A transition is added to the cart opening and closing hence the ref.
    <section className={styles.cart} ref={ref}>
      <div className={isCartEmpty ? styles.emptyCart : styles.nonEmptyCart}>
        {isCartEmpty ? (
          <h2>Cart is empty!</h2>
        ) : (
          <>
            <ul className={styles.cartItems}>
              {cart.map((cartItem) => (
                <li key={cartItem.id} className={styles.product}>
                  <img
                    src={cartItem.image}
                    alt={cartItem.title}
                    width={50}
                    height={50}
                  />
                  <div>
                    <h3>{cartItem.title}</h3>
                    <p>Items in Cart: {cartItem.quantity}</p>
                    <p>
                      Item total:{" "}
                      <strong>
                        {/* Ensuring the total value is only showed with 2 decimal places */}
                        $
                        {parseFloat(
                          (cartItem.quantity * cartItem.price).toString(),
                        ).toFixed(2)}
                      </strong>
                    </p>
                  </div>
                  <button
                    className={styles.removeBtn}
                    tabIndex={0}
                    type="button"
                    onClick={() => {
                      deleteCartItem(cartItem.id);
                    }}
                  >
                    <span className={styles.visuallyHidden}>remove item</span>
                    <Icon path={mdiDelete} size={2} aria-hidden={true} />
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.cartTotal}>
              <p>
                <strong>
                  Cart total: $
                  {parseFloat(
                    cart
                      .map((item) => item.quantity * item.price)
                      .reduce((a, b) => a + b, 0)
                      .toString(),
                  ).toFixed(2)}
                </strong>
              </p>
              <button
                className={styles.checkout}
                onClick={() => {
                  // without the toggle cart(passed in by the parent) the cart
                  // remains visible even after navigating to the checkout.
                  toggleCart();
                  navigate("/checkout");
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
});

export default Cart;
