import { useContext } from "react";
import { CartContext } from "../../routes/mainLayoutPage/App";

const Cart = () => {
  const { cart, deleteCartItem } = useContext(CartContext)!;
  if (cart.length < 1) return <p>Cart is empty!</p>;
  return (
    <div>
      <h2>Your Cart: </h2>
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
        <span>Cart total: </span>
        <span>
          {cart
            .map((item) => item.quantity * item.price)
            .reduce((a, b) => a + b, 0)}
        </span>
      </div>
    </div>
  );
};

export default Cart;
