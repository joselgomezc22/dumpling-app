import {useContext} from "react";
import { DataContext } from "../context/DataContext";
import ReactInputVerificationCode from "react-input-verification-code";

const VerifyCodeForm = ({ verifyCode, setVerifyCode, action, number }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await action(number, verifyCode);
  };
  
  return (
    <div>
        
      <h3 className="text-m">
        
        Enter the verification code sent to your phone to log in
      </h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <ReactInputVerificationCode
          onChange={setVerifyCode}
          value={verifyCode}
          type="number"
        />
        <h3 className="text-m">Didn’t receive the code? Resend code</h3>
        <input
          className={
            verifyCode != "····"
              ? "login-form-submit btn text-s btn-primary"
              : "login-form-submit btn text-s btn-disabled"
          }
          type="submit"
          value={"Log in"}
        />
      </form>
    </div>
  );
};

export default VerifyCodeForm;
