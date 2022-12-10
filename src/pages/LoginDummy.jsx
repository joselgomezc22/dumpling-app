import logo from "/src/images/dumpling_logo.png";
import { useState } from "react";
import { NumberForm } from "../components/NumberForm";

import VerifyCodeForm from "../components/VerifyCodeForm";

import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useCookies } from 'react-cookie';

import { Auth } from 'aws-amplify';

import { useNavigate } from "react-router-dom";

const LoginDummy = () => {
  
  const {user, setUser} = useContext(DataContext);

  const [number, setNumber] = useState("");
  const [auth, setAuth] = useState(null);
  const [verifyCode, setVerifyCode] = useState("");

  const [showValidate, setShowValidate] = useState(false);

  const signIn = async (numberPhone) => {
    try {
      const userAuth = await Auth.signIn(numberPhone);
      setAuth(userAuth);
      console.log(userAuth);
    } catch(error) {
      console.log({error});
    }
  };

  const verifyCodeAction = async (number, code) => {
    try {
      const validate = await Auth.sendCustomChallengeAnswer(auth, code);
      const refresh = await Auth.
      const { signInUserSession: { accessToken: { jwtToken }, refreshToken: { token } } } = validate;
      window.localStorage.setItem("Auth", jwtToken);
      window.localStorage.setItem("AuthRefresh", token);
      window.location.href = "/list";
    } catch(error) {
      console.log({error});
    }
  };

  const tryGraph = () => {
  };

  return (
    <div className="login-overlay">
     
      <div className="login-box">
        <img className="login-logo" src={logo} />
        <h2 className="text-l">Log in to your account.</h2>
        {!showValidate && <NumberForm number={number} setNumber={setNumber} setShowValidate={setShowValidate} login={signIn} />}
        {showValidate && <VerifyCodeForm number={number} action={verifyCodeAction} verifyCode={verifyCode} setVerifyCode={setVerifyCode} />}
      </div> 
    </div>
  );
};

export default LoginDummy;
