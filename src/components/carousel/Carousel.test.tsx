import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { fakeProductData } from "../../testHelpers";
import Carousel from "./Carousel";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("carousel component", () => {
  const carouselList = fakeProductData
    .map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
    }))
    .slice(0, 5);
  it("renders the image", () => {
    render(<Carousel products={carouselList} />);
    expect(screen.getByAltText(carouselList[0].title)).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(carouselList.length);
  });
  it("clicking on a button changes the image displayed", async () => {
    const user = userEvent.setup();
    render(<Carousel products={carouselList} />);
    let nextImg = screen.getByTestId(carouselList[1].title);
    await user.click(nextImg);
    expect(screen.getByAltText(carouselList[1].title)).toBeInTheDocument();
    nextImg = screen.getByTestId(carouselList[2].title);
    await user.click(nextImg);
    expect(screen.getByAltText(carouselList[2].title)).toBeInTheDocument();
  });
  it("image changes to next slide automatically after 3 seconds", async () => {
    vi.useFakeTimers();
    render(<Carousel products={carouselList} />);
    act(() => {vi.advanceTimersByTime(3000)});
    expect(screen.getByAltText(carouselList[1].title)).toBeInTheDocument();
    act(() => {vi.advanceTimersByTime(3000)});
    expect(screen.getByAltText(carouselList[2].title)).toBeInTheDocument();
    act(() => {vi.advanceTimersByTime(3000)});
    expect(screen.getByAltText(carouselList[3].title)).toBeInTheDocument();
  })
});
