import { ChangeEvent, useContext, useState } from "react";
import { type ApiProductData } from "../../appTypes";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../routes/mainLayoutPage/App";
import styles from "./ProductItem.module.css";

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
    <li className={styles.productItem}>
      <h3 className={styles.title}>{item.title}</h3>
      <img src={item.image} alt={item.title} />
      <p>
        <strong>${item.price}</strong>
      </p>
      <p className={styles.description}>{item.description}</p>
      {!showForm && (
        <div className={styles.controls}>
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
      )}
      {showForm && (
        <div className={styles.addToCart}>
          <div>
            <p>
              <strong>
                Total: $
                {parseFloat((item.price * quantity).toString()).toFixed(2)}
              </strong>
            </p>
          </div>
          <form
            className={styles.addForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddToCart();
              toggleAddToCartForm();
            }}
          >
            <label htmlFor="quantity">
              Number of items to be added to the cart.
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min={1}
              max={99}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button type="submit">Add</button>
            <button type="button" onClick={toggleAddToCartForm}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </li>
  );
};

export default ProductItem;
