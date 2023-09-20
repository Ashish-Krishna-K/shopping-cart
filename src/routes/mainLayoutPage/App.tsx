import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { CartItem, type CartContextType } from "../../appTypes";
import NavBar from "../../components/navBar/NavBar";
import Cart from "../../components/cart/Cart";

export const CartContext = createContext<CartContextType | null>(null);

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const addCartItem = (newCartItem: CartItem) => {
    setCart([...cart, newCartItem]);
  };
  const updateCartItem = (newCartItem: CartItem) => {
    setCart(
      cart.map((item) => (item.id === newCartItem.id ? newCartItem : item)),
    );
  };
  const deleteCartItem = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{ cart, addCartItem, updateCartItem, deleteCartItem }}
    >
      <header>
        <h1>Fake Store</h1>
        <NavBar
          handleShowCartClick={() => {
            setShowCart(!showCart);
          }}
        />
      </header>
      <main>
        <Outlet />
      </main>
      {showCart && <Cart />}
    </CartContext.Provider>
  );
};

export default App;
