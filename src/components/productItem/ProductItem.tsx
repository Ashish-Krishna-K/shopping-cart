import { ChangeEvent, useContext, useState } from "react";
import { type ApiProductData } from "../../appTypes";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../routes/mainLayoutPage/App";

const ProductItem = ({ item }: { item: ApiProductData }) => {
  const navigate = useNavigate();
  const { cart, addCartItem, updateCartItem } = useContext(CartContext)!;
  const currentCartItem = cart.filter((cartItem) => cartItem.id === item.id)[0];
  const [showForm, setShowForm] = useState<boolean>();
  const [quantity, setQuantity] = useState<number>(
    currentCartItem?.quantity || 1,
  );

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
  };
  const toggleAddToCartForm = () => {
    setShowForm(!showForm);
  };
  const handleAddToCart = () => {
    if (currentCartItem === undefined) {
      addCartItem({ ...item, quantity });
    } else {
      updateCartItem({ ...currentCartItem, quantity });
    }
  };
  return (
    <li>
      <h3>{item.title}</h3>
      <img src={item.image} alt={item.title} />
      <p>
        <strong>${item.price}</strong>
      </p>
      <p>
        <em>{item.category}</em>
      </p>
      <p>{item.description}</p>
      <div>
        <button type="button" onClick={toggleAddToCartForm}>
          Add to cart
        </button>
        <button
          type="button"
          onClick={() => {
            handleAddToCart();
            navigate("/checkout");
          }}
        >
          Buy now
        </button>
      </div>
      {showForm && (
        <div>
          <button type="button" onClick={handleIncrement}>
            +
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddToCart();
              toggleAddToCartForm();
            }}
          >
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button type="submit">Add</button>
            <button type="button" onClick={toggleAddToCartForm}>
              Cancel
            </button>
          </form>
          <button type="button" onClick={handleDecrement}>
            -
          </button>
        </div>
      )}
    </li>
  );
};

export default ProductItem;
