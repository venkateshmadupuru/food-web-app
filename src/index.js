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
import { Toaster } from "react-hot-toast";

const Menupage = lazy(() => import("./components/Restaurant/Menupage"));

const Browerpath = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
          </ProtectedRoute>
        ),
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
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "font-semibold border border-orange-400 rounded-xl shadow-lg " +
            "bg-white text-black dark:bg-gray-800 dark:text-white",
          duration: 2500,
          iconTheme: {
            primary: "#fb923c",
            secondary: "#ffffff",
          },
        }}
      />
    </AuthProvider>
  </Provider>
);
