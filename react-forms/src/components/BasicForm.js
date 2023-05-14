import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const nameValidator = (name) => name.trim().length > 0;
  const {
    value: enteredFirstName,
    isValid: isFirstNameValid,
    showError: showErrorForFirstName,
    inputChangeHandler: firstNameChangeHandler,
    inputFocusLostHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(nameValidator);

  const {
    value: enteredLastName,
    isValid: islastNameValid,
    showError: showErrorForLastName,
    inputChangeHandler: lastNameChangeHandler,
    inputFocusLostHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(nameValidator);

  const {
    value: enteredEmail,
    isValid: isEmailValid,
    showError: showErrorForEmail,
    inputChangeHandler: emailChangeHandler,
    inputFocusLostHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((email) => email.includes("@"));

  const isFormValid = isFirstNameValid && islastNameValid && isEmailValid;
  const submitFormHandler = (event) => {
    event.preventDefault();

    if (isFormValid) {
      console.log(
        `First name: ${enteredFirstName}, Last name: ${enteredLastName}, Email: ${enteredEmail}`
      );
      resetFirstName();
      resetLastName();
      resetEmail();
    }
  };
  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div
          className={`form-control ${showErrorForFirstName ? "invalid" : ""}`}
        >
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
          />
          {showErrorForFirstName && (
            <p className="error-text">First name should not be empty.</p>
          )}
        </div>
        <div
          className={`form-control ${showErrorForLastName ? "invalid" : ""}`}
        >
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
          />
          {showErrorForLastName && (
            <p className="error-text">Last name should not be empty.</p>
          )}
        </div>
      </div>
      <div className={`form-control ${showErrorForEmail ? "invalid" : ""}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {showErrorForEmail && (
          <p className="error-text">Please enter a valid input.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
