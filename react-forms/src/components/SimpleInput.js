import React from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: nameEntered,
    isValid: isEnteredNameValid,
    showError: showNameError,
    inputChangeHandler,
    inputFocusLostHandler,
    reset: resetName,
  } = useInput((name) => name.trim().length !== 0);

  const {
    value: emailEntered,
    isValid: isEnteredEmailValid,
    showError: showEmailError,
    inputChangeHandler: emailChangeHandler,
    inputFocusLostHandler: emailFocusLostHandler,
    reset: resetEmail,
  } = useInput((email) => email.toString().includes("@"));

  const isFormValid = isEnteredNameValid && isEnteredEmailValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    inputFocusLostHandler();
    emailFocusLostHandler();
    if (!isFormValid) {
      return;
    } else {
      console.log(`Input is Name: ${nameEntered} and Email: ${emailEntered}`);
      resetName();
      resetEmail();
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${showNameError ? "invalid" : ""}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={inputFocusLostHandler}
          onChange={inputChangeHandler}
          value={nameEntered}
        />
        {showNameError && (
          <p className="error-text">Please enter a non-empty text</p>
        )}
      </div>
      <div className={`form-control ${showEmailError ? "invalid" : ""}`}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onBlur={emailFocusLostHandler}
          onChange={emailChangeHandler}
          value={emailEntered}
        />
        {showEmailError && (
          <p className="error-text">Please enter a valid email Id.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
