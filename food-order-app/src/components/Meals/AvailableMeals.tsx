import { useEffect, useState } from "react";
import Meal from "../../models/Meal";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch(
          "https://react-http-5845d-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        );
        if (resp.ok) {
          const respJson = await resp.json();
          setMeals(Object.values(respJson) as Meal[]);
          setIsLoading(false);
        } else {
          throw new Error(
            "Unable to fetch avaialable list of meals Due to : " +
              resp.statusText
          );
        }
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };
    fetchMeals();
  }, []);

  let content = meals.map((meal) => <MealItem meal={meal} key={meal.id} />);
  if (error) {
    content = [<p className={classes["error-text"]}>{error.message}</p>];
  }
  if (isLoading) {
    content = [<p>Loading...</p>];
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
