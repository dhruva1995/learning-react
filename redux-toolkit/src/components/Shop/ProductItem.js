import { useDispatch } from "react-redux";
import { cartActions } from "../../stores/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { name, price, description, id } = props;
  const dispacthFn = useDispatch();
  const addProductToCartHandler = () => {
    dispacthFn(cartActions.addItemToCart({ id, price, name }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addProductToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
