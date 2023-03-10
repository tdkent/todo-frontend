import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import Lists from "../pages/Lists";
import EditList from "../pages/EditList";
import NewList from "../pages/NewList";
import NotFound from "../pages/NotFound";

// error elements
import RootError from "../pages/RootError";

// actions
import { createNewListAction } from "../functions/create-list-action";
import { profileEditAction } from "../functions/profile-edit-action";

// loaders
import { profileLoader } from "../functions/profile-loader";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        errorElement: <RootError />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "new",
            element: <NewList />,
            action: createNewListAction,
          },
          {
            path: "lists",
            children: [
              {
                index: true,
                element: <Lists />,
              },
              {
                path: ":slug",
                element: <EditList />,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                index: true,
                element: <Profile />,
                loader: profileLoader,
              },
              {
                path: "edit",
                element: <ProfileEdit />,
                loader: profileLoader,
                action: profileEditAction,
              },
              {
                path: "*",
                element: <Navigate to="/profile" />,
              },
            ],
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default router;
