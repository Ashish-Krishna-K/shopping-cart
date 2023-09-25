import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FilterSidebar from "./FilterSidebar";
import { ApiCategoryData } from "../../appTypes";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar for filtering categories", () => {
  it("renders a list of categories", () => {
    const fakeData: ApiCategoryData[] = [
      {
        id: "some-id1",
        name: "some-category-1",
      },
      {
        id: "some-id2",
        name: "some-category-2",
      },
      {
        id: "some-id3",
        name: "some-category-3",
      },
    ];
    render(<FilterSidebar data={fakeData} />, { wrapper: MemoryRouter });
    expect(screen.getByText(/some-category-1/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBe(fakeData.length + 1);
  });
});
