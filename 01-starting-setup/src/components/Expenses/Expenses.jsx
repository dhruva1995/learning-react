import React from "react";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";

function Expenses(props) {
  const expenses = props.expenses;
  const [filterYear, setFilterYear] = React.useState("2021");
  const filterYearHandler = (newFilteredYear) => {
    setFilterYear(newFilteredYear);
    console.log(`Filtered year ${newFilteredYear} in Expenses component!`);
  };
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          defaultFilteredYear={filterYear}
          filterYear={filterYearHandler}
        ></ExpensesFilter>
        <ExpenseItem
          name={expenses[0].title}
          amount={expenses[0].amount}
          date={expenses[0].date}
        ></ExpenseItem>
        <ExpenseItem
          name={expenses[1].title}
          amount={expenses[1].amount}
          date={expenses[1].date}
        ></ExpenseItem>
        <ExpenseItem
          name={expenses[2].title}
          amount={expenses[2].amount}
          date={expenses[2].date}
        ></ExpenseItem>
        <ExpenseItem
          name={expenses[3].title}
          amount={expenses[3].amount}
          date={expenses[3].date}
        ></ExpenseItem>
      </Card>
    </div>
  );
}

export default Expenses;
