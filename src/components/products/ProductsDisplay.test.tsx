import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductsDisplay from "./ProductsDisplay";

describe("Products display component", () => {
  it("renders a product list", async () => {
    render(<ProductsDisplay />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("list")).toBeInTheDocument());
  });
});
