import React from "react";

const useInput = (validator) => {
  const [valueEntered, setValueEntered] = React.useState("");
  const [isFieldTouched, setIsFieldTouched] = React.useState(false);

  const isEnteredValueValid = validator(valueEntered);
  const showError = isFieldTouched && !isEnteredValueValid;

  const inputChangeHandler = (event) => {
    setValueEntered(event.target.value);
  };
  const inputFocusLostHandler = () => {
    setIsFieldTouched(true);
  };

  const reset = () => {
    setValueEntered("");
    setIsFieldTouched(false);
  };

  return {
    value: valueEntered,
    isValid: isEnteredValueValid,
    showError,
    inputChangeHandler,
    inputFocusLostHandler,
    reset,
  };
};

export default useInput;
