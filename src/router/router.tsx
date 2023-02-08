import { createBrowserRouter } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import UserProfile from "../pages/user/UserProfile";
import UserLists, { userListsLoader } from "../pages/user/UserLists";
import About from "../pages/about/About";
import RootError from "../pages/error/RootError";

// callbacks
// import { authUserAction } from "../components/auth/AuthenticateUser";
import { createNewListAction } from "../utils/router-actions/createNewListAction";
import { registerUserAction } from "../components/auth/RegisterUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      {
        path: "/",
        element: <Home />,
        action: createNewListAction,
      },
      {
        path: "user-auth",
        element: <Auth />,
        action: registerUserAction,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "mylists/:userId",
        element: <UserLists />,
        loader: userListsLoader,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
]);
