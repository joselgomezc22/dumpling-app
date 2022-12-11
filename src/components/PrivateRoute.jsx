import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

function PrivateRoute({ children }){
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    async () => {
      const validate = await Auth.currentAuthenticatedUser();
      setAuth(validate);
    };
  }, [auth]);

  console.log(auth);

  return (<>{children}</>);
}

export default PrivateRoute;