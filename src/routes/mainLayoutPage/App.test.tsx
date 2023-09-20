import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CartItem } from "../../appTypes";
import {
  fakeProductData,
  FakeContextProvider,
  allRouter,
} from "../../testHelpers";
import { RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("App/main page of website", () => {
  const fakeCart: CartItem[] = fakeProductData.map((item) => {
    return {
      ...item,
      quantity: Math.floor(Math.random() * 10) + 1,
    };
  });
  const addCartItem = vi.fn();
  const updateCartItem = vi.fn();
  const deleteCartItem = vi.fn();
  it("renders all elements as expected", async () => {
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={allRouter} />
      </FakeContextProvider>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Fake Store" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /checkout/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /welcome to fake store/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: /your cart/i }),
    ).not.toBeInTheDocument();
  });
  it("clicking on various pages link will render the correct page", async () => {
    const user = userEvent.setup();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={allRouter} />
      </FakeContextProvider>,
    );
    const homeLink = screen.getByRole("link", { name: /home/i });
    const storeLink = screen.getByRole("link", { name: /shop/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });
    const checkoutLink = screen.getByRole("link", { name: /checkout/i });
    await user.click(storeLink);
    await waitFor(() => screen.getByText(/fake product 1/i));
    expect(
      screen.getByRole("heading", { name: /shop page/i }),
    ).toBeInTheDocument();
    await user.click(aboutLink);
    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
    await user.click(checkoutLink);
    expect(
      screen.getByRole("heading", { name: /checkout/i }),
    ).toBeInTheDocument();
    await user.click(homeLink);
    expect(
      screen.getByRole("heading", { name: /welcome to fake store/i }),
    ).toBeInTheDocument();
  });
  it("toggles the cart component when cart button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={allRouter} />
      </FakeContextProvider>,
    );
    const cartBtn = screen.getByRole("button", { name: /cart/i });
    await user.click(cartBtn);
    expect(
      screen.getByRole("heading", { level: 2, name: /your cart/i }),
    ).toBeInTheDocument();
    await user.click(cartBtn);
    expect(
      screen.queryByRole("heading", { level: 2, name: /your cart/i }),
    ).not.toBeInTheDocument();
  });
});
