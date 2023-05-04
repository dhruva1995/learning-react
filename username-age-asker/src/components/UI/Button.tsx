import React from "react";
import styles from "./Button.module.css";

const Button: React.FC<
  React.PropsWithChildren<{
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }>
> = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={styles.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
