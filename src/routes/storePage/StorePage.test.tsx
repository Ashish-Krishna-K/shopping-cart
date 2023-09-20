import { describe, expect, it } from "vitest";
import { RouterProvider } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shopRouter } from "../../testHelpers";

describe("store page", () => {
  it("renders the store page", async () => {
    render(<RouterProvider router={shopRouter} />);
    await waitFor(() => screen.getAllByRole("heading"));
    expect(
      screen.getByRole("heading", { level: 1, name: /shop page/i }),
    ).toBeInTheDocument();
  });
  it("clicking on a category will change the contents", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={shopRouter} />);
    await waitFor(() => screen.getAllByRole("link"));
    const link = screen.getByRole("link", { name: /fakecategory1/i });
    await user.click(link);
    await waitFor(() => screen.getByText(/fake product 1/i));
    expect(screen.getByText(/fake product 1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/fakecategory1/i)).toHaveLength(4);
    expect(screen.getAllByText(/fakeCategory2/i)).toHaveLength(1);
    expect(screen.queryByText(/fake product 2/i)).not.toBeInTheDocument();
  });
});
