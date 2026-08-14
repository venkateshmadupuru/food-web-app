import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Main from "./Main";
import searchReducer, { openSearch } from "../../utils/searchSlice";
import locationReducer from "../../utils/locationSlice";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import useRestaurants from "../../hooks/useRestaurants";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("../../hooks/useOnlineStatus", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../hooks/useRestaurants", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../Restaurant/RestaurantCard.jsx", () => ({
  __esModule: true,
  default: ({ resdata }) => (
    <div data-testid="restaurant-card">{resdata.info.name}</div>
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

const createTestStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      location: locationReducer,
    },
  });

const renderMain = () => {
  const store = createTestStore();

  useRestaurants.mockReturnValue({
    restaurants: mockRestaurants,
    imageGrids: [],
    loading: false,
    error: null,
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/restaurants/:id"
            element={<div>Restaurant Details</div>}
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

beforeEach(() => {
  jest.clearAllMocks();
  useOnlineStatus.mockReturnValue(true);
});
describe("Main component", () => {
  test("filters restaurants when the user searches by cuisine", async () => {
    const user = userEvent.setup();

    const store = renderMain();

    store.dispatch(openSearch());

    const input = await screen.findByPlaceholderText("Search...");

    const initialRestaurants = await screen.findAllByTestId("restaurant-card");

    expect(initialRestaurants).toHaveLength(2);

    await user.type(input, "pizza");
    await user.click(screen.getByRole("button", { name: /search/i }));

    const filteredRestaurants = await screen.findAllByTestId("restaurant-card");

    expect(filteredRestaurants).toHaveLength(1);
    expect(screen.getByText("Pizza Hut")).toBeInTheDocument();
  });

  test("navigates to restaurant details when a restaurant is clicked", async () => {
    const user = userEvent.setup();

    renderMain();

    const restaurant = screen.getByRole("link", { name: /burger king/i });

    await user.click(restaurant);

    expect(screen.getByText("Restaurant Details")).toBeInTheDocument();
  });
});
