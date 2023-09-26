import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FakeContextProvider, allRouter } from "../../testHelpers";
import { RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
    // ensuring the website name is rendered
    expect(
      screen.getByRole("heading", { level: 1, name: "Fake Store" }),
    ).toBeInTheDocument();
    // ensuring links to home, store and checkout pages is rendered
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /checkout/i })).toBeInTheDocument();
    // ensuring the home page is rendered on load.
    expect(
      screen.getByRole("heading", { name: /welcome to fake store/i }),
    ).toBeInTheDocument();
    // ensuring the cart is not shown unless showCart button is clicked
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
    // checking if there's as many "add to cart" butttons as the provided
    // items exist in the page which confirms the store page to be loaded
    expect(
      screen.getAllByRole("button", { name: /add to cart/i }),
    ).toHaveLength(9);
    await user.click(checkoutLink);
    // checking to see if both the cart is empty disclaimer and a link to
    // the store page is rendered which ensures the checkout page is loaded
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Store" })).toHaveLength(2);
    await user.click(homeLink);
    // ensuring the welcome message is rendered which confirms the homePage
    // is loaded.
    expect(
      screen.getByRole("heading", { name: /welcome to fake store/i }),
    ).toBeInTheDocument();
  });
});
