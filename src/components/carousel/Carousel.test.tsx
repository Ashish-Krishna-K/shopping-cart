import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { fakeProductData } from "../../testHelpers";
import Carousel from "./Carousel";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { config } from "react-transition-group";

describe("carousel component", () => {
  // creating a fake list of products from the fakeProductData 
  // exported from testHelpers.
  const carouselList = fakeProductData
    .map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
    }))
    .slice(0, 5);
  it("renders the image", async () => {
    render(<Carousel products={carouselList} />, { wrapper: MemoryRouter });
    // checking if the first item's name is present in the image's alt as a 
    // way to ensure provided image is rendered
    expect(screen.getByAltText(carouselList[0].title)).toBeInTheDocument();
  });
  it("image changes to next slide automatically after 4 seconds", async () => {
    // disabling transitions
    config.disabled = true;
    // using faketimers to speed up the setTimout in
    // the component
    vi.useFakeTimers();
    render(<Carousel products={carouselList} />, { wrapper: MemoryRouter });
    // checking if the first item's image is rendered first
    expect(screen.getByAltText(carouselList[0].title)).toBeInTheDocument();
    // setTimeout changes state hence wrapping it in an
    // act to avoid problems
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    // checking if the image rendered has changed to second item
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
