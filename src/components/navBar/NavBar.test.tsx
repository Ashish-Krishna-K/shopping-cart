import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";
import { FakeContextProvider } from "../../testHelpers";

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
    expect(
      screen.getByRole("heading", { level: 1, name: /fake store/i }),
    ).toBeInTheDocument();
  });
});
