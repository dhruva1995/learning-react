import React from "react";
import UserData from "../../models/UserData";
import classes from "./Checkout.module.css";

const isNotEmpty = (value: string) => value.trim().length > 0;
const isFiveCharLong = (value: string) => value.trim().length === 5;

const CheckoutForm: React.FC<{
  onClick: () => void;
  onConfirm: (userData: UserData) => void;
}> = (props) => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const streetRef = React.useRef<HTMLInputElement>(null);
  const postalCodeRef = React.useRef<HTMLInputElement>(null);
  const cityRef = React.useRef<HTMLInputElement>(null);

  const [formValidity, setFormValidity] = React.useState({
    isNameValid: true,
    isStreetValid: true,
    isPostalCodeValid: true,
    isCityValid: true,
  });

  const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValidity({
      isCityValid: isNotEmpty(cityRef.current!.value),
      isNameValid: isNotEmpty(nameRef.current!.value),
      isPostalCodeValid: isFiveCharLong(postalCodeRef.current!.value),
      isStreetValid: isNotEmpty(streetRef.current!.value),
    });
    if (
      formValidity.isCityValid &&
      formValidity.isNameValid &&
      formValidity.isPostalCodeValid &&
      formValidity.isStreetValid
    ) {
      props.onConfirm({
        city: cityRef.current!.value,
        name: nameRef.current!.value,
        postCode: postalCodeRef.current!.value,
        street: streetRef.current!.value,
      });
    }
  };

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div
        className={`${classes.control} ${
          formValidity.isNameValid ? undefined : classes.invalid
        }`}
      >
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <div
        className={`${classes.control} ${
          formValidity.isStreetValid ? undefined : classes.invalid
        }`}
      >
        <label htmlFor="street">Street name</label>
        <input type="text" id="street" ref={streetRef} />
      </div>
      <div
        className={`${classes.control} ${
          formValidity.isPostalCodeValid ? undefined : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
      </div>
      <div
        className={`${classes.control} ${
          formValidity.isCityValid ? undefined : classes.invalid
        }`}
      >
        <label htmlFor="city">City name</label>
        <input type="text" id="city" ref={cityRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
