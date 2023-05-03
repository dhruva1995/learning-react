import React from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [displayForm, setDisplayForm] = React.useState(false);

  const toggleButton = () => {
    setDisplayForm(!displayForm);
  };
  const saveNewExpenseHandler = (expense) => {
    props.onAddExpense({
      ...expense,
      id: Math.random(),
    });
  };
  if (!displayForm) {
    return (
      <div className="new-expense">
        <button onClick={toggleButton}>Add new expense</button>
      </div>
    );
  } else {
    return (
      <div className="new-expense">
        <ExpenseForm
          removeForm={toggleButton}
          onSaveNewExpense={saveNewExpenseHandler}
        ></ExpenseForm>
      </div>
    );
  }
};

export default NewExpense;
