import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Error from "./components/Error/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Login from "./components/Auth/Login";
import { Provider } from "react-redux";
import appstore from "./utils/appstore";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PasswordReset from "./components/Auth/PasswordReset";
import RestaurantCategoryShimmer from "./components/Restaurant/RestaurantCategoryShimmer";
import Main from "./components/Home/Main";
import AuthProvider from "./components/Auth/AuthProvider";

const Menupage = lazy(() => import("./components/Restaurant/Menupage"));

const Browerpath = createBrowserRouter([
  {
    path: "/",
    element: (
        <App />
    ),
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "restaurants/:resId",
        element: (
          <Suspense fallback={<RestaurantCategoryShimmer />}>
            <Menupage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
        <ProtectedRoute>
        <Cart />
      </ProtectedRoute>),
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appstore}>
    <AuthProvider>
      <RouterProvider router={Browerpath} />
    </AuthProvider>
  </Provider>
);
