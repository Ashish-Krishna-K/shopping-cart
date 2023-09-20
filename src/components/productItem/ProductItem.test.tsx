import { describe, expect, it, vi } from "vitest";
import { type CartItem } from "../../appTypes";
import { render, screen } from "@testing-library/react";
import ProductItem from "./ProductItem";
import { MemoryRouter } from "react-router-dom";
import { fakeProductData, returnWithContext } from "../../testHelpers";
import { userEvent } from "@testing-library/user-event";

describe("product item component", () => {
  const fakeProductItem1 = fakeProductData[0];
  it("renders a productItem", async () => {
    render(
      returnWithContext(
        [],
        vi.fn(),
        vi.fn(),
        vi.fn(),
        <ProductItem item={fakeProductItem1} />,
      ),
      {
        wrapper: MemoryRouter,
      },
    );
    expect(screen.getByText(fakeProductItem1.title)).toBeInTheDocument();
  });
  it("adding new item call the correct function", async () => {
    const fakeProductItem2 = fakeProductData[1];
    const user = userEvent.setup();
    const addCartItem = vi.fn();
    render(
      returnWithContext(
        [],
        addCartItem,
        vi.fn(),
        vi.fn(),
        <ProductItem item={fakeProductItem2} />,
      ),
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
  it("updating an item calls the correct function", async () => {
    const fakeProductItem1 = fakeProductData[0];
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
      returnWithContext(
        fakeCart,
        addCartItem,
        updateCartItem,
        deleteCartItem,
        <ProductItem item={fakeProductItem1} />,
      ),
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
    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(incrementButton);
    const addButton2 = screen.getByRole("button", { name: "Add" });
    await user.click(addButton2);
    expect(updateCartItem).toHaveBeenCalledOnce();
    expect(updateCartItem.mock.calls[0][0].id).toBe(updatedFakeProductItem1.id);
    expect(updateCartItem.mock.calls[0][0].quantity).toBe(
      updatedFakeProductItem1.quantity,
    );
  });
});
