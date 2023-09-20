import { useContext, useState } from "react";
import { CartContext } from "../mainLayoutPage/App";
import { NavLink, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, deleteCartItem } = useContext(CartContext)!;
  const [isBuyClicked, setIsBuyClicked] = useState<boolean>(false);
  if (cart.length < 1)
    return (
      <div>
        <p>Your cart is Empty!</p>
        <p>
          Visit the
          <NavLink to={"/shop"}>Store</NavLink>
          to add items to your cart.
        </p>
      </div>
    );
  if (isBuyClicked)
    return (
      <div>
        <p>
          Oops! This is a fake store&#40;did you forget?&#41; you can't buy
          anything here!
        </p>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    );
  return (
    <div>
      <ul>
        <ul>
          {cart.map((cartItem) => (
            <li key={cartItem.id}>
              <img
                src={cartItem.image}
                alt={cartItem.title}
                width={50}
                height={50}
              />
              <h3>{cartItem.title}</h3>
              <p>{cartItem.quantity}</p>
              <p>
                Item Total:
                <strong>{cartItem.quantity * cartItem.price}</strong>
              </p>
              <button
                type="button"
                onClick={() => {
                  deleteCartItem(cartItem.id);
                }}
              >
                remove item
              </button>
            </li>
          ))}
        </ul>
        <div>
          <span>Your total: </span>
          <span>
            {cart
              .map((item) => item.quantity * item.price)
              .reduce((a, b) => a + b, 0)}
          </span>
        </div>
      </ul>
      <button
        onClick={() => {
          setIsBuyClicked(!isBuyClicked);
        }}
      >
        Buy
      </button>
    </div>
  );
};

export default CheckoutPage;
