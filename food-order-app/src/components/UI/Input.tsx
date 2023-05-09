import React, { Ref } from "react";
import styles from "./Input.module.css";
interface InputTagData {
  id: string;
  type: "text" | "number";
  min?: number;
  max?: number;
  defaultValue: string;
}

type InputComponentInputType = {
  inputTagAttributes: InputTagData;
  label: string;
};

const Input = React.forwardRef(
  (props: InputComponentInputType, ref: Ref<HTMLInputElement>) => {
    return (
      <div className={styles.input}>
        <label htmlFor={props.inputTagAttributes.id}>{props.label}</label>
        <input {...props.inputTagAttributes} ref={ref} />
      </div>
    );
  }
);

export default Input;
