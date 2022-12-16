import logo from "/src/images/dumpling_logo.png";
import { useState } from "react";
import { NumberForm } from "../components/NumberForm";

import VerifyCodeForm from "../components/VerifyCodeForm";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useCookies } from 'react-cookie';

import { Auth } from 'aws-amplify';

import { useNavigate } from "react-router-dom";

const LoginDummy = () => {

  const MySwal = withReactContent(Swal);
  
  const {user, setUser} = useContext(DataContext);

  const [number, setNumber] = useState("");
  const [auth, setAuth] = useState(null);
  const [verifyCode, setVerifyCode] = useState("");

  const [showValidate, setShowValidate] = useState(false);

  const signIn = async (phoneNumber) => {
    try {
    
      let num = "+1"+phoneNumber.replace(/[^0-9]+/g, "")


      const userAuth = await Auth.signIn(num);
      setAuth(userAuth);
      console.log(userAuth);
    } catch(error) {
      console.log({error});
      MySwal.fire({
        title: error.message,
        text: 'Wrong phone number',
        confirmButtonColor: '#00A651',
        icon: 'error'
      })
      setShowValidate(false);
      setNumber("");
    }
  };

  const verifyCodeAction = async (number, code) => {
    try {
      const validate = await Auth.sendCustomChallengeAnswer(auth, code);
      console.log(validate);
      const { 
        signInUserSession: { 
          accessToken: { 
            jwtToken 
          }, 
          refreshToken: {
            token
          } 
        },
        attributes: {
          sub
        }
      } = validate;

      window.localStorage.setItem("Auth", jwtToken);
      window.localStorage.setItem("AuthRefresh", token);
      window.localStorage.setItem("shoperIdAuth", sub);

      window.location.href = "/list";
    } catch(error) {
      console.log({error});
      MySwal.fire({
        title: "Wrong Code",
        confirmButtonColor: '#00A651',
        icon: 'error'
      })
      setVerifyCode("")
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
        {showValidate && <VerifyCodeForm signIn={signIn} number={number} action={verifyCodeAction} verifyCode={verifyCode} setVerifyCode={setVerifyCode} />}
      </div> 
    </div>
  );
};

export default LoginDummy;
