import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RouterProvider } from "react-router-dom";
import { FakeContextProvider, allRouter } from "../../testHelpers";
import { config } from "react-transition-group";

describe("Home Page", () => {
  config.disabled = true;
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
    // ensuring the welcome screen is rendered
    expect(
      screen.getByRole("heading", { level: 2, name: /welcome to fake store/i }),
    ).toBeInTheDocument();
    // ensuring that the "fake store" disclaimer is provided to the user
    expect(
      screen.getByText(
        "Fake store is a fake store! There is nothing to buy here, but you're welcome to pretent like you're buying something.",
      ),
    ).toBeInTheDocument;
    // ensuring the homepage renders an image of a random product.
    expect(screen.getByRole("img")).toBeInTheDocument();
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
    // ensuring a link is provided to the user to the store page
    expect(screen.getByRole("link", { name: /shop now/i })).toBeInTheDocument();
  });
});
