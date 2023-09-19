import { describe, expect, it, vi } from "vitest";
import { CartItem, type ApiProductData } from "../../appTypes";
import { render, screen } from "@testing-library/react";
import ProductItem from "./ProductItem";
import { MemoryRouter } from "react-router-dom";
import { FakeContextProvider } from "../../testHelpers";
import { userEvent } from "@testing-library/user-event";

const fakeProductItem1: ApiProductData = {
  id: 0,
  title: "fake item",
  price: 999,
  category: "fake category",
  description: "fake description",
  image: "/fakeimg",
};
const fakeProductItem2: ApiProductData = {
  id: 1,
  title: "fake item 2",
  price: 999,
  category: "fake category",
  description: "fake description 2",
  image: "/fakeimg",
};

describe("product item component", () => {
  it("renders a productItem", async () => {
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
        <ProductItem item={fakeProductItem1} />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    expect(screen.getByText(fakeProductItem1.title)).toBeInTheDocument();
  });
  it("adds a new item to the cart", async () => {
    const user = userEvent.setup();
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
        <ProductItem item={fakeProductItem2} />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    const addItemButton = screen.getByRole("button", { name: "Add to cart" });
    await user.click(addItemButton);
    const addButton = screen.getByRole("button", { name: "Add" });
    await user.click(addButton);
    expect(addCartItem).toHaveBeenCalledOnce();
  });
  it("updates an existing item in the cart", async () => {
    const user = userEvent.setup();
    const fakeCart: CartItem[] = [];
    const addCartItem = vi.fn((item) => fakeCart.push(item));
    const updateCartItem = vi.fn();
    const deleteCartItem = vi.fn();
    const updatedFakeProductItem1: CartItem = {
      id: 0,
      title: "fake item",
      price: 999,
      category: "fake category",
      description: "fake description",
      image: "/fakeimg",
      quantity: 2,
    };
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <ProductItem item={fakeProductItem1} />
      </FakeContextProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    const addItemButton1 = screen.getByRole("button", { name: "Add to cart" });
    await user.click(addItemButton1);
    const addButton1 = screen.getByRole("button", { name: "Add" });
    await user.click(addButton1);
    const addItemButton2 = screen.getByRole("button", { name: "Add to cart" });
    await user.click(addItemButton2);
    const incrementButton = screen.getByRole("button", {name: "+"});
    await user.click(incrementButton);
    const addButton2 = screen.getByRole("button", { name: "Add" });
    await user.click(addButton2);
    expect(updateCartItem).toHaveBeenCalledOnce();
    expect(updateCartItem.mock.calls[0][0].id).toBe(updatedFakeProductItem1.id);
    expect(updateCartItem.mock.calls[0][0].quantity).toBe(updatedFakeProductItem1.quantity);
  });
});
