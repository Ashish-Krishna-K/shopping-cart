import { describe, expect, it, vi } from "vitest";
import { fakeProductData, FakeContextProvider } from "../../testHelpers";
import { type CartItem } from "../../appTypes";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "./Cart";
import userEvent from "@testing-library/user-event";

describe("cart component", () => {
  // a fake cart is needed to mock some functions of the cart 
  // component
  const fakeCart: CartItem[] = fakeProductData.map((item) => {
    return {
      ...item,
      quantity: Math.floor(Math.random() * 10) + 1,
    };
  });
  const addCartItem = vi.fn();
  const updateCartItem = vi.fn();
  const deleteCartItem = vi.fn();
  it("renders a cart display", async () => {
    render(
      // providing the fakecart details as a fake context
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart toggleCart={vi.fn()} />
      </FakeContextProvider>,
      // wrapping the component in a memory router as some react-router-dom
      // hooks only work inside a route component
      {
        wrapper: MemoryRouter,
      },
    );
    // checking if the number of list items rendered is equal to the number
    // of items provided
    expect(screen.getAllByRole("listitem").length).toBe(fakeCart.length);
    // checking if the first item's title is rendered in the document
    expect(screen.getByText(fakeCart[0].title)).toBeInTheDocument();
  });
  it("renders cart is empty when cart is empty", async () => {
    const emptyFakeCart: CartItem[] = [];
    render(
      <FakeContextProvider
        cart={emptyFakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart toggleCart={vi.fn()} />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    // testing if the user is indicated that the cart is empty
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });
  it("renders the item total price correctly", async () => {
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart toggleCart={vi.fn()} />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    // ensuring only decimals upto 2 digits is shown
    const expectedTotal = `$${parseFloat(
      (fakeCart[0].quantity * fakeCart[0].price).toString(),
    ).toFixed(2)}`;
    // ensuring the first item's total is shown in the page, if the 
    // first item's total is shown we can expect all item's totals 
    // are shown
    expect(screen.getAllByText(expectedTotal)[0]).toBeInTheDocument();
  });
  it("renders the cart total price correctly", async () => {
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart toggleCart={vi.fn()} />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    const expectedTotal: string = `$${parseFloat(
      fakeCart
        .map((item) => item.quantity * item.price)
        .reduce((a, b) => a + b, 0)
        .toString(),
    ).toFixed(2)}`;
    // testing if the cart total is shown in the page
    expect(
      screen.getByText(`Cart total: ${expectedTotal}`),
    ).toBeInTheDocument();
  });
  it("rendered cart item has a delete button", async () => {
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart toggleCart={vi.fn()} />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    // ensuring the number of remove item buttons equal to the number of items 
    // provided
    expect(screen.getAllByRole("button", { name: /remove item/i }).length).toBe(
      fakeCart.length,
    );
  });
  it("pressing delete button calls the correct function", async () => {
    const user = userEvent.setup();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <Cart toggleCart={vi.fn()} />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    const deleteButton = screen.getAllByRole("button", {
      name: /remove item/i,
    })[0];
    await user.click(deleteButton);
    // ensuring clicking the delete button calls the delete function
    expect(deleteCartItem).toHaveBeenCalledOnce();
    // and confirming the id passed to the delete function is correct
    expect(deleteCartItem).toHaveBeenCalledWith(fakeCart[0].id);
  });
});
