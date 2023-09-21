import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouterProvider } from "react-router-dom";
import { allRouter } from "../../testHelpers";

describe("Home Page", () => {
  it("Home page is rendered", () => {
    render(<RouterProvider router={allRouter} />);
    expect(
      screen.getByRole("heading", { level: 1, name: /welcome to fake store/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Fake store is a fake store! There is nothing to buy here, but you're welcome to pretent like you're buying something.",
      ),
    ).toBeInTheDocument;
  });
  it("Home page should have a link to the shop page", () => {
    render(<RouterProvider router={allRouter} />);
    expect(screen.getByRole("link", { name: /shop now/i })).toBeInTheDocument();
  });
});
