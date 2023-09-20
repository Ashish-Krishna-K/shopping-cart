import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";
import { CartItem } from "../../appTypes";
import { FakeContextProvider } from "../../testHelpers";

describe("nav bar component", () => {
  it("renders the nav bar correctly", async () => {
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
        <NavBar />
      </FakeContextProvider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /store/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /checkout/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument();
  });
});
