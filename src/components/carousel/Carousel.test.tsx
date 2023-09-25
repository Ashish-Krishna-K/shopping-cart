import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { fakeProductData } from "../../testHelpers";
import Carousel from "./Carousel";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { config } from "react-transition-group";

describe("carousel component", () => {
  const carouselList = fakeProductData
    .map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
    }))
    .slice(0, 5);
  it("renders the image", async () => {
    render(<Carousel products={carouselList} />, { wrapper: MemoryRouter });
    expect(screen.getByAltText(carouselList[0].title)).toBeInTheDocument();
  });
  it("image changes to next slide automatically after 4 seconds", async () => {
    config.disabled = true;
    vi.useFakeTimers();
    render(<Carousel products={carouselList} />, { wrapper: MemoryRouter });
    expect(screen.getByAltText(carouselList[0].title)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByAltText(carouselList[1].title)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByAltText(carouselList[2].title)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByAltText(carouselList[3].title)).toBeInTheDocument();
  });
});
