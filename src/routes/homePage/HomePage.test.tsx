import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RouterProvider } from "react-router-dom";
import { FakeContextProvider, allRouter } from "../../testHelpers";

describe("Home Page", () => {
  it("Home page is rendered", () => {
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
      screen.getByRole("heading", { level: 2, name: /welcome to fake store/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Fake store is a fake store! There is nothing to buy here, but you're welcome to pretent like you're buying something.",
      ),
    ).toBeInTheDocument;
  });
  it("Home page should have a link to the shop page", () => {
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
    expect(screen.getByRole("link", { name: /shop now/i })).toBeInTheDocument();
  });
});
