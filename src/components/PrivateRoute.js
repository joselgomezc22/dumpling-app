import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }){
  const navigate = useNavigate();
  const { bearerToken } = useContext(DataContext);
  if(!bearerToken) {
    navigate("/login-phone");
  }

  return (<>{children}</>);
}

export default PrivateRoute;