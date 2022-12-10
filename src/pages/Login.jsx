import logo from "../images/dumpling_logo.png";
import { useState } from "react";
import { NumberForm } from "../components/NumberForm";

import VerifyCodeForm from "../components/VerifyCodeForm";

import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Login = () => {
  
  const {user, setUser} = useContext(DataContext);

  const [number, setNumber] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const [showValidate, setShowValidate] = useState(false);

  return (
    <div className="login-overlay">
     
      <div className="login-box">
        
        <button onClick={()=>{setUser('77')}}></button>
        <img className="login-logo" src={logo} />
        <h2 className="text-l">Log in to your account.</h2>
        {!showValidate && <NumberForm number={number} setNumber={setNumber} setShowValidate={setShowValidate} />}
        {showValidate && <VerifyCodeForm verifyCode={verifyCode} setVerifyCode={setVerifyCode} />}
      </div> 
    </div>
  );
};

export default Login;
