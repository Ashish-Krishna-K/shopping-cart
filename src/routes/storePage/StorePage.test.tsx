import { describe, expect, it, vi } from "vitest";
import { RouterProvider } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FakeContextProvider, shopRouter } from "../../testHelpers";
import { CartItem } from "../../appTypes";

describe("store page", () => {
  const fakeCart: CartItem[] = [];
  const addCartItem = vi.fn();
  const updateCartItem = vi.fn();
  const deleteCartItem = vi.fn();
  it("renders the store page", async () => {
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={shopRouter} />
      </FakeContextProvider>,
    );
    await waitFor(() => screen.getAllByRole("heading"));
    expect(screen.getAllByRole("heading")[0].textContent).toMatch(/shop page/i);
  });
  it("clicking on a category will change the contents", async () => {
    const user = userEvent.setup();
    render(
      <FakeContextProvider
        cart={fakeCart}
        addCartItem={addCartItem}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      >
        <RouterProvider router={shopRouter} />
      </FakeContextProvider>,
    );
    await waitFor(() => screen.getAllByRole("link"));
    const link = screen.getByRole("link", { name: /fakecategory1/i });
    await user.click(link);
    await waitFor(() => screen.getByText(/fake product 1/i));
    expect(screen.getByText(/fake product 1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/fakecategory1/i)).toHaveLength(4);
    expect(screen.getAllByText(/fakeCategory2/i)).toHaveLength(1);
    expect(screen.queryByText(/fake product 2/i)).not.toBeInTheDocument();
  });
});
