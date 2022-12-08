import React, {useState, useContext} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DataProvider } from "./context/DataContext";
import Login from "./pages/login";
import List from "./pages/list";
import LoginDummy from "./pages/LoginDummy";
//import PrivateRoute from "./components/PrivateRoute";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
 
import awsmobile from "./aws-exports";
import { Amplify } from 'aws-amplify';

import { QueryClient, QueryClientProvider } from "react-query";

import { CookiesProvider } from "react-cookie";

Amplify.configure(awsmobile);

/*const Dasboard = () => {
  return (
    <PrivateRoute>
      <List/>
    </PrivateRoute>
  );
};*/

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

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
          <CookiesProvider>
            <RouterProvider router={router} />
          </CookiesProvider>
      </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
