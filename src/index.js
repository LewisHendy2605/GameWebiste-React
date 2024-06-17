import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Pong from "./games/pong/Pong.js";
import SpaceInvaders from "./games/space-invaders/space-invaders.js";
import Home from "./components/Home.js";
import NavBar from "./components/NavBar.js";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import "./App.css";

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/GameWebiste-React",
        element: <Home />,
      },
      {
        path: "spaceinvaders",
        element: <SpaceInvaders />,
      },
      {
        path: "pong",
        element: <Pong />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
