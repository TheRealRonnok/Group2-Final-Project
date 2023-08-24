import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./root";
import { App } from "./components";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
