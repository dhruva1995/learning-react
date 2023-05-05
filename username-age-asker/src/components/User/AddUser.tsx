import React, { FormEvent } from "react";
import Wrapper from "../Helpers/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import { ModalError, UserInput } from "../models/models";
import styles from "./AddUser.module.css";

const AddUser: React.FC<{ onAddUser: (user: UserInput) => void }> = (props) => {
  const userNameInputRef = React.useRef<HTMLInputElement>(null);
  const ageInputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<ModalError | null>(null);

  const formSumitHandler = (event: FormEvent) => {
    event.preventDefault();
    const userInput: UserInput = {
      userName: userNameInputRef.current?.value || "",
      age: ageInputRef.current?.value || "",
    };
    if (
      userInput.userName.trim().length === 0 ||
      userInput.age.trim().length === 0
    ) {
      // TODO: Need to throw an Error to the user
      setError({
        title: "Invalid input",
        message: "Both username and age should be valid (not empty).",
      });
      return;
    }

    if (Number(userInput.age) <= 0) {
      setError({
        title: "Invalid Age",
        message: "Entered Age should be valid (> 0).",
      });
      return;
    }

    props.onAddUser({ ...userInput });

    userNameInputRef.current!.value = "";
    ageInputRef.current!.value = "";
  };

  const onModalCancel = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          message={error!.message}
          title={error!.title}
          onCancel={onModalCancel}
        ></ErrorModal>
      )}
      <Card className={styles.input}>
        <form onSubmit={formSumitHandler}>
          <label htmlFor="username">User name</label>
          <input type="text" id="username" ref={userNameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            name="age"
            id="age"
            min={0}
            max={120}
            ref={ageInputRef}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
