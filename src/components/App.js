import "../Styles/styles.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./HomePage";
import Shop from "./ShopPage";
import React, { useState, useEffect } from "react";
import uniqid from "uniqid";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [inputValue, setInputValue] = useState(1);
  const [total, setTotal] = useState(0);
  const [prank, setPrank] = useState(false);
  const [showCart, setShowCart] =useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }
  const incrementInput = () => {
    setInputValue(inputValue + 1)
  }
  const decrementInput = () => {
    if (inputValue < 1) return;
    setInputValue(inputValue - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCartItems(cartItems.concat({name: e.target.dataset.name, number: inputValue, price: Math.round(inputValue * 0.99 * 100) / 100, id: uniqid()}));
    setInputValue(1);
  }

  const deleteItem = (e) => {
    setCartItems(cartItems.filter(item => item.id !== e.target.dataset.id))
  }

  const togglePrank = () => {
    setPrank(!prank);
  }

  const toggleCart = () => {
    setShowCart(!showCart);
  }

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  } 

  useEffect (() => {
    const amnt = cartItems.reduce((a, b) => {
      return a + b.price;
    }, 0)
    setTotal(Math.round(amnt * 100) / 100)
  }, [cartItems])

  const toggleTheme = (e) => {
    e.target.offsetParent.parentNode.classList.toggle('dark')
  }

  return (
    <BrowserRouter>
      <div id="app">
        <header>
          <h1>One Piece Posters</h1>
          <nav>
            <button onClick={toggleTheme} id="theme">
            </button>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/shop"}>Shop</Link>
              </li>
            </ul>
            <button onClick={toggleCart} id="toggle-cart"></button>
          </nav>
        </header>
        <main>
          { !prank ?
          <div id="content">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/shop" element={
                <Shop 
                inputValue={inputValue}
                handleInput={handleInput}
                incrementInput={incrementInput}
                decrementInput={decrementInput}
                handleSubmit={handleSubmit}
                cartItems={cartItems}
                />
              }
              />
            </Routes>
            { showCart ? 
            <div id="cart-container">
            <div id="cart">
              {
                cartItems.map(item => {
                  return (
                    <div key={item.id} className="cart-item"> 
                      <span>Item: {item.name}</span>
                      <span>Quantity: {item.number}</span>
                      <span>Price: {item.price}</span>
                      <button type="button" data-id={item.id} onClick={deleteItem} className="del-btn"></button>
                    </div>
                  )
                })
              }
              <span>{`Cart Total: $${total}`}</span>
              <button type="button" onClick={togglePrank}>Buy Now</button>
              <button type="button" onClick={clearCart}>Clear Cart</button>
            </div>
            </div>
            : ''
            }
          </div>   : 
          <div id="prank">
            <p>This is a fake store you can't buy anything here</p>
            <button onClick={togglePrank}>Return Home</button>
          </div>
          }
        </main>
        <footer>
          <p>One Piece and characters are the property of Eiichiro Oda/Shueisha, Toei Animation</p>
          <p>© Eiichiro Oda/Shueisha, Toei Animation</p>
          <p>This is a fake store created as a project for the curriculum in The Odin Project</p>
          <p>Project by Ashish-Krishna-K</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
