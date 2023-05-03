import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const saveNewExpenseHandler = (expense) => {
    props.onAddExpense({
      ...expense,
      id: Math.random(),
    });
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveNewExpense={saveNewExpenseHandler}></ExpenseForm>
    </div>
  );
};

export default NewExpense;
