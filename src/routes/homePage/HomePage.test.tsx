import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";

describe("Home Page", () => {
  it("Home page is rendered", () => {
    render(<HomePage />, { wrapper: MemoryRouter });
    expect(screen.getByRole("heading").textContent).toMatch(
      /welcome to fake store/i,
    );
    expect(
      screen.getByText(
        "Fake store is a fake store! There is nothing to buy here, but you're welcome to pretent like you're buying something.",
      ),
    ).toBeInTheDocument;
  });
  it("Home page should have a link to the shop page", () => {
    render(<HomePage />, { wrapper: MemoryRouter });
    expect(screen.getByRole("link").textContent).toMatch(/shop now/i);
  });
});
