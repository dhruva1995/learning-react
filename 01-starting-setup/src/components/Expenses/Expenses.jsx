import React from "react";
import Card from "../UI/Card";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";

function Expenses(props) {
  const [filterYear, setFilterYear] = React.useState("2021");

  const filterYearHandler = (newFilteredYear) => {
    setFilterYear(newFilteredYear);
  };

  const filteredExpenses = props.expenses.filter(
    (expense) => expense.date.getFullYear().toString() === filterYear
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          defaultFilteredYear={filterYear}
          filterYear={filterYearHandler}
        ></ExpensesFilter>
        <ExpenseChart expenses={filteredExpenses} />
        <ExpenseList items={filteredExpenses}></ExpenseList>
      </Card>
    </div>
  );
}

export default Expenses;
