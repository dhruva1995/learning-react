import React, { FormEvent } from "react";
import Wrapper from "../Helpers/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import { ModalError, UserInput } from "../models/models";
import styles from "./AddUser.module.css";

const DEFAULT_USER_INPUT: UserInput = {
  userName: "",
  age: "",
};

const AddUser: React.FC<{ onAddUser: (user: UserInput) => void }> = (props) => {
  const [userInput, setUserInput] =
    React.useState<UserInput>(DEFAULT_USER_INPUT);

  const [error, setError] = React.useState<ModalError | null>(null);

  const userNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedState: UserInput = {
      ...userInput,
      userName: event.target.value,
    };
    setUserInput(updatedState);
  };

  const ageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({
      ...prev,
      age: event.target.value,
    }));
  };

  const formSumitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (userInput.userName.trim().length === 0 || userInput.age.length === 0) {
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

    console.log("Submitted form for ", userInput);
    props.onAddUser({ ...userInput });
    setUserInput(DEFAULT_USER_INPUT);
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
          <input
            type="text"
            id="username"
            onChange={userNameChangeHandler}
            value={userInput.userName}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            name="age"
            id="age"
            min={0}
            max={120}
            onChange={ageChangeHandler}
            value={userInput.age}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
