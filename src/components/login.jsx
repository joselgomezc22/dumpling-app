import logo from '../images/dumpling_logo.png';
import { useState } from 'react';

const Login = ()=> {

  const [number, setNumber] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Number: ${number}`)
  }

  return (
    <div className='login-overlay'>
      <div className='login-box'>
        <img className='login-logo' src={logo} />
        <h2 className='text-l'>Log in to your account</h2> 
        <h3 className='text-m'>To receive a login code, please type in your phone number</h3>
        <form className='login-form' onSubmit={handleSubmit}>
            <input
              type="text" 
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className='login-form-input'
            />
          <input className={number? 'login-form-submit btn text-s btn-primary':'login-form-submit btn text-s btn-disabled'} type="submit" value={'Send code'} />
        </form>


      </div>
        
    </div>
  );
}

export default Login;