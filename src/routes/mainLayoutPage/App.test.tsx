import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FakeContextProvider, allRouter } from "../../testHelpers";
import { RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { config } from "react-transition-group";

describe("App/main page of website", () => {
  it("renders all elements as expected", async () => {
    render(
      <FakeContextProvider
        cart={[]}
        addCartItem={vi.fn()}
        updateCartItem={vi.fn()}
        deleteCartItem={vi.fn()}
      >
        <RouterProvider router={allRouter} />
      </FakeContextProvider>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Fake Store" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
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
        cart={[]}
        addCartItem={vi.fn()}
        updateCartItem={vi.fn()}
        deleteCartItem={vi.fn()}
      >
        <RouterProvider router={allRouter} />
      </FakeContextProvider>,
    );
    const homeLink = screen.getByRole("link", { name: /home/i });
    const storeLink = screen.getByRole("link", { name: /shop/i });
    const checkoutLink = screen.getByRole("link", { name: /checkout/i });
    await user.click(storeLink);
    await waitFor(() => screen.getByText(/fake product 1/i));
    expect(
      screen.getAllByRole("button", { name: /add to cart/i }),
    ).toHaveLength(9);
    await user.click(checkoutLink);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    await user.click(homeLink);
    expect(
      screen.getByRole("heading", { name: /welcome to fake store/i }),
    ).toBeInTheDocument();
  });
  it("toggles the cart component when cart button is clicked", async () => {
    config.disabled = true;
    const user = userEvent.setup();
    render(
      <FakeContextProvider
        cart={[]}
        addCartItem={vi.fn()}
        updateCartItem={vi.fn()}
        deleteCartItem={vi.fn()}
      >
        <RouterProvider router={allRouter} />
      </FakeContextProvider>,
    );
    const cartBtn = screen.getByRole("button", { name: "Cart" });
    await user.click(cartBtn);
    expect(screen.getByText("Cart is empty!")).toBeInTheDocument();
    await user.click(cartBtn);
    expect(screen.queryByText("Cart is empty!")).not.toBeInTheDocument();
  });
});
