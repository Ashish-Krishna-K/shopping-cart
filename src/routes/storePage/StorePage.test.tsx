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
    expect(screen.getByText(/fake product 1/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /add to cart/i }),
    ).toHaveLength(3);
    expect(screen.queryByText(/fake product 2/i)).not.toBeInTheDocument();
  });
});
