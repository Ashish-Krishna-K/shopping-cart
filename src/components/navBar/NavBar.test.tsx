import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";

describe("nav bar component", () => {
  it("renders the nav bar correctly", async () => {
    render(<NavBar />, {wrapper: MemoryRouter});
    expect(screen.getByRole("link", {name: /home/i})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: /store/i})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: /about/i})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: /checkout/i})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /cart/i})).toBeInTheDocument();
  })
})