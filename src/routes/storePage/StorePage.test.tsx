import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StorePage from "./StorePage";

describe.skip("Store Page", () => {
  it("Home page is rendered", () => {
    render(<StorePage />);
    expect(screen.getByRole("heading").textContent).toMatch(/home page/i);
  });
});
