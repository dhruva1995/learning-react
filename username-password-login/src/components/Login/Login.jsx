import React, { useEffect, useReducer, useState } from "react";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import AuthContext from "../context/AuthContextProvider";
import classes from "./Login.module.css";

const emailReducer = (prevState, dispatedEvent) => {
  if (dispatedEvent.type === "USER_INPUT") {
    return {
      value: dispatedEvent.newValue,
      isValid: dispatedEvent.newValue.includes("@"),
    };
  } else if (dispatedEvent.type === "FOCUS_LOST") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };
  }
};

const passwordReducer = (prevState, dispatedEvent) => {
  if (dispatedEvent.type === "USER_INPUT") {
    return {
      value: dispatedEvent.newValue,
      isValid: dispatedEvent.newValue.trim().length > 6,
    };
  } else if (dispatedEvent.type === "FOCUS_LOST") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6,
    };
  }
};

const Login = () => {
  const ctx = React.useContext(AuthContext);
  const [emailState, emailEventDispatcher] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordEventDispatcher] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("Form Validity changed!");
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    emailEventDispatcher({ type: "USER_INPUT", newValue: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passwordEventDispatcher({
      newValue: event.target.value,
      type: "USER_INPUT",
    });
  };

  const validateEmailHandler = () => {
    emailEventDispatcher({ type: "FOCUS_LOST" });
  };

  const validatePasswordHandler = () => {
    passwordEventDispatcher({ type: "FOCUS_LOST" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
        <a href="tel:+"></a>
      </form>
    </Card>
  );
};

export default Login;
