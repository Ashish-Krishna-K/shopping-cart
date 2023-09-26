import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FilterSidebar from "./FilterSidebar";
import { MemoryRouter } from "react-router-dom";
import { fakeCategoryData } from "../../testHelpers";

describe("Sidebar for filtering categories", () => {
  it("renders a list of categories", () => {
    render(<FilterSidebar data={fakeCategoryData} />, { wrapper: MemoryRouter });
    // Ensuring the first category is rendered
    expect(screen.getByText(/fakeCategory1/i)).toBeInTheDocument();
    // and confirming if the number of categories rendered is equal to the 
    // number of categories provided.
    // Plus one because the component has a default "all" category regardless of 
    // the categories passed in.
    expect(screen.getAllByRole("link").length).toBe(fakeCategoryData.length + 1);
  });
});
