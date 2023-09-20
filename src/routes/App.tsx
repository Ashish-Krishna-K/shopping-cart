import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { CartItem, type CartContextType } from "../appTypes";
import NavBar from "../components/navBar/NavBar";

export const CartContext = createContext<CartContextType | null>(null);

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
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
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </CartContext.Provider>
  );
};

export default App;
