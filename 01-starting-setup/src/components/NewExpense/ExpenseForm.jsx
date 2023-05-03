import React from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [state, setState] = React.useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  const dateChangeHandler = (event) => {
    setState((prev) => ({ ...prev, enteredDate: event.target.value }));
  };
  const titleChangeHandler = (event) => {
    setState((prev) => ({ ...prev, enteredTitle: event.target.value }));
  };
  const amountChangeHandler = (event) => {
    setState((prev) => ({ ...prev, enteredAmount: event.target.value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newExpense = {
      title: state.enteredTitle,
      date: new Date(state.enteredDate),
      amount: Number(state.enteredAmount),
    };
    props.onSaveNewExpense(newExpense);
    setState({
      enteredTitle: "",
      enteredAmount: "",
      enteredDate: "",
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label htmlFor="expense-title">Title</label>
          <input
            type="text"
            value={state.enteredTitle}
            id="expense-title"
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="expense-amount">Amount</label>
          <input
            type="number"
            id="expense-amount"
            min={0.01}
            step={0.01}
            onChange={amountChangeHandler}
            value={state.enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="expense-date">Date</label>
          <input
            type="date"
            id="expense-date"
            min={"2019-01-01"}
            max={"2022-12-31"}
            onChange={dateChangeHandler}
            value={state.enteredDate}
          />
        </div>
      </div>

      <div className="new-expense__actions">
        <button onClick={props.removeForm}>Cancel</button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
