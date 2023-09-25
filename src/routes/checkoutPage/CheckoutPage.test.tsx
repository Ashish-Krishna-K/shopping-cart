import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { type CartItem } from "../../appTypes";
import {
  checkoutRouter,
  fakeProductData,
  FakeContextProvider,
} from "../../testHelpers";
import { RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("checkout page", () => {
  const fakeCart: CartItem[] = fakeProductData.map((item) => {
    return {
      ...item,
      quantity: Math.floor(Math.random() * 10) + 1,
    };
  });
  const addCartItem = vi.fn();
  const updateCartItem = vi.fn();
  const deleteCartItem = vi.fn();
  it("renders the checkout page", async () => {
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={checkoutRouter} />
      </FakeContextProvider>,
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      fakeCart.length,
    );
  });
  it("renders a link to shop page if cart is empty", async () => {
    const emptyFakeCart: CartItem[] = [];
    render(
      <FakeContextProvider
        cart={emptyFakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={checkoutRouter} />
      </FakeContextProvider>,
    );
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
  it("clicking on buy page shows fake store disclaimer", async () => {
    const user = userEvent.setup();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={checkoutRouter} />
      </FakeContextProvider>,
    );
    const buyBtn = screen.getByRole("button", { name: /buy/i });
    await user.click(buyBtn);
    expect(
      screen.getByText(
        "Oops! This is a fake store (did you forget?) you can't buy anything here!",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });
  it("clicking on delete item button calls the correct function with correct id", async () => {
    const user = userEvent.setup();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={checkoutRouter} />
      </FakeContextProvider>,
    );
    const deleteBtn = screen.getAllByRole("button", {
      name: /remove item/i,
    })[0];
    await user.click(deleteBtn);
    expect(deleteCartItem).toHaveBeenCalledOnce();
    expect(deleteCartItem).toHaveBeenCalledWith(fakeCart[0].id);
  });
});
