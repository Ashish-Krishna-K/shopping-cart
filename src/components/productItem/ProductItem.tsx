import { ChangeEvent, useContext, useState } from "react";
import { type ApiProductData } from "../../appTypes";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../routes/mainLayoutPage/App";
import styles from "./ProductItem.module.css";

const ProductItem = ({ item }: { item: ApiProductData }) => {
  const navigate = useNavigate();
  const { cart, addCartItem, updateCartItem } = useContext(CartContext)!;
  // checking to see if the current item in the component already exists in the cart
  // this is because multiple actions have different behaviour if the item is already
  // in the cart
  const currentCartItem = cart.filter((cartItem) => cartItem.id === item.id)[0];
  const [showForm, setShowForm] = useState<boolean>();
  // so if the item is already in the cart then the add to cart input should show the
  // quantity added by user instead of a default value 
  const [quantity, setQuantity] = useState<number>(
    currentCartItem?.quantity || 1,
  );

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    // data returned from input elements will be of type string.
    setQuantity(parseInt(e.target.value));
  };
  const toggleAddToCartForm = () => {
    setShowForm(!showForm);
  };
  const handleAddToCart = () => {
    if (currentCartItem === undefined) {
      // if the item is not already present in the cart we're adding it as a new 
      // item
      addCartItem({ ...item, quantity });
    } else {
      // if it's already present we're only updating the quantity as everything 
      // else is same.
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
      {/* we don't want the below buttons to be shown if cart add to cart form is open */}
      {!showForm && (
        <div className={styles.controls}>
          <button type="button" onClick={toggleAddToCartForm}>
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => {
              // clicking on buy now means the user wants to buy immediately
              // hence the item is added to cart with default quantity of 1 and
              // redirected to checkout.
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
                {/* Ensuring the decimal digits is limited to 2 */}
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
            {/* visually hiding the label to make it visible only to the screen reader */}
            <label htmlFor="quantity" className={styles.visuallyHidden}>
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
