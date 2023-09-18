import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StorePage from "./StorePage";
import { BrowserRouter } from "react-router-dom";

describe("Store Page", () => {
  it("Store page is rendered", () => {
    render(<StorePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading").textContent).toMatch(/shop page/i);
  });
});
