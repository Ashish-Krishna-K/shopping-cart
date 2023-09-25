import { createContext, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { type CartContextType } from "../../appTypes";
import NavBar from "../../components/navBar/NavBar";
import Cart from "../../components/cart/Cart";
import styles from "./App.module.css";

export const CartContext = createContext<CartContextType | null>(null);

const App = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const cartRef = useRef<HTMLElement | null>(null);
  return (
    <>
      <div className={styles.mainLayout}>
        <header className={styles.header}>
          <NavBar
            showCart={showCart}
            handleShowCartClick={() => {
              setShowCart(!showCart);
            }}
          />
        </header>
        <main className={styles.main}>
          <Outlet />
          <CSSTransition
            nodeRef={cartRef}
            in={showCart}
            timeout={500}
            classNames={{
              appear: styles.cartAppear,
              appearActive: styles.cartAppearActive,
              appearDone: styles.cartAppearDone,
              enter: styles.cartEnter,
              enterActive: styles.cartEnterActive,
              enterDone: styles.cartEnterDone,
              exit: styles.cartExit,
              exitActive: styles.cartExitActive,
              exitDone: styles.cartExitDone,
            }}
            mountOnEnter
            unmountOnExit
          >
            <Cart
              ref={cartRef}
              toggleCart={() => {
                setShowCart(!showCart);
              }}
            />
          </CSSTransition>
        </main>
        <footer className={styles.footer}>
          <p>
            Project by{" "}
            <a
              href="https://github.com/Ashish-Krishna-K"
              target="_blank"
              rel="noreferrer"
            >
              Ashish-Krishna-K
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
