import Meal from "../../../models/Meal";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem: React.FC<{ meal: Meal }> = (props) => {
  const priceText = `$${props.meal.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>{priceText}</div>
      </div>
      <div>
        <MealItemForm meal={props.meal}></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;
