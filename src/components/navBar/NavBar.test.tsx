import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavBar from "./NavBar";
import { MemoryRouter, RouterProvider } from "react-router-dom";
import { FakeContextProvider, allRouter } from "../../testHelpers";
import { config } from "react-transition-group";
import { userEvent } from "@testing-library/user-event";

describe("nav bar component", () => {
  it("renders the nav bar correctly", async () => {
    render(
      <FakeContextProvider
        cart={[]}
        addCartItem={vi.fn()}
        updateCartItem={vi.fn()}
        deleteCartItem={vi.fn()}
      >
        <NavBar showCart={false} handleShowCartClick={vi.fn()} />,
      </FakeContextProvider>,
      { wrapper: MemoryRouter },
    );
    // ensuring the store name is rendered.
    expect(
      screen.getByRole("heading", { level: 1, name: /fake store/i }),
    ).toBeInTheDocument();
    // ensuring a link to the home page is rendered
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    // ensuring a link to the store page is rendered
    expect(
      screen.getAllByRole("link", { name: /store/i })[0],
    ).toBeInTheDocument();
    // ensuring a link to the checkout page is rendered
    expect(screen.getByRole("link", { name: /checkout/i })).toBeInTheDocument();
    // ensuring the show cart button is rendered
    expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument();
  });
  it("toggles the cart component when cart button is clicked", async () => {
    // disabling transitions to ensure it doesn't interfere with the tests
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
    // ensuring the cart is opened
    expect(screen.getByText("Cart is empty!")).toBeInTheDocument();
    await user.click(cartBtn);
    // ensuring the cart is closed
    expect(screen.queryByText("Cart is empty!")).not.toBeInTheDocument();
  });
});
