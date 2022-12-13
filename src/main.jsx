import React, {useState, useContext} from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import awsmobile from "./aws-exports";
import { Amplify } from 'aws-amplify';
import { ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import List from "./pages/List.jsx";
import LoginDummy from "./pages/LoginDummy.jsx";
import PrivateRoute from "./components/PrivateRoute";

import "./index.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { apolloClient } from "./hooks/useRequest";

Amplify.configure(awsmobile);

const Dasboard = () => {
  return (
    <PrivateRoute>
      <List/>
    </PrivateRoute>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginDummy />,
  },
  {
    path: "/list",
    element: <Dasboard />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <DataProvider>
          <CookiesProvider>
            <ApolloProvider client={apolloClient}>
              <RouterProvider router={router} />
            </ApolloProvider>
          </CookiesProvider>
      </DataProvider>
  </React.StrictMode>
);
