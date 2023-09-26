import { describe, expect, it, vi } from "vitest";
import { RouterProvider } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FakeContextProvider, shopRouter } from "../../testHelpers";

describe("store page", () => {
  it("renders the store page", async () => {
    render(
      <FakeContextProvider
        cart={[]}
        addCartItem={vi.fn()}
        updateCartItem={vi.fn()}
        deleteCartItem={vi.fn()}
      >
        <RouterProvider router={shopRouter} />
      </FakeContextProvider>,
    );
    await waitFor(() => screen.getAllByRole("heading"));
    // ensuring the number of "add to cart" buttons matches the number
    // of items provided which confirms the store page to be rendered 
    expect(
      screen.getAllByRole("button", { name: /add to cart/i }),
    ).toHaveLength(9);
  });
  it("clicking on a category will change the contents", async () => {
    const user = userEvent.setup();
    render(
      <FakeContextProvider
        cart={[]}
        addCartItem={vi.fn()}
        updateCartItem={vi.fn()}
        deleteCartItem={vi.fn()}
      >
        <RouterProvider router={shopRouter} />
      </FakeContextProvider>,
    );
    await waitFor(() => screen.getAllByRole("link"));
    const link = screen.getByRole("link", { name: /fakecategory1/i });
    await user.click(link);
    await waitFor(() => screen.getByText(/fake product 1/i));
    // ensuring the products are still loaded even after clicking on 
    // category link
    expect(screen.getByText(/fake product 1/i)).toBeInTheDocument();
    // making sure the number of "add to cart" buttons matches the number
    // of products in the category
    expect(
      screen.getAllByRole("button", { name: /add to cart/i }),
    ).toHaveLength(3);
    // since fake product 2 belongs to category 2 making sure it's not 
    // present in the page ensure the category filter is working as expected
    expect(screen.queryByText(/fake product 2/i)).not.toBeInTheDocument();
  });
});
