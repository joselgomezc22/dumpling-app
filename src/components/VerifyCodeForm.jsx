import { useContext, useState , useEffect } from "react";
import { DataContext } from "../context/DataContext";
import ReactInputVerificationCode from "react-input-verification-code";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import successIcon from "/src/images/success-icon.svg";

const VerifyCodeForm = ({
  verifyCode,
  setVerifyCode,
  action,
  number,
  signIn,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await action(number, verifyCode);
  };

  const [showMessage, setShowMessage] = useState(true)

  const messageTime = ()=> {
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    messageTime();
  }, [])
  
  return (
    <div>
      <div className={"login-form-message text-m-bold "+(showMessage?'active':'')}>
        <img className="login-form-message-icon" src={successIcon} alt="" />{" "}
        Verification code sent
      </div>
      <h3 className="text-m">
        Enter the verification code sent to your phone to log in
      </h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <ReactInputVerificationCode
          onChange={setVerifyCode}
          value={verifyCode}
          type="number"
        />
        <h3
          className="text-m "
          onClick={() => {
            signIn(number);
            MySwal.fire({
              title: "Code sent again",
              confirmButtonColor: "#00A651",
              icon: "success",
            });
            setShowMessage(true);
            messageTime();
          }}
        >
          Didn’t receive the code?{" "}
          <span className="text-m login-resend">Resend code</span>{" "}
        </h3>
        <input
          className={
            verifyCode != "····" && verifyCode != ""
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
