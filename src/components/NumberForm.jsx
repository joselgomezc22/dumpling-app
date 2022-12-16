import React, { useState } from "react";

export const NumberForm = ({ number, setNumber, setShowValidate, login }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    login(number);
    setShowValidate(true);
  };

  return (
    <div>
      <h3 className="text-m">
        To receive a login code, please type in your phone number
      </h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          autoFocus={true}
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="login-form-input"
        />
        <input
          className={
            number
              ? "login-form-submit btn text-s btn-primary"
              : "login-form-submit btn text-s btn-disabled"
          }
          type="submit"
          value={"Send code"}
        />
      </form>
    </div>
  );
};
