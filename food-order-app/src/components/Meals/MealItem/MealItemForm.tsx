import React from "react";
import CartContext, { CartContextType } from "../../../context/CartContext";
import Meal from "../../../models/Meal";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm: React.FC<{ meal: Meal }> = (props) => {
  const context = React.useContext<CartContextType>(CartContext);
  const [isValid, setIsValid] = React.useState(true);
  const numRef = React.useRef<HTMLInputElement>(null);
  const onAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = numRef.current != null ? Number(numRef.current.value) : 0;
    if (amount < 1 || amount > 5) {
      setIsValid(false);
      return;
    } else {
      context.addItem({
        amount,
        id: props.meal.id,
        name: props.meal.name,
        price: props.meal.price,
      });
    }
  };
  return (
    <form className={classes.form} onSubmit={onAdd}>
      <Input
        ref={numRef}
        label="Amount"
        inputTagAttributes={{
          id: "amount" + props.meal.id,
          type: "number",
          defaultValue: "1",
          max: 5,
          min: 1,
        }}
      ></Input>
      <button type="submit">+ Add</button>
      {!isValid && <p>Please enter the valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
