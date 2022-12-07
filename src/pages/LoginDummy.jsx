import logo from "../images/dumpling_logo.png";
import { useState } from "react";
import { NumberForm } from "../components/NumberForm";

import VerifyCodeForm from "../components/VerifyCodeForm";

import { useContext } from "react";
import { DataContext } from "../context/DataContext";

import { Auth } from 'aws-amplify';

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
      console.log(validate);
    } catch(error) {
      console.log({error});
    }
  };

  return (
    <div className="login-overlay">
     
      <div className="login-box">
        <button onClick={()=>{setUser('77')}}></button>
        <img className="login-logo" src={logo} />
        <h2 className="text-l">Log in to your account.</h2>
        {!showValidate && <NumberForm number={number} setNumber={setNumber} setShowValidate={setShowValidate} login={signIn} />}
        {showValidate && <VerifyCodeForm number={number} action={verifyCodeAction} verifyCode={verifyCode} setVerifyCode={setVerifyCode} />}
      </div> 
    </div>
  );
};

export default LoginDummy;
