import { describe, expect, it, vi } from "vitest";
import { FakeContextProvider, fakeProductData } from "../../testHelpers";
import { CartItem } from "../../appTypes";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "./Cart";
import userEvent from "@testing-library/user-event";

describe("cart component", () => {
  it("renders a cart display", async () => {
    const fakeCart: CartItem[] = fakeProductData.map((item) => {
      return {
        ...item,
        quantity: Math.floor(Math.random() * 10) + 1,
      };
    });
    const addCartItem = vi.fn();
    const updateCartItem = vi.fn();
    const deleteCartItem = vi.fn();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    expect(screen.getAllByRole("listitem").length).toBe(fakeCart.length);
    expect(screen.getByText(fakeCart[0].title)).toBeInTheDocument();
  });
  it("renders cart is empty when cart is empty", async () => {
    const fakeCart: CartItem[] = [];
    const addCartItem = vi.fn();
    const updateCartItem = vi.fn();
    const deleteCartItem = vi.fn();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  })
  it("renders the item total price correctly", async () => {
    const fakeCart: CartItem[] = fakeProductData.map((item) => {
      return {
        ...item,
        quantity: Math.floor(Math.random() * 10) + 1,
      };
    });
    const addCartItem = vi.fn();
    const updateCartItem = vi.fn();
    const deleteCartItem = vi.fn();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    const expectedTotal = fakeCart[0].quantity * fakeCart[0].price;
    expect(screen.getAllByText(expectedTotal)[0]).toBeInTheDocument();
  });
  it("renders the cart total price correctly", async () => {
    const fakeCart: CartItem[] = fakeProductData.map((item) => {
      return {
        ...item,
        quantity: Math.floor(Math.random() * 10) + 1,
      };
    });
    const addCartItem = vi.fn();
    const updateCartItem = vi.fn();
    const deleteCartItem = vi.fn();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    const expectedTotal: number = fakeCart
      .map((item) => item.quantity * item.price)
      .reduce((a, b) => a + b, 0);
    expect(screen.getByText(/cart total/i)).toBeInTheDocument();
    expect(screen.getByText(expectedTotal)).toBeInTheDocument();
  });
  it("rendered cart item has a delete button", async () => {
    const fakeCart: CartItem[] = fakeProductData.map((item) => {
      return {
        ...item,
        quantity: Math.floor(Math.random() * 10) + 1,
      };
    });
    const addCartItem = vi.fn();
    const updateCartItem = vi.fn();
    const deleteCartItem = vi.fn();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    expect(screen.getAllByRole("button", { name: /remove item/i }).length).toBe(
      fakeCart.length,
    );
  });
  it("pressing delete button calls the correct function", async () => {
    const user = userEvent.setup();
    const fakeCart: CartItem[] = fakeProductData.map((item) => {
      return {
        ...item,
        quantity: Math.floor(Math.random() * 10) + 1,
      };
    });
    const addCartItem = vi.fn();
    const updateCartItem = vi.fn();
    const deleteCartItem = vi.fn();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    const deleteButton = screen.getAllByRole("button", {
      name: /remove item/i,
    })[0];
    await user.click(deleteButton);
    expect(deleteCartItem).toHaveBeenCalledOnce();
    expect(deleteCartItem).toHaveBeenCalledWith(fakeCart[0].id);
  });
});
