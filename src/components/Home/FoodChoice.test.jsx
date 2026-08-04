import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FoodChoices from "./FoodChoice";
import { CDN_URL } from "../../utils/constants";

const mockImages = [
  {
    id: "item-1",
    imageId: "burger-image",
    accessibility: {
      altText: "Burger",
    },
  },
  {
    id: "item-2",
    imageId: "pizza-image",
    accessibility: {
      altText: "Pizza",
    },
  },
];

const renderFoodChoices = (images = mockImages) =>
  render(<FoodChoices images={images} />);

const mockCarouselScrollState = (
  element,
  scrollLeft = 0,
  scrollWidth = 900,
  clientWidth = 500,
) => {
  Object.defineProperties(element, {
    scrollWidth: {
      configurable: true,
      value: scrollWidth,
    },
    clientWidth: {
      configurable: true,
      value: clientWidth,
    },
    scrollLeft: {
      configurable: true,
      writable: true,
      value: scrollLeft,
    },
  });
};

const setupCarousel = (scrollLeft = 0) => {
  renderFoodChoices();

  const scrollContainer = screen.getByTestId("food-carousel");
   Object.defineProperty(scrollContainer, "scrollBy", {
    configurable: true,
    value: jest.fn(),
  });

  mockCarouselScrollState(scrollContainer, scrollLeft);

  fireEvent.scroll(scrollContainer);

  return {
    scrollContainer,
    leftButton: screen.getByRole("button", {
      name: /scroll left/i,
    }),
    rightButton: screen.getByRole("button", {
      name: /scroll right/i,
    }),
  };
};

describe("FoodChoices", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders heading and all food choice images", () => {
    renderFoodChoices();

    expect(
      screen.getByRole("heading", {
        name: /what's on your mind/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("img")).toHaveLength(mockImages.length);

    mockImages.forEach(({ accessibility }) => {
      expect(
        screen.getByAltText(accessibility.altText),
      ).toBeInTheDocument();
    });
  });

  test("shows shimmer while loading", () => {
    renderFoodChoices([]);

    expect(
      screen.getByTestId("food-choice-shimmer"),
    ).toBeInTheDocument();
  });

  test("builds the correct CDN image URLs", () => {
    renderFoodChoices();

    mockImages.forEach((item) => {
      expect(
        screen.getByAltText(item.accessibility.altText),
      ).toHaveAttribute(
        "src",
        `${CDN_URL}${item.imageId}`,
      );
    });
  });

  test("scrolls left when the left navigation button is clicked", async () => {
    const user = userEvent.setup();

    const { scrollContainer, leftButton } = setupCarousel(150);

    await user.click(leftButton);

    expect(scrollContainer.scrollBy).toHaveBeenCalledWith({
      left: -300,
      behavior: "smooth",
    });
  });

  test("scrolls right when the right navigation button is clicked", async () => {
    const user = userEvent.setup();

    const { scrollContainer, rightButton } = setupCarousel();

    await user.click(rightButton);

    expect(scrollContainer.scrollBy).toHaveBeenCalledWith({
      left: 300,
      behavior: "smooth",
    });
  });

  test("updates navigation button state based on scroll position", () => {
    const { scrollContainer, leftButton, rightButton } = setupCarousel();

    expect(leftButton).toBeDisabled();
    expect(rightButton).toBeEnabled();

    mockCarouselScrollState(scrollContainer, 450);

    fireEvent.scroll(scrollContainer);

    expect(leftButton).toBeEnabled();
    expect(rightButton).toBeDisabled();
  });
});