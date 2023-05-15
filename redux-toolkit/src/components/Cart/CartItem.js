import { useDispatch } from "react-redux";
import { cartActions } from "../../stores/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispacthFn = useDispatch();
  const { name, quantity, totalPrice, price, id } = props.item;
  const addItemToCart = () => {
    dispacthFn(cartActions.addItemToCart({ id, price, name }));
  };
  const removeItemFromCart = () => {
    dispacthFn(cartActions.removeItemFromCart(id));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemFromCart}>-</button>
          <button onClick={addItemToCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
