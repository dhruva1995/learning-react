import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = (props) => {
  if (props.items.length > 0) {
    return (
      <ul className="expenses-list">
        {props.items.map((expense) => (
          <li>
            <ExpenseItem
              key={expense.id}
              name={expense.title}
              amount={expense.amount}
              date={expense.date}
            ></ExpenseItem>
          </li>
        ))}
      </ul>
    );
  } else {
    return <h2 className="expenses-list__fallback">No expenses found.</h2>;
  }
};

export default ExpenseList;
