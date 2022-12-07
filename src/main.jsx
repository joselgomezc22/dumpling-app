import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Login from "./pages/login";
import List from "./pages/list";
import LoginDummy from "./pages/LoginDummy";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

import awsmobile from "./aws-exports";
import { Amplify } from 'aws-amplify';

Amplify.configure(awsmobile);

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
  {
    path: "/login-phone",
    element: <LoginDummy />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
