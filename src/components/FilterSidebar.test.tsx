import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FilterSidebar from "./FilterSidebar";

describe("Sidebar for filtering categories", () => {
  it("renders a list of categories", async () => {
    const mockFn = vi.fn();
    render(<FilterSidebar handleCategorySelection={mockFn} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("list")).toBeInTheDocument());
  });
  it("selecting a category will call the function", async () => {
    const mockFn = vi.fn();
    const user = userEvent.setup();
    render(<FilterSidebar handleCategorySelection={mockFn} />);
    await waitFor(async () => {
      await user.click(screen.getByText(/electronics/i));
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn.mock.calls[0][0].name).toBe("electronics");
    });
  });
});
