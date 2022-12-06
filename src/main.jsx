import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Login from "./pages/login";
import List from "./pages/list";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dumpling-app/",
    element: <Login />,
  },
  {
    path: "/list/",
    element: <List />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
