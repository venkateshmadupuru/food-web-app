import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./Main";
import { useDispatch, useSelector } from "react-redux";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import useRestaurants from "../../hooks/useRestaurants";
import userEvent from "@testing-library/user-event";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../hooks/useOnlineStatus", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../hooks/useRestaurants", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../Shimmer/Shimmer.jsx", () => ({
  __esModule: true,
  default: () => <div data-testid="shimmer" />,
}));

jest.mock("./FoodChoice.jsx", () => ({
  __esModule: true,
  default: ({ images }) => (
    <div data-testid="food-choices">{images.length}</div>
  ),
}));

jest.mock("../Restaurant/RestaurantCard.jsx", () => ({
  __esModule: true,
  default: ({ resdata }) => (
    <div data-testid="restaurant-card">{resdata.info.name}</div>
  ),
}));

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const mockRestaurants = [
  {
    info: {
      id: "1",
      name: "Burger King",
      cuisines: ["Burgers", "Fast Food"],
      cloudinaryImageId: "burger-king-img",
      avgRating: 4.2,
      deliveryTime: 30,
    },
  },
  {
    info: {
      id: "2",
      name: "Pizza Hut",
      cuisines: ["Pizza", "Italian"],
      cloudinaryImageId: "pizza-hut-img",
      avgRating: 4.5,
      deliveryTime: 25,
    },
  },
];

const mockImageGrids = [
  { id: "img-1", image: "url-1.jpg", name: "Burgers" },
  { id: "img-2", image: "url-2.jpg", name: "Pizza" },
];

const renderMain = ({
  loading = false,
  error = null,
  restaurants = mockRestaurants,
  imageGrids = mockImageGrids,
  selectedLocation = null,
  searchState = {
    isSearchOpen: false,
    shouldFocusSearch: false,
  },
} = {}) => {
  useSelector.mockImplementation((selector) =>
    selector({
      search: searchState,
      location: {
        selectedLocation,
      },
    }),
  );

  useRestaurants.mockReturnValue({
    restaurants,
    imageGrids,
    loading,
    error,
  });

  return render(<Main />);
};

beforeEach(() => {
  jest.clearAllMocks();
  useDispatch.mockReturnValue(jest.fn());
  useOnlineStatus.mockReturnValue(true);
});

describe("Main component", () => {
  test("shows the offline message when the app is offline", () => {
    useOnlineStatus.mockReturnValue(false);

    renderMain();

    expect(
      screen.getByText(/Network Error, Please check network connection/i),
    ).toBeInTheDocument();
  });

  test("shows shimmer while restaurants are loading", () => {
    renderMain({ loading: true });

    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });

  test("shows an error message when restaurant data fails to load", () => {
    renderMain({ error: "Failed to fetch" });

    expect(screen.getByText(/Unable to load restaurants/i)).toBeInTheDocument();
  });

  test("renders food choices, heading and restaurant cards", () => {
    renderMain();

    expect(screen.getByTestId("food-choices")).toHaveTextContent("2");

    expect(
      screen.getByRole("heading", {
        name: /Top restaurant chains in/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByTestId("restaurant-card")).toHaveLength(2);

    expect(screen.getByText("Burger King")).toBeInTheDocument();
    expect(screen.getByText("Pizza Hut")).toBeInTheDocument();
  });

  test("does not render food choices when image grids are empty", () => {
    renderMain({ imageGrids: [] });

    expect(screen.queryByTestId("food-choices")).not.toBeInTheDocument();
  });

  test("renders the nearby heading for current location", () => {
    renderMain({
      selectedLocation: {
        displayLabel: "Current location",
        label: "Hyderabad",
        lat: 17.385,
        lng: 78.4867,
      },
    });

    expect(
      screen.getByRole("heading", {
        name: /Top restaurant chains near you/i,
      }),
    ).toBeInTheDocument();
  });

  test("calls useRestaurants with correct location coordinates", () => {
    const customLocation = { lat: 40.7128, lng: -74.006 };
    renderMain({ selectedLocation: customLocation });

    expect(useRestaurants).toHaveBeenCalledWith(40.7128, -74.006);
  });

  test("focuses search input when shouldFocusSearch is true", () => {
    renderMain({
      searchState: {
        isSearchOpen: true,
        shouldFocusSearch: true,
      },
    });

    const input = screen.getByPlaceholderText("Search...");
    expect(input).toHaveFocus();
  });
});
